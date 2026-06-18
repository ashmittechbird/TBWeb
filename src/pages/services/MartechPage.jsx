import ServicePageLayout from '../../components/ServicePageLayout';
import SEO from '../../components/SEO';

const faqItems = [
  {
    q: 'What is a Customer Data Platform and do we need one?',
    a: 'A CDP is a system that collects customer data from every source - website, app, CRM, email, advertising - and builds a unified profile per customer that is available to every tool in your stack in real time. You need one when you have data sitting in silos that cannot talk to each other, when your personalisation is limited by fragmented identity data, or when your advertising is wasting budget targeting existing customers or the wrong audiences. Not every company needs a full CDP - sometimes proper CRM hygiene and analytics implementation solves the same problems at lower cost.',
  },
  {
    q: 'We already have HubSpot. Why are our automations not working?',
    a: 'The most common reasons HubSpot automations fail: dirty data (duplicate contacts, missing required fields, inconsistent lifecycle stages); poorly designed workflows with conflicting enrollment criteria; missing re-enrollment settings that prevent contacts from re-entering workflows after initial completion; and workflows built without considering the full customer journey. We audit existing HubSpot deployments and fix the underlying data and architecture issues before rebuilding automations on a clean foundation.',
  },
  {
    q: 'How do you handle first-party data as cookies are deprecated?',
    a: 'We implement server-side tracking that captures first-party signals directly from your infrastructure - bypassing browser-based cookie restrictions. We also set up hashed customer match audiences using email addresses you already own, giving you audience targeting in Google, Meta and LinkedIn that does not rely on third-party identifiers. For measurement, we implement modelled attribution that fills the gaps where individual-level tracking is no longer possible.',
  },
  {
    q: 'Can you integrate our MarTech stack with our ERP?',
    a: 'Yes. Connecting your CRM to ERPNext, SAP or custom ERP systems is a common engagement. Typical integrations include: bidirectional contact and account sync; order and revenue data flowing from ERP to CRM for customer value tracking; invoice status visible in CRM for customer success; and lead-to-invoice pipeline reporting across both systems.',
  },
];

export default function MartechPage() {
  return (
    <>
      <SEO
        title="MarTech Solutions"
        description="MarTech stack design and implementation - CRM (HubSpot, Salesforce), marketing analytics, attribution, marketing automation, customer data platforms and AdTech. Integrated systems, not disconnected subscriptions."
        keywords="MarTech, CRM, HubSpot, Salesforce, marketing automation, customer data platform, CDP, AdTech, marketing analytics, attribution, TechBird"
        faqItems={faqItems}
        serviceSchema={{ name: 'MarTech Solutions', description: 'CRM, AdTech, analytics dashboards, CDP and marketing automation.', category: 'Marketing Technology' }}
      />
      <ServicePageLayout
      accentColor="#f472b6"
      eyebrow="MarTech"
      title="MarTech Stacks That Connect Your CRM, Analytics and Advertising"
      subtitle="CRM implementation, analytics infrastructure, marketing automation and customer data platforms - designed as an integrated system, not a collection of disconnected subscriptions."
      breadcrumbLabel="MarTech"
      metrics={[
        { number: '40+', label: 'CRM implementations delivered' },
        { number: '12+', label: 'Analytics platforms supported' },
        { number: '80%', label: 'Average data quality improvement' },
      ]}
      introParagraphs={[
        'Marketing teams today operate across a dozen or more tools - a CRM for contacts, a separate platform for email campaigns, another for social scheduling, ad managers for each channel, and analytics dashboards that never quite agree on the numbers. The result is fragmented data, duplicated effort, and campaigns that rely on gut feeling rather than a unified view of the customer journey.',
        'TechBird designs and builds MarTech stacks that work as a system, not a collection of disconnected subscriptions. We audit what you have, identify the gaps and redundancies, design the integrations, and implement the tools that give your team a single, accurate picture of customer behaviour from first touch to closed deal.',
      ]}
      sections={[
        {
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
          color: '#f472b6',
          heading: 'CRM Implementation & Optimization',
          paragraphs: [
            'A CRM is only as valuable as the data inside it and the processes built around it. We implement and optimise HubSpot, Salesforce, Zoho and ERPNext CRM - configuring pipelines, custom objects, lifecycle stages and deal workflows that mirror how your sales team actually works. For existing deployments, we audit data hygiene, fix broken automations and build the reports your leadership team has been asking for.',
          ],
          useCases: 'Sales pipeline restructuring, CRM migration, Lead routing automation, Custom reporting, CRM-to-ERP sync',
        },
        {
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
          color: '#38bdf8',
          heading: 'Marketing Analytics & Attribution',
          paragraphs: [
            'When your GA4 dashboard, CRM and ad platforms report different conversion numbers, your marketing decisions are built on noise. We implement proper attribution infrastructure - UTM governance, server-side tracking, cross-platform identity resolution - that gives you a single, trustworthy source of truth for campaign performance, customer acquisition cost and revenue attribution.',
          ],
          useCases: 'GA4 implementation, Server-side tracking, Multi-touch attribution, Custom dashboards, Data pipeline design',
        },
        {
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
          color: '#a78bfa',
          heading: 'Marketing Automation',
          paragraphs: [
            'Manual marketing processes - individually sending follow-up emails, manually qualifying leads, copying data between platforms - are bottlenecks that limit scale. We design and build automation workflows that handle lead capture, qualification, nurturing, scoring and handoff to sales without manual intervention. Built in HubSpot, Marketo, ActiveCampaign or custom stacks.',
          ],
          useCases: 'Lead scoring workflows, Nurture sequences, Sales handoff automation, Re-engagement campaigns, Lead qualification',
        },
        {
          icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
          color: '#34d399',
          heading: 'Customer Data Platform (CDP)',
          paragraphs: [
            'A CDP unifies customer data from every touchpoint - website, app, CRM, email, advertising - into a single customer profile that updates in real time. This enables personalisation at scale, accurate audience segmentation and suppression lists that prevent ad waste. We implement Segment, Rudderstack and custom CDP architectures depending on data volume and integration requirements.',
          ],
          useCases: 'Identity resolution, Audience segmentation, Personalisation infrastructure, Suppression lists, Real-time activation',
        },
        {
          icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
          color: '#fbbf24',
          heading: 'AdTech & Programmatic',
          paragraphs: [
            'Programmatic advertising technology - DSPs, DMPs, ad servers and clean rooms - gives sophisticated advertisers capabilities that self-serve platforms cannot match. We set up and manage DV360, The Trade Desk and custom programmatic setups, including first-party data activation, lookalike audience building and measurement that survives the deprecation of third-party cookies.',
          ],
          useCases: 'DV360 setup, First-party data activation, Programmatic display, Retargeting infrastructure, Clean room measurement',
        },
      ]}
      stackTitle="MarTech platforms we implement and integrate"
      stackItems={[
        { label: 'CRM', tech: 'HubSpot, Salesforce, Zoho CRM, ERPNext CRM, Pipedrive' },
        { label: 'Analytics', tech: 'GA4, Mixpanel, Amplitude, Heap, Segment, Rudderstack' },
        { label: 'Automation', tech: 'HubSpot, Marketo, ActiveCampaign, Brevo, Klaviyo' },
        { label: 'AdTech', tech: 'Google Ads, Meta, DV360, The Trade Desk, CM360' },
        { label: 'Data & CDP', tech: 'Segment, Rudderstack, BigQuery, Looker, Airbyte' },
        { label: 'Tag Management', tech: 'GTM, Tealium, server-side GTM, Cloudflare Workers' },
      ]}
      faqItems={faqItems}
      ctaHeading="Build a MarTech Stack That Actually Works"
      ctaText="Tell us about your current tools and the data problems you are trying to solve. We will audit what you have and design the integrations that close the gaps."
    />
    </>
  );
}
