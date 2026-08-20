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
export default function Turnstile({ siteKey, onToken, onUnavailable, resetSignal = 0, theme = 'light' }) {
  const holder = useRef(null);
  const widgetId = useRef(null);
  /* Kept in refs so the render effect does not depend on callback identity
     and re-create the widget on every parent render. Assigned in an effect,
     not during render - refs must not be written while rendering. */
  const onTokenRef = useRef(onToken);
  useEffect(() => { onTokenRef.current = onToken; }, [onToken]);
  const onUnavailableRef = useRef(onUnavailable);
  useEffect(() => { onUnavailableRef.current = onUnavailable; }, [onUnavailable]);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    /* A failed challenge leaves the token empty, which keeps the submit
       button disabled. Without telling the parent, the visitor is left with a
       dead button and no explanation - so report unavailability separately
       from "not solved yet". Causes seen in the wild: Turnstile error 110200
       (the hostname is not on the widget's allowlist in Cloudflare), a
       blocked challenges.cloudflare.com, or a Cloudflare outage. */
    const fail = (why) => {
      console.error('[contact] Turnstile unavailable:', why);
      onTokenRef.current('');
      if (onUnavailableRef.current) onUnavailableRef.current(why);
    };

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !holder.current || widgetId.current !== null) return;
        widgetId.current = turnstile.render(holder.current, {
          sitekey: siteKey,
          theme,
          callback: (token) => onTokenRef.current(token),
          /* Expiry and timeout are recoverable - the widget re-challenges by
             itself, so clear the token but do not declare it broken. */
          'expired-callback': () => onTokenRef.current(''),
          'timeout-callback': () => onTokenRef.current(''),
          'error-callback': (code) => fail(`error-callback ${code ?? ''}`.trim()),
        });
      })
      .catch((err) => fail(err.message));

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
