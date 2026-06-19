import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/inner.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══ DATA ═══ */
const INDUSTRIES = [
  {
    id: 'manufacturing', label: 'Manufacturing', color: '#f59e0b',
    headline: "Manufacturing runs on data. Most factories aren't collecting it.",
    sub: 'We implement ERP systems, IoT integrations and production dashboards that give manufacturing businesses real-time visibility from shop floor to boardroom.',
    pills: ['ERPNext','Production Planning','Inventory','Quality','IoT'],
    stats: [{v:'23%',l:'Inventory cost reduction'},{v:'4h→0',l:'Reports now real-time'},{v:'3',l:'Plants on single ERP'},{v:'99.7%',l:'QC accuracy'}],
    problems: [
      {t:'Manual Reporting',d:'Production reports take 4+ hours per week from Excel sheets. Decisions on data that\'s already days old.'},
      {t:'Disconnected Plants',d:'Multiple plants, zero unified view. Each location on different systems with no real-time visibility.'},
      {t:'Paper-Based QC',d:'Defects aren\'t caught until they\'ve multiplied. Traceability for audits is a nightmare.'},
    ],
    caps: [
      {t:'Smart Factory ERP',d:'Procurement, production, warehouse, finance and HR — built on ERPNext or custom.'},
      {t:'Supply Chain Digitisation',d:'Supplier onboarding, purchase orders, inbound logistics and landed cost tracking.'},
      {t:'Production Planning',d:'Automated work orders, capacity planning and scheduling balanced with demand.'},
      {t:'Quality Control',d:'Digital QC checklists, automated inspections, defect tracking and corrective actions.'},
      {t:'IoT Integration',d:'Connect machines and PLCs. Monitor OEE, downtime and predictive maintenance.'},
      {t:'Inventory & Warehouse',d:'Barcode/QR management, real-time stock, multi-location and reorder automation.'},
    ],
  },
  {
    id: 'retail', label: 'Retail & E-Commerce', color: '#ec4899',
    headline: "Retail is omnichannel now. Your systems probably aren't.",
    sub: 'E-commerce platforms, inventory systems, customer analytics and marketing automation for retail businesses scaling across channels.',
    pills: ['Omnichannel','Inventory Sync','Logistics','E-Commerce'],
    stats: [{v:'3.2x',l:'Online revenue growth'},{v:'40%',l:'Reduction in stockouts'},{v:'99.97%',l:'Platform uptime'},{v:'34%',l:'Infra cost reduction'}],
    problems: [
      {t:'Siloed Inventory',d:'Online, physical store and warehouse all run different counts. Overselling while shelves sit empty.'},
      {t:'No Unified Customer View',d:"Same person across channels but systems don't know it. No loyalty, no personalisation."},
      {t:'Manual Order Processing',d:'Website, WhatsApp, marketplaces — all processed manually. Bottleneck and delayed fulfilment.'},
    ],
    caps: [
      {t:'Omnichannel Platform',d:'Headless commerce with unified catalogue, consistent pricing and single cart.'},
      {t:'Inventory & Orders',d:'Real-time sync across all channels, automated reorder and fulfilment tracking.'},
      {t:'Customer Data Platform',d:'Unify all touchpoints into a single profile with lifetime value tracking.'},
      {t:'Loyalty & Retention',d:'Points, tiers, referrals and personalised offers driven by purchase behaviour.'},
      {t:'Marketing Automation',d:'Automated campaigns triggered by behaviour — abandoned cart, win-back, seasonal.'},
      {t:'Analytics Dashboard',d:'Sales by channel, product performance, cohort analysis and demand forecasting.'},
    ],
  },
  {
    id: 'legal', label: 'Legal & Finance', color: '#3b82f6',
    headline: 'Law firms bill by the hour. Manual processes steal those hours.',
    sub: 'Practice management, litigation trackers, compliance automation and AI tools for law firms, CAs and financial advisors.',
    pills: ['Practice Mgmt','Litigation','DMS','Compliance','AI Research'],
    stats: [{v:'70%',l:'Research time reduction'},{v:'0',l:'Missed deadlines'},{v:'5,000+',l:'Docs digitised/firm'},{v:'12',l:'CA firms served'}],
    problems: [
      {t:'6+ Hours/Partner/Week on Research',d:'Premium billing time spent manually searching case law — AI can do it in minutes.'},
      {t:'Manual Deadline Tracking',d:'Court hearings and ROC deadlines in calendars. One miss can cost millions.'},
      {t:'Paper-Based Documents',d:'Finding a clause in a five-year-old agreement takes 30 minutes.'},
    ],
    caps: [
      {t:'Practice Management',d:'Client intake, matter management, time tracking, billing and profitability — all in one.'},
      {t:'Litigation Tracking',d:'Automated hearing reminders, filing deadlines and full case history across courts.'},
      {t:'AI Legal Research',d:'Kulkee searches case law in natural language. Cited research in minutes, not hours.'},
      {t:'Compliance Automation',d:'ROC filings, GST, ITR, SEBI reporting. Alerts escalate if unactioned.'},
      {t:'Document Management',d:'Full-text search, version control, client-matter tagging and e-signatures.'},
      {t:'Financial Platforms',d:'Trading dashboards, portfolio management and regulatory reporting.'},
    ],
  },
  {
    id: 'bpo', label: 'BPO & Call Centres', color: '#a78bfa',
    headline: 'BPO margins are thin. Manual workflows make them thinner.',
    sub: 'Workforce management, call analytics, AI-powered quality monitoring and CRM automation for contact centres.',
    pills: ['Workforce Mgmt','QA Automation','CRM','Call Analytics'],
    stats: [{v:'85%',l:'QA coverage (from 2%)'},{v:'22%',l:'AHT reduction'},{v:'40%',l:'Faster onboarding'},{v:'99.5%',l:'SLA compliance'}],
    problems: [
      {t:'QA Covers Only 2% of Calls',d:'Quality issues undetected for weeks. Client escalations and reputation damage.'},
      {t:'High Agent Attrition',d:'Clunky systems frustrate agents. Replacement cost averages 3-4 months salary.'},
      {t:'Disconnected CRM & Telephony',d:'5+ apps per call. Every wasted second inflates AHT and costs.'},
    ],
    caps: [
      {t:'Workforce Management',d:'AI scheduling, shift planning, adherence tracking for 50 to 5,000 agents.'},
      {t:'Call Analytics & QA',d:'Sentiment analysis, call scoring and reporting across 100% of interactions.'},
      {t:'AI-Powered QA',d:'From 2% manual to 85%+ automated. Transcript analysis and auto score cards.'},
      {t:'CRM Integration',d:'Unified agent desktop — telephony, CRM, knowledge base. One screen.'},
      {t:'Performance Dashboards',d:'Live SLA, agent KPIs, campaign metrics with role-based access.'},
      {t:'Omnichannel Platform',d:'Voice, chat, email, WhatsApp unified into a single queue.'},
    ],
  },
  {
    id: 'healthcare', label: 'Healthcare', color: '#34d399',
    headline: 'Healthcare data is everywhere. Actionable insights are not.',
    sub: 'Patient management, appointment scheduling, health analytics and AI-assisted diagnostics for healthcare providers.',
    pills: ['Patient Mgmt','EHR','Telemedicine','HIPAA','AI Diagnostics'],
    stats: [{v:'60%',l:'Reduction in no-shows'},{v:'3x',l:'Faster registration'},{v:'100%',l:'HIPAA-compliant'},{v:'15',l:'Clinics deployed'}],
    problems: [
      {t:'Fragmented Patient Records',d:'Critical history inaccessible at point of care. Duplicate tests and billing errors.'},
      {t:'Manual Scheduling',d:'No automated reminders, no waitlist. 30%+ no-show rates hit revenue directly.'},
      {t:'Siloed Lab & Billing',d:'Clinicians lack unified view. Delays in diagnosis and discharge compound.'},
    ],
    caps: [
      {t:'Patient Management',d:'Registration to discharge — all HIPAA-secure in one system.'},
      {t:'Scheduling Platform',d:'Online booking, automated WhatsApp/SMS reminders and smart waitlist fill.'},
      {t:'Health Analytics',d:'Population trends, utilisation, readmission risk and financial KPIs.'},
      {t:'Telemedicine',d:'Secure video, prescriptions, follow-up scheduling and remote monitoring.'},
      {t:'Electronic Health Records',d:'Clinical docs, lab results, imaging, medication history and discharge summaries.'},
      {t:'Compliance & Security',d:'HIPAA, IT Act, HL7 FHIR. Audit logs, RBAC, encrypted data at rest.'},
    ],
  },
];

/* ═══ COMPONENT ═══ */
export default function IndustriesPage() {
  const ref = useRef(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.ip2-overlay', { opacity: 0, duration: 0.5 }, 0).set('.ip2-overlay', { display: 'none' }, 0.55);
      tl.from('.ihero-ey', { y: 18, opacity: 0, duration: 0.45 }, 0.2);
      tl.from('.ihero-h1', { y: 55, opacity: 0, duration: 0.85 }, 0.28);
      tl.from('.ihero-sub', { y: 25, opacity: 0, duration: 0.55 }, 0.5);

      root.querySelectorAll('.iblock').forEach(block => {
        const trigger = { trigger: block, start: 'top 84%', once: true };
        const h = block.querySelector('.iblock-head');
        if (h) gsap.from(h, { scrollTrigger: trigger, y: 40, opacity: 0, duration: 0.75 });
        const stats = block.querySelectorAll('.iblock-stat');
        if (stats.length) gsap.from(stats, { scrollTrigger: { trigger: block, start: 'top 76%', once: true }, y: 20, opacity: 0, stagger: 0.06, duration: 0.45, delay: 0.15 });
        const probs = block.querySelectorAll('.iblock-prob');
        if (probs.length) gsap.from(probs, { scrollTrigger: { trigger: probs[0], start: 'top 88%', once: true }, y: 22, opacity: 0, stagger: 0.07, duration: 0.45 });
        const caps = block.querySelectorAll('.iblock-cap');
        if (caps.length) gsap.from(caps, { scrollTrigger: { trigger: caps[0], start: 'top 86%', once: true }, y: 25, opacity: 0, stagger: 0.05, duration: 0.45 });
      });
      gsap.from('.icta-inner', { scrollTrigger: { trigger: '.icta', start: 'top 82%', once: true }, y: 40, opacity: 0, duration: 0.75 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="ind-page">
      <SEO
        title="Industries We Serve — IT Solutions by TechBird"
        description="TechBird delivers IT solutions for manufacturing, retail, legal, BPO and healthcare — industry-specific ERP, AI and cloud that fit your needs."
        keywords="manufacturing ERP, retail e-commerce, legal tech, BPO automation, healthcare IT, Pune India"
        faqItems={[
          {q:'What industries does TechBird serve?',a:'Manufacturing, Retail & E-commerce, Legal & Finance, BPO & Call Centres, and Healthcare.'},
          {q:'Does TechBird build industry-specific software?',a:'Yes — from factory ERP to hospital management, fully customised per vertical.'},
          {q:'Where is TechBird located?',a:'Pune, India — serving clients in India, UK, US and UAE.'},
        ]}
        serviceSchema={{name:'Industry-Specific IT Solutions',description:'ERP, AI and cloud for Manufacturing, Retail, Legal, BPO and Healthcare.',category:'Technology Consulting'}}
      />
      <div className="ip2-overlay" />
      <InnerNavbar />

      {/* HERO */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Where we work</p>
            <h1 className="ihero-h1">Industries we know<br /><span>deeply.</span></h1>
            <p className="ihero-sub">We've shipped production systems in these sectors — not just proposals. Each industry gets solutions built around its specific workflows, compliance needs and growth patterns.</p>
          </div>
          <div className="ihero-img-side">
            <img src="/assets/industries-hero.webp" alt="Technology workspace" className="ihero-img" loading="eager" />
          </div>
        </div>
      </section>

      {/* INDUSTRY BLOCKS */}
      {INDUSTRIES.map((ind, idx) => (
        <section key={ind.id} className="iblock" id={ind.id} style={{'--ind-accent': ind.color}}>
          <div className="iblock-inner">
            {/* Header */}
            <div className="iblock-head">
              <div className="iblock-head-top">
                <span className="iblock-num">({String(idx+1).padStart(2,'0')})</span>
                <span className="iblock-label">{ind.label}</span>
                <span className="iblock-accent-line" />
              </div>
              <h2 className="iblock-h2">{ind.headline}</h2>
              <p className="iblock-sub">{ind.sub}</p>
              <div className="iblock-pills">{ind.pills.map((p,i)=><span key={i} className="iblock-pill">{p}</span>)}</div>
            </div>

            {/* Stats */}
            <div className="iblock-stats">
              {ind.stats.map((s,i)=>(<div className="iblock-stat" key={i}><span className="iblock-stat-v">{s.v}</span><span className="iblock-stat-l">{s.l}</span></div>))}
            </div>

            {/* Two-column: Problems left + Capabilities right */}
            <div className="iblock-two-col">
              <div className="iblock-probs">
                <p className="iblock-sec-label">The challenge</p>
                {ind.problems.map((p,i)=>(<div className="iblock-prob" key={i}><span className="iblock-prob-num">({i+1})</span><div><h3 className="iblock-prob-t">{p.t}</h3><p className="iblock-prob-d">{p.d}</p></div></div>))}
              </div>

              <div className="iblock-caps">
                <p className="iblock-sec-label">What we build</p>
                <div className="iblock-cap-grid">
                  {ind.caps.map((c,i)=>(<div className="iblock-cap" key={i}><span className="iblock-cap-num">({i+1})</span><h3 className="iblock-cap-t">{c.t}</h3><p className="iblock-cap-d">{c.d}</p></div>))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="icta">
        <div className="icta-inner">
          <p className="icta-ey">Don't see your industry?</p>
          <h2 className="icta-h">We adapt fast.</h2>
          <p className="icta-p">Our ERP, AI and cloud capabilities transfer across sectors. If your industry isn't listed, let's talk — we've likely already solved a similar problem.</p>
          <Link to="/contact" className="icta-btn">Start a Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
