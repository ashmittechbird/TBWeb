import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { CASES } from '../data/caseStudies';
import '../styles/inner.css';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CaseStudiesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Case Studies"
        description="Real results from real engagements. See how TechBird has helped enterprises automate HR, digitise documents, and deploy full-suite ERP systems."
        keywords="TechBird case studies, HRMS implementation, ERP deployment, document management, enterprise software results"
      />
      <InnerNavbar />

      {/* ══ HERO: same pattern as Products page ══ */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Case Studies</p>
            <h1 className="ihero-h1">Real results from<br /><span>real engagements.</span></h1>
            <p className="ihero-sub">See how we've helped enterprises automate operations, digitise workflows and deploy production-grade platforms, on time and on budget.</p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Link to="/contact" className="icta-btn" style={{ fontSize: '0.78rem', padding: '0.7rem 1.4rem' }}>Start a Project</Link>
            </div>
          </div>
          <div className="ihero-img-side">
            <img src="/assets/products-hero-bg.webp" alt="Case studies" className="ihero-img" loading="eager" />
          </div>
        </div>
      </section>

      {/* ══ CASE STUDY LISTING: editorial rows ══ */}
      <section className="csp-listing">
        <div className="csp-listing-wrap">
          <div className="csp-listing-head" data-reveal>
            <span className="csp-listing-ey">All Case Studies</span>
            <p className="csp-listing-sub">Each engagement below is a real deployment with measurable outcomes.</p>
          </div>

          <div className="csp-listing-list">
            {CASES.map((c) => (
              <Link to={`/case-studies/${c.slug}`} className="csp-listing-row" key={c.slug} data-reveal>
                <div className="csp-listing-img">
                  <img src={c.img} alt={c.client} loading="lazy" />
                </div>
                <span className="csp-listing-num">{c.num}</span>
                <div className="csp-listing-body">
                  <span className="csp-listing-meta">{c.client} | {c.industry}</span>
                  <h3 className="csp-listing-title">{c.title}</h3>
                  <p className="csp-listing-desc">{c.desc}</p>
                </div>
                <span className="csp-listing-arrow"><ArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="csp-bottom-cta">
        <div className="csp-bottom-cta-inner" data-reveal>
          <p className="csp-bottom-cta-ey">Get started</p>
          <h2 className="csp-bottom-cta-h2">Have a similar<br />challenge?</h2>
          <p className="csp-bottom-cta-body">Let's talk about how we can help your team ship faster and operate better.</p>
          <Link to="/contact" className="csp-bottom-cta-btn">
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
