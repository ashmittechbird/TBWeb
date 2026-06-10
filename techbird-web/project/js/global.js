/* ============================================================
   TechBird IT Services — Global JS · Inner Pages
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll progress bar ─────────────────────────────────── */
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    if (!progressBar) return;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = docH > 0 ? (window.scrollY / docH * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Navbar scroll state ─────────────────────────────────── */
  const nav = document.getElementById('siteNav');
  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Active nav link (match current page URL) ────────────── */
  const currentPath = window.location.pathname.replace(/\/$/, '').split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const hPath = (a.getAttribute('href') || '').replace(/\/$/, '').split('/').pop().replace('.html', '');
    if (hPath && hPath === currentPath) a.classList.add('active');
  });

  /* ── Mobile menu toggle ──────────────────────────────────── */
  const toggle     = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('navMobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal (IntersectionObserver) ────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.10, rootMargin: '0px 0px -52px 0px' });
      reveals.forEach(el => io.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('in'));
    }
  }

  /* ── FAQ / Accordion ─────────────────────────────────────── */
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const body = item.querySelector('.faq-body');
      const inner = item.querySelector('.faq-body-inner');
      const isOpen = item.classList.contains('open');

      // close all siblings
      btn.closest('.faq-list, [data-faq]')?.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-body').style.maxHeight = '0';
        }
      });

      item.classList.toggle('open', !isOpen);
      body.style.maxHeight = isOpen ? '0' : inner.scrollHeight + 'px';
    });
  });

  /* ── Stat count-up (triggers on scroll into view) ────────── */
  const statNums = document.querySelectorAll('[data-count]');
  if (statNums.length && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el     = e.target;
        const target = parseFloat(el.getAttribute('data-count')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const dur    = 1400;
        let t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          const p      = Math.min((ts - t0) / dur, 1);
          const eased  = 1 - Math.pow(1 - p, 3);
          const val    = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    statNums.forEach(el => countIO.observe(el));
  }

  /* ── Page entrance ───────────────────────────────────────── */
  requestAnimationFrame(() => document.body.classList.add('loaded'));

})();
