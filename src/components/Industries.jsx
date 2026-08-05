const INDUSTRIES = [
  { num: '01', tag: 'E-LEARNING &\nSTUDENT MANAGEMENT', name: 'Education', g1: '#18181e', g2: '#5a5a6a', gx: '72% 28%' },
  { num: '02', tag: 'PATIENT MANAGEMENT\n& HEALTH ANALYTICS', name: 'Healthcare', g1: '#18181e', g2: '#5a5a6a', gx: '60% 38%' },
  { num: '03', tag: 'WORKFORCE AUTOMATION\n& CALL ANALYTICS', name: 'BPO & Call Centers', g1: '#18181e', g2: '#5a5a6a', gx: '65% 35%' },
  { num: '04', tag: 'GUEST EXPERIENCE\n& PROPERTY MANAGEMENT', name: 'Hospitality', g1: '#18181e', g2: '#5a5a6a', gx: '68% 32%' },
  { num: '05', tag: 'COMPLIANCE AUTOMATION\n& FINTECH SOLUTIONS', name: 'Legal & Financial', g1: '#18181e', g2: '#5a5a6a', gx: '55% 42%' },
  { num: '06', tag: 'OMNICHANNEL PLATFORM\n& CUSTOMER ANALYTICS', name: 'Retail & E-commerce', g1: '#18181e', g2: '#5a5a6a', gx: '62% 30%' },
  { num: '07', tag: 'SMART FACTORY\n& IoT INTEGRATION', name: 'Manufacturing', g1: '#18181e', g2: '#5a5a6a', gx: '70% 25%' },
  { num: '08', tag: 'DEVOPS AUTOMATION\n& PRODUCT ENGINEERING', name: 'IT & Technology', g1: '#18181e', g2: '#5a5a6a', gx: '66% 34%' },
];

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
                  style={{ '--g1': ind.g1, '--g2': ind.g2, '--gx': ind.gx }}
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
