import { Fragment, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from './InnerNavbar';
import Footer from './Footer';
import LaserFlow from './LaserFlow';
import '../styles/inner.css';
import '../styles/products.css';
import '../styles/product-detail.css';

gsap.registerPlugin(ScrollTrigger);

/* ── tiny icons ── */
const ChevR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
);
const ChevD = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M6 9l6 6 6-6" /></svg>
);

/* ── FAQ accordion (grid-rows height trick) ── */
function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pd-faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="pd-faq-row">
        <span className="pd-faq-q">{q}</span>
        <span className="pd-faq-chev"><ChevD /></span>
      </div>
      <div className="pd-faq-body"><div><p className="pd-faq-a">{a}</p></div></div>
    </div>
  );
}

export default function ProductPageLayout({
  accent = '#34d399',
  category,
  breadcrumbLabel,
  title,                 // string; wrap a word in *stars* to gradient-highlight it
  lead,
  heroActions,           // [{ label, to, variant }]
  heroMockup,            // ReactNode (SVG)
  stats,                 // [{ value, label }]
  bento,                 // { eyebrow, heading, sub, items:[{icon, title, text, art, span, row}] }
  light,                 // { eyebrow, heading, sub, mockup, columns:[{icon, title, text}] }
  laser,                 // { eyebrow, heading, sub, mockup, features:[{icon, title, text}] }
  integrations,          // { eyebrow, heading, items:[{label, tech}] }
  faqItems,              // [{ q, a }]
  cta,                   // { label, heading, body, button }
}) {
  const root = useRef(null);
  const revealRef = useRef(null);
  const heroArtRef = useRef(null);
  const [laserReady, setLaserReady] = useState(false);

  /* subtle 3D tilt on the hero product as the cursor moves */
  const onHeroTilt = useCallback((e) => {
    const el = heroArtRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg) translateZ(0)`;
  }, []);
  const onHeroLeave = useCallback(() => {
    const el = heroArtRef.current;
    if (el) el.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }, []);

  /* mount the WebGL beam only after layout has settled, so it measures
     its container at full height (avoids a squished landscape buffer) */
  useEffect(() => {
    const t = setTimeout(() => setLaserReady(true), 350);
    return () => clearTimeout(t);
  }, []);

  /* accent → soft / line variants */
  const accentVars = {
    '--pd-accent': accent,
    '--pd-accent-soft': hexA(accent, 0.14),
    '--pd-accent-line': hexA(accent, 0.30),
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* mouse reveal over laser screenshot */
  const onLaserMove = useCallback((e) => {
    const stage = e.currentTarget;
    const rect = stage.getBoundingClientRect();
    const el = revealRef.current;
    if (el) {
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
  }, []);
  const onLaserLeave = useCallback(() => {
    const el = revealRef.current;
    if (el) { el.style.setProperty('--mx', '-9999px'); el.style.setProperty('--my', '-9999px'); }
  }, []);

  /* ── GSAP ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      /* hero entrance */
      const tl = gsap.timeline({ defaults: { ease } });
      tl.from('.pd-bc', { opacity: 0, y: 10, duration: 0.5 }, 0.1)
        .from('.pd-hero-head .pd-eyebrow', { opacity: 0, y: 22, duration: 0.55 }, 0.18)
        .from('.pd-word', { yPercent: 115, opacity: 0, duration: 0.8, stagger: 0.05 }, 0.26)
        .from('.pd-hero-cta > *', { opacity: 0, y: 18, stagger: 0.1, duration: 0.5 }, 0.5)
        .fromTo('.pd-hero-art',
          { opacity: 0, clipPath: 'inset(0 0 100% 0 round 14px)' },
          { opacity: 1, clipPath: 'inset(0 0 0% 0 round 14px)', duration: 1.1, ease: 'power3.inOut' }, 0.4);

      gsap.from('.pd-statband-item', {
        scrollTrigger: { trigger: '.pd-statband', start: 'top 88%', once: true },
        opacity: 0, y: 22, stagger: 0.08, duration: 0.55, ease,
      });

      /* bento */
      gsap.from('.pd-bento .pd-sec-head > *', {
        scrollTrigger: { trigger: '.pd-bento', start: 'top 78%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease,
      });
      gsap.from('.pd-bento-card', {
        scrollTrigger: { trigger: '.pd-bento-grid', start: 'top 82%', once: true },
        opacity: 0, y: 44, stagger: 0.09, duration: 0.7, ease,
      });

      /* light */
      gsap.from('.pd-light .pd-sec-head > *', {
        scrollTrigger: { trigger: '.pd-light', start: 'top 78%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease,
      });
      if (root.current?.querySelector('.pd-light-shot')) {
        gsap.fromTo('.pd-light-shot',
          { opacity: 0, clipPath: 'inset(0 0 100% 0 round 16px)' },
          { opacity: 1, clipPath: 'inset(0 0 0% 0 round 16px)', duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: '.pd-light-shot', start: 'top 85%', once: true } });
      }
      gsap.from('.pd-col', {
        scrollTrigger: { trigger: '.pd-cols', start: 'top 85%', once: true },
        opacity: 0, y: 30, stagger: 0.12, duration: 0.6, ease,
      });

      /* laser */
      gsap.from('.pd-laser-head > *', {
        scrollTrigger: { trigger: '.pd-laser', start: 'top 72%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease,
      });
      gsap.fromTo('.pd-laser-stage',
        { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0 round 16px)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 16px)', duration: 1.3, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.pd-laser-stage', start: 'top 84%', once: true } });
      gsap.from('.pd-feat', {
        scrollTrigger: { trigger: '.pd-laser-feats', start: 'top 86%', once: true },
        opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease,
      });

      /* integrations */
      gsap.from('.pd-integ-item', {
        scrollTrigger: { trigger: '.pd-integ-grid', start: 'top 86%', once: true },
        opacity: 0, y: 28, stagger: 0.07, duration: 0.55, ease,
      });

      /* faq + cta */
      gsap.from('.pd-faq-item', {
        scrollTrigger: { trigger: '.pd-faq-list', start: 'top 84%', once: true },
        opacity: 0, y: 22, stagger: 0.07, duration: 0.55, ease,
      });
      gsap.from('.pd-cta-inner > *', {
        scrollTrigger: { trigger: '.pd-cta', start: 'top 80%', once: true },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const titleParts = splitStars(title);

  return (
    <div className="pd-root" ref={root} style={accentVars}>
      <InnerNavbar />

      {/* ════ HERO - full-width headline, beam splashes on the panel's top edge ════ */}
      <section className="pd-hero">
        {/* one continuous beam from the very top, behind the content */}
        <div className="pd-hero-skybeam" aria-hidden="true"><span className="pd-hero-pulse" /></div>
        <div className="pd-wrap">
          <div className="pd-hero-head">
            <nav className="pd-bc">
              <Link to="/">Home</Link><ChevR />
              <Link to="/products">Products</Link><ChevR />
              <span>{breadcrumbLabel || category}</span>
            </nav>
            <span className="pd-eyebrow">{category}</span>
            <h1 className="pd-hero-title pd-display">
              {titleParts.map((seg, i) => (
                <WordWrap key={i} text={seg.text} grad={seg.gradient} />
              ))}
            </h1>
            {lead && <p className="pd-hero-lead">{lead}</p>}
          </div>

          <div className="pd-hero-cta">
            {(heroActions || []).map((a, i) => (
              <Link key={i} to={a.to} className={`btn-pill${i === 0 ? '' : ' ghost'}`}>
                <span>{a.label}</span><i className="arrow"></i>
              </Link>
            ))}
          </div>

          <div className="pd-hero-showcase" onMouseMove={onHeroTilt} onMouseLeave={onHeroLeave}>
            {/* beam lives only in the zone ABOVE the panel; it terminates on the border */}
            <div className="pd-hero-beamzone" aria-hidden="true">
              <div className="pd-hero-laser2">
                {laserReady && (
                  <LaserFlow
                    color={accent}
                    dpr={1}
                    horizontalBeamOffset={0.0}
                    verticalBeamOffset={0.55}
                    verticalSizing={1.5}
                    horizontalSizing={0.5}
                    wispDensity={1.1}
                    wispSpeed={16}
                    wispIntensity={4.5}
                    fogIntensity={0.3}
                    flowSpeed={0.38}
                    flowStrength={0.28}
                    decay={1.15}
                  />
                )}
              </div>
            </div>
            <div className="pd-hero-impact" aria-hidden="true" />
            <div className="pd-hero-art" ref={heroArtRef}>
              <div className="pd-frame">{heroMockup}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ STAT BAND - moved out of the hero ════ */}
      {stats?.length > 0 && (
        <section className="pd-statband">
          <div className="pd-wrap">
            <div className="pd-statband-grid">
              {stats.map((s, i) => (
                <div className="pd-statband-item" key={i}>
                  <div className="pd-statband-val" dangerouslySetInnerHTML={{ __html: s.value }} />
                  <span className="pd-statband-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════ BENTO ════ */}
      {bento && (
        <section className="pd-bento">
          <div className="pd-wrap">
            <div className="pd-sec-head">
              <span className="pd-eyebrow">{bento.eyebrow}</span>
              <h2 className="pd-sec-h2">{bento.heading}</h2>
              {bento.sub && <p className="pd-sec-sub">{bento.sub}</p>}
            </div>
            <div className="pd-bento-grid">
              {bento.items.map((it, i) => (
                <article
                  key={i}
                  className={`pd-bento-card${it.span ? ' span-2' : ''}${it.row ? ' row-2' : ''}`}
                >
                  <div className="pd-bento-glow" style={{ background: `radial-gradient(circle at 100% 0%, ${hexA(accent, 0.16)} 0%, transparent 60%)` }} />
                  {it.icon && <span className="pd-bento-ico">{it.icon}</span>}
                  <div>
                    <div className="pd-bento-title">{it.title}</div>
                    {it.text && <p className="pd-bento-text">{it.text}</p>}
                  </div>
                  {it.art && <div className="pd-bento-art">{it.art}</div>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════ LIGHT FEATURE ════ */}
      {light && (
        <section className="pd-light">
          <div className="pd-wrap">
            <div className="pd-sec-head pd-sec-head--center">
              <span className="pd-eyebrow pd-eyebrow--dark">{light.eyebrow}</span>
              <h2 className="pd-sec-h2 pd-sec-h2--dark">{light.heading}</h2>
              {light.sub && <p className="pd-sec-sub pd-sec-sub--dark" style={{ marginLeft: 'auto', marginRight: 'auto' }}>{light.sub}</p>}
            </div>
            {light.mockup && <div className="pd-light-shot">{light.mockup}</div>}
            <div className="pd-cols">
              {light.columns.map((c, i) => (
                <div className="pd-col" key={i}>
                  <span className="pd-col-ico">{c.icon}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════ LASERFLOW REVEAL ════ */}
      {laser && (
        <section className="pd-laser">
          <div className="pd-laser-cssbeam" aria-hidden="true"><span className="pd-laser-core" /></div>
          <div className="pd-laser-bg">
            {laserReady && (
              <LaserFlow
                color={accent}
                dpr={1}
                horizontalBeamOffset={0.0}
                verticalBeamOffset={0.05}
                verticalSizing={1.9}
                horizontalSizing={0.55}
                wispDensity={1.1}
                wispIntensity={5.5}
                fogIntensity={0.46}
                flowSpeed={0.32}
                decay={1.1}
              />
            )}
          </div>
          <div className="pd-wrap">
            <div className="pd-laser-head">
              <span className="pd-eyebrow" style={{ justifyContent: 'center' }}>{laser.eyebrow}</span>
              <h2 className="pd-sec-h2">{laser.heading}</h2>
              {laser.sub && <p className="pd-sec-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>{laser.sub}</p>}
            </div>

            <div className="pd-laser-stage" onMouseMove={onLaserMove} onMouseLeave={onLaserLeave}>
              {laser.mockup}
              {/* brightened copy revealed by the cursor */}
              <div className="pd-laser-reveal" ref={revealRef}>{laser.mockup}</div>
            </div>

            <div className="pd-laser-feats">
              {laser.features.map((f, i) => (
                <div className="pd-feat" key={i}>
                  <span className="pd-feat-ico">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════ INTEGRATIONS ════ */}
      {integrations && (
        <section className="pd-integ">
          <div className="pd-wrap">
            <div className="pd-sec-head">
              <span className="pd-eyebrow">{integrations.eyebrow}</span>
              <h2 className="pd-sec-h2">{integrations.heading}</h2>
            </div>
            <div className="pd-integ-grid">
              {integrations.items.map((it, i) => (
                <div className="pd-integ-item" key={i}>
                  <span className="pd-integ-num">0{i + 1}</span>
                  <h4>{it.label}</h4>
                  <p>{it.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════ FAQ ════ */}
      {faqItems?.length > 0 && (
        <section className="pd-faq">
          <div className="pd-wrap pd-faq-inner">
            <div className="pd-faq-left">
              <span className="pd-eyebrow">FAQ</span>
              <h2 className="pd-display">Questions,<br />answered.</h2>
              <p className="pd-faq-sub">Everything you need to know before you deploy {breadcrumbLabel || category}.</p>
            </div>
            <div className="pd-faq-list">
              {faqItems.map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>
      )}

      {/* ════ CTA ════ */}
      {cta && (
        <section className="pd-cta">
          <div className="pd-cta-inner">
            <div>
              <p className="pd-cta-label">{cta.label}</p>
              <h2 className="pd-display">{cta.heading}</h2>
            </div>
            <div>
              <p className="pd-cta-body">{cta.body}</p>
              <Link to={cta.button?.to || '/contact'} className="btn-pill solid">
                <span>{cta.button?.label || 'Book a Demo'}</span><i className="arrow"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

/* ── helpers ── */
function WordWrap({ text, grad }) {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return text;
  return (
    <>
      {/^\s/.test(text) ? ' ' : ''}
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="pd-word-wrap">
            <span className={`pd-word${grad ? ' grad' : ''}`}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
      {/\s$/.test(text) ? ' ' : ''}
    </>
  );
}

/* split a string on *highlighted* runs → [{text, gradient}] */
function splitStars(str = '') {
  const out = [];
  const re = /\*([^*]+)\*/g;
  let last = 0, m;
  while ((m = re.exec(str))) {
    if (m.index > last) out.push({ text: str.slice(last, m.index), gradient: false });
    out.push({ text: m[1], gradient: true });
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push({ text: str.slice(last), gradient: false });
  return out.length ? out : [{ text: str, gradient: false }];
}

/* hex + alpha → rgba() */
function hexA(hex, a) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const n = parseInt(c, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
