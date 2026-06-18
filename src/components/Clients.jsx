import { useEffect, useRef } from 'react';

const ROW1 = [
  { name: 'Build Ideas',      img: '/assets/clients/build-ideas.png' },
  { name: 'Cafe Rova',        img: '/assets/clients/cafe-rova.png' },
  { name: 'GLS',              img: '/assets/clients/gls.png' },
  { name: 'Kelvino',          img: '/assets/clients/kelvino.png' },
  { name: 'Rishabh Builders', img: '/assets/clients/rishabh-builders.png' },
  { name: 'Smart Choice',     img: '/assets/clients/smart-choice.png' },
];

const ROW2 = [
  { name: 'Starbird',     img: '/assets/clients/starbird.png' },
  { name: 'Staybird',     img: '/assets/clients/staybird.png' },
  { name: 'Tranqvillas',  img: '/assets/clients/tranqvillas.png' },
  { name: 'Blupijn',      img: '/assets/clients/blupijn.png' },
  { name: 'Blents',       img: '/assets/clients/blents.png' },
  { name: 'KJ Capital',   img: '/assets/clients/kj-capital.png' },
];

function MarqueeRow({ items, reverse }) {
  /* Triple the set so even ultra-wide screens never see a gap */
  const tripled = [...items, ...items, ...items];
  return (
    <div className={`cl-marquee${reverse ? ' cl-marquee--rev' : ''}`}>
      <div className="cl-track">
        {tripled.map((c, i) => (
          <div className="cl-tile" key={`${c.name}-${i}`}>
            <img src={c.img} alt={c.name} className="cl-tile-img" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in-view'); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section cl-section" id="clients" data-screen-label="Clients" ref={ref}>
      <div className="cl-head-wrap">
        <p className="eyebrow"><i></i>Our clients</p>
        <h2 className="sec-title">Some of our<br />valuable clients.</h2>
      </div>
      <div className="cl-rows">
        <MarqueeRow items={ROW1} />
        <MarqueeRow items={ROW2} reverse />
      </div>
    </section>
  );
}
