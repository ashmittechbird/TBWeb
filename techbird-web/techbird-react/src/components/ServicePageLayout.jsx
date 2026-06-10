import { useEffect, useLayoutEffect, useRef } from 'react';
import FaqAccordion from './FaqAccordion';
import ScrollReveal from './ScrollReveal';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InnerNavbar from './InnerNavbar';
import Footer from './Footer';
import '../styles/inner.css';

gsap.registerPlugin(ScrollTrigger);

function MockupAI({ color }) {
  return (
    <svg viewBox="0 0 560 352" className="phb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="352" rx="12" fill="#0f0f14"/>
      {/* Titlebar */}
      <rect width="560" height="36" rx="12" fill="#131318"/>
      <rect y="24" width="560" height="12" fill="#131318"/>
      <circle cx="18" cy="18" r="5" fill="#ff5f57"/><circle cx="34" cy="18" r="5" fill="#febc2e"/><circle cx="50" cy="18" r="5" fill="#28c840"/>
      <text x="280" y="23" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="10" fontFamily="system-ui,sans-serif">AI Copilot — TechBird</text>
      {/* Left sidebar */}
      <rect x="0" y="36" width="148" height="316" fill="#0c0c12"/>
      <line x1="148" y1="36" x2="148" y2="352" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <rect x="10" y="50" width="128" height="28" rx="6" fill={color} fillOpacity="0.14"/>
      <circle cx="22" cy="64" r="8" fill={color} fillOpacity="0.45"/>
      <rect x="36" y="58" width="75" height="5" rx="2.5" fill={color} fillOpacity="0.75"/>
      <rect x="36" y="68" width="52" height="4" rx="2" fill="rgba(255,255,255,0.18)"/>
      {[0,1,2].map(i=>(
        <g key={i}>
          <circle cx="22" cy={100+i*36} r="7" fill="rgba(255,255,255,0.06)"/>
          <rect x="36" y={94+i*36} width="68" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
          <rect x="36" y={104+i*36} width="44" height="3.5" rx="1.75" fill="rgba(255,255,255,0.05)"/>
        </g>
      ))}
      {/* Model badge */}
      <rect x="10" y="308" width="128" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <circle cx="22" cy="319" r="5" fill={color} fillOpacity="0.5"/>
      <rect x="32" y="314.5" width="60" height="4" rx="2" fill="rgba(255,255,255,0.25)"/>
      <rect x="32" y="321.5" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>
      {/* AI message 1 */}
      <circle cx="166" cy="62" r="12" fill={color} fillOpacity="0.2"/>
      <rect x="184" y="50" width="220" height="68" rx="10" fill="#1a1a24"/>
      <rect x="196" y="62" width="155" height="5" rx="2.5" fill="rgba(255,255,255,0.38)"/>
      <rect x="196" y="72" width="185" height="4" rx="2" fill="rgba(255,255,255,0.16)"/>
      <rect x="196" y="81" width="162" height="4" rx="2" fill="rgba(255,255,255,0.16)"/>
      <rect x="196" y="93" width="196" height="18" rx="4" fill="#0d0d18"/>
      <text x="204" y="105" fill={color} fontSize="8" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.75">{'const result = await model.complete({ prompt })'}</text>
      {/* User message */}
      <rect x="346" y="134" width="188" height="32" rx="10" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.5" strokeOpacity="0.3"/>
      <rect x="358" y="144" width="120" height="5" rx="2.5" fill={color} fillOpacity="0.7"/>
      <rect x="358" y="154" width="90" height="4" rx="2" fill={color} fillOpacity="0.4"/>
      {/* AI message 2 */}
      <circle cx="166" cy="194" r="12" fill={color} fillOpacity="0.2"/>
      <rect x="184" y="182" width="256" height="92" rx="10" fill="#1a1a24"/>
      <rect x="196" y="194" width="175" height="5" rx="2.5" fill="rgba(255,255,255,0.38)"/>
      <rect x="196" y="204" width="210" height="4" rx="2" fill="rgba(255,255,255,0.16)"/>
      <rect x="196" y="213" width="188" height="4" rx="2" fill="rgba(255,255,255,0.16)"/>
      <rect x="196" y="225" width="232" height="40" rx="6" fill="#11111e"/>
      <rect x="204" y="233" width="6" height="6" rx="1.5" fill={color} fillOpacity="0.8"/>
      <rect x="215" y="234" width="95" height="4" rx="2" fill="rgba(255,255,255,0.28)"/>
      <rect x="215" y="242" width="72" height="3.5" rx="1.75" fill="rgba(255,255,255,0.12)"/>
      <rect x="215" y="250" width="84" height="3.5" rx="1.75" fill="rgba(255,255,255,0.12)"/>
      {/* Input bar */}
      <rect x="160" y="320" width="384" height="26" rx="8" fill="#1c1c28" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <rect x="172" y="330" width="90" height="4.5" rx="2.25" fill="rgba(255,255,255,0.1)"/>
      <rect x="514" y="323" width="20" height="20" rx="10" fill={color} fillOpacity="0.75"/>
      <path d="M520 333 l4-4 4 4M524 329 v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function MockupCode({ color }) {
  const lines = [
    { indent: 0, t: 'import', s: ' { useState, useEffect }', k: ' from ', q: "'react'" },
    { indent: 0, t: 'import', s: ' TechBirdAPI', k: ' from ', q: "'@techbird/sdk'" },
    { indent: 0, blank: true },
    { indent: 0, fn: 'export default function', s: ' Dashboard() {' },
    { indent: 1, kw: 'const', s: ' [data, setData] =', fn: ' useState', s2: '(null)' },
    { indent: 1, blank: true },
    { indent: 1, kw: 'useEffect', s: '(() => {' },
    { indent: 2, fn: 'TechBirdAPI', s: '.fetch(', q: "'analytics'", s2: ')' },
    { indent: 3, s: '.then(res => ', fn: 'setData', s2: '(res.data))' },
    { indent: 1, s: '}, [])' },
    { indent: 1, blank: true },
    { indent: 1, kw: 'return', s: ' (' },
    { indent: 2, s: '<', fn: 'Dashboard', kw: 'Layout', s2: ' data={data} />' },
    { indent: 1, s: ')' },
    { indent: 0, s: '}' },
  ];
  return (
    <svg viewBox="0 0 560 352" className="phb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="352" rx="12" fill="#0d1117"/>
      {/* Titlebar */}
      <rect width="560" height="36" rx="12" fill="#161b22"/>
      <rect y="24" width="560" height="12" fill="#161b22"/>
      <circle cx="18" cy="18" r="5" fill="#ff5f57"/><circle cx="34" cy="18" r="5" fill="#febc2e"/><circle cx="50" cy="18" r="5" fill="#28c840"/>
      {/* File tabs */}
      <rect x="68" y="8" width="88" height="22" rx="5" fill="#0d1117"/>
      <text x="80" y="23" fill="rgba(255,255,255,0.7)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">Dashboard.jsx</text>
      <rect x="162" y="10" width="72" height="18" rx="4" fill="transparent"/>
      <text x="172" y="23" fill="rgba(255,255,255,0.3)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">App.jsx</text>
      <rect x="240" y="10" width="82" height="18" rx="4" fill="transparent"/>
      <text x="250" y="23" fill="rgba(255,255,255,0.3)" fontSize="9.5" fontFamily="'JetBrains Mono',monospace">package.json</text>
      {/* Sidebar file tree */}
      <rect x="0" y="36" width="140" height="316" fill="#0d1117"/>
      <line x1="140" y1="36" x2="140" y2="352" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {[
        { x:10, y:56, icon:'▶', label:'src', indent:0, dim:false },
        { x:22, y:72, icon:'▼', label:'components', indent:1, dim:false },
        { x:34, y:88, icon:'·', label:'Dashboard.jsx', indent:2, accent:true },
        { x:34, y:104, icon:'·', label:'Navbar.jsx', indent:2, dim:true },
        { x:34, y:120, icon:'·', label:'Footer.jsx', indent:2, dim:true },
        { x:22, y:136, icon:'▶', label:'styles', indent:1, dim:true },
        { x:22, y:152, icon:'·', label:'App.jsx', indent:1, dim:true },
        { x:10, y:168, icon:'·', label:'package.json', indent:0, dim:true },
      ].map((f,i)=>(
        <g key={i}>
          <text x={f.x} y={f.y} fill={f.accent ? color : (f.dim ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.5)')} fontSize="9" fontFamily="'JetBrains Mono',monospace">{f.icon} {f.label}</text>
        </g>
      ))}
      {/* Code area */}
      <rect x="140" y="36" width="420" height="316" fill="#0d1117"/>
      {lines.map((l, i) => {
        if (l.blank) return <line key={i} x1="0" y1="0" x2="0" y2="0"/>;
        const y = 58 + i * 19;
        const lineX = 160 + (l.indent||0) * 16;
        // Line number
        return (
          <g key={i}>
            <text x="147" y={y} textAnchor="end" fill="rgba(255,255,255,0.18)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{i+1}</text>
            {l.t && <text x={lineX} y={y} fill="#79c0ff" fontSize="9" fontFamily="'JetBrains Mono',monospace">{l.t}</text>}
            {l.s && <text x={lineX + (l.t ? l.t.length*5.5 : 0)} y={y} fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{l.s}</text>}
            {l.k && <text x={lineX + (l.t ? l.t.length*5.5 : 0) + (l.s ? l.s.length*5.5 : 0)} y={y} fill="#79c0ff" fontSize="9" fontFamily="'JetBrains Mono',monospace">{l.k}</text>}
            {l.q && <text x={lineX + [(l.t||'').length, (l.s||'').length, (l.k||'').length].reduce((a,b)=>a+b*5.5, 0)} y={y} fill="#a5d6ff" fontSize="9" fontFamily="'JetBrains Mono',monospace">{l.q}</text>}
            {l.fn && <text x={lineX} y={y} fill={color} fontSize="9" fontFamily="'JetBrains Mono',monospace">{l.fn}</text>}
            {l.kw && <text x={lineX} y={y} fill="#ff7b72" fontSize="9" fontFamily="'JetBrains Mono',monospace">{l.kw}</text>}
          </g>
        );
      })}
      {/* Active line highlight */}
      <rect x="140" y="145" width="420" height="18" rx="0" fill={color} fillOpacity="0.06"/>
      <rect x="140" y="145" width="2" height="18" fill={color} fillOpacity="0.8"/>
    </svg>
  );
}

function MockupCloud({ color }) {
  const metrics = [
    { label:'UPTIME', val:'99.9%', sub:'Last 30 days', ok:true },
    { label:'CPU LOAD', val:'42%', sub:'4 cores avg', ok:true },
    { label:'MEMORY', val:'3.2 / 8 GB', sub:'40% used', ok:true },
    { label:'REQ / SEC', val:'2.4k', sub:'p99 · 124ms', ok:true },
  ];
  return (
    <svg viewBox="0 0 560 352" className="phb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="352" rx="12" fill="#090d18"/>
      {/* Titlebar */}
      <rect width="560" height="36" rx="12" fill="#0e1320"/>
      <rect y="24" width="560" height="12" fill="#0e1320"/>
      <circle cx="18" cy="18" r="5" fill="#ff5f57"/><circle cx="34" cy="18" r="5" fill="#febc2e"/><circle cx="50" cy="18" r="5" fill="#28c840"/>
      <text x="280" y="23" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="system-ui,sans-serif">Infrastructure Overview</text>
      <rect x="460" y="10" width="80" height="16" rx="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.5" strokeOpacity="0.4"/>
      <circle cx="470" cy="18" r="3.5" fill={color} fillOpacity="0.8"/>
      <text x="480" y="22" fill={color} fontSize="8" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.8">ALL SYSTEMS</text>
      {/* Metric cards */}
      {metrics.map((m, i) => {
        const x = 12 + i * 134;
        return (
          <g key={i}>
            <rect x={x} y="46" width="122" height="76" rx="8" fill="#0d1220" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
            <text x={x+12} y="64" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">{m.label}</text>
            <text x={x+12} y="90" fill={color} fontSize="18" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{m.val}</text>
            <circle cx={x+104} cy="58" r="5" fill={color} fillOpacity="0.7"/>
            <text x={x+12} y="106" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="system-ui,sans-serif">{m.sub}</text>
          </g>
        );
      })}
      {/* Chart area */}
      <rect x="12" y="132" width="536" height="140" rx="8" fill="#0d1220" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <text x="24" y="150" fill="rgba(255,255,255,0.38)" fontSize="9" fontFamily="system-ui,sans-serif">Request Volume · Last 24h</text>
      {/* Grid lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1="12" y1={160+i*27} x2="548" y2={160+i*27} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}
      {/* Line chart */}
      <polyline
        points="24,248 80,218 136,235 192,195 248,208 304,182 360,198 416,170 472,185 528,165"
        fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" strokeLinejoin="round"
      />
      {/* Area fill */}
      <path
        d="M24,248 80,218 136,235 192,195 248,208 304,182 360,198 416,170 472,185 528,165 V272 H24Z"
        fill={color} fillOpacity="0.06"
      />
      {/* Data points */}
      {[[24,248],[192,195],[304,182],[416,170],[528,165]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3" fill={color} fillOpacity="0.85"/>
      ))}
      {/* Server list */}
      <rect x="12" y="282" width="536" height="60" rx="8" fill="#0d1220" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {['api-prod-01','api-prod-02','worker-01','db-primary'].map((s,i)=>(
        <g key={i}>
          <circle cx={28+i*134} cy="312" r="4" fill={color} fillOpacity="0.75"/>
          <text x={38+i*134} y="315.5" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'JetBrains Mono',monospace">{s}</text>
        </g>
      ))}
    </svg>
  );
}

function MockupAnimation({ color }) {
  return (
    <svg viewBox="0 0 560 352" className="phb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="352" rx="12" fill="#0c0c10"/>
      {/* Titlebar */}
      <rect width="560" height="36" rx="12" fill="#111115"/>
      <rect y="24" width="560" height="12" fill="#111115"/>
      <circle cx="18" cy="18" r="5" fill="#ff5f57"/><circle cx="34" cy="18" r="5" fill="#febc2e"/><circle cx="50" cy="18" r="5" fill="#28c840"/>
      {/* Playback controls */}
      <rect x="224" y="8" width="112" height="22" rx="6" fill="rgba(255,255,255,0.05)"/>
      <text x="240" y="23" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily="system-ui">⏮ ⏸ ⏭</text>
      <text x="342" y="22" fill={color} fontSize="9" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.75">00:02:14</text>
      {/* Left layer panel */}
      <rect x="0" y="36" width="130" height="220" fill="#0f0f14"/>
      <line x1="130" y1="36" x2="130" y2="256" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <text x="12" y="54" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="system-ui,sans-serif" letterSpacing="1">LAYERS</text>
      {[
        { name:'Background',    active:false },
        { name:'Character Rig', active:true  },
        { name:'FX — Sparks',   active:false },
        { name:'Shadow Layer',  active:false },
        { name:'Camera',        active:false },
      ].map((l,i)=>(
        <g key={i}>
          <rect x="8" y={60+i*32} width="114" height="24" rx="4" fill={l.active ? `${color}22` : 'rgba(255,255,255,0.03)'} stroke={l.active ? color : 'transparent'} strokeWidth="0.5" strokeOpacity="0.5"/>
          <circle cx="18" cy={72+i*32} r="4" fill={l.active ? color : 'rgba(255,255,255,0.15)'} fillOpacity={l.active?0.8:1}/>
          <text x="28" y={75.5+i*32} fill={l.active?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.35)'} fontSize="9" fontFamily="system-ui,sans-serif">{l.name}</text>
        </g>
      ))}
      {/* Main canvas */}
      <rect x="130" y="36" width="310" height="220" fill="#09090d"/>
      {/* Grid */}
      {[0,1,2,3,4].map(i=><line key={`v${i}`} x1={192+i*50} y1="36" x2={192+i*50} y2="256" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>)}
      {[0,1,2,3].map(i=><line key={`h${i}`} x1="130" y1={90+i*45} x2="440" y2={90+i*45} stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>)}
      {/* 3D object preview — stylised cube */}
      <g transform="translate(285 146)">
        <polygon points="0,-55 48,-28 48,28 0,55 -48,28 -48,-28" fill="#1a1a24" stroke={color} strokeWidth="1" strokeOpacity="0.4"/>
        <polygon points="0,-55 48,-28 0,-2 -48,-28" fill="#222232" stroke={color} strokeWidth="0.5" strokeOpacity="0.25"/>
        <polygon points="48,-28 48,28 0,2 0,-2" fill="#1c1c2a" stroke={color} strokeWidth="0.5" strokeOpacity="0.25"/>
        <circle cx="0" cy="0" r="6" fill={color} fillOpacity="0.3"/>
        <circle cx="0" cy="0" r="3" fill={color} fillOpacity="0.7"/>
        {/* Motion path */}
        <path d="M-120 0 Q-60,-50 0,0 Q60,50 120,0" stroke={color} strokeWidth="1" strokeOpacity="0.2" fill="none" strokeDasharray="4,4"/>
      </g>
      {/* Right properties panel */}
      <rect x="440" y="36" width="120" height="220" fill="#0f0f14"/>
      <line x1="440" y1="36" x2="440" y2="256" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <text x="452" y="54" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="system-ui,sans-serif" letterSpacing="1">TRANSFORM</text>
      {[['X Pos','128.4'],['Y Pos','96.0'],['Z Rot','45°'],['Scale','1.0'],['Opacity','100%']].map(([k,v],i)=>(
        <g key={i}>
          <text x="452" y={70+i*28} fill="rgba(255,255,255,0.28)" fontSize="8" fontFamily="system-ui,sans-serif">{k}</text>
          <rect x="452" y={74+i*28} width="96" height="16" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
          <text x="500" y={86+i*28} textAnchor="middle" fill={color} fontSize="9" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.85">{v}</text>
        </g>
      ))}
      {/* Bottom timeline */}
      <rect x="0" y="256" width="560" height="96" rx="0" fill="#0e0e14"/>
      <line x1="0" y1="256" x2="560" y2="256" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Timeline ruler */}
      <rect x="0" y="256" width="560" height="18" fill="#111118"/>
      {[0,1,2,3,4,5,6,7,8,9,10].map(i=>(
        <g key={i}>
          <line x1={24+i*52} y1="256" x2={24+i*52} y2="268" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <text x={24+i*52} y="268" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="7" fontFamily="'JetBrains Mono',monospace">{i}s</text>
        </g>
      ))}
      {/* Playhead */}
      <line x1="180" y1="256" x2="180" y2="352" stroke={color} strokeWidth="1.5" strokeOpacity="0.8"/>
      <polygon points="174,256 186,256 180,263" fill={color} fillOpacity="0.8"/>
      {/* Track rows */}
      {['Character Rig','FX — Sparks','Camera'].map((track,ti)=>(
        <g key={ti}>
          <rect x="0" y={278+ti*24} width="130" height="22" fill="rgba(255,255,255,0.02)"/>
          <text x="12" y={293+ti*24} fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="system-ui,sans-serif">{track}</text>
          {/* Keyframes */}
          {[60,130,180,250,340,420].slice(0,4-ti).map((kx,ki)=>(
            <g key={ki}>
              <rect x={130+kx} y={281+ti*24} width={[60,90,40,70][ki]||50} height="16" rx="4" fill={color} fillOpacity={0.15+ti*0.05} stroke={color} strokeWidth="0.5" strokeOpacity="0.4"/>
              <circle cx={130+kx+4} cy={289+ti*24} r="3" fill={color} fillOpacity="0.7"/>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

function MockupMarketing({ color }) {
  const bars = [220,165,195,140,175];
  const labels = ['Social','Email','Paid','SEO','Direct'];
  return (
    <svg viewBox="0 0 560 352" className="phb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="352" rx="12" fill="#08090f"/>
      {/* Titlebar */}
      <rect width="560" height="36" rx="12" fill="#0d0e18"/>
      <rect y="24" width="560" height="12" fill="#0d0e18"/>
      <circle cx="18" cy="18" r="5" fill="#ff5f57"/><circle cx="34" cy="18" r="5" fill="#febc2e"/><circle cx="50" cy="18" r="5" fill="#28c840"/>
      <text x="200" y="23" fill="rgba(255,255,255,0.38)" fontSize="10" fontFamily="system-ui,sans-serif">Campaign Analytics</text>
      <rect x="440" y="9" width="104" height="18" rx="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <text x="492" y="22" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="system-ui,sans-serif">Jun 1 – Jun 10</text>
      {/* KPI cards */}
      {[['TOTAL REACH','1.24M','↑ 18%'],['CTR','3.8%','↑ 0.4%'],['ROAS','4.2×','↑ 0.6×']].map(([label,val,chg],i)=>(
        <g key={i}>
          <rect x={12+i*180} y="46" width="168" height="68" rx="8" fill="#0e0f1c" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <text x={24+i*180} y="64" fill="rgba(255,255,255,0.28)" fontSize="8" fontFamily="'JetBrains Mono',monospace" letterSpacing="1">{label}</text>
          <text x={24+i*180} y="92" fill={color} fontSize="22" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">{val}</text>
          <rect x={130+i*180} y="55" width="40" height="16" rx="8" fill={color} fillOpacity="0.12"/>
          <text x={150+i*180} y="67" textAnchor="middle" fill={color} fontSize="8" fontFamily="system-ui,sans-serif">{chg}</text>
        </g>
      ))}
      {/* Bar chart */}
      <rect x="12" y="124" width="318" height="196" rx="8" fill="#0e0f1c" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <text x="24" y="142" fill="rgba(255,255,255,0.38)" fontSize="9" fontFamily="system-ui,sans-serif">Channel Breakdown</text>
      {bars.map((h,i)=>(
        <g key={i}>
          <rect x={32+i*58} y={270-h*0.52} width="42" height={h*0.52} rx="4" fill={color} fillOpacity={0.25+i*0.06}/>
          <rect x={32+i*58} y={270-h*0.52} width="42" height="4" rx="2" fill={color} fillOpacity="0.75"/>
          <text x={53+i*58} y="284" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="system-ui,sans-serif">{labels[i]}</text>
        </g>
      ))}
      <line x1="24" y1="270" x2="320" y2="270" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Funnel chart */}
      <rect x="340" y="124" width="208" height="196" rx="8" fill="#0e0f1c" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <text x="352" y="142" fill="rgba(255,255,255,0.38)" fontSize="9" fontFamily="system-ui,sans-serif">Conversion Funnel</text>
      {[['Awareness','100%',180],['Interest','68%',130],['Decision','34%',90],['Action','18%',55]].map(([stage,pct,w],i)=>(
        <g key={i}>
          <rect x={444-w/2} y={154+i*34} width={w} height="22" rx="4" fill={color} fillOpacity={0.1+(4-i)*0.08}/>
          <text x="352" y={169+i*34} fill="rgba(255,255,255,0.35)" fontSize="8.5" fontFamily="system-ui,sans-serif">{stage}</text>
          <text x={540} y={169+i*34} textAnchor="end" fill={color} fontSize="9" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.8">{pct}</text>
        </g>
      ))}
    </svg>
  );
}

function MockupMartech({ color }) {
  const nodes = [
    { label:'CRM',       x:280, y:62,  icon:'◈' },
    { label:'Email',     x:430, y:120, icon:'◉' },
    { label:'Analytics', x:458, y:224, icon:'◎' },
    { label:'Ads',       x:360, y:308, icon:'◆' },
    { label:'Social',    x:200, y:308, icon:'◉' },
    { label:'Data Wh.',  x:102, y:224, icon:'◈' },
    { label:'CDP',       x:130, y:120, icon:'◎' },
  ];
  const center = { x:280, y:192 };
  return (
    <svg viewBox="0 0 560 352" className="phb-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="352" rx="12" fill="#0b090f"/>
      {/* Titlebar */}
      <rect width="560" height="36" rx="12" fill="#100e16"/>
      <rect y="24" width="560" height="12" fill="#100e16"/>
      <circle cx="18" cy="18" r="5" fill="#ff5f57"/><circle cx="34" cy="18" r="5" fill="#febc2e"/><circle cx="50" cy="18" r="5" fill="#28c840"/>
      <text x="280" y="23" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="10" fontFamily="system-ui,sans-serif">MarTech Integration Hub</text>
      <rect x="455" y="9" width="90" height="18" rx="9" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="0.5" strokeOpacity="0.4"/>
      <circle cx="466" cy="18" r="3.5" fill={color} fillOpacity="0.8"/>
      <text x="502" y="22" textAnchor="middle" fill={color} fontSize="8" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.85">7/7 ACTIVE</text>
      {/* Connection lines */}
      {nodes.slice(0,6).map((n,i)=>(
        <line key={i} x1={center.x} y1={center.y} x2={n.x} y2={n.y}
          stroke={color} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="5,5"/>
      ))}
      {/* Animated dots on lines */}
      {nodes.slice(0,6).map((n,i)=>(
        <circle key={i} cx={(center.x+n.x)/2} cy={(center.y+n.y)/2} r="2.5" fill={color} fillOpacity="0.55"/>
      ))}
      {/* Center hub */}
      <circle cx={center.x} cy={center.y} r="44" fill="#1a0f26" stroke={color} strokeWidth="1.5" strokeOpacity="0.5"/>
      <circle cx={center.x} cy={center.y} r="30" fill="#200e2e" stroke={color} strokeWidth="0.5" strokeOpacity="0.3"/>
      <text x={center.x} y={center.y-6} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">TechBird</text>
      <text x={center.x} y={center.y+8} textAnchor="middle" fill={color} fontSize="7.5" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.75">CDP HUB</text>
      {/* Outer platform nodes */}
      {nodes.slice(0,6).map((n,i)=>(
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="28" fill="#16101e" stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
          <text x={n.x} y={n.y-4} textAnchor="middle" fill={color} fontSize="11" fontFamily="system-ui">{n.icon}</text>
          <text x={n.x} y={n.y+10} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="system-ui,sans-serif">{n.label}</text>
        </g>
      ))}
      {/* Status bar */}
      <rect x="12" y="332" width="536" height="12" rx="6" fill="rgba(255,255,255,0.03)"/>
      {[0,1,2,3,4,5,6].map(i=>(
        <rect key={i} x={16+i*76} y="334" width="68" height="8" rx="4" fill={color} fillOpacity="0.2"/>
      ))}
      <rect x="16" y="334" width="462" height="8" rx="4" fill={color} fillOpacity="0.18"/>
      <text x="280" y="342" textAnchor="middle" fill={color} fontSize="7" fontFamily="'JetBrains Mono',monospace" fillOpacity="0.6">ALL INTEGRATIONS HEALTHY</text>
    </svg>
  );
}

const MOCKUPS = [MockupAI, MockupCode, MockupCloud, MockupAnimation, MockupMarketing, MockupMartech];

const ACCENT_COLORS = {
  'AI Solutions':         '#4fc3f7',
  'Software Development': '#a78bfa',
  'Cloud & DevOps':       '#34d399',
  '2D & 3D Animation':    '#fbbf24',
  'Marketing Strategy':   '#22d3ee',
  'MarTech':              '#f472b6',
};

const MOCKUP_INDEX = {
  'AI Solutions':         0,
  'Software Development': 1,
  'Cloud & DevOps':       2,
  '2D & 3D Animation':    3,
  'Marketing Strategy':   4,
  'MarTech':              5,
};

/* ── Product Hero Band — LaserFlow + 3-D tilting mockup ── */
function ProductHeroBand({ eyebrow, title, accentColor, mockupIndex }) {
  const cardRef = useRef(null);

  const onMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xP = (e.clientX - rect.left) / rect.width - 0.5;
    const yP = (e.clientY - rect.top)  / rect.height - 0.5;
    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(900px) rotateY(${xP * 14}deg) rotateX(${-yP * 10}deg) translateZ(24px)`;
    }
  }, []);

  const onLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
  }, []);

  const Mockup = MOCKUPS[mockupIndex % MOCKUPS.length];
  const firstLine = title.split(' ').slice(0, 5).join(' ');

  return (
    <div className="phb-wrap" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* LaserFlow animated background */}
      <div className="phb-laser-bg">
        <LaserFlow
          color={accentColor}
          wispDensity={1.1}
          fogIntensity={0.38}
          verticalSizing={1.8}
          wispIntensity={4.5}
          flowSpeed={0.3}
          decay={1.05}
        />
      </div>

      {/* Gradient overlay for readability */}
      <div className="phb-overlay" />

      {/* Content */}
      <div className="phb-inner">
        {/* Left text block */}
        <div className="phb-text">
          <span className="phb-live-tag">● LIVE PREVIEW</span>
          <span className="phb-eyebrow-label">{eyebrow}</span>
          <p className="phb-headline">{firstLine}</p>
          <div className="phb-accent-line" style={{ background: accentColor }} />
        </div>

        {/* Right floating mockup card */}
        <div className="phb-card-outer" ref={cardRef}>
          <div className="phb-card-glow" style={{ '--glow': accentColor }} />
          <Mockup color={accentColor} />
        </div>
      </div>
    </div>
  );
}

/* ── Default process steps ── */
const DEFAULT_PROCESS = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    body: 'We map your operations, data flows and goals before writing a line of code. Strategy precedes everything.',
  },
  {
    num: '02',
    title: 'Architecture & Design',
    body: 'System architecture and UX are locked before build begins — eliminating expensive mid-project pivots.',
  },
  {
    num: '03',
    title: 'Iterative Build & Review',
    body: 'Short build cycles with frequent reviews. You see working software early and validate direction before full commitment.',
  },
  {
    num: '04',
    title: 'Deployment & Support',
    body: 'Production deployment, training and post-launch support. We stay engaged after go-live.',
  },
];

/* ── Abstract SVG visuals ── */
function Visual0({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="320" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`h${i}`} x1="0" y1={i*53} x2="480" y2={i*53} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      <circle cx="240" cy="160" r="90" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
      <circle cx="240" cy="160" r="50" stroke={color} strokeWidth="0.5" strokeOpacity="0.25" />
      <circle cx="240" cy="160" r="18" fill={color} fillOpacity="0.08" />
      <circle cx="240" cy="160" r="6" fill={color} fillOpacity="0.7" />
      {[[330,70],[150,70],[100,160],[380,160],[170,280],[310,280]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1="240" y1="160" x2={cx} y2={cy} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
          <circle cx={cx} cy={cy} r="4" fill={color} fillOpacity="0.5" />
        </g>
      ))}
      <path d="M330 70 L380 160 L310 280 L170 280 L100 160 L150 70 Z" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">NEURAL ARCHITECTURE</text>
    </svg>
  );
}
function Visual1({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {[60,120,180,240,300,360,420].map((x, i) => (
        <rect key={i} x={x-18} y={260-[80,130,95,170,110,150,90][i]} width="36" height={[80,130,95,170,110,150,90][i]} fill={color} fillOpacity={i===3?0.18:0.07} rx="3" />
      ))}
      <polyline points="60,180 120,130 180,165 240,90 300,150 360,110 420,170" stroke={color} strokeWidth="1.5" strokeOpacity="0.55" fill="none" strokeLinejoin="round" />
      {[[60,180],[120,130],[180,165],[240,90],[300,150],[360,110],[420,170]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={color} fillOpacity="0.75" />
      ))}
      <line x1="20" y1="260" x2="460" y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">PERFORMANCE ANALYTICS</text>
    </svg>
  );
}
function Visual2({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {[80,170,260,350,440].map((cx,i)=>(
        <rect key={i} x={cx-30} y="90" width="60" height="140" rx="6" fill={color} fillOpacity={i===2?0.15:0.05} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      ))}
      {[80,170,260,350,440].map((x,i)=>(
        <text key={i} x={x} y="110" textAnchor="middle" fill={color} fillOpacity="0.35" fontSize="9" fontFamily="JetBrains Mono, monospace">0{i+1}</text>
      ))}
      <path d="M80 90 Q175 40 260 90" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
      <path d="M260 90 Q352 40 440 90" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">DEPLOYMENT PIPELINE</text>
    </svg>
  );
}
function Visual3({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <circle cx="240" cy="155" r="115" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <circle cx="240" cy="155" r="78" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <circle cx="240" cy="155" r="42" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx="240" cy="155" r="10" fill={color} fillOpacity="0.65" />
      <ellipse cx="240" cy="155" rx="115" ry="35" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
      <ellipse cx="240" cy="155" rx="115" ry="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
      {[[355,155],[240,40],[175,265],[125,155]].map(([cx,cy],i)=>(
        <g key={i}>
          <line x1="240" y1="155" x2={cx} y2={cy} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
          <circle cx={cx} cy={cy} r={i===0?5:3.5} fill={color} fillOpacity="0.55" />
        </g>
      ))}
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">CLOUD ORCHESTRATION</text>
    </svg>
  );
}
function Visual4({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <circle cx="240" cy="160" r="115" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <circle cx="240" cy="160" r="75" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      <circle cx="240" cy="160" r="40" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      <path d="M240 100 L240 260 M160 140 L320 220 M320 140 L160 220" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
      <rect x="190" y="130" width="100" height="100" rx="8" fill={color} fillOpacity="0.05" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx="240" cy="180" r="22" fill={color} fillOpacity="0.08" />
      <path d="M228 180 L236 188 L254 172" stroke={color} strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">SECURITY FRAMEWORK</text>
    </svg>
  );
}
function Visual5({ color }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <circle cx="240" cy="155" r="115" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      {[-60,-30,0,30,60].map((lat,i)=>{
        const ry=115*Math.cos(lat*Math.PI/180);
        const y=155-115*Math.sin(lat*Math.PI/180);
        return <ellipse key={i} cx="240" cy={y} rx={ry} ry={ry*0.28} stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />;
      })}
      {[0,60,120].map((lon,i)=>(
        <ellipse key={i} cx="240" cy="155" rx={115*Math.abs(Math.cos(lon*Math.PI/180))} ry="115" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
      ))}
      {[[185,125],[295,110],[205,185],[330,160],[150,170],[265,220]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill={color} fillOpacity="0.6" />
      ))}
      <text x="20" y="308" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">GLOBAL REACH</text>
    </svg>
  );
}
const VISUALS = [Visual0, Visual1, Visual2, Visual3, Visual4, Visual5];

/* ── Chevron icon ── */
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 9, height: 9 }}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/* ── Parse useCases string into array ── */
function parseCaps(useCases) {
  if (!useCases) return [];
  return useCases.split(',').map(s => s.trim()).filter(Boolean);
}

/* ════════════════════════════════════════════════════
   MAIN LAYOUT
   ════════════════════════════════════════════════════ */
export default function ServicePageLayout({
  eyebrow, title, subtitle, introParagraphs, sections,
  stackTitle, stackItems, faqItems, ctaHeading, ctaText,
  breadcrumbLabel, processSteps, metrics, heroImage,
}) {
  const containerRef    = useRef(null);
  const overlayRef      = useRef(null);
  const heroBandImgRef  = useRef(null);
  const steps = processSteps || DEFAULT_PROCESS;

  /* ── scroll to top on mount ── */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── GSAP animations ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* 1 ── PAGE ENTRANCE ───────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // dark overlay lifts away
      tl.to('.ip2-overlay', { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
        .set('.ip2-overlay', { display: 'none' }, 0.6);

      // breadcrumb fades
      tl.from('.ip2-bc', { opacity: 0, y: 10, duration: 0.5 }, 0.25);

      // eyebrow + title words clip-reveal from bottom, staggered
      tl.from('.ip2-eyebrow', { y: 30, opacity: 0, duration: 0.6 }, 0.3);
      tl.from('.ip2-title-word', {
        y: '110%',
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
      }, 0.35);

      // subtitle
      tl.from('.ip2-sub', { y: 28, opacity: 0, duration: 0.65 }, 0.55);

      // metrics (optional — not every page has them)
      const metricEls = gsap.utils.toArray('.ip2-metric');
      if (metricEls.length) {
        tl.from(metricEls, { y: 18, opacity: 0, stagger: 0.1, duration: 0.5 }, 0.65);
      }

      // hero rule scales in from left
      tl.from('.ip2-hero-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power4.out' }, 0.5);

      /* 2 ── HERO BAND image reveal ─────────────── */
      gsap.fromTo(
        heroBandImgRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: heroBandImgRef.current, start: 'top 95%', once: true },
        }
      );

      /* 3 ── INTRO SECTION right paras ──────────────── */
      const introParaEls = gsap.utils.toArray('.ip2-intro-r p');
      if (introParaEls.length) {
        gsap.from(introParaEls, {
          scrollTrigger: { trigger: '.ip2-intro', start: 'top 68%', once: true },
          y: 40, opacity: 0, stagger: 0.13, duration: 0.75, delay: 0.15,
        });
      }

      /* 4 ── PROCESS — entrance stagger ─────────────── */
      gsap.from('.ip2-process .ip2-sec-label', {
        scrollTrigger: { trigger: '.ip2-process', start: 'top 84%', once: true },
        y: 20, opacity: 0, duration: 0.5,
      });
      gsap.from('.ip2-process h2', {
        scrollTrigger: { trigger: '.ip2-process', start: 'top 82%', once: true },
        y: 40, opacity: 0, duration: 0.75,
      });
      gsap.from('.ip2-proc-card', {
        scrollTrigger: { trigger: '.ip2-proc-grid', start: 'top 80%', once: true },
        y: 50, opacity: 0, stagger: 0.12, duration: 0.7,
      });

      /* 4 ── SERVICES HEADER ─────────────────────────── */
      gsap.from('.ip2-rows-hdr .ip2-sec-label', {
        scrollTrigger: { trigger: '.ip2-rows-hdr', start: 'top 82%', once: true },
        y: 20, opacity: 0, duration: 0.5,
      });
      gsap.from('.ip2-rows-hdr h2', {
        scrollTrigger: { trigger: '.ip2-rows-hdr', start: 'top 80%', once: true },
        y: 45, opacity: 0, duration: 0.8, delay: 0.08,
      });

      /* 5 ── SERVICE ROWS — split left/right reveal ─── */
      gsap.utils.toArray('.ip2-row').forEach((row) => {
        const vis     = row.querySelector('.ip2-row-vis');
        const content = row.querySelector('.ip2-row-content');
        const meta    = row.querySelector('.ip2-row-meta');

        const st = { trigger: row, start: 'top 80%', once: true };

        if (meta) {
          gsap.from(meta, { scrollTrigger: st, opacity: 0, x: -20, duration: 0.5 });
        }
        gsap.from(vis, {
          scrollTrigger: st,
          x: -90, opacity: 0, duration: 0.95, ease: 'power3.out', delay: 0.05,
        });
        gsap.from(content, {
          scrollTrigger: st,
          x: 90, opacity: 0, duration: 0.95, ease: 'power3.out', delay: 0.1,
        });
      });

      /* 6 ── TECH STACK ─────────────────────────────── */
      gsap.from('.ip2-stack .ip2-sec-label, .ip2-stack h2', {
        scrollTrigger: { trigger: '.ip2-stack', start: 'top 80%', once: true },
        y: 35, opacity: 0, stagger: 0.1, duration: 0.7,
      });
      gsap.from('.ip2-stack-item', {
        scrollTrigger: { trigger: '.ip2-stack-grid', start: 'top 82%', once: true },
        y: 35, opacity: 0, stagger: 0.07, duration: 0.65,
      });

      /* 7 ── FAQ ─────────────────────────────────────── */
      gsap.from('.ip2-faq-top', {
        scrollTrigger: { trigger: '.ip2-faq', start: 'top 78%', once: true },
        y: 40, opacity: 0, duration: 0.75,
      });
      gsap.from('.ip2-faq-item', {
        scrollTrigger: { trigger: '.ip2-faq-list', start: 'top 82%', once: true },
        y: 25, opacity: 0, stagger: 0.08, duration: 0.6,
      });

      /* 8 ── CTA ─────────────────────────────────────── */
      gsap.from('.ip2-cta-left', {
        scrollTrigger: { trigger: '.ip2-cta', start: 'top 78%', once: true },
        y: 50, opacity: 0, duration: 0.85,
      });
      gsap.from('.ip2-cta-right', {
        scrollTrigger: { trigger: '.ip2-cta', start: 'top 76%', once: true },
        y: 50, opacity: 0, duration: 0.85, delay: 0.12,
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef}>
      {/* ── Page entrance overlay ── */}
      <div className="ip2-overlay" ref={overlayRef} />

      <InnerNavbar />

      {/* ════ HERO ════ */}
      <section className="ip2-hero">
        <div className="ip2-hero-inner">
          <nav className="ip2-bc">
            <Link to="/">Home</Link>
            <ChevronRight />
            <Link to="/services">Services</Link>
            <ChevronRight />
            <span>{breadcrumbLabel}</span>
          </nav>

          <span className="ip2-eyebrow">{eyebrow}</span>
          <h1 className="ip2-title">
            {title.split(' ').map((word, i) => (
              <span key={i} className="ip2-word-wrap">
                <span className="ip2-title-word">{word}</span>
              </span>
            ))}
          </h1>
          {metrics && (
            <div className="ip2-metrics">
              {metrics.map((m, i) => (
                <div className="ip2-metric" key={i}>
                  <span className="ip2-metric-num">{m.number}</span>
                  <span className="ip2-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="ip2-hero-rule" />
      </section>

      {/* ════ FULL-WIDTH HERO IMAGE BAND ════ */}
      <div className="ip2-hero-band" ref={heroBandImgRef}>
        <img
          className="svc-spec-img"
          src={heroImage || '/assets/team-visual.jpg'}
          alt={eyebrow}
        />
      </div>

      {/* ════ INTRO ════ */}
      <section className="ip2-intro">
        <div className="ip2-intro-inner">
          <div className="ip2-intro-l">
            <ScrollReveal baseOpacity={0.1} enableBlur={true} baseRotation={3} blurStrength={6}>
              {introParagraphs[0]}
            </ScrollReveal>
          </div>
          {introParagraphs.length > 1 && (
            <div className="ip2-intro-r">
              {introParagraphs.slice(1).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <section className="ip2-process">
        <div className="ip2-process-inner">
          <div className="ip2-sec-label"><span>• PROCESS</span></div>
          <h2>How We Approach Every Engagement</h2>
          <div className="ip2-proc-grid">
            {steps.map((s, i) => (
              <div className="ip2-proc-card" key={i}>
                <span className="ip2-proc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SERVICE ROWS ════ */}
      <section className="ip2-rows">
        <div className="ip2-rows-hdr">
          <div className="ip2-sec-label"><span>• OUR SERVICES</span></div>
          <h2>What We Deliver in {eyebrow}</h2>
        </div>

        {sections.map((s, i) => {
          const VisualComp = VISUALS[i % VISUALS.length];
          const caps = parseCaps(s.useCases);
          const vizColor = s.color || '#ffffff';
          const tag = s.heading.replace(/[^A-Za-z\s]/g, '').trim()
            .split(' ').slice(0, 3).join(' ').toUpperCase();

          return (
            <div className="ip2-row" key={i}>
              <div className="ip2-row-meta"><span>• {tag}</span></div>
              <div className="ip2-row-vis">
                <VisualComp color={vizColor} />
              </div>
              <div className="ip2-row-content">
                <h3>{s.heading}</h3>
                {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                {caps.length > 0 && (
                  <div className="ip2-caps">
                    <span className="ip2-caps-label">CAPABILITIES</span>
                    <ul>
                      {caps.map((c, k) => <li key={k}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* ════ TECH STACK ════ */}
      <section className="ip2-stack">
        <div className="ip2-stack-inner">
          <div className="ip2-sec-label"><span>• TECH STACK</span></div>
          <h2>{stackTitle}</h2>
          <div className="ip2-stack-grid">
            {stackItems.map((item, i) => (
              <div className="ip2-stack-item" key={i}>
                <span className="ip2-stack-num">0{i + 1}</span>
                <h3>{item.label}</h3>
                <p>{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="ip2-faq">
        <div className="ip2-faq-inner">
          <div className="ip2-faq-top">
            <div className="ip2-sec-label"><span>• FAQ</span></div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="ip2-faq-list">
            {faqItems.map((item, i) => <FaqAccordion key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="ip2-cta">
        <div className="ip2-cta-inner">
          <div className="ip2-cta-left">
            <p className="ip2-cta-small">WANT TO START A PROJECT?</p>
            <h2>{ctaHeading}</h2>
          </div>
          <div className="ip2-cta-right">
            <p>{ctaText}</p>
            <Link to="/#contact" className="ip2-cta-btn">
              Start a Conversation <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
