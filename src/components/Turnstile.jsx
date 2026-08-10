import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/* One shared load across the app - Turnstile throws if its script is
   injected twice, and React strict mode mounts every effect twice in
   development. */
let scriptPromise = null;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = SCRIPT_SRC;
    el.async = true;
    el.defer = true;
    el.onload = () => resolve(window.turnstile);
    el.onerror = () => {
      /* Let a later mount retry - a blocked or flaky first load should
         not permanently disable the widget. */
      scriptPromise = null;
      reject(new Error('Turnstile script failed to load'));
    };
    document.head.appendChild(el);
  });

  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget.
 *
 * onToken is called with the challenge token when it solves, and with ''
 * when the token expires or the challenge fails - tokens are single-use
 * and time-limited, so the caller must treat '' as "not verified".
 *
 * Bump `resetSignal` to force a fresh challenge. Needed after a rejected
 * submission, because the server has already consumed the old token.
 */
export default function Turnstile({ siteKey, onToken, resetSignal = 0, theme = 'light' }) {
  const holder = useRef(null);
  const widgetId = useRef(null);
  /* Kept in a ref so the render effect does not depend on the callback
     identity and re-create the widget on every parent render. Assigned in
     an effect, not during render - refs must not be written while
     rendering. */
  const onTokenRef = useRef(onToken);
  useEffect(() => { onTokenRef.current = onToken; }, [onToken]);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !holder.current || widgetId.current !== null) return;
        widgetId.current = turnstile.render(holder.current, {
          sitekey: siteKey,
          theme,
          callback: (token) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(''),
          'timeout-callback': () => onTokenRef.current(''),
          'error-callback': () => onTokenRef.current(''),
        });
      })
      .catch((err) => {
        console.error('[contact]', err.message);
        onTokenRef.current('');
      });

    return () => {
      cancelled = true;
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, theme]);

  useEffect(() => {
    if (!resetSignal || widgetId.current === null || !window.turnstile) return;
    window.turnstile.reset(widgetId.current);
    onTokenRef.current('');
  }, [resetSignal]);

  if (!siteKey) return null;
  return <div className="cp-turnstile" ref={holder} />;
}
