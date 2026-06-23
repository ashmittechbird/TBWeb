/**
 * Frappe Configuration
 *
 * Set VITE_FRAPPE_URL in .env to point to your Frappe/ERPNext instance.
 * Example: VITE_FRAPPE_URL=https://erp.techbird.in
 *
 * When VITE_FRAPPE_URL is not set, form submissions fall back to mailto.
 */
export const FRAPPE_URL = import.meta.env.VITE_FRAPPE_URL || '';

export const isFrappeEnabled = () => Boolean(FRAPPE_URL);
