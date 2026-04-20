import { useState } from 'react';
import { Plus, ChevronRight, Sparkles, X } from 'lucide-react';
import AddBirthdayForm from './AddBirthdayForm';

const PROMPT_PEOPLE = [
  { label: 'Mom or Dad',        hint: 'Family · India or US'   },
  { label: 'Best Friend',       hint: 'Friend · Your city'      },
  { label: 'Partner / Spouse',  hint: 'Family · Your city'      },
  { label: 'Close Sibling',     hint: 'Family'                  },
  { label: 'A couple you love', hint: 'Wedding Anniversary'     },
];

export default function Onboarding({ onAdd, onComplete }) {
  const [showForm, setShowForm]       = useState(false);
  const [addedCount, setAddedCount]   = useState(0);

  function handleSave(formData) {
    onAdd(formData);
    setAddedCount(c => c + 1);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="mb-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
          <span className="text-3xl">✨</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome to Tithi</h1>
        <p className="text-slate-500 mt-1 text-sm">Never miss a birthday or anniversary again.</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-slate-800">Add your most important people</h2>
          {addedCount > 0 && (
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              {addedCount} added ✓
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mb-5">Start with 3–5 people. You can always add more later.</p>

        {/* Suggestion chips */}
        <div className="space-y-2 mb-5">
          {PROMPT_PEOPLE.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 transition-colors cursor-pointer group"
                 onClick={() => setShowForm(true)}>
              <div>
                <p className="text-sm font-medium text-slate-700 group-hover:text-orange-700">{p.label}</p>
                <p className="text-xs text-slate-400">{p.hint}</p>
              </div>
              <Plus size={16} className="text-slate-300 group-hover:text-orange-400 flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Add custom */}
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-sm font-medium text-slate-500 hover:border-orange-300 hover:text-orange-600 transition-colors mb-4"
        >
          <Plus size={16} /> Add someone else
        </button>

        {/* Done button */}
        <button
          onClick={onComplete}
          disabled={addedCount === 0}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {addedCount === 0 ? 'Add at least one person to continue' : (
            <><Sparkles size={15} /> Go to my dashboard <ChevronRight size={15} /></>
          )}
        </button>

        {/* Skip */}
        {addedCount === 0 && (
          <button onClick={onComplete} className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-3 transition-colors">
            Skip for now →
          </button>
        )}
      </div>

      {showForm && (
        <AddBirthdayForm
          onSave={handleSave}
          onClose={() => setShowForm(false)}
          editData={null}
        />
      )}
    </div>
  );
}
