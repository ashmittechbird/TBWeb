import { useEffect, useLayoutEffect, useRef } from 'react';
import FaqAccordion from './FaqAccordion';
import ScrollReveal from './ScrollReveal';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from './InnerNavbar';
import Footer from './Footer';
import '../styles/inner.css';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

/* ── Default process steps ── */
const DEFAULT_PROCESS = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    body: 'We map your operations, data flows and goals before writing a line of code. Strategy precedes everything.',
  },
  {
    num: '02',
    title: 'Architecture & Design',
    body: 'System architecture and UX are locked before build begins — eliminating expensive mid-project pivots.',
  },
  {
    num: '03',
    title: 'Iterative Build & Review',
    body: 'Short build cycles with frequent reviews. You see working software early and validate direction before full commitment.',
  },
  {
    num: '04',
    title: 'Deployment & Support',
    body: 'Production deployment, training and post-launch support. We stay engaged after go-live.',
  },
];

/* ── Abstract SVG visuals ── */
function Visual0({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="320" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`h${i}`} x1="0" y1={i*53} x2="480" y2={i*53} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      <circle cx="240" cy="160" r="90" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
      <circle cx="240" cy="160" r="50" stroke={color} strokeWidth="0.5" strokeOpacity="0.25" />
      <circle cx="240" cy="160" r="18" fill={color} fillOpacity="0.08" />
      <circle cx="240" cy="160" r="6" fill={color} fillOpacity="0.7" />
      {[[330,70],[150,70],[100,160],[380,160],[170,280],[310,280]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1="240" y1="160" x2={cx} y2={cy} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
          <circle cx={cx} cy={cy} r="4" fill={color} fillOpacity="0.5" />
        </g>
      ))}
      <path d="M330 70 L380 160 L310 280 L170 280 L100 160 L150 70 Z" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">NEURAL ARCHITECTURE</text>
    </svg>
  );
}
function Visual1({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {[60,120,180,240,300,360,420].map((x, i) => (
        <rect key={i} x={x-18} y={260-[80,130,95,170,110,150,90][i]} width="36" height={[80,130,95,170,110,150,90][i]} fill={color} fillOpacity={i===3?0.18:0.07} rx="3" />
      ))}
      <polyline points="60,180 120,130 180,165 240,90 300,150 360,110 420,170" stroke={color} strokeWidth="1.5" strokeOpacity="0.55" fill="none" strokeLinejoin="round" />
      {[[60,180],[120,130],[180,165],[240,90],[300,150],[360,110],[420,170]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={color} fillOpacity="0.75" />
      ))}
      <line x1="20" y1="260" x2="460" y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">PERFORMANCE ANALYTICS</text>
    </svg>
  );
}
function Visual2({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {[80,170,260,350,440].map((cx,i)=>(
        <rect key={i} x={cx-30} y="90" width="60" height="140" rx="6" fill={color} fillOpacity={i===2?0.15:0.05} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      ))}
      {[80,170,260,350,440].map((x,i)=>(
        <text key={i} x={x} y="110" textAnchor="middle" fill={color} fillOpacity="0.35" fontSize="9" fontFamily="JetBrains Mono, monospace">0{i+1}</text>
      ))}
      <path d="M80 90 Q175 40 260 90" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
      <path d="M260 90 Q352 40 440 90" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">DEPLOYMENT PIPELINE</text>
    </svg>
  );
}
function Visual3({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <circle cx="240" cy="155" r="115" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <circle cx="240" cy="155" r="78" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <circle cx="240" cy="155" r="42" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx="240" cy="155" r="10" fill={color} fillOpacity="0.65" />
      <ellipse cx="240" cy="155" rx="115" ry="35" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
      <ellipse cx="240" cy="155" rx="115" ry="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
      {[[355,155],[240,40],[175,265],[125,155]].map(([cx,cy],i)=>(
        <g key={i}>
          <line x1="240" y1="155" x2={cx} y2={cy} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
          <circle cx={cx} cy={cy} r={i===0?5:3.5} fill={color} fillOpacity="0.55" />
        </g>
      ))}
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">CLOUD ORCHESTRATION</text>
    </svg>
  );
}
function Visual4({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <circle cx="240" cy="160" r="115" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <circle cx="240" cy="160" r="75" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      <circle cx="240" cy="160" r="40" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      <path d="M240 100 L240 260 M160 140 L320 220 M320 140 L160 220" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
      <rect x="190" y="130" width="100" height="100" rx="8" fill={color} fillOpacity="0.05" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx="240" cy="180" r="22" fill={color} fillOpacity="0.08" />
      <path d="M228 180 L236 188 L254 172" stroke={color} strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">SECURITY FRAMEWORK</text>
    </svg>
  );
}
function Visual5({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <circle cx="240" cy="155" r="115" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      {[-60,-30,0,30,60].map((lat,i)=>{
        const ry=115*Math.cos(lat*Math.PI/180);
        const y=155-115*Math.sin(lat*Math.PI/180);
        return <ellipse key={i} cx="240" cy={y} rx={ry} ry={ry*0.28} stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />;
      })}
      {[0,60,120].map((lon,i)=>(
        <ellipse key={i} cx="240" cy="155" rx={115*Math.abs(Math.cos(lon*Math.PI/180))} ry="115" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
      ))}
      {[[185,125],[295,110],[205,185],[330,160],[150,170],[265,220]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill={color} fillOpacity="0.6" />
      ))}
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">GLOBAL REACH</text>
    </svg>
  );
}
const VISUALS = [Visual0, Visual1, Visual2, Visual3, Visual4, Visual5];

/* ── Chevron icon ── */
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 9, height: 9 }}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/* ── Parse useCases string into array ── */
function parseCaps(useCases) {
  if (!useCases) return [];
  return useCases.split(',').map(s => s.trim()).filter(Boolean);
}

/* ════════════════════════════════════════════════════
   MAIN LAYOUT
   ════════════════════════════════════════════════════ */
export default function ServicePageLayout({
  eyebrow, title, introParagraphs, sections,
  stackTitle, stackItems, faqItems, ctaHeading, ctaText,
  breadcrumbLabel, processSteps, metrics, heroImage,
}) {
  const containerRef    = useRef(null);
  const overlayRef      = useRef(null);
  const heroBandImgRef  = useRef(null);
  const steps = processSteps || DEFAULT_PROCESS;

  /* ── scroll to top on mount ── */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── GSAP animations ── */
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const has = (sel) => !!root.querySelector(sel);

    const ctx = gsap.context(() => {

      /* 1 ── PAGE ENTRANCE ───────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // dark overlay lifts away
      if (has('.ip2-overlay')) {
        tl.to('.ip2-overlay', { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
          .set('.ip2-overlay', { display: 'none' }, 0.6);
      }

      // breadcrumb fades
      if (has('.ip2-bc'))         tl.from('.ip2-bc',         { opacity: 0, y: 10, duration: 0.5 }, 0.25);

      // eyebrow + title words clip-reveal from bottom, staggered
      if (has('.ip2-eyebrow'))    tl.from('.ip2-eyebrow',    { y: 30, opacity: 0, duration: 0.6 }, 0.3);
      if (has('.ip2-title-word')) tl.from('.ip2-title-word', { y: '110%', opacity: 0, duration: 0.75, stagger: 0.06 }, 0.35);

      // subtitle
      if (has('.ip2-sub'))        tl.from('.ip2-sub',        { y: 28, opacity: 0, duration: 0.65 }, 0.55);

      // metrics (optional — not every page has them)
      const metricEls = gsap.utils.toArray('.ip2-metric');
      if (metricEls.length) {
        tl.from(metricEls, { y: 18, opacity: 0, stagger: 0.1, duration: 0.5 }, 0.65);
      }

      // hero rule scales in from left
      if (has('.ip2-hero-rule')) tl.from('.ip2-hero-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power4.out' }, 0.5);

      /* 2 ── HERO BAND image reveal ─────────────── */
      if (heroBandImgRef.current) {
        gsap.fromTo(
          heroBandImgRef.current,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.4, ease: 'power3.inOut',
            scrollTrigger: { trigger: heroBandImgRef.current, start: 'top 95%', once: true },
          }
        );
      }

      /* 3 ── INTRO SECTION right paras ──────────────── */
      const introParaEls = gsap.utils.toArray('.ip2-intro-r p');
      if (introParaEls.length) {
        gsap.from(introParaEls, {
          scrollTrigger: { trigger: '.ip2-intro', start: 'top 68%', once: true },
          y: 40, opacity: 0, stagger: 0.13, duration: 0.75, delay: 0.15,
        });
      }

      /* 4 ── PROCESS — entrance stagger ─────────────── */
      if (has('.ip2-process')) {
        if (has('.ip2-process .ip2-sec-label')) gsap.from('.ip2-process .ip2-sec-label', {
          scrollTrigger: { trigger: '.ip2-process', start: 'top 84%', once: true },
          y: 20, opacity: 0, duration: 0.5,
        });
        if (has('.ip2-process h2')) gsap.from('.ip2-process h2', {
          scrollTrigger: { trigger: '.ip2-process', start: 'top 82%', once: true },
          y: 40, opacity: 0, duration: 0.75,
        });
        if (has('.ip2-proc-card')) gsap.from('.ip2-proc-card', {
          scrollTrigger: { trigger: '.ip2-proc-grid', start: 'top 80%', once: true },
          y: 50, opacity: 0, stagger: 0.12, duration: 0.7,
        });
      }

      /* 4 ── SERVICES HEADER ─────────────────────────── */
      if (has('.ip2-rows-hdr')) {
        if (has('.ip2-rows-hdr .ip2-sec-label')) gsap.from('.ip2-rows-hdr .ip2-sec-label', {
          scrollTrigger: { trigger: '.ip2-rows-hdr', start: 'top 82%', once: true },
          y: 20, opacity: 0, duration: 0.5,
        });
        if (has('.ip2-rows-hdr h2')) gsap.from('.ip2-rows-hdr h2', {
          scrollTrigger: { trigger: '.ip2-rows-hdr', start: 'top 80%', once: true },
          y: 45, opacity: 0, duration: 0.8, delay: 0.08,
        });
      }

      /* 5 ── SERVICE ROWS — split left/right reveal ─── */
      gsap.utils.toArray('.ip2-row').forEach((row) => {
        const vis     = row.querySelector('.ip2-row-vis');
        const content = row.querySelector('.ip2-row-content');
        const meta    = row.querySelector('.ip2-row-meta');

        const st = { trigger: row, start: 'top 80%', once: true };

        if (meta)    gsap.from(meta,    { scrollTrigger: st, opacity: 0, x: -20, duration: 0.5 });
        if (vis)     gsap.from(vis,     { scrollTrigger: st, x: -90, opacity: 0, duration: 0.95, ease: 'power3.out', delay: 0.05 });
        if (content) gsap.from(content, { scrollTrigger: st, x: 90,  opacity: 0, duration: 0.95, ease: 'power3.out', delay: 0.1 });
      });

      /* 6 ── TECH STACK ─────────────────────────────── */
      if (has('.ip2-stack')) {
        gsap.from('.ip2-stack .ip2-sec-label, .ip2-stack h2', {
          scrollTrigger: { trigger: '.ip2-stack', start: 'top 80%', once: true },
          y: 35, opacity: 0, stagger: 0.1, duration: 0.7,
        });
        if (has('.ip2-stack-item')) gsap.from('.ip2-stack-item', {
          scrollTrigger: { trigger: '.ip2-stack-grid', start: 'top 82%', once: true },
          y: 35, opacity: 0, stagger: 0.07, duration: 0.65,
        });
      }

      /* 7 ── FAQ ─────────────────────────────────────── */
      if (has('.ip2-faq')) {
        if (has('.ip2-faq-top'))  gsap.from('.ip2-faq-top', {
          scrollTrigger: { trigger: '.ip2-faq', start: 'top 78%', once: true },
          y: 40, opacity: 0, duration: 0.75,
        });
        if (has('.ip2-faq-item')) gsap.from('.ip2-faq-item', {
          scrollTrigger: { trigger: '.ip2-faq-list', start: 'top 82%', once: true },
          y: 25, opacity: 0, stagger: 0.08, duration: 0.6,
        });
      }

      /* 8 ── CTA ─────────────────────────────────────── */
      if (has('.ip2-cta')) {
        if (has('.ip2-cta-left'))  gsap.from('.ip2-cta-left',  { scrollTrigger: { trigger: '.ip2-cta', start: 'top 78%', once: true }, y: 50, opacity: 0, duration: 0.85 });
        if (has('.ip2-cta-right')) gsap.from('.ip2-cta-right', { scrollTrigger: { trigger: '.ip2-cta', start: 'top 76%', once: true }, y: 50, opacity: 0, duration: 0.85, delay: 0.12 });
      }

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);  

  return (
    <div ref={containerRef}>
      {/* ── Page entrance overlay ── */}
      <div className="ip2-overlay" ref={overlayRef} />

      <InnerNavbar />

      {/* ════ HERO ════ */}
      <section className="ip2-hero">
        <div className="ip2-hero-inner">
          <nav className="ip2-bc">
            <Link to="/">Home</Link>
            <ChevronRight />
            <Link to="/services">Services</Link>
            <ChevronRight />
            <span>{breadcrumbLabel}</span>
          </nav>

          <span className="ip2-eyebrow">{eyebrow}</span>
          <h1 className="ip2-title">
            {title.split(' ').map((word, i) => (
              <span key={i} className="ip2-word-wrap">
                <span className="ip2-title-word">{word}</span>
              </span>
            ))}
          </h1>
          {metrics && (
            <div className="ip2-metrics">
              {metrics.map((m, i) => (
                <div className="ip2-metric" key={i}>
                  <span className="ip2-metric-num">{m.number}</span>
                  <span className="ip2-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="ip2-hero-rule" />
      </section>

      {/* ════ FULL-WIDTH HERO IMAGE BAND ════ */}
      <div className="ip2-hero-band" ref={heroBandImgRef}>
        <img
          className="svc-spec-img"
          src={heroImage || '/assets/team-visual.jpg'}
          alt={eyebrow}
        />
      </div>

      {/* ════ INTRO ════ */}
      <section className="ip2-intro">
        <div className="ip2-intro-inner">
          <div className="ip2-intro-l">
            <ScrollReveal baseOpacity={0.1} enableBlur={true} baseRotation={3} blurStrength={6}>
              {introParagraphs[0]}
            </ScrollReveal>
          </div>
          {introParagraphs.length > 1 && (
            <div className="ip2-intro-r">
              {introParagraphs.slice(1).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <section className="ip2-process">
        <div className="ip2-process-inner">
          <div className="ip2-sec-label"><span>• PROCESS</span></div>
          <h2>How We Approach Every Engagement</h2>
          <div className="ip2-proc-grid">
            {steps.map((s, i) => (
              <div className="ip2-proc-card" key={i}>
                <span className="ip2-proc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SERVICE ROWS ════ */}
      <section className="ip2-rows">
        <div className="ip2-rows-hdr">
          <div className="ip2-sec-label"><span>• OUR SERVICES</span></div>
          <h2>What We Deliver in {eyebrow}</h2>
        </div>

        {sections.map((s, i) => {
          const VisualComp = VISUALS[i % VISUALS.length];
          const caps = parseCaps(s.useCases);
          const vizColor = s.color || '#ffffff';
          const tag = s.heading.replace(/[^A-Za-z\s]/g, '').trim()
            .split(' ').slice(0, 3).join(' ').toUpperCase();

          return (
            <div className="ip2-row" key={i}>
              <div className="ip2-row-meta"><span>• {tag}</span></div>
              <div className="ip2-row-vis">
                <VisualComp color={vizColor} />
              </div>
              <div className="ip2-row-content">
                <h3>{s.heading}</h3>
                {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                {caps.length > 0 && (
                  <div className="ip2-caps">
                    <span className="ip2-caps-label">CAPABILITIES</span>
                    <ul>
                      {caps.map((c, k) => <li key={k}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* ════ TECH STACK ════ */}
      <section className="ip2-stack">
        <div className="ip2-stack-inner">
          <div className="ip2-sec-label"><span>• TECH STACK</span></div>
          <h2>{stackTitle}</h2>
          <div className="ip2-stack-grid">
            {stackItems.map((item, i) => (
              <div className="ip2-stack-item" key={i}>
                <span className="ip2-stack-num">0{i + 1}</span>
                <h3>{item.label}</h3>
                <p>{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="ip2-faq">
        <div className="ip2-faq-inner">
          <div className="ip2-faq-top">
            <div className="ip2-sec-label"><span>• FAQ</span></div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="ip2-faq-list">
            {faqItems.map((item, i) => <FaqAccordion key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="ip2-cta">
        <div className="ip2-cta-inner">
          <div className="ip2-cta-left">
            <p className="ip2-cta-small">WANT TO START A PROJECT?</p>
            <h2>{ctaHeading}</h2>
          </div>
          <div className="ip2-cta-right">
            <p>{ctaText}</p>
            <Link to="/#contact" className="ip2-cta-btn">
              Start a Conversation <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
