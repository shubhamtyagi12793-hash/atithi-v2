import { useState } from 'react';
import { Sparkles, Loader2, ExternalLink, MapPin, Copy, Check } from 'lucide-react';
import { generateGiftIdeas, getPlatforms, turningAge } from '../utils/birthdayUtils';

function formatAddress(person) {
  return [person.address1, person.address2, person.city, person.state, person.zip, person.country]
    .filter(Boolean).join(', ');
}

function DeliveryAddressBox({ person }) {
  const [copied, setCopied] = useState(false);
  const address = formatAddress(person);
  if (!address) return null;

  function handleCopy() {
    navigator.clipboard.writeText(address).then(() => {
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
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Delivery Address</p>
            <p className="text-xs text-slate-600 leading-relaxed break-words">{address}</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          title="Copy address"
          className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
            copied
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50'
          }`}
        >
          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
    </div>
  );
}

// Renders one platform button with its favicon logo + name
function PlatformButton({ platform, query }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={platform.buildUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:scale-105 hover:shadow-sm"
      style={{
        backgroundColor: platform.bg,
        color: platform.color,
        borderColor: platform.color + '33',
      }}
    >
      {/* Favicon logo */}
      {!imgError ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=32`}
          alt={platform.name}
          className="w-4 h-4 rounded-sm flex-shrink-0"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
              style={{ background: platform.color, color: '#fff' }}>
          {platform.name.charAt(0)}
        </span>
      )}

      <span>{platform.name}</span>

      {/* ⚡ badge for Blinkit / same-day platforms */}
      {platform.urgentBadge && (
        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1 py-0.5 rounded-md">
          {platform.urgentBadge}
        </span>
      )}

      <ExternalLink size={10} className="opacity-50 flex-shrink-0" />
    </a>
  );
}

export default function GiftSuggestions({ person, days }) {
  const [ideas, setIdeas]     = useState(null);
  const [loading, setLoading] = useState(false);

  const platforms = getPlatforms(person.country || 'United States', days);
  const age       = turningAge(person.birthday);
  const isUrgent  = days <= 3;

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
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            🎁 Gift Ideas for {person.name}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Turning {age} · {person.relationship}
            {person.city ? ` · ${person.city}` : ''}
            {person.country ? ` ${person.country}` : ''}
          </p>
          {/* Urgent hint */}
          {isUrgent && person.country === 'India' && (
            <p className="text-xs font-medium text-green-700 mt-1">
              ⚡ Birthday in {days === 0 ? 'less than a day' : `${days} day${days === 1 ? '' : 's'}`} — Blinkit same-day delivery available!
            </p>
          )}
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60 flex-shrink-0"
        >
          {loading
            ? <><Loader2 size={13} className="animate-spin" /> Thinking…</>
            : <><Sparkles size={13} /> Generate</>
          }
        </button>
      </div>

      {/* Empty state */}
      {!ideas && !loading && (
        <p className="text-xs text-slate-400 italic">Hit "Generate" to get personalised suggestions ✨</p>
      )}

      {/* Gift ideas */}
      {ideas && (
        <div className="space-y-3">
          {ideas.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              {/* Idea name */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{['🎀', '✨', '💝'][i]}</span>
                <span className="text-sm font-semibold text-slate-700">{item.idea}</span>
              </div>

              {/* Platform buttons */}
              <div className="flex flex-wrap gap-2">
                {platforms.map(platform => (
                  <PlatformButton
                    key={platform.name}
                    platform={platform}
                    query={item.query}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delivery address — always visible when address exists */}
      <DeliveryAddressBox person={person} />
    </div>
  );
}
