/* Prerenders every public route to its own HTML file.

   Runs as the last step of `npm run build`, after the client build (dist/)
   and the server bundle (dist-ssr/) exist. For each route it writes a file
   whose raw HTML already contains that page's own <title>, description,
   canonical, one <h1>, body copy and JSON-LD - what Bing, ChatGPT,
   Perplexity and other crawlers that do not run JavaScript actually read.

   Needs nothing beyond Node: no headless browser, so the production box can
   keep deploying with `git pull && npm run build`.

   Output layout - /about is served from dist/about.html (and / from
   dist/index.html). The web server maps clean URLs to those files; see
   deploy/nginx-techbird.conf.example and vercel.json (cleanUrls). */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const SITE = 'https://techbird.in';

/* Not a path any route can match, so it always renders the not-found page. */
const NOT_FOUND_URL = '/__not-found__';

const HEAD_MARKER = '<!--app-head-->';
const ROOT_DIV = '<div id="root"></div>';

/* ── routes ────────────────────────────────────────────────────────────
   App.jsx is the single source of truth: read its <Route path="..."> list
   instead of keeping a second one that can drift out of date. */
async function discoverRoutes() {
  const app = await fs.readFile(path.join(ROOT, 'src', 'App.jsx'), 'utf8');
  const declared = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);

  /* Parameterised routes have to be expanded to the real URLs. */
  const expanders = {
    '/case-studies/:slug': async () => {
      const { CASES } = await import(pathToFileURL(path.join(ROOT, 'src', 'data', 'caseStudies.js')).href);
      return CASES.map((c) => `/case-studies/${c.slug}`);
    },
  };

  const routes = [];
  for (const p of declared) {
    if (p === '*') continue; // the not-found page is not a real URL
    if (p.includes(':')) {
      if (!expanders[p]) {
        throw new Error(`Route "${p}" has a parameter but scripts/prerender.mjs does not know its values. Add an entry to \`expanders\`.`);
      }
      routes.push(...(await expanders[p]()));
    } else {
      routes.push(p);
    }
  }
  return routes;
}

/* ── per-page checks ───────────────────────────────────────────────────
   The point of this step is that the raw HTML is right. If a page comes out
   wrong, fail the build rather than ship an empty or mislabelled page. */
function count(haystack, re) {
  return (haystack.match(re) || []).length;
}

function validate(route, { head, html }, kind = 'page') {
  const problems = [];
  const expectedCanonical = `${SITE}${route}`;
  const isNotFound = kind === 'not-found';

  if (count(head, /<title\b/g) !== 1) problems.push(`expected exactly 1 <title>, found ${count(head, /<title\b/g)}`);
  if (count(head, /<meta[^>]*name="description"/g) !== 1) problems.push('expected exactly 1 meta description');
  if (count(head, /<meta[^>]*name="robots"/g) !== 1) problems.push('expected exactly 1 meta robots');
  if (isNotFound) {
    /* noindex with a canonical is contradictory, and a canonical here would
       point at whatever URL the visitor mistyped. */
    if (count(head, /<link[^>]*rel="canonical"/g) !== 0) problems.push('not-found page must not carry a canonical');
    if (!/<meta[^>]*name="robots"[^>]*content="noindex/.test(head)) problems.push('not-found page must be noindex');
    if (!/Page Not Found/.test(head)) problems.push('not-found page has the wrong title');
  } else if (count(head, /<link[^>]*rel="canonical"/g) !== 1) {
    problems.push('expected exactly 1 canonical');
  } else if (!head.includes(`href="${expectedCanonical}"`)) {
    problems.push(`canonical should be ${expectedCanonical}`);
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
    written.push({ route: job.label, file: path.relative(DIST, job.file), kb: (Buffer.byteLength(out) / 1024).toFixed(0) });
  }

  if (failures.length) {
    console.error(`\nPrerender failed for ${failures.length} of ${jobs.length} page(s):\n`);
    failures.forEach((f) => console.error(`  ✗ ${f}`));
    console.error('\nNothing was shipped for the failing routes. Fix them or the build stays red.\n');
    process.exit(1);
  }

  const w = Math.max(...written.map((r) => r.route.length));
  console.log(`\nPrerendered ${written.length} pages:`);
  written.forEach((r) => console.log(`  ✓ ${r.route.padEnd(w)}  ->  ${r.file}  (${r.kb} kB)`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
