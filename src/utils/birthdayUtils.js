// ─── Ojas — Core Utilities ────────────────────────────────────────────────────

export const EVENT_TYPES = ['Birthday', 'Wedding Anniversary'];

export const EVENT_META = {
  'Birthday':           { emoji: '🎂', color: 'text-orange-500', label: 'Birthday'           },
  'Wedding Anniversary': { emoji: '💍', color: 'text-rose-500',   label: 'Anniversary'        },
};

/**
 * Display name for an event — handles single person vs couple.
 */
export function displayName(person) {
  if (person.eventType === 'Wedding Anniversary' && person.partnerName) {
    return `${person.name} & ${person.partnerName}`;
  }
  return person.name;
}

/**
 * Ordinal suffix: 1 → "1st", 2 → "2nd", 3 → "3rd", 4 → "4th" …
 */
export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * How many days until the next occurrence of this date?
 */
export function daysUntilBirthday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d    = new Date(dateStr + 'T00:00:00');
  const next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.round((next - today) / (1000 * 60 * 60 * 24));
}

/**
 * How many years will have passed on the next occurrence?
 * Works for both birthdays (age) and anniversaries (years together).
 */
export function turningAge(dateStr) {
  const today = new Date();
  const d     = new Date(dateStr + 'T00:00:00');
  let years   = today.getFullYear() - d.getFullYear();
  const next  = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (next < today) years += 1;
  return years;
}

/**
 * Human-friendly milestone label for a card.
 * Birthday  → "Turning 28"
 * Anniversary → "5th Anniversary"
 */
export function milestoneLabel(person) {
  const years = turningAge(person.birthday);
  if (person.eventType === 'Wedding Anniversary')
    return `Their love grows ${years} year${years === 1 ? '' : 's'} strong 💕`;
  return `Turning ${years}`;
}

/**
 * Sort events by who's coming up soonest.
 */
export function sortByUpcoming(events) {
  return [...events].sort(
    (a, b) => daysUntilBirthday(a.birthday) - daysUntilBirthday(b.birthday)
  );
}

/**
 * Human-friendly days label.
 */
export function daysLabel(days) {
  if (days === 0) return 'Today 🎉';
  if (days === 1) return 'Tomorrow';
  return `In ${days} days`;
}

/**
 * Urgency colors based on days remaining.
 */
export function urgencyColor(days) {
  if (days === 0) return { bg: 'bg-rose-50',   badge: 'bg-rose-100 text-rose-700'     };
  if (days <= 7)  return { bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-700' };
  if (days <= 30) return { bg: 'bg-amber-50',  badge: 'bg-amber-100 text-amber-700'   };
  return               { bg: 'bg-white',      badge: 'bg-slate-100 text-slate-500'   };
}

export const RELATIONSHIP_STYLES = {
  Friend:    'bg-violet-100 text-violet-700',
  Family:    'bg-pink-100 text-pink-700',
  Colleague: 'bg-sky-100 text-sky-700',
};

// ─── Country & Platform Config ────────────────────────────────────────────────

export const COUNTRY_CONFIG = {
  'United States': {
    flag: '🇺🇸',
    platforms: [
      { name: 'Amazon',  domain: 'amazon.com',  color: '#FF9900', bg: '#FFF8EE', buildUrl: q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`                           },
      { name: 'Target',  domain: 'target.com',  color: '#CC0000', bg: '#FFF0F0', buildUrl: q => `https://www.target.com/s?searchTerm=${encodeURIComponent(q)}`                  },
      { name: 'Etsy',    domain: 'etsy.com',    color: '#D5522A', bg: '#FFF3EE', buildUrl: q => `https://www.etsy.com/search?q=${encodeURIComponent(q)}`                        },
    ],
    urgentPlatforms: [],
  },
  'India': {
    flag: '🇮🇳',
    platforms: [
      { name: 'Amazon.in', domain: 'amazon.in',    color: '#FF9900', bg: '#FFF8EE', buildUrl: q => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`               },
      { name: 'Flipkart',  domain: 'flipkart.com', color: '#2874F0', bg: '#EEF4FF', buildUrl: q => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`        },
    ],
    urgentPlatforms: [
      { name: 'Blinkit', domain: 'blinkit.com', color: '#1B8A00', bg: '#F0FFF0', urgentBadge: '⚡ Same-day', buildUrl: q => `https://blinkit.com/s/?q=${encodeURIComponent(q)}` },
    ],
  },
  'United Kingdom': {
    flag: '🇬🇧',
    platforms: [
      { name: 'Amazon.co.uk', domain: 'amazon.co.uk',  color: '#FF9900', bg: '#FFF8EE', buildUrl: q => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}`                     },
      { name: 'John Lewis',   domain: 'johnlewis.com', color: '#2D5234', bg: '#F0F7F1', buildUrl: q => `https://www.johnlewis.com/search?search-term=${encodeURIComponent(q)}`      },
      { name: 'ASOS',         domain: 'asos.com',      color: '#1a1a1a', bg: '#F5F5F5', buildUrl: q => `https://www.asos.com/search/?q=${encodeURIComponent(q)}`                    },
    ],
    urgentPlatforms: [],
  },
  'Canada': {
    flag: '🇨🇦',
    platforms: [
      { name: 'Amazon.ca', domain: 'amazon.ca',   color: '#FF9900', bg: '#FFF8EE', buildUrl: q => `https://www.amazon.ca/s?k=${encodeURIComponent(q)}`                            },
      { name: 'Best Buy',  domain: 'bestbuy.ca',  color: '#0046BE', bg: '#EEF2FF', buildUrl: q => `https://www.bestbuy.ca/en-ca/search?query=${encodeURIComponent(q)}`            },
    ],
    urgentPlatforms: [],
  },
};

export const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_CONFIG);

export function getPlatforms(country, days) {
  const config = COUNTRY_CONFIG[country] || COUNTRY_CONFIG['United States'];
  return [...config.platforms, ...(days <= 3 ? config.urgentPlatforms : [])];
}

// ─── Gift Ideas Engine ────────────────────────────────────────────────────────

const BIRTHDAY_POOLS = {
  Friend: [
    { idea: 'Personalized Star Map of their birth date',   query: 'personalized star map custom night sky'       },
    { idea: 'Kindle Paperwhite e-reader',                  query: 'kindle paperwhite e-reader'                   },
    { idea: 'Specialty Coffee Subscription Box',           query: 'specialty coffee subscription gift box'        },
    { idea: 'Custom Illustrated Portrait',                 query: 'custom illustrated portrait gift'              },
    { idea: 'Premium Leather Journal',                     query: 'premium leather journal notebook'              },
    { idea: 'Wireless Noise-Cancelling Headphones',        query: 'wireless noise cancelling headphones gift'     },
    { idea: 'Board Game Night Set',                        query: 'popular board games set adults'                },
  ],
  Family: [
    { idea: 'Custom Family Photo Book',                    query: 'custom family photo book personalized'         },
    { idea: 'Spa & Relaxation Gift Basket',                query: 'luxury spa gift basket relaxation'             },
    { idea: 'Smart Home Device',                           query: 'smart home device gift'                        },
    { idea: 'Personalized Name Necklace',                  query: 'personalized name necklace jewelry gift'       },
    { idea: 'Premium Cookware Set',                        query: 'premium cookware set gift'                     },
    { idea: 'Engraved Wooden Keepsake Box',                query: 'engraved wooden keepsake box personalized'     },
  ],
  Colleague: [
    { idea: 'Premium Desk Organizer Set',                  query: 'premium desk organizer set office'             },
    { idea: 'Temperature Control Smart Mug',               query: 'temperature control smart mug coffee'          },
    { idea: 'Wireless Charging Pad',                       query: 'wireless charging pad fast charge'             },
    { idea: 'Moleskine Notebook + Pen Set',                query: 'moleskine notebook pen set gift'               },
    { idea: 'Gift Card',                                   query: 'gift card'                                     },
    { idea: 'Blue Light Blocking Glasses',                 query: 'blue light blocking glasses work computer'     },
  ],
};

const ANNIVERSARY_POOL = [
  { idea: 'Personalized Couple Portrait',                  query: 'personalized couple portrait illustration gift'     },
  { idea: 'Custom Star Map of Their Wedding Date',         query: 'custom star map wedding date night sky personalized' },
  { idea: 'Couple\'s Spa Experience Voucher',              query: 'couples spa experience gift voucher'                 },
  { idea: 'Premium Wine & Cheese Gift Set',                query: 'premium wine cheese gift set couple anniversary'     },
  { idea: 'Engraved Couple\'s Jewelry Set',                query: 'engraved couple jewelry set personalized'            },
  { idea: 'Photo Book of Their Journey Together',          query: 'custom photo book couple memories anniversary'       },
  { idea: 'Couple\'s Cooking Class Experience',            query: 'couples cooking class experience gift voucher'       },
  { idea: 'Weekend Getaway Experience Gift',               query: 'weekend getaway experience gift card couple'         },
  { idea: 'Personalized Anniversary Clock',                query: 'personalized anniversary clock engraved couple'      },
];

const INTEREST_OVERRIDES = [
  // Travel
  { keywords: ['travel', 'trip', 'adventure', 'backpack', 'explore'],
    idea: 'Scratch-Off World Travel Map',              query: 'scratch off world map travel poster'              },
  // Food & Cooking
  { keywords: ['cook', 'food', 'chef', 'bake', 'kitchen', 'foodie'],
    idea: 'Premium Cookbook Collection',               query: 'best premium cookbook collection gift'             },
  // Fitness & Gym
  { keywords: ['fitness', 'gym', 'workout', 'yoga', 'pilates', 'crossfit', 'run', 'running'],
    idea: 'Premium Fitness Accessories Set',           query: 'premium fitness accessories workout gift set'      },
  // Sports — football, cricket, basketball, tennis etc.
  { keywords: ['football', 'soccer', 'cricket', 'basketball', 'tennis', 'badminton', 'sport', 'sports', 'ipl', 'nfl', 'nba'],
    idea: 'Sports Fan Merchandise & Gear',             query: 'sports fan merchandise gift set jersey gear'       },
  // Reading & Books
  { keywords: ['read', 'book', 'novel', 'literature', 'library'],
    idea: 'Kindle Paperwhite + 1-yr Unlimited',        query: 'kindle paperwhite e-reader unlimited subscription' },
  // Music
  { keywords: ['music', 'guitar', 'piano', 'drums', 'sing', 'concert', 'playlist'],
    idea: 'Portable Bluetooth Speaker (JBL)',          query: 'JBL portable bluetooth speaker gift'               },
  // Gaming
  { keywords: ['game', 'gaming', 'playstation', 'xbox', 'nintendo', 'pc gaming', 'steam'],
    idea: 'Gaming Accessories Bundle',                 query: 'gaming accessories headset controller gift bundle' },
  // Wine & Drinks
  { keywords: ['wine', 'whiskey', 'beer', 'cocktail', 'drink', 'bar'],
    idea: 'Premium Wine & Charcuterie Gift Set',       query: 'premium wine charcuterie gift set'                 },
  // Photography
  { keywords: ['photo', 'camera', 'photography', 'instagram', 'portrait'],
    idea: 'Fujifilm Instax Instant Camera',            query: 'fujifilm instax instant camera gift'               },
  // Tech & Gadgets
  { keywords: ['tech', 'gadget', 'coding', 'programming', 'developer', 'software', 'ai', 'engineering'],
    idea: 'Smart Gadget Gift Set',                     query: 'smart gadget tech gift set earbuds smartwatch'    },
  // Art & Creativity
  { keywords: ['art', 'paint', 'draw', 'sketch', 'design', 'creative', 'craft'],
    idea: 'Premium Art Supplies Set',                  query: 'premium art supplies set drawing painting gift'    },
  // Movies & Entertainment
  { keywords: ['movie', 'film', 'cinema', 'netflix', 'series', 'bollywood', 'hollywood'],
    idea: 'Streaming Gift Card + Popcorn Kit',         query: 'streaming gift card popcorn movie night gift set'  },
  // Fashion & Style
  { keywords: ['fashion', 'style', 'clothes', 'shopping', 'shoes', 'accessories'],
    idea: 'Fashion Gift Card (Trendy Picks)',           query: 'fashion gift card clothing accessories gift'       },
  // Cycling & Outdoors
  { keywords: ['cycle', 'cycling', 'bike', 'hiking', 'trek', 'outdoors', 'camping', 'nature'],
    idea: 'Outdoor Adventure Gear Kit',                query: 'outdoor adventure hiking camping gear gift kit'    },
  // Meditation & Wellness
  { keywords: ['meditation', 'mindful', 'wellness', 'spa', 'relax', 'self-care'],
    idea: 'Premium Wellness & Spa Gift Set',           query: 'premium wellness spa self care gift set'           },
  // Pets
  { keywords: ['dog', 'cat', 'pet', 'puppy', 'kitten', 'animal'],
    idea: 'Luxury Pet Accessories Gift Box',           query: 'luxury pet accessories gift box dog cat'           },
];

export function generateGiftIdeas(person) {
  const notes = (person.notes || '').toLowerCase();

  // Couple gift pool for anniversaries
  if (person.eventType === 'Wedding Anniversary') {
    const overrides = INTEREST_OVERRIDES.filter(o => o.keywords.some(k => notes.includes(k)));
    const combined  = [...overrides, ...ANNIVERSARY_POOL];
    const seen = new Set(); const result = [];
    for (const item of combined) {
      if (!seen.has(item.idea)) { seen.add(item.idea); result.push(item); }
      if (result.length === 3) break;
    }
    return result;
  }

  // Individual birthday pool
  const rel      = person.relationship;
  const base     = BIRTHDAY_POOLS[rel] || BIRTHDAY_POOLS['Friend'];
  const overrides = INTEREST_OVERRIDES.filter(o => o.keywords.some(k => notes.includes(k)));
  const combined  = [...overrides, ...base];
  const seen = new Set(); const result = [];
  for (const item of combined) {
    if (!seen.has(item.idea)) { seen.add(item.idea); result.push(item); }
    if (result.length === 3) break;
  }
  return result;
}
