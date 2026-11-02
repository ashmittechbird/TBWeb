/* Figures the site states about the business, kept in one place so a number
   cannot disagree with itself between the page copy, the schema.org markup
   and llms.txt (which scripts/prerender.mjs generates from this file).

   Only figures that are CONFIRMED belong here. The site currently states other
   numbers in several places that disagree with each other - project count
   (150+ on the home page, 100+ in llms.txt), countries (50+, 20+, and "4
   markets"), team size, and "10+ years" against a 2020 founding date. They stay
   where they are until the business confirms the real figures, and then move
   here in one change rather than being guessed at. */

/* Enterprise clients. Stated as "50+" everywhere it appears today. */
export const CLIENTS = '50+';
export const CLIENTS_PHRASE = `${CLIENTS} enterprise clients`;

export const FOUNDED = 2020;
