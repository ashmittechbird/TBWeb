import ProductPageLayout from '../../components/ProductPageLayout';

const A = '#fbbf24';             // ERP accent — amber
const A2 = '#38bdf8';           // blue secondary for chart variety

const I = {
  grid:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  box:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8l-9-5-9 5v8l9 5z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/></svg>,
  coins:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>,
  factory: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21h20V8l-6 4V8l-6 4V3H4v18"/><path d="M7 17h0M11 17h0M15 17h0"/></svg>,
  truck:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4h14v11H1zM15 8h4l3 3v4h-7M5.5 18.5a2 2 0 100-4 2 2 0 000 4zM17.5 18.5a2 2 0 100-4 2 2 0 000 4z"/></svg>,
  users:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>,
  chart:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
  link:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">ERP — Overview</text>
      <rect x="0" y="34" width="120" height="366" fill="#0a0a10"/>
      <rect x="14" y="50" width="92" height="26" rx="6" fill={A} fillOpacity=".14"/>
      <circle cx="28" cy="63" r="5" fill={A}/><rect x="40" y="59" width="54" height="6" rx="3" fill={A} fillOpacity=".8"/>
      {[0,1,2,3,4].map(i=>(<g key={i}><circle cx="28" cy={98+i*30} r="5" fill="rgba(255,255,255,.14)"/><rect x="40" y={94+i*30} width={[48,60,42,54,50][i]} height="6" rx="3" fill="rgba(255,255,255,.12)"/></g>))}
      {[['REVENUE','₹8.4Cr',A],['STOCK VALUE','₹2.1Cr',A2],['OPEN ORDERS','312',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="21" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      <rect x="138" y="144" width="264" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Revenue vs cost · 6 mo</text>
      {[0,1,2,3].map(i=>(<line key={i} x1="154" y1={186+i*26} x2="386" y2={186+i*26} stroke="rgba(255,255,255,.04)"/>))}
      <path d="M158 270 196 250 234 256 272 232 310 238 386 210" fill="none" stroke={A} strokeWidth="2"/>
      <path d="M158 282 196 272 234 268 272 262 310 258 386 248" fill="none" stroke={A2} strokeWidth="1.6" strokeOpacity=".7" strokeDasharray="4 4"/>
      <rect x="414" y="144" width="132" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="430" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Modules</text>
      {['Manufacturing','Finance','Inventory','Sales','HR'].map((t,i)=>(
        <g key={i}>
          <rect x="430" y={178+i*22} width="100" height="16" rx="4" fill={A} fillOpacity={i===0?.18:.06}/>
          <circle cx="440" cy={186+i*22} r="3" fill={A} fillOpacity=".8"/>
          <text x="450" y={189+i*22} fill="rgba(255,255,255,.5)" fontSize="8.5" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Production plan · this week</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="210" height="7" rx="3.5" fill={A} fillOpacity=".85"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">70%</text>
    </svg>
  );
}

function ArtModules() {
  const mods = [['Finance', A], ['Inventory', A2], ['Manufacturing', '#fb923c'], ['Sales & CRM', '#a78bfa'], ['Purchase', '#34d399'], ['HR & Payroll', '#f472b6']];
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Integrated modules</text>
      {mods.map(([t, c], i) => {
        const x = 14 + (i % 3) * 114, y = 36 + Math.floor(i / 3) * 52;
        return (
          <g key={i}>
            <rect x={x} y={y} width="104" height="44" rx="7" fill="#15151d" stroke="rgba(255,255,255,.06)"/>
            <rect x={x + 10} y={y + 12} width="18" height="18" rx="5" fill={c} fillOpacity=".18"/>
            <circle cx={x + 19} cy={y + 21} r="3.5" fill={c}/>
            <text x={x + 36} y={y + 25} fill="rgba(255,255,255,.6)" fontSize="8.5" fontFamily="system-ui">{t}</text>
          </g>
        );
      })}
    </svg>
  );
}
function ArtInventory() {
  const rows = [['SKU-1042', 'In stock', A], ['SKU-2087', 'Low', '#fb923c'], ['SKU-3310', 'In stock', A], ['SKU-5521', 'Reorder', '#f87171']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Stock status</text>
      {rows.map(([k, s, c], i) => (
        <g key={i}>
          <text x="14" y={48 + i * 25} fill="rgba(255,255,255,.55)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{k}</text>
          <rect x="140" y={39 + i * 25} width="66" height="14" rx="7" fill={c} fillOpacity=".15"/>
          <text x="173" y={49 + i * 25} textAnchor="middle" fill={c} fontSize="8" fontFamily="system-ui">{s}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtFinance() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Cash flow</text>
      {[60,95,72,120,88,134].map((h,i)=>(
        <rect key={i} x={20+i*32} y={134-h*0.7} width="20" height={h*0.7} rx="3" fill={A} fillOpacity={i===5?.85:.3}/>
      ))}
      <line x1="14" y1="134" x2="206" y2="134" stroke="rgba(255,255,255,.08)"/>
    </svg>
  );
}
function ArtProduction() {
  const wo = [['WO-204', 'Running', A], ['WO-205', 'Queued', A2], ['WO-206', 'Done', '#34d399']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Work orders</text>
      {wo.map(([k, s, c], i) => (
        <g key={i}>
          <rect x="14" y={36 + i * 32} width="192" height="26" rx="6" fill="#15151d" stroke="rgba(255,255,255,.06)"/>
          <circle cx="28" cy={49 + i * 32} r="4" fill={c}/>
          <text x="40" y={52 + i * 32} fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{k}</text>
          <text x="196" y={52 + i * 32} textAnchor="end" fill={c} fontSize="8.5" fontFamily="system-ui">{s}</text>
        </g>
      ))}
    </svg>
  );
}

function MockOpsBoard() {
  const cols = [
    { head: 'Quotation', tone: A, cards: [['Q-1180', '₹ 4.2L'], ['Q-1181', '₹ 9.0L']] },
    { head: 'Sales Order', tone: A2, cards: [['SO-882', '₹ 12.4L'], ['SO-883', '₹ 6.6L']] },
    { head: 'Delivery', tone: '#fb923c', cards: [['DN-455', '₹ 8.1L']] },
    { head: 'Invoiced', tone: '#34d399', cards: [['INV-771', '₹ 15.2L'], ['INV-772', '₹ 7.4L']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">ERP — Order to Cash</text>
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
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/erp</text>
      <rect x="0" y="42" width="180" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="14" fontFamily="'Space Grotesk'" fontWeight="700">TechBird ERP</text>
      <rect x="16" y="94" width="148" height="30" rx="7" fill={A} fillOpacity=".14"/>
      <circle cx="32" cy="109" r="5" fill={A}/><text x="46" y="113" fill={A} fontSize="11" fontFamily="system-ui">Dashboard</text>
      {['Finance','Inventory','Manufacturing','Sales','Purchase','HR','Reports'].map((t,i)=>(
        <g key={i}><circle cx="32" cy={146+i*32} r="5" fill="rgba(255,255,255,.18)"/><text x="46" y={150+i*32} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="system-ui">{t}</text></g>
      ))}
      <text x="206" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">Company Overview</text>
      <text x="206" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">FY 2025-26 · All branches</text>
      <rect x="772" y="60" width="144" height="32" rx="16" fill={A}/>
      <text x="844" y="80" textAnchor="middle" fill="#1a1405" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">New Entry</text>
      {[['REVENUE','₹8.4Cr','▲ 12%',A],['GROSS MARGIN','38%','▲ 2%',A2],['STOCK VALUE','₹2.1Cr','1.4k SKUs','#fb923c'],['RECEIVABLES','₹64L','32 invoices','#34d399']].map(([l,v,s,c],i)=>{
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
      <rect x="206" y="218" width="430" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Revenue · cost · profit</text>
      {[0,1,2,3].map(i=>(<line key={i} x1="224" y1={272+i*34} x2="616" y2={272+i*34} stroke="rgba(255,255,255,.04)"/>))}
      {[120,150,108,168,140,176,158,184].map((h,i)=>(<rect key={i} x={236+i*46} y={406-h*0.62} width="26" height={h*0.62} rx="3" fill={A} fillOpacity={i%2?.7:.34}/>))}
      <path d="M249 360 295 350 341 356 387 338 433 344 479 330 525 336 571 320" fill="none" stroke={A2} strokeWidth="2"/>
      <rect x="652" y="218" width="264" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="670" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Inventory by warehouse</text>
      {[['Mumbai','42%',A],['Delhi','28%',A2],['Pune','18%','#fb923c'],['Surat','12%','#a78bfa']].map(([d,p,c],i)=>(
        <g key={i}>
          <circle cx="676" cy={272+i*30} r="4" fill={c}/>
          <text x="690" y={276+i*30} fill="rgba(255,255,255,.6)" fontSize="10" fontFamily="system-ui">{d}</text>
          <rect x="770" y={268+i*30} width="100" height="6" rx="3" fill="rgba(255,255,255,.08)"/>
          <rect x="770" y={268+i*30} width={parseInt(p)} height="6" rx="3" fill={c} fillOpacity=".8"/>
          <text x="900" y={276+i*30} textAnchor="end" fill="rgba(255,255,255,.45)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{p}</text>
        </g>
      ))}
      <rect x="206" y="434" width="710" height="74" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="460" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Month-end close · checklist</text>
      {['Ledgers','Bank recon','GST','Depreciation','Reports'].map((t,i)=>(
        <g key={i}>
          <rect x={224+i*140} y="474" width="124" height="22" rx="11" fill={A} fillOpacity=".12"/>
          <circle cx={238+i*140} cy="485" r="5" fill={A} fillOpacity=".8"/>
          <path d={`M${235+i*140} 485 l2 2 4-4`} stroke="#1a1405" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          <text x={252+i*140} y="489" fill={A} fontSize="9" fontFamily="system-ui">{t}</text>
        </g>
      ))}
    </svg>
  );
}

export default function ERPPage() {
  return (
    <ProductPageLayout
      accent={A}
      category="ERPNext-Powered"
      breadcrumbLabel="Custom ERP"
      title="One system to run the *whole business.*"
      lead="A full-suite ERP on ERPNext — finance, inventory, manufacturing, sales, purchase and HR on a single data layer, configured to your workflows instead of forcing you onto someone else's."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '6+', label: 'Core modules on one platform' },
        { value: '<em>1</em>', label: 'Source of truth across departments' },
        { value: '–40%', label: 'Manual reconciliation effort' },
        { value: '100%', label: 'GST & statutory-ready accounting' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'Every department, one connected system.',
        sub: 'Built on ERPNext — orders, stock, production, accounting and people share one database, so a sale updates inventory, finance and dispatch at once.',
        items: [
          { icon: I.grid, title: 'Integrated modules', text: 'Finance, inventory, manufacturing, sales, purchase and HR — switched on as you need them.', art: <ArtModules />, span: true },
          { icon: I.box, title: 'Inventory & warehouse', text: 'Multi-warehouse stock, batch/serial tracking and reorder automation.', art: <ArtInventory /> },
          { icon: I.coins, title: 'Finance & accounting', text: 'GL, AP/AR, multi-currency and GST-ready statutory reporting.', art: <ArtFinance /> },
          { icon: I.factory, title: 'Manufacturing', text: 'BOMs, work orders, capacity planning and shop-floor tracking.', art: <ArtProduction /> },
          { icon: I.truck, title: 'Purchase & supply chain', text: 'Requisitions, supplier quotes, POs and goods-receipt matching.' },
        ],
      }}
      light={{
        eyebrow: 'Order to cash',
        heading: 'Quote to cash, without re-keying.',
        sub: 'A quotation becomes a sales order, a delivery note and an invoice — each step carrying the data forward and posting to finance and inventory automatically.',
        mockup: <MockOpsBoard />,
        columns: [
          { icon: I.box, title: 'Procure & stock', text: 'Purchase orders, goods receipt and stock valuation update in real time.' },
          { icon: I.factory, title: 'Make & fulfil', text: 'Work orders consume materials and feed finished goods straight to dispatch.' },
          { icon: I.coins, title: 'Invoice & reconcile', text: 'Invoicing, payments and bank reconciliation close the loop into the GL.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See the ERP in action.',
        sub: 'One console across finance, inventory and operations — revenue, margin, stock and receivables, live. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.coins, title: 'Real-time financials', text: 'P&L, balance sheet and cash flow that update with every posted transaction.' },
          { icon: I.box, title: 'Live inventory', text: 'Stock levels, valuation and movement across every warehouse in real time.' },
          { icon: I.factory, title: 'Production control', text: 'BOMs, work orders and capacity planning tied to material availability.' },
          { icon: I.truck, title: 'Procurement', text: 'Supplier management, PO approvals and three-way matching on receipts.' },
          { icon: I.users, title: 'HR & payroll', text: 'Employee records, attendance and payroll on the same platform.' },
          { icon: I.chart, title: 'Unified reporting', text: 'Cross-module dashboards and drill-downs for every function and branch.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Fits your existing stack.',
        items: [
          { label: 'Banking & payments', tech: 'NEFT/RTGS files, payment gateways, bank statement import' },
          { label: 'Tax & compliance', tech: 'GSTN, e-invoicing and e-way bill integrations' },
          { label: 'Commerce', tech: 'Shopify, WooCommerce and marketplace connectors' },
          { label: 'Devices & APIs', tech: 'Barcode/RFID, biometric and REST API for anything else' },
        ],
      }}
      faqItems={[
        { q: 'Is this built on ERPNext?', a: 'Yes. We implement and extend ERPNext — an open-source, full-suite ERP — so you get a mature, well-supported core with no per-user licensing lock-in, plus custom modules and workflows specific to your business.' },
        { q: 'Can it be configured to our processes?', a: 'That is the point. Rather than forcing your team onto rigid defaults, we configure document flows, approval chains, naming, print formats and reports to match how you actually operate — and build custom doctypes where the standard model does not fit.' },
        { q: 'Does it handle Indian GST and e-invoicing?', a: 'Yes. GST-compliant accounting, GSTR reports, e-invoicing (IRN/QR) and e-way bills are supported, along with TDS, multi-currency and multi-company consolidation.' },
        { q: 'Can we migrate from Tally or our legacy ERP?', a: 'Yes. We migrate masters (items, customers, suppliers, accounts) and opening balances from Tally, spreadsheets or legacy systems, with reconciliation so your books tie out from day one.' },
        { q: 'On-premise or cloud, and how long to go live?', a: 'Deploy on-premise or on AWS/GCP/Azure. A focused single-module rollout can go live in 6–8 weeks; a full multi-module implementation with migration and integrations typically runs 12–20 weeks.' },
      ]}
      cta={{
        label: 'Get started',
        heading: 'Ready to unify your operations?',
        body: 'A focused walkthrough of the ERP mapped to your actual order, inventory and accounting flows — and a realistic rollout plan.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
  );
}
