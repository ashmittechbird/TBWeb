import { useEffect, useRef, useState } from 'react';

/* `logo` is optional — when present it replaces the initial-letter avatar.
   `role` is optional — when absent only the company name is shown. */
const REVIEWS = [
  { quote: 'We run several properties and each one sat on its own system. TechBird built us a customised ERP that pulls bookings, housekeeping, inventory and billing into a single view. Month-end reporting that used to take a week now closes in a day.', name: 'Srikant Bansode', company: 'StayBird Hospitality', logo: '/assets/clients/staybird.webp', product: 'Customised ERP', rating: 5 },
  { quote: 'Enquiries reached us from calls, WhatsApp and the website, and plenty slipped through the cracks. The CRM TechBird built puts every lead in one pipeline with follow-up reminders. Our team stopped chasing spreadsheets and started closing more bookings.', name: 'Rizwan', company: 'Starbird Holidays', logo: '/assets/clients/starbird.webp', product: 'CRM', rating: 5 },
  { quote: 'TechBird transformed our entire HR operations. The HRMS handles payroll, attendance and compliance seamlessly. What took days now takes minutes.', name: 'Rajesh Kulkarni', role: 'Head of HR', company: 'Nexus Manufacturing', product: 'HRMS', rating: 5 },
  { quote: 'Their ERP implementation was on time and on budget. The team understood our manufacturing workflows better than vendors ten times their size.', name: 'Priya Sharma', role: 'COO', company: 'Vanguard Exports', product: 'ERP', rating: 5 },
  { quote: 'We went from scattered spreadsheets to a fully integrated CRM and document management system. Post-launch support has been exceptional.', name: 'Amit Deshmukh', role: 'Managing Director', company: 'Pinnacle Legal', product: 'Document Management', rating: 5 },
  { quote: 'The team delivered a complex e-commerce platform in just 10 weeks. Multi-vendor, payment gateway, logistics: all integrated flawlessly.', name: 'Sneha Patil', role: 'Founder', company: 'StyleKart', product: 'E-commerce', rating: 5 },
  { quote: 'TechBird built our visitor management system from scratch. Digital check-in, host alerts, badge printing: our front desk is now fully automated.', name: 'Vikram Joshi', role: 'Admin Head', company: 'Zenith Corp', product: 'Visitor Management', rating: 5 },
  { quote: 'Exceptional AI solutions team. They built a custom NLP model for our legal research that cut document review time by 70%.', name: 'Aditi Menon', role: 'Partner', company: 'Menon & Associates', product: 'AI Solutions', rating: 5 },
  { quote: 'Cloud migration was seamless. Zero downtime, 40% cost reduction, and our DevOps pipeline is now fully automated. Highly recommended.', name: 'Rohan Mehta', role: 'CTO', company: 'FinEdge Solutions', product: 'Cloud & DevOps', rating: 5 },
  { quote: 'The practice management system they built handles appointments, billing and patient records for all our 12 clinics from a single dashboard.', name: 'Dr. Kavita Rao', role: 'Director', company: 'CareFirst Clinics', product: 'Practice Management', rating: 5 },
  { quote: 'From requirements to go-live in 6 weeks. The litigation management tool tracks every court date, deadline and document across our entire firm.', name: 'Sanjay Gupta', role: 'Senior Partner', company: 'Gupta Legal LLP', product: 'Litigation Management', rating: 5 },
  { quote: 'Their marketing technology stack integration was game-changing. CRM, ad platforms, analytics: everything talks to each other now.', name: 'Meera Iyer', role: 'VP Marketing', company: 'GrowthPulse', product: 'MarTech', rating: 4 },
];

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

    /* The carousel used to advance on every frame for the life of the page,
       repainting 20 cards while the visitor was nowhere near this section.
       Gate it on the section being on screen and the tab being foregrounded -
       scrollWidth is also a layout read, so skipping the whole body avoids a
       forced reflow per frame too. */
    let inView = false;
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(e => { inView = e[0]?.isIntersecting ?? true; }, { rootMargin: '150px' })
      : null;
    if (io) io.observe(track);
    else inView = true;

    let half = track.scrollWidth / 2;
    const remeasure = () => { half = track.scrollWidth / 2; };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    if (ro) ro.observe(track);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (paused || !inView || document.hidden) return;
      pos += speed;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
    };
  }, [paused]);

  return (
    <section className="section tm-section" id="testimonials" data-screen-label="Testimonials">
      <div className="tm-wrap">
        <div className="tm-header">
          <div>
            <p className="eyebrow"><i></i>Testimonials</p>
            <h2 className="sec-title">Trusted by teams<br />across industries.</h2>
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
                <span className="tm-product">{t.product}</span>
              </div>
              <p className="tm-quote">{t.quote}</p>
              <div className="tm-author">
                {t.logo
                  ? <span className="tm-logo"><img src={t.logo} alt={t.company} loading="lazy" /></span>
                  : <div className="tm-avatar">{t.name.charAt(0)}</div>}
                <div>
                  <span className="tm-name">{t.name}</span>
                  <span className="tm-role">{t.role ? `${t.role}, ${t.company}` : t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
