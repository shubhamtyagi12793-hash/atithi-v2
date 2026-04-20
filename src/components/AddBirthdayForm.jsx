import { useState, useEffect } from 'react';
import { X, User, CalendarDays, Users, FileText, MapPin, Home, Heart, ChevronDown } from 'lucide-react';
import { SUPPORTED_COUNTRIES, COUNTRY_CONFIG, EVENT_TYPES, EVENT_META } from '../utils/birthdayUtils';
import { getStates, getCities, getZip } from '../utils/addressData';

const EMPTY = {
  eventType:    'Birthday',
  name:         '',
  partnerName:  '',
  birthday:     '',
  relationship: 'Friend',
  country:      'United States',
  state:        '',
  city:         '',
  address1:     '',
  address2:     '',
  zip:          '',
  notes:        '',
};

function SelectField({ label, icon: Icon, value, onChange, options, placeholder, disabled }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          <span className="flex items-center gap-1">{Icon && <Icon size={12} />}{label}</span>
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors bg-white appearance-none pr-8 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function AddBirthdayForm({ onSave, onClose, editData }) {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(editData ? {
      eventType:    editData.eventType    || 'Birthday',
      name:         editData.name         || '',
      partnerName:  editData.partnerName  || '',
      birthday:     editData.birthday     || '',
      relationship: editData.relationship || 'Friend',
      country:      editData.country      || 'United States',
      state:        editData.state        || '',
      city:         editData.city         || '',
      address1:     editData.address1     || '',
      address2:     editData.address2     || '',
      zip:          editData.zip          || '',
      notes:        editData.notes        || '',
    } : EMPTY);
    setErrors({});
  }, [editData]);

  function validate() {
    const e = {};
    if (!form.name.trim())  e.name     = 'Name is required.';
    if (!form.birthday)     e.birthday = 'Date is required.';
    if (form.eventType === 'Wedding Anniversary' && !form.partnerName.trim())
      e.partnerName = "Partner's name is required.";
    return e;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
    setForm(EMPTY);
    setErrors({});
  }

  function field(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  // Cascading address logic
  function handleCountryChange(country) {
    setForm(prev => ({ ...prev, country, state: '', city: '', zip: '' }));
  }

  function handleStateChange(state) {
    setForm(prev => ({ ...prev, state, city: '', zip: '' }));
  }

  function handleCityChange(city) {
    const zip = getZip(form.country, form.state, city);
    setForm(prev => ({ ...prev, city, zip }));
  }

  const isAnniversary = form.eventType === 'Wedding Anniversary';
  const selectedFlag  = COUNTRY_CONFIG[form.country]?.flag || '';
  const states        = getStates(form.country);
  const cities        = getCities(form.country, form.state);
  const zipLabel      = form.country === 'India' ? 'PIN Code' : form.country === 'United Kingdom' ? 'Postcode' : 'ZIP Code';
  const stateLabel    = form.country === 'India' ? 'State' : form.country === 'United Kingdom' ? 'Region' : form.country === 'Canada' ? 'Province' : 'State';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-base font-semibold text-slate-800">
            {editData ? '✏️ Edit Event' : '✨ Add Event'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Event Type */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">Event Type</label>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_TYPES.map(type => {
                const meta   = EVENT_META[type];
                const active = form.eventType === type;
                return (
                  <button type="button" key={type} onClick={() => field('eventType', type)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      active ? 'border-orange-400 bg-orange-50 text-orange-700'
                             : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}>
                    <span>{meta.emoji}</span><span>{type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              <span className="flex items-center gap-1"><User size={12} />{isAnniversary ? 'Person 1 Name' : 'Full Name'}</span>
            </label>
            <input type="text" placeholder={isAnniversary ? 'e.g. Shubham' : 'e.g. Chanchal Krishna'}
              value={form.name} onChange={e => field('name', e.target.value)}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-colors ${errors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`} />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Partner Name */}
          {isAnniversary && (
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                <span className="flex items-center gap-1"><Heart size={12} /> Person 2 Name</span>
              </label>
              <input type="text" placeholder="e.g. Aditi Maheshwari"
                value={form.partnerName} onChange={e => field('partnerName', e.target.value)}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-colors ${errors.partnerName ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`} />
              {errors.partnerName && <p className="text-xs text-rose-500 mt-1">{errors.partnerName}</p>}
              <p className="text-xs text-slate-400 mt-1">"{form.name || 'Person 1'} & {form.partnerName || 'Person 2'}"</p>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              <span className="flex items-center gap-1"><CalendarDays size={12} />{isAnniversary ? 'Anniversary Date' : 'Birth Date'}</span>
            </label>
            <input type="date" value={form.birthday}
              max={new Date().toISOString().split('T')[0]}
              onChange={e => field('birthday', e.target.value)}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-colors ${errors.birthday ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`} />
            {errors.birthday && <p className="text-xs text-rose-500 mt-1">{errors.birthday}</p>}
            <p className="text-xs text-slate-400 mt-1">
              {isAnniversary ? 'e.g. Nov 27, 2025 — the year you got married'
                             : 'e.g. Apr 12, 1994 — include the birth year!'}
            </p>
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              <span className="flex items-center gap-1"><Users size={12} /> Your Relationship</span>
            </label>
            <div className="relative">
              <select value={form.relationship} onChange={e => field('relationship', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors bg-white appearance-none pr-8">
                <option>Friend</option>
                <option>Family</option>
                <option>Colleague</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ── Delivery Address ─────────────────────────────────── */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Home size={12} /> Delivery Address
              <span className="font-normal normal-case text-slate-400">— optional, for copy-paste when ordering gifts</span>
            </p>

            {/* Country */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                <span className="flex items-center gap-1"><MapPin size={12} /> Country</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base pointer-events-none">{selectedFlag}</span>
                <select value={form.country} onChange={e => handleCountryChange(e.target.value)}
                  className="w-full pl-8 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors bg-white appearance-none">
                  {SUPPORTED_COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* State + City side by side */}
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label={stateLabel}
                value={form.state}
                onChange={handleStateChange}
                options={states}
                placeholder={`Select ${stateLabel}`}
              />
              <SelectField
                label="City"
                value={form.city}
                onChange={handleCityChange}
                options={cities}
                placeholder={form.state ? 'Select City' : 'Select state first'}
                disabled={!form.state}
              />
            </div>

            {/* Address Line 1 */}
            <input type="text" placeholder="Address Line 1  e.g. 10001 NE 1st ST"
              value={form.address1} onChange={e => field('address1', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors" />

            {/* Address Line 2 */}
            <input type="text" placeholder="Address Line 2  e.g. Apt W213, Amli Bellevue Park"
              value={form.address2} onChange={e => field('address2', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors" />

            {/* ZIP — auto-filled, still editable */}
            <div>
              <input type="text" placeholder={`${zipLabel} (auto-filled)`}
                value={form.zip} onChange={e => field('zip', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors" />
              {form.zip && (
                <p className="text-xs text-slate-400 mt-1">✓ Auto-filled — edit if needed</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              <span className="flex items-center gap-1"><FileText size={12} /> Interests / Notes <span className="text-slate-400 font-normal">(optional)</span></span>
            </label>
            <input type="text"
              placeholder={isAnniversary ? 'e.g. love wine, travel, cooking…' : 'e.g. loves travel, coffee, gaming…'}
              value={form.notes} onChange={e => field('notes', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-colors" />
            <p className="text-xs text-slate-400 mt-1">Personalises gift suggestions 🎁</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
              {editData ? 'Save Changes' : 'Add Event'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
