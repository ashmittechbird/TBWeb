import ProductPageLayout from '../../components/ProductPageLayout';

const A = '#a3e635';            // Visitor accent — lime
const A2 = '#22d3ee';          // cyan secondary

const I = {
  scan:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><path d="M7 12h10"/></svg>,
  id:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.5 1.6-2 3-2s2.5.5 3 2M15 9h4M15 13h3"/></svg>,
  badge:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v3h6V3"/><circle cx="12" cy="12" r="2.5"/><path d="M8.5 18c.5-1.7 2-2.5 3.5-2.5s3 .8 3.5 2.5"/></svg>,
  bell:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>,
  chart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  clock:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  link:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">Visitor — Front Desk</text>
      <rect x="0" y="34" width="120" height="366" fill="#0a0a10"/>
      <rect x="14" y="50" width="92" height="26" rx="6" fill={A} fillOpacity=".14"/>
      <circle cx="28" cy="63" r="5" fill={A}/><rect x="40" y="59" width="54" height="6" rx="3" fill={A} fillOpacity=".8"/>
      {[0,1,2,3,4].map(i=>(<g key={i}><circle cx="28" cy={98+i*30} r="5" fill="rgba(255,255,255,.14)"/><rect x="40" y={94+i*30} width={[48,60,42,54,50][i]} height="6" rx="3" fill="rgba(255,255,255,.12)"/></g>))}
      {[['TODAY','142',A],['ON-SITE','38',A2],['AVG WAIT','40s',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="22" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      <rect x="138" y="144" width="264" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Footfall · today</text>
      {[60,90,140,110,160,130,80].map((h,i)=>(
        <g key={i}>
          <rect x={158+i*32} y={284-h*0.72} width="18" height={h*0.72} rx="4" fill={A} fillOpacity={i===4?.85:.32}/>
          <text x={167+i*32} y="296" textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize="7.5" fontFamily="'JetBrains Mono',monospace">{9+i}</text>
        </g>
      ))}
      <rect x="414" y="144" width="132" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="430" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Checking in</text>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <circle cx="436" cy={188+i*26} r="8" fill={['#a3e635','#22d3ee','#fb923c','#a78bfa'][i]} fillOpacity=".8"/>
          <rect x="450" y={183+i*26} width="58" height="5" rx="2.5" fill="rgba(255,255,255,.3)"/>
          <rect x="450" y={192+i*26} width="36" height="4" rx="2" fill="rgba(255,255,255,.13)"/>
        </g>
      ))}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Pre-registered for today</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="234" height="7" rx="3.5" fill={A} fillOpacity=".85"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">78%</text>
    </svg>
  );
}

function ArtCheckin() {
  const steps = [['Scan ID', true], ['Photo', true], ['Select host', true], ['Print badge', false]];
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Self check-in</text>
      {steps.map(([t, done], i) => {
        const x = 14 + i * 86;
        return (
          <g key={i}>
            <circle cx={x + 30} cy="76" r="16" fill={done ? `${A}22` : '#15151d'} stroke={done ? A : 'rgba(255,255,255,.2)'} strokeWidth="1.2"/>
            {done
              ? <path d={`M${x+23} 76 l5 5 9-10`} stroke={A} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              : <text x={x + 30} y="81" textAnchor="middle" fill="rgba(255,255,255,.35)" fontSize="12" fontFamily="'Space Grotesk'">{i + 1}</text>}
            <text x={x + 30} y="112" textAnchor="middle" fill={done ? 'rgba(255,255,255,.65)' : 'rgba(255,255,255,.4)'} fontSize="8.5" fontFamily="system-ui">{t}</text>
            {i < 3 && <line x1={x + 50} y1="76" x2={x + 70} y2="76" stroke={done ? A : 'rgba(255,255,255,.12)'} strokeWidth="1.5" strokeDasharray="3 3"/>}
          </g>
        );
      })}
    </svg>
  );
}
function ArtBadge() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="22" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Visitor badge</text>
      <rect x="64" y="32" width="92" height="106" rx="8" fill="#fff"/>
      <rect x="64" y="32" width="92" height="22" rx="8" fill={A}/>
      <rect x="64" y="46" width="92" height="8" fill={A}/>
      <text x="110" y="47" textAnchor="middle" fill="#0a0a10" fontSize="8" fontFamily="'Space Grotesk'" fontWeight="700">VISITOR</text>
      <circle cx="110" cy="76" r="14" fill="#e5e7eb"/>
      <text x="110" y="104" textAnchor="middle" fill="#0a0a10" fontSize="9" fontFamily="'Space Grotesk'" fontWeight="700">Ravi Menon</text>
      <text x="110" y="116" textAnchor="middle" fill="#6b7280" fontSize="6.5" fontFamily="system-ui">Host: A. Thakur</text>
      <rect x="92" y="122" width="36" height="10" fill="#0a0a10"/>
      {[0,1,2,3,4,5,6].map(i=>(<rect key={i} x={94+i*5} y="122" width={i%2?1.5:2.5} height="10" fill="#fff"/>))}
    </svg>
  );
}
function ArtLog() {
  const rows = [['Ravi Menon', 'In', A], ['Sara Ali', 'In', A], ['Tom Roy', 'Out', '#6b6c6d'], ['Mira Das', 'In', A]];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Live visitor log</text>
      {rows.map(([n, s, c], i) => (
        <g key={i}>
          <circle cx="22" cy={45 + i * 25} r="5" fill={c} fillOpacity=".8"/>
          <text x="34" y={48 + i * 25} fill="rgba(255,255,255,.6)" fontSize="9.5" fontFamily="system-ui">{n}</text>
          <rect x="168" y={38 + i * 25} width="38" height="14" rx="7" fill={c} fillOpacity=".15"/>
          <text x="187" y={48 + i * 25} textAnchor="middle" fill={c} fontSize="8" fontFamily="system-ui">{s}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtHostAlert() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Host notified</text>
      <rect x="14" y="36" width="192" height="48" rx="8" fill="#15151d" stroke={A} strokeWidth="0.5" strokeOpacity=".4"/>
      <circle cx="34" cy="60" r="11" fill={A} fillOpacity=".2"/>
      <path d="M30 60a4 4 0 118 0c0 4-2 5-2 5h-4s-2-1-2-5" fill="none" stroke={A} strokeWidth="1.3"/>
      <text x="52" y="55" fill="rgba(255,255,255,.7)" fontSize="9" fontFamily="'Space Grotesk'" fontWeight="600">Your visitor has arrived</text>
      <text x="52" y="68" fill="rgba(255,255,255,.4)" fontSize="8" fontFamily="system-ui">Ravi Menon · Reception · now</text>
      <rect x="14" y="96" width="92" height="24" rx="12" fill={A} fillOpacity=".18"/>
      <text x="60" y="111" textAnchor="middle" fill={A} fontSize="9" fontFamily="system-ui">Accept</text>
      <rect x="114" y="96" width="92" height="24" rx="12" fill="rgba(255,255,255,.06)"/>
      <text x="160" y="111" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="9" fontFamily="system-ui">Be right there</text>
    </svg>
  );
}

function MockFlowBoard() {
  const cols = [
    { head: 'Expected', tone: '#6b6c6d', cards: [['Ravi Menon', '10:00 · Sales'], ['Sara Ali', '10:30 · HR']] },
    { head: 'Checked-in', tone: A, cards: [['Tom Roy', 'Lobby · 2m'], ['Mira Das', 'Lobby · 5m']] },
    { head: 'With host', tone: A2, cards: [['Neil S', 'Floor 3']] },
    { head: 'Checked-out', tone: '#34d399', cards: [['Asha P', '09:40'], ['Karan V', '09:15']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">Visitor — Live Flow</text>
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
                <circle cx={x + 22} cy={117 + i * 78} r="11" fill={col.tone} fillOpacity=".7"/>
                <text x={x + 22} y={121 + i * 78} textAnchor="middle" fill="#0a0a10" fontSize="10" fontFamily="'Space Grotesk'" fontWeight="700">{c[0][0]}</text>
                <text x={x + 42} y={113 + i * 78} fill="rgba(255,255,255,.8)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">{c[0]}</text>
                <text x={x + 42} y={129 + i * 78} fill="rgba(255,255,255,.35)" fontSize="9" fontFamily="system-ui">{c[1]}</text>
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
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/visitor</text>
      <rect x="0" y="42" width="180" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="13" fontFamily="'Space Grotesk'" fontWeight="700">TechBird Visitor</text>
      <rect x="16" y="94" width="148" height="30" rx="7" fill={A} fillOpacity=".14"/>
      <circle cx="32" cy="109" r="5" fill={A}/><text x="46" y="113" fill={A} fontSize="11" fontFamily="system-ui">Front Desk</text>
      {['Visitors','Pre-register','Hosts','Badges','Watchlist','Reports','Settings'].map((t,i)=>(
        <g key={i}><circle cx="32" cy={146+i*32} r="5" fill="rgba(255,255,255,.18)"/><text x="46" y={150+i*32} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="system-ui">{t}</text></g>
      ))}
      <text x="206" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">Front Desk — Live</text>
      <text x="206" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">Main Lobby · Tue 10 Jun</text>
      <rect x="772" y="60" width="144" height="32" rx="16" fill={A}/>
      <text x="844" y="80" textAnchor="middle" fill="#15200a" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Check In</text>
      {[['TODAY','142','▲ 18',A],['ON-SITE','38','now',A2],['AVG WAIT','40s','▼ 12s','#34d399'],['PRE-REG','110','for today','#fb923c']].map(([l,v,s,c],i)=>{
        const x=206+i*180;
        return (
          <g key={i}>
            <rect x={x} y="116" width="166" height="86" rx="11" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
            <text x={x+16} y="140" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">{l}</text>
            <text x={x+16} y="172" fill={c} fontSize="24" fontFamily="'Space Grotesk'" fontWeight="700">{v}</text>
            <text x={x+16} y="190" fill="rgba(255,255,255,.3)" fontSize="9" fontFamily="system-ui">{s}</text>
          </g>
        );
      })}
      {/* footfall chart */}
      <rect x="206" y="218" width="430" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Footfall by hour</text>
      {[0,1,2,3].map(i=>(<line key={i} x1="224" y1={272+i*34} x2="616" y2={272+i*34} stroke="rgba(255,255,255,.04)"/>))}
      {[70,110,150,130,170,140,90,120].map((h,i)=>(<rect key={i} x={236+i*46} y={406-h*0.62} width="26" height={h*0.62} rx="3" fill={A} fillOpacity={i===4?.85:.34}/>))}
      {/* live visitor list */}
      <rect x="652" y="218" width="264" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="670" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">On-site now</text>
      {[['Ravi Menon','Sales',A],['Sara Ali','HR',A2],['Mira Das','Finance','#fb923c'],['Neil S','Legal','#a78bfa']].map(([n,d,c],i)=>(
        <g key={i}>
          <circle cx="680" cy={272+i*32} r="9" fill={c} fillOpacity=".7"/>
          <text x="680" y={276+i*32} textAnchor="middle" fill="#0a0a10" fontSize="8" fontFamily="'Space Grotesk'" fontWeight="700">{n[0]}</text>
          <text x="698" y={270+i*32} fill="rgba(255,255,255,.65)" fontSize="9.5" fontFamily="system-ui">{n}</text>
          <text x="698" y={282+i*32} fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="system-ui">Host dept: {d}</text>
          <circle cx="902" cy={274+i*32} r="3" fill={A}/>
        </g>
      ))}
      {/* watchlist / safety strip */}
      <rect x="206" y="434" width="710" height="74" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="460" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Security checks</text>
      {['ID verified','Watchlist clear','NDA signed','Host approved','Badge issued'].map((t,i)=>(
        <g key={i}>
          <rect x={224+i*140} y="474" width="124" height="22" rx="11" fill={A} fillOpacity=".12"/>
          <circle cx={238+i*140} cy="485" r="5" fill={A} fillOpacity=".85"/>
          <path d={`M${235+i*140} 485 l2 2 4-4`} stroke="#15200a" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          <text x={252+i*140} y="489" fill={A} fontSize="8.5" fontFamily="system-ui">{t}</text>
        </g>
      ))}
    </svg>
  );
}

export default function VisitorManagementPage() {
  return (
    <ProductPageLayout
      accent={A}
      category="Front-Desk Automation"
      breadcrumbLabel="Visitor Management"
      title="A front desk that *runs itself.*"
      lead="Digital check-in, ID verification, instant host alerts, badge printing and a searchable visitor log — replacing the paper register with a fast, secure, on-brand arrival experience."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '<em>40s</em>', label: 'Average self check-in time' },
        { value: '0', label: 'Paper registers to chase' },
        { value: '100%', label: 'Visitors logged & auditable' },
        { value: '24/7', label: 'Pre-registration & QR check-in' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'Every visitor, handled in seconds.',
        sub: 'From pre-registration to check-out, every arrival is captured, verified and logged — and the host knows the moment their guest walks in.',
        items: [
          { icon: I.scan, title: 'Self check-in', text: 'QR or kiosk check-in — scan ID, capture a photo, pick a host, done.', art: <ArtCheckin />, span: true },
          { icon: I.badge, title: 'Badge printing', text: 'Auto-printed photo badges with host, zone and expiry on arrival.', art: <ArtBadge /> },
          { icon: I.id, title: 'Visitor log', text: 'A live, searchable record of who is on-site, with full history.', art: <ArtLog /> },
          { icon: I.bell, title: 'Instant host alerts', text: 'Host gets a WhatsApp/Slack/email ping the second their guest checks in.', art: <ArtHostAlert /> },
          { icon: I.shield, title: 'Security & screening', text: 'ID verification, watchlist checks, NDAs and evacuation lists built in.' },
        ],
      }}
      light={{
        eyebrow: 'The arrival',
        heading: 'Expected to checked-out, tracked.',
        sub: 'A visitor moves from pre-registration through check-in, the meeting and check-out — every stage time-stamped and visible to security and reception.',
        mockup: <MockFlowBoard />,
        columns: [
          { icon: I.scan, title: 'Pre-register & invite', text: 'Send guests a QR invite so they breeze through check-in on arrival.' },
          { icon: I.bell, title: 'Check-in & notify', text: 'ID, photo and badge in seconds — the host is alerted instantly.' },
          { icon: I.chart, title: 'Check-out & report', text: 'Auto check-out, accurate on-site counts and analytics for facilities.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See the front desk in action.',
        sub: 'One console for reception and security — live footfall, who is on-site, and every safety check, in real time. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.scan, title: 'Digital check-in', text: 'Kiosk, QR and tablet check-in with photo capture and host selection.' },
          { icon: I.id, title: 'ID verification', text: 'Scan and verify government IDs; flag against watchlists automatically.' },
          { icon: I.bell, title: 'Host notifications', text: 'Instant WhatsApp, Slack, Teams or email alerts when a guest arrives.' },
          { icon: I.badge, title: 'Badge printing', text: 'On-demand photo badges with access zones and auto-expiry.' },
          { icon: I.shield, title: 'Safety & compliance', text: 'NDAs, health declarations, evacuation lists and full audit trails.' },
          { icon: I.chart, title: 'Visitor analytics', text: 'Footfall trends, peak hours, host load and on-site headcount.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Fits your existing stack.',
        items: [
          { label: 'Notifications', tech: 'WhatsApp, Slack, Microsoft Teams and email' },
          { label: 'Access control', tech: 'Door controllers, turnstiles and badge readers' },
          { label: 'Directory', tech: 'Azure AD / Google Workspace host sync' },
          { label: 'Hardware', tech: 'iPad/Android kiosks, badge & label printers, ID scanners' },
        ],
      }}
      faqItems={[
        { q: 'How fast is check-in for a visitor?', a: 'A pre-registered guest scans a QR code and is checked in within seconds. A walk-in scans their ID, takes a photo and selects a host — typically under 40 seconds, with the badge printing automatically.' },
        { q: 'Does the host get notified automatically?', a: 'Yes. The moment a visitor checks in, their host receives an alert over WhatsApp, Slack, Teams or email with the visitor’s name and photo, and can accept or send a quick "be right there".' },
        { q: 'Can it screen visitors for security?', a: 'Yes. It verifies government IDs, checks names against watchlists or denied-entry lists, captures NDAs or health declarations, and maintains an evacuation list of everyone currently on-site.' },
        { q: 'Does it work across multiple locations?', a: 'Yes. Manage many sites and kiosks from one console, with per-location hosts, badges and policies, and consolidated reporting across the whole organisation.' },
        { q: 'On-premise or cloud, and how long to go live?', a: 'Deploy on cloud or on-premise. A single-lobby setup with a kiosk and badge printer can go live in 2–4 weeks; multi-site rollouts with access-control and directory integration run 6–10 weeks.' },
      ]}
      cta={{
        label: 'Get started',
        heading: 'Ready to upgrade your lobby?',
        body: 'A focused walkthrough of the visitor experience mapped to your reception, hosts and security requirements.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
  );
}
