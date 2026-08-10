import { useEffect, useRef } from 'react';

/**
 * Adds an `is-idle` class to the element whenever it is scrolled out of view
 * or the tab is backgrounded, so CSS animations inside it can be paused with
 * `animation-play-state: paused`.
 *
 * Infinite CSS animations keep the compositor working for the entire life of
 * the page even when nobody can see them, which is a real cost on a long
 * scrolling page. Pausing is purely an optimisation: the element keeps its
 * current visual state, so nothing shifts when it resumes.
 *
 * `rootMargin` keeps the animation running slightly before the section
 * actually enters, so it is never caught mid-pause on screen.
 */
export default function useIdleOffscreen({ rootMargin = '150px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    let offscreen = false;
    const sync = () => el.classList.toggle('is-idle', offscreen || document.hidden);

    const io = new IntersectionObserver(([e]) => { offscreen = !e.isIntersecting; sync(); }, { rootMargin });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      el.classList.remove('is-idle');
    };
  }, [rootMargin]);

  return ref;
}
