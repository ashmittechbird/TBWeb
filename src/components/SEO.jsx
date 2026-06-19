import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE = 'https://www.techbird.in';
const SITE_NAME = 'TechBird IT Services';
const DEFAULT_TITLE = 'TechBird IT Services - Driving Digital Transformation';
const DEFAULT_DESC = 'Premier technology partner for startups to enterprises. Custom software development, AI solutions, cloud & DevOps, ERP (ERPNext), mobile apps, and marketing technology. 50+ enterprise clients in Pune, India.';
const DEFAULT_IMG = `${SITE}/og-image.png`;

/* Provider entity (reused across schemas) */
const PROVIDER = {
  '@type': 'Organization',
  name: 'TechBird IT Services',
  url: SITE,
};

export default function SEO({
  title,
  description,
  keywords,
  type = 'website',
  image,
  noindex = false,
  schema,
  faqItems,
  /* GEO / AEO specific */
  serviceSchema,       // { name, description, category } - for /services/* pages
  softwareSchema,      // { name, description, category, os } - for /products/* pages
}) {
  const { pathname } = useLocation();
  const canonical = `${SITE}${pathname === '/' ? '' : pathname}`;
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDesc = description || DEFAULT_DESC;
  const pageImg = image || DEFAULT_IMG;

  /* ── Organization schema (always present) ── */
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TechBird IT Services',
    url: SITE,
    logo: `${SITE}/logo.webp`,
    description: DEFAULT_DESC,
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: 18.5204, longitude: 73.8567 }, geoRadius: '5000 km' },
    ],
    knowsAbout: [
      'Enterprise Resource Planning', 'ERPNext', 'Frappe Framework',
      'Artificial Intelligence', 'Machine Learning', 'Custom Software Development',
      'Cloud Computing', 'DevOps', 'React', 'Python', 'Flutter',
      'Digital Transformation', 'SaaS', 'Marketing Technology',
    ],
    sameAs: [
      'https://www.linkedin.com/company/techbird-it-services/',
      'https://www.instagram.com/techbirdit/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919766661836',
      email: 'connect@techbirdit.in',
      contactType: 'sales',
      availableLanguage: ['English', 'Hindi'],
    },
  };

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
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

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
