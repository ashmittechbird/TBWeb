import LegalPageLayout from '../components/LegalPageLayout';

/* Written to match what the site actually does. Two corrections from the
   previous version, both of which claimed things that were not true:
   - it said usage data ("pages visited, time spent") was collected; there is
     no analytics on this site at all.
   - it said cookies were essential-only, while /contact embeds Google Maps,
     which sets third-party cookies, and every page loads Cloudflare Turnstile.
   Overclaiming in a privacy notice is worse than a short one. */

const EMAIL = 'connect@techbirdit.in';
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const SECTIONS = [
  {
    heading: 'Who we are',
    body: (
      <>
        <p>
          TechBird IT Services is the data fiduciary (data controller) for personal data
          collected through this website.
        </p>
        <p>
          Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014, Maharashtra, India<br />
          Email: {mail}<br />
          Phone: <a href="tel:+919767623456">+91 97676 23456</a>
        </p>
      </>
    ),
  },
  {
    heading: 'What we collect',
    body: (
      <>
        <p>Only what you send us, plus what any web server necessarily sees.</p>
        <ul>
          <li>
            <strong>Enquiry details you submit.</strong> Name, email address, and optionally
            phone number, company name and the service you are interested in, along with your
            message.
          </li>
          <li>
            <strong>Technical data from the request itself.</strong> Your IP address, browser
            and device type, and the time of the request, as recorded in ordinary server logs.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> run analytics, advertising or behavioural tracking on this
          site. There is no Google Analytics, no advertising pixel and no session recording, so
          we do not build a profile of the pages you visit or how long you stay.
        </p>
      </>
    ),
  },
  {
    heading: 'Why we use it, and on what basis',
    body: (
      <>
        <ul>
          <li>
            <strong>To reply to your enquiry</strong> and discuss the work you have asked about.
            Basis: your consent, given by submitting the form, and our legitimate interest in
            responding to a business enquiry.
          </li>
          <li>
            <strong>To keep the site secure</strong> and prevent automated abuse of the contact
            form. Basis: our legitimate interest in protecting the service.
          </li>
          <li>
            <strong>To meet legal or accounting obligations</strong> where they apply.
          </li>
        </ul>
        <p>
          We do not send marketing email to addresses collected through the contact form unless
          you have separately asked us to.
        </p>
      </>
    ),
  },
  {
    heading: 'Who else processes it',
    body: (
      <>
        <p>
          We do not sell personal data. It is shared only with the providers that operate parts
          of this site:
        </p>
        <ul>
          <li>
            <strong>Our own enquiry system</strong> (Mailbird, on infrastructure we control) —
            receives and stores your submitted enquiry.
          </li>
          <li>
            <strong>Cloudflare</strong> — provides the Turnstile anti-bot check on the contact
            form. Cloudflare receives technical signals from your browser to judge whether the
            request is automated.
          </li>
          <li>
            <strong>Google</strong> — the map on our contact page is embedded from Google Maps.
            It is <strong>not</strong> loaded with the page: nothing is requested from Google
            unless you press &ldquo;Load map&rdquo;, and if you do, that embed is subject to
            Google&apos;s own privacy terms.
          </li>
          <li>
            <strong>Our hosting provider</strong> — serves the site and keeps standard access
            logs.
          </li>
        </ul>
        <p>
          Some of these providers operate outside India. Where personal data is transferred
          internationally, we rely on the provider&apos;s contractual safeguards for that
          transfer.
        </p>
      </>
    ),
  },
  {
    heading: 'Cookies',
    body: (
      <>
        <p>
          We set no cookies of our own for analytics or advertising. The Turnstile check on the
          contact form can set third-party storage, and so can the Google Map — but only if you
          choose to load it. We store one value locally to remember that choice.
        </p>
        <p>
          Our <a href="/cookies">Cookie Policy</a> lists each one, what it is for, and how to
          refuse it.
        </p>
      </>
    ),
  },
  {
    heading: 'How long we keep it',
    body: (
      <p>
        Enquiries are kept for as long as needed to deal with them and, where they lead to work,
        for as long as the business relationship and our record-keeping obligations require.
        Server logs are kept for a short operational period. If you ask us to delete your
        enquiry we will do so, unless we are required to retain it.
      </p>
    ),
  },
  {
    heading: 'Your rights',
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>tell you what personal data we hold about you, and give you a copy</li>
          <li>correct anything inaccurate or incomplete</li>
          <li>delete your data where we have no continuing need for it</li>
          <li>restrict or object to how we are using it</li>
          <li>withdraw a consent you previously gave</li>
        </ul>
        <p>
          Email {mail} and we will respond. If you are unhappy with how we have handled a
          request, you may escalate it to the relevant data protection authority for your
          jurisdiction.
        </p>
      </>
    ),
  },
  {
    heading: 'Grievance contact',
    body: (
      <p>
        Questions or complaints about how we handle personal data should go to our grievance
        contact at {mail}, marked &ldquo;Data privacy&rdquo;. We aim to acknowledge within a few
        working days.
      </p>
    ),
  },
  {
    heading: 'Security',
    body: (
      <p>
        The site is served over HTTPS and enquiries are transmitted over an encrypted
        connection. We apply access controls to the systems that hold enquiry data. No method of
        transmission or storage is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    heading: 'Changes',
    body: (
      <p>
        We may update this policy. Material changes will be reflected here with a new revision
        date at the top of the page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      updated="20 August 2026"
      seoDescription="How TechBird IT Services collects, uses and protects personal data submitted through techbird.in, including the third parties involved and your rights."
      seoKeywords="privacy policy, data protection, DPDP, TechBird IT Services"
      intro={
        <p>
          This policy covers personal data collected through this website. It is written to
          describe what the site actually does: there is no analytics or advertising tracking
          here, and the only personal data we receive is what you choose to send through the
          contact form.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
