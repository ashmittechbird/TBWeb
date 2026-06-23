import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import AboutHero from '../components/AboutHero';
import SEO from '../components/SEO';
import '../styles/inner.css';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

const STORY_STATS = [
  { val: '<em>6</em>',   label: 'Service Lines',        sub: 'ERP, AI, Web, Cloud, Animation, Marketing' },
  { val: '<em>4</em>',   label: 'Markets Served',       sub: 'India, United Kingdom, United States, UAE' },
  { val: '<em>5</em>+',  label: 'Proprietary Products', sub: 'Custom ERP, HRMS, DMS, Practice Management and more' },
];

const PILLARS = [
  { ghost: 'Problem', title: 'Problem first, solution second', text: "We don't walk in with a pre-built pitch. Every project starts with understanding what's actually broken, what it's costing you, and what success looks like in your context." },
  { ghost: 'Ship',    title: 'Ship fast, iterate honestly',    text: "We deliver working systems in weeks, not quarters. Then we iterate based on actual usage data and your team's feedback - not our assumptions." },
  { ghost: 'Direct',  title: 'Direct communication, always',   text: 'No intermediaries, no account managers relaying messages. You talk directly to the engineers and leads building your system. Every time.' },
  { ghost: 'Global',  title: 'Built for cross-border delivery', text: 'Our Pune team works IST with structured timezone overlap for UK and UAE clients. Systems are built to international compliance standards from day one.' },
  { ghost: 'Own',     title: 'Own what we build',              text: "We don't disappear after go-live. Our team provides ongoing support, system evolution and performance monitoring as your business grows." },
  { ghost: 'Free',    title: 'No lock-in, no hostage code',    text: 'We build on open-source stacks where possible. Your code is yours. Your data is yours. We earn retention through quality, not contractual traps.' },
];

const LEADERSHIP = [
  { name: 'Amol Sane',       role: 'Co-Founder & CEO', img: '/assets/team/amol-sane-cut.webp', li: 'https://www.linkedin.com/in/amol-sane-b8675316/' },
  { name: 'Ekansh Jain',     role: 'Co-Founder & CTO', img: '/assets/team/ekansh-jain-cut.webp', li: 'https://www.linkedin.com/in/jainekansh1512/' },
  { name: 'Shubham Agarwal', role: 'CFO',              img: '/assets/team/shubham-cut.webp', li: 'https://www.linkedin.com/in/shubham-a-54aa78271/' },
  { name: 'Amit Thakur',     role: 'Partner & CBO',    img: '/assets/team/amit-cut.webp', li: 'https://www.linkedin.com/in/amitthakurtechbirdit/' },
];

const TEAM = [
  { name: 'Abhishek Chougule', role: 'Software Developer',      img: '/assets/team/Abhishek-Chougule.webp', li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Aditi Patade',      role: 'Software Developer',      img: '/assets/team/Aditi-Patade.webp',      li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Amol Aaghade',      role: 'Software Developer',       img: '/assets/team/Amol-Aaghade.webp',      li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Ankit Patil',       role: 'Software Developer',      img: '/assets/team/Ankit-Patil.webp',       li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Ashmit Singh',      role: 'Software Developer',      img: '/assets/team/Ashmit-singh.webp',      li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Mehul Rathi',       role: 'Software Developer',      img: '/assets/team/Mehul-Rathi.webp',       li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Namrata',           role: 'HR',                      img: '/assets/team/Namrata.webp',           li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Paridhi Jhabak',    role: 'Software Developer',      img: '/assets/team/Paridhi-Jhabak.webp',    li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Purvesh Jain',      role: 'Software Developer',      img: '/assets/team/Purvesh-Jain.webp',      li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Sanjukta Barik',    role: 'Software Developer',      img: '/assets/team/Sanjukta-Barik.webp',    li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Shrikant Maharana', role: 'Software Developer',      img: '/assets/team/Shrikant-Maharana.webp', li: 'https://www.linkedin.com/company/techbird-it-services/' },
  { name: 'Snehal Sukhadeve',  role: 'Software Developer',      img: '/assets/team/Snehal-Sukhadeve.webp',  li: 'https://www.linkedin.com/company/techbird-it-services/' },
];

const FAQS = [
  { q: 'Where is TechBird based?', a: 'TechBird IT Services is headquartered in Pune, India. All engineering, design and delivery runs from our Pune office. We serve clients across India, the United Kingdom, the United States and the UAE with structured timezone overlap for international engagements.' },
  { q: 'How large is your team?', a: "We are a focused team of engineers, designers and project leads. We deliberately stay lean so every team member is directly involved in delivery. No bench resources, no offshore subcontracting - the people you meet are the people who build your system." },
  { q: 'Do you work with clients outside India?', a: 'Yes. A significant portion of our work is for clients in the UK and UAE. We structure our working hours to provide morning overlap with UK business hours and evening overlap with UAE business hours. All systems are built to GDPR and international compliance standards from the start.' },
  { q: 'What industries do you specialise in?', a: "We've shipped production systems across manufacturing, retail and e-commerce, legal and finance, BPO and call centres, and IT and technology companies. Our deepest experience is in manufacturing ERP and legal AI, but our architecture and cloud teams work across all sectors." },
  { q: 'How do you handle project communication?', a: 'Every project has a named lead who is your single point of contact. We communicate via Slack, Microsoft Teams or email - whichever your team prefers. No intermediaries, no account managers relaying messages. You get direct access to the people building your system.' },
];

export default function AboutPage() {
  const root = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTeam, setActiveTeam] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleFanEnter = useCallback((i) => setActiveTeam(i), []);
  const handleFanLeave = useCallback(() => setActiveTeam(null), []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';
      gsap.from('.ab-story-head > *', {
        scrollTrigger: { trigger: '.ab-story-head', start: 'top 80%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease,
      });
      gsap.from('.ab-story-text > *', {
        scrollTrigger: { trigger: '.ab-story-text', start: 'top 80%', once: true },
        opacity: 0, y: 26, stagger: 0.12, duration: 0.7, ease,
      });
      gsap.from('.ab-story-card', {
        scrollTrigger: { trigger: '.ab-story-cards', start: 'top 80%', once: true },
        opacity: 0, y: 36, stagger: 0.1, duration: 0.7, ease,
      });
      gsap.from('.ab-pillars-head > *', {
        scrollTrigger: { trigger: '.ab-pillars-head', start: 'top 80%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease,
      });
      gsap.from('.ab-pillar', {
        scrollTrigger: { trigger: '.ab-pillars-grid', start: 'top 78%', once: true },
        opacity: 0, y: 48, stagger: 0.1, duration: 0.8, ease,
      });
      gsap.from('.ab-leadership .ab-team-head > *', {
        scrollTrigger: { trigger: '.ab-leadership', start: 'top 78%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease,
      });
      gsap.from('.ab-lead-card', {
        scrollTrigger: { trigger: '.ab-lead-grid', start: 'top 82%', once: true },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.75, ease,
      });
      gsap.from('.ab-team .ab-team-head > *', {
        scrollTrigger: { trigger: '.ab-team .ab-team-head', start: 'top 82%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease,
      });
      gsap.fromTo('.ab-fan-strip',
        { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.ab-fan-strip', start: 'top 88%', once: true } });
      gsap.from('.ab-trust-item', {
        scrollTrigger: { trigger: '.ab-trust', start: 'top 84%', once: true },
        opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease,
      });
      gsap.from('.ab-faq-head > *', {
        scrollTrigger: { trigger: '.ab-faq-head', start: 'top 80%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease,
      });
      gsap.from('.ab-closing > *', {
        scrollTrigger: { trigger: '.ab-closing', start: 'top 80%', once: true },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="ab-root" ref={root}>
      <SEO
        title="About Us"
        description="Learn about TechBird IT Services - a premier technology partner in Pune, India. Our expert team delivers custom software, AI, cloud, and digital transformation solutions for enterprises worldwide."
        keywords="about TechBird, IT services company, technology partner, Pune, India, software company, digital transformation, enterprise solutions"
        faqItems={FAQS}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About TechBird IT Services',
          description: 'Learn about TechBird IT Services - a premier technology partner in Pune, India. Our expert team delivers custom software, AI, cloud, and digital transformation solutions for enterprises worldwide.',
          url: 'https://www.techbird.in/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'TechBird IT Services',
            url: 'https://www.techbird.in',
            foundingDate: '2020',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Pune',
              addressRegion: 'Maharashtra',
              addressCountry: 'IN',
            },
            numberOfEmployees: { '@type': 'QuantitativeValue', value: 20 },
            areaServed: ['India', 'United Kingdom', 'United States', 'UAE'],
          },
        }}
      />
      <InnerNavbar />
      <AboutHero />

      {/* ════ OUR STORY ════ */}
      <section className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-story-grid">
            <div className="ab-story-left">
              <div className="ab-story-head">
                <span className="ab-eyebrow">Our story</span>
                <h2>Built in Pune.<br />Delivered worldwide.</h2>
              </div>
              <div className="ab-story-text">
                <p>TechBird IT Services started with a simple observation: businesses across India, the UK and the UAE were paying for enterprise software that never worked the way they needed. Off-the-shelf tools didn't fit. Custom builds got abandoned. The gap between what was promised and what was delivered kept growing.</p>
                <p>We set out to close that gap. Today, TechBird builds ERPNext systems, agentic AI tools, custom web applications, cloud infrastructure and proprietary software products for enterprises. We also produce 2D and 3D animation, VFX and AR/VR experiences, and run digital marketing and MarTech programmes. Every engagement starts with understanding the actual problem - not selling a solution we've already decided on.</p>
              </div>
            </div>
            <div className="ab-story-cards">
              {STORY_STATS.map((s) => (
                <div className="ab-story-card" key={s.label}>
                  <div className="ab-story-card-val" dangerouslySetInnerHTML={{ __html: s.val }} />
                  <div className="ab-story-card-label">{s.label}</div>
                  <p className="ab-story-card-sub">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ HOW WE WORK ════ */}
      <section className="ab-pillars">
        <div className="ab-pillars-head">
          <span className="ab-eyebrow">How we work</span>
          <h2>Our approach</h2>
        </div>
        <div className="ab-pillars-grid ab-pillars-grid--6">
          {PILLARS.map((p, i) => (
            <article className="ab-pillar" key={p.ghost}>
              <span className="ab-pillar-num">0{i + 1}</span>
              <span className="ab-pillar-ghost">{p.ghost}</span>
              <div className="ab-pillar-body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════ LEADERSHIP ════ */}
      <section className="ab-leadership">
        <div className="ab-team-inner">
          <div className="ab-lead-head ab-team-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="ab-eyebrow" style={{ justifyContent: 'center' }}>Our Leadership</span>
            <h2>The people steering TechBird</h2>
            <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>Propelling TechBird forward with decades of combined expertise in technology and business strategy.</p>
          </div>
          <div className="ab-lead-grid">
            {LEADERSHIP.map((m) => (
              <div className="ab-lead-card" key={m.name}>
                <div className="ab-lead-pebble" />
                <img className="ab-lead-img" src={m.img} alt={m.name} loading="lazy" />
                <div className="ab-lead-info">
                  <div className="ab-lead-meta">
                    <h3>{m.name}</h3>
                    <span>{m.role}</span>
                  </div>
                  <a
                    className="ab-lead-li"
                    href={m.li || 'https://www.linkedin.com/company/techbird-it-services/'}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.001-4.13 2.06 2.06 0 01-.001 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TEAM ════ */}
      <section className="ab-team">
        {/* heading - stays inside max-width container */}
        <div className="ab-team-inner">
          <div className="ab-team-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="ab-eyebrow" style={{ justifyContent: 'center' }}>Meet Our Team</span>
            <h2>Talented people, dedicated to delivering excellence</h2>
            <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>The engineers, designers and strategists who build and ship your systems.</p>
          </div>
        </div>

        {/* fan strip - desktop: hover expand, mobile: scrollable cards */}
        <div className="ab-fan-strip" onMouseLeave={handleFanLeave}>
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`ab-fan-card${activeTeam === i ? ' is-active' : ''}`}
              onMouseEnter={() => handleFanEnter(i)}
              onClick={() => setActiveTeam(activeTeam === i ? null : i)}
            >
              <img src={m.img} alt={m.name} loading="lazy" draggable="false" />
              <div className="ab-fan-label">
                <div className="ab-fan-info">
                  <span className="ab-fan-name">{m.name}</span>
                  <span className="ab-fan-role">{m.role}</span>
                </div>
                <a
                  className="ab-fan-li"
                  href={m.li}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.001-4.13 2.06 2.06 0 01-.001 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ════ FAQ ════ */}
      <section className="ab-faq">
        <div className="ab-faq-inner">
          <div className="ab-faq-head">
            <span className="ab-eyebrow">FAQ</span>
            <h2>About TechBird</h2>
          </div>
          <div className="ab-faq-list">
            {FAQS.map((f, i) => (
              <div className="ab-faq-item" key={i}>
                <button
                  type="button"
                  className="ab-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <svg className={`ab-faq-icon${openFaq === i ? ' open' : ''}`} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                </button>
                {openFaq === i && (
                  <div className="ab-faq-body"><p>{f.a}</p></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CLOSING ════ */}
      <section className="ab-closing">
        <h2>Most projects start with a 30-minute call.</h2>
        <p>Tell us what you're trying to build - or what's currently broken. We come to the first conversation prepared. No 47-page deck. No NDAs on call one. Just a direct conversation.</p>
        <div className="ab-closing-actions">
          <Link to="/contact" className="btn-pill">
            <span>Book 30 Minutes</span><i className="arrow"></i>
          </Link>
          <a href="mailto:connect@techbirdit.in" className="btn-pill ghost">
            <span>connect@techbirdit.in</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
