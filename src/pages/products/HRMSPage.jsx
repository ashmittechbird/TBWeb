import ProductPageLayout from '../../components/ProductPageLayout';

const A = '#2b93e0';              // HRMS accent — TechBird logo blue (bright)
const A2 = '#22d3ee';             // teal secondary (bird-mark gradient) for chart variety

/* ──────────────────────────────────────────────
   Feature icons (lucide-style, 24×24 stroke)
   ────────────────────────────────────────────── */
const I = {
  payroll:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>,
  clock:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  calendar:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>,
  users:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  award:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5"/></svg>,
  shield:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  fingerprint:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 00-2 2c0 1.5.5 3 1 4M7 19c-1-2-1.5-4-1.5-7a6.5 6.5 0 0113 0M4.5 13c0-4 3-7 7.5-7s7.5 3 7.5 8M16.5 18c.5-2 .5-4 .5-6"/></svg>,
  portal:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  briefcase:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  logout:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  bolt:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h8l-1 8 10-12h-8z"/></svg>,
  link:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>,
};

/* ──────────────────────────────────────────────
   MOCKUP — Hero dashboard (compact)
   ────────────────────────────────────────────── */
function MockHeroDash() {
  return (
    <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" rx="14" fill="#0d0d13"/>
      {/* titlebar */}
      <rect width="560" height="34" fill="#121219"/>
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57"/><circle cx="33" cy="17" r="4.5" fill="#febc2e"/><circle cx="48" cy="17" r="4.5" fill="#28c840"/>
      <text x="280" y="21" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">HRMS — Dashboard</text>
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
      {[['Headcount','248',A],['Payroll','₹42.6L',A2],['Present','231',A]].map(([l,v,c],i)=>(
        <g key={i}>
          <rect x={138+i*138} y="50" width="126" height="78" rx="9" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
          <text x={154+i*138} y="74" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="system-ui" letterSpacing="1">{l.toUpperCase()}</text>
          <text x={154+i*138} y="102" fill={c} fontSize="24" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{v}</text>
          <circle cx={250+i*138} cy="64" r="4" fill={c} fillOpacity=".7"/>
        </g>
      ))}
      {/* attendance bar chart */}
      <rect x="138" y="144" width="264" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Attendance · this week</text>
      {[120,150,108,168,140,72,40].map((h,i)=>(
        <g key={i}>
          <rect x={158+i*32} y={284-h*0.78} width="18" height={h*0.78} rx="4" fill={A} fillOpacity={i===3?.85:.32}/>
          <text x={167+i*32} y="296" textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="system-ui">{['M','T','W','T','F','S','S'][i]}</text>
        </g>
      ))}
      {/* directory list */}
      <rect x="414" y="144" width="132" height="156" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="430" y="166" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Recent hires</text>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <circle cx="436" cy={188+i*26} r="8" fill={['#5683da','#34d399','#fb923c','#a78bfa'][i]} fillOpacity=".8"/>
          <rect x="450" y={183+i*26} width="60" height="5" rx="2.5" fill="rgba(255,255,255,.3)"/>
          <rect x="450" y={192+i*26} width="40" height="4" rx="2" fill="rgba(255,255,255,.13)"/>
        </g>
      ))}
      {/* footer row */}
      <rect x="138" y="316" width="408" height="68" rx="10" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="154" y="338" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Payroll run · June 2026</text>
      <rect x="154" y="350" width="300" height="7" rx="3.5" fill="rgba(255,255,255,.08)"/>
      <rect x="154" y="350" width="232" height="7" rx="3.5" fill={A} fillOpacity=".8"/>
      <text x="500" y="356" textAnchor="end" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">78%</text>
    </svg>
  );
}

/* ── small bento arts ── */
function ArtPayslip() {
  return (
    <svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="150" rx="8" fill="#0a0a10"/>
      <text x="16" y="28" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">Payslip · June 2026</text>
      <rect x="280" y="14" width="64" height="18" rx="9" fill={A} fillOpacity=".15"/>
      <text x="312" y="27" textAnchor="middle" fill={A} fontSize="9" fontFamily="system-ui">PAID</text>
      {[['Basic','₹ 48,000'],['HRA','₹ 19,200'],['Allowances','₹ 12,500'],['PF / ESI','– ₹ 5,760'],['TDS','– ₹ 4,100']].map(([k,v],i)=>(
        <g key={i}>
          <text x="16" y={52+i*18} fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">{k}</text>
          <text x="344" y={52+i*18} textAnchor="end" fill="rgba(255,255,255,.7)" fontSize="10" fontFamily="'JetBrains Mono',monospace">{v}</text>
        </g>
      ))}
      <line x1="16" y1="128" x2="344" y2="128" stroke="rgba(255,255,255,.08)"/>
      <text x="16" y="144" fill={A} fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Net pay</text>
      <text x="344" y="144" textAnchor="end" fill={A} fontSize="11" fontFamily="'JetBrains Mono',monospace" fontWeight="700">₹ 69,840</text>
    </svg>
  );
}
function ArtHeatmap() {
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="26" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Attendance grid</text>
      {Array.from({length:5}).map((_,r)=>(
        Array.from({length:10}).map((_,c)=>{
          const v = (r*7+c*3)%5;
          const op = [0.08,0.22,0.4,0.62,0.85][v];
          return <rect key={`${r}-${c}`} x={14+c*20} y={40+r*20} width="15" height="15" rx="3" fill={A} fillOpacity={op}/>;
        })
      ))}
    </svg>
  );
}
function ArtLeave() {
  const rows = [['Casual',8,12],['Sick',5,10],['Earned',14,18],['Comp-off',2,4]];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="26" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Leave balance</text>
      {rows.map(([k,v,m],i)=>(
        <g key={i}>
          <text x="14" y={50+i*26} fill="rgba(255,255,255,.5)" fontSize="9" fontFamily="system-ui">{k}</text>
          <rect x="14" y={54+i*26} width="150" height="6" rx="3" fill="rgba(255,255,255,.08)"/>
          <rect x="14" y={54+i*26} width={150*(v/m)} height="6" rx="3" fill={A} fillOpacity=".8"/>
          <text x="206" y={50+i*26} textAnchor="end" fill="rgba(255,255,255,.45)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{v}/{m}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── onboarding checklist ── */
function ArtOnboard() {
  const steps = [['Offer accepted', true], ['Documents collected', true], ['Assets allocated', true], ['Accounts provisioned', false], ['Day-one orientation', false]];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Onboarding · A. Bose</text>
      <text x="206" y="24" textAnchor="end" fill={A} fontSize="9" fontFamily="'JetBrains Mono',monospace">3/5</text>
      <rect x="14" y="30" width="192" height="5" rx="2.5" fill="rgba(255,255,255,.08)"/>
      <rect x="14" y="30" width="115" height="5" rx="2.5" fill={A} fillOpacity=".85"/>
      {steps.map(([label, done], i) => (
        <g key={i}>
          <rect x="14" y={44+i*20} width="14" height="14" rx="4"
            fill={done ? A : 'transparent'} fillOpacity={done ? 0.9 : 1}
            stroke={done ? A : 'rgba(255,255,255,.2)'} strokeWidth="1"/>
          {done && <path d={`M${18} ${51+i*20} l3 3 5-6`} stroke="#06140e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>}
          <text x="36" y={54+i*20} fill={done ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.4)'} fontSize="9.5" fontFamily="system-ui">{label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── statutory compliance report ── */
function ArtCompliance() {
  const rows = [['PF (EPF)', '₹ 1,84,200'], ['ESI', '₹ 42,600'], ['TDS', '₹ 2,10,400'], ['Prof. Tax', '₹ 12,000']];
  return (
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="150" rx="8" fill="#0a0a10"/>
      <text x="14" y="24" fill="rgba(255,255,255,.45)" fontSize="10" fontFamily="system-ui">Compliance · Jun 2026</text>
      <rect x="150" y="13" width="56" height="16" rx="8" fill={A} fillOpacity=".15"/>
      <circle cx="161" cy="21" r="3.5" fill={A}/>
      <path d="M158.5 21 l2 2 4-4" stroke="#06140e" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="170" y="24" fill={A} fontSize="8" fontFamily="system-ui">FILED</text>
      {rows.map(([k, v], i) => (
        <g key={i}>
          <circle cx="20" cy={47+i*23} r="3" fill={A} fillOpacity=".75"/>
          <text x="30" y={50+i*23} fill="rgba(255,255,255,.55)" fontSize="9.5" fontFamily="system-ui">{k}</text>
          <text x="206" y={50+i*23} textAnchor="end" fill="rgba(255,255,255,.7)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">{v}</text>
          <line x1="14" y1={57+i*23} x2="206" y2={57+i*23} stroke="rgba(255,255,255,.05)"/>
        </g>
      ))}
      <text x="14" y={50+4*23} fill={A} fontSize="10" fontFamily="'Space Grotesk'" fontWeight="700">Total remitted</text>
      <text x="206" y={50+4*23} textAnchor="end" fill={A} fontSize="10" fontFamily="'JetBrains Mono',monospace" fontWeight="700">₹ 4,49,200</text>
    </svg>
  );
}

/* ── light section: hiring → onboarding board ── */
function MockOnboarding() {
  const cols = [
    { head:'Applied', tone:'#6b6c6d', cards:[['Aarav Sharma','UX Designer'],['Meera Iyer','Backend Dev']] },
    { head:'Interview', tone:A2, cards:[['Rohan Verma','Sales Lead'],['Diya Nair','QA Engineer']] },
    { head:'Offer', tone:'#fb923c', cards:[['Kabir Khan','DevOps']] },
    { head:'Onboarding', tone:A, cards:[['Anaya Bose','HR Exec'],['Vivaan Rao','Finance']] },
  ];
  return (
    <svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="360" rx="14" fill="#0c0c12"/>
      <rect width="960" height="40" fill="#101018"/>
      <circle cx="22" cy="20" r="5" fill="#ff5f57"/><circle cx="40" cy="20" r="5" fill="#febc2e"/><circle cx="58" cy="20" r="5" fill="#28c840"/>
      <text x="480" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="11" fontFamily="system-ui">HRMS — Recruitment Pipeline</text>
      {cols.map((col,ci)=>{
        const x = 24 + ci*234;
        return (
          <g key={ci}>
            <circle cx={x+6} cy="66" r="4" fill={col.tone}/>
            <text x={x+18} y="70" fill="rgba(255,255,255,.55)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">{col.head}</text>
            <text x={x+212} y="70" textAnchor="end" fill="rgba(255,255,255,.25)" fontSize="10" fontFamily="'JetBrains Mono',monospace">{col.cards.length}</text>
            {col.cards.map((c,i)=>(
              <g key={i}>
                <rect x={x} y={84+i*78} width="214" height="66" rx="9" fill="#15151d" stroke="rgba(255,255,255,.06)"/>
                <circle cx={x+22} cy={108+i*78} r="11" fill={col.tone} fillOpacity=".75"/>
                <text x={x+22} y={112+i*78} textAnchor="middle" fill="#0a0a10" fontSize="10" fontFamily="'Space Grotesk'" fontWeight="700">{c[0][0]}</text>
                <text x={x+42} y={106+i*78} fill="rgba(255,255,255,.78)" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="600">{c[0]}</text>
                <text x={x+42} y={122+i*78} fill="rgba(255,255,255,.35)" fontSize="9.5" fontFamily="system-ui">{c[1]}</text>
                <rect x={x+12} y={132+i*78} width="56" height="12" rx="6" fill={col.tone} fillOpacity=".14"/>
                <text x={x+40} y={141+i*78} textAnchor="middle" fill={col.tone} fontSize="7.5" fontFamily="system-ui" letterSpacing=".5">STAGE {ci+1}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ──────────────────────────────────────────────
   MOCKUP — the LASER showpiece (wide HRMS console)
   ────────────────────────────────────────────── */
function MockConsole() {
  return (
    <svg viewBox="0 0 940 540" xmlns="http://www.w3.org/2000/svg">
      <rect width="940" height="540" rx="16" fill="#0c0c12"/>
      {/* titlebar */}
      <rect width="940" height="42" fill="#101018"/>
      <circle cx="24" cy="21" r="5" fill="#ff5f57"/><circle cx="43" cy="21" r="5" fill="#febc2e"/><circle cx="62" cy="21" r="5" fill="#28c840"/>
      <rect x="360" y="11" width="220" height="20" rx="10" fill="#181820"/>
      <text x="470" y="25" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="system-ui">app.techbirdit.in/hrms</text>
      {/* sidebar */}
      <rect x="0" y="42" width="180" height="498" fill="#0a0a10"/>
      <text x="22" y="74" fill="#fff" fontSize="14" fontFamily="'Space Grotesk'" fontWeight="700">TechBird HR</text>
      <rect x="16" y="94" width="148" height="30" rx="7" fill={A} fillOpacity=".14"/>
      <circle cx="32" cy="109" r="5" fill={A}/><text x="46" y="113" fill={A} fontSize="11" fontFamily="system-ui">Dashboard</text>
      {['Employees','Payroll','Attendance','Leave','Recruitment','Appraisals','Compliance'].map((t,i)=>(
        <g key={i}>
          <circle cx="32" cy={146+i*32} r="5" fill="rgba(255,255,255,.18)"/>
          <text x="46" y={150+i*32} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      <rect x="16" y="492" width="148" height="32" rx="9" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.07)"/>
      <circle cx="34" cy="508" r="8" fill={A} fillOpacity=".7"/>
      <text x="34" y="512" textAnchor="middle" fill="#0a0a10" fontSize="9" fontFamily="'Space Grotesk'" fontWeight="700">AT</text>
      <text x="50" y="505" fill="rgba(255,255,255,.6)" fontSize="9.5" fontFamily="system-ui">Amit Thakur</text>
      <text x="50" y="517" fill="rgba(255,255,255,.3)" fontSize="8" fontFamily="system-ui">HR Admin</text>

      {/* top bar */}
      <text x="206" y="78" fill="#fff" fontSize="17" fontFamily="'Space Grotesk'" fontWeight="700">People Overview</text>
      <text x="206" y="96" fill="rgba(255,255,255,.35)" fontSize="11" fontFamily="system-ui">June 2026 · All departments</text>
      <rect x="760" y="60" width="156" height="32" rx="16" fill={A}/>
      <text x="838" y="80" textAnchor="middle" fill="#06140e" fontSize="11" fontFamily="'Space Grotesk'" fontWeight="700">Run Payroll</text>

      {/* KPI row */}
      {[['HEADCOUNT','248','+12 MoM',A],['ON LEAVE TODAY','17','6.8%',A2],['ATTRITION','3.2%','▼ 0.6%',A],['PAYROLL COST','₹42.6L','this month','#fb923c']].map(([l,v,s,c],i)=>{
        const x=206+i*180;
        return (
          <g key={i}>
            <rect x={x} y="116" width="166" height="86" rx="11" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
            <text x={x+16} y="140" fill="rgba(255,255,255,.4)" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">{l}</text>
            <text x={x+16} y="172" fill={c} fontSize="26" fontFamily="'Space Grotesk'" fontWeight="700">{v}</text>
            <text x={x+16} y="190" fill="rgba(255,255,255,.3)" fontSize="9" fontFamily="system-ui">{s}</text>
          </g>
        );
      })}

      {/* big chart */}
      <rect x="206" y="218" width="430" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Headcount &amp; payroll trend</text>
      {[0,1,2,3].map(i=>(<line key={i} x1="224" y1={272+i*34} x2="616" y2={272+i*34} stroke="rgba(255,255,255,.04)"/>))}
      <path d="M224 372 280 356 336 360 392 330 448 338 504 308 560 318 616 292" fill="none" stroke={A} strokeWidth="2"/>
      <path d="M224 372 280 356 336 360 392 330 448 338 504 308 560 318 616 292 616 406 224 406Z" fill={A} fillOpacity=".07"/>
      <path d="M224 390 280 386 336 378 392 384 448 366 504 372 560 354 616 360" fill="none" stroke={A2} strokeWidth="1.6" strokeOpacity=".7" strokeDasharray="4 4"/>
      {[[224,372],[392,330],[504,308],[616,292]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3.5" fill={A}/>))}

      {/* payroll table */}
      <rect x="652" y="218" width="264" height="200" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="670" y="244" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">Payroll queue</text>
      {[['Engineering','82','#5683da'],['Sales','46',A2],['Operations','58','#fb923c'],['Design','24','#a78bfa'],['Finance','19',A]].map(([d,n,c],i)=>(
        <g key={i}>
          <circle cx="676" cy={270+i*28} r="4" fill={c}/>
          <text x="690" y={274+i*28} fill="rgba(255,255,255,.6)" fontSize="10.5" fontFamily="system-ui">{d}</text>
          <text x="860" y={274+i*28} textAnchor="end" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="'JetBrains Mono',monospace">{n} emp</text>
          <rect x="868" y={266+i*28} width="34" height="14" rx="7" fill={A} fillOpacity=".14"/>
          <text x="885" y={276+i*28} textAnchor="middle" fill={A} fontSize="7.5" fontFamily="system-ui">OK</text>
        </g>
      ))}

      {/* bottom progress strip */}
      <rect x="206" y="434" width="710" height="74" rx="12" fill="#13131b" stroke="rgba(255,255,255,.06)"/>
      <text x="224" y="460" fill="rgba(255,255,255,.5)" fontSize="11" fontFamily="system-ui">June payroll run — statutory checks</text>
      {['PF','ESI','TDS','PT','Gratuity'].map((t,i)=>(
        <g key={i}>
          <rect x={224+i*140} y="474" width="124" height="22" rx="11" fill={A} fillOpacity=".12"/>
          <circle cx={238+i*140} cy="485" r="5" fill={A} fillOpacity=".8"/>
          <path d={`M${235+i*140} 485 l2 2 4-4`} stroke="#06140e" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          <text x={252+i*140} y="489" fill={A} fontSize="9.5" fontFamily="system-ui">{t} cleared</text>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════ */
export default function HRMSPage() {
  return (
    <ProductPageLayout
      accent={A}
      category="HR Automation"
      breadcrumbLabel="HRMS"
      title="The entire employee lifecycle, in *one system.*"
      lead="Payroll, attendance, leave, recruitment, appraisals and statutory compliance — automated end-to-end. Hire to retire, without the spreadsheets."
      heroActions={[
        { label: 'Request a Demo', to: '/contact', variant: 'accent' },
        { label: 'See it in action', to: '/contact', variant: 'white' },
      ]}
      heroMockup={<MockHeroDash />}
      stats={[
        { value: '<em>10×</em>', label: 'Faster payroll runs vs. manual' },
        { value: '100%', label: 'Statutory-compliant: PF · ESI · TDS' },
        { value: '1', label: 'System for the full lifecycle' },
        { value: '24/7', label: 'Employee self-service access' },
      ]}
      bento={{
        eyebrow: 'Capabilities',
        heading: 'Run your whole HR function from one place.',
        sub: 'Every module shares one employee record — so data entered once flows everywhere, from onboarding to the final settlement.',
        items: [
          { icon: I.payroll, title: 'Automated payroll', text: 'Salary structures, deductions and net pay calculated automatically — with statutory rules built in.', art: <ArtPayslip />, span: true },
          { icon: I.fingerprint, title: 'Attendance', text: 'Biometric, mobile geo-punch and shift rosters, synced in real time.', art: <ArtHeatmap /> },
          { icon: I.calendar, title: 'Leave management', text: 'Policies, balances, approvals and holiday calendars per location.', art: <ArtLeave /> },
          { icon: I.briefcase, title: 'Recruitment & onboarding', text: 'From job post to digital onboarding — applicants tracked through every stage, with appraisal cycles built in.', art: <ArtOnboard /> },
          { icon: I.shield, title: 'Statutory compliance', text: 'PF, ESI, TDS, PT and gratuity reports generated and filed on schedule.', art: <ArtCompliance /> },
        ],
      }}
      light={{
        eyebrow: 'Lifecycle',
        heading: 'From offer letter to exit clearance.',
        sub: 'One continuous record follows every employee through hiring, onboarding, their full tenure and a clean offboarding — nothing falls through the cracks.',
        mockup: <MockOnboarding />,
        columns: [
          { icon: I.users, title: 'Recruit', text: 'Track candidates across stages, schedule interviews and roll out offers — all from one pipeline view.' },
          { icon: I.briefcase, title: 'Onboard', text: 'Digital joining kits, document collection and asset allocation, so day one runs itself.' },
          { icon: I.logout, title: 'Offboard', text: 'Structured exit workflows, full-and-final settlement and clearance — automated and audit-ready.' },
        ],
      }}
      laser={{
        eyebrow: 'Live Product',
        heading: 'See HRMS in action.',
        sub: 'A single console for the whole people operation — headcount, payroll, attendance and compliance, live. Hover to explore.',
        mockup: <MockConsole />,
        features: [
          { icon: I.payroll, title: 'Payroll engine', text: 'Run payroll for the entire org in minutes — statutory deductions calculated automatically.' },
          { icon: I.fingerprint, title: 'Biometric attendance', text: 'Connect existing biometric devices or punch in from mobile with geo-fencing.' },
          { icon: I.calendar, title: 'Leave & holidays', text: 'Configurable leave policies, accrual rules and location-wise holiday calendars.' },
          { icon: I.award, title: 'Appraisal workflows', text: 'Define cycles, collect 360° feedback and link ratings to revisions.' },
          { icon: I.shield, title: 'Compliance reports', text: 'PF, ESI, TDS, PT and gratuity — generated, validated and ready to file.' },
          { icon: I.portal, title: 'Self-service portal', text: 'Employees view payslips, apply for leave and update details themselves.' },
        ],
      }}
      integrations={{
        eyebrow: 'Connects with',
        heading: 'Fits your existing stack.',
        items: [
          { label: 'Biometric devices', tech: 'ESSL, ZKTeco, Matrix and standard push-API readers' },
          { label: 'Accounting', tech: 'Tally, ERPNext, Zoho Books and Excel exports' },
          { label: 'Payments & banking', tech: 'Bank transfer files, NEFT/IMPS bulk payout formats' },
          { label: 'Communication', tech: 'WhatsApp, email and SMS for slips and approvals' },
        ],
      }}
      faqItems={[
        { q: 'Is HRMS off-the-shelf or customised to us?', a: 'Both. You go live on a production-ready core in weeks, and where your leave policies, salary structures or approval flows differ from the standard, we configure them — no workarounds.' },
        { q: 'Can it run our payroll with Indian statutory rules?', a: 'Yes. PF, ESI, TDS, Professional Tax and gratuity are built in, with the current slabs and the ability to update them. Payroll output includes bank payout files and statutory return formats ready to file.' },
        { q: 'Does it integrate with our biometric attendance devices?', a: 'It works with ESSL, ZKTeco, Matrix and any reader that supports a push API or standard export. Mobile punch-in with geo-fencing is also available for field and remote staff.' },
        { q: 'Can employees access it themselves?', a: 'Every employee gets a self-service portal and mobile access to view payslips, apply for leave, check balances, submit reimbursements and update personal details — cutting most routine HR queries.' },
        { q: 'On-premise or cloud — and how long to go live?', a: 'Deploy on-premise, on your private cloud (AWS/GCP/Azure) or as a managed service. Standard rollouts run 4–8 weeks; implementations with historical-data migration and integrations run 10–16 weeks.' },
      ]}
      cta={{
        label: 'Get started',
        heading: 'Ready to automate HR?',
        body: 'No 47-slide deck. A focused 30-minute walkthrough of HRMS mapped to your actual payroll, attendance and compliance workflows.',
        button: { label: 'Book a Demo', to: '/contact' },
      }}
    />
  );
}
