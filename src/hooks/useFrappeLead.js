import { useState } from 'react';
import {
  isFrappeEnabled,
  FRAPPE_URL,
  FRAPPE_WEB_FORM,
  REQUEST_TIMEOUT_MS,
  buildLeadPayload,
  buildMailtoUrl,
} from '../lib/frappe';

/**
 * Submits the contact form as a Lead in Frappe / ERPNext.
 *
 * Returns a discriminated outcome rather than a boolean, because the
 * three cases need different things said to the visitor:
 *
 *   { status: 'created'  }  the lead is in Frappe
 *   { status: 'fallback' }  Frappe is not configured; the visitor's mail
 *                           client was opened. We CANNOT know whether
 *                           anything was actually sent, so the UI must
 *                           not claim it was.
 *   { status: 'error', message }  submission failed; show a way to reach
 *                           us directly.
 *
 * See src/lib/frappe.js for the go-live checklist.
 */
export default function useFrappeLead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (form) => {
    setError(null);

    // Not wired up yet - hand off to the mail client and say so.
    if (!isFrappeEnabled()) {
      window.location.assign(buildMailtoUrl(form));
      return { status: 'fallback' };
    }

    setLoading(true);
    try {
      const res = await postJson(`${FRAPPE_URL}/api/resource/Lead`, buildLeadPayload(form));

      // Anonymous writes are usually blocked; the Web Form route exists
      // precisely for guest submissions.
      if (res.status === 401 || res.status === 403) {
        return await submitViaWebForm(form);
      }
      if (!res.ok) throw new Error(await describeFailure(res));

      return { status: 'created' };
    } catch (err) {
      const message = friendlyMessage(err);
      setError(message);
      return { status: 'error', message };
    } finally {
      setLoading(false);
    }
  };

  const submitViaWebForm = async (form) => {
    try {
      const res = await postJson(
        `${FRAPPE_URL}/api/method/frappe.website.doctype.web_form.web_form.accept`,
        { web_form: FRAPPE_WEB_FORM, data: JSON.stringify(buildLeadPayload(form)) },
      );
      if (!res.ok) throw new Error(await describeFailure(res));
      return { status: 'created' };
    } catch (err) {
      const message = friendlyMessage(err);
      setError(message);
      return { status: 'error', message };
    }
  };

  return { submit, loading, error };
}

/* ── helpers ─────────────────────────────────────────────────────── */

/* No `credentials: 'include'`. This is an anonymous lead form, and
   sending credentials would require Frappe to echo back the exact
   origin plus Access-Control-Allow-Credentials - a common reason these
   integrations fail CORS on the day they go live. */
async function postJson(url, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/* Frappe returns _server_messages as a JSON-encoded array of JSON
   strings. Unwrap it for the console; visitors get friendlyMessage(). */
async function describeFailure(res) {
  const data = await res.json().catch(() => ({}));
  let detail = data.message || data.exception || '';
  try {
    const msgs = JSON.parse(data._server_messages || '[]');
    detail = msgs.map(m => JSON.parse(m).message || m).join(' ') || detail;
  } catch { /* leave detail as-is */ }
  return `Frappe responded ${res.status}${detail ? `: ${detail}` : ''}`;
}

function friendlyMessage(err) {
  // Log the real cause; the visitor sees something actionable instead.
  console.error('[contact] lead submission failed:', err);
  if (err?.name === 'AbortError') {
    return 'That took too long to send. Please try again, or email us directly.';
  }
  return "We couldn't send your message just now. Please try again, or email us directly.";
}
