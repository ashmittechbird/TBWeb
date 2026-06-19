import { useEffect, useRef, useState } from 'react';

const REVIEWS = [
  { quote: 'TechBird transformed our entire HR operations. The HRMS handles payroll, attendance and compliance seamlessly. What took days now takes minutes.', name: 'Rajesh Kulkarni', role: 'Head of HR', company: 'Nexus Manufacturing', source: 'Google', rating: 5 },
  { quote: 'Their ERP implementation was on time and on budget. The team understood our manufacturing workflows better than vendors ten times their size.', name: 'Priya Sharma', role: 'COO', company: 'Vanguard Exports', source: 'Google', rating: 5 },
  { quote: 'We went from scattered spreadsheets to a fully integrated CRM and document management system. Post-launch support has been exceptional.', name: 'Amit Deshmukh', role: 'Managing Director', company: 'Pinnacle Legal', source: 'Glassdoor', rating: 5 },
  { quote: 'The team delivered a complex e-commerce platform in just 10 weeks. Multi-vendor, payment gateway, logistics: all integrated flawlessly.', name: 'Sneha Patil', role: 'Founder', company: 'StyleKart', source: 'Google', rating: 5 },
  { quote: 'TechBird built our visitor management system from scratch. Digital check-in, host alerts, badge printing: our front desk is now fully automated.', name: 'Vikram Joshi', role: 'Admin Head', company: 'Zenith Corp', source: 'Clutch', rating: 5 },
  { quote: 'Exceptional AI solutions team. They built a custom NLP model for our legal research that cut document review time by 70%.', name: 'Aditi Menon', role: 'Partner', company: 'Menon & Associates', source: 'Glassdoor', rating: 5 },
  { quote: 'Cloud migration was seamless. Zero downtime, 40% cost reduction, and our DevOps pipeline is now fully automated. Highly recommended.', name: 'Rohan Mehta', role: 'CTO', company: 'FinEdge Solutions', source: 'Google', rating: 5 },
  { quote: 'The practice management system they built handles appointments, billing and patient records for all our 12 clinics from a single dashboard.', name: 'Dr. Kavita Rao', role: 'Director', company: 'CareFirst Clinics', source: 'Clutch', rating: 5 },
  { quote: 'From requirements to go-live in 6 weeks. The litigation management tool tracks every court date, deadline and document across our entire firm.', name: 'Sanjay Gupta', role: 'Senior Partner', company: 'Gupta Legal LLP', source: 'Google', rating: 5 },
  { quote: 'Their marketing technology stack integration was game-changing. CRM, ad platforms, analytics: everything talks to each other now.', name: 'Meera Iyer', role: 'VP Marketing', company: 'GrowthPulse', source: 'Glassdoor', rating: 4 },
];

const SOURCE_ICONS = {
  Google: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09A6.97 6.97 0 015.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 001 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  Glassdoor: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2" fill="#0CAA41" opacity="0.85"/>
      <rect x="6" y="12" width="12" height="10" rx="2" fill="#fff" opacity="0.5"/>
    </svg>
  ),
  Clutch: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#FF3D2E" strokeWidth="2.5" fill="none"/>
      <circle cx="12" cy="12" r="4" fill="#FF3D2E"/>
    </svg>
  ),
};

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function Testimonials() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  /* Duplicate reviews for seamless loop */
  const doubled = [...REVIEWS, ...REVIEWS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf;
    let pos = 0;
    const speed = 0.4; /* px per frame */

    const tick = () => {
      if (!paused) {
        pos += speed;
        /* Reset when first set scrolls out */
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section className="section tm-section" id="testimonials" data-screen-label="Testimonials">
      <div className="tm-wrap">
        <div className="tm-header">
          <div>
            <p className="eyebrow"><i></i>Testimonials</p>
            <h2 className="sec-title">Trusted by teams<br />across industries.</h2>
          </div>
          <div className="tm-trust-badges">
            <span className="tm-badge">{SOURCE_ICONS.Google} <strong>4.9</strong> on Google</span>
            <span className="tm-badge">{SOURCE_ICONS.Glassdoor} <strong>4.8</strong> on Glassdoor</span>
            <span className="tm-badge">{SOURCE_ICONS.Clutch} <strong>4.9</strong> on Clutch</span>
          </div>
        </div>
      </div>

      {/* Sliding carousel: full bleed */}
      <div
        className="tm-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="tm-track" ref={trackRef}>
          {doubled.map((t, i) => (
            <div className="tm-card" key={i}>
              <div className="tm-card-top">
                <div className="tm-stars">
                  {[...Array(t.rating)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <span className="tm-source">{SOURCE_ICONS[t.source]} {t.source}</span>
              </div>
              <p className="tm-quote">{t.quote}</p>
              <div className="tm-author">
                <div className="tm-avatar">{t.name.charAt(0)}</div>
                <div>
                  <span className="tm-name">{t.name}</span>
                  <span className="tm-role">{t.role}, {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
