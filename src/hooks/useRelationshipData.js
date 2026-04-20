// ─── Atithi V2 — Master Data Hook ────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { DEFAULT_REGION } from '../atithi.config';

const KEYS = {
  people:    'atithi_people',
  version:   'atithi_version',
  onboarded: 'atithi_onboarded',
  region:    'atithi_region',
  yourName:  'atithi_your_name',
  userEmail: 'atithi_user_email',
  userPhone: 'atithi_user_phone',
  status:    'atithi_gift_status',
  history:   'atithi_gift_history',
};
const CURRENT_VERSION = 1;

const SAMPLE = [
  { id: '1', eventType: 'Birthday',            name: 'Priya Sharma',  partnerName: '',     birthday: '1995-04-22', relationship: 'Friend',    country: 'India',         state: 'Maharashtra', city: 'Mumbai',    address1: '', address2: '', zip: '', notes: 'Loves travel and photography' },
  { id: '2', eventType: 'Birthday',            name: 'Rohan Mehta',   partnerName: '',     birthday: '1992-05-10', relationship: 'Colleague', country: 'United States', state: 'Washington',  city: 'Seattle',   address1: '', address2: '', zip: '', notes: 'Into gaming and coffee'       },
  { id: '3', eventType: 'Birthday',            name: 'Mom',           partnerName: '',     birthday: '1965-06-18', relationship: 'Family',    country: 'India',         state: 'Delhi',       city: 'New Delhi', address1: '', address2: '', zip: '', notes: 'Loves cooking and reading'    },
  { id: '4', eventType: 'Wedding Anniversary', name: 'Arjun',         partnerName: 'Neha', birthday: '2019-02-14', relationship: 'Friend',    country: 'India',         state: 'Karnataka',   city: 'Bengaluru', address1: '', address2: '', zip: '', notes: 'Love wine and travel'         },
];

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

export function useRelationshipData() {

  // ── People ──────────────────────────────────────────────────────────────────
  const [people, setPeople] = useState(() => {
    const version = parseInt(localStorage.getItem(KEYS.version) || '0');
    const stored  = localStorage.getItem(KEYS.people)
                 || localStorage.getItem('tithi_data');
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

  // ── Onboarding ──────────────────────────────────────────────────────────────
  // Require yourName to be set — so existing users who pre-date the profile
  // form are prompted to fill it in on their next visit.
  const [onboarded, setOnboarded] = useState(
    () => (localStorage.getItem(KEYS.onboarded) === 'true'
        || localStorage.getItem('tithi_onboarded') === 'true')
      && !!localStorage.getItem(KEYS.yourName)
  );
  function completeOnboarding(profile) {
    // profile: { name, email, phone, region }
    if (profile) {
      if (profile.name)   { localStorage.setItem(KEYS.yourName,  profile.name);   setYourNameState(profile.name); }
      if (profile.email)  { localStorage.setItem(KEYS.userEmail, profile.email);  setUserEmailState(profile.email); }
      if (profile.phone)  { localStorage.setItem(KEYS.userPhone, profile.phone);  setUserPhoneState(profile.phone); }
      if (profile.region) { localStorage.setItem(KEYS.region,    profile.region); setRegionState(profile.region); }
    }
    localStorage.setItem(KEYS.onboarded, 'true');
    setOnboarded(true);
  }

  // ── Region ──────────────────────────────────────────────────────────────────
  const [region, setRegionState] = useState(
    () => localStorage.getItem(KEYS.region) || DEFAULT_REGION
  );
  function setRegion(code) {
    localStorage.setItem(KEYS.region, code);
    setRegionState(code);
  }

  // ── User profile ────────────────────────────────────────────────────────────
  const [yourName, setYourNameState] = useState(
    () => localStorage.getItem(KEYS.yourName) || ''
  );
  function setYourName(name) {
    localStorage.setItem(KEYS.yourName, name);
    setYourNameState(name);
  }

  const [userEmail, setUserEmailState] = useState(
    () => localStorage.getItem(KEYS.userEmail) || ''
  );
  function setUserEmail(email) {
    localStorage.setItem(KEYS.userEmail, email);
    setUserEmailState(email);
  }

  const [userPhone, setUserPhoneState] = useState(
    () => localStorage.getItem(KEYS.userPhone) || ''
  );
  function setUserPhone(phone) {
    localStorage.setItem(KEYS.userPhone, phone);
    setUserPhoneState(phone);
  }

  // ── Gift Status ─────────────────────────────────────────────────────────────
  const [statusMap, setStatusMap] = useState(() => load(KEYS.status, {}));
  useEffect(() => { save(KEYS.status, statusMap); }, [statusMap]);

  function giftStatusKey(personId) {
    return `${personId}_${new Date().getFullYear()}`;
  }
  function getGiftStatus(personId) {
    return statusMap[giftStatusKey(personId)] || 'pending';
  }
  function cycleGiftStatus(personId) {
    const cycle   = { pending: 'ordered', ordered: 'gifted', gifted: 'pending' };
    const current = getGiftStatus(personId);
    const next    = cycle[current];
    setStatusMap(prev => ({ ...prev, [giftStatusKey(personId)]: next }));
    return next;
  }

  // ── Gift History ────────────────────────────────────────────────────────────
  const [history, setHistory] = useState(() => load(KEYS.history, []));
  useEffect(() => { save(KEYS.history, history); }, [history]);

  function addHistoryEntry(entry) {
    const record = { id: crypto.randomUUID(), date: new Date().toISOString(), year: new Date().getFullYear(), ...entry };
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
    people, addPerson, updatePerson, deletePerson,
    onboarded, completeOnboarding,
    region, setRegion,
    yourName, setYourName,
    userEmail, setUserEmail,
    userPhone, setUserPhone,
    getGiftStatus, cycleGiftStatus,
    history, addHistoryEntry, getLastGiftForPerson, getHistoryForPerson,
  };
}
