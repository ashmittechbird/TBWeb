import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── maths helpers ── */
function rotXY(x, y, z, rx, ry) {
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const nx = x * cy + z * sy, nz = -x * sy + z * cy;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  return [nx, y * cx - nz * sx, y * sx + nz * cx];
}

function makeIco() {
  const φ = (1 + Math.sqrt(5)) / 2;
  const raw = [[-1,φ,0],[1,φ,0],[-1,-φ,0],[1,-φ,0],[0,-1,φ],[0,1,φ],[0,-1,-φ],[0,1,-φ],[φ,0,-1],[φ,0,1],[-φ,0,-1],[-φ,0,1]];
  const v = raw.map(([a,b,c]) => { const l = Math.hypot(a,b,c); return [a/l, b/l, c/l]; });
  const f = [[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
  const s = new Set(), e = [];
  f.forEach(([a,b,c]) => [[a,b],[b,c],[a,c]].forEach(([i,j]) => {
    const k = Math.min(i,j)+'_'+Math.max(i,j);
    if (!s.has(k)) { s.add(k); e.push([i,j]); }
  }));
  return { v, e };
}

function fibSphere(N) {
  const pts = [], ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N-1)) * 2, r = Math.sqrt(Math.max(0, 1 - y*y)), θ = ga * i;
    pts.push([Math.cos(θ)*r, y, Math.sin(θ)*r]);
  }
  return pts;
}

const { v: ICO_V, e: ICO_E } = makeIco();
const SPHERE_DOTS = fibSphere(460);
const SPIRIT = Array.from({ length: 340 }, () => {
  const t = Math.random(), y = -1.3 + t*2.5, θ = Math.random()*Math.PI*2;
  const r = Math.pow(Math.random(), 2) * (y < 0 ? -y*0.22+0.05 : 0.10);
  return { x: Math.cos(θ)*r, y, z: Math.sin(θ)*r*0.6 };
});

/* Pure Canvas-2D scene — no WebGL required */
export default function AboutScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    mount.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, cx = 0, cy = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = mount.clientWidth || 800;
      h = mount.clientHeight || 800;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      cx = w / 2; cy = h / 2;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let target = 0, cur = 0;
    const st = ScrollTrigger.create({
      trigger: '.ab-hero-wrap', start: 'top top', end: 'bottom bottom',
      onUpdate: self => { target = self.progress; },
    });

    let inView = true;
    const io = new IntersectionObserver(e => { inView = e[0]?.isIntersecting ?? true; }, { threshold: 0 });
    io.observe(mount);

    const mT = { x: 0, y: 0 }, mC = { x: 0, y: 0 };
    const onMove = e => { mT.x = (e.clientX/innerWidth-0.5)*2; mT.y = (e.clientY/innerHeight-0.5)*2; };
    addEventListener('pointermove', onMove, { passive: true });

    const t0 = performance.now();
    let raf, active = true;

    function tick() {
      if (!active) return;
      raf = requestAnimationFrame(tick);
      if (!inView || document.hidden) return;

      const t = (performance.now() - t0) / 1000;
      cur += (target - cur) * 0.07;
      mC.x += (mT.x - mC.x) * 0.05;
      mC.y += (mT.y - mC.y) * 0.05;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const R    = Math.min(w, h) * 0.34;
      const sc   = 1 + cur * 0.45;
      const rotX = 0.18 + Math.sin(t*0.2) * 0.05;
      const rotY = t * 0.12 + mC.x * 0.08;

      // scroll-fade for the spirit: gf = 1 when cur<0.38, fades to 0 by cur=0.80
      const gf = 1 - Math.max(0, Math.min(1, (cur - 0.38) / 0.42));

      /* ── atmospheric background glow ── */
      {
        const g = ctx.createRadialGradient(cx, cy*0.85, 0, cx, cy, R*1.7);
        g.addColorStop(0, 'rgba(43,80,190,.14)');
        g.addColorStop(0.5, 'rgba(20,30,100,.06)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      /* ── wireframe globe (inner) ── */
      const la1 = 0.62 * (1 - cur * 0.65);
      if (la1 > 0.01) {
        ctx.strokeStyle = `rgba(112,136,255,${la1.toFixed(3)})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        for (const [i, j] of ICO_E) {
          const [ax, ay] = rotXY(ICO_V[i][0]*R*sc, ICO_V[i][1]*R*sc, ICO_V[i][2]*R*sc, rotX, rotY);
          const [bx, by] = rotXY(ICO_V[j][0]*R*sc, ICO_V[j][1]*R*sc, ICO_V[j][2]*R*sc, rotX, rotY);
          ctx.moveTo(cx+ax, cy-ay);
          ctx.lineTo(cx+bx, cy-by);
        }
        ctx.stroke();
      }

      /* ── wireframe globe (outer, different tilt) ── */
      const la2 = 0.32 * (1 - cur * 0.65);
      if (la2 > 0.01) {
        const R2 = R * 1.17;
        ctx.strokeStyle = `rgba(154,111,224,${la2.toFixed(3)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (const [i, j] of ICO_E) {
          const [ax, ay] = rotXY(ICO_V[i][0]*R2*sc, ICO_V[i][1]*R2*sc, ICO_V[i][2]*R2*sc, rotX+0.22, rotY*0.82);
          const [bx, by] = rotXY(ICO_V[j][0]*R2*sc, ICO_V[j][1]*R2*sc, ICO_V[j][2]*R2*sc, rotX+0.22, rotY*0.82);
          ctx.moveTo(cx+ax, cy-ay);
          ctx.lineTo(cx+bx, cy-by);
        }
        ctx.stroke();
      }

      /* ── fibonacci sphere dots ── */
      const dotA = Math.max(0, 1 - cur * 0.5);
      if (dotA > 0.02) {
        for (let i = 0; i < SPHERE_DOTS.length; i++) {
          const [dx, dy] = rotXY(SPHERE_DOTS[i][0]*R*sc, SPHERE_DOTS[i][1]*R*sc, SPHERE_DOTS[i][2]*R*sc, rotX, rotY);
          const col = i%2===0 ? '159,194,255' : '106,123,255';
          ctx.beginPath();
          ctx.arc(cx+dx, cy-dy, Math.max(0.8, R*0.011), 0, Math.PI*2);
          ctx.fillStyle = `rgba(${col},${dotA.toFixed(3)})`;
          ctx.fill();
        }
      }

      /* ── orbital rings ── */
      const r1a = 0.45 * (1 - cur * 0.6);
      const r2a = 0.30 * (1 - cur * 0.6);
      if (r1a > 0.01) {
        ctx.strokeStyle = `rgba(91,107,255,${r1a.toFixed(3)})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.ellipse(cx, cy, (1+cur*0.5)*R*1.09, (1+cur*0.5)*R*0.30, t*0.25, 0, Math.PI*2);
        ctx.stroke();
      }
      if (r2a > 0.01) {
        ctx.strokeStyle = `rgba(138,91,255,${r2a.toFixed(3)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.ellipse(cx, cy, (1+cur*0.5)*R*1.20, (1+cur*0.5)*R*0.22, -t*0.18+0.8, 0, Math.PI*2);
        ctx.stroke();
      }

      /* ── spirit plume particles (additive) ── */
      const spA = 0.95 * (0.18 + 0.82*gf);
      if (spA > 0.02) {
        ctx.globalCompositeOperation = 'lighter';
        const offY = cur * 1.3 * R * 0.55;
        for (const p of SPIRIT) {
          const col = p.y > 0.7 ? '255,255,255' : p.y > -0.2 ? '188,220,255' : '107,123,255';
          const bright = p.y > 0.7 ? 1 : p.y > -0.2 ? 0.72 : 0.50;
          ctx.beginPath();
          ctx.arc(cx + p.x*R*0.72, cy - (p.y*R*0.55 + offY), Math.max(0.7, R*0.011), 0, Math.PI*2);
          ctx.fillStyle = `rgba(${col},${(spA*bright).toFixed(3)})`;
          ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      /* ── core glow sprite ── */
      if (gf > 0.01) {
        ctx.globalCompositeOperation = 'lighter';
        const gcy = cy - (cur*1.4 + Math.sin(t*1.6)*0.03) * R * 0.55;
        const cr = (1.7 + Math.sin(t*1.6)*0.13 + cur*0.5) * (0.5 + 0.5*gf) * R * 0.44;
        const cg = ctx.createRadialGradient(cx, gcy, 0, cx, gcy, cr);
        cg.addColorStop(0,   `rgba(255,255,255,${(0.88*gf).toFixed(3)})`);
        cg.addColorStop(0.30, `rgba(190,220,255,${(0.48*gf).toFixed(3)})`);
        cg.addColorStop(0.65, `rgba(110,140,255,${(0.18*gf).toFixed(3)})`);
        cg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(cx, gcy, cr, 0, Math.PI*2);
        ctx.fillStyle = cg;
        ctx.fill();

        /* beam */
        const beamA = (0.45 + cur*0.2) * gf;
        if (beamA > 0.01) {
          const bcy = cy - (1.3 + cur*1.4) * R * 0.4;
          const bg = ctx.createLinearGradient(cx, bcy - R*0.9, cx, bcy + R*0.3);
          bg.addColorStop(0, 'rgba(255,255,255,0)');
          bg.addColorStop(0.45, `rgba(200,225,255,${(beamA*0.35).toFixed(3)})`);
          bg.addColorStop(1,   `rgba(180,200,255,${(beamA*0.75).toFixed(3)})`);
          ctx.beginPath();
          ctx.ellipse(cx, bcy, R*0.014, R*0.92, 0, 0, Math.PI*2);
          ctx.fillStyle = bg;
          ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';
      }
    }

    tick();

    const onVis = () => { active = !document.hidden; if (active) tick(); };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      removeEventListener('pointermove', onMove);
      ro.disconnect();
      io.disconnect();
      st.kill();
      if (canvas.parentElement === mount) mount.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
