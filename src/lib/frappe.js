/* ══════════════════════════════════════════════════════════════════
   Frappe / ERPNext lead capture - configuration

   Everything needed to point the contact form at a Frappe instance
   lives in this file. Nothing else needs editing to go live.

   ── Going live ──────────────────────────────────────────────────
   1. Set VITE_FRAPPE_URL in the Vercel project (Settings → Environment
      Variables), then REDEPLOY. VITE_* values are baked in at build
      time, not read at runtime - setting the var without a rebuild
      changes nothing.
   2. Allow this site's origin in the Frappe instance's CORS settings
      (site_config.json → allow_cors, or the reverse proxy).
   3. Let guests create the lead, either by:
        a. granting the Guest role create permission on Lead, or
        b. creating a Web Form whose route matches VITE_FRAPPE_WEB_FORM
           with "Allow Guest to Submit" enabled.
      The form tries (a) and falls back to (b) on 401/403.
   4. Check LEAD_FIELDS below against the Lead doctype on YOUR instance.
      Frappe rejects the whole submission if a field does not exist, so
      a stale custom fieldname fails every lead silently in production.

   Until VITE_FRAPPE_URL is set the form degrades to a mailto: link and
   says so honestly rather than claiming the message was sent.
   ══════════════════════════════════════════════════════════════════ */

/* Trailing slash trimmed so `${FRAPPE_URL}/api/...` can't produce a
   double slash, which some proxies 404 on. */
export const FRAPPE_URL = (import.meta.env.VITE_FRAPPE_URL || '').replace(/\/+$/, '');

/* Route of the guest-submittable Web Form used when the REST API
   refuses an anonymous write. */
export const FRAPPE_WEB_FORM = import.meta.env.VITE_FRAPPE_WEB_FORM || 'website-lead';

/* Give up on a hanging instance instead of spinning forever. */
export const REQUEST_TIMEOUT_MS = 12000;

/* Shown to the visitor whenever we cannot submit for them. */
export const CONTACT_EMAIL = 'connect@techbirdit.in';

export const isFrappeEnabled = () => Boolean(FRAPPE_URL);

/**
 * Maps the form fields onto Lead doctype fields.
 *
 * VERIFY THIS AGAINST YOUR INSTANCE BEFORE GO-LIVE - see step 4 above.
 * `website_service_interest` in particular is a custom field; if your
 * Lead doctype does not have it, delete that line or the submission
 * will be rejected.
 *
 * The selected service is also folded into the notes text, so the
 * information survives even if the custom field is dropped.
 */
export function buildLeadPayload(form) {
  const notes = [
    form.service ? `Service of interest: ${form.service}` : null,
    form.message || null,
  ].filter(Boolean).join('\n\n');

  const payload = {
    lead_name: form.name,
    email_id: form.email,
    source: 'Website',
  };

  if (form.phone)   payload.mobile_no = form.phone;
  if (form.company) payload.company_name = form.company;
  if (notes)        payload.notes = notes;
  if (form.service) payload.website_service_interest = form.service;

  return payload;
}

/** Prefilled mailto: used when Frappe is not configured. */
export function buildMailtoUrl(form) {
  const subject = `Project Inquiry from ${form.name}`;
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone   ? `Phone: ${form.phone}` : null,
    form.company ? `Company: ${form.company}` : null,
    form.service ? `Service: ${form.service}` : null,
    '',
    'Message:',
    form.message,
  ].filter(v => v !== null).join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
