/* Figures the site states about the business, kept in one place so a number
   cannot disagree with itself between the page copy, the schema.org markup
   and llms.txt (which scripts/prerender.mjs generates from this file).

   Only figures that are CONFIRMED belong here. The site deliberately states no
   project count, country count, team size or years-in-business figure: earlier
   versions printed numbers for these that disagreed with each other and could
   not be supported, so they were removed rather than reconciled. Add one here
   only once the business can stand behind it. */

/* Enterprise clients. Stated as "50+" everywhere it appears today. */
export const CLIENTS = '50+';
export const CLIENTS_PHRASE = `${CLIENTS} enterprise clients`;

export const FOUNDED = 2020;
