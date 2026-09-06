import { useState } from 'react'

export interface AddressBlock {
  line1: string
  line2: string
  city: string
  state: string
  postcode: string
  country: string
}

function emptyAddress(): AddressBlock {
  return { line1: '', line2: '', city: '', state: '', postcode: '', country: 'United States' }
}

export interface KYBAddressData {
  registered: AddressBlock
  operatingDifferent: boolean
  operating: AddressBlock
}

interface KYBAddressProps {
  initial?: Partial<KYBAddressData>
  onContinue?: (data: KYBAddressData) => void
  onBack?: () => void
}

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Other']

function AddressForm({ value, onChange, label }: { value: AddressBlock; onChange: (v: AddressBlock) => void; label: string }) {
  const up = (k: keyof AddressBlock) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...value, [k]: e.target.value })

  const inputStyle = {
    background: 'rgba(175,197,255,0.05)',
    border: '1px solid rgba(175,197,255,0.14)',
    caretColor: 'var(--color-accent)',
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">{label}</p>
      <input value={value.line1} onChange={up('line1')} placeholder="Street address"
        className="w-full h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none transition-all" style={inputStyle} />
      <input value={value.line2} onChange={up('line2')} placeholder="Suite, floor, unit (optional)"
        className="w-full h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none transition-all" style={inputStyle} />
      <div className="flex gap-2">
        <input value={value.city} onChange={up('city')} placeholder="City"
          className="flex-1 h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none transition-all" style={inputStyle} />
        <input value={value.state} onChange={up('state')} placeholder="State"
          className="w-24 h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none transition-all" style={inputStyle} />
      </div>
      <div className="flex gap-2">
        <input value={value.postcode} onChange={up('postcode')} placeholder="ZIP / Postcode"
          className="w-36 h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none transition-all" style={inputStyle} />
        <select value={value.country} onChange={up('country')}
          className="flex-1 h-12 rounded-[--radius-xl] px-3 font-body text-sm text-text outline-none transition-all"
          style={{ ...inputStyle, appearance: 'none' }}>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  )
}

function isComplete(a: AddressBlock) {
  return a.line1.trim() && a.city.trim() && a.state.trim() && a.postcode.trim()
}

export default function KYBAddress({ initial = {}, onContinue, onBack }: KYBAddressProps) {
  const [registered, setRegistered]         = useState<AddressBlock>(initial.registered ?? emptyAddress())
  const [operatingDifferent, setDiff]       = useState(initial.operatingDifferent ?? false)
  const [operating, setOperating]           = useState<AddressBlock>(initial.operating ?? emptyAddress())

  const canContinue = isComplete(registered) && (!operatingDifferent || isComplete(operating))

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Business Address</p>
          <p className="font-body text-[10px] text-text-muted">Step 2 of 4</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2,3].map(i => (
            <div key={i} className="h-1.5 rounded-full" style={{ width: i === 1 ? 16 : 6, background: i <= 1 ? 'var(--color-accent)' : 'rgba(175,197,255,0.18)' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Registered address */}
        <div className="rounded-[--radius-2xl] px-4 py-4"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <AddressForm value={registered} onChange={setRegistered} label="Registered address" />
          <p className="font-body text-[9px] text-text-muted mt-3">
            The address on file with your state or country of incorporation.
          </p>
        </div>

        {/* Same/different toggle */}
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">Operating address is different</p>
            <p className="font-body text-[10px] text-text-muted">Where your business actually operates day-to-day</p>
          </div>
          <button onClick={() => setDiff(p => !p)}
            className="relative shrink-0 transition-all"
            style={{ width: 44, height: 24, borderRadius: 12, background: operatingDifferent ? 'var(--color-accent)' : 'rgba(175,197,255,0.15)' }}>
            <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: operatingDifferent ? 'calc(100% - 22px)' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
          </button>
        </div>

        {operatingDifferent && (
          <div className="rounded-[--radius-2xl] px-4 py-4 animate-fade-in"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
            <AddressForm value={operating} onChange={setOperating} label="Operating address" />
          </div>
        )}

        {/* Validation note */}
        <div className="flex items-start gap-2 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6" cy="6" r="5" stroke="#3FE7FF" strokeWidth="1" />
            <path d="M6 5v3M6 3.5v.5" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Addresses are cross-referenced with your business registration documents during review. Minor formatting differences are fine — the key is that the information matches.
          </p>
        </div>

        <button onClick={() => canContinue && onContinue?.({ registered, operatingDifferent, operating })}
          disabled={!canContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: canContinue ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.07)', opacity: canContinue ? 1 : 0.6, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
          Continue
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}
