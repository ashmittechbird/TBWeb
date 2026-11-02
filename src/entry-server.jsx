/* Server entry - used only by scripts/prerender.mjs at build time.

   Renders one route to static HTML so the raw HTML a crawler downloads
   already contains the page's own title, description, canonical, H1, body
   copy and JSON-LD. The browser then takes over from src/main.jsx. */

import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

async function readAll(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out + decoder.decode();
}

/* On React 19, react-helmet-async renders its children as ordinary elements
   and leaves placement to React, which treats <title>, <meta> and <link> as
   "hoistables": when rendering into a container rather than a whole
   document, they come out at the very START of the markup, ahead of the
   page content. (The old helmetContext.helmet server API is not populated
   in this mode.)

   Peel that leading run off so the build can put it in <head>. It is a
   prefix match on purpose - it stops at the first thing that is not one of
   these three tags, so page content can never be pulled into the head.

   JSON-LD <script> tags are NOT hoistables; they stay where <SEO> rendered
   them, inside the body. Crawlers read JSON-LD anywhere in the document, and
   leaving them in place keeps the markup identical to what the client
   renders, which hydration requires. */
const HOISTED = /^\s*(?:<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/;

function splitHoisted(markup) {
  let rest = markup;
  const tags = [];
  for (let m = rest.match(HOISTED); m; m = rest.match(HOISTED)) {
    tags.push(m[0].trim());
    rest = rest.slice(m[0].length);
  }
  return { head: tags.join('\n    '), html: rest };
}

export async function render(url) {
  const { prelude } = await prerender(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  /* prerender (unlike renderToString) waits for every Suspense boundary,
     which matters here: all page routes are React.lazy. */
  return splitHoisted(await readAll(prelude));
}
