/* The business's name, address, phone and hours - stated ONCE.

   Local search ranks a business partly on how consistently its name, address
   and phone (NAP) read everywhere they appear: the site, the schema.org markup,
   the Google Business Profile and directories. The address was previously typed
   out by hand in the footer, the contact page, the privacy policy, the terms,
   and three separate schema blocks, so it could only stay consistent by luck.
   Every one of those now renders from here, and so does the schema, which is
   a single entity that the other pages point at by @id.

   Plain values only, no browser or env imports: scripts/lib/llms.mjs reads this
   file in Node to put the same details in llms.txt. */

import { FOUNDED } from './siteFacts.js';

export const SITE_URL = 'https://techbird.in';
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_NAME = 'TechBird IT Services';

/* ── Office ────────────────────────────────────────────────────────── */
export const OFFICE = {
  streetAddress: 'Unit 312-314, SOHO by Panchsheel, Kharadi',
  locality: 'Pune',
  region: 'Maharashtra',
  postalCode: '411014',
  countryCode: 'IN',
  country: 'India',

  phone: '+919767623456',          // for tel: links and schema
  phoneDisplay: '+91 97676 23456', // as people read it
  email: 'connect@techbirdit.in',

  /* Google Maps' own pin for the building ("SOHO by Panchshil"): the place
     Google resolves this address to. NOT yet checked against TechBird's Google
     Business Profile pin - confirm it there, since the profile is what local
     search treats as authoritative. */
  geo: { latitude: 18.5505, longitude: 73.9628 },

  /* Working hours as stated on the contact page. */
  hours: {
    label: 'Mon – Fri, 9 AM – 7 PM IST',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
};

/* "Unit 312-314, SOHO by Panchsheel, Kharadi, Pune 411014" - the form used on
   the contact page and in the footer. */
export const ADDRESS_LINE = `${OFFICE.streetAddress}, ${OFFICE.locality} ${OFFICE.postalCode}`;
/* The same address with state and country, as the legal pages print it. */
export const ADDRESS_FULL = `${ADDRESS_LINE}, ${OFFICE.region}, ${OFFICE.country}`;

/* Link that opens the place in Google Maps. */
export const MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${OFFICE.streetAddress}, ${OFFICE.locality} ${OFFICE.postalCode}`)}`;

/* The embedded map, centred on the office's coordinates. This form needs no API
   key and is served from www.google.com, which the Content-Security-Policy's
   frame-src already allows. */
export const MAP_EMBED_SRC =
  `https://www.google.com/maps?q=${OFFICE.geo.latitude},${OFFICE.geo.longitude}&z=17&hl=en&output=embed`;

/* ── Profiles ──────────────────────────────────────────────────────── */
/* PENDING: the Google Business Profile link, to be supplied. Once set it is
   added to sameAs below, which is how search engines tie this site to the
   profile. */
export const GOOGLE_BUSINESS_PROFILE_URL = null;

export const SAME_AS = [
  'https://www.linkedin.com/company/techbirdit/',
  'https://www.instagram.com/techbirdit/',
  ...(GOOGLE_BUSINESS_PROFILE_URL ? [GOOGLE_BUSINESS_PROFILE_URL] : []),
];

/* ── Where the work is done ────────────────────────────────────────── */
/* Replaces the old 5,000 km GeoCircle around Pune, which claimed an area wider
   than any real service area. India stays because engagements are delivered
   nationally; the two cities are the local market.

   Note the About page also says the team works with clients in the UK, US and
   UAE. They are not listed here - a local-search entity should describe where it
   is local - so if they should appear, add them to this list. */
export const SERVICE_AREA = [
  { '@type': 'Country', name: 'India' },
  { '@type': 'City', name: 'Pune' },
  { '@type': 'City', name: 'Pimpri-Chinchwad' },
];

/* ── People ────────────────────────────────────────────────────────── */
const FOUNDERS = [
  { '@type': 'Person', name: 'Amol Sane', jobTitle: 'Co-Founder & CEO', sameAs: 'https://www.linkedin.com/in/amol-sane-b8675316/' },
  { '@type': 'Person', name: 'Ekansh Jain', jobTitle: 'Co-Founder & CTO', sameAs: ['https://www.linkedin.com/in/jainekansh1512/', 'https://ekanshjain.com'] },
];
const LEADERS = [
  { '@type': 'Person', name: 'Amit Thakur', jobTitle: 'Partner & CBO', sameAs: 'https://www.linkedin.com/in/amitthakurtechbirdit/' },
  { '@type': 'Person', name: 'Shubham Agarwal', jobTitle: 'CFO', sameAs: 'https://www.linkedin.com/in/shubham-a-54aa78271/' },
  { '@type': 'Person', name: 'Purvesh Jain', jobTitle: 'CMO', sameAs: 'https://www.linkedin.com/in/jainpurvesh/' },
];

const KNOWS_ABOUT = [
  'Enterprise Resource Planning', 'ERPNext', 'Frappe Framework',
  'Artificial Intelligence', 'Machine Learning', 'Custom Software Development',
  'Cloud Computing', 'DevOps', 'React', 'Python', 'Flutter',
  'Digital Transformation', 'SaaS', 'Marketing Technology',
];

/* ── The one schema.org entity ─────────────────────────────────────── */
/* ProfessionalService is a LocalBusiness subtype, so it carries the address,
   geo and hours that local search reads while still describing an IT services
   firm. Other schema blocks refer to it with organizationRef() rather than
   re-declaring an Organization of their own - there used to be two on /about and
   on /contact, with different addresses.

   Deliberately NOT stated: numberOfEmployees. The site gives different team
   sizes in different places (20 here before, 15+ in llms.txt, 13 people listed
   on the About page); it returns once the real figure is confirmed. */
export function organizationSchema({ description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
    image: `${SITE_URL}/og-image.png`,
    description,
    foundingDate: String(FOUNDED),

    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE.streetAddress,
      addressLocality: OFFICE.locality,
      addressRegion: OFFICE.region,
      postalCode: OFFICE.postalCode,
      addressCountry: OFFICE.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: OFFICE.geo.latitude,
      longitude: OFFICE.geo.longitude,
    },
    hasMap: MAPS_LINK,
    telephone: OFFICE.phone,
    email: OFFICE.email,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: OFFICE.hours.days,
      opens: OFFICE.hours.opens,
      closes: OFFICE.hours.closes,
    }],

    areaServed: SERVICE_AREA,
    knowsAbout: KNOWS_ABOUT,
    sameAs: SAME_AS,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: OFFICE.phone,
      email: OFFICE.email,
      contactType: 'sales',
      availableLanguage: ['English', 'Hindi'],
    },
    founder: FOUNDERS,
    employee: LEADERS,
  };
}

/* A reference to the entity above, for other schema blocks to use. */
export const organizationRef = () => ({ '@id': ORG_ID });
