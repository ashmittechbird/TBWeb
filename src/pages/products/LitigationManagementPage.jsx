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
  dockets:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h3"/></svg>,
  ruling:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7l-3 6h6zM19 7l-3 6h6zM5 7h14M12 3v18M7 21h10"/></svg>,
  ledgers:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  refunds:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v6h6"/><path d="M3.5 9a9 9 0 102.1-3.4L3 9"/><path d="M12 8v4l3 2"/></svg>,
  customs:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  wpslp:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6"/></svg>,
  reports:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
};

const FEATURES = [
  { icon: 'dashboard', title: 'Key Metrics Dashboard',       text: 'Live totals: cases, open notices, total demand (₹ Cr), overdue notices, active appeals and contingent liability — always current.' },
  { icon: 'dockets',   title: 'Stage-wise Case Intelligence', text: 'Cases broken down by stage: Adjudication, First Appellate, Second Appellate, Audit and Tribunal — with bar charts for instant visibility.' },
  { icon: 'ruling',    title: 'Litigation Dockets',          text: 'Full docket management: notices, demand orders, replies, hearings and outcomes linked to each case.' },
  { icon: 'ledgers',   title: 'Advance Ruling',              text: 'Track advance ruling applications, their status and decisions separately from litigation dockets.' },
  { icon: 'refunds',   title: 'Refunds & Customs',           text: 'Manage refund applications, customs cases, WP/SLP filings and IDT-Others in dedicated modules.' },
  { icon: 'reports',   title: 'Reports & Alerts',            text: 'Stage-wise reports, overdue alerts and demand summaries exportable for compliance and board reporting.' },
];

const SCREENS = [
  { id: 'dashboard', label: 'LMS Dashboard', src: '/products/lms/hero.webp', caption: 'Real-time dashboard — total cases, open notices, demand value and stage-wise case intelligence' },
];

const INTEGRATIONS = [
  { label: 'Accounting',  tech: 'Tally, ERPNext and Zoho Books for demand and liability tracking' },
  { label: 'Documents',   tech: 'TechBird DMS for linking notices, orders and reply documents' },
  { label: 'Communication', tech: 'Email and WhatsApp for deadline alerts and case updates' },
  { label: 'Calendar',    tech: 'Google & Outlook sync for hearing dates and deadlines' },
];

const FAQ = [
  { q: 'What is a litigation docket?',         a: 'A docket is a complete case file — the notice, demand amount, reply, hearing dates, orders and current stage — all in one record. LMS manages dockets across Adjudication, Appellate, Customs, Advance Ruling and other streams.' },
  { q: 'How does it track total demand?',       a: 'Every demand order linked to a case contributes to the total demand figure shown on the dashboard. You see the aggregate across all open cases — the ₹ figure that represents your total contingent liability.' },
  { q: 'Can we track cases by stage?',          a: 'Yes. Stage-wise Cases chart shows exactly how many matters sit at Adjudication, First Appellate Stage, Audit and other stages — so management sees where attention is needed.' },
  { q: 'Does it send deadline alerts?',         a: 'Yes. Overdue notices and upcoming hearing dates trigger alerts to the responsible team and management over email and WhatsApp.' },
  { q: 'On-premise or cloud?',                  a: 'Deploy on-premise for maximum data confidentiality, or on a private cloud. Standard rollout runs 4–6 weeks; larger setups with DMS and accounting integration run 8–12 weeks.' },
];

export default function LitigationManagementPage() {
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
    <div className="hrms pp--lms" ref={root}>
      <SEO
        title="Litigation Management System"
        description="TechBird LMS — real-time dashboard for total cases, open notices, demand value and stage-wise case intelligence. Track every case, notice and rupee at risk."
        keywords="litigation management system, LMS, legal case tracking, tax litigation, demand tracking, advance ruling, customs, GST litigation, contingent liability India"
        faqItems={FAQ}
        softwareSchema={{ name: 'TechBird LMS', description: 'Litigation docket management with stage-wise case intelligence and demand tracking.', category: 'BusinessApplication' }}
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
          <span className="hrms-hero-eyebrow">Legal Case Tracking</span>
          <h1 className="hrms-display">Track every case, every notice, every <em>rupee at risk.</em></h1>
          <p className="hrms-hero-sub">
            LMS Dashboard with real-time key metrics — total cases, open notices, total demand, overdue notices, active appeals and contingent liability — with stage-wise case intelligence.
          </p>
          <div className="hrms-hero-shot">
            <img src="/products/lms/hero.webp" alt="TechBird LMS Dashboard — Litigation case tracking and demand monitoring" loading="eager" onError={onShotError} />
          </div>
        </div>
      </section>

      {/* ── MODULES STRIP ── */}
      <section className="hrms-modules">
        <div className="hrms-wrap">
          <div className="hrms-modules-grid">
            {[
              { icon: ICONS.dashboard, label: 'Dashboard' },
              { icon: ICONS.dockets,   label: 'Litigation Dockets' },
              { icon: ICONS.ruling,    label: 'Advance Ruling' },
              { icon: ICONS.ledgers,   label: 'Ledgers' },
              { icon: ICONS.refunds,   label: 'Refunds' },
              { icon: ICONS.customs,   label: 'Customs' },
              { icon: ICONS.wpslp,     label: 'WP/SLP' },
              { icon: ICONS.reports,   label: 'Reports' },
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
            <h2 className="hrms-display">Full visibility across every case.</h2>
            <p>Every notice, demand and stage in one system — so legal teams and management always know the exposure and what needs attention next.</p>
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
            <h2 className="hrms-display">See the LMS in action.</h2>
            <p>A single dashboard for your entire litigation portfolio — built for legal teams and management who need real-time demand visibility.</p>
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
              <p>Everything you need to know before you deploy the LMS.</p>
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
              <h2 className="hrms-display">Ready to get your cases under control?</h2>
            </div>
            <div>
              <p className="hrms-cta-body">
                A walkthrough of the LMS mapped to your litigation streams, demand tracking and reporting requirements.
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
