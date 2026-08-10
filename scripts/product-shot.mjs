/* Turn a raw product screenshot into the two assets the site needs.

   Usage:  node scripts/product-shot.mjs <slug> <path-to-screenshot>
   e.g.    node scripts/product-shot.mjs pms "~/Downloads/dashboard.png"

   Writes:
     public/products/<slug>/hero.webp   hero + showcase shot (~1910px wide)
     public/assets/products/<slug>.webp card image (600x400)

   Both are WebP. The screenshots were PNGs originally, which cost 2.8 MB
   across the product pages for no visible gain - a dashboard screenshot is
   flat UI, so WebP at q82 is visually indistinguishable and ~80% smaller.

   <slug> must match the screenshot folder referenced by the product page
   (SCREENS[].src) and the `image` field in src/data/products.js.

   The card is anchored left-top rather than centred or letterboxed. Its
   only consumer today is FlowingMenu's hover pill (.fm-img), a wide
   120-200px x 36-64px strip with background-size:cover - letterboxing
   there just produces dark bars that get cropped away, and centring
   throws out the sidebar. Left-top keeps the product's brand mark, nav
   and top metrics row, which is what makes it recognisable at that size. */

import sharp from 'sharp';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname } from 'node:path';

const [slug, src] = process.argv.slice(2);

if (!slug || !src) {
  console.error('Usage: node scripts/product-shot.mjs <slug> <path-to-screenshot>');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`Bad slug "${slug}" - lowercase letters, digits and hyphens only.`);
  process.exit(1);
}
if (!existsSync(src)) {
  console.error(`Not found: ${src}`);
  process.exit(1);
}

const HERO = `public/products/${slug}/hero.webp`;
const CARD = `public/assets/products/${slug}.webp`;
const VOID = { r: 10, g: 10, b: 16, alpha: 1 };   // #0a0a10, the page background

const kb = f => (statSync(f).size / 1024).toFixed(0) + 'KB';

for (const out of [HERO, CARD]) mkdirSync(dirname(out), { recursive: true });

const meta = await sharp(src).metadata();
console.log(`input   ${src}  ${meta.width}x${meta.height} ${meta.format}`);

/* Hero: match the other product shots at ~1910px wide. Never upscale -
   withoutEnlargement keeps a smaller source at its native size rather
   than blurring it. */
await sharp(src)
  .resize({ width: 1910, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(HERO);
console.log(`hero    ${HERO}  ${kb(HERO)}`);

/* Card: 600x400 to match the other product card images. */
await sharp(src)
  .resize({ width: 600, height: 400, fit: 'cover', position: 'left top', background: VOID })
  .webp({ quality: 88 })
  .toFile(CARD);
console.log(`card    ${CARD}  ${kb(CARD)}`);

console.log('\nDone. Hard-refresh the product page to see it.');
