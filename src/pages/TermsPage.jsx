import LegalPageLayout from '../components/LegalPageLayout';

/* Text is carried over verbatim from the previous version - only the layout
   moved onto LegalPageLayout so all four legal pages share one shell. */

const EMAIL = 'connect@techbirdit.in';
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const SECTIONS = [
  {
    heading: 'Acceptance of Terms',
    body: (
      <p>
        By accessing and using the TechBird IT Services website (techbird.in), you agree to be
        bound by these Terms of Service. If you do not agree, please do not use this website.
      </p>
    ),
  },
  {
    heading: 'Services',
    body: (
      <p>
        TechBird IT Services provides software development, AI solutions, cloud and DevOps,
        animation, marketing technology, and related IT consulting services. Specific terms for
        individual service engagements are governed by separate service agreements.
      </p>
    ),
  },
  {
    heading: 'Permitted Use',
    body: (
      <>
        <p>You may use this website for lawful purposes only. You agree not to:</p>
        <ul>
          <li>Use the site in any way that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
          <li>
            Reproduce, distribute, or create derivative works from site content without written
            permission
          </li>
          <li>Use the site to transmit harmful, fraudulent, or misleading content</li>
        </ul>
      </>
    ),
  },
  {
    heading: 'Intellectual Property',
    body: (
      <p>
        All content on this website, including text, graphics, logos, images, and software, is
        the property of TechBird IT Services or its licensors and is protected by applicable
        intellectual property laws. You may not use, copy, or distribute any content without
        prior written consent.
      </p>
    ),
  },
  {
    heading: 'Disclaimers',
    body: (
      <p>
        This website and its content are provided &ldquo;as is&rdquo; without warranties of any
        kind, either express or implied. TechBird IT Services does not guarantee that the website
        will be uninterrupted, error-free, or free of harmful components. See also our{' '}
        <a href="/disclaimer">Disclaimer</a>.
      </p>
    ),
  },
  {
    heading: 'Limitation of Liability',
    body: (
      <p>
        To the maximum extent permitted by law, TechBird IT Services shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages arising from your use
        of this website or services.
      </p>
    ),
  },
  {
    heading: 'Third-Party Links',
    body: (
      <p>
        This website may contain links to third-party websites. We are not responsible for the
        content or practices of any linked third-party sites.
      </p>
    ),
  },
  {
    heading: 'Privacy',
    body: (
      <p>
        Personal data submitted through this website is handled as described in our{' '}
        <a href="/privacy">Privacy Policy</a>, and browser storage is covered by our{' '}
        <a href="/cookies">Cookie Policy</a>.
      </p>
    ),
  },
  {
    heading: 'Governing Law',
    body: (
      <p>
        These terms are governed by and construed in accordance with the laws of India. Any
        disputes shall be subject to the exclusive jurisdiction of the courts in Pune,
        Maharashtra, India.
      </p>
    ),
  },
  {
    heading: 'Changes to These Terms',
    body: (
      <p>
        We reserve the right to update these terms at any time. Changes become effective when
        posted on this page. Continued use of the website after changes constitutes acceptance.
      </p>
    ),
  },
  {
    heading: 'Contact',
    body: (
      <p>
        For questions about these terms, contact us at:<br />
        Email: {mail}<br />
        Address: Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014, Maharashtra, India
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      updated="20 August 2026"
      seoDescription="Terms of Service for the TechBird IT Services website, covering permitted use, intellectual property, liability and governing law."
      seoKeywords="terms of service, terms of use, TechBird IT Services"
      sections={SECTIONS}
    />
  );
}
