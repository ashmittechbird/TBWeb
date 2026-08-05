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
  leads:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 8v6l-4 2v-8z"/></svg>,
  opps:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>,
  contacts: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>,
  callLogs: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>,
  orgs:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7h18M3 14h18M6 3v4M10 3v4M14 3v4M18 3v4"/></svg>,
  campaigns:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 010 4M22 6.5a6 6 0 010 9M5 8H3a1 1 0 00-1 1v6a1 1 0 001 1h2l6 3V5L5 8z"/></svg>,
  meetings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>,
  reports:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
};

const FEATURES = [
  { icon: 'leads',     title: 'Lead Capture & Scoring',   text: 'Auto-capture leads from forms, ads and inbox. Rank by fit and intent so reps call the right prospect first.' },
  { icon: 'opps',      title: 'Lifecycle Stages',         text: 'Track every lead through New → Proposal Sent → Contacted → Converted with full history at each stage.' },
  { icon: 'contacts',  title: 'Sales Activity Log',       text: 'Every call, email, meeting and WhatsApp message logged against the contact automatically.' },
  { icon: 'callLogs',  title: 'Call Logs & Recordings',   text: 'Click-to-call with recording. Calls logged instantly — no manual entry, no missed context.' },
  { icon: 'campaigns', title: 'WhatsApp Integration',     text: 'Reach leads on WhatsApp directly from the CRM. Conversations tracked alongside calls and emails.' },
  { icon: 'reports',   title: 'Reports & Dashboards',     text: 'Pipeline value, conversion rates, rep performance and lead source analytics out of the box.' },
];

const SCREENS = [
  { id: 'dashboard', label: 'CRM Dashboard', src: '/products/crm/hero.png',       caption: 'Lead pipeline with lifecycle stages, activity feed and conversion analytics' },
  { id: 'lead',      label: 'Lead Detail',   src: '/products/crm/lead-detail.png', caption: 'Full lead record — lifecycle stages, contact info, sales activity and WhatsApp history' },
];

const INTEGRATIONS = [
  { label: 'Email & calendar', tech: 'Gmail, Outlook and Google Calendar two-way sync' },
  { label: 'Telephony',        tech: 'Click-to-call, call recording and IVR integrations' },
  { label: 'Messaging',        tech: 'WhatsApp, SMS and in-app chat for lead follow-up' },
  { label: 'Lead sources',     tech: 'Web forms, Meta & Google Ads, marketplaces and APIs' },
];

const FAQ = [
  { q: 'Can we import our existing leads?',              a: 'Yes. We migrate leads, contacts, accounts, deal history and activity logs from spreadsheets or your current CRM — stages and owners mapped before go-live.' },
  { q: 'How do lifecycle stages work?',                  a: 'Every lead moves through configurable stages — New, Proposal Sent, Contacted, Converted. Each transition is logged with a timestamp and the owner who moved it.' },
  { q: 'Does it auto-log calls and WhatsApp messages?',  a: 'Yes. Click-to-call logs the call with duration and recording against the lead. WhatsApp messages sent from the CRM are captured in the activity feed automatically.' },
  { q: 'Can managers see all reps’ pipelines?',       a: 'Admin and manager views show the full team pipeline, activity metrics and conversion rates — with filters by rep, stage, date range and lead source.' },
  { q: 'On-premise or cloud, and how long to go live?',  a: 'Deploy on-premise or private cloud. Standard rollout with import and email/calendar sync runs 3–5 weeks; multi-team setups with telephony run 8–10 weeks.' },
];

export default function CRMPage() {
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
    <div className="hrms pp--crm" ref={root}>
      <SEO
        title="Lead & Sales CRM"
        description="TechBird CRM — full-funnel lead management with lifecycle tracking, call logs, WhatsApp follow-ups and pipeline analytics for sales teams that can't afford to miss a deal."
        keywords="CRM software, lead management, sales pipeline, call logging, WhatsApp CRM, lead tracking, sales automation, CRM India"
        faqItems={FAQ}
        softwareSchema={{ name: 'TechBird CRM', description: 'Lead capture, lifecycle tracking, sales activity and WhatsApp follow-ups.', category: 'BusinessApplication' }}
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
          <span className="hrms-hero-eyebrow">Sales Automation</span>
          <h1 className="hrms-display">Close more deals, lose <em>zero leads.</em></h1>
          <p className="hrms-hero-sub">
            Full-funnel CRM with lead capture, lifecycle tracking, sales activity, call logs and WhatsApp follow-ups — built for sales teams that can&apos;t afford to miss a deal.
          </p>
          <div className="hrms-hero-shot">
            <img src="/products/crm/hero.png" alt="TechBird CRM Dashboard — Lead pipeline and sales activity" loading="eager" onError={onShotError} />
          </div>
        </div>
      </section>

      {/* ── MODULES STRIP ── */}
      <section className="hrms-modules">
        <div className="hrms-wrap">
          <div className="hrms-modules-grid">
            {[
              { icon: ICONS.leads,     label: 'Leads' },
              { icon: ICONS.opps,      label: 'Opportunities' },
              { icon: ICONS.contacts,  label: 'Contacts' },
              { icon: ICONS.callLogs,  label: 'Call Logs' },
              { icon: ICONS.orgs,      label: 'Organizations' },
              { icon: ICONS.campaigns, label: 'Campaigns' },
              { icon: ICONS.meetings,  label: 'Meetings' },
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
            <h2 className="hrms-display">Everything your sales team needs.</h2>
            <p>One record per lead. Every touchpoint — call, email, WhatsApp, meeting — captured automatically from first contact to closed deal.</p>
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
            <h2 className="hrms-display">See the CRM in action.</h2>
            <p>A single system for your entire sales operation — built for the way Indian sales teams actually work.</p>
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
              <p>Everything you need to know before you deploy the CRM.</p>
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
              <h2 className="hrms-display">Ready to fix your pipeline?</h2>
            </div>
            <div>
              <p className="hrms-cta-body">
                A 30-minute walkthrough of the CRM mapped to your sales stages, lead sources and follow-up cadences.
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
