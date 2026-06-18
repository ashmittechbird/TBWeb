import ProductPageLayout from '../../components/ProductPageLayout';
import SEO from '../../components/SEO';

const A = '#f472b6';            // E-commerce accent - pink
const A2 = '#22d3ee';          // cyan secondary

const I = {
  store:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1.5-5h15L21 9M4 9v11h16V9M4 9h16M9 13h6"/></svg>,
  bag:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>,
  chart:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
  box:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8l-9-5-9 5v8l9 5z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/></svg>,
  users:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87"/></svg>,
  card:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  truck:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4h14v11H1zM15 8h4l3 3v4h-7M5.5 18.5a2 2 0 100-4 2 2 0 000 4zM17.5 18.5a2 2 0 100-4 2 2 0 000 4z"/></svg>,
  link:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">Commerce - Overview</text>
      <rect x="0" y="34" width="120" height="366" fill="#0a0a10"/>
      <rect x="14" y="50" width="92" height="26" rx="6" fill={A} fillOpacity=".14"/>
      <circle cx="28" cy="63" r="5" fill={A}/><rect x="40" y="59" width="54" height="6" rx="3" fill={A} fillOpacity=".8"/>
      {[0,1,2,3,4].map(i=>(<g key={i}><circle cx="28" cy={98+i*30} r="5" fill="rgba(255,255,255,.14)"/><rect x="40" y={94+i*30} width={[48,60,42,54,50][i]} height="6" rx="3" fill="rgba(255,255,255,.12)"/></g>))}
      {[['GMV','₹62L',A],['ORDERS','1,840',A2],['AOV','₹3,370',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="21" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      <rect x="138" y="144" width="264" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Sales · last 7 days</text>
      {[0,1,2].map(i=>(<line key={i} x1="154" y1={190+i*30} x2="386" y2={190+i*30} stroke="rgba(255,255,255,.04)"/>))}
      <path d="M158 262 196 244 234 252 272 224 310 234 348 206 386 220" fill="none" stroke={A} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M158 262 196 244 234 252 272 224 310 234 348 206 386 220 386 284 158 284Z" fill={A} fillOpacity=".08"/>
      {[[158,262],[272,224],[348,206]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill={A}/>))}
      <rect x="414" y="144" width="132" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="430" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Top products</text>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x="430" y={180+i*28} width="16" height="16" rx="4" fill={['#f472b6','#22d3ee','#fbbf24','#a78bfa'][i]} fillOpacity=".3"/>
          <rect x="452" y={183+i*28} width="58" height="5" rx="2.5" fill="rgba(255,255,255,.3)"/>
          <rect x="452" y={191+i*28} width="34" height="4" rx="2" fill="rgba(255,255,255,.13)"/>
        </g>
      ))}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Orders fulfilled today</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="198" height="7" rx="3.5" fill={A} fillOpacity=".85"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">66%</text>
    </svg>
  );
}

function ArtStorefront() {
  const items = [['#f472b6'], ['#22d3ee'], ['#fbbf24'], ['#a78bfa'], ['#34d399'], ['#fb923c']];
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Storefront</text>
      {items.map(([c], i) => {
        const x = 14 + (i % 3) * 114, y = 34 + Math.floor(i / 3) * 56;
        return (
          <g key={i}>
            <rect x={x} y={y} width="104" height="48" rx="7" fill="#15151d" stroke="rgba(255,255,255,.06)"/>
            <rect x={x + 8} y={y + 8} width="32" height="32" rx="5" fill={c} fillOpacity=".25"/>
            <rect x={x + 48} y={y + 12} width="46" height="5" rx="2.5" fill="rgba(255,255,255,.3)"/>
            <text x={x + 48} y={y + 32} fill={c} fontSize="8.5" fontFamily="'JetBrains Mono',monospace">₹ {(i + 2) * 4}99</text>
          </g>
        );
      })}
    </svg>
  );
}
function ArtOrders() {
  const rows = [['#10482', 'Paid', A], ['#10481', 'Shipped', A2], ['#10480', 'Packed', '#fbbf24'], ['#10479', 'Delivered', '#34d399']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Recent orders</text>
      {rows.map(([n, s, c], i) => (
        <g key={i}>
          <text x="14" y={48 + i * 25} fill="rgba(255,255,255,.55)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">{n}</text>
          <rect x="142" y={39 + i * 25} width="64" height="14" rx="7" fill={c} fillOpacity=".15"/>
          <text x="174" y={49 + i * 25} textAnchor="middle" fill={c} fontSize="8" fontFamily="system-ui">{s}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtSales() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Revenue by channel</text>
      {[['Web', 130, A], ['App', 96, A2], ['Market', 70, '#fbbf24']].map(([t, h, c], i) => (
        <g key={i}>
          <rect x={30 + i * 64} y={130 - h * 0.62} width="40" height={h * 0.62} rx="4" fill={c} fillOpacity=".5"/>
          <rect x={30 + i * 64} y={130 - h * 0.62} width="40" height="4" rx="2" fill={c}/>
          <text x={50 + i * 64} y="144" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="8" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      <line x1="14" y1="130" x2="206" y2="130" stroke="rgba(255,255,255,.08)"/>
    </svg>
  );
}
function ArtVendors() {
  const v = [['Aura Living', '₹ 12.4L', A], ['Nova Tech', '₹ 9.1L', A2], ['Bloom Co', '₹ 6.7L', '#fbbf24']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Top vendors</text>
      {v.map(([n, s, c], i) => (
        <g key={i}>
          <circle cx="24" cy={48 + i * 32} r="9" fill={c} fillOpacity=".3"/>
          <text x="24" y={52 + i * 32} textAnchor="middle" fill={c} fontSize="9" fontFamily="'Space Grotesk'" fontWeight="700">{n[0]}</text>
          <text x="40" y={45 + i * 32} fill="rgba(255,255,255,.6)" fontSize="9.5" fontFamily="system-ui">{n}</text>
          <text x="40" y={56 + i * 32} fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="system-ui">GMV {s}</text>
        </g>
      ))}
    </svg>
  );
}

function MockOrderBoard() {
  const cols = [
    { head: 'New', tone: A, cards: [['#10482', '₹ 4,290'], ['#10483', '₹ 1,150']] },
    { head: 'Packed', tone: '#fbbf24', cards: [['#10480', '₹ 8,640'], ['#10479', '₹ 2,300']] },
    { head: 'Shipped', tone: A2, cards: [['#10477', '₹ 5,910']] },
    { head: 'Delivered', tone: '#34d399', cards: [['#10472', '₹ 3,480'], ['#10470', '₹ 7,120']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">Commerce - Fulfilment</text>
      {cols.map((col, ci) => {
        const x = 24 + ci * 234;
        return (
          <g key={ci}>
            <circle cx={x + 6} cy="66" r="4" fill={col.tone}/>
            <text x={x + 18} y="70" fill="rgba(255,255,255,.55)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">{col.head}</text>
            <text x={x + 212} y="70" textAnchor="end" fill="rgba(255,255,255,.25)" fontSize="10" fontFamily="'JetBrains Mono',monospace">{col.cards.length}</text>
            {col.cards.map((c, i) => (
              <g key={i}>
                <rect x={x} y={84 + i * 78} width="214" height="66" rx="9" fill="#15151d" stroke="rgba(255,255,255,.06)"/>
                <rect x={x} y={84 + i * 78} width="3.5" height="66" rx="2" fill={col.tone}/>
                <text x={x + 16} y={108 + i * 78} fill="rgba(255,255,255,.8)" fontSize="11.5" fontFamily="'JetBrains Mono',monospace">{c[0]}</text>
                <text x={x + 16} y={126 + i * 78} fill={col.tone} fontSize="11" fontFamily="'JetBrains Mono',monospace">{c[1]}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function MockConsole() {
  return (
    <svg viewBox="0 0 940 540" xmlns="http://www.w3.org/2000/svg">
      <rect width="940" height="540" rx="16" fill="#0c0c12"/>
      <rect width="940" height="42" fill="#101018"/>
      <circle cx="24" cy="21" r="5" fill="#ff5f57"/><circle cx="43" cy="21" r="5" fill="#febc2e"/><circle cx="62" cy="21" r="5" fill="#28c840"/>
      <rect x="360" y="11" width="220" height="20" rx="10" fill="#181820"/>
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/commerce</text>
      <rect x="0" y="42" width="180" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="13" fontFamily="'Space Grotesk'" fontWeight="700">TechBird Commerce</text>
      <rect x="16" y="94" width="148" height="30" rx="7" fill={A} fillOpacity=".14"/>
      <circle cx="32" cy="109" r="5" fill={A}/><text x="46" y="113" fill={A} fontSize="11" fontFamily="system-ui">Dashboard</text>
      {['Orders','Products','Inventory','Vendors','Customers','Marketing','Reports'].map((t,i)=>(
        <g key={i}><circle cx="32" cy={146+i*32} r="5" fill="rgba(255,255,255,.18)"/><text x="46" y={150+i*32} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="system-ui">{t}</text></g>
      ))}
      <text x="206" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">Store Overview</text>
      <text x="206" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">All channels · last 30 days</text>
      <rect x="780" y="60" width="136" height="32" rx="16" fill={A}/>
      <text x="848" y="80" textAnchor="middle" fill="#2a0f1f" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Add Product</text>
      {[['GMV','₹62L','▲ 14%',A],['ORDERS','1,840','▲ 9%',A2],['CONV. RATE','3.4%','▲ 0.3%','#34d399'],['RETURNS','2.1%','▼ 0.4%','#fbbf24']].map(([l,v,s,c],i)=>{
        const x=206+i*180;
        return (
          <g key={i}>
            <rect x={x} y="116" width="166" height="86" rx="11" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
            <text x={x+16} y="140" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">{l}</text>
            <text x={x+16} y="172" fill={c} fontSize="23" fontFamily="'Space Grotesk'" fontWeight="700">{v}</text>
            <text x={x+16} y="190" fill="rgba(255,255,255,.3)" fontSize="9" fontFamily="system-ui">{s}</text>
          </g>
        );
      })}
      {/* sales chart */}
      <rect x="206" y="218" width="430" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Revenue trend</text>
      {[0,1,2,3].map(i=>(<line key={i} x1="224" y1={272+i*34} x2="616" y2={272+i*34} stroke="rgba(255,255,255,.04)"/>))}
      <path d="M232 372 280 350 328 360 376 330 424 338 472 306 520 318 568 288 616 300" fill="none" stroke={A} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M232 372 280 350 328 360 376 330 424 338 472 306 520 318 568 288 616 300 616 406 232 406Z" fill={A} fillOpacity=".08"/>
      <path d="M232 386 280 380 328 372 376 376 424 360 472 366 520 350 568 356 616 342" fill="none" stroke={A2} strokeWidth="1.6" strokeOpacity=".7" strokeDasharray="4 4"/>
      {/* order list */}
      <rect x="652" y="218" width="264" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="670" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Latest orders</text>
      {[['#10482','₹ 4,290','Paid',A],['#10481','₹ 1,150','Shipped',A2],['#10480','₹ 8,640','Packed','#fbbf24'],['#10479','₹ 2,300','Delivered','#34d399']].map(([n,v,s,c],i)=>(
        <g key={i}>
          <text x="670" y={272+i*32} fill="rgba(255,255,255,.6)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">{n}</text>
          <text x="754" y={272+i*32} fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{v}</text>
          <rect x="846" y={262+i*32} width="58" height="15" rx="7.5" fill={c} fillOpacity=".15"/>
          <text x="875" y={272+i*32} textAnchor="middle" fill={c} fontSize="7.5" fontFamily="system-ui">{s}</text>
        </g>
      ))}
      {/* channel strip */}
      <rect x="206" y="434" width="710" height="74" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="460" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Sales channels live</text>
      {['Website','Mobile app','Amazon','Flipkart','Instagram'].map((t,i)=>(
        <g key={i}>
          <rect x={224+i*140} y="474" width="124" height="22" rx="11" fill={A} fillOpacity=".12"/>
          <circle cx={238+i*140} cy="485" r="4" fill={A} fillOpacity=".85"/>
          <text x={250+i*140} y="489" fill={A} fontSize="9" fontFamily="system-ui">{t}</text>
        </g>
      ))}
    </svg>
  );
}

const faqItems = [
  { q: 'Is this a marketplace or a single-brand store?', a: 'Either. Run a single-brand storefront, or a full multi-vendor marketplace where sellers get their own dashboards, inventory, commissions and payouts. You can start single-brand and add vendors later.' },
  { q: 'Can it sell across multiple channels at once?', a: 'Yes. Manage your website, mobile app and marketplace listings (Amazon, Flipkart) and social commerce from one back office, with inventory and orders synced so you never oversell.' },
  { q: 'Which payment and shipping options are supported?', a: 'Payments via UPI, cards, wallets, net banking, COD and EMI through Razorpay/PayU/Stripe, all auto-reconciled. Shipping integrates with Shiprocket, Delhivery and major couriers for label printing and live tracking.' },
  { q: 'How does inventory stay accurate?', a: 'Stock is tracked in real time across warehouses and channels. A sale anywhere decrements inventory everywhere, with reservations during checkout and low-stock alerts to prevent overselling and stockouts.' },
  { q: 'On-premise or cloud, and how long to go live?', a: 'Deploy on cloud (recommended for storefront performance) or on-premise. A single-brand store can launch in 4–8 weeks; a multi-vendor marketplace with vendor onboarding and marketplace sync runs 10–16 weeks.' },
];

export default function EcommercePage() {
  return (
    <>
    <SEO
      title="E-commerce Platform"
      description="TechBird E-commerce Platform - multi-vendor marketplace or single-brand storefront with catalog, inventory, payments, shipping integration and analytics. One back office for every channel you sell on."
      keywords="ecommerce platform, multi-vendor marketplace, online store, inventory management, payment gateway integration, shipping integration, order management, ecommerce analytics, Shopify alternative, ecommerce India"
      faqItems={faqItems}
      softwareSchema={{ name: 'TechBird E-commerce', description: 'Multi-vendor marketplace with catalog, inventory, payments and shipping.', category: 'BusinessApplication' }}
    />
    <ProductPageLayout
      accent={A}
      category="Multi-Vendor Commerce"
      breadcrumbLabel="E-Commerce Platform"
      title="Sell everywhere, *manage from one place.*"
      lead="A multi-vendor marketplace or single-brand storefront with catalog, inventory, payments, shipping and analytics - one back office for every channel you sell on."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '<em>1</em>', label: 'Back office for every channel' },
        { value: '99.9%', label: 'Storefront uptime SLA' },
        { value: '–30%', label: 'Stockouts with synced inventory' },
        { value: '24/7', label: 'Orders, payments & support' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'A storefront and a back office, together.',
        sub: 'Catalog, orders, inventory, payments and vendors share one system - so a sale anywhere updates stock and accounting everywhere.',
        items: [
          { icon: I.store, title: 'Storefront & catalog', text: 'Branded, responsive storefront with rich product pages, search and offers.', art: <ArtStorefront />, span: true },
          { icon: I.bag, title: 'Order management', text: 'One queue for every channel - capture, fulfil, refund and track.', art: <ArtOrders /> },
          { icon: I.chart, title: 'Sales analytics', text: 'Revenue, AOV, conversion and cohort insights across channels.', art: <ArtSales /> },
          { icon: I.users, title: 'Multi-vendor', text: 'Onboard sellers with their own dashboards, payouts and commissions.', art: <ArtVendors /> },
          { icon: I.box, title: 'Inventory sync', text: 'Real-time stock across warehouses and channels, with low-stock alerts.' },
        ],
      }}
      light={{
        eyebrow: 'Order to doorstep',
        heading: 'Cart to delivery, one pipeline.',
        sub: 'An order flows from checkout through packing, shipping and delivery - updating inventory, payouts and the customer at every step.',
        mockup: <MockOrderBoard />,
        columns: [
          { icon: I.card, title: 'Checkout & pay', text: 'Fast checkout with UPI, cards and wallets; payments reconciled automatically.' },
          { icon: I.box, title: 'Pack & allocate', text: 'Smart routing picks the right warehouse or vendor and decrements stock.' },
          { icon: I.truck, title: 'Ship & track', text: 'Courier integration prints labels and gives customers live tracking.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See the platform in action.',
        sub: 'One console across storefront and operations - GMV, orders, conversion and channels, live. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.store, title: 'Headless storefront', text: 'Fast, SEO-friendly, fully themeable storefront for web and mobile.' },
          { icon: I.bag, title: 'Unified orders', text: 'Every channel’s orders in one queue with fulfilment and returns.' },
          { icon: I.box, title: 'Inventory & warehouse', text: 'Real-time multi-warehouse stock with reservations and alerts.' },
          { icon: I.card, title: 'Payments & checkout', text: 'UPI, cards, wallets, COD and EMI with automatic reconciliation.' },
          { icon: I.users, title: 'Multi-vendor marketplace', text: 'Seller onboarding, commissions, payouts and per-vendor analytics.' },
          { icon: I.chart, title: 'Growth analytics', text: 'Funnels, cohorts, channel ROI and product performance dashboards.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Plugs into your sales channels.',
        items: [
          { label: 'Payments', tech: 'Razorpay, PayU, Stripe and UPI with auto-reconcile' },
          { label: 'Shipping', tech: 'Shiprocket, Delhivery and major courier APIs' },
          { label: 'Marketplaces', tech: 'Amazon, Flipkart and social commerce sync' },
          { label: 'Back office', tech: 'TechBird ERP, Tally and accounting exports' },
        ],
      }}
      faqItems={faqItems}
      cta={{
        label: 'Get started',
        heading: 'Ready to scale your commerce?',
        body: 'A focused walkthrough mapped to your catalog, channels, fulfilment and payment setup.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
    </>
  );
}
