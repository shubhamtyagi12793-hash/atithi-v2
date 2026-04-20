// ─── Atithi V2 — Onboarding (Single screen profile form) ─────────────────────
import { useState } from 'react';
import { User, Mail, Phone, Globe, ChevronRight, Sparkles } from 'lucide-react';
import { REGIONS } from '../atithi.config';

export default function Onboarding({ onComplete }) {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [phone,   setPhone]   = useState('');
  const [region,  setRegion]  = useState('US');
  const [errors,  setErrors]  = useState({});

  function validate() {
    const e = {};
    if (!name.trim())  e.name  = 'Please enter your name';
    if (!email.trim()) e.email = 'Please enter your email';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onComplete({ name: name.trim(), email: email.trim(), phone: phone.trim(), region });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex flex-col items-center justify-center px-4 py-12">

      {/* Branding */}
      <div className="mb-7 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Sparkles size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome to Atithi</h1>
        <p className="text-slate-500 mt-1 text-sm">Never miss a birthday or anniversary again.</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-slate-100 overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-50">
          <h2 className="text-base font-semibold text-slate-800">Create your profile</h2>
          <p className="text-xs text-slate-400 mt-0.5">Takes 30 seconds. All data stays on your device.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Your Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })); }}
                placeholder="e.g. Shubham"
                className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none transition-colors
                  ${errors.name
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
                    : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Email ID <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })); }}
                placeholder="you@example.com"
                className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none transition-colors
                  ${errors.email
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
                    : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Phone Number <span className="text-slate-300">(optional)</span>
            </label>
            <div className="relative">
              <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Country / Region */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              <Globe size={11} className="inline mr-1 mb-0.5" />Country
            </label>
            <p className="text-[11px] text-slate-400 mb-2">Sets your default marketplace & currency for gift suggestions.</p>
            <div className="flex gap-3">
              {Object.values(REGIONS).map(r => {
                const active = region === r.code;
                return (
                  <button
                    key={r.code}
                    type="button"
                    onClick={() => setRegion(r.code)}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-xl border-2 transition-all
                      ${active
                        ? 'border-orange-400 bg-orange-50 shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}>
                    <span className="text-3xl">{r.flag}</span>
                    <span className={`text-xs font-bold ${active ? 'text-orange-700' : 'text-slate-600'}`}>
                      {r.label}
                    </span>
                    <span className={`text-[10px] ${active ? 'text-orange-500' : 'text-slate-400'}`}>
                      {r.symbol} {r.currency}
                    </span>
                    {active && (
                      <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">Selected</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 active:bg-orange-700 transition-colors shadow-sm mt-2">
            Get Started <ChevronRight size={15} />
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-400 px-6 pb-5">
          🔒 No account needed. Everything stays on your device.
        </p>
      </div>
    </div>
  );
}
