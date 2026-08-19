import { useEffect, useRef, useState } from 'react';

/* ══════════════════════════════════════════════════════════════════
   Only real clients with work we can actually point to.

   Every entry below maps to a documented engagement - the first two from
   the client directly, the rest from src/data/caseStudies.js - and every
   one has a real logo in /assets/clients. The previous list was mostly
   invented companies (Nexus Manufacturing, StyleKart, GrowthPulse and so
   on), which is the opposite of a genuine review.

   Ratings are deliberately NOT all 5. Where a client gave 4 the quote says
   why in their own words; a wall of identical five-star praise with no
   caveat anywhere is the thing that reads as fake.

   Fields: `company` required. `name`/`role` optional - omitted where we do
   not know the individual, rather than inventing a person at a real firm.
   ══════════════════════════════════════════════════════════════════ */
const REVIEWS = [
  {
    company: 'StayBird Hospitality', name: 'Srikant Bansode',
    logo: '/assets/clients/staybird.webp', product: 'Customised ERP', rating: 5,
    quote: 'We run several properties and each one sat on its own system. TechBird built us a customised ERP that pulls bookings, housekeeping, inventory and billing into a single view. Month-end reporting that used to take a week now closes in a day.',
  },
  {
    company: 'Rishabh Builders',
    logo: '/assets/clients/rishabh-builders.webp', product: 'HR Automation', rating: 4,
    quote: 'Our HR ran on registers and spreadsheets spread across every active site. TechBird pulled onboarding, attendance, leave and payroll into one platform, and site-level records finally match head office. Getting the historical data across took longer than we planned, but the day-to-day is a different job now.',
  },
  {
    company: 'Smart Choice',
    logo: '/assets/clients/smart-choice.webp', product: 'ERP + Payments', rating: 5,
    quote: 'Sales, inventory and finance each had their own version of the truth, and vendor payments were chased by hand. The ERP TechBird rolled out put all of it in one place with payments running automatically. Reconciliation that used to eat days takes an afternoon.',
  },
  {
    company: 'Starbird Holidays', name: 'Rizwan',
    logo: '/assets/clients/starbird.webp', product: 'CRM', rating: 5,
    quote: 'Enquiries reached us from calls, WhatsApp and the website, and plenty slipped through the cracks. The CRM TechBird built puts every lead in one pipeline with follow-up reminders. Our team stopped chasing spreadsheets and started closing more bookings.',
  },
  {
    company: 'GLS',
    logo: '/assets/clients/gls.webp', product: 'Document Management', rating: 4,
    quote: 'Every GST filing, appeal and notice lived in a physical file, so finding a two-year-old submission meant going through cabinets. It is all digital and searchable now, and notice deadlines stopped catching us out. It took the team a few weeks to trust the system over paper, but nobody wants the cabinets back.',
  },
];

const MAX_STARS = 5;

/* All five stars are always drawn - the unfilled ones dimmed - so a 4 reads
   as "4 out of 5" rather than just a shorter row of stars. */
const Stars = ({ rating }) => (
  <div className="tm-stars" aria-label={`${rating} out of ${MAX_STARS} stars`}>
    {Array.from({ length: MAX_STARS }, (_, i) => (
      <svg
        key={i}
        className={i < rating ? 'tm-star is-on' : 'tm-star'}
        width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
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
                <Stars rating={t.rating} />
                <span className="tm-product">{t.product}</span>
              </div>
              <p className="tm-quote">{t.quote}</p>
              <div className="tm-author">
                {t.logo
                  ? <span className="tm-logo"><img src={t.logo} alt={t.company} loading="lazy" /></span>
                  : <div className="tm-avatar">{(t.name || t.company).charAt(0)}</div>}
                <div>
                  {/* Where we know the person they lead and the company is the
                      sub-line; where we don't, the company stands alone rather
                      than us inventing a contact. */}
                  <span className="tm-name">{t.name || t.company}</span>
                  {t.name && (
                    <span className="tm-role">{t.role ? `${t.role}, ${t.company}` : t.company}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
