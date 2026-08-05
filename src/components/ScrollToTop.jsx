import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initSmoothScroll, destroySmoothScroll, jumpToTop, scrollToTarget } from '../lib/smoothScroll';

/* Owns the smooth-scroll instance for the app's lifetime and resets scroll
   on every route change so a navigation never lands mid-page.
   Goes through the Lenis helpers rather than window.scrollTo - calling the
   native API directly leaves Lenis animating toward a stale target. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    initSmoothScroll();
    return destroySmoothScroll;
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { scrollToTarget(el); return; }
    }
    jumpToTop();
  }, [pathname, hash]);

  return null;
}
