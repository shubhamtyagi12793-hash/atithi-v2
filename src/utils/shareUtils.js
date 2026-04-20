// ─── Atithi V2 — Viral Sharing via Base64URL ─────────────────────────────────

/**
 * Encode a person object into a URL-safe Base64 string.
 * Only the fields a recipient needs are serialized (no internal IDs).
 */
export function encodePerson(person) {
  // Only encode the essentials — keeps URLs short and privacy-friendly.
  // Address/notes stay on the sharer's device; recipient fills those in themselves.
  const payload = {};
  if (person.name)        payload.n  = person.name;
  if (person.partnerName) payload.pn = person.partnerName;
  if (person.birthday)    payload.b  = person.birthday;
  if (person.eventType && person.eventType !== 'Birthday') payload.et = person.eventType;
  if (person.relationship && person.relationship !== 'Friend') payload.r = person.relationship;

  const json = JSON.stringify(payload);
  const b64  = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Decode a Base64URL string back into a person-shaped object.
 * Returns null if the string is invalid.
 */
export function decodePerson(str) {
  try {
    // Restore standard Base64 padding
    const padded  = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad     = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
    const json    = decodeURIComponent(escape(atob(padded + pad)));
    const p       = JSON.parse(json);
    return {
      name:         p.n  || '',
      partnerName:  p.pn || '',
      birthday:     p.b  || '',
      eventType:    p.et || 'Birthday',
      relationship: p.r  || 'Friend',
      country:      p.c  || '',
      state:        p.st || '',
      city:         p.ci || '',
      address1:     p.a1 || '',
      address2:     p.a2 || '',
      zip:          p.z  || '',
      notes:        p.no || '',
    };
  } catch {
    return null;
  }
}

/**
 * Build the full share URL for a person.
 * Routes through /api/share so Vercel can serve personalised OG tags to crawlers.
 * sharerName is optional — shown in the WhatsApp preview ("Shubham shared…").
 */
export function buildShareUrl(person, sharerName = '') {
  const encoded = encodePerson(person);
  const base    = `${window.location.origin}/api/share?d=${encoded}`;
  return sharerName ? `${base}&from=${encodeURIComponent(sharerName)}` : base;
}

/**
 * Trigger the native mobile share sheet (WhatsApp, iMessage, etc.)
 * Falls back to clipboard copy if Web Share API isn't available.
 */
export async function sharePersonNative(person, sharerName = '') {
  const url      = buildShareUrl(person, sharerName);
  const name     = person.eventType === 'Wedding Anniversary' && person.partnerName
    ? `${person.name} & ${person.partnerName}`
    : person.name;
  const event    = person.eventType === 'Wedding Anniversary' ? 'anniversary' : 'birthday';
  const from     = sharerName || 'Someone';
  const text     = `${from} wants you to remember ${name}'s ${event} — tap to add them on Atithi! 🎂`;

  if (navigator.share) {
    await navigator.share({ title: 'Atithi — Remember Every Moment', text, url });
    return 'shared';
  }
  await navigator.clipboard.writeText(`${text}\n${url}`);
  return 'copied';
}

/**
 * Read the ?d= parameter from the current URL.
 * Returns a decoded person object or null.
 */
export function readDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const d = params.get('d');
  if (!d) return null;
  return decodePerson(d);
}

/**
 * Strip the ?d= param from the URL without a page reload.
 */
export function clearDeepLink() {
  const url = new URL(window.location.href);
  url.searchParams.delete('d');
  window.history.replaceState({}, '', url.toString());
}
