import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { INDUSTRIES, industryCardStyle } from '../data/industries';
import '../styles/inner.css';

gsap.registerPlugin(ScrollTrigger);

/* The cards reuse the homepage's .ind-card treatment (styles.css is loaded
   globally from main.jsx) with an --grid modifier that swaps the horizontal
   track's fixed sizing for grid cells. Same data, same visual language -
   see src/data/industries.js. */

export default function IndustriesPage() {
  const ref = useRef(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.ip2-overlay', { opacity: 0, duration: 0.5 }, 0).set('.ip2-overlay', { display: 'none' }, 0.55);
      tl.from('.ihero-ey', { y: 18, opacity: 0, duration: 0.45 }, 0.2);
      tl.from('.ihero-h1', { y: 55, opacity: 0, duration: 0.85 }, 0.28);
      tl.from('.ihero-sub', { y: 25, opacity: 0, duration: 0.55 }, 0.5);

      gsap.from('.ipg-head > *', {
        scrollTrigger: { trigger: '.ipg-section', start: 'top 84%', once: true },
        y: 28, opacity: 0, stagger: 0.08, duration: 0.6,
      });
      gsap.from('.ipg-grid .ind-card', {
        scrollTrigger: { trigger: '.ipg-grid', start: 'top 86%', once: true },
        y: 30, opacity: 0, stagger: 0.06, duration: 0.55,
      });
      gsap.from('.icta-inner', {
        scrollTrigger: { trigger: '.icta', start: 'top 82%', once: true },
        y: 40, opacity: 0, duration: 0.75,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="ind-page">
      <SEO
        title="Industries We Serve - IT Solutions by TechBird"
        description="TechBird delivers IT solutions across education, BPO, hospitality, legal and financial services, retail and e-commerce, manufacturing and technology - industry-specific ERP, AI and cloud."
        keywords="education technology, BPO automation, hospitality software, legal tech, fintech, retail e-commerce, manufacturing ERP, DevOps, Pune India"
        faqItems={[
          { q: 'What industries does TechBird serve?', a: 'Education, BPO & Call Centers, Hospitality, Legal & Financial, Retail & E-commerce, Manufacturing, and IT & Technology.' },
          { q: 'Does TechBird build industry-specific software?', a: 'Yes. Each industry gets solutions built around its own workflows, compliance requirements and growth patterns rather than a generic template.' },
          { q: 'Where is TechBird located?', a: 'Pune, India, serving clients in India, UK, US and UAE.' },
        ]}
        serviceSchema={{ name: 'Industry-Specific IT Solutions', description: 'ERP, AI and cloud solutions across education, BPO, hospitality, legal, retail, manufacturing and technology.', category: 'Technology Consulting' }}
      />
      <div className="ip2-overlay" />
      <InnerNavbar />

      {/* HERO */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Where we work</p>
            <h1 className="ihero-h1">Industries we know<br /><span>deeply.</span></h1>
            <p className="ihero-sub">We've shipped production systems in these sectors, not just proposals. Each industry gets solutions built around its specific workflows, compliance needs and growth patterns.</p>
          </div>
          <div className="ihero-img-side">
            <img src="/assets/industries-hero.webp" alt="Technology workspace" className="ihero-img" loading="eager" />
          </div>
        </div>
      </section>

      {/* INDUSTRY CARDS */}
      <section className="ipg-section">
        <div className="ipg-inner">
          <div className="ipg-head">
            <span className="ipg-eyebrow">Sectors</span>
            <h2 className="ipg-h2">Built for every sector.</h2>
            {/* Count comes from the data so it cannot drift when the list changes. */}
            <p className="ipg-sub">{INDUSTRIES.length} industries where we already run production systems. Each one gets the same engineering, shaped to how that sector actually works.</p>
          </div>

          <div className="ipg-grid">
            {INDUSTRIES.map((ind) => (
              <article
                key={ind.num}
                className="ind-card ind-card--grid"
                style={industryCardStyle(ind)}
              >
                <span className="ind-noise"></span>
                <p className="ind-tag">
                  {ind.tag.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </p>
                <div className="ind-foot">
                  <span className="ind-num">{ind.num}</span>
                  <p className="ind-name">{ind.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="icta">
        <div className="icta-inner">
          <p className="icta-ey">Don't see your industry?</p>
          <h2 className="icta-h">We adapt fast.</h2>
          <p className="icta-p">Our ERP, AI and cloud capabilities transfer across sectors. If your industry isn't listed, let's talk. We've likely already solved a similar problem.</p>
          <Link to="/contact" className="icta-btn">Start a Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
