// ─── Atithi V2 — Gifting Engine ──────────────────────────────────────────────
import { useState } from 'react';
import { Sparkles, Loader2, ExternalLink, CreditCard, Search, MapPin, Copy, Check } from 'lucide-react';
import { generateGiftIdeas, turningAge, displayName } from '../utils/birthdayUtils';
import { getRegion, getPlatformsForRegion } from '../atithi.config';

// ── Platform Button ───────────────────────────────────────────────────────────
function PlatformButton({ platform, query }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <a href={platform.buildUrl(query)} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:scale-105 hover:shadow-sm"
      style={{ backgroundColor: platform.bg, color: platform.color, borderColor: platform.color + '33' }}>
      {!imgErr
        ? <img src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=32`}
            className="w-4 h-4 rounded-sm flex-shrink-0" onError={() => setImgErr(true)} alt="" />
        : <span className="w-4 h-4 rounded-sm flex items-center justify-center text-[10px] font-bold"
            style={{ background: platform.color, color: '#fff' }}>{platform.name.charAt(0)}</span>
      }
      <span>{platform.name}</span>
      {platform.urgentBadge && (
        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1 py-0.5 rounded-md">{platform.urgentBadge}</span>
      )}
      <ExternalLink size={10} className="opacity-50 flex-shrink-0" />
    </a>
  );
}

// ── Gift Card Button ──────────────────────────────────────────────────────────
function GiftCardButton({ amount, symbol, platform }) {
  if (!platform?.giftCardUrl) return null;
  return (
    <a href={platform.giftCardUrl(amount)} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all hover:scale-105">
      <CreditCard size={12} />
      {symbol}{amount}
    </a>
  );
}

// ── Address Box ───────────────────────────────────────────────────────────────
function AddressBox({ person }) {
  const [copied, setCopied] = useState(false);
  const addr = [person.address1, person.address2, person.city, person.state, person.zip, person.country]
    .filter(Boolean).join(', ');
  if (!addr) return null;

  function handleCopy() {
    navigator.clipboard.writeText(addr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <MapPin size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Delivery Address</p>
            <p className="text-xs text-slate-600 leading-relaxed break-words">{addr}</p>
          </div>
        </div>
        <button onClick={handleCopy}
          className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
            copied ? 'bg-green-50 text-green-700 border-green-200'
                   : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50'
          }`}>
          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function GiftSuggestions({ person, days, region = 'US', onGiftSelected }) {
  const [ideas,   setIdeas]   = useState(null);
  const [loading, setLoading] = useState(false);

  const regionData  = getRegion(region);
  const platforms   = getPlatformsForRegion(region, days);
  const primaryPlat = regionData.platforms.primary[0];
  const age         = turningAge(person.birthday);
  const isUrgent    = days <= 3;
  const name        = displayName(person);

  function handleGenerate() {
    setLoading(true);
    setIdeas(null);
    setTimeout(() => {
      setIdeas(generateGiftIdeas(person));
      setLoading(false);
    }, 900);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">🎁 Gift Ideas for {name}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {person.eventType === 'Wedding Anniversary' ? 'Anniversary' : `Turning ${age}`}
            {' · '}{person.relationship}
            {person.city ? ` · ${person.city}` : ''}
          </p>
          {isUrgent && region === 'IN' && (
            <p className="text-xs font-medium text-green-700 mt-1">
              ⚡ {days === 0 ? 'Today!' : `${days} day${days === 1 ? '' : 's'} left`} — Blinkit same-day available!
            </p>
          )}
        </div>
        <button onClick={handleGenerate} disabled={loading}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60 flex-shrink-0">
          {loading ? <><Loader2 size={13} className="animate-spin" /> Thinking…</> : <><Sparkles size={13} /> Generate</>}
        </button>
      </div>

      {/* One-Tap Gift Cards */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
          <CreditCard size={11} /> One-Tap Gift Cards
        </p>
        <div className="flex flex-wrap gap-2">
          {regionData.giftAmounts.map(amt => (
            <GiftCardButton key={amt} amount={amt} symbol={regionData.symbol} platform={primaryPlat} />
          ))}
        </div>
      </div>

      {/* Empty state */}
      {!ideas && !loading && (
        <div className="flex items-center gap-2 text-xs text-slate-400 italic py-1">
          <Search size={13} />
          Hit "Generate" for personalised smart search suggestions ✨
        </div>
      )}

      {/* Gift ideas */}
      {ideas && (
        <div className="space-y-3">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
            <Search size={11} /> Smart Search
          </p>
          {ideas.map((item, i) => (
            <div key={i}
              className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 cursor-pointer"
              onClick={() => onGiftSelected && onGiftSelected(item)}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{['🎀', '✨', '💝'][i]}</span>
                <span className="text-sm font-semibold text-slate-700">{item.idea}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {platforms.map(platform => (
                  <PlatformButton key={platform.name} platform={platform}
                    query={`${item.query} ${person.relationship} gift`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delivery address */}
      <AddressBox person={person} />
    </div>
  );
}
