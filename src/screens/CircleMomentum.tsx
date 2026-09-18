import { useState } from 'react'

type StatusTier = 'first_spark' | 'connector' | 'amplifier' | 'change_maker' | 'catalyst' | 'legend'

const TIER_CONFIG: Record<StatusTier, { label: string; emoji: string; color: string; minConnections: number; description: string }> = {
  first_spark:  { label: 'First Spark',  emoji: '✨', color: '#F5B700', minConnections: 1,   description: 'You made the first move. Your Circle has begun.' },
  connector:    { label: 'Connector',    emoji: '🔗', color: '#3FE7FF', minConnections: 3,   description: 'Three people trust your recommendation. Real momentum.' },
  amplifier:    { label: 'Amplifier',    emoji: '📡', color: '#0066FF', minConnections: 5,   description: 'Your Circle is resonating. Fina is taking note.' },
  change_maker: { label: 'Change Maker', emoji: '⚡', color: '#9945FF', minConnections: 10,  description: 'Double digits. You are actively reshaping who uses ChangeAIPay.' },
  catalyst:     { label: 'Catalyst',     emoji: '🌀', color: '#FC7E2F', minConnections: 25,  description: 'Your network effect is measurable and real.' },
  legend:       { label: 'Legend',       emoji: '🏆', color: '#FFD700', minConnections: 50,  description: 'Few reach this. Your Circle is a force.' },
}

const TIERS = Object.values(TIER_CONFIG)

const MOMENTUM_FACTORS = [
  { label: 'Active Connections',    value: '+60 pts',  weight: 60, description: 'Each verified active referral in your Circle' },
  { label: 'New this month',        value: '+25 pts',  weight: 25, description: 'Connections who completed onboarding this month' },
  { label: 'Circle activity',       value: '+10 pts',  weight: 10, description: 'Your Circle members are actively using the app' },
  { label: 'Consistency streak',    value: '+5 pts',   weight: 5,  description: 'Months in a row with at least one new active connection' },
]

interface CircleMomentumProps {
  activeConnections?: number
  momentumScore?: number
  onBack?: () => void
  onViewMilestones?: () => void
  onInvite?: () => void
}

export default function CircleMomentum({ activeConnections = 0, momentumScore = 0, onBack, onViewMilestones, onInvite }: CircleMomentumProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  const currentTier = TIERS.slice().reverse().find(t => activeConnections >= t.minConnections) ?? TIER_CONFIG['first_spark']
  const nextTier = TIERS.find(t => t.minConnections > activeConnections)
  const progressToNext = nextTier ? Math.min((activeConnections / nextTier.minConnections) * 100, 100) : 100

  const scoreMax = 500
  const scorePct = Math.min((momentumScore / scoreMax) * 100, 100)

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Momentum & Status</p>
          <p className="font-body text-[10px] text-text-muted">Your Circle's energy</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Momentum score */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.25)' }}>
          <div className="flex items-start gap-4">
            {/* Radial score ring */}
            <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" stroke="rgba(175,197,255,0.1)" strokeWidth="6" fill="none" />
                <circle cx="40" cy="40" r="34" stroke="url(#momGrad)" strokeWidth="6" fill="none"
                  strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - scorePct / 100)}`}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '40px 40px' }} />
                <defs>
                  <linearGradient id="momGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3FE7FF" />
                    <stop offset="100%" stopColor="#0066FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-mono text-base font-bold text-text">{momentumScore}</p>
                <p className="font-body text-[8px] text-text-muted">pts</p>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="font-display text-lg font-extrabold text-text">Momentum</p>
              <p className="font-body text-xs text-text-muted mt-1 leading-relaxed">
                A motivational score that rises with every new active referral and continued Circle activity. Not a financial metric.
              </p>
            </div>
          </div>
          <button onClick={() => setShowBreakdown(p => !p)}
            className="flex items-center gap-2 font-body text-[10px] font-semibold"
            style={{ color: '#3FE7FF' }}>
            {showBreakdown ? 'Hide breakdown' : 'See how this is calculated'}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              style={{ transform: showBreakdown ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
              <path d="M2 3.5l3 3 3-3" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {showBreakdown && (
            <div className="flex flex-col gap-1.5 pt-1 animate-fade-in">
              {MOMENTUM_FACTORS.map(f => (
                <div key={f.label} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                    style={{ background: `rgba(63,231,255,${f.weight / 60})` }} />
                  <div className="flex-1">
                    <p className="font-body text-[10px] font-semibold text-text">{f.label}
                      <span className="ml-2 font-mono text-[9px]" style={{ color: '#3FE7FF' }}>{f.value}</span>
                    </p>
                    <p className="font-body text-[9px] text-text-muted">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current status badge */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex items-center gap-4"
          style={{ background: `${currentTier.color}0C`, border: `1.5px solid ${currentTier.color}33` }}>
          <div className="w-14 h-14 rounded-[20px] flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${currentTier.color}15`, boxShadow: `0 0 20px ${currentTier.color}30` }}>
            {currentTier.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-display text-base font-extrabold" style={{ color: currentTier.color }}>{currentTier.label}</p>
              <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${currentTier.color}18`, color: currentTier.color, border: `1px solid ${currentTier.color}30` }}>Current</span>
            </div>
            <p className="font-body text-xs text-text-muted leading-relaxed">{currentTier.description}</p>
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && (
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Next tier: {nextTier.label} {nextTier.emoji}</p>
              <p className="font-body text-[10px] text-text-muted">{activeConnections}/{nextTier.minConnections}</p>
            </div>
            <div className="h-2 w-full rounded-full mb-2" style={{ background: 'rgba(175,197,255,0.08)' }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${progressToNext}%`, background: `linear-gradient(90deg, ${currentTier.color}, ${nextTier.color})` }} />
            </div>
            <p className="font-body text-[10px] text-text-muted">
              {nextTier.minConnections - activeConnections} more Active Connection{nextTier.minConnections - activeConnections !== 1 ? 's' : ''} to reach {nextTier.label}
            </p>
          </div>
        )}

        {/* All tiers */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Status Ladder</p>
          <div className="flex flex-col gap-2">
            {TIERS.map(tier => {
              const reached = activeConnections >= tier.minConnections
              const isCurrent = tier.label === currentTier.label
              return (
                <div key={tier.label} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
                  style={{ background: isCurrent ? `${tier.color}0A` : reached ? 'rgba(175,197,255,0.03)' : 'transparent', border: `1px solid ${isCurrent ? `${tier.color}30` : reached ? 'rgba(175,197,255,0.09)' : 'rgba(175,197,255,0.05)'}`, opacity: reached ? 1 : 0.45 }}>
                  <span className="text-lg">{tier.emoji}</span>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-text">{tier.label}</p>
                    <p className="font-body text-[10px] text-text-muted">{tier.minConnections} Active Connection{tier.minConnections !== 1 ? 's' : ''}</p>
                  </div>
                  {reached && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke={tier.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-2.5">
          <button onClick={onViewMilestones}
            className="flex-1 h-12 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.7)' }}>
            Milestone Unlocks
          </button>
          <button onClick={onInvite}
            className="flex-1 h-12 rounded-[--radius-2xl] font-body text-xs font-semibold text-white transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}>
            Invite to Circle
          </button>
        </div>
      </div>
    </div>
  )
}
