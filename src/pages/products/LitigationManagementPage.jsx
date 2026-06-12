import ProductPageLayout from '../../components/ProductPageLayout';

const A = '#fb923c';            // Litigation accent — orange
const A2 = '#38bdf8';          // blue secondary

const I = {
  gavel:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 13l-7 7M5 18l3 3M14.5 6.5l3 3M9 11l4-4 4 4-4 4zM16 4l4 4M3 22h8"/></svg>,
  calendar:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>,
  tasks:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></svg>,
  file:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>,
  clock:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  scale:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M7 21h10M5 7l-3 6h6zM19 7l-3 6h6zM5 7h14"/></svg>,
  bell:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>,
  link:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">Litigation — Caseload</text>
      <rect x="0" y="34" width="120" height="366" fill="#0a0a10"/>
      <rect x="14" y="50" width="92" height="26" rx="6" fill={A} fillOpacity=".14"/>
      <circle cx="28" cy="63" r="5" fill={A}/><rect x="40" y="59" width="54" height="6" rx="3" fill={A} fillOpacity=".8"/>
      {[0,1,2,3,4].map(i=>(<g key={i}><circle cx="28" cy={98+i*30} r="5" fill="rgba(255,255,255,.14)"/><rect x="40" y={94+i*30} width={[48,60,42,54,50][i]} height="6" rx="3" fill="rgba(255,255,255,.12)"/></g>))}
      {[['ACTIVE CASES','64',A],['HEARINGS','9',A2],['BILLABLE','182h',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="22" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      <rect x="138" y="144" width="264" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Upcoming hearings</text>
      {[['12 Jun','Acme v. Vertex',A],['14 Jun','State v. Roy',A2],['18 Jun','Orbit arbitration','#34d399'],['21 Jun','Zen appeal','#a78bfa']].map(([d,n,c],i)=>(
        <g key={i}>
          <rect x="154" y={178+i*28} width="234" height="22" rx="5" fill="#0f0f16"/>
          <rect x="154" y={178+i*28} width="3" height="22" rx="1.5" fill={c}/>
          <text x="166" y={193+i*28} fill="rgba(255,255,255,.4)" fontSize="8" fontFamily="'JetBrains Mono',monospace">{d}</text>
          <text x="214" y={193+i*28} fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="system-ui">{n}</text>
        </g>
      ))}
      <rect x="414" y="144" width="132" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="430" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">By status</text>
      {[['Discovery','42%',A],['Hearing','28%',A2],['Filed','18%','#34d399'],['Closed','12%','#6b6c6d']].map(([t,p,c],i)=>(
        <g key={i}>
          <text x="430" y={186+i*30} fill="rgba(255,255,255,.45)" fontSize="8" fontFamily="system-ui">{t}</text>
          <rect x="430" y={190+i*30} width="100" height="6" rx="3" fill="rgba(255,255,255,.08)"/>
          <rect x="430" y={190+i*30} width={parseInt(p)} height="6" rx="3" fill={c} fillOpacity=".8"/>
        </g>
      ))}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Billable target · this month</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="222" height="7" rx="3.5" fill={A} fillOpacity=".85"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">74%</text>
    </svg>
  );
}

function ArtCaseList() {
  const rows = [['Acme v. Vertex', 'Discovery', A], ['State v. Roy', 'Hearing', A2], ['Orbit Arbitration', 'Filed', '#34d399'], ['Zen Appeal', 'Discovery', A]];
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Case docket</text>
      {rows.map(([n, s, c], i) => (
        <g key={i}>
          <rect x="14" y={34 + i * 27} width="332" height="22" rx="5" fill="#15151d" stroke="rgba(255,255,255,.05)"/>
          <rect x="14" y={34 + i * 27} width="3" height="22" rx="1.5" fill={c}/>
          <text x="24" y={49 + i * 27} fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="system-ui">{n}</text>
          <text x="206" y={49 + i * 27} fill="rgba(255,255,255,.3)" fontSize="7.5" fontFamily="'JetBrains Mono',monospace">CASE-{1200 + i}</text>
          <rect x="282" y={38 + i * 27} width="58" height="14" rx="7" fill={c} fillOpacity=".15"/>
          <text x="311" y={48 + i * 27} textAnchor="middle" fill={c} fontSize="7.5" fontFamily="system-ui">{s}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtCourtCal() {
  const days = [['12', 'Acme v. V', A], ['14', 'State v. R', A2], ['18', 'Orbit', '#34d399']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Court calendar</text>
      {days.map(([d, n, c], i) => (
        <g key={i}>
          <rect x="14" y={36 + i * 34} width="192" height="28" rx="6" fill="#15151d" stroke="rgba(255,255,255,.06)"/>
          <rect x="20" y={42 + i * 34} width="26" height="16" rx="4" fill={c} fillOpacity=".2"/>
          <text x="33" y={54 + i * 34} textAnchor="middle" fill={c} fontSize="10" fontFamily="'Space Grotesk'" fontWeight="700">{d}</text>
          <text x="54" y={49 + i * 34} fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="system-ui">{n}</text>
          <text x="54" y={59 + i * 34} fill="rgba(255,255,255,.3)" fontSize="7" fontFamily="system-ui">Court Hall {i + 2} · 11:00</text>
        </g>
      ))}
    </svg>
  );
}
function ArtTasks() {
  const t = [['File reply', 'AT', true], ['Draft affidavit', 'RV', false], ['Brief counsel', 'MI', false]];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Tasks</text>
      {t.map(([k, who, done], i) => (
        <g key={i}>
          <rect x="14" y={36 + i * 32} width="14" height="14" rx="4" fill={done ? A : 'transparent'} stroke={done ? A : 'rgba(255,255,255,.2)'} strokeWidth="1"/>
          {done && <path d={`M18 ${43 + i * 32} l3 3 5-6`} stroke="#15110a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>}
          <text x="36" y={47 + i * 32} fill={done ? 'rgba(255,255,255,.4)' : 'rgba(255,255,255,.65)'} fontSize="9.5" fontFamily="system-ui" textDecoration={done ? 'line-through' : 'none'}>{k}</text>
          <circle cx="196" cy={43 + i * 32} r="9" fill={A} fillOpacity=".25"/>
          <text x="196" y={46 + i * 32} textAnchor="middle" fill={A} fontSize="8" fontFamily="'Space Grotesk'" fontWeight="700">{who}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtTime() {
  const rows = [['Drafting', '4.5h'], ['Court appearance', '3.0h'], ['Client call', '1.2h']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Time & billing</text>
      {rows.map(([k, v], i) => (
        <g key={i}>
          <text x="14" y={50 + i * 22} fill="rgba(255,255,255,.55)" fontSize="9.5" fontFamily="system-ui">{k}</text>
          <text x="206" y={50 + i * 22} textAnchor="end" fill="rgba(255,255,255,.65)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">{v}</text>
        </g>
      ))}
      <line x1="14" y1="120" x2="206" y2="120" stroke="rgba(255,255,255,.08)"/>
      <text x="14" y="138" fill={A} fontSize="10.5" fontFamily="'Space Grotesk'" fontWeight="700">Billable</text>
      <text x="206" y="138" textAnchor="end" fill={A} fontSize="10.5" fontFamily="'JetBrains Mono',monospace" fontWeight="700">8.7h · ₹ 43,500</text>
    </svg>
  );
}

function MockCaseBoard() {
  const cols = [
    { head: 'Intake', tone: '#6b6c6d', cards: [['Mehta Estate', 'Civil'], ['Apex IP claim', 'IP']] },
    { head: 'Discovery', tone: A, cards: [['Acme v. Vertex', 'Commercial'], ['Zen Appeal', 'Tax']] },
    { head: 'Hearing', tone: A2, cards: [['State v. Roy', 'Criminal']] },
    { head: 'Closed', tone: '#34d399', cards: [['Orbit Arbitration', 'Won'], ['Pulse Dispute', 'Settled']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">Litigation — Case Pipeline</text>
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
                <text x={x + 16} y={126 + i * 78} fill="rgba(255,255,255,.35)" fontSize="9" fontFamily="system-ui">{c[1]} · CASE-{1200 + ci * 3 + i}</text>
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
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/litigation</text>
      <rect x="0" y="42" width="180" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="13" fontFamily="'Space Grotesk'" fontWeight="700">TechBird Legal</text>
      <rect x="16" y="94" width="148" height="30" rx="7" fill={A} fillOpacity=".14"/>
      <circle cx="32" cy="109" r="5" fill={A}/><text x="46" y="113" fill={A} fontSize="11" fontFamily="system-ui">Caseload</text>
      {['Cases','Hearings','Documents','Tasks','Time & Billing','Clients','Reports'].map((t,i)=>(
        <g key={i}><circle cx="32" cy={146+i*32} r="5" fill="rgba(255,255,255,.18)"/><text x="46" y={150+i*32} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="system-ui">{t}</text></g>
      ))}
      <text x="206" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">Acme v. Vertex</text>
      <text x="206" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">CASE-1203 · Commercial · Discovery</text>
      <rect x="772" y="60" width="144" height="32" rx="16" fill={A}/>
      <text x="844" y="80" textAnchor="middle" fill="#15110a" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Log Time</text>
      {[['NEXT HEARING','12 Jun','Court 2',A],['TASKS DUE','4','this week',A2],['DOCUMENTS','86','linked','#34d399'],['BILLED','₹2.4L','to date','#a78bfa']].map(([l,v,s,c],i)=>{
        const x=206+i*180;
        return (
          <g key={i}>
            <rect x={x} y="116" width="166" height="86" rx="11" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
            <text x={x+16} y="140" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">{l}</text>
            <text x={x+16} y="172" fill={c} fontSize="22" fontFamily="'Space Grotesk'" fontWeight="700">{v}</text>
            <text x={x+16} y="190" fill="rgba(255,255,255,.3)" fontSize="9" fontFamily="system-ui">{s}</text>
          </g>
        );
      })}
      {/* case timeline */}
      <rect x="206" y="218" width="430" height="296" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Case timeline</text>
      <line x1="232" y1="262" x2="232" y2="500" stroke="rgba(255,255,255,.1)"/>
      {[['10 Mar','Complaint filed',A],['28 Mar','Summons issued',A2],['15 Apr','Written statement','#34d399'],['02 May','Discovery began',A],['12 Jun','Next hearing','#fb923c']].map(([d,t,c],i)=>(
        <g key={i}>
          <circle cx="232" cy={278+i*46} r="5" fill={i===4?'#15151d':c} stroke={c} strokeWidth="1.4"/>
          <text x="248" y={274+i*46} fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="'JetBrains Mono',monospace">{d}</text>
          <text x="248" y={287+i*46} fill="rgba(255,255,255,.65)" fontSize="10" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      {/* linked docs */}
      <rect x="652" y="218" width="264" height="296" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="670" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Linked documents</text>
      {[['Complaint.pdf',A],['Summons.pdf',A2],['Written Statement.docx','#34d399'],['Evidence Bundle.pdf','#a78bfa'],['Counsel Brief.docx','#fb923c'],['Cost Memo.xlsx',A]].map(([n,c],i)=>(
        <g key={i}>
          <rect x="668" y={260+i*38} width="232" height="30" rx="6" fill="#0f0f16"/>
          <rect x="678" y={268+i*38} width="13" height="16" rx="2" fill={c} fillOpacity=".35"/>
          <text x="700" y={279+i*38} fill="rgba(255,255,255,.6)" fontSize="9.5" fontFamily="system-ui">{n}</text>
        </g>
      ))}
    </svg>
  );
}

export default function LitigationManagementPage() {
  return (
    <ProductPageLayout
      accent={A}
      category="Legal Case Tracking"
      breadcrumbLabel="Litigation Management"
      title="Never miss a *court date again.*"
      lead="Cases, court dates, document linking, task assignment and time-billing in one place — built for law firms and in-house legal teams that juggle dozens of matters at once."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '0', label: 'Missed hearings or deadlines' },
        { value: '<em>1</em>', label: 'File per matter, fully linked' },
        { value: '2×', label: 'Faster document retrieval' },
        { value: '100%', label: 'Billable time captured' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'Every matter, every deadline, tracked.',
        sub: 'Cases, hearings, documents, tasks and time share one matter record — so nothing falls through the cracks and billing writes itself.',
        items: [
          { icon: I.gavel, title: 'Case management', text: 'Every matter with parties, status, history and linked documents in one view.', art: <ArtCaseList />, span: true },
          { icon: I.calendar, title: 'Court calendar', text: 'Hearing dates with automated reminders for the team and counsel.', art: <ArtCourtCal /> },
          { icon: I.tasks, title: 'Task assignment', text: 'Assign filings, drafts and follow-ups with due dates and ownership.', art: <ArtTasks /> },
          { icon: I.clock, title: 'Time & billing', text: 'Capture billable hours against matters and generate invoices.', art: <ArtTime /> },
          { icon: I.file, title: 'Document linking', text: 'Pleadings, evidence and orders attached and versioned per case.' },
        ],
      }}
      light={{
        eyebrow: 'The matter',
        heading: 'Intake to judgment, on record.',
        sub: 'A matter moves from intake through discovery and hearings to closure — every filing, date and hour captured against one case file.',
        mockup: <MockCaseBoard />,
        columns: [
          { icon: I.gavel, title: 'Open & assign', text: 'Create the matter, capture parties, set the team and link the first documents.' },
          { icon: I.calendar, title: 'Track & act', text: 'Hearings, tasks and filings with reminders so no deadline is ever missed.' },
          { icon: I.clock, title: 'Bill & close', text: 'Time entries roll into invoices; closed matters stay searchable and audited.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See the case file in action.',
        sub: 'One workspace per matter — hearings, timeline, linked documents and billed time, live. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.gavel, title: 'Matter workspace', text: 'Parties, status, timeline and documents for every case in one place.' },
          { icon: I.calendar, title: 'Hearing reminders', text: 'Automatic alerts for court dates, limitation periods and filing deadlines.' },
          { icon: I.file, title: 'Linked documents', text: 'Pleadings, evidence and orders attached, versioned and full-text searchable.' },
          { icon: I.tasks, title: 'Task & team tracking', text: 'Assign work with owners and due dates; see the whole team’s load.' },
          { icon: I.clock, title: 'Time capture & billing', text: 'Log billable hours against matters and generate client invoices.' },
          { icon: I.scale, title: 'Client & reporting', text: 'Client portals, matter status reports and recovery analytics.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Fits your existing stack.',
        items: [
          { label: 'Calendars', tech: 'Google & Outlook sync for hearings and deadlines' },
          { label: 'Documents', tech: 'TechBird DMS, Google Drive and e-signature' },
          { label: 'Communication', tech: 'Email, WhatsApp and SMS for client updates' },
          { label: 'Accounting', tech: 'Tally, ERPNext and Zoho Books for invoicing' },
        ],
      }}
      faqItems={[
        { q: 'How does it make sure we never miss a date?', a: 'Every hearing, limitation period and filing deadline is tracked against the matter with automated reminders to the responsible team members and counsel — over email, WhatsApp and in-app — at intervals you configure.' },
        { q: 'Can we link documents to a specific case?', a: 'Yes. Pleadings, evidence, orders and correspondence are attached to the matter, versioned, and full-text searchable (including OCR for scans), so the whole file is one click away in court or in chambers.' },
        { q: 'Does it handle time tracking and billing?', a: 'Yes. Log billable time against matters and activities, apply rates, and generate client invoices. Reports show recovery, write-offs and billable targets per lawyer and per matter.' },
        { q: 'Is it suitable for in-house legal teams too?', a: 'Absolutely. In-house teams use it to track litigation, manage external counsel, store contracts and report matter status and spend to the business — not just for billing.' },
        { q: 'On-premise or cloud, and how long to go live?', a: 'Deploy on-premise for confidentiality or on a private cloud. A standard firm rollout with matter import and calendar sync runs 4–8 weeks; larger firms with billing and DMS integration run 10–14 weeks.' },
      ]}
      cta={{
        label: 'Get started',
        heading: 'Ready to take control of your caseload?',
        body: 'A focused walkthrough mapped to your practice areas, court calendar and billing model.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
  );
}
