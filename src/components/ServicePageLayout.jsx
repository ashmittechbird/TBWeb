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
gsap.config({ nullTargetWarn: false });

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
    body: 'System architecture and UX are locked before build begins - eliminating expensive mid-project pivots.',
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

/* ── Accent palette for visuals ── */
const VIZ_COLORS = ['#a78bfa','#38bdf8','#34d399','#fbbf24','#f472b6','#22d3ee'];

/* ══════════════════════════════════════════
   ANIMATED ILLUSTRATIVE SVG VISUALS
   ══════════════════════════════════════════ */

/* 0 - Code Editor / Terminal */
function Visual0({ color, index = 0 }) {
  const c = color !== '#ffffff' ? color : VIZ_COLORS[index % VIZ_COLORS.length];
  const codeLines = [
    [70,76,80,true],[156,76,55,false],[80,98,120,false],[206,98,40,true],
    [80,120,90,false],[176,120,70,true],[90,142,150,false],[90,164,110,true],
    [206,164,60,false],[80,186,70,false],[70,208,130,false],[70,230,60,true],
    [136,230,90,false],[70,252,100,false],
  ];
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <rect x="40" y="30" width="400" height="260" rx="12" fill="#141418" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="40" y="30" width="400" height="32" rx="12" fill="#1a1a20" />
      <rect x="40" y="50" width="400" height="12" fill="#1a1a20" />
      <circle cx="62" cy="46" r="5" fill="#ff5f57" fillOpacity="0.8" />
      <circle cx="80" cy="46" r="5" fill="#febc2e" fillOpacity="0.8" />
      <circle cx="98" cy="46" r="5" fill="#28c840" fillOpacity="0.8" />
      <text x="220" y="49" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="JetBrains Mono, monospace">main.py</text>
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <text key={i} x="58" y={86+i*22} fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="end">{i+1}</text>
      ))}
      {/* code lines type in */}
      {codeLines.map(([x,y,w,accent],i)=>(
        <rect key={i} x={x} y={y} width={w} height="10" rx="2"
          fill={accent ? c : 'rgba(255,255,255,0.1)'} fillOpacity={accent ? 0 : 0}>
          <animate attributeName="fillOpacity" values={`0;${accent?0.45:0.1}`} dur="0.3s" begin={`${0.15*i}s`} fill="freeze" />
          <animate attributeName="width" from="0" to={w} dur="0.25s" begin={`${0.15*i}s`} fill="freeze" />
        </rect>
      ))}
      {/* blinking cursor */}
      <rect x="70" y="76" width="2" height="12" fill={c}>
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        <animate attributeName="y" values="76;98;120;142;164;186;208;230;252;252" dur="2.1s" fill="freeze" calcMode="discrete" keyTimes="0;0.11;0.22;0.33;0.44;0.55;0.66;0.77;0.88;1" />
      </rect>
      {/* active line marker */}
      <rect x="40" y="74" width="3" height="14" rx="1" fill={c} fillOpacity="0.7">
        <animate attributeName="y" values="74;96;118;140;162;184;206;228;250;250" dur="2.1s" fill="freeze" calcMode="discrete" keyTimes="0;0.11;0.22;0.33;0.44;0.55;0.66;0.77;0.88;1" />
      </rect>
      {/* scan line */}
      <rect x="40" y="62" width="400" height="1" fill={c} fillOpacity="0.06">
        <animate attributeName="y" from="62" to="290" dur="3s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/* 1 - Dashboard / Analytics */
function Visual1({ color, index = 0 }) {
  const c = color !== '#ffffff' ? color : VIZ_COLORS[index % VIZ_COLORS.length];
  const heights = [45,70,55,90,65,80,50,75];
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <rect x="30" y="24" width="420" height="272" rx="12" fill="#141418" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="30" y="24" width="420" height="28" rx="12" fill="#1a1a20" />
      <rect x="30" y="44" width="420" height="8" fill="#1a1a20" />
      <circle cx="50" cy="38" r="4" fill="#ff5f57" fillOpacity="0.7" />
      <circle cx="64" cy="38" r="4" fill="#febc2e" fillOpacity="0.7" />
      <circle cx="78" cy="38" r="4" fill="#28c840" fillOpacity="0.7" />
      <rect x="140" y="33" width="200" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
      {/* stat cards fade in */}
      {[0,1,2].map(i=>(
        <g key={i} opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${0.2+i*0.15}s`} fill="freeze" />
          <rect x={48+i*132} y="64" width="118" height="56" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <rect x={58+i*132} y="76" width="40" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x={58+i*132} y="92" width="0" height="12" rx="2" fill={c} fillOpacity={0.5+i*0.15}>
            <animate attributeName="width" from="0" to="60" dur="0.6s" begin={`${0.4+i*0.15}s`} fill="freeze" />
          </rect>
        </g>
      ))}
      <rect x="48" y="132" width="256" height="148" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* bars animate up/down continuously */}
      {heights.map((h,i)=>{
        const h2 = [70,45,80,55,90,50,75,65][i];
        return (
          <rect key={i} x={68+i*28} y={268-h} width="16" height={h} rx="3" fill={c} fillOpacity={i===3?0.6:0.25}>
            <animate attributeName="height" values={`${h};${h2};${h}`} dur={`${2.2+i*0.25}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${268-h};${268-h2};${268-h}`} dur={`${2.2+i*0.25}s`} repeatCount="indefinite" />
          </rect>
        );
      })}
      <line x1="60" y1="268" x2="292" y2="268" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <rect x="316" y="132" width="118" height="148" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* donut draws in */}
      <circle cx="375" cy="186" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
      <circle cx="375" cy="186" r="28" stroke={c} strokeWidth="8" strokeOpacity="0.7" strokeDasharray="0 176" strokeLinecap="round">
        <animate attributeName="strokeDasharray" from="0 176" to="70 106" dur="1.2s" begin="0.6s" fill="freeze" />
      </circle>
      {/* live indicator */}
      <circle cx="425" cy="142" r="3" fill="#28c840">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="408" y="145" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="JetBrains Mono, monospace">LIVE</text>
      {[0,1,2].map(i=>(
        <g key={`l${i}`}>
          <circle cx="332" cy={232+i*16} r="3" fill={c} fillOpacity={0.8-i*0.2} />
          <rect x="342" y={228+i*16} width={50-i*10} height="7" rx="2" fill="rgba(255,255,255,0.12)" />
        </g>
      ))}
    </svg>
  );
}

/* 2 - Mobile Device */
function Visual2({ color, index = 0 }) {
  const c = color !== '#ffffff' ? color : VIZ_COLORS[index % VIZ_COLORS.length];
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      <rect x="170" y="18" width="140" height="284" rx="20" fill="#141418" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <rect x="215" y="24" width="50" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="180" y="38" width="120" height="244" rx="4" fill="#0f0f14" />
      <rect x="188" y="44" width="20" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="270" y="44" width="22" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="188" y="58" width="50" height="8" rx="2" fill={c} fillOpacity="0.6" />
      {/* cards slide in */}
      {[[76,true],[134,false],[192,false]].map(([y,active],i)=>(
        <g key={i}>
          <animateTransform attributeName="transform" type="translate" from="60 0" to="0 0" dur="0.4s" begin={`${0.3+i*0.12}s`} fill="freeze" />
          <rect x="186" y={y} width="108" height="48" rx="6"
            fill={active?c:'rgba(255,255,255,0.04)'} fillOpacity={active?0.1:1}
            stroke={active?c:'rgba(255,255,255,0.08)'} strokeWidth="0.8" strokeOpacity={active?0.3:1} />
          <rect x="194" y={y+10} width={active?40:45} height="6" rx="2" fill={active?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.15)'} />
          <rect x="194" y={y+22} width={active?60:55} height="10" rx="2" fill={active?c:'rgba(255,255,255,0.12)'} fillOpacity={active?0.4:1} />
          <rect x="194" y={y+36} width="30" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
      {/* bottom nav */}
      <rect x="186" y="250" width="108" height="26" rx="4" fill="rgba(255,255,255,0.04)" />
      {[0,1,2,3].map(i=>(
        <circle key={i} cx={204+i*26} cy="263" r="5" fill={i===0?c:'rgba(255,255,255,0.12)'} fillOpacity={i===0?0.7:1} />
      ))}
      {/* notification pop */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" />
        <rect x="72" y="70" width="82" height="44" rx="10" fill="#1a1a20" stroke={c} strokeWidth="1" strokeOpacity="0.4">
          <animate attributeName="y" values="90;70;70;70;60" dur="4s" repeatCount="indefinite" />
        </rect>
        <circle cx="86" cy="87" r="6" fill={c} fillOpacity="0.5">
          <animate attributeName="cy" values="107;87;87;87;77" dur="4s" repeatCount="indefinite" />
        </circle>
        <rect x="98" y="82" width="44" height="5" rx="2" fill="rgba(255,255,255,0.2)">
          <animate attributeName="y" values="102;82;82;82;72" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="98" y="92" width="32" height="4" rx="2" fill="rgba(255,255,255,0.1)">
          <animate attributeName="y" values="112;92;92;92;82" dur="4s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* sync spinner */}
      <g>
        <circle cx="362" cy="160" r="14" stroke={c} strokeWidth="1.2" strokeOpacity="0.3" fill="rgba(255,255,255,0.03)">
          <animate attributeName="r" values="14;16;14" dur="2s" repeatCount="indefinite" />
        </circle>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 362 160" to="360 362 160" dur="3s" repeatCount="indefinite" />
          <path d="M355 155 a8 8 0 0 1 14 0" stroke={c} strokeWidth="1.5" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
          <path d="M369 165 a8 8 0 0 1 -14 0" stroke={c} strokeWidth="1.5" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
        </g>
      </g>
      <line x1="310" y1="160" x2="348" y2="160" stroke={c} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3">
        <animate attributeName="strokeDashoffset" from="14" to="0" dur="1s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

/* 3 - API / Integration Nodes */
function Visual3({ color, index = 0 }) {
  const c = color !== '#ffffff' ? color : VIZ_COLORS[index % VIZ_COLORS.length];
  const nodes = [[240,160],[100,80],[380,80],[100,240],[380,240]];
  const lines = [[0,1],[0,2],[0,3],[0,4]];
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {/* connection lines */}
      {lines.map(([a,b],i)=>(
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={c} strokeWidth="1.2" strokeOpacity="0.2" />
      ))}
      <line x1={nodes[1][0]} y1={nodes[1][1]} x2={nodes[2][0]} y2={nodes[2][1]} stroke={c} strokeWidth="1" strokeOpacity="0.12" strokeDasharray="4 4" />
      <line x1={nodes[3][0]} y1={nodes[3][1]} x2={nodes[4][0]} y2={nodes[4][1]} stroke={c} strokeWidth="1" strokeOpacity="0.12" strokeDasharray="4 4" />
      {/* data packets traveling */}
      {lines.map(([a,b],i)=>(
        <circle key={`p${i}`} r="4" fill={c} fillOpacity="0.8">
          <animate attributeName="cx" values={`${nodes[a][0]};${nodes[b][0]};${nodes[a][0]}`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values={`${nodes[a][1]};${nodes[b][1]};${nodes[a][1]}`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite" />
          <animate attributeName="fillOpacity" values="0.2;0.9;0.9;0.2" dur={`${2.5+i*0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* center hub pulse */}
      <circle cx="240" cy="160" r="36" fill={c} fillOpacity="0.05" stroke={c} strokeWidth="1.5" strokeOpacity="0.5">
        <animate attributeName="r" values="36;40;36" dur="3s" repeatCount="indefinite" />
        <animate attributeName="strokeOpacity" values="0.5;0.25;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="160" r="20" fill={c} fillOpacity="0.15" />
      <text x="240" y="164" textAnchor="middle" fill={c} fillOpacity="0.9" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="700">API</text>
      {/* outer nodes */}
      {[[100,80,'ERP'],[380,80,'CRM'],[100,240,'DB'],[380,240,'App']].map(([x,y,label],i)=>(
        <g key={i}>
          <rect x={x-30} y={y-20} width="60" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke={c} strokeWidth="1" strokeOpacity="0.35" />
          <text x={x} y={y+4} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="JetBrains Mono, monospace">{label}</text>
          <circle cx={x+22} cy={y-12} r="3" fill="#28c840" fillOpacity="0.8">
            <animate attributeName="fillOpacity" values="0.8;0.3;0.8" dur={`${1.5+i*0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <text x="200" y="108" fill={c} fillOpacity="0.2" fontSize="28" fontFamily="JetBrains Mono, monospace">{'{'}</text>
      <text x="268" y="228" fill={c} fillOpacity="0.2" fontSize="28" fontFamily="JetBrains Mono, monospace">{'}'}</text>
    </svg>
  );
}

/* 4 - Cloud Infrastructure */
function Visual4({ color, index = 0 }) {
  const c = color !== '#ffffff' ? color : VIZ_COLORS[index % VIZ_COLORS.length];
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {/* floating cloud */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="4s" repeatCount="indefinite" />
        <path d="M160 140 Q160 100 200 100 Q215 70 255 70 Q295 70 310 100 Q345 95 350 130 Q380 130 380 155 Q380 180 350 180 L160 180 Q130 180 130 155 Q130 135 160 140 Z" fill={c} fillOpacity="0.06" stroke={c} strokeWidth="1.5" strokeOpacity="0.4" />
        <ellipse cx="255" cy="135" rx="60" ry="30" fill={c} fillOpacity="0.04">
          <animate attributeName="fillOpacity" values="0.02;0.06;0.02" dur="3s" repeatCount="indefinite" />
        </ellipse>
      </g>
      {/* servers */}
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x={148+i*70} y="210" width="56" height="70" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <rect x={156+i*70} y="222" width="40" height="4" rx="2" fill={c} fillOpacity="0.35">
            <animate attributeName="fillOpacity" values="0.2;0.5;0.2" dur={`${1.2+i*0.5}s`} repeatCount="indefinite" />
          </rect>
          <rect x={156+i*70} y="232" width="40" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
          <rect x={156+i*70} y="242" width="40" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
          <circle cx={184+i*70} cy="266" r="3" fill={c} fillOpacity="0.8">
            <animate attributeName="fillOpacity" values="0.9;0.3;0.9" dur={`${1+i*0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* data flowing down */}
      {[0,1,2].map(i=>(
        <g key={`f${i}`}>
          <line x1={176+i*70} y1="180" x2={176+i*70} y2="210" stroke={c} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3">
            <animate attributeName="strokeDashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
          </line>
          <circle r="2.5" fill={c} fillOpacity="0.7" cx={176+i*70}>
            <animate attributeName="cy" values="180;210;180" dur={`${1.4+i*0.3}s`} repeatCount="indefinite" />
            <animate attributeName="fillOpacity" values="0;0.8;0.8;0" dur={`${1.4+i*0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* bouncing upload arrow */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.5s" repeatCount="indefinite" />
        <path d="M240 120 l-8 10 h5 v12 h6 v-12 h5 z" fill={c} fillOpacity="0.5" />
      </g>
      {/* bouncing download arrow */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 5;0 0" dur="1.5s" repeatCount="indefinite" begin="0.75s" />
        <path d="M270 148 l-8 -10 h5 v-12 h6 v12 h5 z" fill={c} fillOpacity="0.35" />
      </g>
      <text x="60" y="155" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">REGION-1</text>
      <text x="385" y="155" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">REGION-2</text>
      <text x="20" y="308" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">CLOUD INFRASTRUCTURE</text>
    </svg>
  );
}

/* 5 - Globe / Network */
function Visual5({ color, index = 0 }) {
  const c = color !== '#ffffff' ? color : VIZ_COLORS[index % VIZ_COLORS.length];
  const pins = [[185,105],[295,90],[200,175],[330,145],[155,160],[272,210]];
  const arcs = [
    'M185 105 Q240 70 295 90',
    'M200 175 Q260 140 330 145',
    'M155 160 Q180 210 272 210',
  ];
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="ip2-row-svg">
      <rect width="480" height="320" fill="#0c0c10" />
      {/* slowly rotating grid lines */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 240 155" to="360 240 155" dur="60s" repeatCount="indefinite" />
        {[-55,-25,0,25,55].map((lat,i)=>{
          const ry=110*Math.cos(lat*Math.PI/180);
          const y=155-110*Math.sin(lat*Math.PI/180);
          return <ellipse key={i} cx="240" cy={y} rx={ry} ry={ry*0.25} stroke={c} strokeWidth="0.8" strokeOpacity="0.12" fill="none" />;
        })}
        {[0,50,100].map((lon,i)=>(
          <ellipse key={`lon${i}`} cx="240" cy="155" rx={110*Math.abs(Math.cos(lon*Math.PI/180))} ry="110" stroke={c} strokeWidth="0.8" strokeOpacity="0.1" fill="none" />
        ))}
      </g>
      {/* static globe ring */}
      <circle cx="240" cy="155" r="110" stroke={c} strokeWidth="1" strokeOpacity="0.25" />
      <circle cx="240" cy="155" r="110" fill={c} fillOpacity="0.03" />
      {/* pulsing location pins */}
      {pins.map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill={c} fillOpacity="0.8" />
          <circle cx={x} cy={y} r="6" stroke={c} strokeWidth="1" fill="none" strokeOpacity="0.6">
            <animate attributeName="r" values="6;20" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
            <animate attributeName="strokeOpacity" values="0.6;0" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* arcs with traveling dots */}
      {arcs.map((d,i)=>(
        <g key={i}>
          <path d={d} stroke={c} strokeWidth="1" strokeOpacity="0.35" fill="none" />
          <circle r="3" fill={c} fillOpacity="0.9">
            <animateMotion dur={`${2+i*0.5}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      <text x="20" y="308" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">GLOBAL NETWORK</text>
    </svg>
  );
}
const VISUALS = [Visual0, Visual1, Visual2, Visual3, Visual4, Visual5];

/* ── Keyword-based visual picker — matches section heading to the most relevant SVG ── */
const VISUAL_KEYWORDS = [
  { keys: ['code','erp','web app','api','saas','software','custom','frappe','development','backend','frontend'], viz: 0 },
  { keys: ['analytics','dashboard','report','metric','data','attribution','kpi','insight','bi','forecast'], viz: 1 },
  { keys: ['mobile','app','ios','android','react native','flutter','responsive','pwa'], viz: 2 },
  { keys: ['ai','ml','rag','llm','agent','model','neural','nlp','automation','chatbot','intelligent'], viz: 3 },
  { keys: ['cloud','devops','ci/cd','pipeline','kubernetes','docker','infrastructure','migration','server','deploy','aws','azure'], viz: 4 },
  { keys: ['global','network','integration','connect','platform','crm','hubspot','salesforce','cdp','martech','stack'], viz: 5 },
  { keys: ['seo','content','marketing','gtm','paid','social','campaign','growth','brand','email','strategy'], viz: 1 },
  { keys: ['2d','3d','animation','cgi','vfx','ar','vr','motion','render','visual','video','explainer'], viz: 2 },
  { keys: ['security','compliance','audit','governance','encrypt','firewall','pen test','iso','gdpr'], viz: 4 },
  { keys: ['cost','optim','budget','pricing','saving','roi','roas','revenue','performance'], viz: 1 },
];

function pickVisual(heading, index) {
  const h = (heading || '').toLowerCase();
  for (const rule of VISUAL_KEYWORDS) {
    if (rule.keys.some(k => h.includes(k))) return VISUALS[rule.viz];
  }
  return VISUALS[index % VISUALS.length];
}

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
  eyebrow, title, introParagraphs, sections,
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
    const root = containerRef.current;
    if (!root) return;
    const has = (sel) => !!root.querySelector(sel);

    const ctx = gsap.context(() => {

      /* 1 ── PAGE ENTRANCE ───────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // dark overlay lifts away
      if (has('.ip2-overlay')) {
        tl.to('.ip2-overlay', { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
          .set('.ip2-overlay', { display: 'none' }, 0.6);
      }

      // breadcrumb fades
      if (has('.ip2-bc'))         tl.from('.ip2-bc',         { opacity: 0, y: 10, duration: 0.5 }, 0.25);

      // eyebrow + title words clip-reveal from bottom, staggered
      if (has('.ip2-eyebrow'))    tl.from('.ip2-eyebrow',    { y: 30, opacity: 0, duration: 0.6 }, 0.3);
      if (has('.ip2-title-word')) tl.from('.ip2-title-word', { y: '110%', opacity: 0, duration: 0.75, stagger: 0.06 }, 0.35);

      // subtitle
      if (has('.ip2-sub'))        tl.from('.ip2-sub',        { y: 28, opacity: 0, duration: 0.65 }, 0.55);

      // metrics (optional - not every page has them)
      const metricEls = gsap.utils.toArray('.ip2-metric');
      if (metricEls.length) {
        tl.from(metricEls, { y: 18, opacity: 0, stagger: 0.1, duration: 0.5 }, 0.65);
      }

      // hero rule scales in from left
      if (has('.ip2-hero-rule')) tl.from('.ip2-hero-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power4.out' }, 0.5);

      /* 2 ── HERO BAND image reveal ─────────────── */
      if (heroBandImgRef.current) {
        gsap.fromTo(
          heroBandImgRef.current,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.4, ease: 'power3.inOut',
            scrollTrigger: { trigger: heroBandImgRef.current, start: 'top 95%', once: true },
          }
        );
      }

      /* 3 ── INTRO SECTION right paras ──────────────── */
      const introParaEls = gsap.utils.toArray('.ip2-intro-r p');
      if (introParaEls.length) {
        gsap.from(introParaEls, {
          scrollTrigger: { trigger: '.ip2-intro', start: 'top 68%', once: true },
          y: 40, opacity: 0, stagger: 0.13, duration: 0.75, delay: 0.15,
        });
      }

      /* 4 ── PROCESS - entrance stagger ─────────────── */
      if (has('.ip2-process')) {
        if (has('.ip2-process .ip2-sec-label')) gsap.from('.ip2-process .ip2-sec-label', {
          scrollTrigger: { trigger: '.ip2-process', start: 'top 84%', once: true },
          y: 20, opacity: 0, duration: 0.5,
        });
        if (has('.ip2-process h2')) gsap.from('.ip2-process h2', {
          scrollTrigger: { trigger: '.ip2-process', start: 'top 82%', once: true },
          y: 40, opacity: 0, duration: 0.75,
        });
        if (has('.ip2-proc-card')) gsap.from('.ip2-proc-card', {
          scrollTrigger: { trigger: '.ip2-proc-grid', start: 'top 80%', once: true },
          y: 50, opacity: 0, stagger: 0.12, duration: 0.7,
        });
      }

      /* 4 ── SERVICES HEADER ─────────────────────────── */
      if (has('.ip2-rows-hdr')) {
        if (has('.ip2-rows-hdr .ip2-sec-label')) gsap.from('.ip2-rows-hdr .ip2-sec-label', {
          scrollTrigger: { trigger: '.ip2-rows-hdr', start: 'top 82%', once: true },
          y: 20, opacity: 0, duration: 0.5,
        });
        if (has('.ip2-rows-hdr h2')) gsap.from('.ip2-rows-hdr h2', {
          scrollTrigger: { trigger: '.ip2-rows-hdr', start: 'top 80%', once: true },
          y: 45, opacity: 0, duration: 0.8, delay: 0.08,
        });
      }

      /* 5 ── SERVICE ROWS - split left/right reveal ─── */
      gsap.utils.toArray('.ip2-row').forEach((row) => {
        const vis     = row.querySelector('.ip2-row-vis');
        const content = row.querySelector('.ip2-row-content');
        const meta    = row.querySelector('.ip2-row-meta');

        const st = { trigger: row, start: 'top 80%', once: true };

        if (meta)    gsap.from(meta,    { scrollTrigger: st, opacity: 0, x: -20, duration: 0.5 });
        if (vis)     gsap.from(vis,     { scrollTrigger: st, x: -90, opacity: 0, duration: 0.95, ease: 'power3.out', delay: 0.05 });
        if (content) gsap.from(content, { scrollTrigger: st, x: 90,  opacity: 0, duration: 0.95, ease: 'power3.out', delay: 0.1 });
      });

      /* 6 ── TECH STACK ─────────────────────────────── */
      if (has('.ip2-stack')) {
        gsap.from('.ip2-stack .ip2-sec-label, .ip2-stack h2', {
          scrollTrigger: { trigger: '.ip2-stack', start: 'top 80%', once: true },
          y: 35, opacity: 0, stagger: 0.1, duration: 0.7,
        });
        if (has('.ip2-stack-item')) gsap.from('.ip2-stack-item', {
          scrollTrigger: { trigger: '.ip2-stack-grid', start: 'top 82%', once: true },
          y: 35, opacity: 0, stagger: 0.07, duration: 0.65,
        });
      }

      /* 7 ── FAQ ─────────────────────────────────────── */
      if (has('.ip2-faq')) {
        if (has('.ip2-faq-top'))  gsap.from('.ip2-faq-top', {
          scrollTrigger: { trigger: '.ip2-faq', start: 'top 78%', once: true },
          y: 40, opacity: 0, duration: 0.75,
        });
        if (has('.ip2-faq-item')) gsap.from('.ip2-faq-item', {
          scrollTrigger: { trigger: '.ip2-faq-list', start: 'top 82%', once: true },
          y: 25, opacity: 0, stagger: 0.08, duration: 0.6,
        });
      }

      /* 8 ── CTA ─────────────────────────────────────── */
      if (has('.ip2-cta')) {
        if (has('.ip2-cta-left'))  gsap.from('.ip2-cta-left',  { scrollTrigger: { trigger: '.ip2-cta', start: 'top 78%', once: true }, y: 50, opacity: 0, duration: 0.85 });
        if (has('.ip2-cta-right')) gsap.from('.ip2-cta-right', { scrollTrigger: { trigger: '.ip2-cta', start: 'top 76%', once: true }, y: 50, opacity: 0, duration: 0.85, delay: 0.12 });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

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
          src={heroImage || '/assets/team-visual.webp'}
          alt={eyebrow}
          loading="lazy"
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
          const VisualComp = pickVisual(s.heading, i);
          const caps = parseCaps(s.useCases);
          const vizColor = s.color || '#ffffff';
          const tag = s.heading.replace(/[^A-Za-z\s]/g, '').trim()
            .split(' ').slice(0, 3).join(' ').toUpperCase();

          return (
            <div className="ip2-row" key={i}>
              <div className="ip2-row-meta"><span>• {tag}</span></div>
              <div className="ip2-row-vis">
                <VisualComp color={vizColor} index={i} />
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
            <Link to="/contact" className="ip2-cta-btn">
              Start a Conversation <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
