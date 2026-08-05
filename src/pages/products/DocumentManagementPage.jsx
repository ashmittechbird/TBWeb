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
  documents:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>,
  folders:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 012-2h4l2 3h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>,
  search:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  upload:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>,
  attachments: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  categories:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  access:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>,
  admin:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
};

const FEATURES = [
  { icon: 'folders',     title: 'Centralised Library',      text: 'One organised repository for all documents — folders by category, entity, date or department.' },
  { icon: 'categories',  title: 'Smart Folder Structure',   text: 'Pre-built categories: Contracts, HR, Finance, Legal, Compliance, Projects and more. Customisable to your org.' },
  { icon: 'search',      title: 'Full-text Search',         text: 'Find documents by name, folder, date or content (including OCR for scanned PDFs) in seconds.' },
  { icon: 'upload',      title: 'Bulk Upload & Management', text: 'Drag-and-drop upload with bulk operations, rename, move and archive — no per-file friction.' },
  { icon: 'access',      title: 'Role-based Access',        text: 'Folder and document-level permissions. Every view, download and change is logged for audit.' },
  { icon: 'attachments', title: 'Attachment Tracking',      text: 'Documents linked to their source records — employees, cases, vendors or transactions — for complete traceability.' },
];

const SCREENS = [
  { id: 'library', label: 'Document Library', src: '/products/dms/hero.png', caption: 'Folder-organised document library with search, upload and attachment management' },
];

const INTEGRATIONS = [
  { label: 'Storage',       tech: 'On-premise, AWS S3, GCP and Azure Blob backends' },
  { label: 'Systems',       tech: 'ERP, HRMS and CRM via REST API — documents linked to source records' },
  { label: 'E-signature',   tech: 'Built-in digital signing and DocuSign integration' },
  { label: 'Communication', tech: 'Email and WhatsApp for sharing and approval notifications' },
];

const FAQ = [
  { q: 'How are documents organised?',             a: 'Documents live in a folder hierarchy you define — by department, entity, document type or date. Pre-built categories like Contracts, HR, Finance and Legal are ready out of the box.' },
  { q: 'Can we find documents by their content?',  a: 'Yes. Full-text indexing — including OCR for scanned PDFs and images — lets you search inside documents, not just by file name.' },
  { q: 'Who can see which documents?',             a: 'Permissions are set at folder and document level — view, download, upload, delete. Every action is logged in an immutable audit trail.' },
  { q: 'Can documents be linked to other records?', a: 'Yes. Attachments can be linked to employees, cases, vendors, customers or transactions in your ERP, HRMS or CRM — so the full document is always one click from the source record.' },
  { q: 'How long to go live?',                     a: 'A standard rollout with folder setup, permissions and migration runs 4–8 weeks; large archives with OCR and integrations run 10–14 weeks.' },
];

export default function DocumentManagementPage() {
  const root = useRef(null);
  const [activeScreen, setActiveScreen] = useState('library');

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
    <div className="hrms pp--dms" ref={root}>
      <SEO
        title="Document Management System"
        description="TechBird DMS — centralised document library with folder management, full-text search, role-based access and attachment tracking. Replace scattered drives and paper registers with one secure system."
        keywords="document management system, DMS, folder management, document search, OCR, role-based access, e-signature, enterprise DMS India"
        faqItems={FAQ}
        softwareSchema={{ name: 'TechBird DMS', description: 'Centralised document storage with search, access control and audit trail.', category: 'BusinessApplication' }}
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
          <span className="hrms-hero-eyebrow">Enterprise DMS</span>
          <h1 className="hrms-display">Every document, organised and <em>in control.</em></h1>
          <p className="hrms-hero-sub">
            Centralised document library with folder management, search, upload and role-based access — replacing scattered drives and paper registers with one secure system.
          </p>
          <div className="hrms-hero-shot">
            <img src="/products/dms/hero.png" alt="TechBird DMS — Document library with folder management and search" loading="eager" onError={onShotError} />
          </div>
        </div>
      </section>

      {/* ── MODULES STRIP ── */}
      <section className="hrms-modules">
        <div className="hrms-wrap">
          <div className="hrms-modules-grid">
            {[
              { icon: ICONS.documents,   label: 'Documents' },
              { icon: ICONS.folders,     label: 'Folders' },
              { icon: ICONS.search,      label: 'Search' },
              { icon: ICONS.upload,      label: 'Upload' },
              { icon: ICONS.attachments, label: 'Attachments' },
              { icon: ICONS.categories,  label: 'Categories' },
              { icon: ICONS.access,      label: 'Access Control' },
              { icon: ICONS.admin,       label: 'Admin' },
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
            <h2 className="hrms-display">One place for every document.</h2>
            <p>Every document has a single home with a clear folder structure, access policy and audit trail — so nothing gets lost and nothing goes unseen.</p>
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
            <h2 className="hrms-display">See the DMS in action.</h2>
            <p>A single system for your entire document operation — built for the way enterprise teams actually manage files.</p>
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
              <p>Everything you need to know before you deploy the DMS.</p>
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
              <h2 className="hrms-display">Ready to tame your documents?</h2>
            </div>
            <div>
              <p className="hrms-cta-body">
                A walkthrough of the DMS mapped to your folder structure, access policies and the systems it needs to link to.
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
