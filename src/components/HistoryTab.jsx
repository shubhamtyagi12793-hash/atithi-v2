// ─── Atithi V2 — History Tab ──────────────────────────────────────────────────
import { Clock, RotateCcw, Gift, Inbox } from 'lucide-react';
import { getRegion } from '../atithi.config';

function timeAgo(isoDate) {
  const diff = Math.floor((Date.now() - new Date(isoDate)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 30)  return `${diff} days ago`;
  if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
  return `${Math.floor(diff / 365)} year${Math.floor(diff / 365) > 1 ? 's' : ''} ago`;
}

export default function HistoryTab({ history, region = 'US' }) {
  const regionData = getRegion(region);
  const primary    = regionData.platforms.primary[0];

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <Inbox size={28} className="text-slate-300" />
        </div>
        <p className="font-semibold text-slate-600 mb-1">No gift history yet</p>
        <p className="text-sm text-slate-400">
          When you mark a gift as <span className="font-medium text-green-600">Gifted ✓</span> on a card,<br />it will appear here.
        </p>
      </div>
    );
  }

  // Group by year
  const grouped = history.reduce((acc, entry) => {
    const y = entry.year || new Date(entry.date).getFullYear();
    if (!acc[y]) acc[y] = [];
    acc[y].push(entry);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => b - a);

  return (
    <div className="px-4 py-6 pb-28 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-slate-400" />
        <h2 className="text-base font-bold text-slate-800">Gift History</h2>
        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium ml-auto">
          {history.length} gift{history.length !== 1 ? 's' : ''}
        </span>
      </div>

      {years.map(year => (
        <div key={year}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">{year}</p>
          <div className="space-y-3">
            {grouped[year].map(entry => (
              <div key={entry.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Gift size={16} className="text-green-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800 text-sm">{entry.personName}</span>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        ✓ Gifted
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{entry.giftName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{timeAgo(entry.date)}</p>
                  </div>

                  {/* Buy Again */}
                  {primary && (
                    <a
                      href={primary.buildUrl(`${entry.giftQuery} ${new Date().getFullYear()}`)}
                      target="_blank" rel="noopener noreferrer"
                      title="Buy Again"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors flex-shrink-0"
                    >
                      <RotateCcw size={11} /> Buy Again
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
