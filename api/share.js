// ─── Atithi V2 — Vercel Serverless Function for OG Preview ──────────────────
// This runs on Vercel's servers (not in the browser).
// When WhatsApp/iMessage crawls the share link, they hit this endpoint first.
// It returns personalised OG meta tags, then redirects real users to the app.

function decodePerson(str) {
  try {
    const padded = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad    = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
    const json   = Buffer.from(padded + pad, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function handler(req, res) {
  const { d, from } = req.query;

  // If no data param, just redirect to the app home
  if (!d) {
    res.redirect(302, '/');
    return;
  }

  const person     = decodePerson(d);
  const sharerName = from ? decodeURIComponent(from) : 'Someone';
  const appUrl     = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/?d=${d}`;

  // Build personalised preview strings
  const personName = person
    ? (person.pn ? `${person.n} & ${person.pn}` : person.n) || 'Someone'
    : 'Someone';

  const eventType = person?.et === 'Wedding Anniversary' ? 'anniversary' : 'birthday';
  const eventEmoji = person?.et === 'Wedding Anniversary' ? '💍' : '🎂';

  const title = sharerName
    ? `${sharerName} shared ${personName}'s ${eventType} with you ${eventEmoji}`
    : `${personName}'s ${eventType} was shared with you ${eventEmoji}`;

  const description = sharerName
    ? `${sharerName} uses Atithi to remember birthdays & anniversaries. Tap to add ${personName} to your own list and never forget!`
    : `Someone shared ${personName}'s ${eventType} via Atithi. Tap to add them to your list and never forget!`;

  const ogImage = `https://atithi-v2.vercel.app/og-image.svg`;
  const canonicalUrl = `https://atithi-v2.vercel.app/api/share?d=${d}${from ? `&from=${from}` : ''}`;

  // Return HTML with OG tags + instant JS redirect for real users
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>

  <!-- Open Graph (WhatsApp, Facebook, iMessage) -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="${canonicalUrl}" />
  <meta property="og:title"       content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image"       content="${ogImage}" />
  <meta property="og:site_name"   content="Atithi" />

  <!-- Twitter card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image"       content="${ogImage}" />

  <!-- Redirect real users to the app immediately -->
  <meta http-equiv="refresh" content="0; url=/?d=${d}" />
</head>
<body>
  <p style="font-family:sans-serif;text-align:center;margin-top:40px;color:#64748b;">
    Opening Atithi…
  </p>
  <script>window.location.replace('/?d=${d}');</script>
</body>
</html>`);
}
