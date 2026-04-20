import { useState } from 'react';
import { Pencil, Trash2, Gift, Calendar, MapPin, Copy, Check } from 'lucide-react';
import {
  daysUntilBirthday, daysLabel, urgencyColor,
  RELATIONSHIP_STYLES, COUNTRY_CONFIG,
  displayName, milestoneLabel, EVENT_META,
} from '../utils/birthdayUtils';
import GiftSuggestions from './GiftSuggestions';

function formatAddress(person) {
  return [person.address1, person.address2, person.city, person.state, person.zip, person.country]
    .filter(Boolean).join(', ');
}

export default function BirthdayCard({ person, onEdit, onDelete }) {
  const [showGifts, setShowGifts]   = useState(false);
  const [copied,    setCopied]      = useState(false);

  function handleCopyAddress() {
    const addr = formatAddress(person);
    navigator.clipboard.writeText(addr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const days      = daysUntilBirthday(person.birthday);
  const colors    = urgencyColor(days);
  const relStyle  = RELATIONSHIP_STYLES[person.relationship] || 'bg-slate-100 text-slate-600';
  const flag      = COUNTRY_CONFIG[person.country]?.flag || '';
  const meta      = EVENT_META[person.eventType] || EVENT_META['Birthday'];
  const name      = displayName(person);
  const milestone = milestoneLabel(person);

  // Avatar: for anniversaries show both initials; for birthdays show first initial
  const avatarText = person.eventType === 'Wedding Anniversary' && person.partnerName
    ? `${person.name.charAt(0)}${person.partnerName.charAt(0)}`
    : person.name.charAt(0).toUpperCase();

  return (
    <div className={`rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden ${colors.bg}`}>

      <div className="flex items-center gap-4 px-5 py-4">

        {/* Avatar */}
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 select-none
          ${person.eventType === 'Wedding Anniversary'
            ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-sm'
            : 'bg-gradient-to-br from-orange-400 to-rose-400 text-lg'}`}>
          {avatarText}
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base">{meta.emoji}</span>
            <span className="font-semibold text-slate-800 text-base truncate">{name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${relStyle}`}>
              {person.relationship}
            </span>
            {flag && <span className="text-base" title={person.country}>{flag}</span>}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-sm text-slate-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {new Date(person.birthday + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span>·</span>
            <span>{milestone}</span>
            {(person.city || person.country) && (
              <>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <MapPin size={11} />
                  {[person.city, person.country].filter(Boolean).join(', ')}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Days badge */}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${colors.badge}`}>
          {daysLabel(days)}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setShowGifts(v => !v)}
            title="Gift ideas"
            className={`p-2 rounded-xl transition-colors ${showGifts ? 'bg-orange-100 text-orange-600' : 'text-slate-400 hover:bg-slate-100 hover:text-orange-500'}`}
          >
            <Gift size={17} />
          </button>
          {person.address1 && (
            <button onClick={handleCopyAddress} title="Copy delivery address"
              className={`p-2 rounded-xl transition-colors ${copied ? 'bg-green-100 text-green-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}>
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          )}
          <button onClick={() => onEdit(person)} title="Edit" className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <Pencil size={17} />
          </button>
          <button onClick={() => onDelete(person.id)} title="Delete" className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {/* Gift panel */}
      {showGifts && (
        <div className="border-t border-slate-100 bg-white px-5 py-4">
          <GiftSuggestions person={person} days={days} />
        </div>
      )}
    </div>
  );
}
