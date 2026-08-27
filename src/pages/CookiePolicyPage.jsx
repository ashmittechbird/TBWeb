import LegalPageLayout from '../components/LegalPageLayout';

/* Needed because /contact embeds Google Maps and every page loads Cloudflare
   Turnstile - both third parties that can set storage. The table lists only
   what this site actually causes; there is no analytics or advertising here. */

const EMAIL = 'connect@techbirdit.in';

const SECTIONS = [
  {
    heading: 'What we set ourselves',
    body: (
      <p>
        Nothing. This site sets no cookies of its own — no analytics, no advertising, no
        session tracking. There is no Google Analytics, advertising pixel or session-recording
        tool anywhere on it.
      </p>
    ),
  },
  {
    heading: 'What third parties can set',
    body: (
      <>
        <p>
          Two features on the site are provided by third parties, and loading them can set
          cookies or similar browser storage from those providers:
        </p>
        <div className="lgl-table-wrap">
          <table className="lgl-table">
            <thead>
              <tr>
                <th>Set by</th>
                <th>Where</th>
                <th>Purpose</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cloudflare Turnstile</td>
                <td>Contact form</td>
                <td>
                  Distinguishes real visitors from bots so the enquiry form is not abused.
                  Required for the form to submit.
                </td>
                <td>Strictly necessary</td>
              </tr>
              <tr>
                <td>Google Maps</td>
                <td>Contact page map</td>
                <td>
                  Renders the embedded map of our office. Google may set cookies and use them
                  under its own terms, including for its own purposes.
                </td>
                <td>Third-party functional</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The Turnstile check is necessary: without it the contact form cannot be submitted at
          all, because our enquiry endpoint rejects submissions that carry no verification
          token.
        </p>
      </>
    ),
  },
  {
    heading: 'Why there is no cookie banner',
    body: (
      <>
        <p>
          We do not show a consent banner because we set no analytics or advertising cookies of
          our own, and the Turnstile check is strictly necessary to operate the contact form.
        </p>
        <p>
          The embedded Google Map is the one genuinely optional third party. If you would rather
          not load it, avoid the contact page and reach us by{' '}
          <a href={`mailto:${EMAIL}`}>email</a> or phone instead — every other page on the site
          loads no Google content.
        </p>
      </>
    ),
  },
  {
    heading: 'Controlling cookies in your browser',
    body: (
      <>
        <p>
          You can block or delete cookies in your browser settings, and block third-party
          cookies specifically, which stops the Google Maps embed from storing anything. Every
          major browser supports this under its privacy or site-data settings.
        </p>
        <p>
          Blocking third-party cookies does not break this site. Blocking scripts from
          <span> </span><code>challenges.cloudflare.com</code> will stop the contact form from
          being submittable — the form will tell you the verification check could not load and
          offer our email address instead.
        </p>
      </>
    ),
  },
  {
    heading: 'Changes',
    body: (
      <p>
        If we add a service that sets cookies, this page and the table above will be updated
        before or as it goes live, and a consent mechanism added if the law requires one for it.
      </p>
    ),
  },
  {
    heading: 'Questions',
    body: (
      <p>
        Ask us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. See also our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      updated="20 August 2026"
      seoDescription="Which cookies and browser storage techbird.in causes, who sets them, what they are for, and how to refuse them."
      seoKeywords="cookie policy, cookies, tracking, Turnstile, TechBird IT Services"
      intro={
        <p>
          A short, specific account of what gets stored in your browser when you use this site.
          We set nothing ourselves; two embedded third-party features can.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
