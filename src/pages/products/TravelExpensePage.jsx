import { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../../components/InnerNavbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { onShotError } from '../../utils/shotFallback';
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
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  trips:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7l-8.2-1.8L3 7l7 4-2 4-4 1 1 3 4-1 4 7 2-1.8z"/></svg>,
  nonTravel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2V4a2 2 0 00-2-2z"/><path d="M10 9h4M10 13h4"/></svg>,
  imprests:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5H3a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2z"/><circle cx="17" cy="12" r="1.5"/></svg>,
  reports:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
  admin:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
};

const FEATURE_ICONS = {
  plane:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7l-8.2-1.8L3 7l7 4-2 4-4 1 1 3 4-1 4 7 2-1.8z"/></svg>,
  clipboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><path d="M9 12h6M9 16h4"/></svg>,
  creditCard:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>,
  receipt:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2V4a2 2 0 00-2-2z"/><path d="M10 9h4M10 13h4"/></svg>,
  fileText:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>,
  checkCircle:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
};

const FEATURES = [
  { icon: 'plane',      title: 'Create a Trip',               text: 'Start by creating a travel trip with destination, dates and purpose. This helps your organisation track and approve travel plans.' },
  { icon: 'clipboard',  title: 'Trip Approval',               text: 'Your manager or finance team reviews and approves the trip based on company travel policies — before any spend happens.' },
  { icon: 'creditCard', title: 'Travel & Spend',              text: 'Go on your trip and make business-related expenses like travel, hotel, meals or fuel — all tracked in real time.' },
  { icon: 'receipt',    title: 'Add Expenses',                text: 'Log each expense with date, amount, category and receipt. You can add expenses during or after your trip.' },
  { icon: 'fileText',   title: 'Submit Travel Report',        text: 'Once the trip is complete, submit the travel expense report for reimbursement or settlement — one click.' },
  { icon: 'checkCircle',title: 'Settlement & Reimbursement',  text: 'Finance verifies the report and processes reimbursement or settlement directly to your account.' },
];

const SCREENS = [
  { id: 'dashboard', label: 'Travel Dashboard', src: '/products/travel/hero.png', caption: 'Trip management dashboard — plan, approve, track spend and settle in one workflow' },
];

const INTEGRATIONS = [
  { label: 'Accounting',     tech: 'Tally, ERPNext and Zoho Books for expense reconciliation and reimbursement' },
  { label: 'HR & Payroll',   tech: 'TechBird HRMS for employee data, hierarchy and approval routing' },
  { label: 'Payments',       tech: 'Bank transfer and NEFT bulk payout for settlement processing' },
  { label: 'Communication',  tech: 'Email and WhatsApp for trip approval notifications and alerts' },
];

const FAQ = [
  { q: 'How does trip approval work?',          a: 'When an employee creates a trip, it routes automatically to their manager or finance team based on your approval hierarchy. They review the destination, dates and estimated budget, then approve or reject with comments.' },
  { q: 'Can expenses be added during the trip?', a: 'Yes. Employees log expenses on the go — date, amount, category, receipt photo. Expenses can be added during travel or submitted together after the trip.' },
  { q: 'What is an imprest advance?',            a: 'An imprest is a travel advance given to an employee before the trip. They spend from it and submit receipts after. The system tracks the advance, actual spend and any balance to return or top up.' },
  { q: 'Who can see all travel reports?',        a: 'Managers see their team\'s trips and expenses. Finance and Admin View users see all travel reports, approval status and settlement records across the organisation.' },
  { q: 'How long to go live?',                   a: 'Standard rollout with employee import, approval hierarchy setup and accounting integration runs 3–5 weeks.' },
];

export default function TravelExpensePage() {
  const root = useRef(null);
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
    <div className="hrms pp--travel" ref={root}>
      <SEO
        title="Travel & Expense Management"
        description="TechBird Travel & Expense — end-to-end travel workflow from trip creation to settlement. Plan trips, get approvals, log expenses and get reimbursed without chasing spreadsheets."
        keywords="travel expense management, travel reimbursement, expense tracking, trip approval, imprest advance, business travel software, T&E software India"
        faqItems={FAQ}
        softwareSchema={{ name: 'TechBird Travel & Expense', description: 'Trip creation, approval, expense logging and reimbursement in one workflow.', category: 'BusinessApplication' }}
      />
      <InnerNavbar />

      {/* ── HERO ── */}
      <section className="hrms-hero">
        <div className="hrms-hero-bg" aria-hidden="true">
          <div className="hrms-hero-orb hrms-hero-orb--1" />
          <div className="hrms-hero-orb hrms-hero-orb--2" />
          <div className="hrms-hero-orb hrms-hero-orb--3" />
          <div className="hrms-hero-grid" />
        </div>
        <div className="hrms-wrap">
          <span className="hrms-hero-eyebrow">Travel &amp; Expense</span>
          <h1 className="hrms-display">Manage travel &amp; expenses <em>seamlessly.</em></h1>
          <p className="hrms-hero-sub">
            From trip creation to settlement — one unified workflow for business travel. Plan trips, get approvals, log expenses and get reimbursed without chasing spreadsheets.
          </p>
          <div className="hrms-hero-shot">
            <img src="/products/travel/hero.png" alt="TechBird Travel & Expense — Trip management dashboard" loading="eager" onError={onShotError} />
          </div>
        </div>
      </section>

      {/* ── MODULES STRIP ── */}
      <section className="hrms-modules">
        <div className="hrms-wrap">
          <div className="hrms-modules-grid">
            {[
              { icon: ICONS.dashboard, label: 'My Dashboard' },
              { icon: ICONS.trips,     label: 'Trips' },
              { icon: ICONS.nonTravel, label: 'Non-Travel Expenses' },
              { icon: ICONS.imprests,  label: 'Imprests' },
              { icon: ICONS.reports,   label: 'Reports' },
              { icon: ICONS.admin,     label: 'Admin View' },
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
            <span className="hrms-eyebrow">The Travel Journey</span>
            <h2 className="hrms-display">From trip request to reimbursement.</h2>
            <p>Six steps, one system. Every trip planned, approved, expensed and settled without email chains or spreadsheets.</p>
          </div>
          <div className="hrms-features-grid">
            {FEATURES.map((f, i) => (
              <div className="hrms-feat" key={i}>
                <span className="hrms-feat-ico">{FEATURE_ICONS[f.icon]}</span>
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
            <h2 className="hrms-display">See the module in action.</h2>
            <p>A single system for your entire travel and expense operation — built for the way Indian businesses actually manage travel.</p>
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
              <p>Everything you need to know before you deploy Travel &amp; Expense.</p>
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
              <h2 className="hrms-display">Ready to simplify business travel?</h2>
            </div>
            <div>
              <p className="hrms-cta-body">
                A walkthrough of the Travel &amp; Expense module mapped to your approval hierarchy, expense categories and reimbursement process.
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
