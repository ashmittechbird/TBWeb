import ServicePageLayout from '../../components/ServicePageLayout';
import SEO from '../../components/SEO';

const faqItems = [
  {
    q: 'What is ERPNext and how is it different from SAP?',
    a: 'ERPNext is an open-source, full-suite ERP built on the Frappe framework. Unlike SAP, it has zero licensing fees, is deeply customisable without vendor lock-in, and can be deployed on your own infrastructure or cloud. For mid-market companies, ERPNext delivers 80–90% of SAP\'s functionality at a fraction of the cost and implementation time. We also work with SAP Business One for clients who require it.',
  },
  {
    q: 'Do you build mobile apps?',
    a: 'Yes. We build cross-platform apps with Flutter and React Native, and native apps with Kotlin and Swift when performance requirements demand it. Every mobile app integrates with your backend systems - ERP, CRM, inventory - so data stays synchronised in real time.',
  },
  {
    q: 'Can you migrate our data from Tally or SAP Business One?',
    a: 'Yes. Data migration is a standard part of every ERP implementation. We extract data from your legacy system, clean and validate it, map it to ERPNext\'s data model, run parallel operations during transition, and verify completeness before go-live. We have migrated data from Tally, SAP B1, spreadsheets and custom databases.',
  },
  {
    q: 'What tech stack do you use for web applications?',
    a: 'Our primary web stack is React or Next.js on the frontend with Node.js or Python on the backend. We also work with Vue.js, Angular, .NET, Java (Spring) and PHP depending on client requirements and existing infrastructure. Database choices include PostgreSQL, MySQL, MariaDB and SQL Server. We recommend the stack based on your specific performance, scalability and team familiarity requirements.',
  },
  {
    q: 'Do you provide ongoing support and maintenance?',
    a: 'Yes. Every project includes a post-launch support period. For ongoing engagements, we offer maintenance contracts covering bug fixes, security patches, performance monitoring, feature enhancements and version upgrades. We don\'t disappear after go-live - we earn retention through quality, not contractual traps.',
  },
];

export default function SoftwareDevPage() {
  return (
    <>
      <SEO
        title="Software Development"
        description="Custom software development services - ERP implementation (ERPNext & Frappe), enterprise web apps, mobile apps, API integrations and SaaS products. Built for scale, maintained long after launch."
        keywords="software development, ERP implementation, ERPNext, Frappe, web application, mobile app development, API integration, SaaS, custom software, TechBird"
        faqItems={faqItems}
        serviceSchema={{ name: 'Software Development', description: 'Custom software development - ERP, web apps, mobile apps, APIs and SaaS products for enterprises.', category: 'Software Development' }}
      />
      <ServicePageLayout
      heroImage="/assets/software-dev-hero.webp"
      eyebrow="Software Development"
      title="Enterprise Software That Fits Your Operations - Not the Other Way Around"
      subtitle="ERP, web apps, mobile apps, APIs, SaaS and PaaS - built on ERPNext, Frappe and modern stacks. From discovery to production, maintained long after launch."
      breadcrumbLabel="Software Development"
      introParagraphs={[
        'Most enterprise software projects fail for the same reason: the vendor builds what was specified, not what was needed. Requirements documents become outdated before the first sprint ends. Off-the-shelf products require months of configuration to fit your workflows. Custom builds get abandoned when the original developer moves on.',
        'TechBird builds software with the operational reality in mind. Every project begins with a discovery phase that maps your actual processes, not the idealised version. We build incrementally, ship early, and adjust based on what users actually do - not what they said they would do during a demo.',
      ]}
      sections={[
        {
          heading: 'ERP Implementation (ERPNext & Frappe)',
          paragraphs: [
            'ERPNext is a full-suite, open-source ERP that covers manufacturing, inventory, HR, accounts, CRM and projects. Built on the Frappe framework, it is deeply customisable without forking the codebase. We implement ERPNext end-to-end: discovery, module configuration, data migration from legacy systems (Tally, SAP Business One, spreadsheets), user training and post-go-live support.',
          ],
          useCases: 'Manufacturing ERP, multi-location retail, professional services, distribution, education institutions.',
        },
        {
          heading: 'Custom Web Applications',
          paragraphs: [
            'When off-the-shelf tools don\'t fit, we build custom web applications from scratch. React and Next.js for high-performance frontends, Node.js or Python (Django, FastAPI) for backends, PostgreSQL or MariaDB for data. We architect for performance from sprint one - server-side rendering, edge caching, optimised database queries - not bolted on at the end.',
          ],
          useCases: 'SaaS platforms, internal business tools, customer portals, dashboards, booking systems.',
        },
        {
          heading: 'Mobile App Development',
          paragraphs: [
            'We build cross-platform mobile apps with Flutter and React Native, and native apps with Kotlin (Android) and Swift (iOS) when platform-specific performance matters. Every mobile app connects to your existing backend systems - ERP, CRM, inventory - so data flows in real time without manual sync.',
          ],
          useCases: 'Field service apps, inventory scanners, customer-facing apps, delivery tracking, employee self-service.',
        },
        {
          heading: 'API & Integration Development',
          paragraphs: [
            'Systems that don\'t talk to each other create data silos and manual work. We build REST and GraphQL APIs, payment gateway integrations, shipping and logistics APIs, e-commerce platform connectors, and custom middleware that connects your existing tools into a coherent stack.',
          ],
          useCases: 'Payment gateway integration, shipping API connectors, ERP-to-e-commerce sync, third-party API wrappers, webhook orchestration.',
        },
        {
          heading: 'SaaS & PaaS Products',
          paragraphs: [
            'For companies building their own software products, we provide end-to-end product engineering: multi-tenant architecture, subscription billing, user management, scalable cloud deployment and CI/CD pipelines. We have built SaaS products across HR, legal, finance and e-commerce - and we know the difference between a prototype and a production-grade product.',
          ],
        },
      ]}
      stackTitle="Technologies we work with every day"
      stackItems={[
        { label: 'ERP & Frameworks', tech: 'ERPNext, Frappe, Python, MariaDB, Redis' },
        { label: 'Frontend', tech: 'React, Next.js, Vue.js, Angular, Tailwind CSS' },
        { label: 'Backend', tech: 'Node.js, Python, .NET, Java, Spring, PHP, Express' },
        { label: 'Mobile', tech: 'Flutter, React Native, Android (Kotlin/Java), Xamarin, Cordova' },
        { label: 'Databases', tech: 'PostgreSQL, MySQL, MariaDB, SQL Server, CouchDB, Redis' },
        { label: 'Infrastructure', tech: 'AWS, Azure, Google Cloud, Docker, Nginx' },
      ]}
      faqItems={faqItems}
      ctaHeading="Start a Software Project"
      ctaText="Tell us what you need to build. We will map the architecture, set realistic timelines and deliver software that works in production - not just in demos."
    />
    </>
  );
}
