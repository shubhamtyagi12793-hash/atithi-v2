// ─── Atithi V2 — Settings Tab ────────────────────────────────────────────────
import { Globe, Trash2, Info, ChevronRight } from 'lucide-react';
import { REGIONS } from '../atithi.config';

export default function SettingsTab({ region, onRegionChange, onClearData }) {
  return (
    <div className="px-4 py-6 pb-28 max-w-2xl mx-auto space-y-6">

      <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
        <Globe size={16} className="text-slate-400" /> Settings
      </h2>

      {/* Region Toggle */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Region & Currency</p>
        </div>
        <div className="p-3 flex gap-3">
          {Object.values(REGIONS).map(r => {
            const isActive = region === r.code;
            return (
              <button key={r.code} onClick={() => onRegionChange(r.code)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-orange-400 bg-orange-50 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                }`}>
                <span className="text-3xl">{r.flag}</span>
                <span className={`text-xs font-bold ${isActive ? 'text-orange-700' : 'text-slate-600'}`}>
                  {r.code} · {r.symbol}
                </span>
                <span className="text-[10px] text-slate-400">{r.label}</span>
                {isActive && (
                  <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">Active</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="px-4 pb-3">
          <p className="text-xs text-slate-400">
            Controls gift card denominations and default marketplace links across the app.
          </p>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">About Atithi</p>
        </div>
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Info size={15} className="text-slate-400" />
              Version
            </div>
            <span className="text-sm font-semibold text-slate-700">2.0.0</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Atithi is a serverless, privacy-first relationship intelligence engine. All your data lives on your device — no accounts, no servers, no ads.
          </p>
          <p className="text-xs text-slate-400">
            <span className="font-medium text-slate-500">Decentralized sharing:</span> Share contacts via URL — no account needed on either end.
          </p>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-rose-100">
          <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide">Danger Zone</p>
        </div>
        <button onClick={onClearData}
          className="w-full flex items-center justify-between px-4 py-4 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
          <div className="flex items-center gap-2">
            <Trash2 size={15} />
            Clear all data
          </div>
          <ChevronRight size={15} className="text-rose-300" />
        </button>
      </div>
    </div>
  );
}
