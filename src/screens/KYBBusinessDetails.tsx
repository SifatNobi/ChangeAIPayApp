import { useState } from 'react'

type Structure = 'llc' | 'corporation' | 'sole_proprietor' | 'partnership' | 's_corp' | 'nonprofit'

const STRUCTURES: { id: Structure; label: string; sub: string }[] = [
  { id: 'llc',            label: 'LLC',                        sub: 'Limited Liability Company' },
  { id: 'corporation',    label: 'Corporation',                sub: 'C-Corp or standard corporation' },
  { id: 's_corp',         label: 'S-Corp',                     sub: 'S Corporation (pass-through)' },
  { id: 'partnership',    label: 'Partnership',                sub: 'General or limited partnership' },
  { id: 'sole_proprietor',label: 'Sole Proprietorship',        sub: 'Individual business owner' },
  { id: 'nonprofit',      label: 'Nonprofit',                  sub: '501(c)(3) or similar' },
]

const INDUSTRIES = [
  'Retail & E-commerce', 'Food & Beverage', 'Professional Services', 'Technology',
  'Healthcare', 'Construction', 'Education', 'Finance', 'Real Estate', 'Other',
]

export interface BusinessDetailsData {
  legalName: string
  dba: string
  structure: Structure | ''
  industry: string
  ein: string
  website: string
  established: string
}

interface KYBBusinessDetailsProps {
  initial?: Partial<BusinessDetailsData>
  onContinue?: (data: BusinessDetailsData) => void
  onBack?: () => void
}

function Field({ label, value, onChange, placeholder, type = 'text', optional = false, hint }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder: string; type?: string; optional?: boolean; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <p className="font-body text-xs font-semibold text-text">{label}</p>
        {optional && <p className="font-body text-[9px] text-text-muted">Optional</p>}
      </div>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none transition-all"
        style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.14)', caretColor: 'var(--color-accent)' }}
      />
      {hint && <p className="font-body text-[9px] text-text-muted">{hint}</p>}
    </div>
  )
}

export default function KYBBusinessDetails({ initial = {}, onContinue, onBack }: KYBBusinessDetailsProps) {
  const [data, setData] = useState<BusinessDetailsData>({
    legalName:   initial.legalName   ?? '',
    dba:         initial.dba         ?? '',
    structure:   initial.structure   ?? '',
    industry:    initial.industry    ?? '',
    ein:         initial.ein         ?? '',
    website:     initial.website     ?? '',
    established: initial.established ?? '',
  })
  const [showStructures, setShowStructures] = useState(false)
  const [showIndustries, setShowIndustries] = useState(false)

  const up = (k: keyof BusinessDetailsData) => (v: string) => setData(d => ({ ...d, [k]: v }))

  const canContinue = data.legalName.trim().length > 1
    && data.structure !== ''
    && data.industry !== ''
    && data.ein.trim().length >= 9
    && data.established.trim().length > 0

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Business Details</p>
          <p className="font-body text-[10px] text-text-muted">Step 1 of 4</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2,3].map(i => (
            <div key={i} className="h-1.5 rounded-full" style={{ width: i === 0 ? 16 : 6, background: i === 0 ? 'var(--color-accent)' : 'rgba(175,197,255,0.18)' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        <Field label="Legal business name" value={data.legalName} onChange={up('legalName')}
          placeholder="e.g. Acme Technologies LLC"
          hint="Must match exactly as it appears in your business registration documents" />

        <Field label="DBA / Trade name" value={data.dba} onChange={up('dba')}
          placeholder="e.g. Acme Tech" optional />

        {/* Business structure selector */}
        <div className="flex flex-col gap-1.5">
          <p className="font-body text-xs font-semibold text-text">Business structure</p>
          <button onClick={() => setShowStructures(p => !p)}
            className="w-full h-12 rounded-[--radius-xl] px-4 flex items-center justify-between font-body text-sm transition-all"
            style={{ background: 'rgba(175,197,255,0.05)', border: `1px solid ${showStructures ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.14)'}`, color: data.structure ? 'var(--color-text)' : 'rgba(175,197,255,0.35)' }}>
            {data.structure ? STRUCTURES.find(s => s.id === data.structure)?.label : 'Select structure'}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: showStructures ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
              <path d="M2 4l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {showStructures && (
            <div className="flex flex-col gap-1.5 animate-fade-in">
              {STRUCTURES.map(s => (
                <button key={s.id} onClick={() => { up('structure')(s.id); setShowStructures(false) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] text-left transition-all active:scale-[0.98]"
                  style={{ background: data.structure === s.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)', border: `1px solid ${data.structure === s.id ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}` }}>
                  <div className="flex-1">
                    <p className="font-body text-xs font-semibold text-text">{s.label}</p>
                    <p className="font-body text-[9px] text-text-muted">{s.sub}</p>
                  </div>
                  {data.structure === s.id && (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Industry */}
        <div className="flex flex-col gap-1.5">
          <p className="font-body text-xs font-semibold text-text">Industry / Category</p>
          <button onClick={() => setShowIndustries(p => !p)}
            className="w-full h-12 rounded-[--radius-xl] px-4 flex items-center justify-between font-body text-sm transition-all"
            style={{ background: 'rgba(175,197,255,0.05)', border: `1px solid ${showIndustries ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.14)'}`, color: data.industry ? 'var(--color-text)' : 'rgba(175,197,255,0.35)' }}>
            {data.industry || 'Select industry'}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: showIndustries ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
              <path d="M2 4l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {showIndustries && (
            <div className="flex flex-col gap-1 animate-fade-in max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {INDUSTRIES.map(ind => (
                <button key={ind} onClick={() => { up('industry')(ind); setShowIndustries(false) }}
                  className="flex items-center justify-between px-4 py-3 rounded-[--radius-xl] text-left transition-all"
                  style={{ background: data.industry === ind ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.03)', border: `1px solid ${data.industry === ind ? 'rgba(0,102,255,0.25)' : 'transparent'}` }}>
                  <p className="font-body text-xs text-text">{ind}</p>
                  {data.industry === ind && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <Field label="EIN / Tax ID" value={data.ein} onChange={up('ein')}
          placeholder="XX-XXXXXXX" hint="Federal Employer Identification Number (9 digits)" />

        <Field label="Date established" value={data.established} onChange={up('established')}
          placeholder="MM/YYYY" type="text" />

        <Field label="Business website" value={data.website} onChange={up('website')}
          placeholder="https://yourbusiness.com" optional />

        <button onClick={() => canContinue && onContinue?.(data)} disabled={!canContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: canContinue ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.07)', opacity: canContinue ? 1 : 0.6, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
          Continue
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}
