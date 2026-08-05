/* Graceful fallback for product screenshots that have not been added yet.
   Swaps a missing PNG for a neutral dashboard wireframe instead of
   rendering the browser's broken-image icon. */

export const SHOT_PLACEHOLDER = '/products/_placeholder.svg';

export function onShotError(e) {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied) return; // guard against a loop
  img.dataset.fallbackApplied = 'true';
  img.src = SHOT_PLACEHOLDER;
}
