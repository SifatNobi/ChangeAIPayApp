import { useState } from 'react'

export interface Stakeholder {
  id: string
  firstName: string
  lastName: string
  dob: string
  ownership: string
  role: string
  idType: string
  idNumber: string
  country: string
}

function emptyStakeholder(): Stakeholder {
  return { id: crypto.randomUUID(), firstName: '', lastName: '', dob: '', ownership: '', role: '', idType: 'passport', idNumber: '', country: 'United States' }
}

const ID_TYPES = [
  { id: 'passport',      label: 'Passport'       },
  { id: 'drivers_license',label: "Driver's License" },
  { id: 'national_id',   label: 'National ID'    },
]

const ROLES = ['CEO / President', 'CFO', 'COO', 'Director', 'Partner', 'Owner', 'Authorized Representative', 'Other']

interface KYBStakeholdersProps {
  initial?: Stakeholder[]
  onContinue?: (stakeholders: Stakeholder[]) => void
  onBack?: () => void
}

function StakeholderForm({ s, onChange, onRemove, index }: {
  s: Stakeholder; onChange: (updated: Stakeholder) => void; onRemove: () => void; index: number
}) {
  const [expanded, setExpanded] = useState(index === 0)
  const up = (k: keyof Stakeholder) => (v: string) => onChange({ ...s, [k]: v })

  const inputStyle = {
    background: 'rgba(175,197,255,0.05)',
    border: '1px solid rgba(175,197,255,0.14)',
    caretColor: 'var(--color-accent)',
  }

  const isOwner = parseFloat(s.ownership) >= 25
  const isComplete = s.firstName && s.lastName && s.dob && s.ownership && s.role

  return (
    <div className="rounded-[--radius-2xl] overflow-hidden"
      style={{ background: 'rgba(175,197,255,0.03)', border: `1.5px solid ${isComplete ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.1)'}` }}>
      {/* Row header */}
      <button onClick={() => setExpanded(p => !p)}
        className="w-full flex items-center gap-3 px-4 py-4 text-left">
        <div className="w-9 h-9 rounded-[--radius-xl] flex items-center justify-center font-display text-xs font-extrabold shrink-0"
          style={{ background: isComplete ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.08)', color: isComplete ? 'var(--color-accent)' : 'rgba(175,197,255,0.45)' }}>
          {s.firstName ? s.firstName[0].toUpperCase() : (index + 1).toString()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-sm font-semibold text-text">
            {s.firstName || s.lastName ? `${s.firstName} ${s.lastName}`.trim() : `Stakeholder ${index + 1}`}
          </p>
          <p className="font-body text-[10px] text-text-muted">
            {s.role || 'No role set'}{s.ownership ? ` · ${s.ownership}% ownership` : ''}
          </p>
        </div>
        {isOwner && (
          <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
            style={{ background: 'rgba(245,183,0,0.12)', color: '#F5B700' }}>25%+ Owner</span>
        )}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
          <path d="M2 4l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(175,197,255,0.08)' }}>
          <div className="flex gap-2 pt-3">
            <input value={s.firstName} onChange={e => up('firstName')(e.target.value)} placeholder="First name"
              className="flex-1 h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none" style={inputStyle} />
            <input value={s.lastName} onChange={e => up('lastName')(e.target.value)} placeholder="Last name"
              className="flex-1 h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none" style={inputStyle} />
          </div>

          <input value={s.dob} onChange={e => up('dob')(e.target.value)} placeholder="Date of birth (MM/DD/YYYY)"
            className="w-full h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none" style={inputStyle} />

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <p className="font-body text-[9px] font-semibold text-text-muted uppercase tracking-wider">Ownership %</p>
              <input value={s.ownership} onChange={e => up('ownership')(e.target.value)} placeholder="0–100"
                className="w-full h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none" style={inputStyle} />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="font-body text-[9px] font-semibold text-text-muted uppercase tracking-wider">Role / Title</p>
              <select value={s.role} onChange={e => up('role')(e.target.value)}
                className="w-full h-12 rounded-[--radius-xl] px-3 font-body text-sm text-text outline-none"
                style={{ ...inputStyle, appearance: 'none' }}>
                <option value="">Select role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {isOwner && (
            <div className="flex flex-col gap-2 p-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.2)' }}>
              <p className="font-body text-[10px] font-semibold" style={{ color: '#F5B700' }}>ID required (25%+ owner)</p>
              <div className="flex gap-2">
                {ID_TYPES.map(t => (
                  <button key={t.id} onClick={() => up('idType')(t.id)}
                    className="flex-1 h-9 rounded-[--radius-xl] font-body text-[10px] font-semibold transition-all"
                    style={{ background: s.idType === t.id ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.05)', border: `1px solid ${s.idType === t.id ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}`, color: s.idType === t.id ? 'var(--color-accent)' : 'rgba(175,197,255,0.5)' }}>
                    {t.label}
                  </button>
                ))}
              </div>
              <input value={s.idNumber} onChange={e => up('idNumber')(e.target.value)} placeholder="ID number"
                className="w-full h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none" style={inputStyle} />
            </div>
          )}

          {index > 0 && (
            <button onClick={onRemove}
              className="font-body text-xs text-center transition-all active:opacity-60" style={{ color: '#F87171' }}>
              Remove this stakeholder
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function KYBStakeholders({ initial, onContinue, onBack }: KYBStakeholdersProps) {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(
    initial ?? [emptyStakeholder()]
  )

  const update = (id: string, updated: Stakeholder) =>
    setStakeholders(prev => prev.map(s => s.id === id ? updated : s))

  const remove = (id: string) =>
    setStakeholders(prev => prev.filter(s => s.id !== id))

  const add = () =>
    setStakeholders(prev => [...prev, emptyStakeholder()])

  const canContinue = stakeholders.length > 0 && stakeholders.every(s =>
    s.firstName && s.lastName && s.dob && s.ownership && s.role
  )

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Stakeholders</p>
          <p className="font-body text-[10px] text-text-muted">Step 3 of 4</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2,3].map(i => (
            <div key={i} className="h-1.5 rounded-full" style={{ width: i === 2 ? 16 : 6, background: i <= 2 ? 'var(--color-accent)' : 'rgba(175,197,255,0.18)' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Regulatory note */}
        <div className="flex items-start gap-3 px-4 py-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.22)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 1.5L1.5 12h11L7 1.5Z" stroke="#F5B700" strokeWidth="1" fill="none" strokeLinejoin="round" />
            <path d="M7 6v3M7 10.5v.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold text-text">Beneficial ownership disclosure — required by law</p>
            <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed">
              Under the FinCEN Beneficial Ownership Rule, we must collect information on all individuals who own 25% or more of your business and at least one authorized officer. This is a mandatory AML requirement, not optional.
            </p>
          </div>
        </div>

        {stakeholders.map((s, i) => (
          <StakeholderForm key={s.id} s={s} index={i}
            onChange={updated => update(s.id, updated)}
            onRemove={() => remove(s.id)} />
        ))}

        <button onClick={add}
          className="flex items-center justify-center gap-2 w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1.5px dashed rgba(175,197,255,0.2)', color: 'rgba(175,197,255,0.6)' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          Add another stakeholder
        </button>

        <button onClick={() => canContinue && onContinue?.(stakeholders)} disabled={!canContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: canContinue ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.07)', opacity: canContinue ? 1 : 0.6, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
          Continue
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}
