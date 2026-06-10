import { Link } from 'react-router-dom';

export default function InnerFooter() {
  return (
    <footer className="ip-footer">
      <div className="ip-foot-inner">
        <div className="ip-foot-grid">

          <div className="ip-foot-brand">
            <Link to="/" className="ip-foot-logo-link">
              <div className="ip-foot-logo-mark">
                <span>TB</span>
              </div>
              <span className="ip-foot-logo-name">TechBird</span>
            </Link>
            <p className="ip-foot-tag">
              Driving digital transformation — ERP, AI, Web &amp; Mobile Apps, Cloud &amp; Marketing.
              Based in Pune, delivered worldwide.
            </p>
          </div>

          <div className="ip-foot-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services/software-development">Software Development</Link></li>
              <li><Link to="/services/ai-solutions">AI Solutions</Link></li>
              <li><Link to="/services/cloud-devops">Cloud &amp; DevOps</Link></li>
              <li><Link to="/services/animation">2D &amp; 3D Animation</Link></li>
              <li><Link to="/services/martech">MarTech</Link></li>
              <li><Link to="/services/marketing">Marketing Strategy</Link></li>
            </ul>
          </div>

          <div className="ip-foot-col">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products/hrms">HRMS</Link></li>
              <li><Link to="/products/practice-management">Practice Management</Link></li>
              <li><Link to="/products/dms">Document Management</Link></li>
              <li><Link to="/products/visitor-management">Visitor Management</Link></li>
              <li><Link to="/products">See All Products</Link></li>
            </ul>
          </div>

          <div className="ip-foot-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/work">Our Work</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

        </div>

        <div className="ip-foot-bar">
          <p className="ip-foot-copy">© 2026 TechBird IT Services · Empowering growth through intelligent technology.</p>
          <div className="ip-foot-regions">
            <span>India</span>
            <span className="ip-foot-dot" />
            <span>United Kingdom</span>
            <span className="ip-foot-dot" />
            <span>United States</span>
            <span className="ip-foot-dot" />
            <span>UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
