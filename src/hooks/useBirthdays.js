import { useState, useEffect } from 'react';

const STORAGE_KEY  = 'tithi_data';
const VERSION_KEY  = 'tithi_version';
const ONBOARDED_KEY = 'tithi_onboarded';
const CURRENT_VERSION = 4;

const SAMPLE_DATA = [
  { id: '1', eventType: 'Birthday',           name: 'Priya Sharma',  partnerName: '',      birthday: '1995-04-22', relationship: 'Friend', country: 'India',         city: 'Mumbai',  notes: 'Loves travel and photography' },
  { id: '2', eventType: 'Birthday',           name: 'Rohan Mehta',   partnerName: '',      birthday: '1992-05-10', relationship: 'Colleague', country: 'United States', city: 'Seattle', notes: 'Into gaming and coffee'       },
  { id: '3', eventType: 'Birthday',           name: 'Mom',           partnerName: '',      birthday: '1965-06-18', relationship: 'Family', country: 'India',         city: 'Delhi',   notes: 'Loves cooking and reading'    },
  { id: '4', eventType: 'Wedding Anniversary', name: 'Arjun',        partnerName: 'Neha',  birthday: '2019-02-14', relationship: 'Friend', country: 'India',         city: 'Bengaluru', notes: 'Love wine and travel'        },
];

function migrate(data, fromVersion) {
  return data.map(p => ({
    eventType:   'Birthday',
    partnerName: '',
    country:     'United States',
    city:        '',
    address1:    '',
    address2:    '',
    state:       '',
    zip:         '',
    notes:       '',
    ...p,
  }));
}

export function useBirthdays() {
  const [birthdays, setBirthdays] = useState(() => {
    try {
      const version = parseInt(localStorage.getItem(VERSION_KEY) || '0');
      const stored  = localStorage.getItem(STORAGE_KEY)
                   // also check old key from earlier versions
                   || localStorage.getItem('birthday_app_data');

      if (!stored) {
        localStorage.setItem(STORAGE_KEY,  JSON.stringify(SAMPLE_DATA));
        localStorage.setItem(VERSION_KEY,  String(CURRENT_VERSION));
        return SAMPLE_DATA;
      }

      const parsed = JSON.parse(stored);
      if (version < CURRENT_VERSION) {
        const migrated = migrate(parsed, version);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
        return migrated;
      }
      return parsed;
    } catch {
      return SAMPLE_DATA;
    }
  });

  // Track whether onboarding has been completed
  const [onboarded, setOnboarded] = useState(() => {
    return localStorage.getItem(ONBOARDED_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(birthdays));
  }, [birthdays]);

  function completeOnboarding() {
    localStorage.setItem(ONBOARDED_KEY, 'true');
    setOnboarded(true);
  }

  function addBirthday(person) {
    setBirthdays(prev => [...prev, { ...person, id: crypto.randomUUID() }]);
  }

  function editBirthday(id, fields) {
    setBirthdays(prev => prev.map(p => (p.id === id ? { ...p, ...fields } : p)));
  }

  function deleteBirthday(id) {
    setBirthdays(prev => prev.filter(p => p.id !== id));
  }

  return { birthdays, addBirthday, editBirthday, deleteBirthday, onboarded, completeOnboarding };
}
