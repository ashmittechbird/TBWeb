import { useState } from 'react';

/* Click-to-load wrapper for the Google Maps embed.
 *
 * The embed used to load with the page, which meant every visitor to /contact
 * had a request made to Google and cookies set on their behalf before they had
 * any say in it. Nothing else on this site contacts Google, so gating this one
 * iframe means the site loads no third-party content at all until asked.
 *
 * The placeholder is drawn locally - no tile image, no request - so nothing
 * leaves the browser until the button is pressed.
 */

const STORAGE_KEY = 'tb.mapConsent';

/* Reading and writing localStorage both throw in some contexts (private
   windows, blocked site data), so every access is guarded and the component
   works correctly when it is unavailable - it simply asks each visit. */
function readConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'granted';
  } catch {
    return false;
  }
}
function saveConsent() {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'granted');
  } catch { /* not essential - the map still loads for this visit */ }
}

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function MapEmbed({
  title = 'TechBird Office',
  src,
  externalUrl,
  address,
}) {
  /* Read the stored choice during initialisation rather than in an effect, so
     a returning visitor never sees the placeholder flash before the map
     appears. Safe here because the app is client-rendered only - there is no
     server pass for this to disagree with. */
  const [loaded, setLoaded] = useState(readConsent);

  const load = () => { saveConsent(); setLoaded(true); };

  if (loaded) {
    return (
      <div className="cp-map-card">
        <iframe
          title={title}
          src={src}
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="cp-map-card cp-map-placeholder">
      <span className="cp-map-pin" aria-hidden="true"><PinIcon /></span>
      <p className="cp-map-address">{address}</p>
      <p className="cp-map-note">
        The map is loaded from Google, which may set cookies. We don&apos;t load it until
        you ask.
      </p>
      <div className="cp-map-actions">
        <button type="button" className="cp-map-btn" onClick={load}>
          Load map
        </button>
        <a
          className="cp-map-link"
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
