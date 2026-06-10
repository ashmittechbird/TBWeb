import { useEffect, useRef } from 'react';

const MAX_COLORS = 8;

const hexToRGB = hex => {
  const c = hex.replace('#', '').padEnd(6, '0');
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ];
};

const prepColors = input => {
  const base = (input && input.length ? input : ['#A6C8FF', '#5227FF', '#FF9FFC']).slice(0, MAX_COLORS);
  const count = base.length;
  const arr = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
  const avg = [0, 0, 0];
  for (let i = 0; i < count; i++) { avg[0] += arr[i][0]; avg[1] += arr[i][1]; avg[2] += arr[i][2]; }
  avg[0] /= count; avg[1] /= count; avg[2] /= count;
  return { arr, count, avg };
};

const VERT = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform vec3  iResolution;
  uniform vec2  iMouse;
  uniform float iTime;
  uniform vec3  uColor0; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
  uniform vec3  uColor4; uniform vec3 uColor5; uniform vec3 uColor6; uniform vec3 uColor7;
  uniform int   uColorCount;
  uniform vec3  uBgColor;
  uniform vec3  uMouseColor;
  uniform float uSpeed;
  uniform int   uStreakCount;
  uniform float uStreakWidth;
  uniform float uStreakLength;
  uniform float uGlow;
  uniform float uDensity;
  uniform float uTwinkle;
  uniform float uZoom;
  uniform float uBgGlow;
  uniform float uOpacity;
  uniform float uMouseEnabled;
  uniform float uMouseStrength;
  uniform float uMouseRadius;
  varying vec2 vUv;

  vec3 palette(float h) {
    int count = uColorCount;
    if (count < 1) count = 1;
    int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
    if (idx <= 0) return uColor0;
    if (idx == 1) return uColor1;
    if (idx == 2) return uColor2;
    if (idx == 3) return uColor3;
    if (idx == 4) return uColor4;
    if (idx == 5) return uColor5;
    if (idx == 6) return uColor6;
    return uColor7;
  }

  vec3 tanhv(vec3 x) {
    vec3 e = exp(-2.0 * x);
    return (1.0 - e) / (1.0 + e);
  }

  vec2 sceneC(vec2 frag, vec2 r) {
    vec2 P = (frag + frag - r) / r.x;
    float z = 0.0;
    float d = 1e3;
    vec4 O = vec4(0.0);
    for (int k = 0; k < 39; k++) {
      if (d <= 1e-4) break;
      O = z * normalize(vec4(P, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;
      d = 1.0 - sqrt(length(O * O));
      z += d;
    }
    return vec2(O.x, atan(O.z, O.y));
  }

  void mainImage(out vec4 o, vec2 C) {
    vec2 r  = iResolution.xy;
    vec2 uv0 = (C + C - r) / r.x;
    float T  = 0.1 * iTime * uSpeed + 9.0;
    float angRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));
    vec2 Y   = vec2(5e-3, 6.28318530718 / angRings);
    vec2 c0  = sceneC(C, r);
    vec2 cdx = sceneC(C + vec2(1.0, 0.0), r);
    vec2 cdy = sceneC(C + vec2(0.0, 1.0), r);
    vec2 dCx = cdx - c0;
    vec2 dCy = cdy - c0;
    dCx.y -= 6.28318530718 * floor(dCx.y / 6.28318530718 + 0.5);
    dCy.y -= 6.28318530718 * floor(dCy.y / 6.28318530718 + 0.5);
    vec2 fw  = abs(dCx) + abs(dCy);
    C = c0;
    vec2 P = vec2(2.0, 1.0) * uv0 - (r / r.x) * vec2(0.0, 1.0);
    vec4 O = vec4(uBgColor * 90.0 * uBgGlow / (1e3 * dot(P, P) + 6.0), 0.0);
    float mGlow = 0.0;
    if (uMouseEnabled > 0.5) {
      vec2 mN  = (iMouse + iMouse - r) / r.x;
      float md = length(uv0 - mN);
      mGlow    = exp(-md * md / max(uMouseRadius * uMouseRadius, 1e-4)) * uMouseStrength;
      O.rgb   += uMouseColor * mGlow * 0.25;
    }
    float zr   = 5e-4 * uStreakWidth;
    vec2  rr   = vec2(max(length(fw), 1e-5));
    float tail = 19.0 / max(uStreakLength, 0.05);
    for (int m = 0; m < 16; m++) {
      if (m >= uStreakCount) break;
      float jf  = float(m) + 1.0;
      float ic  = fract(sin(dot(vec2(jf, floor(C.x / Y.x + 0.5)), vec2(7.0, 11.0)) * 73.0));
      vec2  Pp  = C - (T + T * ic) * vec2(0.0, 1.0);
      Pp       -= floor(Pp / Y + 0.5) * Y;
      float h   = fract(8663.0 * ic);
      vec3  col = palette(h);
      float weight = mix(1.5, 1.0 + sin(T + 7.0 * h + 4.0), uTwinkle);
      weight *= (1.0 + mGlow * 2.0);
      vec2  inner = vec2(length(max(Pp, vec2(-1.0, 0.0))), length(Pp) - zr) - zr;
      vec2  sm    = vec2(1.0) - smoothstep(-rr, rr, inner);
      O.rgb += dot(sm, vec2(exp(tail * Pp.y), 3.0)) * col * weight;
      C.x   += Y.x / 8.0;
    }
    vec3 colr = sqrt(tanhv(max(O.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0)));
    o = vec4(colr, uOpacity);
  }

  void main() {
    vec4 color;
    mainImage(color, vUv * iResolution.xy);
    gl_FragColor = color;
  }
`;

export default function LightfallBanner({
  colors           = ['#00c9b1', '#0ea5e9', '#1a56db', '#38bdf8'],
  backgroundColor  = '#030e1f',
  speed            = 0.7,
  streakCount      = 5,
  streakWidth      = 1.2,
  streakLength     = 1.4,
  glow             = 1.1,
  density          = 0.55,
  twinkle          = 0.9,
  zoom             = 2.6,
  backgroundGlow   = 0.5,
  opacity          = 1,
  mouseInteraction = true,
  mouseStrength    = 0.7,
  mouseRadius      = 0.9,
  mouseDampening   = 0.15,
}) {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) { container.removeChild(canvas); return; }

    function mkShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error('Shader error:', gl.getShaderInfoLog(s));
      return s;
    }
    const vs  = mkShader(gl.VERTEX_SHADER,   VERT);
    const fs  = mkShader(gl.FRAGMENT_SHADER, FRAG);
    const prg = gl.createProgram();
    gl.attachShader(prg, vs);
    gl.attachShader(prg, fs);
    gl.linkProgram(prg);
    gl.useProgram(prg);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prg, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 2,0, 0,2]), gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(prg, 'uv');
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    const uNames = [
      'iResolution','iMouse','iTime',
      'uColor0','uColor1','uColor2','uColor3','uColor4','uColor5','uColor6','uColor7',
      'uColorCount','uBgColor','uMouseColor','uSpeed','uStreakCount',
      'uStreakWidth','uStreakLength','uGlow','uDensity','uTwinkle',
      'uZoom','uBgGlow','uOpacity','uMouseEnabled','uMouseStrength','uMouseRadius'
    ];
    uNames.forEach(n => { U[n] = gl.getUniformLocation(prg, n); });

    const { arr, count, avg } = prepColors(colors);
    for (let i = 0; i < 8; i++) gl.uniform3fv(U[`uColor${i}`], arr[i]);
    gl.uniform1i(U.uColorCount,    count);
    gl.uniform3fv(U.uBgColor,      hexToRGB(backgroundColor));
    gl.uniform3fv(U.uMouseColor,   avg);
    gl.uniform1f(U.uSpeed,         speed);
    gl.uniform1i(U.uStreakCount,   Math.max(1, Math.min(16, Math.round(streakCount))));
    gl.uniform1f(U.uStreakWidth,   streakWidth);
    gl.uniform1f(U.uStreakLength,  streakLength);
    gl.uniform1f(U.uGlow,          glow);
    gl.uniform1f(U.uDensity,       density);
    gl.uniform1f(U.uTwinkle,       twinkle);
    gl.uniform1f(U.uZoom,          zoom);
    gl.uniform1f(U.uBgGlow,        backgroundGlow);
    gl.uniform1f(U.uOpacity,       opacity);
    gl.uniform1f(U.uMouseEnabled,  mouseInteraction ? 1.0 : 0.0);
    gl.uniform1f(U.uMouseStrength, mouseStrength);
    gl.uniform1f(U.uMouseRadius,   mouseRadius);

    const dprVal = window.devicePixelRatio || 1;
    function resize() {
      const rect = container.getBoundingClientRect();
      canvas.width  = Math.round(rect.width  * dprVal);
      canvas.height = Math.round(rect.height * dprVal);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prg);
      gl.uniform3f(U.iResolution, canvas.width, canvas.height, 1);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const mTarget = [0, 0];
    const mCur    = [0, 0];
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mTarget[0] = (e.clientX - rect.left) * dprVal;
      mTarget[1] = (rect.height - (e.clientY - rect.top)) * dprVal;
    }
    if (mouseInteraction) window.addEventListener('mousemove', onMove);

    let lastT  = 0;
    let active = true;

    function loop(t) {
      if (!active) return;
      rafRef.current = requestAnimationFrame(loop);
      const dt  = (t - lastT) / 1000;
      lastT     = t;
      if (mouseDampening > 0) {
        const f = 1 - Math.exp(-dt / Math.max(1e-4, mouseDampening));
        mCur[0] += (mTarget[0] - mCur[0]) * f;
        mCur[1] += (mTarget[1] - mCur[1]) * f;
      } else {
        mCur[0] = mTarget[0];
        mCur[1] = mTarget[1];
      }
      gl.useProgram(prg);
      gl.uniform1f(U.iTime,  t * 0.001);
      gl.uniform2f(U.iMouse, mCur[0], mCur[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      if (mouseInteraction) window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      if (canvas.parentElement === container) container.removeChild(canvas);
      gl.deleteProgram(prg);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(uvBuf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'hidden', zIndex:1 }}
    />
  );
}
