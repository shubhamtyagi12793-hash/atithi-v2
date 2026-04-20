// ─── Atithi V2 — Master Data Hook ────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { DEFAULT_REGION } from '../atithi.config';

// ── Storage keys ──────────────────────────────────────────────────────────────
const KEYS = {
  people:    'atithi_people',
  version:   'atithi_version',
  onboarded: 'atithi_onboarded',
  region:    'atithi_region',
  yourName:  'atithi_your_name',
  status:    'atithi_gift_status',   // JSON map: { [personId_year]: 'pending'|'ordered'|'gifted' }
  history:   'atithi_gift_history',  // JSON array of history entries
};
const CURRENT_VERSION = 1;

// ── Sample seed data ──────────────────────────────────────────────────────────
const SAMPLE = [
  { id: '1', eventType: 'Birthday',            name: 'Priya Sharma',  partnerName: '',     birthday: '1995-04-22', relationship: 'Friend',    country: 'India',         state: 'Maharashtra', city: 'Mumbai',    address1: '', address2: '', zip: '',      notes: 'Loves travel and photography' },
  { id: '2', eventType: 'Birthday',            name: 'Rohan Mehta',   partnerName: '',     birthday: '1992-05-10', relationship: 'Colleague', country: 'United States', state: 'Washington',  city: 'Seattle',   address1: '', address2: '', zip: '',      notes: 'Into gaming and coffee'       },
  { id: '3', eventType: 'Birthday',            name: 'Mom',           partnerName: '',     birthday: '1965-06-18', relationship: 'Family',    country: 'India',         state: 'Delhi',       city: 'New Delhi', address1: '', address2: '', zip: '',      notes: 'Loves cooking and reading'    },
  { id: '4', eventType: 'Wedding Anniversary', name: 'Arjun',         partnerName: 'Neha', birthday: '2019-02-14', relationship: 'Friend',    country: 'India',         state: 'Karnataka',   city: 'Bengaluru', address1: '', address2: '', zip: '',      notes: 'Love wine and travel'         },
];

// ── Migration: ensures all fields exist on older records ─────────────────────
function migrate(data) {
  return data.map(p => ({
    eventType: 'Birthday', partnerName: '', country: 'United States',
    state: '', city: '', address1: '', address2: '', zip: '', notes: '',
    ...p,
  }));
}

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useRelationshipData() {

  // ── People ─────────────────────────────────────────────────────────────────
  const [people, setPeople] = useState(() => {
    const version = parseInt(localStorage.getItem(KEYS.version) || '0');
    const stored  = localStorage.getItem(KEYS.people)
                 || localStorage.getItem('tithi_data'); // backward compat

    if (!stored) {
      save(KEYS.people,  SAMPLE);
      save(KEYS.version, CURRENT_VERSION);
      return SAMPLE;
    }
    const parsed = JSON.parse(stored);
    if (version < CURRENT_VERSION) {
      const migrated = migrate(parsed);
      save(KEYS.people,  migrated);
      save(KEYS.version, CURRENT_VERSION);
      return migrated;
    }
    return migrate(parsed);
  });

  useEffect(() => { save(KEYS.people, people); }, [people]);

  function addPerson(data) {
    const person = { ...data, id: crypto.randomUUID() };
    setPeople(prev => [...prev, person]);
    return person;
  }
  function updatePerson(id, fields) {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, ...fields } : p));
  }
  function deletePerson(id) {
    setPeople(prev => prev.filter(p => p.id !== id));
  }

  // ── Onboarding ─────────────────────────────────────────────────────────────
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem(KEYS.onboarded) === 'true'
       || localStorage.getItem('tithi_onboarded') === 'true'
  );
  function completeOnboarding() {
    localStorage.setItem(KEYS.onboarded, 'true');
    setOnboarded(true);
  }

  // ── Region (US / IN) ───────────────────────────────────────────────────────
  const [region, setRegionState] = useState(
    () => localStorage.getItem(KEYS.region) || DEFAULT_REGION
  );
  function setRegion(code) {
    localStorage.setItem(KEYS.region, code);
    setRegionState(code);
  }

  // ── Your Name (for share previews) ────────────────────────────────────────
  const [yourName, setYourNameState] = useState(
    () => localStorage.getItem(KEYS.yourName) || ''
  );
  function setYourName(name) {
    localStorage.setItem(KEYS.yourName, name);
    setYourNameState(name);
  }

  // ── Gift Status per person per year ────────────────────────────────────────
  // statusMap: { "personId_2025": "pending"|"ordered"|"gifted" }
  const [statusMap, setStatusMap] = useState(() => load(KEYS.status, {}));

  useEffect(() => { save(KEYS.status, statusMap); }, [statusMap]);

  function giftStatusKey(personId) {
    return `${personId}_${new Date().getFullYear()}`;
  }
  function getGiftStatus(personId) {
    return statusMap[giftStatusKey(personId)] || 'pending';
  }
  function cycleGiftStatus(personId) {
    const cycle = { pending: 'ordered', ordered: 'gifted', gifted: 'pending' };
    const current = getGiftStatus(personId);
    const next    = cycle[current];
    setStatusMap(prev => ({ ...prev, [giftStatusKey(personId)]: next }));
    return next;
  }

  // ── Gift History log ───────────────────────────────────────────────────────
  // Each entry: { id, personId, personName, giftName, giftQuery, date, year, eventType }
  const [history, setHistory] = useState(() => load(KEYS.history, []));

  useEffect(() => { save(KEYS.history, history); }, [history]);

  function addHistoryEntry(entry) {
    const record = {
      id:         crypto.randomUUID(),
      date:       new Date().toISOString(),
      year:       new Date().getFullYear(),
      ...entry,
    };
    setHistory(prev => [record, ...prev]);
    return record;
  }

  function getLastGiftForPerson(personId) {
    const year = new Date().getFullYear();
    return history.find(h => h.personId === personId && h.year === year - 1) || null;
  }

  function getHistoryForPerson(personId) {
    return history.filter(h => h.personId === personId);
  }

  return {
    // People CRUD
    people, addPerson, updatePerson, deletePerson,
    // Onboarding
    onboarded, completeOnboarding,
    // Region
    region, setRegion,
    // Your name
    yourName, setYourName,
    // Gift status
    getGiftStatus, cycleGiftStatus,
    // History
    history, addHistoryEntry, getLastGiftForPerson, getHistoryForPerson,
  };
}
