import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const SLIDES = [
  {
    img: '/assets/team-visual.jpg',
    alt: 'TechBird team at work',
    eyebrow: 'Case Study',
    heading: 'Transforming a legacy ERP into a real-time intelligence platform',
    desc: 'A leading manufacturing firm was spending 40% of its operations budget on manual reconciliation. We rebuilt their core with Frappe ERPNext and reduced overhead by 62%.',
  },
  {
    img: '/assets/ai-core.png',
    alt: 'AI Integration',
    eyebrow: 'AI Integration',
    heading: 'Custom NLP pipeline cuts document processing time by 80%',
    desc: 'For a UAE-based legal firm, we built a custom NLP pipeline that classifies, extracts, and routes case documents automatically — eliminating weeks of manual work.',
  },
  {
    img: '/assets/team-visual.jpg',
    alt: 'Cloud migration',
    eyebrow: 'Cloud & DevOps',
    heading: 'Zero-downtime migration for a 150k-daily-user platform',
    desc: 'We orchestrated a full infrastructure overhaul for a high-traffic retail platform — migrating to cloud-native microservices with zero disruption to live operations.',
  },
];

const FULL = 'inset(0 0% 0 0%)';

export default function Insights() {
  const [cur, setCur]       = useState(0);
  const [playing, setPlaying] = useState(true);
  const busyRef   = useRef(false);
  const timerRef  = useRef(null);
  const slideRefs = useRef([]);
  const total     = SLIDES.length;

  const go = (to, dir) => {
    if (busyRef.current || to === cur) return;
    busyRef.current = true;

    const out = slideRefs.current[cur];
    const ins = slideRefs.current[to];
    if (!out || !ins) { busyRef.current = false; return; }

    const clipInStart = dir >= 0 ? 'inset(0 100% 0 0%)' : 'inset(0 0% 0 100%)';
    const clipOutEnd  = dir >= 0 ? 'inset(0 0% 0 100%)' : 'inset(0 100% 0 0%)';

    gsap.to(out.querySelector('.is-img'),     { clipPath: clipOutEnd, duration: 0.6, ease: 'power2.inOut' });
    gsap.to(out.querySelector('.is-content'), {
      opacity: 0, y: -18, duration: 0.45, ease: 'power2.in',
      onComplete: () => {
        out.classList.remove('is-active');
        gsap.set(out.querySelector('.is-img'),     { clipPath: FULL });
        gsap.set(out.querySelector('.is-content'), { opacity: 1, y: 0 });
      }
    });

    ins.classList.add('is-active');
    gsap.set(ins.querySelector('.is-img'),     { clipPath: clipInStart });
    gsap.set(ins.querySelector('.is-content'), { opacity: 0, y: 28 });
    gsap.to(ins.querySelector('.is-img'),     { clipPath: FULL, duration: 0.9, delay: 0.12, ease: 'power3.out' });
    gsap.to(ins.querySelector('.is-content'), {
      opacity: 1, y: 0, duration: 0.75, delay: 0.38, ease: 'power3.out',
      onComplete: () => { busyRef.current = false; }
    });

    setCur(to);
  };

  const next = () => go((cur + 1) % total,  1);
  const prev = () => go((cur - 1 + total) % total, -1);

  const startAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };
  const stopAuto = () => clearInterval(timerRef.current);

  useEffect(() => {
    const s0 = slideRefs.current[0];
    if (s0) {
      gsap.set(s0.querySelector('.is-img'),     { clipPath: FULL });
      gsap.set(s0.querySelector('.is-content'), { opacity: 1, y: 0 });
    }
    startAuto();
    return () => stopAuto();
  }, []);

  const handleNext = () => { next(); if (playing) startAuto(); };
  const handlePrev = () => { prev(); if (playing) startAuto(); };
  const handlePause = () => {
    if (playing) { stopAuto(); setPlaying(false); }
    else         { startAuto(); setPlaying(true); }
  };

  return (
    <section className="section insights" id="insights" data-screen-label="Insights">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow"><i></i>Latest Insights</p>
          <h2 className="sec-title">Stories from<br />our work.</h2>
        </div>
      </div>

      <div className="insights-stage" id="insightsStage">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`insight-slide${i === 0 ? ' is-active' : ''}`}
            data-idx={i}
            ref={el => slideRefs.current[i] = el}
          >
            <div className="is-img">
              <img src={slide.img} alt={slide.alt} />
            </div>
            <div className="is-content">
              <p className="eyebrow is-eyebrow"><i></i>{slide.eyebrow}</p>
              <h3 className="is-heading">{slide.heading}</h3>
              <p className="is-desc">{slide.desc}</p>
              <a href="#contact" className="btn-pill is-cta"><span>Read more</span><i className="arrow"></i></a>
            </div>
          </div>
        ))}
      </div>

      <div className="insights-controls" id="insightsControls">
        <button
          className={`is-pause-btn${!playing ? ' is-paused' : ''}`}
          id="isPauseBtn"
          aria-label="Toggle autoplay"
          onClick={handlePause}
        >
          <span className="is-bar"></span><span className="is-bar"></span>
        </button>
        <div className="is-nav">
          <button className="is-arr is-prev" id="isPrev" aria-label="Previous slide" onClick={handlePrev}>
            <i className="is-chevron is-chevron-l"></i>
          </button>
          <span className="is-counter" id="isCounter">{cur + 1} / {total}</span>
          <button className="is-arr is-next" id="isNext" aria-label="Next slide" onClick={handleNext}>
            <i className="is-chevron is-chevron-r"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
