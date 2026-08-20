/* ══════════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH for the industry cards.

   Consumed by: the homepage Industries strip and the Industries page.
   Never hardcode an industry list anywhere else - import from here.

   g1 = deep navy base, g2 = accent bloom, gx = where the bloom sits.
   All drawn from the same navy→blue family as the Services cards
   (.rc-1 … .rc-6 in styles.css) so the two surfaces read as one system.

   `tag` uses \n as a deliberate line break in the card's kicker text.
   ══════════════════════════════════════════════════════════════════ */

export const INDUSTRIES = [
  { num: '01', name: 'Education',           tag: 'E-LEARNING &\nSTUDENT MANAGEMENT',     g1: '#060c1a', g2: '#1a4b8c', gx: '72% 28%' },
  { num: '02', name: 'BPO & Call Centers',  tag: 'WORKFORCE AUTOMATION\n& CALL ANALYTICS', g1: '#060e22', g2: '#2d6acf', gx: '65% 35%' },
  { num: '03', name: 'Hospitality',         tag: 'GUEST EXPERIENCE\n& PROPERTY MANAGEMENT', g1: '#04080f', g2: '#163f7c', gx: '68% 32%' },
  { num: '04', name: 'Legal & Financial',   tag: 'COMPLIANCE AUTOMATION\n& FINTECH SOLUTIONS', g1: '#05091c', g2: '#1d5fc4', gx: '55% 42%' },
  { num: '05', name: 'Retail & E-commerce', tag: 'OMNICHANNEL PLATFORM\n& CUSTOMER ANALYTICS', g1: '#050c1e', g2: '#1b53c8', gx: '62% 30%' },
  { num: '06', name: 'Manufacturing',       tag: 'SMART FACTORY\n& IoT INTEGRATION',      g1: '#050d1e', g2: '#2378b5', gx: '70% 25%' },
  { num: '07', name: 'IT & Technology',     tag: 'DEVOPS AUTOMATION\n& PRODUCT ENGINEERING', g1: '#060c1a', g2: '#2559a8', gx: '66% 34%' },
];

/* Style object for a card's gradient, so both surfaces bloom identically. */
export const industryCardStyle = (ind) => ({ '--g1': ind.g1, '--g2': ind.g2, '--gx': ind.gx });
