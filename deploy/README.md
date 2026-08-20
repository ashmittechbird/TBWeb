# Deploying to techbird.in

The live site is served by nginx from a git checkout on the server. A push to
GitHub does **not** update it — Vercel rebuilds on push, this box does not.

## Every deploy

```bash
cd /home/tbadmin/techbird-web/repo
git pull
npm ci
npm run build
```

That's it. No environment variables are required: everything the contact form
needs is either committed or derived at runtime (see below). Serve `dist/`.

## One-time setup

### nginx

**No proxy is needed for the contact form.** The form calls
`https://mailbird.techbird.in` directly, and `allow_cors` is configured there,
so the browser is allowed to read the response. Verified: the endpoint returns
`Access-Control-Allow-Origin: https://techbird.in`.

All nginx has to do is serve `dist/` and send unknown paths to `index.html`, so
React Router can handle them:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

[`nginx-techbird.conf.example`](./nginx-techbird.conf.example) has that plus
optional cache headers, and a `/mailbird/` proxy block that is **no longer
required** — keep it only if you ever set `VITE_MAILBIRD_URL=/mailbird`.

After changing nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Mailbird

The contact form needs a **Website Master** record whose `domain_name` is
`techbird.in`, with `https://techbird.in` on its allowed-origins list. That
record already exists and already allows that origin — verified against the
live endpoint.

Nothing to do unless the domain changes.

### Cloudflare Turnstile — check this before calling the deploy done

Turnstile widgets are bound to a hostname allowlist in the Cloudflare
dashboard, separate from anything in this repo or in Mailbird. The widget is
confirmed working on `techbird-react.vercel.app`; whether **`techbird.in`** is
on that same allowlist has not been verified, and it cannot be from outside the
dashboard.

If it is missing, the challenge fails with error `110200`, no token is issued,
and the form shows *"The verification check couldn't load…"* with the submit
button disabled — the form looks broken even though the code and nginx are
correct.

So after the first deploy, open `/contact` and confirm the widget solves. If it
does not, add `techbird.in` to the widget's allowed hostnames in the Turnstile
dashboard. The browser console will say `[Cloudflare Turnstile] Error: 110200`
when this is the cause.

## How the contact form resolves its config

No env vars needed, deliberately — `VITE_*` values are baked in at build time,
and the production build runs on this server, so anything env-only would have
to be configured here and would silently break the form if forgotten.

| value | default | override |
|---|---|---|
| endpoint base | `https://mailbird.techbird.in` (direct, CORS allowed) | `VITE_MAILBIRD_URL` |
| `site` | `window.location.hostname` → `techbird.in` | `VITE_MAILBIRD_SITE` |
| Turnstile site key | committed in `src/lib/mailbird.js` | `VITE_TURNSTILE_SITE_KEY` |

The Turnstile **site** key is public by design — it ships in the HTML of every
page that renders the widget — so committing it exposes nothing. The matching
**secret** key lives only on the Mailbird server and must never enter this repo.

Because `site` follows the hostname, the same build works on techbird.in and on
the Vercel deployment, each posting to its own Website Master record.

## Checking a deploy landed

Content-hashed filenames make this exact. Compare a local build against the
server:

```bash
npm run build && grep -oE 'assets/index-[A-Za-z0-9_-]+\.(js|css)' dist/index.html
curl -sS https://techbird.in/ | grep -oE 'assets/index-[A-Za-z0-9_-]+\.(js|css)'
```

Matching hashes mean the deployed build is the current commit.

Then submit a real enquiry and confirm it arrives. On failure the visitor sees
an error plus the fallback email, and the browser console names the actual
cause — the form logs the server's own error message plus an explanation for
the two config faults that look like nothing from the outside ("Request origin
not allowed" and a captcha rejection in a build with no key).

## Known gotcha: local development

This Turnstile widget is not allowlisted for `localhost`, so the challenge
fails there with error 110200, no token is produced, and the submit button
stays disabled. That is expected. To work on the form locally, either add
`localhost` to the widget's hostnames in the Cloudflare dashboard, or put
`VITE_TURNSTILE_SITE_KEY=` (empty) in a local `.env` to hide the widget.
