import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/inner.css';

export default function PrivacyPage() {
  return (
    <div className="ip2-root">
      <SEO
        title="Privacy Policy"
        description="TechBird IT Services privacy policy. Learn how we collect, use, and protect your personal data."
        keywords="privacy policy, data protection, TechBird"
      />
      <InnerNavbar />

      <section className="ihero" style={{ minHeight: '40vh' }}>
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Legal</p>
            <h1 className="ihero-h1">Privacy Policy</h1>
            <p className="ihero-sub">Last updated: June 2026</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ip-bg)', padding: 'var(--ip-px)', color: 'var(--ip-white)' }}>
        <div style={{ maxWidth: 'var(--ip-mw)', margin: '0 auto', lineHeight: 1.7, fontFamily: 'var(--body, "Manrope", sans-serif)' }}>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Data Controller</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            TechBird IT Services<br />
            Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014, Maharashtra, India<br />
            Email: <a href="mailto:connect@techbirdit.in" style={{ color: 'var(--ip-white)' }}>connect@techbirdit.in</a><br />
            Phone: <a href="tel:+919766661836" style={{ color: 'var(--ip-white)' }}>+91 97666 61836</a>
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Information We Collect</h2>
          <p style={{ color: 'var(--ip-dim)' }}>When you use our website or contact us, we may collect:</p>
          <ul style={{ color: 'var(--ip-dim)', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Name, email address, phone number, and company name (submitted via the contact form)</li>
            <li>Technical data such as IP address, browser type, and device information (collected automatically)</li>
            <li>Usage data including pages visited and time spent on site</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
          <p style={{ color: 'var(--ip-dim)' }}>We use the information we collect to:</p>
          <ul style={{ color: 'var(--ip-dim)', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Respond to your inquiries and provide requested services</li>
            <li>Improve our website and user experience</li>
            <li>Send relevant communications about our services (only with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>4. Data Sharing</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            We do not sell your personal data. We may share information with trusted service providers who assist us in operating our website and conducting business, provided they agree to keep this information confidential.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>5. Cookies</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            Our website may use essential cookies to ensure proper functionality. We do not use tracking or advertising cookies unless you provide explicit consent.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>6. Data Retention</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>7. Your Rights</h2>
          <p style={{ color: 'var(--ip-dim)' }}>You have the right to:</p>
          <ul style={{ color: 'var(--ip-dim)', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Request portability of your data</li>
          </ul>
          <p style={{ color: 'var(--ip-dim)', marginTop: '0.75rem' }}>
            To exercise any of these rights, contact us at <a href="mailto:connect@techbirdit.in" style={{ color: 'var(--ip-white)' }}>connect@techbirdit.in</a>.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>8. Security</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>9. Changes to This Policy</h2>
          <p style={{ color: 'var(--ip-dim)', marginBottom: '4rem' }}>
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}
