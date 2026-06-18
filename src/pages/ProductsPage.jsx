import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
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

/* ── All 8 products ── */
const PRODUCTS = [
  {
    id: 'hrms', name: 'HRMS', cat: 'HR Automation',
    desc: 'Payroll, attendance, leave, recruitment, appraisals and statutory compliance — the full employee lifecycle in one system.',
    caps: ['Automated payroll with statutory deductions', 'Biometric & mobile attendance', 'Leave and holiday management', 'Performance appraisal workflows', 'Recruitment and digital onboarding', 'ESI, PF, compliance reports'],
  },
  {
    id: 'practice', name: 'Practice Management', cat: 'Healthcare & Legal',
    desc: 'Appointments, patient or case records, billing and compliance for clinics, hospitals and law firms at any scale.',
    caps: ['Appointment scheduling and reminders', 'Patient/client record management', 'Invoice generation and payments', 'Clinical notes and case files', 'Insurance and regulatory tools', 'Multi-branch, multi-practitioner'],
  },
  {
    id: 'dms', name: 'Document Management', cat: 'Enterprise DMS',
    desc: 'Centralised storage, version control, approval workflows, e-signatures and role-based access — eliminating paper chaos at scale.',
    caps: ['Centralised storage with folder hierarchy', 'Version control and audit trail', 'Multi-stage approval workflows', 'Digital e-signature integration', 'Role-based access permissions', 'Full-text search across all docs'],
  },
  {
    id: 'visitor', name: 'Visitor Management', cat: 'Front-Desk Automation',
    desc: 'Digital check-in, ID verification, host alerts, badge printing and visitor log analytics — replacing paper registers.',
    caps: [],
  },
  {
    id: 'litigation', name: 'Litigation Management', cat: 'Legal Case Tracking',
    desc: 'Court dates, case files, document linking, task assignment and billing — built specifically for law firms and in-house legal teams.',
    caps: [],
  },
  {
    id: 'crm', name: 'Lead & Sales CRM', cat: 'Pipeline Intelligence',
    desc: 'Full-funnel CRM with lead capture, pipeline management, deal scoring, activity tracking and automated follow-up sequences.',
    caps: [],
  },
  {
    id: 'ecommerce', name: 'E-Commerce Platform', cat: 'Multi-Vendor Commerce',
    desc: 'Multi-vendor marketplace or single-brand storefront with inventory, payments, shipping integration and analytics.',
    caps: [],
  },
  {
    id: 'erp', name: 'Custom ERP', cat: 'ERPNext-Powered',
    desc: 'Full-suite ERP on ERPNext covering manufacturing, finance, HR, supply chain and CRM — configured to your workflows.',
    caps: [],
  },
];

/* ── FAQ ── */
const FAQS = [
  {
    q: 'Are TechBird products off-the-shelf or custom-built?',
    a: 'Both. Each product ships with a production-ready core — you can be live in weeks, not months. Where your workflows differ from the standard, we configure or extend the platform.',
  },
  {
    q: 'Can the products integrate with our existing systems?',
    a: 'Yes. Every TechBird product is built with open APIs and supports integration with ERP, accounting software, biometric devices, payment gateways, communication platforms and cloud services.',
  },
  {
    q: 'Do you provide implementation and training?',
    a: 'Implementation is included — requirements, configuration, data migration, UAT and go-live support. Training covers administrators and end-users.',
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

/* ── product → detail route map ── */
const ROUTES = {
  hrms:       '/products/hrms',
  crm:        '/products/crm',
  erp:        '/products/erp',
  dms:        '/products/document-management',
  practice:   '/products/practice-management',
  visitor:    '/products/visitor-management',
  litigation: '/products/litigation-management',
  ecommerce:  '/products/ecommerce',
};

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
        description="Eight production-grade enterprise platforms by TechBird — HRMS, CRM, ERP, Document Management, Practice Management, Visitor Management, Litigation Management and E-Commerce."
        keywords="TechBird products, enterprise software, HRMS, CRM, ERP, document management, practice management, visitor management, litigation management, ecommerce platform"
        faqItems={FAQS}
      />
      <InnerNavbar />

      {/* ══ HERO ══ */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Our Platforms</p>
            <h1 className="ihero-h1">Products built for<br /><span>enterprise reality.</span></h1>
            <p className="ihero-sub">Eight production-grade platforms — deployed on-premise or cloud — each solving a distinct operational problem. Built on ERPNext and modern stacks. Configured to your workflows.</p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Link to="/contact" className="icta-btn" style={{ fontSize: '0.78rem', padding: '0.7rem 1.4rem' }}>Request a Demo</Link>
              <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>See in Action →</a>
            </div>
          </div>
          <div className="ihero-img-side">
            <img src="/assets/products-hero-bg.jpg" alt="Enterprise software development" className="ihero-img" loading="eager" />
          </div>
        </div>
      </section>

      {/* ══ PRODUCT INDEX — editorial table of contents ══ */}
      <section className="px-index" id="products">
        <div className="px-wrap">
          <div className="px-index-head" data-reveal>
            <span className="px-ey">All Platforms</span>
          </div>
          <div className="px-list">
            {PRODUCTS.map((p, i) => (
              <Link to={ROUTES[p.id]} className="px-row" key={p.id} data-reveal>
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

      {/* ══ SPOTLIGHT — 3 flagship products on white bg ══ */}
      <section className="px-spot">
        <div className="px-wrap">
          <div className="px-spot-head" data-reveal>
            <span className="px-ey px-ey--dark">Featured</span>
            <h2 className="px-h2 px-h2--dark">A closer look at<br />three flagship products.</h2>
            <p className="px-muted-text px-muted-text--dark">Each built for a specific domain. Deployed across 50+ enterprise clients.</p>
          </div>
          <div className="px-bento">
            <Link to="/products/hrms" className="px-card" data-reveal data-num="01">
              <span className="px-card-cat">HR Automation</span>
              <h3 className="px-card-name">HRMS</h3>
              <p className="px-card-desc">The full employee lifecycle — offer letter to exit clearance. Payroll in minutes. Attendance synced. Leave balances in real time.</p>
              <ul className="px-card-caps">
                {PRODUCTS[0].caps.slice(0, 5).map((c) => <li key={c}>{c}</li>)}
              </ul>
              <span className="px-card-link">Explore HRMS <ArrowUpRight /></span>
            </Link>
            <Link to="/products/practice-management" className="px-card" data-reveal data-num="02">
              <span className="px-card-cat">Healthcare & Legal</span>
              <h3 className="px-card-name">Practice Management</h3>
              <p className="px-card-desc">Scheduling, records, billing and compliance in one interface for clinics, hospitals and law firms.</p>
              <ul className="px-card-caps">
                {PRODUCTS[1].caps.slice(0, 5).map((c) => <li key={c}>{c}</li>)}
              </ul>
              <span className="px-card-link">Explore <ArrowUpRight /></span>
            </Link>
            <Link to="/products/document-management" className="px-card" data-reveal data-num="03">
              <span className="px-card-cat">Enterprise DMS</span>
              <h3 className="px-card-name">Document Management</h3>
              <p className="px-card-desc">Centralised storage with version control, approvals, e-signatures and role-based access.</p>
              <ul className="px-card-caps">
                {PRODUCTS[2].caps.slice(0, 5).map((c) => <li key={c}>{c}</li>)}
              </ul>
              <span className="px-card-link">Explore <ArrowUpRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ NUMBERS ══ */}
      <section className="px-nums">
        <div className="px-wrap">
          <div className="px-nums-row">
            {[
              { val: '8',     label: 'Production-grade platforms' },
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
              <p className="px-cta-body" data-reveal>No sales pitch. No 47-slide deck. A focused 30-minute demo of the product most relevant to your operations — with your actual workflows in mind.</p>
              <Link to="/contact" className="px-cta-btn" data-reveal>Book a Demo <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
