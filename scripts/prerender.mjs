/* Prerenders every public route to its own HTML file, and generates the files
   that describe the site to crawlers: sitemap.xml and llms.txt.

   Runs as the last step of `npm run build`, after the client build (dist/)
   and the server bundle (dist-ssr/) exist. For each route it writes a file
   whose raw HTML already contains that page's own <title>, description,
   canonical, one <h1>, body copy and JSON-LD - what Bing, ChatGPT,
   Perplexity and other crawlers that do not run JavaScript actually read.

   Needs nothing beyond Node: no headless browser, so the production box can
   keep deploying with `git pull && npm run build`.

   Output layout - /about is served from dist/about.html (and / from
   dist/index.html). The web server maps clean URLs to those files; see
   deploy/nginx-techbird.conf.example and vercel.json (cleanUrls).

   Flags
     --update-lastmod   also rewrite scripts/lastmod.json so every page whose
                        content changed gets today's sitemap <lastmod>
                        (`npm run seo:lastmod`). A normal build never edits it. */

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, SITE, discoverRoutes } from './lib/routes.mjs';
import { contentHash, readManifest, diffAgainstManifest, updatedManifest, writeManifest, MANIFEST } from './lib/lastmod.mjs';
import { buildSitemap } from './lib/sitemap.mjs';
import { buildLlmsTxt } from './lib/llms.mjs';
import { inspectSecurityTxt, RENEW_WARNING_DAYS } from './lib/securitytxt.mjs';

const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const UPDATE_LASTMOD = process.argv.includes('--update-lastmod');

/* Not a path any route can match, so it always renders the not-found page. */
const NOT_FOUND_URL = '/__not-found__';

const HEAD_MARKER = '<!--app-head-->';
const ROOT_DIV = '<div id="root"></div>';

/* ── per-page checks ───────────────────────────────────────────────────
   The point of this step is that the raw HTML is right. If a page comes out
   wrong, fail the build rather than ship an empty or mislabelled page. */
function count(haystack, re) {
  return (haystack.match(re) || []).length;
}

const isNoindex = (head) => /<meta[^>]*name="robots"[^>]*content="noindex/.test(head);

function validate(route, { head, html }, kind = 'page') {
  const problems = [];
  const expectedCanonical = `${SITE}${route}`;
  const isNotFound = kind === 'not-found';

  if (count(head, /<title\b/g) !== 1) problems.push(`expected exactly 1 <title>, found ${count(head, /<title\b/g)}`);
  if (count(head, /<meta[^>]*name="description"/g) !== 1) problems.push('expected exactly 1 meta description');
  if (count(head, /<meta[^>]*name="robots"/g) !== 1) problems.push('expected exactly 1 meta robots');

  const canonicals = count(head, /<link[^>]*rel="canonical"/g);
  if (isNoindex(head)) {
    /* A noindex page has nothing to consolidate; a canonical beside it is two
       opposing signals, and on the not-found page would name whatever URL the
       visitor mistyped. */
    if (canonicals !== 0) problems.push('a noindex page must not carry a canonical');
  } else if (canonicals !== 1) {
    problems.push(`expected exactly 1 canonical, found ${canonicals}`);
  } else if (!head.includes(`href="${expectedCanonical}"`)) {
    problems.push(`canonical should be ${expectedCanonical}`);
  }

  if (isNotFound) {
    if (!isNoindex(head)) problems.push('not-found page must be noindex');
    if (!/Page Not Found/.test(head)) problems.push('not-found page has the wrong title');
  }
  if (count(head, /<meta[^>]*property="og:title"/g) !== 1) problems.push('expected exactly 1 og:title');

  const h1s = count(html, /<h1[\s>]/g);
  if (h1s !== 1) problems.push(`expected exactly 1 <h1>, found ${h1s}`);
  if (!html.includes('application/ld+json')) problems.push('no JSON-LD in the markup');

  /* Head tags must not have leaked into the body, or the page would carry two
     copies once they are added to <head>. */
  if (/<title\b/.test(html)) problems.push('a <title> was left in the body markup');
  if (/rel="canonical"/.test(html)) problems.push('a canonical was left in the body markup');

  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const minText = isNotFound ? 60 : 400;
  if (text.length < minText) problems.push(`only ${text.length} characters of visible text - looks empty`);

  return problems;
}

/* ── output ────────────────────────────────────────────────────────── */
function outputFile(route) {
  return route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route.slice(1)}.html`);
}

async function main() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
  if (!template.includes(HEAD_MARKER)) {
    throw new Error(`dist/index.html has no ${HEAD_MARKER} marker - was it already prerendered, or did index.html lose it?`);
  }
  if (!template.includes(ROOT_DIV)) {
    throw new Error(`dist/index.html has no ${ROOT_DIV} - cannot place the page markup.`);
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href);

  const jobs = (await discoverRoutes()).map((route) => ({
    label: route, url: route, file: outputFile(route), kind: 'page', dataRoute: route,
  }));

  /* The not-found page. A URL that matches no route renders NotFoundPage, so
     this is that page. The web server returns it with a real 404 status for
     any path that is not a file - see deploy/ and vercel.json. */
  jobs.push({
    label: '(not found)', url: NOT_FOUND_URL, file: path.join(DIST, '404.html'), kind: 'not-found', dataRoute: '404',
  });

  const failures = [];
  const written = [];
  const pages = []; // real pages only: these feed the sitemap and the lastmod manifest

  for (const job of jobs) {
    let page;
    try {
      page = await render(job.url);
    } catch (err) {
      failures.push(`${job.label}: render threw - ${err && err.message ? err.message.split('\n')[0] : err}`);
      continue;
    }

    const problems = validate(job.url, page, job.kind);
    if (problems.length) {
      failures.push(`${job.label}: ${problems.join('; ')}`);
      continue;
    }

    /* The markers let the client remove these tags if it finds it was served
       the wrong page's file - see src/main.jsx. */
    const headBlock = `<!--prerender:start-->\n    ${page.head}\n    <!--prerender:end-->`;
    const out = template
      .replace(HEAD_MARKER, headBlock)
      .replace(ROOT_DIV, `<div id="root" data-route="${job.dataRoute}">${page.html}</div>`);

    await fs.mkdir(path.dirname(job.file), { recursive: true });
    await fs.writeFile(job.file, out);
    written.push({ route: job.label, file: path.relative(DIST, job.file), kb: (Buffer.byteLength(out) / 1024).toFixed(0), noindex: isNoindex(page.head) });
    if (job.kind === 'page') {
      pages.push({ route: job.url, hash: contentHash(page.head, page.html), noindex: isNoindex(page.head) });
    }
  }

  if (failures.length) {
    console.error(`\nPrerender failed for ${failures.length} of ${jobs.length} page(s):\n`);
    failures.forEach((f) => console.error(`  ✗ ${f}`));
    console.error('\nNothing was shipped for the failing routes. Fix them or the build stays red.\n');
    process.exit(1);
  }

  /* ── sitemap.xml ──────────────────────────────────────────────────────
     <lastmod> comes from the committed manifest, so it moves only when a page's
     content does - see scripts/lib/lastmod.mjs. */
  const indexed = pages.filter((p) => !p.noindex);
  let manifest = await readManifest();

  if (UPDATE_LASTMOD) {
    const before = manifest;
    manifest = updatedManifest(indexed, manifest);
    await writeManifest(manifest);
    const { changed, added, removed } = diffAgainstManifest(indexed, before);
    console.log(`\nlastmod manifest updated (${path.relative(ROOT, MANIFEST)}): ${changed.length} changed, ${added.length} new, ${removed.length} removed.`);
    [...changed, ...added].forEach((r) => console.log(`  ~ ${r}`));
  } else {
    const { changed, added } = diffAgainstManifest(indexed, manifest);
    if (changed.length || added.length) {
      console.warn(`\n⚠ ${changed.length + added.length} page(s) changed since their recorded sitemap date (or have none):`);
      [...changed, ...added].forEach((r) => console.warn(`    ${r}`));
      console.warn('  Run `npm run seo:lastmod` and commit scripts/lastmod.json so <lastmod> reflects the change.\n');
    }
  }

  const lastmod = Object.fromEntries(Object.entries(manifest).map(([route, e]) => [route, e.lastmod]));
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), buildSitemap(pages, lastmod));
  await fs.writeFile(path.join(DIST, 'llms.txt'), await buildLlmsTxt());

  /* security.txt is copied from public/ by the client build. Its Expires date
     has to be renewed; say so before it lapses rather than after. */
  try {
    const txt = inspectSecurityTxt(await fs.readFile(path.join(DIST, '.well-known', 'security.txt'), 'utf8'));
    if (txt.problems.length) {
      console.warn(`\n⚠ security.txt: ${txt.problems.join('; ')}`);
    } else if (txt.daysLeft < RENEW_WARNING_DAYS) {
      console.warn(`\n⚠ security.txt expires in ${txt.daysLeft} days (${txt.expires}) - renew its Expires field in public/.well-known/security.txt.`);
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.warn('\n⚠ dist/.well-known/security.txt is missing.');
  }

  const w = Math.max(...written.map((r) => r.route.length));
  console.log(`\nPrerendered ${written.length} pages:`);
  written.forEach((r) => console.log(`  ✓ ${r.route.padEnd(w)}  ->  ${r.file}  (${r.kb} kB)${r.noindex ? '  noindex' : ''}`));
  console.log(`\nGenerated sitemap.xml (${indexed.length} URLs) and llms.txt.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
