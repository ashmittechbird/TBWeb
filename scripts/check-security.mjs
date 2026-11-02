/* `npm run check:security`

   1. The security headers are defined twice - vercel.json (the Vercel
      deployment) and deploy/nginx-security-headers.conf.example (the nginx box
      that serves techbird.in). They must say the same thing, or the two hosts
      quietly enforce different policies. This fails if they differ.
   2. The Content-Security-Policy must not have been loosened into something that
      no longer protects: no unsafe-eval, no wildcard or plain-http sources, and
      the directives that close the common holes must be present.
   3. public/.well-known/security.txt must be valid and not about to expire. */

import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from './lib/routes.mjs';
import { inspectSecurityTxt, RENEW_WARNING_DAYS } from './lib/securitytxt.mjs';

const problems = [];

/* ── headers: vercel.json vs the nginx snippet ─────────────────────── */
const vercel = JSON.parse(await fs.readFile(path.join(ROOT, 'vercel.json'), 'utf8'));
const block = vercel.headers.find((h) => h.source === '/(.*)');
if (!block) throw new Error('vercel.json has no "/(.*)" headers block.');
const fromVercel = Object.fromEntries(block.headers.map((h) => [h.key, h.value]));

const snippet = await fs.readFile(path.join(ROOT, 'deploy', 'nginx-security-headers.conf.example'), 'utf8');
const fromNginx = Object.fromEntries(
  [...snippet.matchAll(/^add_header\s+(\S+)\s+"([^"]*)"\s+always;/gm)].map((m) => [m[1], m[2]]),
);

const SHARED = ['Content-Security-Policy', 'Permissions-Policy', 'Referrer-Policy', 'X-Frame-Options', 'X-Content-Type-Options'];
for (const name of SHARED) {
  if (!(name in fromVercel)) problems.push(`vercel.json does not set ${name}`);
  else if (!(name in fromNginx)) problems.push(`the nginx snippet does not set ${name}`);
  else if (fromVercel[name] !== fromNginx[name]) {
    problems.push(`${name} differs between vercel.json and the nginx snippet:\n      vercel: ${fromVercel[name]}\n      nginx : ${fromNginx[name]}`);
  }
}

/* ── the CSP still protects ────────────────────────────────────────── */
const csp = fromVercel['Content-Security-Policy'] || '';
for (const required of ["default-src 'self'", "object-src 'none'", "base-uri 'self'", 'frame-ancestors']) {
  if (!csp.includes(required)) problems.push(`CSP is missing ${required}`);
}
if (/'unsafe-eval'/.test(csp)) problems.push("CSP allows 'unsafe-eval'");
if (/(^|\s)\*(\s|;|$)/.test(csp) || /\*\./.test(csp)) problems.push('CSP contains a wildcard source');
if (/\shttp:(\s|;|$)/.test(csp) || /\shttp:\/\//.test(csp)) problems.push('CSP allows plain-http sources');
const scriptSrc = (csp.match(/script-src([^;]*)/) || [])[1] || '';
if (/'unsafe-inline'/.test(scriptSrc)) problems.push("CSP allows 'unsafe-inline' scripts");

/* ── security.txt ──────────────────────────────────────────────────── */
const txt = inspectSecurityTxt(await fs.readFile(path.join(ROOT, 'public', '.well-known', 'security.txt'), 'utf8'));
txt.problems.forEach((p) => problems.push(`security.txt: ${p}`));

if (problems.length) {
  console.error('\nSecurity check failed:\n');
  problems.forEach((p) => console.error(`  ✗ ${p}`));
  console.error('');
  process.exit(1);
}

console.log('✓ vercel.json and the nginx snippet agree on', SHARED.join(', '));
console.log('✓ CSP has the required directives and no unsafe-eval, wildcard or http: source');
console.log(`✓ security.txt is valid; expires ${txt.expires} (${txt.daysLeft} days)`);
if (txt.daysLeft !== null && txt.daysLeft < RENEW_WARNING_DAYS) {
  console.warn(`⚠ security.txt expires in ${txt.daysLeft} days - renew its Expires field.`);
}
