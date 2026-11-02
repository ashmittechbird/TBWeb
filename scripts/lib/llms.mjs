/* Generates llms.txt from scripts/templates/llms.txt.

   llms.txt is read by AI tools to learn what the business offers, so it must
   not claim products that are not launched. It listed eight platforms while
   fewer were live, and it had no entry for products launched later. The product
   list and counts are now filled in from src/data/products.js, the same source
   the navigation, footer and products page use, so it cannot drift again. */

import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, SITE, importSrc } from './routes.mjs';

export async function buildLlmsTxt() {
  const template = await fs.readFile(path.join(ROOT, 'scripts', 'templates', 'llms.txt'), 'utf8');
  const { LIVE_PRODUCTS } = await importSrc('data/products.js');
  const { CLIENTS_PHRASE, FOUNDED } = await importSrc('data/siteFacts.js');
  const { OFFICE, ADDRESS_FULL } = await importSrc('data/organization.js');

  const productsSection = LIVE_PRODUCTS.map((p) => [
    `### ${p.name}`,
    p.desc,
    p.caps.length ? `Key capabilities: ${p.caps.join('; ')}.` : null,
    `Page: ${SITE}${p.route}`,
  ].filter(Boolean).join('\n')).join('\n\n');

  const values = {
    CLIENTS_PHRASE,
    PRODUCT_COUNT: String(LIVE_PRODUCTS.length),
    PRODUCTS_SECTION: productsSection,
    PRODUCT_NAMES: LIVE_PRODUCTS.map((p) => p.name).join(', '),
    FOUNDED: String(FOUNDED),
    ADDRESS: ADDRESS_FULL,
    PHONE: OFFICE.phoneDisplay,
    EMAIL: OFFICE.email,
    HOURS: OFFICE.hours.label,
  };

  const out = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`scripts/templates/llms.txt uses {{${key}}}, which scripts/lib/llms.mjs does not provide.`);
    return values[key];
  });

  if (/\{\{/.test(out)) throw new Error('llms.txt still has an unfilled {{placeholder}}.');
  return out;
}
