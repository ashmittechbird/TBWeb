import ProductPageLayout from '../../components/ProductPageLayout';

const A = '#38bdf8';            // Practice accent — sky blue
const A2 = '#a78bfa';          // violet secondary

const I = {
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>,
  record:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>,
  invoice:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M10 13h4M10 17h4"/></svg>,
  bell:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>,
  shield:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  portal:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  pulse:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  link:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">Practice — Today</text>
      <rect x="0" y="34" width="120" height="366" fill="#0a0a10"/>
      <rect x="14" y="50" width="92" height="26" rx="6" fill={A} fillOpacity=".14"/>
      <circle cx="28" cy="63" r="5" fill={A}/><rect x="40" y="59" width="54" height="6" rx="3" fill={A} fillOpacity=".8"/>
      {[0,1,2,3,4].map(i=>(<g key={i}><circle cx="28" cy={98+i*30} r="5" fill="rgba(255,255,255,.14)"/><rect x="40" y={94+i*30} width={[48,60,42,54,50][i]} height="6" rx="3" fill="rgba(255,255,255,.12)"/></g>))}
      {[['APPTS TODAY','28',A],['PATIENTS','4,210',A2],['REVENUE','₹1.8L',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="22" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      <rect x="138" y="144" width="264" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Today's schedule</text>
      {[['09:00','Riya Sen',A],['09:30',' Amit K',A2],['10:15','Neha P','#34d399'],['11:00','Sims R','#fb923c']].map(([t,n,c],i)=>(
        <g key={i}>
          <rect x="154" y={178+i*28} width="234" height="22" rx="5" fill="#0f0f16"/>
          <rect x="154" y={178+i*28} width="3" height="22" rx="1.5" fill={c}/>
          <text x="166" y={193+i*28} fill="rgba(255,255,255,.4)" fontSize="8.5" fontFamily="'JetBrains Mono',monospace">{t}</text>
          <text x="210" y={193+i*28} fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="system-ui">{n}</text>
        </g>
      ))}
      <rect x="414" y="144" width="132" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="430" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Queue</text>
      {['Waiting','In consult','Billing'].map((t,i)=>(
        <g key={i}>
          <text x="430" y={188+i*40} fill="rgba(255,255,255,.4)" fontSize="8.5" fontFamily="system-ui">{t}</text>
          <text x="530" y={188+i*40} textAnchor="end" fill={A} fontSize="14" fontFamily="'Space Grotesk'" fontWeight="700">{[6,2,3][i]}</text>
          <rect x="430" y={194+i*40} width="100" height="5" rx="2.5" fill="rgba(255,255,255,.08)"/>
          <rect x="430" y={194+i*40} width={[80,40,52][i]} height="5" rx="2.5" fill={A} fillOpacity=".7"/>
        </g>
      ))}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Chair / room utilisation</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="258" height="7" rx="3.5" fill={A} fillOpacity=".85"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">86%</text>
    </svg>
  );
}

function ArtCalendar() {
  const slots = [['Dr. Rao', [1,1,0,1,0]], ['Dr. Sen', [0,1,1,0,1]], ['Dr. Iyer', [1,0,1,1,0]]];
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="22" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Appointment grid</text>
      {['9','10','11','12','1'].map((h,i)=>(<text key={i} x={92+i*52} y="40" textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize="7.5" fontFamily="'JetBrains Mono',monospace">{h}:00</text>))}
      {slots.map(([dr, row], r) => (
        <g key={r}>
          <text x="14" y={62 + r * 30} fill="rgba(255,255,255,.5)" fontSize="8.5" fontFamily="system-ui">{dr}</text>
          {row.map((on, c) => (
            <rect key={c} x={72 + c * 52} y={50 + r * 30} width="44" height="18" rx="4" fill={on ? A : 'rgba(255,255,255,.05)'} fillOpacity={on ? 0.7 : 1}/>
          ))}
        </g>
      ))}
    </svg>
  );
}
function ArtRecord() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <circle cx="30" cy="34" r="14" fill={A} fillOpacity=".2"/>
      <text x="30" y="39" textAnchor="middle" fill={A} fontSize="12" fontFamily="'Space Grotesk'" fontWeight="700">RS</text>
      <text x="52" y="30" fill="rgba(255,255,255,.7)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">Riya Sen</text>
      <text x="52" y="44" fill="rgba(255,255,255,.35)" fontSize="8.5" fontFamily="system-ui">ID #4821 · 34F · O+</text>
      {[['Allergies', 'Penicillin'], ['Last visit', '12 May'], ['Next', 'Today 09:00'], ['Plan', 'Follow-up']].map(([k, v], i) => (
        <g key={i}>
          <text x="14" y={74 + i * 18} fill="rgba(255,255,255,.35)" fontSize="8.5" fontFamily="system-ui">{k}</text>
          <text x="206" y={74 + i * 18} textAnchor="end" fill="rgba(255,255,255,.6)" fontSize="8.5" fontFamily="system-ui">{v}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtBilling() {
  const rows = [['Consultation', '₹ 800'], ['Lab — CBC', '₹ 450'], ['Pharmacy', '₹ 1,240']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Invoice #INV-2210</text>
      <rect x="158" y="13" width="48" height="16" rx="8" fill={A} fillOpacity=".15"/>
      <text x="182" y="24" textAnchor="middle" fill={A} fontSize="8" fontFamily="system-ui">PAID</text>
      {rows.map(([k, v], i) => (
        <g key={i}>
          <text x="14" y={50 + i * 20} fill="rgba(255,255,255,.5)" fontSize="9.5" fontFamily="system-ui">{k}</text>
          <text x="206" y={50 + i * 20} textAnchor="end" fill="rgba(255,255,255,.65)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">{v}</text>
        </g>
      ))}
      <line x1="14" y1="118" x2="206" y2="118" stroke="rgba(255,255,255,.08)"/>
      <text x="14" y="136" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Total</text>
      <text x="206" y="136" textAnchor="end" fill={A} fontSize="11" fontFamily="'JetBrains Mono',monospace" fontWeight="700">₹ 2,490</text>
    </svg>
  );
}

function MockScheduleBoard() {
  const cols = [
    { head: 'Booked', tone: A, cards: [['Riya Sen', '09:00 · Dr. Rao'], ['Amit K', '09:30 · Dr. Sen']] },
    { head: 'Checked-in', tone: A2, cards: [['Neha P', 'Waiting 8m'], ['Sims R', 'Waiting 3m']] },
    { head: 'In consult', tone: '#fb923c', cards: [['Vikram J', 'Dr. Iyer']] },
    { head: 'Completed', tone: '#34d399', cards: [['Anita D', 'Billed'], ['Rahul M', 'Billed']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">Practice — Patient Flow</text>
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
                <text x={x + 22} y={121 + i * 78} textAnchor="middle" fill="#04141a" fontSize="10" fontFamily="'Space Grotesk'" fontWeight="700">{c[0][0]}</text>
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
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/practice</text>
      <rect x="0" y="42" width="180" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="13" fontFamily="'Space Grotesk'" fontWeight="700">TechBird Practice</text>
      <rect x="16" y="94" width="148" height="30" rx="7" fill={A} fillOpacity=".14"/>
      <circle cx="32" cy="109" r="5" fill={A}/><text x="46" y="113" fill={A} fontSize="11" fontFamily="system-ui">Schedule</text>
      {['Patients','Appointments','Clinical','Billing','Pharmacy','Reports','Settings'].map((t,i)=>(
        <g key={i}><circle cx="32" cy={146+i*32} r="5" fill="rgba(255,255,255,.18)"/><text x="46" y={150+i*32} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="system-ui">{t}</text></g>
      ))}
      <text x="206" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">Today's Schedule</text>
      <text x="206" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">Tue 10 Jun · 3 practitioners</text>
      <rect x="772" y="60" width="144" height="32" rx="16" fill={A}/>
      <text x="844" y="80" textAnchor="middle" fill="#04141a" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Book Appt</text>
      {[['APPTS','28','today',A],['CHECKED-IN','11','waiting',A2],['REVENUE','₹1.8L','today','#34d399'],['NO-SHOWS','2','1.6%','#fb923c']].map(([l,v,s,c],i)=>{
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
      {/* schedule timeline */}
      <rect x="206" y="218" width="430" height="296" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Dr. Rao · Room 2</text>
      {['09:00','09:30','10:00','10:30','11:00','11:30'].map((t,i)=>(
        <g key={i}>
          <text x="232" y={272+i*38} fill="rgba(255,255,255,.3)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{t}</text>
          <line x1="272" y1={268+i*38} x2="616" y2={268+i*38} stroke="rgba(255,255,255,.05)"/>
          {[0,1,3,4].includes(i) && (
            <g>
              <rect x="278" y={258+i*38} width="330" height="24" rx="6" fill={[A,A2,A,'#34d399',A,A2][i]} fillOpacity=".16" stroke={[A,A2,A,'#34d399',A,A2][i]} strokeWidth="0.5" strokeOpacity=".4"/>
              <text x="290" y={274+i*38} fill="rgba(255,255,255,.7)" fontSize="9.5" fontFamily="system-ui">{['Riya Sen — Follow-up','Amit K — Consult','','Neha P — Review','Sims R — New','' ][i]}</text>
            </g>
          )}
        </g>
      ))}
      {/* patient record panel */}
      <rect x="652" y="218" width="264" height="296" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <circle cx="684" cy="252" r="18" fill={A} fillOpacity=".2"/>
      <text x="684" y="258" textAnchor="middle" fill={A} fontSize="14" fontFamily="'Space Grotesk'" fontWeight="700">RS</text>
      <text x="712" y="246" fill="rgba(255,255,255,.8)" fontSize="13" fontFamily="'Space Grotesk'" fontWeight="600">Riya Sen</text>
      <text x="712" y="262" fill="rgba(255,255,255,.35)" fontSize="9.5" fontFamily="system-ui">#4821 · 34F · O+</text>
      {[['Allergies','Penicillin'],['BP','118 / 76'],['Last visit','12 May 2026'],['Diagnosis','Hypertension'],['Plan','Continue Rx']].map(([k,v],i)=>(
        <g key={i}>
          <text x="672" y={296+i*30} fill="rgba(255,255,255,.35)" fontSize="9" fontFamily="system-ui">{k}</text>
          <text x="900" y={296+i*30} textAnchor="end" fill="rgba(255,255,255,.65)" fontSize="9.5" fontFamily="system-ui">{v}</text>
          <line x1="672" y1={306+i*30} x2="900" y2={306+i*30} stroke="rgba(255,255,255,.05)"/>
        </g>
      ))}
      <rect x="672" y="476" width="228" height="26" rx="13" fill={A} fillOpacity=".16"/>
      <text x="786" y="493" textAnchor="middle" fill={A} fontSize="10" fontFamily="'Space Grotesk'" fontWeight="600">Start consultation</text>
    </svg>
  );
}

export default function PracticeManagementPage() {
  return (
    <ProductPageLayout
      accent={A}
      category="Healthcare & Legal"
      breadcrumbLabel="Practice Management"
      title="Run the practice, *not the paperwork.*"
      lead="Appointments, patient or client records, billing and compliance in one interface — for clinics, hospitals and law firms. Less front-desk chaos, more time with the people who matter."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '–35%', label: 'No-shows with automated reminders' },
        { value: '<em>1</em>', label: 'Record per patient or client' },
        { value: '2×', label: 'Faster check-in to billing' },
        { value: '24/7', label: 'Self-service booking & portal' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'Front desk to follow-up, handled.',
        sub: 'Scheduling, records, billing and reminders share one patient/client profile — so the whole visit flows without re-entering anything.',
        items: [
          { icon: I.calendar, title: 'Smart scheduling', text: 'Multi-practitioner, multi-room calendars with online booking and waitlists.', art: <ArtCalendar />, span: true },
          { icon: I.record, title: 'Patient / case records', text: 'Complete history, notes, documents and prescriptions in one profile.', art: <ArtRecord /> },
          { icon: I.invoice, title: 'Billing & payments', text: 'Itemised invoices, insurance, packages and online payment collection.', art: <ArtBilling /> },
          { icon: I.bell, title: 'Reminders', text: 'Automated WhatsApp, SMS and email reminders cut no-shows sharply.' },
          { icon: I.shield, title: 'Compliance & privacy', text: 'Role-based access, consent capture and audit trails for regulated data.' },
        ],
      }}
      light={{
        eyebrow: 'The visit',
        heading: 'Booked to billed, in one flow.',
        sub: 'A patient moves from booking through check-in, consultation and billing — each step updating one shared record with no duplicate entry.',
        mockup: <MockScheduleBoard />,
        columns: [
          { icon: I.calendar, title: 'Book & remind', text: 'Online or front-desk booking with automatic reminders to reduce no-shows.' },
          { icon: I.record, title: 'Consult & document', text: 'Notes, vitals, prescriptions and documents captured against the record.' },
          { icon: I.invoice, title: 'Bill & follow up', text: 'Invoice, collect payment and schedule the next visit before they leave.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See the platform in action.',
        sub: 'One console for the whole practice — schedule, patient queue, records and billing, live. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.calendar, title: 'Appointment scheduling', text: 'Multi-practitioner calendars, online booking, reminders and waitlists.' },
          { icon: I.record, title: 'Records & clinical notes', text: 'Full history, documents, vitals and prescriptions in one secure profile.' },
          { icon: I.invoice, title: 'Billing & insurance', text: 'Itemised invoicing, packages, insurance claims and online payments.' },
          { icon: I.bell, title: 'Automated reminders', text: 'WhatsApp, SMS and email reminders and recalls that cut no-shows.' },
          { icon: I.portal, title: 'Patient portal', text: 'Self-service booking, reports and payment access for patients and clients.' },
          { icon: I.shield, title: 'Compliance-ready', text: 'Consent, audit trails and role-based access for regulated environments.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Fits your existing stack.',
        items: [
          { label: 'Communication', tech: 'WhatsApp, SMS and email for reminders and reports' },
          { label: 'Payments', tech: 'UPI, cards and payment gateways with auto-reconcile' },
          { label: 'Diagnostics', tech: 'Lab/imaging systems and HL7/FHIR data exchange' },
          { label: 'Accounting', tech: 'Tally, ERPNext and Zoho Books exports' },
        ],
      }}
      faqItems={[
        { q: 'Is this for clinics, hospitals or law firms?', a: 'All three. The same engine — scheduling, records, billing, compliance — adapts to a single-doctor clinic, a multi-department hospital, or a law firm managing client matters and appointments. We configure terminology and workflows to your domain.' },
        { q: 'Can patients or clients book online themselves?', a: 'Yes. A self-service portal and booking widget let people see availability and book without calling. They also get reminders, reports and online payment links, which cuts front-desk load significantly.' },
        { q: 'How does it reduce no-shows?', a: 'Automated reminders go out over WhatsApp, SMS and email at configurable intervals before each appointment, with easy reschedule links. Practices typically see no-shows drop by a third or more.' },
        { q: 'Is patient data kept private and compliant?', a: 'Yes. Role-based access controls who can see what, consent is captured and logged, and every record access is audited. Data can be hosted on-premise or in a private cloud for sovereignty requirements.' },
        { q: 'On-premise or cloud, and how long to go live?', a: 'Deploy on-premise or on a private cloud. A single-location practice can go live in 3–5 weeks; multi-location or hospital deployments with diagnostics and insurance integrations run 8–14 weeks.' },
      ]}
      cta={{
        label: 'Get started',
        heading: 'Ready to streamline your practice?',
        body: 'A focused walkthrough mapped to your appointment types, billing and the way your front desk actually runs.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
  );
}
