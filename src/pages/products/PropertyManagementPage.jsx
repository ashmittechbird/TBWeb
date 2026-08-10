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
  dashboard:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  properties:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 10h2M13 10h2M9 14h2M13 14h2"/></svg>,
  frontdesk:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17h20M4 17V9a2 2 0 012-2h12a2 2 0 012 2v8M8 7V5h8v2"/></svg>,
  reservation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4M9 15l2 2 4-4"/></svg>,
  guests:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87"/></svg>,
  roomgrid:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
  housekeep:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M6 21V10l6-7 6 7v11"/><path d="M10 21v-5h4v5"/></svg>,
  rate:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4M8 15h2M14 15h2"/></svg>,
  revenue:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v6h-6"/></svg>,
  folio:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M10 13h4M10 17h4"/></svg>,
  audit:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>,
  inbox:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  assistant:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>,
  analytics:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 15l4-5 3 3 5-7"/></svg>,
};

const FEATURES = [
  { icon: 'properties',  title: 'Multi-Property Portfolio',  text: 'Every property on one dashboard with its own room count and live occupancy — switch to a single hotel or roll the whole portfolio into one view.' },
  { icon: 'revenue',     title: 'RevPAR, ADR & Occupancy',   text: 'The metrics that actually run a hotel, live on the dashboard: reservations, room occupancy, arrivals today, active guests, RevPAR and ADR.' },
  { icon: 'frontdesk',   title: 'Front Desk & Tape Chart',   text: 'Tape chart, pending check-ins, guest directory and new bookings from one bar — the front desk works without leaving the dashboard.' },
  { icon: 'housekeep',   title: 'Housekeeping Status Matrix', text: 'Physical keys, available rooms, stay-overs, service requests, maintenance and down time in a single operational grid.' },
  { icon: 'rate',        title: 'Rate Calendar',             text: 'Season and date-wise pricing per room type, so rates move with demand instead of being edited one booking at a time.' },
  { icon: 'audit',       title: 'Night Audit & Folio Review', text: 'Close the day cleanly — night audit runs the roll-over and the billing folio review catches posting errors before they reach the guest.' },
];

const SCREENS = [
  { id: 'dashboard', label: 'Analytics Overview', src: '/products/pms/hero.webp', caption: 'Portfolio dashboard — per-property occupancy, RevPAR and ADR, plus the operational status matrix across every room' },
];

const INTEGRATIONS = [
  { label: 'Channel managers', tech: 'OTA rate and inventory sync so availability never double-sells' },
  { label: 'Payments',         tech: 'UPI, cards and payment gateways posted straight to the guest folio' },
  { label: 'Accounting',       tech: 'Tally, ERPNext and Zoho Books for revenue and cost postings' },
  { label: 'Communication',    tech: 'WhatsApp and email for confirmations, pre-arrival and check-out' },
];

const FAQ = [
  { q: 'Does it handle more than one property?',   a: 'That is the point of it. Each property keeps its own rooms, rates, staff and reservations, and the dashboard either filters to one hotel or rolls every property up — including a cross-property comparison so you can see which sites are performing and which are not.' },
  { q: 'What does the status matrix show?',          a: 'The live operational picture across all rooms: total physical keys, how many are available, stay-overs continuing tonight, open service requests, rooms under maintenance and rooms out of order. It is the one screen a duty manager needs at shift handover.' },
  { q: 'How are RevPAR and ADR calculated?',        a: 'Both come off actual posted room revenue rather than being entered by hand — ADR against rooms sold, RevPAR against rooms available. Because they read from the same folio data as billing, the dashboard and your accounts do not disagree.' },
  { q: 'What is the tape chart for?',               a: 'A date-by-room grid of who is in which room and for how long. Front desk uses it to place a walk-in, spot a gap between two stays, or move a guest without opening a single reservation record.' },
  { q: 'Can it connect to OTAs and channel managers?', a: 'Yes. Rates and inventory sync out to your channel manager and bookings flow back in against the right property and room type, so availability stays consistent and rooms are not double-sold.' },
  { q: 'On-premise or cloud, and how long to go live?', a: 'Either. A single property typically goes live in 3–5 weeks including room and rate setup. A multi-property group with channel-manager and accounting integration runs 8–12 weeks.' },
];

export default function PropertyManagementPage() {
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
    <div className="hrms pp--pms" ref={root}>
      <SEO
        title="Property Management System"
        description="TechBird PMS — multi-property dashboard with front desk, reservations, housekeeping, rate calendar, night audit and billing folio. RevPAR, ADR and occupancy across your whole portfolio."
        keywords="property management system, hotel PMS, hotel management software, front desk software, reservations system, housekeeping management, rate calendar, night audit, RevPAR ADR tracking, multi property hotel software India"
        faqItems={FAQ}
        softwareSchema={{ name: 'TechBird PMS', description: 'Multi-property hotel management with front desk, reservations, housekeeping, rate calendar and night audit.', category: 'BusinessApplication' }}
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
          <span className="hrms-hero-eyebrow">Hotel &amp; Resort PMS</span>
          <h1 className="hrms-display">Every property, every room, <em>one screen.</em></h1>
          <p className="hrms-hero-sub">
            Front desk, reservations, housekeeping, rate calendar and night audit across your whole portfolio — with occupancy, RevPAR and ADR reading off the same folio data your accounts do.
          </p>
          <div className="hrms-hero-shot">
            <img src="/products/pms/hero.webp" alt="TechBird PMS dashboard — multi-property occupancy, RevPAR, ADR and operational status matrix" loading="eager" onError={onShotError} />
          </div>
        </div>
      </section>

      {/* ── MODULES STRIP ── */}
      <section className="hrms-modules">
        <div className="hrms-wrap">
          <div className="hrms-modules-grid">
            {[
              { icon: ICONS.dashboard,   label: 'Dashboard' },
              { icon: ICONS.properties,  label: 'Properties' },
              { icon: ICONS.frontdesk,   label: 'Front Desk' },
              { icon: ICONS.reservation, label: 'Reservations' },
              { icon: ICONS.guests,      label: 'Guests' },
              { icon: ICONS.roomgrid,    label: 'Room Grid' },
              { icon: ICONS.housekeep,   label: 'Housekeeping' },
              { icon: ICONS.rate,        label: 'Rate Calendar' },
              { icon: ICONS.folio,       label: 'Billing Folio' },
              { icon: ICONS.audit,       label: 'Night Audit' },
              { icon: ICONS.revenue,     label: 'Revenue & Costs' },
              { icon: ICONS.inbox,       label: 'Inbox' },
              { icon: ICONS.analytics,   label: 'Analytics' },
              { icon: ICONS.assistant,   label: 'Assistant' },
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
            <h2 className="hrms-display">Built for how a hotel actually runs.</h2>
            <p>Reservations, the front desk, housekeeping and revenue share one set of rooms and rates — so a check-in, a room move and a folio posting all land in the same place.</p>
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
            <h2 className="hrms-display">See the PMS in action.</h2>
            <p>One console for the whole portfolio — per-property occupancy, the day's arrivals, the operational status matrix and cross-property performance side by side.</p>
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
              <p>Everything you need to know before you move your properties onto it.</p>
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
              <h2 className="hrms-display">Ready to run every property from one place?</h2>
            </div>
            <div>
              <p className="hrms-cta-body">
                A walkthrough mapped to your properties, room types, rate seasons and the way your front desk actually works.
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
