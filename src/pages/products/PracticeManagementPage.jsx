import { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../../components/InnerNavbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { onShotError } from '../../utils/shotFallback';
import useIdleOffscreen from '../../hooks/useIdleOffscreen';
import '../../styles/inner.css';
import '../../styles/hrms-page.css';

gsap.registerPlugin(ScrollTrigger);

const ChevD = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M6 9l6 6 6-6" /></svg>
);

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`hrms-faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="hrms-faq-row">
        <span className="hrms-faq-q">{q}</span>
        <span className="hrms-faq-chev"><ChevD /></span>
      </div>
      <div className="hrms-faq-body"><div><p className="hrms-faq-a">{a}</p></div></div>
    </div>
  );
}

const ICONS = {
  dashboard:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  clients:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  engagement: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M2 13h20"/></svg>,
  compliance: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  assignment: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2h6v4H9zM16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><path d="M9 12h6M9 16h4"/></svg>,
  timer:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></svg>,
  billing:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M10 13h4M10 17h4"/></svg>,
  docs:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>,
  staff:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6"/></svg>,
  vault:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4M12 15v3"/></svg>,
  reports:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
};

const FEATURES = [
  { icon: 'dashboard',  title: 'Firm-at-a-Glance Dashboard', text: 'Revenue MTD, outstanding receivables, new clients and expiring DSCs on one screen — filtered to a single branch or rolled up across the firm.' },
  { icon: 'compliance', title: 'Compliance Pipeline',        text: 'Every GST, TDS, ROC and income-tax obligation generated per client with owner and due date, split live across in progress, filed and overdue.' },
  { icon: 'assignment', title: 'Assignment Management',      text: 'Allocate work across staff and track it from unassigned through in-progress, partner review and filed — with the acknowledgement stored against the client.' },
  { icon: 'timer',      title: 'Time Tracking & Utilisation', text: 'Staff run timers against an assignment or log hours after the fact, feeding both monthly utilisation and the invoice.' },
  { icon: 'billing',    title: 'Billing & Invoicing',         text: 'Invoice straight from logged hours, then track what is raised versus what is still outstanding without a separate spreadsheet.' },
  { icon: 'vault',      title: 'Vault & DSC Registry',        text: 'Client documents plus every Digital Signature Certificate the firm holds, tracked by holder, token and expiry — flagged before a filing gets blocked.' },
];

const SCREENS = [
  { id: 'dashboard', label: 'Firm Dashboard', src: '/products/practice/hero.webp', caption: 'Firm dashboard — revenue MTD, outstanding, new clients, expiring DSCs, compliance pipeline and staff utilisation' },
];

const INTEGRATIONS = [
  { label: 'Statutory portals', tech: 'GST, income tax, TRACES and MCA filing references against each obligation' },
  { label: 'Accounting',        tech: 'Tally, ERPNext and Zoho Books for invoice and receivable sync' },
  { label: 'Documents',         tech: 'TechBird DMS for client records, working papers and filed returns' },
  { label: 'Communication',     tech: 'Email and WhatsApp for due-date reminders and document requests' },
];

const FAQ = [
  { q: 'Who is this built for?',                a: 'Chartered accountancy, company-secretarial and tax practices — from a two-partner firm to a multi-branch setup running thousands of filings a year. Clients, engagements, compliance, assignments, time and billing sit in one system instead of across spreadsheets and WhatsApp groups.' },
  { q: 'How does the compliance pipeline work?', a: 'Every recurring obligation — GST returns, TDS, ROC filings, income tax — is generated against the client with its own due date and owner. The dashboard rolls the whole firm into in progress, filed and overdue, so a partner sees what is slipping without asking anyone.' },
  { q: 'What does the DSC registry do?',         a: 'It tracks every Digital Signature Certificate the firm holds on behalf of clients, with holder, token location and expiry date. Certificates approaching expiry surface on the dashboard well before renewal, so a filing is never blocked by a dead DSC.' },
  { q: 'Can it handle multiple branches?',       a: 'Yes. Each branch has its own clients, staff and assignments, and the dashboard filters to one branch or rolls every branch into a single view. Revenue and staff utilisation read per branch or firm-wide.' },
  { q: 'How is time tracking tied to billing?',  a: 'Staff run a timer against an assignment, or log hours afterwards. Those hours drive both the utilisation report and the invoice, so billable work is captured where it happened rather than reconstructed at month end.' },
  { q: 'On-premise or cloud?',                   a: 'Either. A single-branch practice typically goes live in 3–5 weeks including client data migration. Multi-branch rollouts with historical filing history and DSC inventory run 8–12 weeks.' },
];

export default function PracticeManagementPage() {
  const root = useRef(null);
  /* pauses the blurred hero orbs once the hero scrolls away */
  const heroRef = useIdleOffscreen();
  const [activeScreen, setActiveScreen] = useState('dashboard');

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      gsap.from('.hrms-hero-eyebrow', { opacity: 0, y: 12, duration: 0.5 });
      gsap.from('.hrms-hero h1',      { opacity: 0, y: 24, duration: 0.7, delay: 0.1 });
      gsap.from('.hrms-hero-sub',     { opacity: 0, y: 16, duration: 0.6, delay: 0.25 });
      gsap.from('.hrms-hero-shot',    { opacity: 0, y: 40, duration: 0.9, delay: 0.4, ease });

      gsap.from('.hrms-module', {
        scrollTrigger: { trigger: '.hrms-modules', start: 'top 88%', once: true },
        opacity: 0, y: 16, stagger: 0.05, duration: 0.45, ease,
      });

      gsap.from('.hrms-feat', {
        scrollTrigger: { trigger: '.hrms-features-grid', start: 'top 82%', once: true },
        opacity: 0, y: 30, stagger: 0.07, duration: 0.6, ease,
      });

      gsap.from('.hrms-screen', {
        scrollTrigger: { trigger: '.hrms-showcase', start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 0.8, ease,
      });

      gsap.from('.hrms-integ-item', {
        scrollTrigger: { trigger: '.hrms-integ-grid', start: 'top 85%', once: true },
        opacity: 0, y: 24, stagger: 0.07, duration: 0.5, ease,
      });

      gsap.from('.hrms-faq-item', {
        scrollTrigger: { trigger: '.hrms-faq-list', start: 'top 84%', once: true },
        opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease,
      });

      gsap.from('.hrms-cta-inner > *', {
        scrollTrigger: { trigger: '.hrms-cta', start: 'top 80%', once: true },
        opacity: 0, y: 30, stagger: 0.12, duration: 0.6, ease,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const currentScreen = SCREENS.find(s => s.id === activeScreen);

  return (
    <div className="hrms pp--practice" ref={root}>
      <SEO
        title="Practice Management"
        description="TechBird Practice Management — client management, engagements, statutory compliance tracking, assignments, time tracking, billing and a DSC registry for chartered accountancy and company-secretarial firms."
        keywords="practice management software, CA firm software, chartered accountant practice management, company secretary software, compliance tracking, DSC registry, statutory compliance software, GST return tracking, firm billing software India"
        faqItems={FAQ}
        softwareSchema={{ name: 'TechBird Practice Management', description: 'Client management, compliance tracking, time tracking, billing and DSC registry for CA and CS firms.', category: 'BusinessApplication' }}
      />
      <InnerNavbar />

      {/* ── HERO ── */}
      <section className="hrms-hero" ref={heroRef}>
        <div className="hrms-hero-bg" aria-hidden="true">
          <div className="hrms-hero-orb hrms-hero-orb--1" />
          <div className="hrms-hero-orb hrms-hero-orb--2" />
          <div className="hrms-hero-orb hrms-hero-orb--3" />
          <div className="hrms-hero-grid" />
        </div>
        <div className="hrms-wrap">
          <span className="hrms-hero-eyebrow">CA &amp; CS Firms</span>
          <h1 className="hrms-display">Run the firm, <em>not the follow-ups.</em></h1>
          <p className="hrms-hero-sub">
            Clients, engagements, statutory compliance, assignments, time and billing in one system — with a compliance pipeline that shows what is filed, in progress and overdue, and a DSC registry that never lets an expiry block a filing.
          </p>
          <div className="hrms-hero-shot">
            <img src="/products/practice/hero.webp" alt="TechBird Practice Management dashboard — compliance pipeline, staff utilisation and DSC expiry tracking" loading="eager" onError={onShotError} />
          </div>
        </div>
      </section>

      {/* ── MODULES STRIP ── */}
      <section className="hrms-modules">
        <div className="hrms-wrap">
          <div className="hrms-modules-grid">
            {[
              { icon: ICONS.dashboard,  label: 'Dashboard' },
              { icon: ICONS.clients,    label: 'Client Management' },
              { icon: ICONS.engagement, label: 'Engagements' },
              { icon: ICONS.compliance, label: 'Compliance' },
              { icon: ICONS.assignment, label: 'Assignments' },
              { icon: ICONS.timer,      label: 'Time Tracking' },
              { icon: ICONS.billing,    label: 'Billing & Invoicing' },
              { icon: ICONS.docs,       label: 'Documents' },
              { icon: ICONS.staff,      label: 'Staff Management' },
              { icon: ICONS.vault,      label: 'Vault & DSC Registry' },
            ].map((m, i) => (
              <div className="hrms-module" key={i}>
                <span className="hrms-module-ico">{m.icon}</span>
                <span className="hrms-module-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="hrms-features">
        <div className="hrms-wrap">
          <div className="hrms-features-head">
            <span className="hrms-eyebrow">Capabilities</span>
            <h2 className="hrms-display">Every obligation, owned and dated.</h2>
            <p>Clients, engagements, filings and assignments share one record — so a due date, the person on it and the hours against it are never in three different places.</p>
          </div>
          <div className="hrms-features-grid">
            {FEATURES.map((f, i) => (
              <div className="hrms-feat" key={i}>
                <span className="hrms-feat-ico">{ICONS[f.icon]}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="hrms-showcase">
        <div className="hrms-wrap">
          <div className="hrms-showcase-head">
            <span className="hrms-eyebrow">Product</span>
            <h2 className="hrms-display">See the platform in action.</h2>
            <p>One console for the whole practice — compliance pipeline, staff utilisation, revenue and DSC expiries, read per branch or across every branch at once.</p>
          </div>

          <div className="hrms-tabs">
            {SCREENS.map(s => (
              <button
                key={s.id}
                className={`hrms-tab${activeScreen === s.id ? ' active' : ''}`}
                onClick={() => setActiveScreen(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="hrms-screen">
            <img
              src={currentScreen.src}
              alt={currentScreen.caption}
              key={currentScreen.id}
              onError={onShotError}
            />
            <div className="hrms-screen-caption">
              <span>{currentScreen.caption}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section className="hrms-integ">
        <div className="hrms-wrap">
          <div className="hrms-integ-head">
            <span className="hrms-eyebrow">Connects with</span>
            <h2 className="hrms-display">Fits your existing stack.</h2>
          </div>
          <div className="hrms-integ-grid">
            {INTEGRATIONS.map((it, i) => (
              <div className="hrms-integ-item" key={i}>
                <span className="hrms-integ-num">0{i + 1}</span>
                <h4>{it.label}</h4>
                <p>{it.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hrms-faq">
        <div className="hrms-wrap">
          <div className="hrms-faq-inner">
            <div className="hrms-faq-left">
              <span className="hrms-eyebrow">FAQ</span>
              <h2 className="hrms-display">Questions, answered.</h2>
              <p>Everything you need to know before you move the practice onto it.</p>
            </div>
            <div className="hrms-faq-list">
              {FAQ.map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hrms-cta">
        <div className="hrms-wrap">
          <div className="hrms-cta-inner">
            <div>
              <p className="hrms-cta-label">Get started</p>
              <h2 className="hrms-display">Ready to see your firm at a glance?</h2>
            </div>
            <div>
              <p className="hrms-cta-body">
                A walkthrough mapped to your compliance calendar, engagement types and the way your branches actually work.
              </p>
              <Link to="/contact" className="btn-pill">
                <span>Book a Demo</span><i className="arrow"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
