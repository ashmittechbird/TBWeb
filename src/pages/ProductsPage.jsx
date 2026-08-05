import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { LIVE_PRODUCTS, LIVE_PRODUCT_COUNT } from '../data/products';
import { scrollToTarget } from '../lib/smoothScroll';
import '../styles/inner.css';
import '../styles/products.css';

/* ── Icons ── */
const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const ChevDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

/* Products come from the single source of truth in src/data/products.js */
const PRODUCTS = LIVE_PRODUCTS;

/* First three live products get the spotlight treatment */
const SPOTLIGHT = LIVE_PRODUCTS.slice(0, 3);

/* ── FAQ ── */
const FAQS = [
  {
    q: 'Are TechBird products off-the-shelf or custom-built?',
    a: 'Both. Each product ships with a production-ready core, so you can be live in weeks, not months. Where your workflows differ from the standard, we configure or extend the platform.',
  },
  {
    q: 'Can the products integrate with our existing systems?',
    a: 'Yes. Every TechBird product is built with open APIs and supports integration with ERP, accounting software, biometric devices, payment gateways, communication platforms and cloud services.',
  },
  {
    q: 'Do you provide implementation and training?',
    a: 'Implementation is included: requirements, configuration, data migration, UAT and go-live support. Training covers administrators and end-users.',
  },
  {
    q: 'Can your products be deployed on-premise or our own cloud?',
    a: 'Yes. All products can be deployed on-premise, on a private cloud (AWS, GCP, Azure), or as a managed hosted service.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Standard deployments run 4–8 weeks from sign-off to go-live. Complex implementations with data migration and integration run 10–16 weeks.',
  },
];

/* ── FAQ accordion ── */
function FaqSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  return (
    <section className="px-faq">
      <div className="px-wrap">
        <div className="px-faq-grid">
          <div className="px-faq-left">
            <span className="px-ey">FAQ</span>
            <h2 className="px-h2">Common<br />questions</h2>
            <p className="px-muted-text">Everything you need to know before starting a product engagement.</p>
          </div>
          <div className="px-faq-list">
            {FAQS.map((item, i) => (
              <div key={i} className={`px-faq-item${open === i ? ' open' : ''}`} onClick={() => toggle(i)}>
                <div className="px-faq-q">
                  <span>{item.q}</span>
                  <span className="px-faq-chev"><ChevDown /></span>
                </div>
                <div className="px-faq-a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
export default function ProductsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Our Products"
        description="Five production-grade enterprise platforms by TechBird - HRMS, Lead & Sales CRM, Document Management, Litigation Management and Travel & Expense Management."
        keywords="TechBird products, enterprise software, HRMS, sales CRM, document management system, litigation management, travel and expense management"
        faqItems={FAQS}
      />
      <InnerNavbar />

      {/* ══ HERO ══ */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Our Platforms</p>
            <h1 className="ihero-h1">Products built for<br /><span>enterprise reality.</span></h1>
            <p className="ihero-sub">Five production-grade platforms, deployed on-premise or cloud, each solving a distinct operational problem. Built on ERPNext and modern stacks. Configured to your workflows.</p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Link to="/contact" className="icta-btn" style={{ fontSize: '0.78rem', padding: '0.7rem 1.4rem' }}>Request a Demo</Link>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(document.getElementById('products'));
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
              >See in Action →</a>
            </div>
          </div>
          <div className="ihero-img-side">
            <img src="/assets/products-hero-bg.webp" alt="Enterprise software development" className="ihero-img" loading="eager" />
          </div>
        </div>
      </section>

      {/* ══ PRODUCT INDEX - editorial table of contents ══ */}
      <section className="px-index" id="products">
        <div className="px-wrap">
          <div className="px-index-head" data-reveal>
            <span className="px-ey">All Platforms</span>
          </div>
          <div className="px-list">
            {PRODUCTS.map((p, i) => (
              <Link to={p.route} className="px-row" key={p.id} data-reveal>
                <span className="px-row-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="px-row-content">
                  <h3 className="px-row-name">{p.name}</h3>
                  <p className="px-row-desc">{p.desc}</p>
                </div>
                <span className="px-row-cat">{p.cat}</span>
                <span className="px-row-go"><ArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPOTLIGHT - 3 flagship products on white bg ══ */}
      <section className="px-spot">
        <div className="px-wrap">
          <div className="px-spot-head" data-reveal>
            <span className="px-ey px-ey--dark">Featured</span>
            <h2 className="px-h2 px-h2--dark">A closer look at<br />three flagship products.</h2>
            <p className="px-muted-text px-muted-text--dark">Each built for a specific domain. Deployed across 50+ enterprise clients.</p>
          </div>
          <div className="px-bento">
            {SPOTLIGHT.map((p, i) => (
              <Link to={p.route} className="px-card" key={p.id} data-reveal data-num={String(i + 1).padStart(2, '0')}>
                <span className="px-card-cat">{p.cat}</span>
                <h3 className="px-card-name">{p.name}</h3>
                <p className="px-card-desc">{p.desc}</p>
                <ul className="px-card-caps">
                  {p.caps.slice(0, 5).map((c) => <li key={c}>{c}</li>)}
                </ul>
                <span className="px-card-link">Explore {p.name} <ArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NUMBERS ══ */}
      <section className="px-nums">
        <div className="px-wrap">
          <div className="px-nums-row">
            {[
              { val: String(LIVE_PRODUCT_COUNT), label: 'Production-grade platforms' },
              { val: '50+',   label: 'Enterprise clients deployed' },
              { val: '20+',   label: 'Countries served globally' },
              { val: '99.9%', label: 'Uptime SLA guaranteed' },
            ].map((s) => (
              <div className="px-num" key={s.val} data-reveal>
                <span className="px-num-val">{s.val}</span>
                <span className="px-num-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <FaqSection />

      {/* ══ CTA ══ */}
      <section className="px-cta">
        <div className="px-wrap">
          <div className="px-cta-split">
            <div>
              <span className="px-ey px-ey--dark">Get started</span>
              <h2 className="px-h2 px-h2--dark" data-reveal>See a product<br />in action?</h2>
            </div>
            <div>
              <p className="px-cta-body" data-reveal>No sales pitch. No 47-slide deck. A focused 30-minute demo of the product most relevant to your operations, with your actual workflows in mind.</p>
              <Link to="/contact" className="px-cta-btn" data-reveal>Book a Demo <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
