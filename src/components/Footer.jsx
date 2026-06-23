import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.001-4.13 2.06 2.06 0 01-.001 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z"/>
  </svg>
);

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="footer" id="blog">
      <span className="foot-noise"></span>
      <div className="wrap">
        <div className="foot-grid">

          {/* ── Brand ── */}
          <div className="foot-brand">
            <Link className="foot-logo-link" to="/">
              <img src="/logo.webp" alt="TechBird" className="foot-logo-img" loading="lazy" decoding="async" width="150" height="52" />
            </Link>
            <p className="foot-tag">
              We take pride in being your trusted partner for all IT needs.
            </p>
            <div className="foot-socials">
              <a href="https://www.instagram.com/techbirdit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://www.linkedin.com/company/techbird-it-services/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            </div>
          </div>

          {/* ── Contact ── */}
          <div className="foot-col">
            <p className="foot-col-head">Contact</p>
            <ul className="foot-contact-list">
              <li className="foot-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014</span>
              </li>
              <li className="foot-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <a href="tel:+919766661836">+91 97666 61836</a>
              </li>
              <li className="foot-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:connect@techbirdit.in">connect@techbirdit.in</a>
              </li>
            </ul>
          </div>

          {/* ── Company ── */}
          <div className="foot-col">
            <p className="foot-col-head">Company</p>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/industries">Industries</Link></li>
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="foot-col">
            <p className="foot-col-head">Services</p>
            <ul>
              <li><Link to="/services/software-development">Software Development</Link></li>
              <li><Link to="/services/ai-solutions">AI Solutions</Link></li>
              <li><Link to="/services/cloud-devops">Cloud &amp; DevOps</Link></li>
              <li><Link to="/services/animation">2D &amp; 3D Animation</Link></li>
              <li><Link to="/services/martech">MarTech</Link></li>
              <li><Link to="/services/marketing">Marketing Strategy</Link></li>
            </ul>
          </div>

          {/* ── Products ── */}
          <div className="foot-col">
            <p className="foot-col-head">Products</p>
            <ul>
              <li><Link to="/products/erp">Custom ERP</Link></li>
              <li><Link to="/products/hrms">HRMS</Link></li>
              <li><Link to="/products/crm">Lead &amp; Sales CRM</Link></li>
              <li><Link to="/products/document-management">Document Management</Link></li>
              <li><Link to="/products">See All Products</Link></li>
            </ul>
          </div>

        </div>

        <div className="foot-bar">
          <div className="foot-legal">
            <p className="foot-copy">&copy; {new Date().getFullYear()} TechBird IT Services. All rights reserved.</p>
            <div className="foot-legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="foot-dot" />
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
          <div className="foot-regions">
            <span>India</span>
          </div>
        </div>
      </div>

      {/* oversized brand wordmark bleeding off the bottom edge */}
      <div className="foot-wordmark" aria-hidden="true">TechBird</div>

      {/* Scroll to top */}
      <button
        type="button"
        className={`foot-scroll-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </footer>
  );
}
