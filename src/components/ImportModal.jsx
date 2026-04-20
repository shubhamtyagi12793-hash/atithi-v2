// ─── Atithi V2 — Deep Link Import Modal ──────────────────────────────────────
import { CalendarDays, MapPin, Heart, UserPlus, X } from 'lucide-react';
import { EVENT_META } from '../utils/birthdayUtils';

export default function ImportModal({ person, onImport, onDismiss }) {
  if (!person) return null;

  const meta      = EVENT_META[person.eventType] || EVENT_META['Birthday'];
  const hasAddr   = person.address1 || person.city;
  const birthDate = person.birthday
    ? new Date(person.birthday + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '—';
  const displayName = person.eventType === 'Wedding Anniversary' && person.partnerName
    ? `${person.name} & ${person.partnerName}`
    : person.name;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-in">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-1">
                🔗 Someone shared a contact with you
              </p>
              <h2 className="text-lg font-bold text-slate-800">
                {meta.emoji} {displayName}
              </h2>
            </div>
            <button onClick={onDismiss} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays size={15} className="text-slate-400 flex-shrink-0" />
            <span>
              <span className="font-medium">{person.eventType}</span> — {birthDate}
            </span>
          </div>

          {person.relationship && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Heart size={15} className="text-slate-400 flex-shrink-0" />
              <span>{person.relationship}</span>
            </div>
          )}

          {hasAddr && (
            <div className="flex items-start gap-2 text-sm text-slate-600">
              <MapPin size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {[person.address1, person.address2, person.city, person.state, person.zip, person.country]
                  .filter(Boolean).join(', ')}
              </span>
            </div>
          )}

          {person.notes && (
            <div className="rounded-xl bg-orange-50 px-3 py-2 text-xs text-orange-800">
              🎯 Interests: {person.notes}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onDismiss}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={() => onImport(person)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            <UserPlus size={15} /> Add to My List
          </button>
        </div>
      </div>
    </div>
  );
}
