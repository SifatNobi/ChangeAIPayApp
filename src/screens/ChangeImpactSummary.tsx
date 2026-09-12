interface ChangeImpactSummaryProps {
  activeConnections?: number
  changeEarned?: number
  rewardsUnlocked?: number
  premiumDays?: number
  weeksOfMomentum?: number
  currentStatus?: string
  currentStatusEmoji?: string
  currentStatusColor?: string
  nextTierLabel?: string
  connectionsToNextTier?: number
  onBack?: () => void
  onInvite?: () => void
  onViewCircle?: () => void
  onViewVault?: () => void
}

export default function ChangeImpactSummary({
  activeConnections = 0,
  changeEarned = 0,
  rewardsUnlocked = 0,
  premiumDays = 0,
  weeksOfMomentum = 0,
  currentStatus = '',
  currentStatusEmoji = '',
  currentStatusColor = '#3FE7FF',
  nextTierLabel = '',
  connectionsToNextTier = 0,
  onBack, onInvite, onViewCircle, onViewVault,
}: ChangeImpactSummaryProps) {
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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Change Impact</p>
          <p className="font-body text-[10px] text-text-muted">Your Circle at a glance</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Status hero */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex items-center gap-4"
          style={{ background: `${currentStatusColor}09`, border: `1.5px solid ${currentStatusColor}35` }}>
          <div className="w-16 h-16 rounded-[22px] flex items-center justify-center text-4xl shrink-0"
            style={{ background: `${currentStatusColor}15`, boxShadow: `0 0 22px ${currentStatusColor}30` }}>
            {currentStatusEmoji}
          </div>
          <div className="flex-1">
            <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-0.5">Current Status</p>
            <p className="font-display text-xl font-extrabold" style={{ color: currentStatusColor }}>{currentStatus}</p>
            <p className="font-body text-[10px] text-text-muted mt-0.5">
              {connectionsToNextTier} more Active Connection{connectionsToNextTier !== 1 ? 's' : ''} to reach {nextTierLabel}
            </p>
          </div>
          <button onClick={onViewCircle}
            className="h-9 px-3 rounded-full font-body text-xs font-semibold shrink-0 transition-all active:scale-[0.96]"
            style={{ background: `${currentStatusColor}12`, border: `1px solid ${currentStatusColor}30`, color: currentStatusColor }}>
            Circle
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: '👥', label: 'Active Connections', value: activeConnections.toString(),       color: '#3FE7FF', action: onViewCircle },
            { icon: '💎', label: 'Change Earned',      value: changeEarned.toLocaleString(),      color: '#F5B700', action: onViewVault  },
            { icon: '🎁', label: 'Rewards Unlocked',   value: rewardsUnlocked.toString(),         color: '#9945FF', action: undefined   },
            { icon: '⭐', label: 'Premium Days',        value: `${premiumDays}d`,                  color: '#9945FF', action: undefined   },
            { icon: '🔥', label: 'Weeks Momentum',     value: `${weeksOfMomentum}wk`,             color: '#FC7E2F', action: undefined   },
          ].map(stat => (
            <button key={stat.label} onClick={stat.action}
              className="flex flex-col gap-2 px-4 py-4 rounded-[--radius-2xl] text-left transition-all"
              style={{ background: `${stat.color}07`, border: `1.5px solid ${stat.color}25`, cursor: stat.action ? 'pointer' : 'default' }}>
              <span className="text-xl">{stat.icon}</span>
              <p className="font-display text-xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="font-body text-[10px] text-text-muted">{stat.label}</p>
            </button>
          ))}
          {/* Spacer for odd grid */}
          <div />
        </div>

        {/* Progress to next tier */}
        <div className="rounded-[--radius-2xl] px-5 py-4"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="flex justify-between items-baseline mb-3">
            <p className="font-body text-sm font-semibold text-text">Progress to {nextTierLabel}</p>
            <p className="font-body text-[10px] text-text-muted">{activeConnections}/{activeConnections + connectionsToNextTier}</p>
          </div>
          <div className="h-2 w-full rounded-full mb-2" style={{ background: 'rgba(175,197,255,0.08)' }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${(activeConnections / (activeConnections + connectionsToNextTier)) * 100}%`, background: 'var(--gradient-primary)' }} />
          </div>
          <p className="font-body text-[10px] text-text-muted">
            Invite {connectionsToNextTier} more and complete onboarding to advance
          </p>
        </div>

        {/* Reminder: Change is not cash */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.18)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 1.5L1.5 12h11L7 1.5Z" stroke="#F87171" strokeWidth="1" fill="none" strokeLinejoin="round" />
            <path d="M7 6v3M7 10.5v.5" stroke="#F87171" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Change is a loyalty currency only — not redeemable for cash. Spend it on Boosts, Premium days, and badges.
          </p>
        </div>

        <button onClick={onInvite}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          Grow Your Circle
        </button>
      </div>
    </div>
  )
}
