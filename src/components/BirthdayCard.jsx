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
    <div className={`rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden w-full ${colors.bg}`}>

      {/* Main Container: Changes from Row to Column on mobile */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 px-4 py-4 md:px-5">

        {/* Top Row for Mobile: Avatar + Name + Days Badge */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
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
              <span className="font-semibold text-slate-800 text-base truncate block">{name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${relStyle}`}>
                {person.relationship}
              </span>
              {flag && <span className="text-base" title={person.country}>{flag}</span>}
            </div>
            
            {/* Date and Location */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-xs md:text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(person.birthday + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span>·</span>
              <span>{milestone}</span>
              {(person.city || person.country) && (
                <>
                  <span className="hidden xs:inline">·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin size={11} />
                    <span className="truncate">{[person.city, person.country].filter(Boolean).join(', ')}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row for Mobile: Days Badge + Action Buttons */}
        <div className="flex items-center justify-between md:justify-end gap-2 pt-3 border-t border-slate-100/50 md:border-0 md:pt-0">
          
          {/* Days badge */}
          <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${colors.badge}`}>
            {daysLabel(days)}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowGifts(v => !v)}
              className={`p-2 rounded-xl transition-colors ${showGifts ? 'bg-orange-100 text-orange-600' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <Gift size={17} />
            </button>
            {person.address1 && (
              <button onClick={handleCopyAddress}
                className={`p-2 rounded-xl transition-colors ${copied ? 'bg-green-100 text-green-600' : 'text-slate-400 hover:bg-slate-100'}`}>
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            )}
            <button onClick={() => onEdit(person)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
              <Pencil size={17} />
            </button>
            <button onClick={() => onDelete(person.id)} className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
              <Trash2 size={17} />
            </button>
          </div>
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
