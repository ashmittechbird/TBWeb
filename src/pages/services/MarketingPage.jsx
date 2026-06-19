import ServicePageLayout from '../../components/ServicePageLayout';
import SEO from '../../components/SEO';

const faqItems = [
  {
    q: 'How long does it take to see results from SEO?',
    a: 'SEO is a compounding channel - results build over time rather than appearing immediately. Technical fixes and low-competition keyword wins can produce measurable traffic improvements within 4–8 weeks. Building authority and ranking for competitive terms typically takes 6–12 months of consistent execution. We set realistic expectations upfront and measure progress against organic traffic, keyword rankings and lead conversion, not just position changes.',
  },
  {
    q: 'What is included in a GTM strategy engagement?',
    a: 'A GTM strategy engagement includes: market and competitive analysis; ideal customer profile and buyer persona development; positioning and messaging framework; channel selection and prioritisation; content and campaign strategy; launch timeline and milestone mapping; KPI framework and attribution setup. Deliverables are documented, not just presented in slides.',
  },
  {
    q: 'Do you run paid campaigns on a percentage-of-spend model?',
    a: 'No. We charge a fixed management fee, not a percentage of ad spend. Percentage-of-spend models create an incentive to increase budget regardless of performance. Our fee is based on the scope of work - platforms managed, campaign complexity, reporting cadence - and is independent of what you spend on media.',
  },
  {
    q: 'Can you work alongside our internal marketing team?',
    a: 'Yes. Many of our engagements are structured as an extension of an existing internal team - we handle the strategic and technical work that requires specialist expertise while your team manages day-to-day execution. We also run fully embedded engagements where we function as your marketing department. The structure is designed around your needs.',
  },
];

export default function MarketingPage() {
  return (
    <>
      <SEO
        title="Marketing Strategy"
        description="Results-driven marketing strategy services - GTM planning, SEO, SEM, paid media, content strategy, social media management and email automation. Marketing that connects channel activity to revenue."
        keywords="marketing strategy, GTM, go-to-market, SEO, SEM, paid media, Google Ads, content marketing, social media, email automation, TechBird"
        faqItems={faqItems}
        serviceSchema={{ name: 'Marketing Strategy', description: 'GTM strategy, SEO, SEM, paid media, social media and content marketing.', category: 'Marketing Consulting' }}
      />
      <ServicePageLayout
      heroImage="/assets/svc-marketing-hero.webp"
      accentColor="#22d3ee"
      eyebrow="Marketing Strategy"
      title="Marketing Strategies That Drive Growth, Not Just Impressions"
      subtitle="GTM strategy, SEO, paid media, content and social - designed as a system that connects channel activity to revenue, not just reporting dashboards."
      breadcrumbLabel="Marketing Strategy"
      metrics={[
        { number: '3.4×', label: 'Average ROAS improvement across accounts' },
        { number: '60d', label: 'Typical GTM strategy to first qualified lead' },
        { number: '85%', label: 'Client retention rate on ongoing retainers' },
      ]}
      introParagraphs={[
        'Impressions, clicks and followers are not business outcomes. Too many companies spend months running campaigns that look busy in reporting dashboards but never move the metrics that matter - pipeline, revenue and customer acquisition cost. The disconnect is usually strategic: channels are managed in silos, creative is produced without audience insight, and budgets are allocated based on last year\'s plan rather than this quarter\'s data.',
        'TechBird approaches marketing as a systems problem. We design the strategy, set up the attribution infrastructure, build the campaigns and measure what actually drives revenue - not what looks impressive in a deck.',
      ]}
      sections={[
        {
          icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
          color: '#22d3ee',
          heading: 'Go-To-Market (GTM) Strategy',
          paragraphs: [
            'A product launch without a GTM strategy is a press release that nobody reads. We develop positioning frameworks, ideal customer profiles, competitive landscape analysis and channel strategies that ensure your product reaches the right audience with the right message at the right time - from pricing strategy and sales enablement to launch timelines and success metrics.',
          ],
          useCases: 'New product launches, Market expansion, Competitive repositioning, Vertical GTM, Partnership strategy',
        },
        {
          icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
          color: '#38bdf8',
          heading: 'SEO & Content Strategy',
          paragraphs: [
            'Organic search is the highest-ROI marketing channel for most B2B companies - when it is executed with the discipline of an engineering project. We build SEO programmes that start with keyword research and competitive gap analysis, develop content that matches search intent at every stage of the buyer journey, and implement technical SEO improvements that compound over time.',
          ],
          useCases: 'Technical SEO audits, Content gap analysis, Link building, Local SEO, E-commerce SEO',
        },
        {
          icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
          color: '#a78bfa',
          heading: 'Paid Media (SEM & Social)',
          paragraphs: [
            'Paid media is the accelerant - but only when the targeting, creative and landing page are aligned. We run Google Ads, Meta Ads, LinkedIn Ads and programmatic campaigns with rigorous A/B testing, audience segmentation and attribution modelling. Budget allocation is driven by measured CAC and LTV, not gut feel or channel bias.',
          ],
          useCases: 'Google Ads management, Meta advertising, LinkedIn B2B campaigns, Retargeting, Programmatic display',
        },
        {
          icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
          color: '#34d399',
          heading: 'Social Media & Community',
          paragraphs: [
            'Social media presence without strategy is noise. We build social programmes around a content calendar that aligns with your business objectives - thought leadership content, product announcements, community engagement and paid amplification. We manage LinkedIn, Instagram, X and YouTube across B2B and consumer contexts, with monthly reporting tied to business metrics.',
          ],
          useCases: 'LinkedIn strategy, Instagram brand building, Content calendars, Community management, Influencer partnerships',
        },
        {
          icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
          color: '#fbbf24',
          heading: 'Email & Marketing Automation',
          paragraphs: [
            'Email remains the highest-ROI direct channel when sequences are built around buyer behaviour rather than calendar. We design and implement nurture sequences, onboarding flows, win-back campaigns and transactional emails - in HubSpot, Mailchimp, Klaviyo and custom stacks. Every sequence is tested, measured and improved based on open, click and conversion data.',
          ],
          useCases: 'Lead nurture sequences, Onboarding emails, Win-back campaigns, Newsletter strategy, HubSpot automation',
        },
      ]}
      stackTitle="Platforms and tools we use across engagements"
      stackItems={[
        { label: 'Advertising', tech: 'Google Ads, Meta Ads Manager, LinkedIn Campaign Manager, DV360' },
        { label: 'SEO', tech: 'Ahrefs, SEMrush, Screaming Frog, Google Search Console' },
        { label: 'Email & Automation', tech: 'HubSpot, Mailchimp, Klaviyo, ActiveCampaign, Brevo' },
        { label: 'Analytics', tech: 'GA4, Mixpanel, Amplitude, Looker Studio, Heap' },
        { label: 'Social', tech: 'Sprout Social, Buffer, Hootsuite, Creator Studio' },
      ]}
      faqItems={faqItems}
      ctaHeading="Build a Marketing Engine"
      ctaText="Tell us about your growth goals and current marketing situation. We will identify the highest-leverage opportunities and build a plan around them."
    />
    </>
  );
}
