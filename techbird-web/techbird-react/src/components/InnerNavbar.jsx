import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Chev = () => (
  <svg className="nav-chev" viewBox="0 0 10 6" fill="none">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvcIcon = ({ path, color }) => (
  <span className="mega-svc-icon" style={{ background: color + '18', color }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={path}/>
    </svg>
  </span>
);

const ProIcon = ({ path, color }) => (
  <span className="mega-pro-icon" style={{ background: color + '18', color }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={path}/>
    </svg>
  </span>
);

const SERVICES = [
  { label: 'Software Development', desc: 'ERP · WebApp · APIs · SaaS',  to: '/services/software-development', color: '#a78bfa', icon: 'M8 6L3 12l5 6M16 6l5 6-5 6M14 4l-4 16' },
  { label: 'AI Solutions',         desc: 'Custom Models · Automation',   to: '/services/ai-solutions',         color: '#38bdf8', icon: 'M12 2a4 4 0 014 4c0 1.5-.6 2.8-1.6 3.8L21 17l-2 2-7.6-6.7A4 4 0 118 6a4 4 0 014-4zM3 21l5-5' },
  { label: 'Cloud & DevOps',       desc: 'Infrastructure · Pipelines',   to: '/services/cloud-devops',         color: '#34d399', icon: 'M18 10h-1.3A8 8 0 109 20h9a5 5 0 000-10z' },
  { label: '2D & 3D Animation',    desc: 'CGI · VFX · AR · VR',         to: '/services/animation',            color: '#fbbf24', icon: 'M2 3h20v14H2zM10 8.5l5 2.5-5 2.5V8.5z' },
  { label: 'MarTech',              desc: 'CRM · ADTech · Dashboards',    to: '/services/martech',              color: '#f472b6', icon: 'M18 20V10M12 20V4M6 20v-6' },
  { label: 'Marketing Strategy',   desc: 'GTM · SEO · SEM · Social',     to: '/services/marketing',            color: '#22d3ee', icon: 'M22 12a10 10 0 11-20 0 10 10 0 0120 0zM17.66 12a5.66 5.66 0 11-11.32 0 5.66 5.66 0 0111.32 0zM14 12a2 2 0 11-4 0 2 2 0 014 0z' },
];

const PRODUCTS = [
  { label: 'Custom ERP',           to: '/products/erp', color: '#a78bfa', icon: 'M3 3h7v7H3zM14 3h7v7H14zM3 14h7v7H3zM14 14h7v7H14z' },
  { label: 'HRMS',                 to: '/products/hrms', color: '#34d399', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { label: 'Lead & Sales CRM',     to: '/products/crm', color: '#38bdf8', icon: 'M22 3H2l8 9.46V19l4 2V12.46L22 3z' },
  { label: 'Practice Management',  to: '/products/practice-management', color: '#fbbf24', icon: 'M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 8h6M9 12h6M9 16h4' },
  { label: 'E-commerce Platform',  to: '/products/ecommerce', color: '#f472b6', icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0' },
  { label: 'Document Management',  to: '/products/document-management', color: '#22d3ee', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8' },
  { label: 'Litigation Management',to: '/products/litigation-management', color: '#fb923c', icon: 'M12 3v18M5 6l7-3 7 3M3 18h18M6 14l3-3M18 14l-3-3' },
  { label: 'Visitor Management',   to: '/products/visitor-management', color: '#a3e635', icon: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z' },
];

const LeftDeco = () => (
  <svg className="mega-left-deco" viewBox="0 0 180 140" fill="none">
    <circle cx="140" cy="20" r="55" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
    <circle cx="140" cy="20" r="30" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
    <path d="M0 90 C40 40 80 100 120 60 S160 10 180 30" stroke="rgba(255,255,255,.06)" strokeWidth="1.5"/>
    <circle cx="30" cy="110" r="22" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
  </svg>
);

export default function InnerNavbar() {
  const [mega, setMega] = useState(null);
  const timer = useRef(null);

  const open  = (name) => { clearTimeout(timer.current); setMega(name); };
  const close = ()     => { timer.current = setTimeout(() => setMega(null), 130); };
  const hold  = ()     => clearTimeout(timer.current);

  return (
    <nav className="topbar topbar--inner" id="topbar">
      <Link className="logo" to="/">
        <img src="/logo.png" alt="TechBird" className="logo-img" style={{ filter: 'brightness(0) invert(1)' }} />
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>

        <li onMouseEnter={() => open('svc')} onMouseLeave={close}>
          <NavLink to="/services" className={({ isActive }) => (isActive || mega === 'svc') ? 'active nav-trigger' : 'nav-trigger'}>
            Services <Chev />
          </NavLink>
        </li>

        <li onMouseEnter={() => open('pro')} onMouseLeave={close}>
          <NavLink to="/products" className={({ isActive }) => (isActive || mega === 'pro') ? 'active nav-trigger' : 'nav-trigger'}>
            Products <Chev />
          </NavLink>
        </li>

        <li><NavLink to="/industries" className={({ isActive }) => isActive ? 'active' : ''}>Industries</NavLink></li>
        <li><NavLink to="/about"      className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/blog"       className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink></li>
      </ul>

      <Link to="/contact" className="btn-pill ghost" id="ctaTop">
        <span>Get Started</span>
        <i className="arrow"></i>
      </Link>

      {/* ── Services Mega-Menu ── */}
      {mega === 'svc' && (
        <div className="nav-mega" onMouseEnter={hold} onMouseLeave={close}>
          <div className="mega-left">
            <LeftDeco />
            <span className="mega-left-eye">What we do</span>
            <h3 className="mega-left-title">Services<br/>engineered<br/>for scale.</h3>
            <p className="mega-left-sub">Six disciplines.<br/>One integrated team.</p>
            <Link to="/services" className="mega-left-cta">
              Explore all services
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="mega-right">
            <div className="mega-grid mega-grid--3">
              {SERVICES.map((s) => (
                <Link key={s.to} to={s.to} className="mega-item">
                  <SvcIcon path={s.icon} color={s.color} />
                  <span className="mega-item-name">{s.label}</span>
                  <span className="mega-item-desc">{s.desc}</span>
                </Link>
              ))}
            </div>
            <div className="mega-bar">
              <Link to="/services" className="mega-bar-link">
                <svg viewBox="0 0 16 16" fill="none"><path d="M8 3H3v10h10V8M8 3h5v5M8 8l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                View all services
              </Link>
              <Link to="/contact" className="mega-bar-link">
                <svg viewBox="0 0 16 16" fill="none"><path d="M2 4h12v8H2zM2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Talk to an expert
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Products Mega-Menu ── */}
      {mega === 'pro' && (
        <div className="nav-mega" onMouseEnter={hold} onMouseLeave={close}>
          <div className="mega-left">
            <LeftDeco />
            <span className="mega-left-eye">Our platforms</span>
            <h3 className="mega-left-title">Platforms<br/>ready to<br/>deploy.</h3>
            <p className="mega-left-sub">8 products.<br/>50+ enterprise clients.</p>
            <Link to="/contact" className="mega-left-cta">
              Request a demo
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="mega-right">
            <div className="mega-grid mega-grid--4">
              {PRODUCTS.map((p) => (
                <Link key={p.label} to={p.to} className="mega-item mega-item--pro">
                  <ProIcon path={p.icon} color={p.color} />
                  <span className="mega-item-name">{p.label}</span>
                </Link>
              ))}
            </div>
            <div className="mega-bar">
              <Link to="/contact" className="mega-bar-link">
                <svg viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3 8l5 6 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Request a demo
              </Link>
              <Link to="/contact" className="mega-bar-link">
                <svg viewBox="0 0 16 16" fill="none"><path d="M2 4h12v8H2zM2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
