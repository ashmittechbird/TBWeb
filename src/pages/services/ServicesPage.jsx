import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../../components/InnerNavbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import '../../styles/inner.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Service icons ─── */
const IconCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconCloud = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
  </svg>
);
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ─── Left column text cards (supporting services) ─── */
const TEXT_CARDS = [
  {
    id: 'tc1',
    icon: <IconCloud />,
    cat: 'AWS · GCP · Azure · CI/CD',
    title: <>Cloud &amp;<br />DevOps</>,
    desc: 'Robust cloud environments and DevOps pipelines designed for 99.9% uptime and secure growth.',
    to: '/services/cloud-devops',
    bgImg: '/assets/svc-cloud.webp',
  },
  {
    id: 'tc2',
    icon: <IconChart />,
    cat: 'CRM · ADTech · Dashboards',
    title: 'MarTech',
    desc: 'Optimized MarTech stacks spanning CRM, analytics, automation and customer data platforms.',
    to: '/services/martech',
    bgImg: '/assets/svc-martech.webp',
  },
  {
    id: 'tc3',
    icon: <IconTarget />,
    cat: 'GTM · SEO · SEM · SMM',
    title: <>Marketing<br />Strategy</>,
    desc: 'GTM, SEO, SEM and social campaigns aligned with your business goals for sustainable growth.',
    to: '/services/marketing',
    bgImg: '/assets/svc-marketing.webp',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Do you work on individual services or do clients have to take everything?',
    a: 'Both. Many clients start with a single service - an ERP implementation, a cloud migration, or a marketing campaign - and expand as they see results. Others engage us across multiple disciplines from day one because they want a single accountable team. There is no minimum scope.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Scope determines timeline. A focused web application can ship in 6–10 weeks. An enterprise ERP implementation runs 12–24 weeks depending on complexity and data migration. AI model development varies from 4 weeks for a focused deployment to 6+ months for custom model training. Every project starts with a discovery phase that produces a realistic timeline before any commitment is made.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. We have delivered projects across the UK, US, UAE, Southeast Asia and Africa. We operate across time zones - asynchronous collaboration for day-to-day work, live calls scheduled to overlap with your team. Our pricing is transparent and fixed-scope, so geography doesn\'t create billing surprises.',
  },
  {
    q: 'What does a project engagement look like end to end?',
    a: 'Every project follows the same structure: a discovery call to understand your goals, a scoped proposal with fixed deliverables and timeline, an onboarding session to set up communication and tooling, then sprint-based delivery with weekly check-ins. You get a shared dashboard, direct Slack access to your team, and a single project lead accountable for outcomes.',
  },
  {
    q: 'Can you take over a project that someone else started?',
    a: 'Yes. We regularly take over projects mid-flight - inherited codebases, stalled ERP implementations, underperforming campaigns. We start with an audit to understand what exists, what works and what needs to change, then build a remediation plan before touching anything. We are honest about what is salvageable and what is not.',
  },
  {
    q: 'How do you price your services?',
    a: 'We price by deliverable, not by the hour. Fixed-scope projects give you cost certainty from the start. For ongoing engagements - managed cloud, marketing retainers, support contracts - we use monthly retainer pricing with defined SLAs. We don\'t do open-ended time-and-materials billing that transfers project risk onto the client.',
  },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="ip2-faq">
      <div className="ip2-faq-inner">
        <div className="ip2-faq-top">
          <span className="ip2-eyebrow">FAQ</span>
          <h2 data-reveal>Common<br />questions</h2>
        </div>
        <div className="ip2-faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`tb-faq-item${openIdx === i ? ' open' : ''}`}
              onClick={() => toggle(i)}
            >
              <div className="tb-faq-header">
                <span className="tb-faq-q">{item.q}</span>
                <span className="tb-faq-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </span>
              </div>
              <div className="tb-faq-body">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const bentoRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* GSAP stagger on bento cells */
  useEffect(() => {
    if (!bentoRef.current) return;
    const cells = bentoRef.current.querySelectorAll('.b-cell');
    const ctx = gsap.context(() => {
      gsap.fromTo(cells,
        { opacity: 0, y: 48, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: bentoRef.current, start: 'top 76%' },
        }
      );
    }, bentoRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Our Services"
        description="Six disciplines, one team - custom software development, AI solutions, cloud & DevOps, 2D/3D animation, marketing strategy and MarTech. TechBird delivers end-to-end digital transformation for enterprises worldwide."
        keywords="IT services, software development, AI solutions, cloud DevOps, animation, marketing strategy, MarTech, ERP, TechBird"
        faqItems={FAQ_ITEMS}
      />
      <InnerNavbar />

      {/* ── Hero ── */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">What we do</p>
            <h1 className="ihero-h1">Six disciplines.<br /><span>One team.</span></h1>
            <p className="ihero-sub">From ERP rollouts to AI pipelines, from cloud infrastructure to creative production, each service connects to the others. One team, accountable for every outcome.</p>
          </div>
          <div className="ihero-img-side">
            <img src="/assets/services-hero-bg.webp" alt="Software development workspace" className="ihero-img" loading="eager" />
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="svc-bento-section">
        <div className="svc-bento-wrap">

          <div className="svc-bento-grid" ref={bentoRef}>

            {/* ── Left column - 3 supporting text cards ── */}
            {TEXT_CARDS.map((card) => (
              <Link to={card.to} className="b-cell b-text-card" key={card.id}>
                {card.bgImg && <>
                  <img src={card.bgImg} className="b-card-img" alt={typeof card.title === 'string' ? card.title : ''} loading="lazy" style={{ opacity: 0.4 }} />
                  <div className="b-card-color-wash" style={{ background: 'linear-gradient(160deg, rgba(8,8,10,0.82) 0%, rgba(8,8,10,0.55) 50%, rgba(8,8,10,0.35) 100%)' }} />
                </>}
                <div className="btc-icon" style={{ position: 'relative', zIndex: 2 }}>{card.icon}</div>
                <div className="btc-body" style={{ position: 'relative', zIndex: 2 }}>
                  <p className="btc-cat">{card.cat}</p>
                  <h3 className="btc-title">{card.title}</h3>
                  <p className="btc-desc">{card.desc}</p>
                </div>
                <div className="btc-arrow" style={{ position: 'relative', zIndex: 2 }}><ArrowUpRight /></div>
              </Link>
            ))}

            {/* ── CENTER HERO - Software Development (main focus) ── */}
            <Link to="/services/software-development" className="b-cell b-center-card">
              <img src="/assets/team-visual.webp" className="b-card-img" alt="Software Development" loading="lazy" />
              <div className="b-card-color-wash b-wash-purple" />

              {/* Floating tag top-left */}
              <div className="b-center-tag">
                <IconCode />
                <span>Software Development</span>
              </div>

              <div className="b-center-content">
                <span className="b-center-cat">ERP · WebApp · APIs · SaaS</span>
                <h3 className="b-center-title">Build.<br />Scale.<br />Dominate.</h3>
                <p className="b-center-desc">
                  Custom ERP systems, enterprise web apps, mobile platforms and SaaS solutions - engineered for scale across 50+ countries.
                </p>
                <span className="b-center-cta">
                  Explore our work
                  <span className="b-center-cta-icon"><ArrowUpRight /></span>
                </span>
              </div>
            </Link>

            {/* ── Right top - AI Solutions visual card (ai-core image) ── */}
            <Link to="/services/ai-solutions" className="b-cell b-visual-card">
              <img src="/assets/ai-core.webp" className="b-card-img" alt="AI Solutions" loading="lazy" />
              <div className="b-card-color-wash b-wash-blue" />
              <div className="b-vis-content">
                <span className="b-vis-cat">Custom Models · Consulting</span>
                <h3 className="b-vis-title">AI Solutions</h3>
                <span className="b-vis-cta">Explore <ArrowUpRight /></span>
              </div>
            </Link>

            {/* ── Right bottom - Animation card with bg image ── */}
            <Link to="/services/animation" className="b-cell b-text-card b-last">
              <img src="/assets/svc-animation.webp" className="b-card-img" alt="Animation" loading="lazy" style={{ opacity: 0.4 }} />
              <div className="b-card-color-wash" style={{ background: 'linear-gradient(160deg, rgba(8,8,10,0.82) 0%, rgba(8,8,10,0.55) 50%, rgba(8,8,10,0.35) 100%)' }} />
              <div className="btc-icon" style={{ position: 'relative', zIndex: 2 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <div className="btc-body" style={{ position: 'relative', zIndex: 2 }}>
                <p className="btc-cat">CGI · VFX · AR · VR</p>
                <h3 className="btc-title">2D &amp; 3D<br />Animation</h3>
                <p className="btc-desc">Immersive CGI, VFX and AR/VR experiences crafted for global brands.</p>
              </div>
              <div className="btc-arrow" style={{ position: 'relative', zIndex: 2 }}><ArrowUpRight /></div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── Why TechBird ── */}
      <section className="ip2-intro">
        <div className="ip2-intro-inner">
          <p className="ip2-intro-quote" data-reveal>
            "Six disciplines. One team. Zero handoff gaps."
          </p>
          <div className="ip2-intro-r">
            <p data-reveal>
              Most agencies specialise in one thing and refer everything else. That model creates coordination overhead, blame gaps, and results that don't add up to a coherent outcome. TechBird is built differently - every discipline under the same roof, on the same project, accountable for the same result.
            </p>
            <p data-reveal data-delay="1">
              Whether you need an ERP rollout, an AI pipeline, a cloud migration, a brand campaign, or all of the above - you deal with one team, one point of contact, and one deliverable standard. No vendor management. No integration headaches. Just outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="ip2-process">
        <div className="ip2-process-inner" style={{ padding: '5.5rem var(--ip-px)' }}>
          <h2 data-reveal>How we work</h2>
          <div className="ip2-proc-grid">
            {[
              {
                num: '01',
                title: 'Discover',
                desc: 'We start with your operations, not a template. Every engagement opens with a structured discovery - mapping processes, identifying bottlenecks and defining what success actually looks like for your business.',
              },
              {
                num: '02',
                title: 'Design',
                desc: 'Architecture decisions, service blueprints and creative direction are locked before a single line is written or a single pixel is placed. This phase eliminates the expensive rework that kills most projects.',
              },
              {
                num: '03',
                title: 'Build',
                desc: 'Cross-functional teams execute in parallel - software, cloud, creative and marketing moving together. Weekly check-ins, shared dashboards and direct Slack access keep you in the loop without slowing us down.',
              },
              {
                num: '04',
                title: 'Scale',
                desc: 'Launch is the beginning, not the end. We monitor, iterate and scale every delivery - performance tuning, campaign optimisation, infrastructure scaling and product evolution as your business grows.',
              },
            ].map((step) => (
              <div className="ip2-proc-card" key={step.num} data-reveal>
                <span className="ip2-proc-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="ip2-stack">
        <div className="ip2-stack-inner">
          <h2 data-reveal>Industries we serve</h2>
          <div className="ip2-stack-grid">
            {[
              { num: '01', title: 'Manufacturing', desc: 'ERP, production planning, quality control, supply chain visibility and IoT integration.' },
              { num: '02', title: 'Healthcare & Pharma', desc: 'Practice management, LIMS, patient portals, regulatory compliance and clinical data systems.' },
              { num: '03', title: 'Retail & E-Commerce', desc: 'Omnichannel platforms, inventory management, POS integration and customer data platforms.' },
              { num: '04', title: 'Legal & Professional Services', desc: 'Litigation management, document automation, client portals and time-billing systems.' },
              { num: '05', title: 'Finance & BFSI', desc: 'Fintech apps, loan origination systems, compliance dashboards and secure data infrastructure.' },
              { num: '06', title: 'Real Estate & Construction', desc: 'Project management ERP, CRM, site inspection apps and investor reporting dashboards.' },
              { num: '07', title: 'Logistics & Transport', desc: 'Fleet tracking, route optimisation, delivery apps and warehouse management systems.' },
              { num: '08', title: 'Education & EdTech', desc: 'LMS platforms, admissions portals, student information systems and e-learning products.' },
            ].map((ind) => (
              <div className="ip2-stack-item" key={ind.num} data-reveal>
                <span className="ip2-stack-num">{ind.num}</span>
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CTA ── */}
      <div className="ip2-cta">
        <div className="ip2-cta-inner">
          <div className="ip2-cta-left">
            <p className="ip2-cta-small">GET STARTED</p>
            <h2 data-reveal>Ready to start a project?</h2>
          </div>
          <div className="ip2-cta-right">
            <p data-reveal>
              No pitch deck. No 47-slide proposal. Just a conversation about your specific problem and whether we can solve it.
            </p>
            <Link to="/contact" className="ip2-cta-btn" data-reveal>
              Start a Conversation <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
