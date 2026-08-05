/* ══════════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH for every product surface on the site.

   Consumed by: Navbar, InnerNavbar, Footer, ProductsPage, FlowingMenu.
   Never hardcode a product list anywhere else - import from here.

   To launch a product:  set live: true  (and add its route in App.jsx)
   To hide a product:    set live: false (route can stay; nothing links it)
   ══════════════════════════════════════════════════════════════════ */

export const PRODUCTS = [
  {
    id: 'hrms',
    name: 'HRMS',
    navLabel: 'HRMS',
    route: '/products/hrms',
    cat: 'HR Automation',
    color: '#34d399',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    image: '/assets/products/hrms.webp',
    live: true,
    desc: 'Payroll, attendance, leave, recruitment, appraisals and statutory compliance: the full employee lifecycle in one system.',
    caps: [
      'Automated payroll with statutory deductions',
      'Biometric & mobile attendance',
      'Leave and holiday management',
      'Performance appraisal workflows',
      'Recruitment and digital onboarding',
      'ESI, PF, compliance reports',
    ],
  },
  {
    id: 'crm',
    name: 'Lead & Sales CRM',
    navLabel: 'Lead & Sales CRM',
    route: '/products/crm',
    cat: 'Sales Automation',
    color: '#38bdf8',
    icon: 'M22 3H2l8 9.46V19l4 2V12.46L22 3z',
    image: '/assets/products/crm.webp',
    live: true,
    desc: 'Lead capture, pipeline stages, call logs, campaigns and dashboards. Every enquiry tracked from first touch to closed deal.',
    caps: [
      'Lead capture with source attribution',
      'Lifecycle stages and deal scoring',
      'Call logs with recordings',
      'WhatsApp and email integration',
      'Campaigns and meeting scheduling',
      'Sales reports and dashboards',
    ],
  },
  {
    id: 'dms',
    name: 'Document Management',
    navLabel: 'Document Management',
    route: '/products/document-management',
    cat: 'Enterprise DMS',
    color: '#f59e0b',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
    image: '/assets/products/dms.webp',
    live: true,
    desc: 'Centralised storage, smart folder hierarchy, full-text search, bulk upload and role-based access. Paper chaos eliminated at scale.',
    caps: [
      'Centralised library with folder hierarchy',
      'Full-text search across all documents',
      'Bulk upload and attachment tracking',
      'Role-based access permissions',
      'Categories and metadata tagging',
      'Complete audit trail',
    ],
  },
  {
    id: 'litigation',
    name: 'Litigation Management',
    navLabel: 'Litigation Management',
    route: '/products/litigation-management',
    cat: 'Legal Case Tracking',
    color: '#818cf8',
    icon: 'M12 3v18M5 6l7-3 7 3M3 18h18M6 14l3-3M18 14l-3-3',
    image: '/assets/products/litigation.webp',
    live: true,
    desc: 'Case dockets, advance rulings, ledgers, refunds and customs matters with stage-wise intelligence on every rupee at risk.',
    caps: [
      'Key metrics dashboard with amount at risk',
      'Stage-wise case intelligence',
      'Litigation dockets and hearing dates',
      'Advance ruling tracking',
      'Refunds and customs matters',
      'Reports and deadline alerts',
    ],
  },
  {
    id: 'travel',
    name: 'Travel & Expense',
    navLabel: 'Travel & Expense',
    route: '/products/travel-expense',
    cat: 'Expense Management',
    color: '#22d3ee',
    icon: 'M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7l-8.2-1.8L3 7l7 4-2 4-4 1 1 3 4-1 4 7 2-1.8z',
    image: '/assets/products/travel.webp',
    live: true,
    desc: 'Trip creation, approval, on-trip expense logging, report submission and reimbursement: the whole travel journey in one workflow.',
    caps: [
      'Trip creation with destination & purpose',
      'Manager and finance approval workflow',
      'On-trip expense logging with receipts',
      'Non-travel expense management',
      'Imprest advance tracking',
      'Settlement and reimbursement processing',
    ],
  },

  /* ── Not launched: routes still resolve for old inbound links,
        but these never appear in any menu, listing or sitemap. ── */
  {
    id: 'erp',
    name: 'Custom ERP',
    navLabel: 'Custom ERP',
    route: '/products/erp',
    cat: 'ERPNext-Powered',
    color: '#a78bfa',
    icon: 'M3 3h7v7H3zM14 3h7v7H14zM3 14h7v7H3zM14 14h7v7H14z',
    image: '/assets/products/erp.webp',
    live: false,
    desc: 'Full-suite ERP on ERPNext covering manufacturing, finance, HR, supply chain and CRM, configured to your workflows.',
    caps: [],
  },
  {
    id: 'practice',
    name: 'Practice Management',
    navLabel: 'Practice Management',
    route: '/products/practice-management',
    cat: 'Healthcare & Legal',
    color: '#fbbf24',
    icon: 'M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 8h6M9 12h6M9 16h4',
    image: '/assets/products/practice.webp',
    live: false,
    desc: 'Appointments, patient or case records, billing and compliance for clinics, hospitals and law firms at any scale.',
    caps: [],
  },
  {
    id: 'visitor',
    name: 'Visitor Management',
    navLabel: 'Visitor Management',
    route: '/products/visitor-management',
    cat: 'Front-Desk Automation',
    color: '#a3e635',
    icon: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
    image: '/assets/products/visitor.webp',
    live: false,
    desc: 'Digital check-in, ID verification, host alerts, badge printing and visitor log analytics, replacing paper registers.',
    caps: [],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    navLabel: 'E-Commerce Platform',
    route: '/products/ecommerce',
    cat: 'Multi-Vendor Commerce',
    color: '#f472b6',
    icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
    image: '/assets/products/ecommerce.webp',
    live: false,
    desc: 'Multi-vendor marketplace or single-brand storefront with inventory, payments, shipping integration and analytics.',
    caps: [],
  },
];

/* Everything the site is allowed to advertise. */
export const LIVE_PRODUCTS = PRODUCTS.filter((p) => p.live);

/* Convenience lookups */
export const PRODUCT_BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
export const LIVE_PRODUCT_COUNT = LIVE_PRODUCTS.length;

/* Nav/menu shape: { label, to, color, icon } */
export const productNavItems = () =>
  LIVE_PRODUCTS.map((p) => ({ label: p.navLabel, to: p.route, color: p.color, icon: p.icon }));

/* StaggeredMenu subItem shape: { label, link } */
export const productSubItems = () =>
  LIVE_PRODUCTS.map((p) => ({ label: p.navLabel, link: p.route }));
