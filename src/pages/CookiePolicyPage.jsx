import LegalPageLayout from '../components/LegalPageLayout';

/* Needed because /contact embeds Google Maps and every page loads Cloudflare
   Turnstile - both third parties that can set storage. The table lists only
   what this site actually causes; there is no analytics or advertising here. */

const EMAIL = 'connect@techbirdit.in';

const SECTIONS = [
  {
    heading: 'What we set ourselves',
    body: (
      <>
        <p>
          No cookies at all — no analytics, no advertising, no session tracking. There is no
          Google Analytics, advertising pixel or session-recording tool anywhere on this site.
        </p>
        <p>
          One thing is stored: if you choose to load the map on our contact page, we remember
          that choice in your browser&apos;s local storage so you are not asked again. It holds
          a single value, it is readable only by this site, it never reaches us, and clearing
          your browser&apos;s site data removes it.
        </p>
      </>
    ),
  },
  {
    heading: 'The full list',
    body: (
      <>
        <p>
          Everything this site can cause to be stored in your browser, first-party and
          third-party:
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
                <td>TechBird (us)</td>
                <td>Contact page map</td>
                <td>
                  Remembers that you chose to load the map, so you are not asked on every
                  visit. Local storage, one value, never sent to us.
                </td>
                <td>Functional, first-party</td>
              </tr>
              <tr>
                <td>Google Maps</td>
                <td>
                  Contact page map — <strong>only after you click &ldquo;Load map&rdquo;</strong>
                </td>
                <td>
                  Renders the embedded map of our office. Google may set cookies and use them
                  under its own terms, including for its own purposes.
                </td>
                <td>Third-party, opt-in</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The Turnstile check is necessary: without it the contact form cannot be submitted at
          all, because our enquiry endpoint rejects submissions that carry no verification
          token.
        </p>
        <p>
          The Google Map is not loaded with the page. Until you press &ldquo;Load map&rdquo;,
          no request is made to Google and nothing of theirs is stored — the placeholder you
          see instead is drawn by us.
        </p>
      </>
    ),
  },
  {
    heading: 'Why there is no cookie banner',
    body: (
      <>
        <p>
          Because there is nothing to consent to up front. We set no analytics or advertising
          cookies, the Turnstile check is strictly necessary to operate the contact form, and the
          one genuinely optional third party — the Google Map — is behind a button rather than
          loaded on arrival.
        </p>
        <p>
          That means consent is asked exactly where it is needed, in place, instead of a banner
          covering the page. If you never press &ldquo;Load map&rdquo;, no third-party content is
          ever loaded from anywhere on this site other than the anti-bot check on the form.
        </p>
        <p>
          To undo the choice, clear this site&apos;s data in your browser and the map will ask
          again.
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
          cookies specifically, which stops the Google Maps embed from storing anything even if
          you do load it. Every major browser supports this under its privacy or site-data
          settings.
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
