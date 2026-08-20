/* ══════════════════════════════════════════════════════════════════
   Mailbird website-enquiry capture - configuration

   Endpoint: POST {MAILBIRD_URL}/api/method/mailbird.api.send_website_enquiry
   Guest-accessible. Rate limited to 5 requests per minute per IP.

   ── Two things about this endpoint that shape the code below ─────

   1. It ALWAYS answers HTTP 200. Success and failure are distinguished
      only by the body:
         {"message": {"success": true,  "message": "..."}}
         {"message": {"success": false, "error":   "..."}}
      So `res.ok` means "the server replied", not "the enquiry was
      accepted". Never branch on it. See readEnquiryResult().

   2. It sends no Access-Control-Allow-Origin header (verified against
      the live host). A browser will therefore block the response even
      though the POST itself succeeds. See the go-live note below.

   ── Going live ──────────────────────────────────────────────────
   1. Set VITE_MAILBIRD_SITE to the Website Master domain_name. It must
      match an ACTIVE Website Master or every enquiry comes back
      "Website not found or inactive."
   2. Allow this site's origin on the Mailbird host. Because we post
      application/x-www-form-urlencoded (a CORS-safelisted content
      type) the request is a "simple request" - no OPTIONS preflight is
      made, so the server only needs to add the header to the POST
      response. In Frappe that is site_config.json:
         "allow_cors": ["https://www.techbird.in", "https://techbird.in"]
      Alternatively set VITE_MAILBIRD_URL to a same-origin proxy path
      and skip CORS entirely - see .env.example for the trade-off.
   3. If a captcha is enabled in Mailbird Settings, set the matching
      VITE_TURNSTILE_SITE_KEY. Without it the server rejects every
      enquiry and the visitor sees the captcha error verbatim.
   4. Send one real test enquiry and confirm it arrives.

   VITE_* values are baked in at BUILD time. Setting them in Vercel
   changes nothing until you redeploy.
   ══════════════════════════════════════════════════════════════════ */

/* Defaults to the same-origin proxy path, which sidesteps CORS entirely.
   `/mailbird` is served by the Vite dev proxy locally (vite.config.js) and
   by a Vercel rewrite in production (vercel.json) - one code path, no CORS
   in either environment.

   Set VITE_MAILBIRD_URL=https://mailbird.techbird.in to call the host
   directly instead. Only do that once allow_cors is configured there; see
   the CORS note in .env.example for why direct is preferable.

   Trailing slash trimmed so `${MAILBIRD_URL}/api/...` cannot produce a
   double slash, which some proxies 404 on. */
export const MAILBIRD_URL = (
  import.meta.env.VITE_MAILBIRD_URL || '/mailbird'
).replace(/\/+$/, '');

/* Must match an active Website Master domain_name on the Mailbird instance -
   a bare domain, not a URL.

   Defaults to the host the page is actually served from. Mailbird keeps one
   Website Master per domain, each with its own allowed-origins list, so the
   record that should receive an enquiry is by definition the one for the host
   the form is on. Hardcoding a single domain meant the Vercel deployment sent
   `techbird.in` from a Vercel origin and was rejected as a cross-origin
   request.

   Verified against the live endpoint: techbird.in and techbird-react.vercel.app
   each have their own record and each accepts its own origin.

   VITE_MAILBIRD_SITE still wins where it is set, for the case where a host
   should post to a record that is not named after it. The literal fallback
   only applies to non-browser contexts, where there is no location to read. */
export const MAILBIRD_SITE =
  import.meta.env.VITE_MAILBIRD_SITE ||
  (typeof window !== 'undefined' && window.location.hostname) ||
  'techbird.in';

/* Cloudflare Turnstile sitekey. Empty means "no captcha configured";
   the widget is not rendered and no token is sent. */
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

export const ENQUIRY_ENDPOINT =
  `${MAILBIRD_URL}/api/method/mailbird.api.send_website_enquiry`;

/* Give up on a hanging instance instead of spinning forever. */
export const REQUEST_TIMEOUT_MS = 12000;

/* Shown to the visitor whenever we cannot submit for them. */
export const CONTACT_EMAIL = 'connect@techbirdit.in';

export const isTurnstileEnabled = () => Boolean(TURNSTILE_SITE_KEY);

/**
 * Maps the contact form onto the endpoint's field list.
 *
 * The endpoint accepts only site/name/email/message/phone/subject, but
 * the form also collects `company` and `service`. Those are folded into
 * the subject line and the message body so the information reaches the
 * inbox instead of being dropped on the floor.
 *
 * `website_url` is the honeypot and must be sent empty - the server
 * rejects the enquiry if a bot has filled it in.
 */
export function buildEnquiryPayload(form, turnstileToken) {
  const details = [
    form.company ? `Company: ${form.company}` : null,
    form.service ? `Service of interest: ${form.service}` : null,
  ].filter(Boolean);

  const message = [details.join('\n') || null, form.message]
    .filter(Boolean)
    .join('\n\n');

  const payload = {
    site: MAILBIRD_SITE,
    name: form.name.trim(),
    email: form.email.trim(),
    message,
    subject: form.service
      ? `Website enquiry: ${form.service}`
      : 'Website enquiry',
    website_url: form.website_url || '', // honeypot - must reach the server empty
  };

  if (form.phone?.trim()) payload.phone = form.phone.trim();
  if (turnstileToken) payload.cf_turnstile_response = turnstileToken;

  return payload;
}

/**
 * Unwraps the {"message": {...}} envelope into a plain outcome.
 *
 * Treats a malformed or empty body as failure rather than success: a
 * proxy error page returning 200 must not read as "enquiry sent".
 */
export function readEnquiryResult(data) {
  const body = data?.message;
  if (body?.success === true) {
    return { ok: true, message: body.message || '' };
  }
  return { ok: false, error: body?.error || body?.message || '' };
}

/** Prefilled mailto: used when the endpoint cannot be reached. */
export function buildMailtoUrl(form) {
  const subject = `Project Inquiry from ${form.name}`;
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : null,
    form.company ? `Company: ${form.company}` : null,
    form.service ? `Service: ${form.service}` : null,
    '',
    'Message:',
    form.message,
  ].filter(v => v !== null).join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
