import { useState } from 'react'
import { GOALS } from '@/data/goals'

interface AutoSaveProps {
  onBack?: () => void
  onHistory?: () => void
}

// Paycheck split buckets
interface Bucket { id: string; label: string; color: string; pct: number; emoji: string }

const DEFAULT_BUCKETS: Bucket[] = [
  { id: 'rent',      label: 'Rent / Housing', color: '#3FE7FF', pct: 30, emoji: '🏠' },
  { id: 'taxes',     label: 'Taxes',          color: '#F5B700', pct: 20, emoji: '📋' },
  { id: 'investing', label: 'Investing',      color: '#9945FF', pct: 10, emoji: '📈' },
  { id: 'savings',   label: 'Savings Goals',  color: '#22C55E', pct: 15, emoji: '🎯' },
  { id: 'spending',  label: 'Spending',       color: '#FC7E2F', pct: 25, emoji: '💳' },
]

const PAYCHECK_AMOUNT = 0

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)) }

function SliderRow({ bucket, onChange }: { bucket: Bucket; onChange: (id: string, pct: number) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{bucket.emoji}</span>
          <p className="font-body text-sm font-semibold text-text">{bucket.label}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-body text-xs font-bold" style={{ color: bucket.color }}>{bucket.pct}%</p>
          <p className="font-body text-xs text-text-muted w-14 text-right">${Math.round(PAYCHECK_AMOUNT * bucket.pct / 100)}</p>
        </div>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(175,197,255,0.1)' }}>
          <div className="h-full rounded-full transition-all duration-[150ms]"
            style={{ width: `${bucket.pct}%`, background: bucket.color, boxShadow: `0 0 6px ${bucket.color}60` }} />
        </div>
        <input
          type="range"
          min={0} max={100} step={1}
          value={bucket.pct}
          onChange={e => onChange(bucket.id, parseInt(e.target.value))}
          className="absolute inset-x-0 w-full opacity-0 h-6 cursor-pointer"
          style={{ zIndex: 1 }}
        />
        {/* Thumb */}
        <div
          className="absolute h-5 w-5 rounded-full border-2 pointer-events-none"
          style={{ left: `calc(${bucket.pct}% - 10px)`, background: '#0b1120', borderColor: bucket.color, boxShadow: `0 0 8px ${bucket.color}80` }}
        />
      </div>
    </div>
  )
}

export default function AutoSave({ onBack, onHistory }: AutoSaveProps) {
  const [paycheckEnabled, setPaycheckEnabled] = useState(true)
  const [roundupEnabled, setRoundupEnabled] = useState(true)
  const [buckets, setBuckets] = useState<Bucket[]>(DEFAULT_BUCKETS)
  const [roundupGoalId, setRoundupGoalId] = useState(GOALS[0]?.id ?? '')
  const [roundupAccount, setRoundupAccount] = useState<'checking' | 'debit'>('debit')

  const totalPct = buckets.reduce((s, b) => s + b.pct, 0)
  const isBalanced = totalPct === 100

  const handleSlider = (id: string, newPct: number) => {
    setBuckets(prev => prev.map(b => b.id === id ? { ...b, pct: clamp(newPct, 0, 100) } : b))
  }

  const roundupGoal = GOALS.find(g => g.id === roundupGoalId)
  const monthlyRoundup = 0

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Auto Save</p>
        <button onClick={onHistory}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold transition-all hover:bg-surface-hi"
          style={{ border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}>
          History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Paycheck Split card */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'linear-gradient(160deg, rgba(0,30,80,0.92) 0%, rgba(5,11,45,0.98) 100%)', border: '1px solid rgba(0,102,255,0.2)' }}>
          {/* Header row */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="5" width="13" height="8.5" rx="1.5" stroke="#3FE7FF" strokeWidth="1.2" />
                <path d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5V5" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M1.5 8.5h13" stroke="#3FE7FF" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-text">Smart Paycheck Split</p>
              <p className="font-body text-[10px] text-text-muted">Fina auto-allocates each direct deposit</p>
            </div>
            {/* Toggle */}
            <button
              onClick={() => setPaycheckEnabled(p => !p)}
              className="relative w-11 h-6 rounded-full transition-all duration-[200ms]"
              style={{ background: paycheckEnabled ? '#0066FF' : 'rgba(175,197,255,0.15)', boxShadow: paycheckEnabled ? '0 0 10px rgba(0,102,255,0.4)' : 'none' }}>
              <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-[200ms]"
                style={{ left: paycheckEnabled ? 'calc(100% - 22px)' : '2px' }} />
            </button>
          </div>

          {paycheckEnabled && (
            <div className="px-4 pb-4 flex flex-col gap-4">
              {/* Paycheck amount pill */}
              <div className="flex items-center justify-between h-10 px-3 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
                <p className="font-body text-xs text-text-muted">Paycheck estimate</p>
                <p className="font-body text-sm font-bold text-text">${PAYCHECK_AMOUNT.toLocaleString()}</p>
              </div>

              {/* Balance warning */}
              {!isBalanced && (
                <div className="rounded-[--radius-xl] px-3 py-2.5 flex items-center gap-2"
                  style={{ background: 'rgba(245,87,0,0.08)', border: '1px solid rgba(245,87,0,0.2)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.5L1 10h10L6 1.5Z" stroke="#F55700" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M6 5v2.5" stroke="#F55700" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="6" cy="9" r="0.5" fill="#F55700" />
                  </svg>
                  <p className="font-body text-[11px]" style={{ color: '#F55700' }}>
                    Total is {totalPct}% — must equal 100%
                  </p>
                </div>
              )}

              {/* Sliders */}
              <div className="flex flex-col gap-4">
                {buckets.map(b => <SliderRow key={b.id} bucket={b} onChange={handleSlider} />)}
              </div>

              {/* Donut-style total bar */}
              <div className="rounded-[--radius-xl] px-3 py-2.5 flex items-center gap-3"
                style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}>
                <div className="h-2 flex-1 rounded-full overflow-hidden flex" style={{ background: 'rgba(175,197,255,0.1)' }}>
                  {buckets.map(b => (
                    <div key={b.id} className="h-full transition-all duration-[150ms]" style={{ width: `${b.pct}%`, background: b.color }} />
                  ))}
                </div>
                <p className="font-body text-xs font-bold shrink-0" style={{ color: isBalanced ? '#22C55E' : '#F55700' }}>
                  {totalPct}%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Round-Up card */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'linear-gradient(160deg, rgba(0,30,80,0.92) 0%, rgba(5,11,45,0.98) 100%)', border: '1px solid rgba(63,231,255,0.2)' }}>
          {/* Header row */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.25)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 12l4-4 2.5 2.5 5.5-6.5" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-text">Round-Up</p>
              <p className="font-body text-[10px] text-text-muted">Spare change swept to a goal</p>
            </div>
            <button
              onClick={() => setRoundupEnabled(p => !p)}
              className="relative w-11 h-6 rounded-full transition-all duration-[200ms]"
              style={{ background: roundupEnabled ? '#3FE7FF' : 'rgba(175,197,255,0.15)', boxShadow: roundupEnabled ? '0 0 10px rgba(63,231,255,0.4)' : 'none' }}>
              <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-[200ms]"
                style={{ left: roundupEnabled ? 'calc(100% - 22px)' : '2px', background: roundupEnabled ? '#0b1120' : 'white' }} />
            </button>
          </div>

          {roundupEnabled && (
            <div className="px-4 pb-4 flex flex-col gap-3">
              {/* Monthly estimate */}
              <div className="flex items-center justify-between h-10 px-3 rounded-[--radius-xl]"
                style={{ background: 'rgba(63,231,255,0.06)', border: '1px solid rgba(63,231,255,0.15)' }}>
                <p className="font-body text-xs text-text-muted">Est. this month</p>
                <p className="font-body text-sm font-bold" style={{ color: '#3FE7FF' }}>+${monthlyRoundup.toFixed(2)}</p>
              </div>

              {/* Account selector */}
              <div>
                <p className="font-body text-[10px] text-text-muted uppercase tracking-wider mb-2">Round up from</p>
                <div className="flex gap-2">
                  {(['debit', 'checking'] as const).map(a => (
                    <button key={a} onClick={() => setRoundupAccount(a)}
                      className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                      style={{ background: roundupAccount === a ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.04)', border: `1px solid ${roundupAccount === a ? 'rgba(63,231,255,0.35)' : 'rgba(175,197,255,0.1)'}`, color: roundupAccount === a ? '#3FE7FF' : 'rgba(175,197,255,0.4)' }}>
                      {a === 'debit' ? 'Debit card' : 'Checking account'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal selector */}
              <div>
                <p className="font-body text-[10px] text-text-muted uppercase tracking-wider mb-2">Sweep to goal</p>
                <div className="flex flex-col gap-1.5 rounded-[--radius-xl] overflow-hidden"
                  style={{ border: '1px solid rgba(175,197,255,0.1)' }}>
                  {GOALS.map((g, i) => (
                    <button key={g.id} onClick={() => setRoundupGoalId(g.id)}
                      className="flex items-center gap-3 px-3 py-2.5 text-left transition-all"
                      style={{ background: roundupGoalId === g.id ? 'rgba(0,102,255,0.1)' : i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                      <span className="text-base">{g.emoji}</span>
                      <div className="flex-1">
                        <p className="font-body text-xs font-semibold text-text">{g.name}</p>
                        <p className="font-body text-[9px] text-text-muted">{Math.round((g.currentAmount / g.targetAmount) * 100)}% funded</p>
                      </div>
                      {roundupGoalId === g.id && (
                        <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                          style={{ background: '#0066FF' }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              {roundupGoal && (
                <div className="flex items-center gap-3 px-3 py-3 rounded-[--radius-xl]"
                  style={{ background: `${roundupGoal.color}08`, border: `1px solid ${roundupGoal.color}25` }}>
                  <span className="text-lg">{roundupGoal.emoji}</span>
                  <div className="flex-1">
                    <p className="font-body text-xs font-semibold text-text">{roundupGoal.name}</p>
                    <p className="font-body text-[9px] text-text-muted">
                      +${monthlyRoundup.toFixed(2)}/mo · ${(roundupGoal.currentAmount + monthlyRoundup).toLocaleString()} projected
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fina AI note */}
        <div className="rounded-[--radius-2xl] px-4 py-3.5 flex items-start gap-3"
          style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.2)' }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#AFC5FF" strokeWidth="1.1" />
              <path d="M5 7a2 2 0 1 1 4 0" stroke="#AFC5FF" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="7" cy="10" r="0.6" fill="#AFC5FF" />
            </svg>
          </div>
          <div>
            <p className="font-body text-xs font-semibold text-text mb-0.5">Fina AI suggestion</p>
            <p className="font-body text-[11px] text-text-muted leading-relaxed">
              Based on your spending, I suggest bumping Savings Goals to 20% and reducing Spending to 20% — you can hit your Emergency Fund target 3 months sooner.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
