import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { CASES } from '../data/caseStudies';
import '../styles/inner.css';

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = CASES.find((c) => c.slug === slug);
  const currentIdx = CASES.findIndex((c) => c.slug === slug);
  const nextStudy = CASES[(currentIdx + 1) % CASES.length];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

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
  }, [slug]);

  if (!study) return <Navigate to="/case-studies" replace />;

  return (
    <>
      <SEO
        title={`${study.title} — Case Study`}
        description={study.desc}
        keywords={`TechBird case study, ${study.client}, ${study.industry}, ${study.title}`}
      />
      <InnerNavbar />

      {/* ══ HERO ══ */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Case Study {study.num}</p>
            <h1 className="ihero-h1">{study.title.split(' ').slice(0, 4).join(' ')}<br /><span>{study.title.split(' ').slice(4).join(' ')}</span></h1>
            <p className="ihero-sub">{study.desc}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <span className="csd-pill">{study.client}</span>
              <span className="csd-pill">{study.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DETAIL CONTENT ══ */}
      <div className="csd-wrap">
        {/* Challenge + Solution */}
        <div className="csd-two-col" data-reveal>
          <div className="csd-block">
            <h2 className="csd-label">The Challenge</h2>
            <p className="csd-text">{study.challenge}</p>
          </div>
          <div className="csd-block">
            <h2 className="csd-label">Our Solution</h2>
            <p className="csd-text">{study.solution}</p>
          </div>
        </div>

        {/* Results */}
        <div className="csd-results" data-reveal>
          <h2 className="csd-label">Key Results</h2>
          <div className="csd-result-grid">
            {study.results.map((r) => (
              <div className="csd-result-item" key={r}>
                <span className="csd-check"><CheckIcon /></span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="csd-divider" />

        {/* Next case study */}
        <div className="csd-next" data-reveal>
          <span className="csd-next-label">Next Case Study</span>
          <Link to={`/case-studies/${nextStudy.slug}`} className="csd-next-link">
            <span className="csd-next-num">{nextStudy.num}</span>
            <span className="csd-next-title">{nextStudy.title}</span>
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* ══ CTA ══ */}
      <section className="csd-cta">
        <div className="csd-cta-inner" data-reveal>
          <h2 className="csd-cta-h2">Have a similar challenge?</h2>
          <p className="csd-cta-body">Let's talk about how we can deliver the same results for your team.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="csd-cta-btn">Get in Touch <ArrowRight /></Link>
            <Link to="/case-studies" className="csd-cta-btn csd-cta-btn--ghost">All Case Studies</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
