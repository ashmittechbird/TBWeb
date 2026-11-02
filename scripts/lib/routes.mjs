/* Shared by the build scripts: where the project lives, the site origin, and
   the list of public routes. */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SITE = 'https://techbird.in';

/* Load one of the plain-JS modules under src/ (data files with no JSX or
   browser imports) so the build uses the same values the site does. */
export function importSrc(relativePath) {
  return import(pathToFileURL(path.join(ROOT, 'src', relativePath)).href);
}

/* App.jsx is the single source of truth for routes: read its
   <Route path="..."> list instead of keeping a second one that can drift. */
export async function discoverRoutes() {
  const app = await fs.readFile(path.join(ROOT, 'src', 'App.jsx'), 'utf8');
  const declared = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);

  /* Parameterised routes have to be expanded to the real URLs. */
  const expanders = {
    '/case-studies/:slug': async () => {
      const { CASES } = await importSrc('data/caseStudies.js');
      return CASES.map((c) => `/case-studies/${c.slug}`);
    },
  };

  const routes = [];
  for (const p of declared) {
    if (p === '*') continue; // the not-found page is not a real URL
    if (p.includes(':')) {
      if (!expanders[p]) {
        throw new Error(`Route "${p}" has a parameter but scripts/lib/routes.mjs does not know its values. Add an entry to \`expanders\`.`);
      }
      routes.push(...(await expanders[p]()));
    } else {
      routes.push(p);
    }
  }
  return routes;
}
