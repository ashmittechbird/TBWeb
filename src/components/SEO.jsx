import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { UNLAUNCHED_ROUTES } from '../data/products';
import { CLIENTS_PHRASE } from '../data/siteFacts';
import { organizationSchema, organizationRef, SITE_URL, SITE_NAME } from '../data/organization';

const SITE = SITE_URL;
const DEFAULT_TITLE = 'TechBird IT Services - Driving Digital Transformation';
const DEFAULT_DESC = `Premier technology partner for startups to enterprises. Custom software development, AI solutions, cloud & DevOps, ERP (ERPNext), mobile apps, and marketing technology. ${CLIENTS_PHRASE} in Pune, India.`;
const DEFAULT_IMG = `${SITE}/og-image.png`;

/* Every schema block that needs the business refers to the one entity in
   src/data/organization.js by @id instead of declaring its own Organization. */
const PROVIDER = organizationRef();

export default function SEO({
  title,
  description,
  keywords,
  type = 'website',
  image,
  noindex: noindexProp = false,
  schema,
  faqItems,
  /* GEO / AEO specific */
  serviceSchema,       // { name, description, category } - for /services/* pages
  softwareSchema,      // { name, description, category, os } - for /products/* pages
}) {
  const { pathname } = useLocation();
  /* A product that is not launched may still be reached through an old link;
     keep it out of the index without anyone having to remember to flag it. */
  const noindex = noindexProp || UNLAUNCHED_ROUTES.has(pathname);
  /* The home page's canonical keeps its trailing slash (https://techbird.in/),
     matching the sitemap and og:url. Every other route has none. */
  const canonical = `${SITE}${pathname}`;
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDesc = description || DEFAULT_DESC;
  const pageImg = image || DEFAULT_IMG;

  /* ── Organization schema (always present) ── */
  const orgSchema = organizationSchema({ description: DEFAULT_DESC });

  /* ── WebSite schema (homepage only) ── */
  const websiteSchema = pathname === '/' ? {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE,
    description: DEFAULT_DESC,
    publisher: PROVIDER,
  } : null;

  /* ── BreadcrumbList schema ── */
  const crumbs = pathname.split('/').filter(Boolean);
  const breadcrumbSchema = crumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      ...crumbs.map((seg, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        item: `${SITE}/${crumbs.slice(0, i + 1).join('/')}`,
      })),
    ],
  } : null;

  /* ── FAQ schema (AEO - answer engine optimized) ── */
  const faqSchema = faqItems?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  /* ── Service schema (GEO - for /services/* pages) ── */
  const svcSchema = serviceSchema ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceSchema.name,
    description: serviceSchema.description,
    provider: PROVIDER,
    areaServed: { '@type': 'Country', name: 'India' },
    serviceType: serviceSchema.category || serviceSchema.name,
    url: canonical,
  } : null;

  /* ── SoftwareApplication schema (GEO - for /products/* pages) ── */
  const swSchema = softwareSchema ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: softwareSchema.name,
    description: softwareSchema.description,
    applicationCategory: softwareSchema.category || 'BusinessApplication',
    operatingSystem: softwareSchema.os || 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Custom pricing - contact for a quote',
    },
    author: PROVIDER,
    url: canonical,
  } : null;

  /* ── Speakable schema (voice search / AEO) ── */
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDesc,
    url: canonical,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.ip2-title', '.big-type', '.lead', 'meta[name="description"]'],
    },
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE },
    about: PROVIDER,
  };

  return (
    <Helmet>
      {/* ── Core Meta ── */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      {/* A noindex page has nothing to consolidate, and a canonical alongside
          noindex sends search engines two opposing signals about the URL. */}
      {!noindex && <link rel="canonical" href={canonical} />}
      {/* Exactly one robots tag per page. This used to live in index.html as a
          site-wide "index, follow" and the not-found page added "noindex" on top,
          leaving two conflicting directives. */}
      <meta
        name="robots"
        content={noindex
          ? 'noindex,nofollow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />

      {/* ── Open Graph ── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={pageImg} />
      <meta property="og:locale" content="en_IN" />

      {/* ── Twitter ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImg} />

      {/* ── GEO / Local SEO ── */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Pune" />

      {/* ── AEO / Entity signals ── */}
      <meta name="author" content="TechBird IT Services" />
      <meta name="publisher" content="TechBird IT Services" />

      {/* ── Schema Markup ── */}
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      {websiteSchema && <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {svcSchema && <script type="application/ld+json">{JSON.stringify(svcSchema)}</script>}
      {swSchema && <script type="application/ld+json">{JSON.stringify(swSchema)}</script>}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
