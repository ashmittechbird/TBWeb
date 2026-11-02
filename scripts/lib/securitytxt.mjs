/* Reads a security.txt (RFC 9116) and reports what is wrong with it.

   RFC 9116 requires an Expires field, and says it should be less than a year
   ahead. Anyone relying on the file treats an expired one as stale or
   untrustworthy, so the date has to be renewed - which nobody remembers to do
   unless something reminds them. The build and `npm run check:security` do. */

const DAY = 24 * 60 * 60 * 1000;

export function inspectSecurityTxt(text, now = Date.now()) {
  const field = (name) => (text.match(new RegExp(`^${name}:\\s*(.+)$`, 'mi')) || [])[1]?.trim();
  const problems = [];

  const contact = field('Contact');
  const expiresRaw = field('Expires');

  if (!contact) problems.push('no Contact field');
  else if (!/^(mailto:|https:\/\/|tel:)/i.test(contact)) problems.push(`Contact must be a URI (mailto:, https: or tel:), got "${contact}"`);

  let daysLeft = null;
  if (!expiresRaw) {
    problems.push('no Expires field (RFC 9116 requires one)');
  } else {
    const expires = Date.parse(expiresRaw);
    if (Number.isNaN(expires)) problems.push(`Expires is not a valid date: "${expiresRaw}"`);
    else {
      daysLeft = Math.floor((expires - now) / DAY);
      if (daysLeft < 0) problems.push(`Expires passed ${-daysLeft} day(s) ago`);
      else if (daysLeft > 366) problems.push(`Expires is ${daysLeft} days away; RFC 9116 says less than a year`);
    }
  }

  return { contact, expires: expiresRaw, daysLeft, problems };
}

/* Warn this many days before it lapses. */
export const RENEW_WARNING_DAYS = 60;
