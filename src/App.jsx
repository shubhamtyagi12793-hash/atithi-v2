// ─── Atithi V2 — App Shell ────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Plus, Bell, Search, Sparkles } from 'lucide-react';
import { useRelationshipData } from './hooks/useRelationshipData';
import {
  sortByUpcoming, daysUntilBirthday,
  daysLabel, displayName, milestoneLabel, EVENT_META,
} from './utils/birthdayUtils';
import { readDeepLink, clearDeepLink } from './utils/shareUtils';

import BirthdayCard    from './components/BirthdayCard';
import AddBirthdayForm from './components/AddBirthdayForm';
import Onboarding      from './components/Onboarding';
import ImportModal     from './components/ImportModal';
import BottomNav       from './components/BottomNav';
import HistoryTab      from './components/HistoryTab';
import SettingsTab     from './components/SettingsTab';

const FILTER_OPTIONS = ['All', 'Birthday', 'Wedding Anniversary'];

export default function App() {
  const {
    people, addPerson, updatePerson, deletePerson,
    onboarded, completeOnboarding,
    region, setRegion,
    getGiftStatus, cycleGiftStatus,
    history, addHistoryEntry, getLastGiftForPerson,
  } = useRelationshipData();

  const [activeTab,    setActiveTab]    = useState('home');
  const [showForm,     setShowForm]     = useState(false);
  const [editData,     setEditData]     = useState(null);
  const [search,       setSearch]       = useState('');
  const [filter,       setFilter]       = useState('All');
  const [deleteId,     setDeleteId]     = useState(null);
  const [importPerson, setImportPerson] = useState(null);

  // ── Deep Link listener ────────────────────────────────────────────────────
  useEffect(() => {
    const person = readDeepLink();
    if (person) {
      setImportPerson(person);
      clearDeepLink();
    }
  }, []);

  // ── Status cycle → auto-log to history when Gifted ───────────────────────
  function handleCycleStatus(person) {
    const next = cycleGiftStatus(person.id);
    if (next === 'gifted') {
      addHistoryEntry({
        personId:   person.id,
        personName: displayName(person),
        giftName:   'Gift marked ✓',
        giftQuery:  person.notes || person.name,
        eventType:  person.eventType,
      });
    }
  }

  // ── Onboarding ────────────────────────────────────────────────────────────
  if (!onboarded) {
    return (
      <>
        <Onboarding
          onAdd={addPerson}
          onComplete={completeOnboarding}
          onRegionChange={setRegion}
          region={region}
        />
        {importPerson && (
          <ImportModal
            person={importPerson}
            onImport={p => { addPerson(p); setImportPerson(null); }}
            onDismiss={() => setImportPerson(null)}
          />
        )}
      </>
    );
  }

  // ── Dashboard data ────────────────────────────────────────────────────────
  const sorted   = sortByUpcoming(people);
  const filtered = sorted.filter(p => {
    const matchSearch = displayName(p).toLowerCase().includes(search.toLowerCase()) ||
                        p.relationship.toLowerCase().includes(search.toLowerCase()) ||
                        (p.eventType || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.eventType === filter;
    return matchSearch && matchFilter;
  });

  const next     = sorted[0];
  const nextDays = next ? daysUntilBirthday(next.birthday) : null;
  const nextMeta = next ? EVENT_META[next.eventType] || EVENT_META['Birthday'] : null;

  function handleSave(formData) {
    if (editData) updatePerson(editData.id, formData);
    else addPerson(formData);
    setShowForm(false);
    setEditData(null);
  }

  function handleClearData() {
    if (window.confirm('Clear ALL Atithi data? This cannot be undone.')) {
      Object.keys(localStorage)
        .filter(k => k.startsWith('atithi_') || k.startsWith('tithi_'))
        .forEach(k => localStorage.removeItem(k));
      window.location.reload();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Deep Link Import Modal */}
      {importPerson && (
        <ImportModal
          person={importPerson}
          onImport={p => { addPerson(p); setImportPerson(null); }}
          onDismiss={() => setImportPerson(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shadow-sm">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-800 text-base tracking-tight">Atithi</span>
              <span className="text-slate-400 text-xs ml-1.5 hidden sm:inline">Remember Every Moment</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('settings')}
              className="text-xs font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full hover:bg-slate-200 transition-colors">
              {region === 'IN' ? '🇮🇳 ₹' : '🇺🇸 $'}
            </button>
            <button onClick={() => { setEditData(null); setShowForm(true); }}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm">
              <Plus size={16} /> Add
            </button>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <main className="max-w-2xl mx-auto pb-24">

        {activeTab === 'home' && (
          <div className="px-4 py-6 space-y-5">

            {/* Next event banner */}
            {next && (
              <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl px-5 py-4 text-white shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-1">🔔 Next Reminder</p>
                    <p className="text-lg font-bold leading-tight">
                      {displayName(next)}'s {nextDays === 0
                        ? `${nextMeta.emoji} is today!`
                        : `${nextMeta.emoji} in ${nextDays} day${nextDays === 1 ? '' : 's'}`}
                    </p>
                    <p className="text-sm opacity-80 mt-0.5">
                      {milestoneLabel(next)} ·{' '}
                      {nextDays === 0 ? 'Today is the day! 🎉'
                       : nextDays <= 3 ? 'Order a gift now — time is short! 🎁'
                       : nextDays <= 7 ? 'Start thinking about a gift 🛍️'
                       : 'Mark your calendar 📅'}
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-2.5 flex-shrink-0"><Bell size={22} /></div>
                </div>
              </div>
            )}

            {/* Search + filter */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search by name, type, or relationship…"
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {FILTER_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => setFilter(opt)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      filter === opt ? 'bg-orange-500 text-white'
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-orange-300 hover:text-orange-600'
                    }`}>
                    {opt === 'Birthday' ? '🎂 ' : opt === 'Wedding Anniversary' ? '💍 ' : ''}{opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Event list */}
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Upcoming · {filtered.length}
              </p>
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <span className="text-4xl block mb-3 opacity-40">✨</span>
                  <p className="font-medium">{search || filter !== 'All' ? 'No results found.' : 'Nothing here yet.'}</p>
                  {!search && filter === 'All' && (
                    <p className="text-sm mt-1">Hit <strong>Add</strong> to save your first event!</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map(person => (
                    <BirthdayCard
                      key={person.id}
                      person={person}
                      onEdit={p => { setEditData(p); setShowForm(true); }}
                      onDelete={setDeleteId}
                      region={region}
                      giftStatus={getGiftStatus(person.id)}
                      onCycleStatus={() => handleCycleStatus(person)}
                      lastGift={getLastGiftForPerson(person.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'history' && <HistoryTab history={history} region={region} />}

        {activeTab === 'settings' && (
          <SettingsTab region={region} onRegionChange={setRegion} onClearData={handleClearData} />
        )}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      {showForm && (
        <AddBirthdayForm
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditData(null); }}
          editData={editData}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗑️</span>
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1">Remove this event?</h3>
            <p className="text-sm text-slate-500 mb-5">This can't be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => { deletePerson(deleteId); setDeleteId(null); }}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
