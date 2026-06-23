import { useState } from 'react';
import { isFrappeEnabled, FRAPPE_URL } from '../lib/frappe';

/**
 * Hook to create a Lead in Frappe CRM / ERPNext.
 *
 * Maps contact form fields to Frappe Lead DocType fields:
 *   name      → lead_name
 *   email     → email_id
 *   phone     → phone
 *   company   → company_name
 *   service   → source (or custom field)
 *   message   → notes (child table) or description
 *
 * Falls back to mailto when Frappe is not configured.
 */
export default function useFrappeLead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLead = async (formData) => {
    if (!isFrappeEnabled()) {
      // Fallback: open mailto
      const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:connect@techbirdit.in?subject=${subject}&body=${body}`;
      return { ok: true, fallback: true };
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${FRAPPE_URL}/api/resource/Lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          lead_name: formData.name,
          email_id: formData.email,
          phone: formData.phone || undefined,
          company_name: formData.company || undefined,
          source: 'Website',
          website_service_interest: formData.service || undefined,
          notes: formData.message || undefined,
        }),
      });

      if (!res.ok) {
        // If guest access is blocked, try Web Form submission instead
        if (res.status === 403 || res.status === 401) {
          return await submitViaWebForm(formData);
        }
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData._server_messages || errData.message || 'Failed to submit');
      }

      const data = await res.json();
      return { ok: true, data: data.data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fallback: submit via Frappe Web Form (guest-accessible).
   * Requires a Web Form named "website-lead" to be set up in Frappe.
   */
  const submitViaWebForm = async (formData) => {
    try {
      const res = await fetch(`${FRAPPE_URL}/api/method/frappe.website.doctype.web_form.web_form.accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          web_form: 'website-lead',
          data: JSON.stringify({
            lead_name: formData.name,
            email_id: formData.email,
            phone: formData.phone,
            company_name: formData.company,
            source: 'Website',
            notes: formData.message,
          }),
        }),
      });

      if (!res.ok) {
        throw new Error('Web Form submission failed');
      }

      const data = await res.json();
      return { ok: true, data: data.message };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  };

  return { createLead, loading, error };
}
