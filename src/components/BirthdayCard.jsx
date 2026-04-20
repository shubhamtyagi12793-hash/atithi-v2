// ─── Atithi V2 — Birthday Card with Status Toggle + Share ────────────────────
import { useState } from 'react';
import { Pencil, Trash2, Gift, Calendar, MapPin, Share2, Circle, ShoppingBag, CheckCircle2 } from 'lucide-react';
import {
  daysUntilBirthday, daysLabel, urgencyColor,
  RELATIONSHIP_STYLES, COUNTRY_CONFIG,
  displayName, milestoneLabel, EVENT_META,
} from '../utils/birthdayUtils';
import GiftSuggestions from './GiftSuggestions';
import { sharePersonNative } from '../utils/shareUtils';

// ── Status cycle config ───────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:  { label: 'Pending',  Icon: Circle,        color: 'text-slate-400',  bg: 'bg-slate-50',    badge: 'bg-slate-100 text-slate-500'  },
  ordered:  { label: 'Ordered',  Icon: ShoppingBag,   color: 'text-orange-500', bg: 'bg-orange-50',   badge: 'bg-orange-100 text-orange-600' },
  gifted:   { label: 'Gifted',   Icon: CheckCircle2,  color: 'text-green-500',  bg: 'bg-green-50',    badge: 'bg-green-100 text-green-700'   },
};

export default function BirthdayCard({ person, onEdit, onDelete, region = 'US', giftStatus = 'pending', onCycleStatus, lastGift }) {
  const [showGifts, setShowGifts] = useState(false);
  const [shareMsg,  setShareMsg]  = useState('');

  const days      = daysUntilBirthday(person.birthday);
  const colors    = urgencyColor(days);
  const relStyle  = RELATIONSHIP_STYLES[person.relationship] || 'bg-slate-100 text-slate-600';
  const flag      = COUNTRY_CONFIG[person.country]?.flag || '';
  const meta      = EVENT_META[person.eventType] || EVENT_META['Birthday'];
  const name      = displayName(person);
  const milestone = milestoneLabel(person);
  const status    = STATUS_CONFIG[giftStatus] || STATUS_CONFIG.pending;

  const avatarText = person.eventType === 'Wedding Anniversary' && person.partnerName
    ? `${person.name.charAt(0)}${person.partnerName.charAt(0)}`
    : person.name.charAt(0).toUpperCase();

  async function handleShare() {
    const result = await sharePersonNative(person);
    setShareMsg(result === 'copied' ? 'Link copied!' : 'Shared!');
    setTimeout(() => setShareMsg(''), 2500);
  }

  return (
    <div className={`rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden w-full ${colors.bg}`}>

      {/* Main Container: column on mobile, row on md+ */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 px-4 py-4 md:px-5">

        {/* Top Row: Avatar + Name + Meta */}
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

            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-xs md:text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(person.birthday + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span>·</span>
              <span>{milestone}</span>
              {(person.city || person.country) && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin size={11} />
                    <span className="truncate">{[person.city, person.country].filter(Boolean).join(', ')}</span>
                  </span>
                </>
              )}
            </div>

            {/* Last year's gift reminder */}
            {lastGift && (
              <p className="text-[10px] text-violet-600 mt-0.5 font-medium">
                🎁 Last year: {lastGift.giftName}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Row: Days + Status + Actions */}
        <div className="flex items-center justify-between md:justify-end gap-2 pt-3 border-t border-slate-100/50 md:border-0 md:pt-0 flex-wrap">

          {/* Days badge */}
          <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${colors.badge}`}>
            {daysLabel(days)}
          </span>

          {/* 3-state status toggle */}
          <button
            onClick={onCycleStatus}
            title={`Status: ${status.label} — click to cycle`}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all hover:scale-105 ${status.badge}`}>
            <status.Icon size={11} />
            {status.label}
          </button>

          {/* Action icons */}
          <div className="flex items-center gap-1">
            <button onClick={() => setShowGifts(v => !v)} title="Gift ideas"
              className={`p-2 rounded-xl transition-colors ${showGifts ? 'bg-orange-100 text-orange-600' : 'text-slate-400 hover:bg-slate-100'}`}>
              <Gift size={17} />
            </button>

            {/* Share */}
            <button onClick={handleShare} title="Share contact"
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-orange-500 transition-colors relative">
              <Share2 size={17} />
              {shareMsg && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap">
                  {shareMsg}
                </span>
              )}
            </button>

            <button onClick={() => onEdit(person)} title="Edit"
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <Pencil size={17} />
            </button>
            <button onClick={() => onDelete(person.id)} title="Delete"
              className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Gift panel */}
      {showGifts && (
        <div className="border-t border-slate-100 bg-white px-5 py-4">
          <GiftSuggestions person={person} days={days} region={region} />
        </div>
      )}
    </div>
  );
}
