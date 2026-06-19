# TechBird IT Services - Website

Corporate website for TechBird IT Services, built with React 19 and Vite 8. Features service pages, product showcases, case studies, team profiles, and a contact form with FAQ sections.

## Tech Stack

- **Framework**: React 19 + React Router DOM 7
- **Build tool**: Vite 8
- **Animation**: GSAP 3 (ScrollTrigger) + Three.js
- **SEO**: react-helmet-async with JSON-LD structured data
- **Fonts**: Space Grotesk + Manrope (self-hosted WOFF2)

## Prerequisites

- Node.js 18+ and npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173` by default.

## Production Build

```bash
npm run build
npm run preview   # preview the build locally
```

## Project Structure

```
public/
  robots.txt        # Crawl directives + sitemap reference
  sitemap.xml       # XML sitemap (22 pages)
  llms.txt          # LLM-readable site summary for GEO/AEO
  _redirects        # SPA fallback for static hosting
  _headers          # Cache-Control headers for static hosting
  offline.html      # Offline fallback page
  fonts/            # Self-hosted WOFF2 font files
src/
  App.jsx           # Route definitions
  main.jsx          # Entry point with BrowserRouter + HelmetProvider
  components/       # Shared UI components (Navbar, Footer, SEO, etc.)
  pages/            # Route-level page components
  pages/services/   # Service sub-pages (AI, Cloud, Software Dev, etc.)
  pages/products/   # Product sub-pages (ERP, HRMS, CRM, etc.)
  styles/           # CSS files (styles.css, inner.css, about.css, etc.)
  hooks/            # Custom hooks (useAppInit, useScrollAnimations)
  data/             # Static data (case studies)
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values. No secrets should be committed.

## Linting

```bash
npm run lint
```

## Deployment

The project is configured for static hosting (Netlify/Cloudflare Pages) with:
- `_redirects` for SPA client-side routing
- `_headers` for cache control (immutable for versioned assets, no-cache for HTML)
