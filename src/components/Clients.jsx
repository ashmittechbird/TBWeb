import { useEffect, useRef } from 'react';

const ROW1 = [
  { name: 'Build Ideas',      img: '/assets/clients/build-ideas.webp' },
  { name: 'Cafe Rova',        img: '/assets/clients/cafe-rova.webp' },
  { name: 'GLS',              img: '/assets/clients/gls.webp', url: 'https://www.glsadvisors.com/home' },
  { name: 'Kelvino',          img: '/assets/clients/kelvino.webp' },
  { name: 'Rishabh Builders', img: '/assets/clients/rishabh-builders.webp', url: 'https://www.rishabhbuilders.co.in/' },
  { name: 'Smart Choice',     img: '/assets/clients/smart-choice.webp', url: 'https://smartchoiceindia.com/' },
  { name: 'La Pinoz',         img: '/assets/clients/la-pinoz.png', url: 'https://lapinozpizza.in/' },
  { name: 'Pillar',           img: '/assets/clients/pillar.webp', url: 'https://www.pillar.co.nz/' },
];

const ROW2 = [
  { name: 'Starbird',      img: '/assets/clients/starbird.webp' },
  { name: 'Staybird',      img: '/assets/clients/staybird.webp', url: 'https://staybird.in/' },
  { name: 'Tranqvillas',   img: '/assets/clients/tranqvillas.webp' },
  { name: 'Blupijn',       img: '/assets/clients/blupijn.webp' },
  { name: 'Blents',        img: '/assets/clients/blents.webp' },
  { name: 'KJ Capital',    img: '/assets/clients/kj-capital.webp' },
  { name: 'Abhishek Soni', img: '/assets/clients/abhishek-soni.png', url: 'https://abhisheksoni.in/' },
];

function MarqueeRow({ items, reverse }) {
  /* Double the set for infinite scroll, reduced from 3x to cut DOM nodes */
  const tripled = [...items, ...items];
  return (
    <div className={`cl-marquee${reverse ? ' cl-marquee--rev' : ''}`}>
      <div className="cl-track">
        {tripled.map((c, i) => {
          const Tag = c.url ? 'a' : 'div';
          const linkProps = c.url ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <Tag className="cl-tile" key={`${c.name}-${i}`} {...linkProps}>
              <img src={c.img} alt={c.name} className="cl-tile-img" loading="lazy" />
            </Tag>
          );
        })}
      </div>
    </div>
  );
}

export default function Clients() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* `in-view` latches on first sight (it drives the entrance reveal), but
       `is-idle` toggles both ways so the two logo marquees stop animating
       while off screen instead of compositing for the whole page. */
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add('in-view');
        el.classList.toggle('is-idle', !e.isIntersecting);
      },
      { threshold: 0, rootMargin: '150px' }
    );
    io.observe(el);

    const onVis = () => el.classList.toggle('is-idle', document.hidden);
    document.addEventListener('visibilitychange', onVis);

    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
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
