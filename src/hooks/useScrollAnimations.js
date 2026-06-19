import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Contact card cinematic expand ────────────────────── */
      const contactCard = document.getElementById('contactCard');
      if (contactCard) {
        gsap.fromTo(contactCard,
          { clipPath: 'inset(8% 5% round 70px)', scale: 0.95 },
          {
            clipPath: 'inset(0% 0% round 38px)', scale: 1, ease: 'none',
            scrollTrigger: { trigger: '.contact', start: 'top 80%', end: 'top 10%', scrub: 0.4 }
          }
        );
      }

      /* ── Services grid stagger ────────────────────────────── */
      const svcCards = gsap.utils.toArray('.svc-card');
      if (svcCards.length) {
        gsap.fromTo(svcCards,
          { y: 70, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            stagger: { amount: 0.55, from: 'start' },
            scrollTrigger: { trigger: '.svc-grid', start: 'top 82%', toggleActions: 'play none none none' }
          }
        );
      }

      /* ── Manifesto big-type word stagger ──────────────────── */
      const bigType = document.querySelector('.big-type');
      if (bigType) {
        const words = bigType.querySelectorAll('.reveal-word');
        words.forEach(w => {
          w.style.opacity = '0';
          w.style.transform = 'translateY(40px) rotate(2deg)';
          w.style.transition = 'none';
        });
        gsap.fromTo(words,
          { opacity: 0, y: 40, rotate: 2 },
          {
            opacity: 1, y: 0, rotate: 0, duration: 0.75, ease: 'power3.out', stagger: 0.09,
            scrollTrigger: { trigger: bigType, start: 'top 78%', toggleActions: 'play none none none' }
          }
        );
      }

      /* ── Section eyebrows + headings ─────────────────────── */
      gsap.utils.toArray('.sec-head').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── Services scroll: 6-card parallax ───────────────── */
      const recogSection = document.querySelector('.recognition');
      if (recogSection && window.innerWidth > 860) {
        const allCards = ['rc1','rc2','rc3','rc4','rc5','rc6']
          .map(id => document.getElementById(id)).filter(Boolean);
        if (allCards.length) {
          gsap.set(allCards, { y: '82vh' });
          const recogTl = gsap.timeline({
            scrollTrigger: { trigger: '.recognition', start: 'top top', end: 'bottom bottom', scrub: 0.4 }
          });
          allCards.forEach((card, i) => {
            recogTl.to(card, { y: '-58vh', ease: 'none', duration: 1 }, i * 0.28);
          });
        }
      }

      /* ── Sec-title word-by-word blur reveal ──────────────── */
      function splitSecTitle(el) {
        const result = document.createDocumentFragment();
        Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === 3) {
            node.textContent.split(/(\s+)/).forEach(part => {
              if (!part.length) return;
              if (/^\s+$/.test(part)) {
                result.appendChild(document.createTextNode(part));
              } else {
                const s = document.createElement('span');
                s.className = 'sr-word'; s.textContent = part;
                result.appendChild(s);
              }
            });
          } else {
            result.appendChild(node.cloneNode(true));
          }
        });
        el.innerHTML = '';
        el.appendChild(result);
      }

      gsap.utils.toArray('.sec-title').forEach(title => {
        splitSecTitle(title);
        const words = title.querySelectorAll('.sr-word');
        if (!words.length) return;
        gsap.fromTo(words,
          { opacity: 0.08, willChange: 'opacity' },
          { opacity: 1, ease: 'none', stagger: 0.055,
            scrollTrigger: { trigger: title, start: 'top 88%', end: 'bottom 58%', scrub: 0.9 } }
        );
        gsap.fromTo(words,
          { filter: 'blur(7px)' },
          { filter: 'blur(0px)', ease: 'none', stagger: 0.055,
            scrollTrigger: { trigger: title, start: 'top 88%', end: 'bottom 58%', scrub: 0.9 } }
        );
      });
    });

    /* ── Scroll-reveal (.reveal, .reveal-up) ─────────────── */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.section .reveal, .section .reveal-up').forEach((el, i) => {
      if (el.classList.contains('reveal-up')) el.style.transitionDelay = ((i % 4) * 0.06) + 's';
      io.observe(el);
    });

    return () => {
      ctx.revert();
      io.disconnect();
    };
  }, []);
}
