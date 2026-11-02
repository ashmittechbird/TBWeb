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

The build also **generates** `dist/sitemap.xml` and `dist/llms.txt`. Neither is
edited by hand: the sitemap lists every indexable page and leaves out
`noindex` ones (unlaunched products), and `llms.txt` takes its product list from
`src/data/products.js`, so it cannot claim a product that is not live.

### Sitemap dates

`<lastmod>` comes from `scripts/lastmod.json` and moves only when a page's
content actually changes. The build never edits that file (so it cannot dirty the
checkout `git pull` needs). When you change a page, on your own machine:

```bash
npm run seo:lastmod        # pages whose content changed get today's date
git add scripts/lastmod.json
```

A normal `npm run build` prints a warning listing any page that has changed since
its recorded date, so a forgotten update is visible rather than silent.

## One-time setup

### nginx

**No proxy is needed for the contact form.** The form calls
`https://mailbird.techbird.in` directly, and `allow_cors` is configured there,
so the browser is allowed to read the response. Verified: the endpoint returns
`Access-Control-Allow-Origin: https://techbird.in`.

The build **prerenders every public route** to its own file: `/about` is
`dist/about.html`, `/products/crm` is `dist/products/crm.html`, and `/` is
`dist/index.html`. That is what lets crawlers that do not run JavaScript (Bing,
ChatGPT, Perplexity, Claude) read each page's own title, canonical, headings
and schema. nginx has to map the clean URL to that file:

```nginx
error_page 404 /404.html;
location = /404.html { internal; }

rewrite ^/(.+)/$ /$1 permanent;

location / {
    try_files $uri $uri.html $uri/index.html =404;
}
```

> **Change `location /` when you deploy this build.** The old
> `try_files $uri $uri/ /index.html` still *works* - the browser recovers and
> shows the right page - but it answers every URL, including ones that do not
> exist, with `200` and the home page's HTML. Crawlers then see the home page's
> title and canonical on every route (the prerendering is wasted), and treat
> every mistyped URL as a live page.
>
> Check it with:
>
> ```bash
> curl -s https://techbird.in/about | grep -o '<title>[^<]*'
> # want: <title>About Us | TechBird IT Services
>
> curl -s -o /dev/null -w '%{http_code}\n' https://techbird.in/no-such-page
> # want: 404
> ```
>
> Why each part:
> - `$uri.html` maps `/about` to `about.html`. It goes before `=404`.
> - There is **no `/index.html` fallback**: every real route has its own file, so
>   a path that matches none is a URL that does not exist.
> - `$uri/` is not used for pages: it would 301 `/about` to `/about/`, against the
>   page's canonical. The `rewrite` strips a trailing slash with one redirect
>   instead. (`$uri/index.html` is only there so `/` itself resolves.)
> - `404.html` is the prerendered not-found page: `noindex`, no canonical.
>
> On Vercel the same behaviour comes from `cleanUrls`, `trailingSlash: false`
> and the absence of a catch-all rewrite in `vercel.json`.

The build also writes `dist-ssr/`, a server bundle that exists only so the
prerender step can run. It is not served and is ignored by git.

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
