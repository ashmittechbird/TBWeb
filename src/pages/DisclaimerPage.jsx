import LegalPageLayout from '../components/LegalPageLayout';

/* Standard for a services/consulting site. Covers the two things this site
   specifically does that warrant it: it describes engineering outcomes for named
   clients, and it shows product screenshots and third-party brand names. */

const EMAIL = 'connect@techbirdit.in';
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const SECTIONS = [
  {
    heading: 'General information only',
    body: (
      <p>
        The content on this website is provided for general information about TechBird IT
        Services and what we build. It is not technical, legal, financial, tax or professional
        advice, and it should not be relied on as the basis for a decision without speaking to
        us or to a suitably qualified adviser about your specific circumstances.
      </p>
    ),
  },
  {
    heading: 'No engagement is formed by this site',
    body: (
      <p>
        Nothing on this website constitutes an offer, quotation or commitment, and submitting the
        contact form does not create a client relationship. Scope, timelines, pricing and
        obligations are only ever fixed in a signed agreement.
      </p>
    ),
  },
  {
    heading: 'Case studies, timelines and results',
    body: (
      <>
        <p>
          Case studies and client outcomes describe work we have delivered in particular
          circumstances. They are illustrative, not a prediction or guarantee: results depend on
          the client&apos;s data, systems, processes and level of involvement.
        </p>
        <p>
          Any delivery timeline mentioned on this site is a typical range for comparable work,
          not a committed schedule.
        </p>
      </>
    ),
  },
  {
    heading: 'Product screenshots',
    body: (
      <p>
        Screenshots of our products show representative interfaces. Figures shown in them are
        for illustration, features change as products develop, and what a given deployment
        includes depends on how it is configured for that client.
      </p>
    ),
  },
  {
    heading: 'Client names and third-party trademarks',
    body: (
      <p>
        Client names and logos appear with permission and indicate work delivered, not
        endorsement of anything else on this site. Third-party names, logos and product marks —
        including ERPNext, Frappe, Tally, Zoho, AWS, Azure, Google and Cloudflare — belong to
        their respective owners and are used only to describe compatibility or the tools we work
        with. Their use implies no affiliation, sponsorship or endorsement unless we say so
        explicitly.
      </p>
    ),
  },
  {
    heading: 'External links',
    body: (
      <p>
        Where we link to another site, we do not control its content and are not responsible for
        it. Following an external link is at your own discretion, under that site&apos;s terms
        and privacy policy.
      </p>
    ),
  },
  {
    heading: 'Availability and accuracy',
    body: (
      <p>
        We aim to keep this site accurate and available, but make no warranty that it is free of
        errors or uninterrupted. Content may be changed or removed at any time without notice.
      </p>
    ),
  },
  {
    heading: 'Questions',
    body: (
      <p>
        If anything here is unclear, or you believe something on this site is inaccurate, tell us
        at {mail}. This disclaimer should be read together with our{' '}
        <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      updated="20 August 2026"
      seoDescription="Disclaimer for techbird.in covering the informational nature of the site, case study results, product screenshots, third-party trademarks and external links."
      seoKeywords="disclaimer, no professional advice, trademarks, TechBird IT Services"
      intro={
        <p>
          What this website is, and what it is not. In short: it describes our work and our
          products, it is not advice, and it does not by itself commit either of us to anything.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
