import { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../../components/InnerNavbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
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

const FEATURES = [
  { icon: 'payroll', title: 'Automated Payroll', text: 'Salary structures, deductions and net pay calculated automatically with PF, ESI, TDS and PT built in.' },
  { icon: 'fingerprint', title: 'Attendance Tracking', text: 'Biometric integration, mobile geo-punch and shift rosters  - synced in real time.' },
  { icon: 'calendar', title: 'Leave Management', text: 'Configurable policies, auto-accrual, approval workflows and location-wise holiday calendars.' },
  { icon: 'briefcase', title: 'Recruitment', text: 'From job post to digital onboarding  - applicants tracked through every stage.' },
  { icon: 'award', title: 'Appraisals', text: 'Goal setting, 360° feedback cycles and performance-linked salary revisions.' },
  { icon: 'shield', title: 'Compliance', text: 'PF, ESI, TDS, PT and gratuity reports generated and filed on schedule.' },
];

const ICONS = {
  payroll:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>,
  fingerprint:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 00-2 2c0 1.5.5 3 1 4M7 19c-1-2-1.5-4-1.5-7a6.5 6.5 0 0113 0M4.5 13c0-4 3-7 7.5-7s7.5 3 7.5 8M16.5 18c.5-2 .5-4 .5-6"/></svg>,
  calendar:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>,
  briefcase:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  award:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5"/></svg>,
  shield:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
};

const SCREENS = [
  { id: 'dashboard', label: 'HR Dashboard', src: '/products/hrms/hero-dashboard.png', caption: 'Workforce dashboard with real-time metrics and quick actions' },
  { id: 'employee', label: 'Employee Details', src: '/products/hrms/employee-details.png', caption: 'Complete employee profile with tasks, career history and assets' },
  { id: 'overview', label: 'Org Overview', src: '/products/hrms/org-overview.png', caption: 'Organization-wide overview  - attendance, approvals and headcount at a glance' },
];

const INTEGRATIONS = [
  { label: 'Biometric devices', tech: 'ESSL, ZKTeco, Matrix and standard push-API readers' },
  { label: 'Accounting', tech: 'Tally, ERPNext, Zoho Books and Excel exports' },
  { label: 'Payments & banking', tech: 'Bank transfer files, NEFT/IMPS bulk payout formats' },
  { label: 'Communication', tech: 'WhatsApp, email and SMS for slips and approvals' },
];

const FAQ = [
  { q: 'Is HRMS off-the-shelf or customised to us?', a: 'Both. You go live on a production-ready core in weeks, and where your leave policies, salary structures or approval flows differ from the standard, we configure them  - no workarounds.' },
  { q: 'Can it run our payroll with Indian statutory rules?', a: 'Yes. PF, ESI, TDS, Professional Tax and gratuity are built in, with the current slabs and the ability to update them. Payroll output includes bank payout files and statutory return formats ready to file.' },
  { q: 'Does it integrate with biometric attendance devices?', a: 'It works with ESSL, ZKTeco, Matrix and any reader that supports a push API or standard export. Mobile punch-in with geo-fencing is also available for field and remote staff.' },
  { q: 'Can employees access it themselves?', a: 'Every employee gets a self-service portal and mobile access to view payslips, apply for leave, check balances, submit reimbursements and update personal details.' },
  { q: 'On-premise or cloud  - and how long to go live?', a: 'Deploy on-premise, on your private cloud (AWS/GCP/Azure) or as a managed service. Standard rollouts run 4–8 weeks; implementations with historical-data migration and integrations run 10–16 weeks.' },
];

export default function HRMSPage() {
  const root = useRef(null);
  const [activeScreen, setActiveScreen] = useState('dashboard');

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      // hero
      gsap.from('.hrms-hero-eyebrow', { opacity: 0, y: 12, duration: 0.5 }, );
      gsap.from('.hrms-hero h1', { opacity: 0, y: 24, duration: 0.7, delay: 0.1 });
      gsap.from('.hrms-hero-sub', { opacity: 0, y: 16, duration: 0.6, delay: 0.25 });
      gsap.from('.hrms-hero-actions > *', { opacity: 0, y: 14, stagger: 0.1, duration: 0.5, delay: 0.35, ease });
      gsap.from('.hrms-hero-shot', { opacity: 0, y: 40, duration: 0.9, delay: 0.4, ease });

      // modules
      gsap.from('.hrms-module', {
        scrollTrigger: { trigger: '.hrms-modules', start: 'top 88%', once: true },
        opacity: 0, y: 16, stagger: 0.05, duration: 0.45, ease,
      });

      // features
      gsap.from('.hrms-feat', {
        scrollTrigger: { trigger: '.hrms-features-grid', start: 'top 82%', once: true },
        opacity: 0, y: 30, stagger: 0.07, duration: 0.6, ease,
      });

      // showcase
      gsap.from('.hrms-screen', {
        scrollTrigger: { trigger: '.hrms-showcase', start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 0.8, ease,
      });

      // integ
      gsap.from('.hrms-integ-item', {
        scrollTrigger: { trigger: '.hrms-integ-grid', start: 'top 85%', once: true },
        opacity: 0, y: 24, stagger: 0.07, duration: 0.5, ease,
      });

      // faq
      gsap.from('.hrms-faq-item', {
        scrollTrigger: { trigger: '.hrms-faq-list', start: 'top 84%', once: true },
        opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease,
      });

      // cta
      gsap.from('.hrms-cta-inner > *', {
        scrollTrigger: { trigger: '.hrms-cta', start: 'top 80%', once: true },
        opacity: 0, y: 30, stagger: 0.12, duration: 0.6, ease,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const currentScreen = SCREENS.find(s => s.id === activeScreen);

  return (
    <div className="hrms" ref={root}>
      <SEO
        title="HRMS"
        description="TechBird HRMS  - automate payroll, attendance, leave, recruitment, appraisals and statutory compliance. The full employee lifecycle in one system."
        keywords="HRMS, HR management system, payroll software, attendance management, leave management, recruitment software, employee self-service, statutory compliance, PF ESI TDS, HR automation India"
        faqItems={FAQ}
        softwareSchema={{ name: 'TechBird HRMS', description: 'Payroll, attendance, leave, recruitment and compliance automation.', category: 'BusinessApplication' }}
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
          <span className="hrms-hero-eyebrow">HR Automation</span>
          <h1 className="hrms-display">The entire employee lifecycle, in <em>one system.</em></h1>
          <p className="hrms-hero-sub">
            Payroll, attendance, leave, recruitment, appraisals and statutory compliance  - automated end-to-end.
            Hire to retire, without the spreadsheets.
          </p>
          <div className="hrms-hero-actions">
            <Link to="/contact" className="btn-pill">
              <span>Request a Demo</span><i className="arrow"></i>
            </Link>
            <Link to="/contact" className="btn-pill ghost">
              <span>See Pricing</span><i className="arrow"></i>
            </Link>
          </div>
          <div className="hrms-hero-shot">
            <img src="/products/hrms/hero-dashboard.png" alt="TechBird HRMS Dashboard  - Manage your workforce with confidence" loading="eager" />
          </div>
        </div>
      </section>

      {/* ── MODULES STRIP ── */}
      <section className="hrms-modules">
        <div className="hrms-wrap">
          <div className="hrms-modules-grid">
            {[
              { icon: ICONS.payroll, label: 'Payroll' },
              { icon: ICONS.fingerprint, label: 'Attendance' },
              { icon: ICONS.calendar, label: 'Leave' },
              { icon: ICONS.briefcase, label: 'Recruitment' },
              { icon: ICONS.award, label: 'Appraisals' },
              { icon: ICONS.shield, label: 'Compliance' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, label: 'Self-Service' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, label: 'Directory' },
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
            <h2 className="hrms-display">Everything HR needs, nothing it doesn't.</h2>
            <p>Every module shares one employee record  - data entered once flows everywhere, from onboarding to final settlement.</p>
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
            <h2 className="hrms-display">See the product in action.</h2>
            <p>A single system for the whole people operation  - built for the way Indian HR actually works.</p>
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
              <p>Everything you need to know before you deploy HRMS.</p>
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
              <h2 className="hrms-display">Ready to automate HR?</h2>
            </div>
            <div>
              <p className="hrms-cta-body">
                No 47-slide deck. A focused 30-minute walkthrough of HRMS mapped to your actual payroll, attendance and compliance workflows.
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
