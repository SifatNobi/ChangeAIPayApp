import { useState } from 'react'
import { type Goal, FUNDING_LABELS } from '@/data/goals'

interface GoalDetailProps {
  goal?: Goal
  onAddFunds?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onBack?: () => void
}

const DEFAULT_GOAL: Goal = {
  id: 'g1', name: 'Emergency Fund', emoji: '🛡️',
  targetAmount: 0, currentAmount: 0,
  fundingMethod: 'paycheck', color: '#3FE7FF',
  targetDate: '2026-12-31', createdAt: '',
}

const CONTRIBUTIONS: { id: string; date: string; amount: number; label: string; type: string }[] = []

const CHART_MONTHS: string[] = []
const CHART_VALUES: number[] = []
const W = 330, H = 100
const PAD = { t: 12, r: 10, b: 18, l: 10 }

function buildChartPath(vals: number[]) {
  const max = Math.max(...vals) || 1
  const cw = W - PAD.l - PAD.r
  const ch = H - PAD.t - PAD.b
  const xs = vals.map((_, i) => PAD.l + (i / (vals.length - 1)) * cw)
  const ys = vals.map(v => PAD.t + (1 - v / max) * ch)
  let line = `M ${xs[0]} ${ys[0]}`
  for (let i = 1; i < xs.length; i++) {
    const cp = (xs[i] + xs[i - 1]) / 2
    line += ` C ${cp} ${ys[i - 1]}, ${cp} ${ys[i]}, ${xs[i]} ${ys[i]}`
  }
  const area = `${line} L ${xs[xs.length - 1]} ${H - PAD.b} L ${xs[0]} ${H - PAD.b} Z`
  return { line, area, xs, ys }
}

type Range = '3M' | '6M' | 'All'

export default function GoalDetail({ goal = DEFAULT_GOAL, onAddFunds, onEdit, onDelete, onBack }: GoalDetailProps) {
  const [range, setRange] = useState<Range>('6M')
  const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
  const remaining = goal.targetAmount - goal.currentAmount

  const { line, area, xs, ys } = buildChartPath(CHART_VALUES)
  const hlIdx = CHART_VALUES.length - 1
  const hlX = xs[hlIdx]
  const hlY = ys[hlIdx]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xl">{goal.emoji}</span>
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">{goal.name}</p>
        </div>
        {/* Edit / Delete */}
        <button onClick={onEdit} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11 2l3 3-8 8H3v-3l8-8Z" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={onDelete} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 5h10M6 5V3h4v2M5.5 5l.5 8h4l.5-8" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Hero: amount + ring */}
        <div
          className="rounded-[--radius-2xl] px-5 py-5 flex flex-col items-center gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          {/* Big ring */}
          <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="38" stroke="rgba(175,197,255,0.1)" strokeWidth="5" fill="none" />
              <circle cx="44" cy="44" r="38" stroke={goal.color} strokeWidth="5" fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - pct / 100)}
                transform="rotate(-90 44 44)"
                style={{ filter: `drop-shadow(0 0 6px ${goal.color}80)` }}
              />
            </svg>
            <span className="absolute font-display text-xl font-extrabold" style={{ color: goal.color }}>{Math.round(pct)}%</span>
          </div>

          <div className="text-center">
            <p
              className="font-display text-3xl font-extrabold tracking-tighter"
              style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              ${goal.currentAmount.toLocaleString()}
            </p>
            <p className="font-body text-xs text-text-muted">of ${goal.targetAmount.toLocaleString()} · ${remaining.toLocaleString()} to go</p>
          </div>

          <div className="flex gap-3 w-full">
            {[
              { label: 'Funding',    value: FUNDING_LABELS[goal.fundingMethod] },
              { label: 'Target date',value: goal.targetDate ? new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'No date set' },
              { label: 'Since',      value: goal.createdAt },
            ].map(s => (
              <div key={s.label} className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.05)' }}>
                <p className="font-body text-[9px] text-text-muted uppercase tracking-wide">{s.label}</p>
                <p className="font-body text-xs font-semibold text-text-2 text-center">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution chart — Chart component design */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden relative"
          style={{ background: 'linear-gradient(160deg, rgba(0,30,80,0.92) 0%, rgba(5,11,45,0.98) 100%)', border: '1px solid rgba(0,102,255,0.2)', boxShadow: '0 0 30px rgba(0,102,255,0.07)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 70%, ${goal.color}10 0%, transparent 70%)` }} />
          <div className="px-4 pt-4 pb-3 flex flex-col gap-3 relative">
            <div className="flex items-center justify-between">
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Contribution Growth</p>
              <div className="flex gap-1.5">
                {(['3M', '6M', 'All'] as Range[]).map(r => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className="h-6 px-2.5 rounded-full font-body text-[10px] font-semibold transition-all duration-[180ms]"
                    style={{
                      background: range === r ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.06)',
                      border: `1px solid ${range === r ? 'rgba(0,102,255,0.5)' : 'rgba(175,197,255,0.12)'}`,
                      color: range === r ? '#AFC5FF' : 'rgba(175,197,255,0.4)',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div style={{ height: H }}>
              <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={goal.color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={goal.color} stopOpacity="0.00" />
                  </linearGradient>
                  <filter id="gGlow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <path d={area} fill="url(#gGrad)" />
                <path d={line} stroke={goal.color} strokeWidth="2.5" strokeOpacity="0.22" fill="none" filter="url(#gGlow)" />
                <path d={line} stroke={goal.color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Highlighted endpoint */}
                <line x1={hlX} y1={hlY} x2={hlX} y2={H - PAD.b} stroke={`${goal.color}30`} strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={hlX} cy={hlY} r="6" fill={`${goal.color}18`} />
                <circle cx={hlX} cy={hlY} r="3.5" fill="#0b1120" stroke={goal.color} strokeWidth="1.5" />
                <circle cx={hlX} cy={hlY} r="1.5" fill={goal.color} />
                {/* Tooltip */}
                <g transform={`translate(${Math.min(hlX - 44, W - 90)}, ${Math.max(hlY - 32, PAD.t)})`}>
                  <rect rx="5" ry="5" width="82" height="24" fill="rgba(13,26,74,0.95)" stroke={`${goal.color}40`} strokeWidth="0.75" />
                  <text x="7" y="10" fontFamily="monospace" fontSize="8" fill={goal.color} fontWeight="600">${goal.currentAmount.toLocaleString()}</text>
                  <text x="7" y="19" fontFamily="sans-serif" fontSize="7" fill="rgba(175,197,255,0.5)">Aug 2026</text>
                </g>
                {/* Month labels */}
                {CHART_MONTHS.map((m, i) => (
                  <text key={m} x={xs[i]} y={H - 2} textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="rgba(175,197,255,0.25)">{m}</text>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Add Funds */}
        <button
          onClick={onAddFunds}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add Funds
        </button>

        {/* Contribution list */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Recent Contributions</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
            {CONTRIBUTIONS.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${goal.color}15`, border: `1px solid ${goal.color}30` }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v8M3.5 5.5L6 8l2.5-2.5M1 11h10" stroke={goal.color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{c.label}</p>
                  <p className="font-body text-xs text-text-muted">{c.date}</p>
                </div>
                <p className="font-body text-sm font-semibold text-success">+${c.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
