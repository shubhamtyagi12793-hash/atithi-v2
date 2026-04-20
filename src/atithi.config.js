// ─── Atithi V2 — Central Configuration ───────────────────────────────────────

export const REGIONS = {
  US: {
    code:         'US',
    flag:         '🇺🇸',
    label:        'United States',
    currency:     'USD',
    symbol:       '$',
    giftAmounts:  [25, 50, 100, 200],
    platforms: {
      primary: [
        { name: 'Amazon',  domain: 'amazon.com',  color: '#FF9900', bg: '#FFF8EE',
          buildUrl:      q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`,
          giftCardUrl:   amt => `https://www.amazon.com/s?k=amazon+gift+card+${amt}+dollars` },
        { name: 'Target',  domain: 'target.com',  color: '#CC0000', bg: '#FFF0F0',
          buildUrl:      q => `https://www.target.com/s?searchTerm=${encodeURIComponent(q)}` },
        { name: 'Etsy',    domain: 'etsy.com',    color: '#D5522A', bg: '#FFF3EE',
          buildUrl:      q => `https://www.etsy.com/search?q=${encodeURIComponent(q)}` },
      ],
      urgent: [],
    },
  },
  IN: {
    code:         'IN',
    flag:         '🇮🇳',
    label:        'India',
    currency:     'INR',
    symbol:       '₹',
    giftAmounts:  [500, 1000, 2000, 5000],
    platforms: {
      primary: [
        { name: 'Amazon.in', domain: 'amazon.in',    color: '#FF9900', bg: '#FFF8EE',
          buildUrl:      q => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`,
          giftCardUrl:   amt => `https://www.amazon.in/s?k=amazon+gift+card+${amt}` },
        { name: 'Flipkart',  domain: 'flipkart.com', color: '#2874F0', bg: '#EEF4FF',
          buildUrl:      q => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}` },
      ],
      urgent: [
        { name: 'Blinkit', domain: 'blinkit.com', color: '#1B8A00', bg: '#F0FFF0',
          urgentBadge: '⚡ Same-day',
          buildUrl:    q => `https://blinkit.com/s/?q=${encodeURIComponent(q)}` },
      ],
    },
  },
};

export const DEFAULT_REGION = 'US';

export function getRegion(code) {
  return REGIONS[code] || REGIONS[DEFAULT_REGION];
}

export function getPlatformsForRegion(regionCode, daysUntil) {
  const r = getRegion(regionCode);
  return [
    ...r.platforms.primary,
    ...(daysUntil <= 3 ? r.platforms.urgent : []),
  ];
}
