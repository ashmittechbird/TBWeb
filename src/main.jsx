import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/styles.css';
import './styles/FlowingMenu.css';
import App from './App.jsx';

/* Register GSAP plugins once at the top level */
gsap.registerPlugin(ScrollTrigger);

/* Prevent GSAP from crashing when elements are removed during route transitions */
gsap.config({ nullTargetWarn: false });

/* NOTE: React StrictMode removed: it double-renders in dev which
   causes GSAP's _getMatrix DOM helper to fail (removeChild errors).
   GSAP is fundamentally incompatible with StrictMode's double-invoke. */
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

const container = document.getElementById('root');

/* scripts/prerender.mjs writes each page's HTML into #root and stamps the
   route it rendered on data-route. Hydrate only when that is the page the
   browser is actually on.

   They can disagree when a server answers a URL with some other page's
   file - most likely nginx not yet configured to serve per-route files, so
   /about falls through to the home page's HTML. Hydrating that would not
   match what App renders for /about. In that case, and in `vite dev`, where
   nothing is prerendered, render from scratch instead - slower, but correct. */
const route = location.pathname.replace(/\/+$/, '') || '/';
const prerendered = container.hasChildNodes() && container.dataset.route === route;

if (prerendered) {
  hydrateRoot(container, app);
} else {
  /* The prerendered <head> tags belong to a different page; drop them so the
     client does not add this page's tags beside the wrong ones. */
  discardPrerenderedHead();
  createRoot(container).render(app);
}

/* The build wraps the head tags it injects in these markers. */
function discardPrerenderedHead() {
  const nodes = [...document.head.childNodes];
  const start = nodes.findIndex((n) => n.nodeType === 8 && n.data === 'prerender:start');
  const end = nodes.findIndex((n) => n.nodeType === 8 && n.data === 'prerender:end');
  if (start === -1 || end === -1) return;
  nodes.slice(start, end + 1).forEach((n) => n.remove());
}
