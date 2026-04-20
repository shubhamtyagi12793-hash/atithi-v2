// ─── Atithi V2 — Viral Sharing via Base64URL ─────────────────────────────────

/**
 * Encode a person object into a URL-safe Base64 string.
 * Only the fields a recipient needs are serialized (no internal IDs).
 */
export function encodePerson(person) {
  const payload = {
    n:  person.name         || '',   // name
    pn: person.partnerName  || '',   // partnerName
    b:  person.birthday     || '',   // birthday
    et: person.eventType    || 'Birthday',
    r:  person.relationship || 'Friend',
    c:  person.country      || '',
    st: person.state        || '',
    ci: person.city         || '',
    a1: person.address1     || '',
    a2: person.address2     || '',
    z:  person.zip          || '',
    no: person.notes        || '',
  };
  const json    = JSON.stringify(payload);
  const b64     = btoa(unescape(encodeURIComponent(json)));
  // Make URL-safe: replace + / = with - _ (no padding)
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
  const url  = buildShareUrl(person, sharerName);
  const name = person.eventType === 'Wedding Anniversary' && person.partnerName
    ? `${person.name} & ${person.partnerName}`
    : person.name;
  const from = sharerName ? `${sharerName} ` : '';
  const text = `🎂 ${from}wants you to remember ${name}'s ${person.eventType === 'Wedding Anniversary' ? 'anniversary' : 'birthday'} on Atithi!`;

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
