import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import '../styles/inner.css';
import '../styles/products.css';

/* ── Icons ── */
const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const ChevDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── All 8 products ── */
const PRODUCTS = [
  {
    id: 'hrms',
    color: '#34d399',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    name: 'HRMS',
    cat: 'HR Automation',
    desc: 'Payroll, attendance, leave, recruitment, appraisals and statutory compliance — the full employee lifecycle in one system.',
    tags: ['Payroll', 'Attendance', 'Recruitment', 'Compliance'],
    caps: ['Automated payroll with statutory deductions', 'Biometric & mobile attendance', 'Leave and holiday management', 'Performance appraisal workflows', 'Recruitment and digital onboarding', 'ESI, PF, compliance reports'],
  },
  {
    id: 'practice',
    color: '#38bdf8',
    icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
    name: 'Practice Management',
    cat: 'Healthcare & Legal',
    desc: 'Appointments, patient or case records, billing and compliance for clinics, hospitals and law firms at any scale.',
    tags: ['Appointments', 'Billing', 'Records', 'Compliance'],
    caps: ['Appointment scheduling and reminders', 'Patient/client record management', 'Invoice generation and payments', 'Clinical notes and case files', 'Insurance and regulatory tools', 'Multi-branch, multi-practitioner'],
  },
  {
    id: 'dms',
    color: '#22d3ee',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
    name: 'Document Management',
    cat: 'Enterprise DMS',
    desc: 'Centralised storage, version control, approval workflows, e-signatures and role-based access — eliminating paper chaos at scale.',
    tags: ['Versioning', 'Workflows', 'E-Signature', 'Access Control'],
    caps: ['Centralised storage with folder hierarchy', 'Version control and audit trail', 'Multi-stage approval workflows', 'Digital e-signature integration', 'Role-based access permissions', 'Full-text search across all docs'],
  },
  {
    id: 'visitor',
    color: '#a3e635',
    icon: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
    name: 'Visitor Management',
    cat: 'Front-Desk Automation',
    desc: 'Digital check-in, ID verification, host alerts, badge printing and visitor log analytics — replacing paper registers.',
    tags: ['Check-In', 'Host Alerts', 'Badges', 'Analytics'],
    caps: [],
  },
  {
    id: 'litigation',
    color: '#fb923c',
    icon: 'M12 3v18M5 6l7-3 7 3M3 18h18M6 14l3-3M18 14l-3-3',
    name: 'Litigation Management',
    cat: 'Legal Case Tracking',
    desc: 'Court dates, case files, document linking, task assignment and billing — built specifically for law firms and in-house legal teams.',
    tags: ['Case Files', 'Court Dates', 'Billing', 'Tasks'],
    caps: [],
  },
  {
    id: 'crm',
    color: '#a78bfa',
    icon: 'M22 3H2l8 9.46V19l4 2V12.46L22 3z',
    name: 'Lead & Sales CRM',
    cat: 'Pipeline Intelligence',
    desc: 'Full-funnel CRM with lead capture, pipeline management, deal scoring, activity tracking and automated follow-up sequences.',
    tags: ['Pipeline', 'Lead Scoring', 'Automation', 'Reporting'],
    caps: [],
  },
  {
    id: 'ecommerce',
    color: '#f472b6',
    icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
    name: 'E-Commerce Platform',
    cat: 'Multi-Vendor Commerce',
    desc: 'Multi-vendor marketplace or single-brand storefront with inventory, payments, shipping integration and analytics.',
    tags: ['Multi-Vendor', 'Payments', 'Inventory', 'Analytics'],
    caps: [],
  },
  {
    id: 'erp',
    color: '#fbbf24',
    icon: 'M3 3h7v7H3zM14 3h7v7H14zM3 14h7v7H3zM14 14h7v7H14z',
    name: 'Custom ERP',
    cat: 'ERPNext-Powered',
    desc: 'Full-suite ERP on ERPNext covering manufacturing, finance, HR, supply chain and CRM — configured to your workflows.',
    tags: ['Manufacturing', 'Finance', 'Supply Chain', 'HR'],
    caps: [],
  },
];

/* ── FAQ ── */
const FAQS = [
  {
    q: 'Are TechBird products off-the-shelf or custom-built?',
    a: 'Both. Each product ships with a production-ready core — you can be live in weeks, not months. Where your workflows differ from the standard, we configure or extend the platform. We never force a workaround just to avoid customisation.',
  },
  {
    q: 'Can the products integrate with our existing systems?',
    a: 'Yes. Every TechBird product is built with open APIs and supports integration with ERP, accounting software, biometric devices, payment gateways, communication platforms (WhatsApp, email, SMS) and cloud services.',
  },
  {
    q: 'Do you provide implementation and training?',
    a: 'Implementation is included — requirements, configuration, data migration, UAT and go-live support. Training covers administrators and end-users. Post-go-live support contracts ensure you are never left alone after launch.',
  },
  {
    q: 'Can your products be deployed on-premise or our own cloud?',
    a: 'Yes. All products can be deployed on-premise, on a private cloud (AWS, GCP, Azure), or as a managed hosted service. Data sovereignty is a common requirement in our client base — we accommodate both models without technical trade-offs.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Standard deployments run 4–8 weeks from sign-off to go-live. Complex implementations with data migration and integration run 10–16 weeks. We publish a realistic timeline in the scoping phase and hold to it.',
  },
];

/* ── FAQ accordion ── */
function FaqSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  return (
    <section className="ph-faq">
      <div className="ph-faq-inner">
        <div className="ph-faq-left">
          <span className="ph-sec-eyebrow">FAQ</span>
          <h2 className="ph-faq-h2">Common<br />questions</h2>
          <p className="ph-faq-sub">Everything you need to know before starting a product engagement.</p>
        </div>
        <div className="ph-faq-list">
          {FAQS.map((item, i) => (
            <div key={i} className={`ph-faq-item${open === i ? ' open' : ''}`} onClick={() => toggle(i)}>
              <div className="ph-faq-row">
                <span className="ph-faq-q">{item.q}</span>
                <span className="ph-faq-chevron"><ChevDown /></span>
              </div>
              <div className="ph-faq-body">
                <p className="ph-faq-a">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <InnerNavbar />

      {/* ══ HERO ══
          Void background (#090a0c) · narrow aurora beam · 80px headline
          Product kanban screenshot floats bottom-right
      */}
      <section className="ph-hero">
        {/* Aurora vertical beam */}
        <div className="ph-aurora" aria-hidden="true">
          <div className="ph-aurora-beam" />
          <div className="ph-aurora-sun" />
        </div>

        <div className="ph-hero-inner">
          <div style={{ maxWidth: 600 }}>
            <span className="ph-eyebrow" data-reveal>Our Platforms</span>
            <h1 className="ph-hero-h1" data-reveal>
              Products<br />built for<br />enterprise<br /><em>reality.</em>
            </h1>
            <p className="ph-hero-lead" data-reveal>
              Eight production-grade platforms — deployed on-premise or cloud — each solving a distinct operational problem. Built on ERPNext and modern stacks. Configured to your workflows, not the other way around.
            </p>
            <div className="ph-hero-actions" data-reveal>
              <Link to="/contact" className="ph-btn-iris">Request a Demo</Link>
              <a href="#products" className="ph-btn-white">See in Action →</a>
            </div>
          </div>
        </div>

        {/* Floating kanban screenshot — bottom right */}
        <div className="ph-hero-screenshot">
          <div className="ph-screenshot-frame">
            <div className="ph-sf-titlebar">
              <span className="ph-sf-dot ph-sf-dot--r" />
              <span className="ph-sf-dot ph-sf-dot--y" />
              <span className="ph-sf-dot ph-sf-dot--g" />
              <span className="ph-sf-label">Products · Project Board</span>
            </div>
            <div className="ph-sf-body">
              <div className="ph-kanban">
                {/* BACKLOG col */}
                <div className="ph-kb-col">
                  <div className="ph-kb-col-head">Backlog</div>
                  {[
                    { title: 'HRMS payroll module', tag: 'HR', tagColor: '#34d399', av: ['A', 'B'] },
                    { title: 'DMS e-signature flow', tag: 'Docs', tagColor: '#22d3ee', av: ['C'] },
                  ].map((c) => (
                    <div className="ph-kb-card" key={c.title}>
                      <div className="ph-kb-card-title">{c.title}</div>
                      <span className="ph-kb-tag" style={{ color: c.tagColor, background: c.tagColor + '20' }}>{c.tag}</span>
                      <div className="ph-kb-avs">
                        {c.av.map((l, i) => (
                          <span className="ph-kb-av" key={i} style={{ background: ['#5683da', '#34d399', '#fb923c'][i % 3] }}>{l}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* IN PROGRESS col */}
                <div className="ph-kb-col">
                  <div className="ph-kb-col-head">In Progress</div>
                  {[
                    { title: 'Practice Mgmt billing integration', tag: 'Health', tagColor: '#38bdf8', av: ['D', 'E'] },
                    { title: 'CRM pipeline automation', tag: 'Sales', tagColor: '#a78bfa', av: ['F'] },
                  ].map((c) => (
                    <div className="ph-kb-card" key={c.title}>
                      <div className="ph-kb-card-title">{c.title}</div>
                      <span className="ph-kb-tag" style={{ color: c.tagColor, background: c.tagColor + '20' }}>{c.tag}</span>
                      <div className="ph-kb-avs">
                        {c.av.map((l, i) => (
                          <span className="ph-kb-av" key={i} style={{ background: ['#ff8964', '#a78bfa', '#fbbf24'][i % 3] }}>{l}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* DONE col */}
                <div className="ph-kb-col">
                  <div className="ph-kb-col-head">Done</div>
                  {[
                    { title: 'Visitor Mgmt check-in portal', tag: 'Done', tagColor: '#a9a9aa', av: ['G'] },
                    { title: 'ERP go-live v1', tag: 'ERP', tagColor: '#fbbf24', av: ['H', 'I'] },
                  ].map((c) => (
                    <div className="ph-kb-card" key={c.title}>
                      <div className="ph-kb-card-title">{c.title}</div>
                      <span className="ph-kb-tag" style={{ color: c.tagColor, background: c.tagColor + '20' }}>{c.tag}</span>
                      <div className="ph-kb-avs">
                        {c.av.map((l, i) => (
                          <span className="ph-kb-av" key={i} style={{ background: ['#34d399', '#22d3ee', '#5683da'][i % 3] }}>{l}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer so text doesn't underlap screenshot */}
        <div className="ph-hero-spacer" />
      </section>

      {/* ══ ALL PRODUCTS GRID ══
          Dark canvas (#303236) · 4-col · Huly cards (#111111, #4a4b50 border)
      */}
      <section className="ph-all-products" id="products">
        <div className="ph-wrap">
          <div className="ph-all-header" data-reveal>
            <span className="ph-sec-eyebrow">8 Platforms</span>
            <h2 className="ph-sec-h2">Every product. One team.</h2>
            <p className="ph-sec-body">
              Deploy one or combine multiple — all products share a common data layer and integrate with your existing stack.
            </p>
          </div>

          <div className="ph-prod-grid">
            {PRODUCTS.map((p) => (
              <Link to={ROUTES[p.id] || '/contact'} className="ph-prod-card" key={p.id} data-reveal>
                {/* Radial ember glow from top-right corner */}
                <div
                  className="ph-prod-card-glow"
                  style={{ background: `radial-gradient(circle at 100% 0%, ${p.color}28 0%, transparent 65%)` }}
                />
                <div
                  className="ph-prod-card-icon"
                  style={{ color: p.color, background: p.color + '18', borderColor: p.color + '30' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.icon} />
                  </svg>
                </div>
                <div className="ph-prod-card-name">{p.name}</div>
                <div className="ph-prod-card-desc">{p.desc}</div>
                <div className="ph-prod-card-tags">
                  {p.tags.map((t) => (
                    <span className="ph-tag" key={t} style={{ color: p.color, background: p.color + '18' }}>{t}</span>
                  ))}
                </div>
                <div className="ph-prod-card-footer">
                  <span>Request Demo</span>
                  <span className="ph-card-arrow"><ArrowUpRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FLAGSHIP PRODUCTS ══
          Light section (#ffffff) · MetaBrain-style mosaic
          Cards stay dark (#111111) on white background — Huly signature
      */}
      <section className="ph-flagship">
        <div className="ph-wrap">
          <div className="ph-flagship-header" data-reveal>
            <span className="ph-sec-eyebrow ph-sec-eyebrow--dark">Featured Platforms</span>
            <h2 className="ph-sec-h2 ph-sec-h2--dark">A closer look at<br />three flagship products.</h2>
            <p className="ph-sec-body ph-sec-body--dark" style={{ margin: '0 auto' }}>
              Each built for a specific domain. Each deployed across 50+ enterprise clients globally.
            </p>
          </div>

          {/* Mosaic: large HRMS card left, 2×2 grid right */}
          <div className="ph-mosaic">
            {/* Large main card — HRMS */}
            <Link to="/products/hrms" className="ph-feature-card ph-mosaic-main" data-reveal>
              <div
                className="ph-fc-glow"
                style={{ background: `radial-gradient(circle at 100% 100%, rgba(52,211,153,0.22) 0%, transparent 65%)` }}
              />
              <div
                className="ph-fc-icon"
                style={{ color: '#34d399', background: '#34d39918', borderColor: '#34d39930' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <span className="ph-fc-cat" style={{ color: '#34d399' }}>HR Automation</span>
              <div className="ph-fc-name">HRMS</div>
              <p className="ph-fc-desc">
                Automate the full employee lifecycle from offer letter to exit clearance. Payroll in minutes. Attendance synced from biometric or mobile. Leave balances in real time. Appraisal cycles that actually close on time.
              </p>
              <ul className="ph-fc-caps">
                {PRODUCTS[0].caps.map((c) => (
                  <li key={c}>
                    <span className="ph-fc-check" style={{ color: '#34d399' }}><CheckIcon /></span>
                    {c}
                  </li>
                ))}
              </ul>
              <span className="ph-fc-cta">
                Explore HRMS <ArrowUpRight />
              </span>
            </Link>

            {/* Practice Management */}
            <Link to="/products/practice-management" className="ph-feature-card" data-reveal>
              <div
                className="ph-fc-glow"
                style={{ background: `radial-gradient(circle at 100% 100%, rgba(56,189,248,0.2) 0%, transparent 65%)` }}
              />
              <div
                className="ph-fc-icon"
                style={{ color: '#38bdf8', background: '#38bdf818', borderColor: '#38bdf830' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="ph-fc-cat" style={{ color: '#38bdf8' }}>Healthcare & Legal</span>
              <div className="ph-fc-name">Practice Management</div>
              <p className="ph-fc-desc">
                Scheduling, records, billing and compliance in one interface for clinics, hospitals and law firms. Patients and clients get a portal. You get full visibility.
              </p>
              <ul className="ph-fc-caps">
                {PRODUCTS[1].caps.slice(0, 4).map((c) => (
                  <li key={c}>
                    <span className="ph-fc-check" style={{ color: '#38bdf8' }}><CheckIcon /></span>
                    {c}
                  </li>
                ))}
              </ul>
              <span className="ph-fc-cta">Explore Practice Mgmt <ArrowUpRight /></span>
            </Link>

            {/* Document Management */}
            <Link to="/products/document-management" className="ph-feature-card" data-reveal>
              <div
                className="ph-fc-glow"
                style={{ background: `radial-gradient(circle at 100% 100%, rgba(34,211,238,0.2) 0%, transparent 65%)` }}
              />
              <div
                className="ph-fc-icon"
                style={{ color: '#22d3ee', background: '#22d3ee18', borderColor: '#22d3ee30' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <span className="ph-fc-cat" style={{ color: '#22d3ee' }}>Enterprise DMS</span>
              <div className="ph-fc-name">Document Management</div>
              <p className="ph-fc-desc">
                Centralised storage with version control, approvals, e-signatures and role-based access. Every document, under control — no more scattered drives and email chains.
              </p>
              <ul className="ph-fc-caps">
                {PRODUCTS[2].caps.slice(0, 4).map((c) => (
                  <li key={c}>
                    <span className="ph-fc-check" style={{ color: '#22d3ee' }}><CheckIcon /></span>
                    {c}
                  </li>
                ))}
              </ul>
              <span className="ph-fc-cta">Explore Document Mgmt <ArrowUpRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="ph-stats">
        <div className="ph-wrap">
          <div className="ph-stats-grid">
            {[
              { val: '8',     label: 'Production-grade platforms' },
              { val: '50+',   label: 'Enterprise clients deployed' },
              { val: '20+',   label: 'Countries served globally' },
              { val: '99.9%', label: 'Uptime SLA guaranteed' },
            ].map((s) => (
              <div className="ph-stat" key={s.val} data-reveal>
                <span className="ph-stat-val">{s.val}</span>
                <span className="ph-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <FaqSection />

      {/* ══ CTA ══ */}
      <section className="ph-cta">
        <div className="ph-cta-inner">
          <div>
            <p className="ph-cta-label">Get started</p>
            <h2 className="ph-cta-h2" data-reveal>See a product<br />in action?</h2>
          </div>
          <div>
            <p className="ph-cta-body" data-reveal>
              No sales pitch. No 47-slide deck. A focused 30-minute demo of the product most relevant to your operations — with your actual workflows in mind.
            </p>
            <Link to="/contact" className="ph-btn-cta" data-reveal>
              Book a Demo <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
