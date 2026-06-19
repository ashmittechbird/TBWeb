import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/inner.css';
import '../styles/contact-page.css';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  { q: 'How quickly can we start a project?', a: 'Most projects kick off within 1–2 weeks of the initial conversation. We use the first call to understand your needs, then follow up with a scoping document within 3 business days.' },
  { q: 'What is your typical engagement model?', a: 'We offer both fixed-scope and time-and-material engagements. For well-defined projects, fixed scope works best. For evolving requirements, T&M with monthly milestones gives you flexibility without surprises.' },
  { q: 'Do you sign NDAs before the first call?', a: 'We are happy to sign NDAs when needed. For an initial discovery call, most clients prefer to keep it informal. We can execute an NDA before any detailed technical discussion or code sharing.' },
  { q: 'What time zones do you support?', a: 'Our team is based in Pune (IST). We provide structured overlap with UK (9am–1pm IST), UAE (12pm–5pm IST) and US East Coast (6:30pm–10:30pm IST) business hours.' },
  { q: 'What happens after go-live?', a: 'We provide post-launch support, monitoring and iterative improvements. Every project includes a 30-day stabilisation period. Long-term maintenance retainers are available for ongoing support.' },
];

export default function ContactPage() {
  const root = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';
      gsap.from('.cp-info-item', {
        scrollTrigger: { trigger: '.cp-info-strip', start: 'top 85%', once: true },
        opacity: 0, y: 24, stagger: 0.08, duration: 0.6, ease,
      });
      gsap.from('.cp-form-card', {
        scrollTrigger: { trigger: '.cp-form-section', start: 'top 82%', once: true },
        opacity: 0, y: 36, duration: 0.7, ease,
      });
      gsap.from('.cp-side', {
        scrollTrigger: { trigger: '.cp-form-section', start: 'top 82%', once: true },
        opacity: 0, y: 36, duration: 0.7, ease, delay: 0.12,
      });
      gsap.from('.cp-faq-head > *', {
        scrollTrigger: { trigger: '.cp-faq', start: 'top 82%', once: true },
        opacity: 0, y: 28, stagger: 0.08, duration: 0.6, ease,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, company, service, message } = formState;
    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nService: ${service}\n\nMessage:\n${message}`);
    window.location.href = `mailto:connect@techbirdit.in?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="cp-root" ref={root}>
      <SEO
        title="Contact Us"
        description="Get in touch with TechBird IT Services. Custom software development, AI solutions, ERP implementation, cloud services. Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014."
        keywords="contact TechBird, IT services Pune, software development inquiry, ERP consultation, AI solutions contact"
        faqItems={FAQS}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact TechBird IT Services',
          url: 'https://www.techbird.in/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'TechBird IT Services',
            url: 'https://www.techbird.in',
            telephone: '+919766661836',
            email: 'connect@techbirdit.in',
            address: { '@type': 'PostalAddress', streetAddress: 'Unit 312-314, SOHO by Panchsheel', addressLocality: 'Kharadi, Pune', postalCode: '411014', addressRegion: 'Maharashtra', addressCountry: 'IN' },
          },
        }}
      />
      <InnerNavbar />

      {/* ════ HERO (same pattern as services page) ════ */}
      <section className="ihero">
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Get in touch</p>
            <h1 className="ihero-h1">Let's start a<br /><span>conversation.</span></h1>
            <p className="ihero-sub">Have a project in mind? Whether you need a full product build, AI integration, ERP implementation or a quick consultation, we're here to help.</p>
          </div>
          <div className="ihero-img-side">
            <img src="/assets/services-hero-bg.webp" alt="TechBird office" className="ihero-img" loading="eager" />
          </div>
        </div>
      </section>

      {/* ════ INFO STRIP ════ */}
      <section className="cp-info-strip">
        <div className="cp-inner">
          <div className="cp-info-grid">
            <a className="cp-info-item" href="tel:+919766661836">
              <div className="cp-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div className="cp-info-text">
                <span className="cp-info-label">Call Us</span>
                <strong>+91 97666 61836</strong>
              </div>
            </a>
            <a className="cp-info-item" href="mailto:connect@techbirdit.in">
              <div className="cp-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div className="cp-info-text">
                <span className="cp-info-label">Email Us</span>
                <strong>connect@techbirdit.in</strong>
              </div>
            </a>
            <div className="cp-info-item">
              <div className="cp-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="cp-info-text">
                <span className="cp-info-label">Visit Us</span>
                <strong>Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014</strong>
              </div>
            </div>
            <div className="cp-info-item">
              <div className="cp-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="cp-info-text">
                <span className="cp-info-label">Working Hours</span>
                <strong>Mon – Fri, 9 AM – 7 PM IST</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ FORM + SIDE ════ */}
      <section className="cp-form-section">
        <div className="cp-inner">
          <div className="cp-form-layout">

            {/* Left: Form */}
            <div className="cp-form-card">
              <h2>Send us a message</h2>
              <p className="cp-form-sub">Fill out the form below. We typically respond within 24 hours.</p>

              {submitted ? (
                <div className="cp-success">
                  <div className="cp-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3>Message prepared!</h3>
                  <p>Your email client should have opened. If not, email us at <a href="mailto:connect@techbirdit.in">connect@techbirdit.in</a></p>
                  <button type="button" className="cp-again-btn" onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', phone: '', company: '', service: '', message: '' }); }}>Send another</button>
                </div>
              ) : (
                <form className="cp-form" onSubmit={handleSubmit}>
                  <div className="cp-row">
                    <div className="cp-field">
                      <label htmlFor="cp-name">Full Name *</label>
                      <input id="cp-name" name="name" type="text" required maxLength={100} autoComplete="name" value={formState.name} onChange={handleChange} placeholder="John Doe" />
                    </div>
                    <div className="cp-field">
                      <label htmlFor="cp-email">Work Email *</label>
                      <input id="cp-email" name="email" type="email" required autoComplete="email" value={formState.email} onChange={handleChange} placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="cp-row">
                    <div className="cp-field">
                      <label htmlFor="cp-phone">Phone</label>
                      <input id="cp-phone" name="phone" type="tel" pattern="[+]?[0-9\s]{7,15}" minLength={7} maxLength={15} autoComplete="tel" value={formState.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                    </div>
                    <div className="cp-field">
                      <label htmlFor="cp-company">Company</label>
                      <input id="cp-company" name="company" type="text" maxLength={100} autoComplete="organization" value={formState.company} onChange={handleChange} placeholder="Your company" />
                    </div>
                  </div>
                  <div className="cp-field">
                    <label htmlFor="cp-service">Service Interested In</label>
                    <select id="cp-service" name="service" value={formState.service} onChange={handleChange}>
                      <option value="">Select a service</option>
                      <option>Software Development</option>
                      <option>AI Solutions</option>
                      <option>Cloud &amp; DevOps</option>
                      <option>ERP Implementation</option>
                      <option>2D &amp; 3D Animation</option>
                      <option>MarTech</option>
                      <option>Marketing Strategy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="cp-field">
                    <label htmlFor="cp-msg">Tell us about your project *</label>
                    <textarea id="cp-msg" name="message" required rows="5" minLength={10} maxLength={2000} value={formState.message} onChange={handleChange} placeholder="What are you building? What's the timeline?" />
                  </div>
                  <button type="submit" className="cp-submit-btn">
                    <span>Send Message</span>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M12 4l6 6-6 6"/></svg>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Side info */}
            <div className="cp-side">
              {/* Map */}
              <div className="cp-map-card">
                <iframe
                  title="TechBird Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.531!2d73.9402!3d18.5578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3c3c3c3c3c3%3A0x0!2sSOHO%20by%20Panchsheel%2C%20Kharadi!5e0!3m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick connect */}
              <div className="cp-connect-card">
                <h3>Prefer a quick chat?</h3>
                <p>Book a 30-minute discovery call. No commitment, no sales pitch, just a direct conversation about your project.</p>
                <a href="tel:+919766661836" className="cp-call-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <span>Call +91 97666 61836</span>
                </a>
              </div>

              {/* Social */}
              <div className="cp-social-card">
                <h3>Follow us</h3>
                <div className="cp-social-links">
                  <a href="https://www.linkedin.com/company/techbird-it-services/" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.001-4.13 2.06 2.06 0 01-.001 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z"/></svg>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://www.instagram.com/techbirdit/" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none"/></svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="cp-faq">
        <div className="cp-inner">
          <div className="cp-faq-head">
            <span className="cp-label">FAQ</span>
            <h2>Common questions</h2>
          </div>
          <div className="cp-faq-list">
            {FAQS.map((f, i) => (
              <div className={`cp-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button type="button" className="cp-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span>
                  <svg className="cp-faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="cp-faq-body"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
