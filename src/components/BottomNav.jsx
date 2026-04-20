// ─── Atithi V2 — Bottom Tab Bar ──────────────────────────────────────────────
import { Home, Clock, Settings } from 'lucide-react';

const TABS = [
  { id: 'home',     label: 'Home',     Icon: Home     },
  { id: 'history',  label: 'History',  Icon: Clock    },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 safe-bottom">
      <div className="max-w-2xl mx-auto flex">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-[10px] font-semibold ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
