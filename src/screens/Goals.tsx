import { GOALS, type Goal } from '@/data/goals'

interface GoalsProps {
  onCreateGoal?: () => void
  onSelectGoal?: (goal: Goal) => void
  onAutoSave?: () => void
  onBack?: () => void
}

function progressPct(g: Goal) {
  return Math.min((g.currentAmount / g.targetAmount) * 100, 100)
}

// SVG radial progress ring
function ProgressRing({ pct, color, size = 52 }: { pct: number; color: string; size?: number }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(175,197,255,0.1)" strokeWidth="3" fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth="3" fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
      />
    </svg>
  )
}

function GoalCard({ goal, onSelect }: { goal: Goal; onSelect: () => void }) {
  const pct = progressPct(goal)
  const remaining = goal.targetAmount - goal.currentAmount
  const isNearComplete = pct >= 80

  return (
    <button
      onClick={onSelect}
      className="w-full text-left rounded-[--radius-2xl] px-4 py-4 flex items-center gap-4 transition-all duration-[180ms] active:scale-[0.99] hover:bg-surface-hi"
      style={{ background: 'rgba(175,197,255,0.03)', border: `1px solid ${isNearComplete ? goal.color + '30' : 'rgba(175,197,255,0.09)'}` }}
    >
      {/* Ring + emoji */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: 52, height: 52 }}>
        <ProgressRing pct={pct} color={goal.color} size={52} />
        <span className="absolute text-xl" style={{ lineHeight: 1 }}>{goal.emoji}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-body text-sm font-semibold text-text truncate">{goal.name}</p>
          {isNearComplete && (
            <span className="h-4 px-1.5 rounded-full font-body text-[9px] font-bold flex items-center"
              style={{ background: goal.color + '20', color: goal.color, border: `1px solid ${goal.color}40` }}>
              Almost!
            </span>
          )}
        </div>
        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full overflow-hidden mb-1.5" style={{ background: 'rgba(175,197,255,0.08)' }}>
          <div className="h-full rounded-full transition-all duration-[600ms]"
            style={{ width: `${pct}%`, background: goal.color, boxShadow: `0 0 6px ${goal.color}80` }} />
        </div>
        <p className="font-body text-[10px] text-text-muted">
          ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()} · ${remaining.toLocaleString()} to go
        </p>
      </div>

      {/* Percentage */}
      <div className="flex flex-col items-end shrink-0">
        <p className="font-display text-lg font-extrabold" style={{ color: goal.color }}>{Math.round(pct)}%</p>
        {goal.targetDate && (
          <p className="font-body text-[9px] text-text-muted">{new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
        )}
      </div>
    </button>
  )
}

export default function Goals({ onCreateGoal, onSelectGoal, onAutoSave, onBack }: GoalsProps) {
  const totalSaved = GOALS.reduce((s, g) => s + g.currentAmount, 0)
  const totalTarget = GOALS.reduce((s, g) => s + g.targetAmount, 0)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Goals</p>
        <button
          onClick={onAutoSave}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold transition-all hover:bg-surface-hi"
          style={{ border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v2M6 9v2M1 6h2M9 6h2M2.64 2.64l1.42 1.42M7.94 7.94l1.42 1.42M2.64 9.36l1.42-1.42M7.94 4.06l1.42-1.42"
              stroke="#AFC5FF" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          Auto Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Portfolio summary */}
        <div
          className="rounded-[--radius-2xl] px-5 py-4 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <div>
            <p className="font-body text-xs text-text-muted mb-0.5">Total saved</p>
            <p
              className="font-display text-3xl font-extrabold tracking-tighter"
              style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              ${totalSaved.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-body text-xs text-text-muted">across {GOALS.length} goals</p>
            <p className="font-body text-xs font-semibold text-text-2">
              ${totalTarget.toLocaleString()} total target
            </p>
          </div>
        </div>

        {/* Goal list */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Your Goals</p>
          <div className="flex flex-col gap-3">
            {GOALS.map(g => (
              <GoalCard key={g.id} goal={g} onSelect={() => onSelectGoal?.(g)} />
            ))}
          </div>
        </div>

        {/* Create Goal CTA */}
        <button
          onClick={onCreateGoal}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Create New Goal
        </button>

        {/* Auto Save promo */}
        <button
          onClick={onAutoSave}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-[--radius-2xl] text-left transition-all duration-[180ms] active:scale-[0.99]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.2)' }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.2)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2v4M10 14v4M4 10H2M18 10h-2M5.64 5.64l1.42 1.42M12.94 12.94l1.42 1.42" stroke="#3FE7FF" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="10" cy="10" r="3" stroke="#3FE7FF" strokeWidth="1.4" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">Auto Save</p>
            <p className="font-body text-xs text-text-muted">Round-up sweeps &amp; paycheck splits — set it and forget it</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="rgba(63,231,255,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
