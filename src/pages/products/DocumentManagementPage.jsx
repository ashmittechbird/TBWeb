import ProductPageLayout from '../../components/ProductPageLayout';
import SEO from '../../components/SEO';

const A = '#22d3ee';            // DMS accent - cyan
const A2 = '#a78bfa';          // violet secondary

const I = {
  file:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>,
  history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v6h6"/><path d="M3.5 9a9 9 0 102.1-3.4L3 9"/><path d="M12 8v4l3 2"/></svg>,
  flow:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h6a3 3 0 013 3v6"/></svg>,
  folder:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 012-2h4l2 3h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>,
  pen:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3 0z"/><path d="M18 13l-1.5-1.5M2 21s3-1 5-3l9-9-2-2-9 9c-2 2-3 5-3 5z"/></svg>,
  search:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  lock:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>,
  link:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">DMS - Library</text>
      <rect x="0" y="34" width="120" height="366" fill="#0a0a10"/>
      <text x="14" y="58" fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="system-ui" letterSpacing="1">FOLDERS</text>
      {['Contracts','HR','Finance','Projects','Legal'].map((t,i)=>(
        <g key={i}>
          <rect x="12" y={68+i*30} width="96" height="22" rx="5" fill={i===0?A:'transparent'} fillOpacity={i===0?.14:1}/>
          <path d={`M20 ${75+i*30} h6 l1.5 2 h6 v8 h-13.5 z`} fill="none" stroke={i===0?A:'rgba(255,255,255,.3)'} strokeWidth="1"/>
          <text x="44" y={83+i*30} fill={i===0?A:'rgba(255,255,255,.45)'} fontSize="9" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      {[['DOCUMENTS','12,480',A],['STORAGE','64 GB',A2],['PENDING','7',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="21" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      <rect x="138" y="144" width="408" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Recent documents</text>
      {[['Master Services Agreement.pdf','v4',A],['Q2 Budget.xlsx','v2',A2],['Vendor NDA - Acme.docx','v1','#34d399'],['Board Minutes Jun.pdf','v3','#fb923c']].map(([n,v,c],i)=>(
        <g key={i}>
          <rect x="154" y={178+i*28} width="378" height="22" rx="5" fill="#0f0f16"/>
          <rect x="162" y={183+i*28} width="11" height="13" rx="2" fill={c} fillOpacity=".3"/>
          <text x="182" y={193+i*28} fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="system-ui">{n}</text>
          <rect x="494" y={182+i*28} width="30" height="14" rx="7" fill={c} fillOpacity=".15"/>
          <text x="509" y={192+i*28} textAnchor="middle" fill={c} fontSize="8" fontFamily="'JetBrains Mono',monospace">{v}</text>
        </g>
      ))}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Storage used</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="120" height="7" rx="3.5" fill={A} fillOpacity=".85"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">40%</text>
    </svg>
  );
}

function ArtDocList() {
  const rows = [['Master Agreement.pdf', 'v4', A], ['Q2 Budget.xlsx', 'v2', A2], ['Vendor NDA.docx', 'v1', '#34d399'], ['Policy Manual.pdf', 'v6', '#fb923c']];
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Versioned documents</text>
      {rows.map(([n, v, c], i) => (
        <g key={i}>
          <rect x="14" y={34 + i * 27} width="332" height="22" rx="5" fill="#15151d" stroke="rgba(255,255,255,.05)"/>
          <rect x="22" y={39 + i * 27} width="11" height="13" rx="2" fill={c} fillOpacity=".35"/>
          <text x="42" y={49 + i * 27} fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="system-ui">{n}</text>
          <rect x="306" y={38 + i * 27} width="32" height="14" rx="7" fill={c} fillOpacity=".15"/>
          <text x="322" y={48 + i * 27} textAnchor="middle" fill={c} fontSize="8" fontFamily="'JetBrains Mono',monospace">{v}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtVersions() {
  const v = [['v4', 'now', A], ['v3', '2d', A2], ['v2', '1w', '#6b6c6d'], ['v1', '3w', '#6b6c6d']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Version history</text>
      <line x1="22" y1="38" x2="22" y2="132" stroke="rgba(255,255,255,.1)"/>
      {v.map(([ver, t, c], i) => (
        <g key={i}>
          <circle cx="22" cy={46 + i * 26} r="5" fill={i === 0 ? A : '#15151d'} stroke={c} strokeWidth="1"/>
          <text x="36" y={44 + i * 26} fill="rgba(255,255,255,.6)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">{ver}</text>
          <text x="36" y={54 + i * 26} fill="rgba(255,255,255,.3)" fontSize="7.5" fontFamily="system-ui">edited {t} ago</text>
          {i === 0 && <text x="206" y={48 + i * 26} textAnchor="end" fill={A} fontSize="7.5" fontFamily="system-ui">CURRENT</text>}
        </g>
      ))}
    </svg>
  );
}
function ArtApproval() {
  const steps = [['Author', true], ['Manager', true], ['Legal', false], ['Publish', false]];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Approval flow</text>
      {steps.map(([t, done], i) => (
        <g key={i}>
          <rect x="14" y={36 + i * 26} width="192" height="20" rx="5" fill={done ? `${A}22` : '#15151d'} stroke={done ? A : 'rgba(255,255,255,.08)'} strokeWidth="0.5"/>
          <circle cx="26" cy={46 + i * 26} r="4" fill={done ? A : 'rgba(255,255,255,.2)'}/>
          {done && <path d={`M23.5 ${46 + i * 26} l1.8 1.8 3.2-3.6`} stroke="#0a0a10" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>}
          <text x="38" y={49 + i * 26} fill={done ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.4)'} fontSize="9" fontFamily="system-ui">{t}</text>
          <text x="200" y={49 + i * 26} textAnchor="end" fill={done ? A : 'rgba(255,255,255,.3)'} fontSize="7.5" fontFamily="system-ui">{done ? 'approved' : 'pending'}</text>
        </g>
      ))}
    </svg>
  );
}
function ArtEsign() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">E-signature</text>
      <rect x="14" y="34" width="192" height="74" rx="6" fill="#0f0f16" stroke="rgba(255,255,255,.08)"/>
      <path d="M30 86 q14 -28 26 -6 t24 -2 q10 -18 20 0 t22 -4" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="96" x2="190" y2="96" stroke="rgba(255,255,255,.15)" strokeDasharray="3 3"/>
      <text x="30" y="105" fill="rgba(255,255,255,.3)" fontSize="7" fontFamily="system-ui">Signed · A. Thakur</text>
      <rect x="14" y="118" width="100" height="20" rx="10" fill={A} fillOpacity=".15"/>
      <circle cx="26" cy="128" r="4" fill={A}/><path d="M23.5 128 l1.8 1.8 3.2-3.6" stroke="#0a0a10" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="38" y="131" fill={A} fontSize="8.5" fontFamily="system-ui">Verified · eIDAS</text>
    </svg>
  );
}

function MockApprovalBoard() {
  const cols = [
    { head: 'Draft', tone: '#6b6c6d', cards: [['NDA - Vertex', 'Legal'], ['SOW - Orbit', 'Sales']] },
    { head: 'In Review', tone: A2, cards: [['MSA - Acme', 'Manager'], ['Policy v6', 'HR']] },
    { head: 'Approved', tone: A, cards: [['Lease - Pune', 'Finance']] },
    { head: 'Signed', tone: '#34d399', cards: [['Contract - Zen', 'Legal'], ['PO - Apex', 'Ops']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">DMS - Approval Workflow</text>
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
                <rect x={x + 16} y={104 + i * 78} width="13" height="16" rx="2" fill={col.tone} fillOpacity=".35"/>
                <text x={x + 38} y={110 + i * 78} fill="rgba(255,255,255,.8)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">{c[0]}</text>
                <text x={x + 38} y={126 + i * 78} fill="rgba(255,255,255,.35)" fontSize="9" fontFamily="system-ui">{c[1]}</text>
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
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/dms</text>
      <rect x="0" y="42" width="190" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="14" fontFamily="'Space Grotesk'" fontWeight="700">TechBird DMS</text>
      <rect x="16" y="92" width="158" height="26" rx="13" fill="#13131b" stroke="rgba(255,255,255,.08)"/>
      <circle cx="30" cy="105" r="4" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
      <text x="42" y="108" fill="rgba(255,255,255,.3)" fontSize="9" fontFamily="system-ui">Search documents…</text>
      <text x="22" y="138" fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="system-ui" letterSpacing="1">FOLDERS</text>
      {['Contracts','HR','Finance','Projects','Legal','Compliance','Archive'].map((t,i)=>(
        <g key={i}>
          <path d={`M24 ${150+i*30} h7 l1.6 2.2 h7 v9 h-15.6 z`} fill="none" stroke={i===0?A:'rgba(255,255,255,.28)'} strokeWidth="1"/>
          <text x="48" y={159+i*30} fill={i===0?A:'rgba(255,255,255,.45)'} fontSize="11" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      <text x="216" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">Contracts</text>
      <text x="216" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">248 documents · 7 pending approval</text>
      <rect x="780" y="60" width="136" height="32" rx="16" fill={A}/>
      <text x="848" y="80" textAnchor="middle" fill="#04161a" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Upload</text>
      {[['DOCUMENTS','12,480','total',A],['PENDING','7','approvals',A2],['SIGNED','1,204','this year','#34d399'],['STORAGE','64 GB','of 160','#fb923c']].map(([l,v,s,c],i)=>{
        const x=216+i*176;
        return (
          <g key={i}>
            <rect x={x} y="116" width="162" height="84" rx="11" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
            <text x={x+14} y="140" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">{l}</text>
            <text x={x+14} y="172" fill={c} fontSize="23" fontFamily="'Space Grotesk'" fontWeight="700">{v}</text>
            <text x={x+14} y="190" fill="rgba(255,255,255,.3)" fontSize="9" fontFamily="system-ui">{s}</text>
          </g>
        );
      })}
      {/* document table */}
      <rect x="216" y="216" width="700" height="298" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="234" y="242" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">All contracts</text>
      <line x1="216" y1="256" x2="916" y2="256" stroke="rgba(255,255,255,.06)"/>
      {[['Name','OWNER','VERSION','STATUS']].map(()=>(
        <g key="h">
          <text x="248" y="274" fill="rgba(255,255,255,.3)" fontSize="8.5" fontFamily="system-ui" letterSpacing="1">NAME</text>
          <text x="620" y="274" fill="rgba(255,255,255,.3)" fontSize="8.5" fontFamily="system-ui" letterSpacing="1">OWNER</text>
          <text x="760" y="274" fill="rgba(255,255,255,.3)" fontSize="8.5" fontFamily="system-ui" letterSpacing="1">VER</text>
          <text x="840" y="274" fill="rgba(255,255,255,.3)" fontSize="8.5" fontFamily="system-ui" letterSpacing="1">STATUS</text>
        </g>
      ))}
      {[['Master Services Agreement.pdf','A. Thakur','v4','Signed','#34d399'],['Vendor NDA - Acme.docx','R. Verma','v1','In review',A2],['Lease Agreement - Pune.pdf','M. Iyer','v2','Approved',A],['Q2 Budget Sign-off.xlsx','D. Nair','v3','Pending','#fb923c'],['Board Resolution Jun.pdf','K. Khan','v1','Draft','#6b6c6d'],['Employment Contract.docx','A. Bose','v5','Signed','#34d399']].map(([n,o,v,s,c],i)=>{
        const y=290+i*36;
        return (
          <g key={i}>
            <rect x="232" y={y-12} width="13" height="16" rx="2" fill={c} fillOpacity=".35"/>
            <text x="252" y={y} fill="rgba(255,255,255,.7)" fontSize="10" fontFamily="system-ui">{n}</text>
            <text x="620" y={y} fill="rgba(255,255,255,.45)" fontSize="9.5" fontFamily="system-ui">{o}</text>
            <text x="762" y={y} fill="rgba(255,255,255,.5)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">{v}</text>
            <rect x="840" y={y-11} width="64" height="16" rx="8" fill={c} fillOpacity=".15"/>
            <text x="872" y={y} textAnchor="middle" fill={c} fontSize="8" fontFamily="system-ui">{s}</text>
            <line x1="232" y1={y+12} x2="900" y2={y+12} stroke="rgba(255,255,255,.04)"/>
          </g>
        );
      })}
    </svg>
  );
}

const faqItems = [
  { q: 'How does version control work?', a: 'Every save creates a new version while preserving all prior ones. You can compare versions, see who changed what and when, and restore any earlier version. No more emailing "final" files back and forth.' },
  { q: 'Are the e-signatures legally valid?', a: 'Yes. The built-in e-signature captures intent, identity and a tamper-evident audit trail with timestamps. We also integrate DocuSign and Aadhaar eSign where a specific standard (eIDAS, IT Act) is required.' },
  { q: 'Can we control who sees what?', a: 'Granular, role-based permissions apply at folder, document and action level (view, edit, download, share, delete). Every access and change is logged for a complete audit trail.' },
  { q: 'Can it search inside documents?', a: 'Yes. Full-text indexing (including OCR for scanned PDFs and images) lets you find documents by their content, not just file names - across the entire archive in seconds.' },
  { q: 'On-premise or cloud, and how long to go live?', a: 'Deploy on-premise for data sovereignty, or on your private cloud. A standard rollout with folder structure, permissions and migration runs 4–8 weeks; large archives with OCR and integrations run 10–14 weeks.' },
];

export default function DocumentManagementPage() {
  return (
    <>
    <SEO
      title="Document Management System"
      description="TechBird Document Management System - centralised storage, version control, approval workflows, e-signatures and role-based access. Eliminate paper chaos and scattered drives at enterprise scale."
      keywords="document management system, DMS, version control, e-signature, approval workflow, document storage, role-based access, audit trail, full-text search, enterprise DMS India"
      faqItems={faqItems}
      softwareSchema={{ name: 'TechBird DMS', description: 'Version-controlled document storage with OCR, search, audit trails and workflows.', category: 'BusinessApplication' }}
    />
    <ProductPageLayout
      accent={A}
      category="Enterprise DMS"
      breadcrumbLabel="Document Management"
      title="Every document, *under control.*"
      lead="Centralised storage with version control, approval workflows, e-signatures and role-based access - so the right people find the right file, and the wrong people never do."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '<em>0</em>', label: 'Lost files & duplicate versions' },
        { value: '100%', label: 'Audit trail on every change' },
        { value: '5s', label: 'Full-text search across the archive' },
        { value: '24/7', label: 'Secure access from anywhere' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'Replace the shared drive chaos.',
        sub: 'Every document has a single home, a full version history and a clear access policy - with approvals and signatures built into the flow.',
        items: [
          { icon: I.file, title: 'Central library', text: 'One organised, searchable repository with folder hierarchy and metadata tagging.', art: <ArtDocList />, span: true },
          { icon: I.history, title: 'Version control', text: 'Every edit kept, compared and restorable - no more "final_v7_FINAL".', art: <ArtVersions /> },
          { icon: I.flow, title: 'Approval workflows', text: 'Route documents through multi-stage review and sign-off automatically.', art: <ArtApproval /> },
          { icon: I.pen, title: 'E-signatures', text: 'Legally valid digital signing built in, with verification and timestamps.', art: <ArtEsign /> },
          { icon: I.lock, title: 'Role-based access', text: 'Granular permissions per folder, document and action - fully audited.' },
        ],
      }}
      light={{
        eyebrow: 'Lifecycle',
        heading: 'Draft, review, sign, archive.',
        sub: 'A document moves from draft through review and sign-off to a controlled archive - every step logged, every version preserved.',
        mockup: <MockApprovalBoard />,
        columns: [
          { icon: I.file, title: 'Create & store', text: 'Upload or author in place, tag with metadata, and file it where it belongs.' },
          { icon: I.flow, title: 'Review & sign', text: 'Multi-stage approvals and built-in e-signature close documents out cleanly.' },
          { icon: I.lock, title: 'Secure & retain', text: 'Retention policies, access control and a complete audit trail for compliance.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See the DMS in action.',
        sub: 'One library for the whole organisation - documents, versions, approvals and signatures, fully searchable. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.file, title: 'Centralised storage', text: 'Folder hierarchy, metadata and a single source of truth for every file.' },
          { icon: I.history, title: 'Full version history', text: 'Track, compare and restore any prior version with a complete change log.' },
          { icon: I.flow, title: 'Approval workflows', text: 'Configurable multi-stage routing with reminders and escalation.' },
          { icon: I.pen, title: 'Built-in e-signature', text: 'Send for signature and capture legally valid, verifiable signatures.' },
          { icon: I.search, title: 'Full-text search', text: 'Find documents by content, name, tag or metadata in seconds - even inside PDFs.' },
          { icon: I.lock, title: 'Access & audit', text: 'Role-based permissions and a tamper-evident audit trail on every action.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Fits your existing stack.',
        items: [
          { label: 'Storage & cloud', tech: 'On-premise, AWS S3, GCP and Azure Blob backends' },
          { label: 'E-signature', tech: 'Built-in signing plus DocuSign / Aadhaar eSign options' },
          { label: 'Productivity', tech: 'Office, Google Workspace and email capture' },
          { label: 'Systems', tech: 'ERP, CRM and HRMS via REST API and webhooks' },
        ],
      }}
      faqItems={faqItems}
      cta={{
        label: 'Get started',
        heading: 'Ready to tame your documents?',
        body: 'A focused walkthrough of the DMS mapped to your folder structure, approval flows and access policies.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
    </>
  );
}
