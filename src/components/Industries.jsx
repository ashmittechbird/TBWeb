import { INDUSTRIES, industryCardStyle } from '../data/industries';

export default function Industries() {
  return (
    <section className="section industries" id="industries" data-screen-label="Industries">
      <div className="ind-sticky">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow"><i></i>Industries we serve</p>
            <h2 className="sec-title">Built for every<br />sector.</h2>
          </div>
          <div className="ind-track-wrap" id="indTrack">
            <div className="ind-track">
              {INDUSTRIES.map((ind) => (
                <article
                  key={ind.num}
                  className="ind-card"
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
                    <p className="ind-name">{ind.name} <span className="ind-arr">→</span></p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="ind-scrollbar">
            <div className="ind-scrollbar-fill" id="indScrollFill"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
