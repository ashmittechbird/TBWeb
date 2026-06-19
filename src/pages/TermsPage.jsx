import InnerNavbar from '../components/InnerNavbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/inner.css';

export default function TermsPage() {
  return (
    <div className="ip2-root">
      <SEO
        title="Terms of Service"
        description="TechBird IT Services terms of service. Read our terms and conditions for using our website and services."
        keywords="terms of service, terms and conditions, TechBird"
      />
      <InnerNavbar />

      <section className="ihero" style={{ minHeight: '40vh' }}>
        <div className="ihero-wrap">
          <div className="ihero-text">
            <p className="ihero-ey">Legal</p>
            <h1 className="ihero-h1">Terms of Service</h1>
            <p className="ihero-sub">Last updated: June 2026</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ip-bg)', padding: 'var(--ip-px)', color: 'var(--ip-white)' }}>
        <div style={{ maxWidth: 'var(--ip-mw)', margin: '0 auto', lineHeight: 1.7, fontFamily: 'var(--body, "Manrope", sans-serif)' }}>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            By accessing and using the TechBird IT Services website (www.techbird.in), you agree to be bound by these Terms of Service. If you do not agree, please do not use this website.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Services</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            TechBird IT Services provides software development, AI solutions, cloud and DevOps, animation, marketing technology, and related IT consulting services. Specific terms for individual service engagements are governed by separate service agreements.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Permitted Use</h2>
          <p style={{ color: 'var(--ip-dim)' }}>You may use this website for lawful purposes only. You agree not to:</p>
          <ul style={{ color: 'var(--ip-dim)', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Use the site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
            <li>Reproduce, distribute, or create derivative works from site content without written permission</li>
            <li>Use the site to transmit harmful, fraudulent, or misleading content</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>4. Intellectual Property</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            All content on this website, including text, graphics, logos, images, and software, is the property of TechBird IT Services or its licensors and is protected by applicable intellectual property laws. You may not use, copy, or distribute any content without prior written consent.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>5. Disclaimers</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            This website and its content are provided "as is" without warranties of any kind, either express or implied. TechBird IT Services does not guarantee that the website will be uninterrupted, error-free, or free of harmful components.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>6. Limitation of Liability</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            To the maximum extent permitted by law, TechBird IT Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or services.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>7. Third-Party Links</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            This website may contain links to third-party websites. We are not responsible for the content or practices of any linked third-party sites.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>8. Governing Law</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra, India.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>9. Changes to These Terms</h2>
          <p style={{ color: 'var(--ip-dim)' }}>
            We reserve the right to update these terms at any time. Changes become effective when posted on this page. Continued use of the website after changes constitutes acceptance.
          </p>

          <h2 style={{ fontFamily: 'var(--display, "Space Grotesk", sans-serif)', fontSize: 'clamp(20px, 3vw, 28px)', marginTop: '2.5rem', marginBottom: '1rem' }}>10. Contact</h2>
          <p style={{ color: 'var(--ip-dim)', marginBottom: '4rem' }}>
            For questions about these terms, contact us at:<br />
            Email: <a href="mailto:connect@techbirdit.in" style={{ color: 'var(--ip-white)' }}>connect@techbirdit.in</a><br />
            Address: Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014, Maharashtra, India
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}
