import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';
import { productNavItems, productSubItems, LIVE_PRODUCT_COUNT } from '../data/products';

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

const PRODUCTS = productNavItems();

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
  const [pill, setPill] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef(null);
  const pillTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(pillTimer.current); }, []);

  /* The pill nav is only on screen once scrolled, so derive the open panel
     rather than clearing it from an effect - no extra render pass. */
  const pillOpen = scrolled ? pill : null;

  const open  = (name) => { clearTimeout(timer.current); setMega(name); };
  const close = ()     => { timer.current = setTimeout(() => setMega(null), 130); };
  const hold  = ()     => clearTimeout(timer.current);

  const openPill  = (name) => { clearTimeout(pillTimer.current); setPill(name); };
  const closePill = ()     => { pillTimer.current = setTimeout(() => setPill(null), 160); };
  const holdPill  = ()     => clearTimeout(pillTimer.current);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    {
      label: 'Services', ariaLabel: 'View our services', link: '/services',
      subItems: [
        { label: 'Software Development', link: '/services/software-development' },
        { label: 'AI Solutions',         link: '/services/ai-solutions' },
        { label: 'Cloud & DevOps',       link: '/services/cloud-devops' },
        { label: '2D & 3D Animation',    link: '/services/animation' },
        { label: 'MarTech',              link: '/services/martech' },
        { label: 'Marketing Strategy',   link: '/services/marketing' },
      ]
    },
    {
      label: 'Products', ariaLabel: 'View our products', link: '/products',
      subItems: productSubItems()
    },
    { label: 'Industries', ariaLabel: 'View industries we serve', link: '/industries' },
    { label: 'Case Studies', ariaLabel: 'View case studies', link: '/case-studies' },
    { label: 'About',      ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Contact',    ariaLabel: 'Get in touch',   link: '/contact' }
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/techbird-it-services/' }
  ];

  return (
    <>
      {/* ── Floating pill nav (appears on scroll) ── */}
      <div className={`inner-pill-nav${scrolled ? ' visible' : ''}`}>
        <Link to="/" className="pill-logo">
          <img src="/logo.webp" alt="TechBird" />
        </Link>
        <Link to="/">Home</Link>

        <span className="pill-group" onMouseEnter={() => openPill('svc')} onMouseLeave={closePill}>
          <Link to="/services" className={`pill-trigger${pillOpen === 'svc' ? ' open' : ''}`}>
            Services <Chev />
          </Link>
          {pillOpen === 'svc' && (
            <div className="pill-drop" onMouseEnter={holdPill} onMouseLeave={closePill}>
              <div className="pill-drop-card">
                {SERVICES.map((s) => (
                  <Link key={s.to} to={s.to} className="pill-drop-item" onClick={() => setPill(null)}>
                    <SvcIcon path={s.icon} color={s.color} />
                    <span className="pill-drop-text">
                      <span className="pill-drop-name">{s.label}</span>
                      <span className="pill-drop-desc">{s.desc}</span>
                    </span>
                  </Link>
                ))}
                <Link to="/services" className="pill-drop-all" onClick={() => setPill(null)}>
                  View all services
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          )}
        </span>

        <span className="pill-group" onMouseEnter={() => openPill('pro')} onMouseLeave={closePill}>
          <Link to="/products" className={`pill-trigger${pillOpen === 'pro' ? ' open' : ''}`}>
            Products <Chev />
          </Link>
          {pillOpen === 'pro' && (
            <div className="pill-drop" onMouseEnter={holdPill} onMouseLeave={closePill}>
              <div className="pill-drop-card">
                {PRODUCTS.map((p) => (
                  <Link key={p.to} to={p.to} className="pill-drop-item" onClick={() => setPill(null)}>
                    <ProIcon path={p.icon} color={p.color} />
                    <span className="pill-drop-text">
                      <span className="pill-drop-name">{p.label}</span>
                    </span>
                  </Link>
                ))}
                <Link to="/products" className="pill-drop-all" onClick={() => setPill(null)}>
                  View all products
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          )}
        </span>

        <Link to="/industries">Industries</Link>
        <Link to="/case-studies">Case Studies</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/contact" className="pill-cta">Get Started</Link>
      </div>

      <nav className={`topbar topbar--inner${scrolled ? ' topbar--hidden' : ''}`} id="topbar">
      <Link className="logo" to="/">
        <img src="/logo.webp" alt="TechBird" className="logo-img" style={{ filter: 'brightness(0) invert(1)' }} />
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
        <li><NavLink to="/case-studies" className={({ isActive }) => isActive ? 'active' : ''}>Case Studies</NavLink></li>
        <li><NavLink to="/about"      className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/contact"    className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
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
            <p className="mega-left-sub">{LIVE_PRODUCT_COUNT} products.<br/>50+ enterprise clients.</p>
            <Link to="/contact" className="mega-left-cta">
              Request a demo
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="mega-right">
            <div className="mega-grid mega-grid--4">
              {PRODUCTS.map((p) => (
                <Link key={p.to} to={p.to} className="mega-item mega-item--pro">
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

    {/* ── Mobile Staggered Navigation Menu ── */}
    <StaggeredMenu
      position="right"
      isFixed={true}
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen={true}
      colors={['#1e1e22', '#35353c']}
      logoUrl="/logo.webp"
      accentColor="#5227FF"
    />
  </>
  );
}
