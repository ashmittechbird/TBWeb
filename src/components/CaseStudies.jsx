import { Link } from 'react-router-dom';
import { CASES } from '../data/caseStudies';

export default function CaseStudies() {
  return (
    <section className="section cs-section" id="case-studies" data-screen-label="Case Studies">
      <div className="cs-wrap">
        <div className="cs-header">
          <div>
            <p className="eyebrow"><i></i>Case Studies</p>
            <h2 className="sec-title">Real results from<br />real engagements.</h2>
          </div>
          <Link to="/case-studies" className="cs-cta">
            View all case studies
          </Link>
        </div>

        <div className="cs-list">
          {CASES.map((c) => (
            <Link to={`/case-studies/${c.slug}`} className="cs-row reveal-up" key={c.num}>
              <span className="cs-row-num">{c.num}</span>
              <div className="cs-row-body">
                <h3 className="cs-row-title">{c.title}</h3>
                <span className="cs-row-meta">{c.client} - {c.industry}</span>
              </div>
              <span className="cs-row-arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
