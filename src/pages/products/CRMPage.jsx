import ProductPageLayout from '../../components/ProductPageLayout';
import SEO from '../../components/SEO';

const A = '#a78bfa';              // CRM accent - violet
const A2 = '#22d3ee';            // cyan secondary for chart variety

/* ── feature icons ── */
const I = {
  funnel:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 8v6l-4 2v-8z"/></svg>,
  target:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>,
  bolt:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h8l-1 8 10-12h-8z"/></svg>,
  activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  chart:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l4-4 3 3 5-6"/></svg>,
  inbox:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 6h13l3.5 6v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/></svg>,
  phone:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>,
  link:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

const STAGE_TONES = ['#a78bfa', '#22d3ee', '#fb923c', '#34d399'];

/* ── hero: CRM pipeline dashboard ── */
function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">CRM - Pipeline</text>
      {/* sidebar */}
      <rect x="0" y="34" width="120" height="366" fill="#0a0a10"/>
      <rect x="14" y="50" width="92" height="26" rx="6" fill={A} fillOpacity=".14"/>
      <circle cx="28" cy="63" r="5" fill={A}/><rect x="40" y="59" width="54" height="6" rx="3" fill={A} fillOpacity=".8"/>
      {[0,1,2,3,4].map(i=>(
        <g key={i}>
          <circle cx="28" cy={98+i*30} r="5" fill="rgba(255,255,255,.14)"/>
          <rect x="40" y={94+i*30} width={[48,60,42,54,50][i]} height="6" rx="3" fill="rgba(255,255,255,.12)"/>
        </g>
      ))}
      {/* KPI cards */}
      {[['PIPELINE','₹3.2Cr',A],['DEALS','86',A2],['WIN RATE','34%',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="22" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      {/* deals-by-stage bars */}
      <rect x="138" y="144" width="264" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Deals by stage</text>
      {[150,120,96,72,40].map((h,i)=>(
        <g key={i}>
          <rect x={158+i*48} y={284-h*0.74} width="30" height={h*0.74} rx="4" fill={A} fillOpacity={i===0?.85:.34}/>
          <text x={173+i*48} y="296" textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize="7.5" fontFamily="system-ui">{['New','Qual','Prop','Neg','Won'][i]}</text>
        </g>
      ))}
      {/* hot leads */}
      <rect x="414" y="144" width="132" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="430" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Hot leads</text>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <circle cx="436" cy={188+i*26} r="8" fill={['#a78bfa','#22d3ee','#fb923c','#34d399'][i]} fillOpacity=".8"/>
          <rect x="450" y={183+i*26} width="58" height="5" rx="2.5" fill="rgba(255,255,255,.3)"/>
          <rect x="450" y={192+i*26} width="36" height="4" rx="2" fill="rgba(255,255,255,.13)"/>
        </g>
      ))}
      {/* quota progress */}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Q2 quota attainment</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="246" height="7" rx="3.5" fill={A} fillOpacity=".85"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">82%</text>
    </svg>
  );
}

/* ── bento: mini pipeline kanban (span) ── */
function ArtPipeline() {
  const cols = [['New', 4], ['Qualified', 3], ['Proposal', 2]];
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      {cols.map(([head, n], ci) => {
        const x = 12 + ci * 116;
        return (
          <g key={ci}>
            <circle cx={x + 5} cy="22" r="3.5" fill={STAGE_TONES[ci]}/>
            <text x={x + 15} y="25" fill="rgba(255,255,255,.5)" fontSize="9" fontFamily="'Space Grotesk'" fontWeight="600">{head}</text>
            <text x={x + 100} y="25" textAnchor="end" fill="rgba(255,255,255,.25)" fontSize="8" fontFamily="'JetBrains Mono',monospace">{n}</text>
            {[0, 1].map(r => (
              <g key={r}>
                <rect x={x} y={34 + r * 40} width="104" height="34" rx="6" fill="#15151d" stroke="rgba(255,255,255,.06)"/>
                <rect x={x + 10} y={42 + r * 40} width="60" height="5" rx="2.5" fill="rgba(255,255,255,.32)"/>
                <text x={x + 10} y={60 + r * 40} fill={STAGE_TONES[ci]} fontSize="8.5" fontFamily="'JetBrains Mono',monospace" fillOpacity=".85">₹ {(8 - ci * 2 - r)}.{r + 2}L</text>
                <circle cx={x + 94} cy={51 + r * 40} r="6" fill={STAGE_TONES[(ci + r) % 4]} fillOpacity=".7"/>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
function ArtLeadScore() {
  const rows = [['Acme Corp', 92], ['Nimbus Ltd', 78], ['Vertex Inc', 64], ['Orbit Co', 41]];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="26" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Lead score</text>
      {rows.map(([k, v], i) => (
        <g key={i}>
          <text x="14" y={50 + i * 26} fill="rgba(255,255,255,.55)" fontSize="9" fontFamily="system-ui">{k}</text>
          <rect x="14" y={54 + i * 26} width="150" height="6" rx="3" fill="rgba(255,255,255,.08)"/>
          <rect x="14" y={54 + i * 26} width={150 * (v / 100)} height="6" rx="3" fill={v > 70 ? A : A2} fillOpacity=".85"/>
          <text x="206" y={50 + i * 26} textAnchor="end" fill={v > 70 ? A : 'rgba(255,255,255,.5)'} fontSize="9" fontFamily="'JetBrains Mono',monospace">{v}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtSequence() {
  const steps = [['Day 0', 'Intro email', true], ['Day 2', 'LinkedIn touch', true], ['Day 5', 'Follow-up call', false], ['Day 9', 'Case study', false]];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Outreach sequence</text>
      <line x1="22" y1="38" x2="22" y2="134" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
      {steps.map(([d, t, done], i) => (
        <g key={i}>
          <circle cx="22" cy={46 + i * 24} r="5" fill={done ? A : '#15151d'} stroke={done ? A : 'rgba(255,255,255,.25)'} strokeWidth="1"/>
          {done && <path d={`M19.5 ${46 + i * 24} l2 2 3.5-4`} stroke="#0a0a10" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>}
          <text x="36" y={43 + i * 24} fill="rgba(255,255,255,.3)" fontSize="7.5" fontFamily="'JetBrains Mono',monospace">{d}</text>
          <text x="36" y={52 + i * 24} fill={done ? 'rgba(255,255,255,.65)' : 'rgba(255,255,255,.4)'} fontSize="9" fontFamily="system-ui">{t}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtActivity() {
  const items = [['Call logged', A], ['Email opened', A2], ['Meeting booked', '#34d399'], ['Note added', '#fb923c']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Activity feed</text>
      {items.map(([t, c], i) => (
        <g key={i}>
          <circle cx="20" cy={45 + i * 25} r="4" fill={c}/>
          <text x="32" y={48 + i * 25} fill="rgba(255,255,255,.6)" fontSize="9.5" fontFamily="system-ui">{t}</text>
          <text x="206" y={48 + i * 25} textAnchor="end" fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="'JetBrains Mono',monospace">{i + 1}h</text>
        </g>
      ))}
    </svg>
  );
}
function ArtForecast() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Forecast</text>
      {[0,1,2].map(i=>(<line key={i} x1="14" y1={50+i*28} x2="206" y2={50+i*28} stroke="rgba(255,255,255,.05)"/>))}
      <path d="M18 108 52 96 86 100 120 78 154 84 190 60" fill="none" stroke={A} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M18 108 52 96 86 100 120 78 154 84 190 60 190 120 18 120Z" fill={A} fillOpacity=".08"/>
      <path d="M190 60 L206 52" stroke={A2} strokeWidth="1.6" strokeDasharray="3 3"/>
      {[[18,108],[120,78],[190,60]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill={A}/>))}
    </svg>
  );
}

/* ── light section: deal board ── */
function MockDealBoard() {
  const cols = [
    { head: 'New', tone: A, cards: [['Acme Corp', '₹ 8.2L'], ['Nimbus Ltd', '₹ 5.4L']] },
    { head: 'Qualified', tone: A2, cards: [['Vertex Inc', '₹ 12.0L'], ['Orbit Co', '₹ 6.1L']] },
    { head: 'Proposal', tone: '#fb923c', cards: [['Zenith Group', '₹ 22.5L']] },
    { head: 'Won', tone: '#34d399', cards: [['Pulse Media', '₹ 14.8L'], ['Apex Labs', '₹ 9.3L']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">CRM - Deal Pipeline</text>
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
                <text x={x + 16} y={108 + i * 78} fill="rgba(255,255,255,.8)" fontSize="11.5" fontFamily="'Space Grotesk'" fontWeight="600">{c[0]}</text>
                <text x={x + 16} y={126 + i * 78} fill={col.tone} fontSize="11" fontFamily="'JetBrains Mono',monospace">{c[1]}</text>
                <circle cx={x + 196} cy={108 + i * 78} r="9" fill={col.tone} fillOpacity=".7"/>
                <text x={x + 196} y={112 + i * 78} textAnchor="middle" fill="#0a0a10" fontSize="9" fontFamily="'Space Grotesk'" fontWeight="700">{c[0][0]}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ── laser showpiece: CRM console ── */
function MockConsole() {
  return (
    <svg viewBox="0 0 940 540" xmlns="http://www.w3.org/2000/svg">
      <rect width="940" height="540" rx="16" fill="#0c0c12"/>
      <rect width="940" height="42" fill="#101018"/>
      <circle cx="24" cy="21" r="5" fill="#ff5f57"/><circle cx="43" cy="21" r="5" fill="#febc2e"/><circle cx="62" cy="21" r="5" fill="#28c840"/>
      <rect x="360" y="11" width="220" height="20" rx="10" fill="#181820"/>
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/crm</text>
      {/* sidebar */}
      <rect x="0" y="42" width="180" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="14" fontFamily="'Space Grotesk'" fontWeight="700">TechBird CRM</text>
      <rect x="16" y="94" width="148" height="30" rx="7" fill={A} fillOpacity=".14"/>
      <circle cx="32" cy="109" r="5" fill={A}/><text x="46" y="113" fill={A} fontSize="11" fontFamily="system-ui">Pipeline</text>
      {['Leads','Contacts','Accounts','Activities','Sequences','Reports','Settings'].map((t,i)=>(
        <g key={i}>
          <circle cx="32" cy={146+i*32} r="5" fill="rgba(255,255,255,.18)"/>
          <text x="46" y={150+i*32} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      {/* top bar */}
      <text x="206" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">Sales Pipeline</text>
      <text x="206" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">Q2 2026 · All reps</text>
      <rect x="772" y="60" width="144" height="32" rx="16" fill={A}/>
      <text x="844" y="80" textAnchor="middle" fill="#140e26" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">New Deal</text>
      {/* KPI row */}
      {[['OPEN PIPELINE','₹3.2Cr','86 deals',A],['WEIGHTED','₹1.4Cr','forecast',A2],['WIN RATE','34%','▲ 4%','#34d399'],['AVG CYCLE','21d','▼ 3d','#fb923c']].map(([l,v,s,c],i)=>{
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
      {/* pipeline columns */}
      {[['New', A, 2],['Qualified', A2, 2],['Proposal', '#fb923c', 1],['Won', '#34d399', 2]].map(([h,c,n],ci)=>{
        const x=206+ci*180;
        return (
          <g key={ci}>
            <circle cx={x+5} cy="234" r="4" fill={c}/>
            <text x={x+16} y="238" fill="rgba(255,255,255,.55)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">{h}</text>
            {Array.from({length:n}).map((_,r)=>(
              <g key={r}>
                <rect x={x} y={250+r*70} width="166" height="60" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
                <rect x={x} y={250+r*70} width="3.5" height="60" rx="2" fill={c}/>
                <rect x={x+16} y={266+r*70} width="86" height="6" rx="3" fill="rgba(255,255,255,.3)"/>
                <text x={x+16} y={292+r*70} fill={c} fontSize="11" fontFamily="'JetBrains Mono',monospace">₹ {12-ci*2-r}.{r+3}L</text>
                <circle cx={x+148} cy={272+r*70} r="9" fill={c} fillOpacity=".7"/>
              </g>
            ))}
          </g>
        );
      })}
      {/* bottom forecast strip */}
      <rect x="206" y="452" width="710" height="62" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="476" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Forecast to close · Q2</text>
      <rect x="224" y="488" width="560" height="8" rx="4" fill="rgba(255,255,255,.08)"/>
      <rect x="224" y="488" width="430" height="8" rx="4" fill={A} fillOpacity=".85"/>
      <text x="900" y="495" textAnchor="end" fill={A} fontSize="12" fontFamily="'Space Grotesk'" fontWeight="700">₹ 2.6Cr</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════ */
const faqItems = [
  { q: 'Can we migrate our existing leads and deals?', a: 'Yes. We import contacts, accounts, open deals and activity history from spreadsheets or your current CRM (HubSpot, Zoho, Salesforce, etc.), mapping stages and owners so nothing is lost in the move.' },
  { q: 'How does lead scoring work?', a: 'Scoring combines fit (company size, industry, region, role) with engagement (email opens, site visits, replies, meeting bookings). You define the weights, and the score updates in real time so reps always call the hottest leads first.' },
  { q: 'Can it automate follow-ups?', a: 'Yes. Build multi-step sequences across email, call tasks and WhatsApp/SMS, with branching based on replies and stage. Inactivity triggers reminders so deals never go cold from a forgotten follow-up.' },
  { q: 'Does it sync with our email and phone system?', a: 'Two-way sync with Gmail and Outlook logs every email automatically. Click-to-call with recording integrates with common telephony/IVR providers, and calls log against the contact without manual entry.' },
  { q: 'On-premise or cloud, and how long to go live?', a: 'Deploy on cloud or on-premise. A standard rollout with import, pipeline configuration and email/calendar sync runs 3–6 weeks; complex multi-team setups with telephony and custom automation run 8–12 weeks.' },
];

export default function CRMPage() {
  return (
    <>
    <SEO
      title="Lead & Sales CRM"
      description="TechBird Lead & Sales CRM - full-funnel pipeline management with lead scoring, automated follow-ups, activity tracking and revenue forecasting. Close more deals, lose fewer leads."
      keywords="CRM software, sales CRM, lead management, pipeline management, lead scoring, sales automation, deal tracking, follow-up automation, revenue forecasting, CRM India"
      faqItems={faqItems}
      softwareSchema={{ name: 'TechBird CRM', description: 'Lead capture, pipeline management, sales forecasting and automated follow-ups.', category: 'BusinessApplication' }}
    />
    <ProductPageLayout
      accent={A}
      category="Pipeline Intelligence"
      breadcrumbLabel="Lead & Sales CRM"
      title="Turn every lead into *closed revenue.*"
      lead="A full-funnel CRM that captures leads, scores them, automates follow-up and forecasts the quarter - so nothing slips and reps sell instead of doing data entry."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '<em>3×</em>', label: 'Faster lead follow-up' },
        { value: '+38%', label: 'Higher win rate on tracked deals' },
        { value: '1', label: 'Source of truth for the whole funnel' },
        { value: '0', label: 'Leads lost to forgotten follow-ups' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'Every deal, visible and moving forward.',
        sub: 'Lead, contact and account records are unified - so scoring, automation, activity and forecasting all run off the same data.',
        items: [
          { icon: I.funnel, title: 'Visual pipeline', text: 'Drag deals across stages, see weighted value update live, and spot what is stuck.', art: <ArtPipeline />, span: true },
          { icon: I.target, title: 'Lead capture & scoring', text: 'Auto-capture from forms, ads and inbox; rank by fit and intent.', art: <ArtLeadScore /> },
          { icon: I.bolt, title: 'Automated sequences', text: 'Multi-step email, call and message cadences that run themselves.', art: <ArtSequence /> },
          { icon: I.activity, title: 'Activity tracking', text: 'Every call, email and meeting logged against the contact automatically.', art: <ArtActivity /> },
          { icon: I.chart, title: 'Forecasting & reports', text: 'Weighted forecasts, rep leaderboards and conversion analytics out of the box.', art: <ArtForecast /> },
        ],
      }}
      light={{
        eyebrow: 'The funnel',
        heading: 'From first touch to closed-won.',
        sub: 'One continuous record follows every opportunity through capture, qualification, proposal and close - with full history at every stage.',
        mockup: <MockDealBoard />,
        columns: [
          { icon: I.target, title: 'Capture & qualify', text: 'Leads flow in from every channel, get scored, and route to the right rep instantly.' },
          { icon: I.bolt, title: 'Nurture & advance', text: 'Automated cadences and reminders keep deals moving without manual chasing.' },
          { icon: I.chart, title: 'Close & forecast', text: 'Quotes, approvals and won-deal handoff - with forecasts leadership can trust.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See the CRM in action.',
        sub: 'One console for the whole revenue motion - pipeline, weighted forecast, win rate and cycle time, live. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.funnel, title: 'Drag-and-drop pipeline', text: 'Move deals between stages; weighted value and forecast recompute instantly.' },
          { icon: I.target, title: 'Smart lead scoring', text: 'Fit + engagement scoring surfaces the leads worth calling first.' },
          { icon: I.bolt, title: 'Workflow automation', text: 'Trigger sequences, tasks and alerts on stage changes and inactivity.' },
          { icon: I.activity, title: 'Auto activity logging', text: 'Calls, emails and meetings captured against the right record, no typing.' },
          { icon: I.inbox, title: 'Inbox & calendar sync', text: 'Two-way sync with Gmail/Outlook and Google/Office calendars.' },
          { icon: I.chart, title: 'Forecasts & dashboards', text: 'Pipeline coverage, leaderboards and conversion funnels for every team.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Plugs into how you already sell.',
        items: [
          { label: 'Email & calendar', tech: 'Gmail, Outlook, Google & Office 365 two-way sync' },
          { label: 'Messaging', tech: 'WhatsApp, SMS and in-app chat for outreach' },
          { label: 'Telephony', tech: 'Click-to-call, call recording and IVR integrations' },
          { label: 'Lead sources', tech: 'Web forms, Meta & Google Ads, marketplaces, APIs' },
        ],
      }}
      faqItems={faqItems}
      cta={{
        label: 'Get started',
        heading: 'Ready to fix your pipeline?',
        body: 'A focused 30-minute walkthrough of the CRM mapped to your sales stages, lead sources and follow-up cadences.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
    </>
  );
}
