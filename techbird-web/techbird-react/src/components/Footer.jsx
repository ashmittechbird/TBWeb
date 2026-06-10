import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="blog">
      <span className="foot-noise"></span>
      <div className="wrap">
        <div className="foot-grid">

          <div className="foot-brand">
            <Link className="foot-logo-link" to="/">
              <img src="/logo.png" alt="TechBird" className="foot-logo-img" />
            </Link>
            <p className="foot-tag">
              Driving digital transformation — ERP, Custom Web &amp; Mobile Apps, AI Integrations &amp; Marketing.
            </p>
            <div className="foot-contact">
              <a href="mailto:hello@techbird.io">hello@techbird.io</a>
              <a href="tel:+923001234567">Call Us</a>
            </div>
          </div>

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

          <div className="foot-col">
            <p className="foot-col-head">Products</p>
            <ul>
              <li><Link to="/products/erp">Custom ERP</Link></li>
              <li><Link to="/products/hrms">HRMS</Link></li>
              <li><Link to="/products/crm">Lead &amp; Sales CRM</Link></li>
              <li><Link to="/products/document-management">Document Management</Link></li>
              <li><Link to="/products/litigation-management">Litigation Management</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <p className="foot-col-head">Company</p>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/work">Our Work</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

        </div>

        <div className="foot-bar">
          <p className="foot-copy">© 2026 TechBird IT Services · Empowering growth through intelligent technology.</p>
          <span className="foot-label">[ TECHBIRD.FOOTER ]</span>
        </div>
      </div>

      {/* oversized brand wordmark bleeding off the bottom edge */}
      <div className="foot-wordmark" aria-hidden="true">TechBird</div>
    </footer>
  );
}
