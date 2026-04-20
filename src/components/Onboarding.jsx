// ─── Atithi V2 — Onboarding (Region first, then add people) ──────────────────
import { useState } from 'react';
import { Plus, ChevronRight, Sparkles } from 'lucide-react';
import AddBirthdayForm from './AddBirthdayForm';
import { REGIONS } from '../atithi.config';

const PROMPT_PEOPLE = [
  { label: 'Mom or Dad',        hint: 'Family · India or US'   },
  { label: 'Best Friend',       hint: 'Friend · Your city'      },
  { label: 'Partner / Spouse',  hint: 'Family · Your city'      },
  { label: 'Close Sibling',     hint: 'Family'                  },
  { label: 'A couple you love', hint: 'Wedding Anniversary'     },
];

export default function Onboarding({ onAdd, onComplete, onRegionChange, region }) {
  const [step,       setStep]       = useState(1); // 1 = region, 2 = add people
  const [showForm,   setShowForm]   = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  function handleSave(formData) {
    onAdd(formData);
    setAddedCount(c => c + 1);
    setShowForm(false);
  }

  // ── Step 1: Region ────────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome to Atithi</h1>
          <p className="text-slate-500 mt-1 text-sm">Never miss a birthday or anniversary again.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-slate-100">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Where are you based?</h2>
          <p className="text-xs text-slate-400 mb-5">
            This sets your default marketplace and currency. You can change it later in Settings.
          </p>

          <div className="flex gap-3 mb-5">
            {Object.values(REGIONS).map(r => {
              const isActive = region === r.code;
              return (
                <button key={r.code} onClick={() => onRegionChange(r.code)}
                  className={`flex-1 flex flex-col items-center gap-2 py-5 rounded-xl border-2 transition-all ${
                    isActive ? 'border-orange-400 bg-orange-50 shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                  }`}>
                  <span className="text-4xl">{r.flag}</span>
                  <span className={`text-xs font-bold ${isActive ? 'text-orange-700' : 'text-slate-600'}`}>
                    {r.label}
                  </span>
                  <span className="text-[10px] text-slate-400">{r.symbol} {r.currency}</span>
                </button>
              );
            })}
          </div>

          <button onClick={() => setStep(2)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
            Continue <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: Add People ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
          <span className="text-3xl">✨</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Add your people</h1>
        <p className="text-slate-500 mt-1 text-sm">Start with 3–5. You can always add more later.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-slate-800">Your most important people</h2>
          {addedCount > 0 && (
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              {addedCount} added ✓
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mb-5">Tap a suggestion or add someone custom below.</p>

        <div className="space-y-2 mb-5">
          {PROMPT_PEOPLE.map((p, i) => (
            <div key={i} onClick={() => setShowForm(true)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 transition-colors cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-slate-700 group-hover:text-orange-700">{p.label}</p>
                <p className="text-xs text-slate-400">{p.hint}</p>
              </div>
              <Plus size={16} className="text-slate-300 group-hover:text-orange-400 flex-shrink-0" />
            </div>
          ))}
        </div>

        <button onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-sm font-medium text-slate-500 hover:border-orange-300 hover:text-orange-600 transition-colors mb-4">
          <Plus size={16} /> Add someone else
        </button>

        <button onClick={onComplete} disabled={addedCount === 0}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {addedCount === 0 ? 'Add at least one person to continue' : (
            <><Sparkles size={15} /> Go to my dashboard <ChevronRight size={15} /></>
          )}
        </button>

        {addedCount === 0 && (
          <button onClick={onComplete} className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-3 transition-colors">
            Skip for now →
          </button>
        )}
      </div>

      {showForm && (
        <AddBirthdayForm onSave={handleSave} onClose={() => setShowForm(false)} editData={null} />
      )}
    </div>
  );
}
