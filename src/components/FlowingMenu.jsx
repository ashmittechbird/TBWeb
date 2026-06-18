import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const PRODUCTS = [
  { link: '/products/erp',                    text: 'Custom ERP',           image: '/assets/products/erp.jpg' },
  { link: '/products/hrms',                   text: 'HRMS',                 image: '/assets/products/hrms.jpg' },
  { link: '/products/crm',                    text: 'Lead & Sales CRM',     image: '/assets/products/crm.jpg' },
  { link: '/products/practice-management',    text: 'Practice Management',  image: '/assets/products/practice.jpg' },
  { link: '/products/ecommerce',              text: 'E-commerce Platform',  image: '/assets/products/ecommerce.jpg' },
  { link: '/products/document-management',    text: 'Document Management',  image: '/assets/products/dms.jpg' },
  { link: '/products/litigation-management',  text: 'Litigation Management',image: '/assets/products/litigation.jpg' },
  { link: '/products/visitor-management',     text: 'Visitor Management',   image: '/assets/products/visitor.jpg' },
];

function dist(x, y, x2, y2) { return (x - x2) ** 2 + (y - y2) ** 2; }
function closestEdge(mx, my, w, h) {
  return dist(mx, my, w / 2, 0) < dist(mx, my, w / 2, h) ? 'top' : 'bottom';
}

function MenuItem({ link, text, image, speed = 13 }) {
  const itemRef         = useRef(null);
  const marqueeRef      = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animRef         = useRef(null);
  const [reps, setReps] = useState(5);

  useEffect(() => {
    const calc = () => {
      const part = marqueeInnerRef.current?.querySelector('.fm-part');
      if (!part) return;
      setReps(Math.max(5, Math.ceil(window.innerWidth / part.offsetWidth) + 2));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [text, image]);

  useEffect(() => {
    const setup = () => {
      const part = marqueeInnerRef.current?.querySelector('.fm-part');
      if (!part || part.offsetWidth === 0) return;
      if (animRef.current) animRef.current.kill();
      animRef.current = gsap.to(marqueeInnerRef.current, {
        x: -part.offsetWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    };
    const t = setTimeout(setup, 60);
    return () => { clearTimeout(t); if (animRef.current) animRef.current.kill(); };
  }, [text, image, reps, speed]);

  const defaults = { duration: 0.55, ease: 'expo.out' };

  const onEnter = (e) => {
    const r = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    gsap.timeline({ defaults })
      .set(marqueeRef.current,       { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current,  { y: edge === 'top' ?  '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const onLeave = (e) => {
    const r = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    gsap.timeline({ defaults })
      .to(marqueeRef.current,      { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ?  '101%' : '-101%' }, 0);
  };

  return (
    <div className="fm-item" ref={itemRef}>
      <Link className="fm-link" to={link} onMouseEnter={onEnter} onMouseLeave={onLeave} onTouchStart={onEnter} onTouchEnd={onLeave}>
        {text}
      </Link>
      <div className="fm-marquee" ref={marqueeRef}>
        <div className="fm-marquee-wrap">
          <div className="fm-marquee-inner" ref={marqueeInnerRef} aria-hidden="true">
            {Array.from({ length: reps }).map((_, i) => (
              <div className="fm-part" key={i}>
                <span>{text}</span>
                <div className="fm-img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlowingMenu({ speed = 13 }) {
  return (
    <div className="fm-wrap">
      <nav className="fm-menu">
        {PRODUCTS.map((item, idx) => (
          <MenuItem key={idx} {...item} speed={speed} />
        ))}
      </nav>
    </div>
  );
}
