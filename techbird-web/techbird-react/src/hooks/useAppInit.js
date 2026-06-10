import { useEffect } from 'react';

export default function useAppInit() {
  useEffect(() => {
    /* ── Entrance ─────────────────────────────────────────── */
    let entranceDone = false;
    function triggerEntrance() {
      if (entranceDone) return;
      entranceDone = true;
      document.body.classList.add('loaded');
    }
    requestAnimationFrame(triggerEntrance);
    const t = setTimeout(triggerEntrance, 600);

    /* ── Count-up stats ───────────────────────────────────── */
    function countUpStats() {
      document.querySelectorAll('.stat-num [data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10) || 0;
        const dur = 1400;
        let t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }

    const statsEl = document.getElementById('stats');
    let statsObserver;
    if (statsEl && 'IntersectionObserver' in window) {
      statsObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { countUpStats(); statsObserver.disconnect(); }
      }, { threshold: 0.3 });
      statsObserver.observe(statsEl);
    } else if (statsEl) {
      countUpStats();
    }

    /* ── Industries horizontal scroll hijack ──────────────── */
    const indWrap    = document.getElementById('indTrack');
    const indFill    = document.getElementById('indScrollFill');
    const indSection = document.getElementById('industries');

    let dragListeners = null;

    if (indWrap) {
      let isDragging = false, startX, scrollLeft;
      function onMouseDown(e) {
        isDragging = true; indWrap.classList.add('is-dragging');
        startX = e.pageX - indWrap.offsetLeft; scrollLeft = indWrap.scrollLeft;
      }
      function onMouseUp() { isDragging = false; indWrap.classList.remove('is-dragging'); }
      function onMouseMove(e) {
        if (!isDragging) return; e.preventDefault();
        indWrap.scrollLeft = scrollLeft - (e.pageX - indWrap.offsetLeft - startX) * 1.4;
      }
      indWrap.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      indWrap.addEventListener('mousemove', onMouseMove);
      dragListeners = { onMouseDown, onMouseUp, onMouseMove };
    }

    let rafId = null;
    let scrollListener = null;

    function initIndHijack() {
      if (!indWrap || !indSection || window.innerWidth < 768) return;
      const totalH = indWrap.scrollWidth - indWrap.clientWidth;
      if (totalH <= 0) return;
      indWrap.style.scrollSnapType = 'none';
      indSection.style.height = (totalH + window.innerHeight) + 'px';
      let targetLeft = 0, currentLeft = 0;

      function onPageScroll() {
        const sTop = indSection.getBoundingClientRect().top;
        const progress = Math.max(0, Math.min(1, -sTop / totalH));
        targetLeft = progress * totalH;
      }
      function lerpTick() {
        const diff = targetLeft - currentLeft;
        if (Math.abs(diff) > 0.5) {
          currentLeft += diff * 0.09;
          indWrap.scrollLeft = currentLeft;
          if (indFill) indFill.style.width = (currentLeft / totalH * 100) + '%';
        } else {
          currentLeft = targetLeft;
          indWrap.scrollLeft = currentLeft;
        }
        rafId = requestAnimationFrame(lerpTick);
      }
      scrollListener = onPageScroll;
      window.addEventListener('scroll', onPageScroll, { passive: true });
      onPageScroll();
      lerpTick();
    }

    function onLoad() { requestAnimationFrame(initIndHijack); }
    if (document.readyState === 'complete') {
      requestAnimationFrame(initIndHijack);
    } else {
      window.addEventListener('load', onLoad);
    }

    /* ── Nav active link ──────────────────────────────────── */
    const sections = ['services', 'products', 'about', 'contact']
      .map(id => document.getElementById(id)).filter(Boolean);
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    let navIO;
    if (sections.length) {
      navIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.id;
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
          }
        });
      }, { threshold: 0.5 });
      sections.forEach(s => navIO.observe(s));
    }

    /* ── Scroll-progress bar ──────────────────────────────── */
    const progressBar = document.getElementById('scrollProgress');
    function onScroll() {
      if (!progressBar) return;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) progressBar.style.width = (window.scrollY / docH * 100) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafId);
      if (statsObserver) statsObserver.disconnect();
      if (navIO) navIO.disconnect();
      if (scrollListener) window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', onLoad);
      if (dragListeners && indWrap) {
        indWrap.removeEventListener('mousedown', dragListeners.onMouseDown);
        document.removeEventListener('mouseup', dragListeners.onMouseUp);
        indWrap.removeEventListener('mousemove', dragListeners.onMouseMove);
      }
    };
  }, []);
}
