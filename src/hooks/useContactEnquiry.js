import { useState } from 'react';
import {
  ENQUIRY_ENDPOINT,
  MAILBIRD_SITE,
  REQUEST_TIMEOUT_MS,
  buildEnquiryPayload,
  buildMailtoUrl,
  isTurnstileEnabled,
  readEnquiryResult,
} from '../lib/mailbird';

/**
 * Submits the contact form to the Mailbird website-enquiry endpoint.
 *
 * Returns a discriminated outcome rather than a boolean, because the
 * three cases need different things said to the visitor:
 *
 *   { status: 'created'  }  the enquiry was accepted
 *   { status: 'fallback' }  the endpoint was unreachable (CORS, DNS,
 *                           offline) and the visitor's mail client was
 *                           opened instead. We CANNOT know whether
 *                           anything was actually sent, so the UI must
 *                           not claim it was.
 *   { status: 'error', message }  the server rejected it; the form stays
 *                           filled in so nothing has to be retyped.
 *
 * See src/lib/mailbird.js for the go-live checklist.
 */
export default function useContactEnquiry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (form, turnstileToken) => {
    setError(null);
    setLoading(true);

    try {
      const res = await postForm(
        ENQUIRY_ENDPOINT,
        buildEnquiryPayload(form, turnstileToken),
      );

      /* Documented as 5 requests per minute per IP. Worth its own
         message - "try again" is useless without saying how long. */
      if (res.status === 429) {
        const message = 'Too many attempts from your network. Please wait a minute and try again.';
        setError(message);
        return { status: 'error', message };
      }

      const data = await res.json().catch(() => null);
      const result = readEnquiryResult(data);

      /* The endpoint answers 200 even when it refuses the enquiry, so
         the body is the only reliable signal. A non-2xx status here
         means something in front of the app broke (proxy, gateway). */
      if (!result.ok) {
        const message = visitorMessage(result.error, res.status);
        console.error('[contact] enquiry rejected:', result.error || `HTTP ${res.status}`);
        explainConfigFault(result.error);
        setError(message);
        return { status: 'error', message };
      }

      return { status: 'created' };
    } catch (err) {
      /* fetch() rejects on timeout and on the network/CORS failures we
         cannot distinguish from the browser. Rather than dead-ending the
         visitor, hand the message to their mail client. */
      console.error('[contact] enquiry request failed:', err);
      window.location.assign(buildMailtoUrl(form));
      return { status: 'fallback' };
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}

/* ── helpers ─────────────────────────────────────────────────────── */

/* Posted as x-www-form-urlencoded on purpose. It is a CORS-safelisted
   content type, so the browser makes this a "simple request" and skips
   the OPTIONS preflight - which the Mailbird host does not answer with
   CORS headers. application/json would force a preflight and fail
   before the POST was ever sent.

   No `credentials: 'include'`: this is an anonymous enquiry, and sending
   credentials would additionally require the server to echo back the
   exact origin plus Access-Control-Allow-Credentials. */
async function postForm(url, fields) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    body.set(key, value ?? '');
  }

  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
      body,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/* Two server rejections are pure configuration faults that look like nothing
   in particular from the visitor's side. Spell them out in the console so
   whoever is debugging does not have to rediscover the cause. */
function explainConfigFault(serverError) {
  const text = String(serverError || '');

  if (/captcha|turnstile|recaptcha/i.test(text) && !isTurnstileEnabled()) {
    console.error(
      '[contact] The server requires a captcha but this build has no ' +
      'VITE_TURNSTILE_SITE_KEY, so no widget was rendered and no token was ' +
      'sent. The visitor sees "complete the check" with nothing to complete. ' +
      'Set the variable on the machine that runs `npm run build` - VITE_* ' +
      'values are baked in, not read at runtime.'
    );
  }

  if (/origin not allowed/i.test(text)) {
    console.error(
      `[contact] The Mailbird Website Master for "${MAILBIRD_SITE}" does not ` +
      `allow this origin (${window.location.origin}). Requests are proxied, ` +
      'but the browser\'s Origin header is forwarded as-is, so every host the ' +
      'form is served from - production, preview deployments and localhost - ' +
      'has to be on that record\'s allowed-origins list.'
    );
  }
}

/* The server's own wording is better than anything generic when it is
   about something the visitor can act on - a bad email, a missing
   captcha. Configuration faults are ours, not theirs, so those get a
   neutral message and the real cause goes to the console. */
function visitorMessage(serverError, status) {
  const text = String(serverError || '');

  if (/captcha|turnstile|recaptcha/i.test(text)) {
    /* Only tell them to complete the check if there is one to complete. When
       the build has no sitekey no widget was rendered, so "complete the check"
       points at nothing - that is our misconfiguration, not their mistake. */
    return isTurnstileEnabled()
      ? 'Captcha verification failed. Please complete the check and try again.'
      : "We couldn't send your message just now. Please email us directly.";
  }
  if (/website not found|inactive/i.test(text)) {
    return "We couldn't send your message just now. Please email us directly.";
  }
  if (/missing required|invalid|email/i.test(text)) {
    return text;
  }
  if (status >= 500) {
    return 'Our enquiry service is having trouble. Please try again shortly, or email us directly.';
  }
  return "We couldn't send your message just now. Please try again, or email us directly.";
}
