/* Sitemap <lastmod> that moves only when a page's content actually changes.

   The manifest (scripts/lastmod.json, committed) records, per route, a hash of
   the page's prerendered markup and the date that hash was last seen to change:

       { "/about": { "hash": "9f2c...", "lastmod": "2026-08-17" } }

   The build only READS it. It never edits the manifest, so building on the
   server cannot dirty the git checkout that `git pull` needs to stay clean.

   After changing a page, run `npm run seo:lastmod`: every page whose hash
   differs from the manifest gets today's date, unchanged pages keep theirs.
   A plain build then warns - it does not fail - about any page that has changed
   since its recorded date, so a forgotten update is visible rather than silent.

   A route with no manifest entry is listed WITHOUT a <lastmod>: the element is
   optional, and leaving it out is more honest than inventing a date. */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT } from './routes.mjs';

export const MANIFEST = path.join(ROOT, 'scripts', 'lastmod.json');

/* Hash what a crawler reads: the head tags and the body markup. The copyright
   year in the footer is masked, or every page would count as changed each 1 Jan. */
export function contentHash(head, html) {
  const normalised = `${head}\n${html}`
    .replace(/(&copy;|©)(\s|<!-- -->)*\d{4}/g, '$1 YEAR')
    .replace(/\s+/g, ' ');
  return crypto.createHash('sha256').update(normalised).digest('hex').slice(0, 16);
}

export async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

const today = () => new Date().toISOString().slice(0, 10);

/* Compare current hashes against the manifest.
   pages: [{ route, hash }] */
export function diffAgainstManifest(pages, manifest) {
  const changed = [];
  const added = [];
  for (const { route, hash } of pages) {
    const entry = manifest[route];
    if (!entry) added.push(route);
    else if (entry.hash !== hash) changed.push(route);
  }
  const current = new Set(pages.map((p) => p.route));
  const removed = Object.keys(manifest).filter((r) => !current.has(r));
  return { changed, added, removed };
}

/* Returns the manifest that `npm run seo:lastmod` writes. */
export function updatedManifest(pages, manifest) {
  const next = {};
  for (const { route, hash } of pages) {
    const entry = manifest[route];
    next[route] = entry && entry.hash === hash
      ? entry
      : { hash, lastmod: today() };
  }
  return next;
}

export async function writeManifest(manifest) {
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await fs.writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
}
