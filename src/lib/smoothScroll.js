/* ══════════════════════════════════════════════════════════════════
   Lenis smooth scroll, wired to GSAP.

   Why it is set up this way:
   - Lenis runs off gsap.ticker instead of its own requestAnimationFrame
     loop, so the page has ONE animation loop. Two competing loops is the
     usual cause of scrub animations looking a frame behind the scroll.
   - lagSmoothing(0) stops GSAP from clamping a large frame delta, which
     would otherwise make Lenis jump after a stall (tab switch, GC pause).
   - ScrollTrigger.update runs on every Lenis scroll event so pinned and
     scrubbed timelines stay locked to the real scroll position.
   - Lenis scrolls the window for real (it does not transform a wrapper),
     so window.scrollY, position: sticky and IntersectionObserver all keep
     working - which the Industries strip and the navbars rely on.
   ══════════════════════════════════════════════════════════════════ */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

let lenis = null;
let tickerFn = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis;

  // Honour the OS setting - no inertia for people who asked for less motion.
  if (prefersReducedMotion()) return null;

  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({
    duration: 1.05,          // glide length; higher = floatier
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    smoothWheel: true,
    syncTouch: false,        // native momentum on touch feels better than emulated
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on('scroll', ScrollTrigger.update);

  tickerFn = (time) => lenis.raf(time * 1000); // gsap gives seconds, Lenis wants ms
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();
  return lenis;
}

export function destroySmoothScroll() {
  if (tickerFn) { gsap.ticker.remove(tickerFn); tickerFn = null; }
  if (lenis) { lenis.destroy(); lenis = null; }
  gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
}

export const getLenis = () => lenis;

/* Jump without animating - used on route change. Falls back to native
   scrolling when Lenis is disabled (reduced motion). */
export function jumpToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

/* Animated scroll to an element, used for #anchor links. */
export function scrollToTarget(el) {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
