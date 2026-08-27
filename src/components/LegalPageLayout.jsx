import { useEffect } from 'react';
import InnerNavbar from './InnerNavbar';
import Footer from './Footer';
import SEO from './SEO';
import '../styles/inner.css';

/**
 * Shared shell for the legal pages (privacy, terms, cookies, disclaimer).
 *
 * These pages were each carrying their own copy of the same ~40 lines of
 * inline style objects, which is why they had drifted apart visually. The
 * styling now lives in inner.css under `.lgl-*`, and a page is just its
 * content.
 *
 * `sections` is [{ heading, body }]. `body` is a node, so a section can hold
 * paragraphs, lists or a table - see CookiePolicyPage for the table case.
 * Numbering is derived from the array order rather than typed into each
 * heading, so inserting a section cannot leave the numbering wrong.
 */
export default function LegalPageLayout({
  title,
  updated,
  intro,
  sections = [],
  seoDescription,
  seoKeywords,
}) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="ip2-root">
      <SEO title={title} description={seoDescription} keywords={seoKeywords} />
      <InnerNavbar />

      <section className="ihero lgl-hero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Legal</p>
            <h1 className="ihero-h1">{title}</h1>
            <p className="ihero-sub">Last updated: {updated}</p>
          </div>
        </div>
      </section>

      <section className="lgl-body">
        <div className="lgl-inner">
          {intro && <div className="lgl-intro">{intro}</div>}

          {sections.map((s, i) => (
            <section className="lgl-section" key={s.heading}>
              <h2 className="lgl-h2">
                <span className="lgl-num">{i + 1}.</span> {s.heading}
              </h2>
              <div className="lgl-prose">{s.body}</div>
            </section>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
