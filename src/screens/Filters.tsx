import { useState } from 'react'
import { TX_CATEGORIES } from '@/data/transactions'

interface FiltersProps {
  onApply?: (filters: FilterState) => void
  onReset?: () => void
  onBack?: () => void
}

interface FilterState {
  dateRange: 'any' | '7d' | '30d' | '90d'
  types: string[]
  category: string
  amountMin: string
  amountMax: string
  status: 'any' | 'completed' | 'pending' | 'failed'
}

const DEFAULT_FILTERS: FilterState = {
  dateRange: 'any', types: [], category: 'All', amountMin: '', amountMax: '', status: 'any',
}

const TX_TYPES = ['Sent', 'Received', 'Refund', 'Add Money', 'Withdrawal']
const DATE_RANGES = [
  { id: 'any' as const, label: 'Any time' },
  { id: '7d'  as const, label: 'Last 7 days' },
  { id: '30d' as const, label: 'Last 30 days' },
  { id: '90d' as const, label: 'Last 90 days' },
]
const STATUSES: { id: FilterState['status']; label: string; color: string }[] = [
  { id: 'any',       label: 'Any',       color: 'rgba(175,197,255,0.5)' },
  { id: 'completed', label: 'Completed', color: '#22C55E' },
  { id: 'pending',   label: 'Pending',   color: '#F5B700' },
  { id: 'failed',    label: 'Failed',    color: '#FF4D5A' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">{children}</p>
}

function Chip({ label, active, color, onClick }: { label: string; active: boolean; color?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-8 px-3.5 rounded-full font-body text-xs font-semibold whitespace-nowrap transition-all duration-[180ms]"
      style={{
        background: active ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.05)',
        border: `1px solid ${active ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.12)'}`,
        color: active ? (color ?? '#AFC5FF') : 'rgba(175,197,255,0.45)',
      }}
    >
      {label}
    </button>
  )
}

export default function Filters({ onApply, onReset, onBack }: FiltersProps) {
  const [f, setF] = useState<FilterState>(DEFAULT_FILTERS)

  const toggleType = (t: string) => {
    setF(prev => ({
      ...prev,
      types: prev.types.includes(t) ? prev.types.filter(x => x !== t) : [...prev.types, t],
    }))
  }

  const reset = () => {
    setF(DEFAULT_FILTERS)
    onReset?.()
  }

  const activeCount = (f.dateRange !== 'any' ? 1 : 0) + f.types.length + (f.category !== 'All' ? 1 : 0) +
    (f.amountMin || f.amountMax ? 1 : 0) + (f.status !== 'any' ? 1 : 0)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Filters</p>
        {activeCount > 0 && (
          <div className="h-5 px-2 rounded-full flex items-center" style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.4)' }}>
            <p className="font-body text-[11px] font-bold text-[#AFC5FF]">{activeCount}</p>
          </div>
        )}
        <button onClick={reset} className="font-body text-xs text-text-muted hover:text-text transition-colors">
          Reset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-6" style={{ scrollbarWidth: 'none' }}>
        {/* Date range */}
        <div>
          <SectionLabel>Date Range</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {DATE_RANGES.map(d => (
              <Chip key={d.id} label={d.label} active={f.dateRange === d.id} onClick={() => setF(p => ({ ...p, dateRange: d.id }))} />
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <SectionLabel>Transaction Type</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {TX_TYPES.map(t => (
              <Chip key={t} label={t} active={f.types.includes(t)} onClick={() => toggleType(t)} />
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <SectionLabel>Category</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {TX_CATEGORIES.map(c => (
              <Chip key={c} label={c} active={f.category === c} onClick={() => setF(p => ({ ...p, category: c }))} />
            ))}
          </div>
        </div>

        {/* Amount range */}
        <div>
          <SectionLabel>Amount Range</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-body text-xs text-text-muted mb-1.5">Min ($)</p>
              <input
                type="number"
                inputMode="decimal"
                value={f.amountMin}
                onChange={e => setF(p => ({ ...p, amountMin: e.target.value }))}
                placeholder="0"
                className="w-full h-11 rounded-[--radius-xl] px-3 font-body text-sm text-text placeholder:text-text-muted outline-none"
                style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
              />
            </div>
            <div>
              <p className="font-body text-xs text-text-muted mb-1.5">Max ($)</p>
              <input
                type="number"
                inputMode="decimal"
                value={f.amountMax}
                onChange={e => setF(p => ({ ...p, amountMax: e.target.value }))}
                placeholder="Any"
                className="w-full h-11 rounded-[--radius-xl] px-3 font-body text-sm text-text placeholder:text-text-muted outline-none"
                style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <SectionLabel>Status</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map(s => (
              <Chip key={s.id} label={s.label} active={f.status === s.id} color={s.id !== 'any' ? s.color : undefined} onClick={() => setF(p => ({ ...p, status: s.id }))} />
            ))}
          </div>
        </div>

        {/* Apply */}
        <button
          onClick={() => onApply?.(f)}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M3.5 7h7M6 11h2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Apply Filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>
    </div>
  )
}
