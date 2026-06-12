import { Link } from 'react-router-dom';

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CARDS = [
  {
    id: 'rc1',
    cls: 'rc-1',
    cat: 'ERP · WebApp · APIs · SaaS',
    label: <>Software<br />Development</>,
    to: '/services/software-development',
    svgFront: (
      <>
        <circle cx="400" cy="70" r="190" stroke="rgba(255,255,255,.1)" strokeWidth="1" fill="none" />
        <circle cx="400" cy="70" r="110" stroke="rgba(255,255,255,.07)" strokeWidth="1" fill="none" />
        <path d="M-60 240 C80 120 200 180 320 100 S480 40 580 80" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" fill="none" />
        <rect x="60" y="90" width="200" height="150" rx="8" stroke="rgba(255,255,255,.07)" strokeWidth="1" fill="none" />
        <circle cx="80" cy="80" r="40" stroke="rgba(167,139,250,.25)" strokeWidth="1" fill="none" />
      </>
    ),
    svgBack: (
      <>
        <circle cx="400" cy="70" r="190" stroke="rgba(0,0,0,.06)" strokeWidth="1" fill="none" />
        <path d="M-60 240 C80 120 200 180 320 100 S480 40 580 80" stroke="rgba(0,0,0,.05)" strokeWidth="1.5" fill="none" />
        <circle cx="80" cy="80" r="40" stroke="rgba(124,58,237,.15)" strokeWidth="1" fill="none" />
      </>
    ),
    desc: 'Custom ERP systems, web apps, APIs and SaaS platforms — built for enterprise scale across 50+ countries.',
    cta: 'See our work',
    vbFront: '0 0 480 360',
    vbBack: '0 0 480 360',
  },
  {
    id: 'rc2',
    cls: 'rc-2',
    cat: 'Custom Models · Consulting',
    label: <>AI<br />Solutions</>,
    svgFront: (
      <>
        <path d="M-80 200 C60 60 180 240 320 150 S480 40 620 100" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" fill="none" />
        <ellipse cx="380" cy="130" rx="200" ry="155" stroke="rgba(255,255,255,.08)" strokeWidth="1" fill="none" />
        <circle cx="460" cy="60" r="55" stroke="rgba(56,189,248,.28)" strokeWidth="1" fill="none" />
      </>
    ),
    svgBack: (
      <>
        <path d="M-80 200 C60 60 180 240 320 150 S480 40 620 100" stroke="rgba(0,0,0,.05)" strokeWidth="1.5" fill="none" />
        <ellipse cx="380" cy="130" rx="200" ry="155" stroke="rgba(0,0,0,.04)" strokeWidth="1" fill="none" />
        <circle cx="460" cy="60" r="55" stroke="rgba(14,165,233,.15)" strokeWidth="1" fill="none" />
      </>
    ),
    to: '/services/ai-solutions',
    desc: 'Bespoke AI models, intelligent automation and consulting — unlocking data-driven insights across your operations.',
    cta: 'Explore AI',
    vbFront: '0 0 560 400',
    vbBack: '0 0 560 400',
  },
  {
    id: 'rc3',
    cls: 'rc-3',
    cat: 'Infrastructure · Automation',
    label: <>Cloud &amp;<br />DevOps</>,
    svgFront: (
      <>
        <circle cx="240" cy="90" r="210" stroke="rgba(255,255,255,.08)" strokeWidth="1" fill="none" />
        <path d="M-60 160 C80 20 200 160 320 80 S480 -20 580 40" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" fill="none" />
        <circle cx="380" cy="280" r="60" stroke="rgba(52,211,153,.28)" strokeWidth="1" fill="none" />
      </>
    ),
    svgBack: (
      <>
        <circle cx="240" cy="90" r="210" stroke="rgba(0,0,0,.05)" strokeWidth="1" fill="none" />
        <path d="M-60 160 C80 20 200 160 320 80 S480 -20 580 40" stroke="rgba(0,0,0,.05)" strokeWidth="1.5" fill="none" />
        <circle cx="380" cy="280" r="60" stroke="rgba(16,185,129,.15)" strokeWidth="1" fill="none" />
      </>
    ),
    to: '/services/cloud-devops',
    desc: 'Robust cloud environments and DevOps pipelines — designed and managed for seamless operations and secure digital growth.',
    cta: 'View solutions',
    vbFront: '0 0 480 360',
    vbBack: '0 0 480 360',
  },
  {
    id: 'rc4',
    cls: 'rc-4',
    cat: 'CGI · VFX · AR · VR',
    label: <>2D &amp; 3D<br />Animation</>,
    svgFront: (
      <>
        <circle cx="80" cy="280" r="180" stroke="rgba(255,255,255,.08)" strokeWidth="1" fill="none" />
        <path d="M0 100 C140 -20 280 120 420 60 S560 0 640 40" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" fill="none" />
        <rect x="220" y="40" width="180" height="130" rx="10" stroke="rgba(255,255,255,.07)" strokeWidth="1" fill="none" />
        <circle cx="400" cy="300" r="50" stroke="rgba(251,191,36,.28)" strokeWidth="1" fill="none" />
      </>
    ),
    svgBack: (
      <>
        <circle cx="80" cy="280" r="180" stroke="rgba(0,0,0,.04)" strokeWidth="1" fill="none" />
        <path d="M0 100 C140 -20 280 120 420 60 S560 0 640 40" stroke="rgba(0,0,0,.05)" strokeWidth="1.5" fill="none" />
        <circle cx="400" cy="300" r="50" stroke="rgba(245,158,11,.15)" strokeWidth="1" fill="none" />
      </>
    ),
    to: '/services/animation',
    desc: 'Immersive visual storytelling through CGI, VFX, SFX and AR/VR experiences crafted for global brands.',
    cta: 'See portfolio',
    vbFront: '0 0 480 360',
    vbBack: '0 0 480 360',
  },
  {
    id: 'rc5',
    cls: 'rc-5',
    cat: 'CRM · ADTech · Dashboards',
    label: 'MarTech',
    svgFront: (
      <>
        <ellipse cx="300" cy="200" rx="220" ry="170" stroke="rgba(255,255,255,.07)" strokeWidth="1" fill="none" />
        <path d="M-40 300 C100 160 220 260 360 180 S500 80 600 120" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" fill="none" />
        <circle cx="120" cy="80" r="65" stroke="rgba(236,72,153,.28)" strokeWidth="1" fill="none" />
      </>
    ),
    svgBack: (
      <>
        <ellipse cx="300" cy="200" rx="220" ry="170" stroke="rgba(0,0,0,.04)" strokeWidth="1" fill="none" />
        <path d="M-40 300 C100 160 220 260 360 180 S500 80 600 120" stroke="rgba(0,0,0,.05)" strokeWidth="1.5" fill="none" />
        <circle cx="120" cy="80" r="65" stroke="rgba(236,72,153,.12)" strokeWidth="1" fill="none" />
      </>
    ),
    to: '/services/martech',
    desc: 'Optimized MarTech stacks spanning CRM, analytics, automation and customer data platforms for measurable growth.',
    cta: 'Explore MarTech',
    vbFront: '0 0 480 360',
    vbBack: '0 0 480 360',
  },
  {
    id: 'rc6',
    cls: 'rc-6',
    cat: 'GTM · SEO · SEM · SMM',
    label: <>Marketing<br />Strategy</>,
    svgFront: (
      <>
        <circle cx="350" cy="180" r="200" stroke="rgba(255,255,255,.07)" strokeWidth="1" fill="none" />
        <path d="M-20 200 C80 80 200 200 320 120 S480 40 580 80" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" fill="none" />
        <rect x="40" y="60" width="160" height="120" rx="8" stroke="rgba(255,255,255,.07)" strokeWidth="1" fill="none" />
        <circle cx="60" cy="290" r="55" stroke="rgba(6,182,212,.28)" strokeWidth="1" fill="none" />
      </>
    ),
    svgBack: (
      <>
        <circle cx="350" cy="180" r="200" stroke="rgba(0,0,0,.04)" strokeWidth="1" fill="none" />
        <path d="M-20 200 C80 80 200 200 320 120 S480 40 580 80" stroke="rgba(0,0,0,.05)" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="290" r="55" stroke="rgba(6,182,212,.12)" strokeWidth="1" fill="none" />
      </>
    ),
    to: '/services/marketing',
    desc: 'Marketing strategies aligned with business goals — GTM, SEO, SEM and social campaigns that drive sustainable growth.',
    cta: 'Get strategy',
    vbFront: '0 0 480 360',
    vbBack: '0 0 480 360',
  },
];

export default function Services() {
  return (
    <section className="recognition" id="services" data-screen-label="Services">
      <div className="recog-inner" id="recogInner">
        <div className="recog-text">
          <p className="eyebrow recog-ey"><i></i>What we do</p>
          <h2 className="recog-title">Services<br />engineered<br />for scale.</h2>
        </div>

        {CARDS.map(card => (
          <div className={`recog-card ${card.cls}`} id={card.id} key={card.id}>
            <div className="rc-inner">
              <div className="rc-front">
                <svg className="rc-svg" viewBox={card.vbFront} fill="none" preserveAspectRatio="xMidYMid slice">
                  {card.svgFront}
                </svg>
                <span className="rc-cat">{card.cat}</span>
                <p className="rc-label">{card.label}</p>
              </div>
              <div className="rc-back">
                <svg className="rc-svg rc-svg--back" viewBox={card.vbBack} fill="none" preserveAspectRatio="xMidYMid slice">
                  {card.svgBack}
                </svg>
                <p className="rc-back-desc">{card.desc}</p>
                <Link to={card.to} className="rc-back-cta">
                  {card.cta}{' '}
                  <span className="rc-cta-icon"><ArrowIcon /></span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
