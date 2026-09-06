interface MilestoneUnlocksProps {
  activeConnections?: number
  onBack?: () => void
  onInvite?: () => void
}

interface Milestone {
  connections: number
  change: number
  premiumDays: number
  badge: string
  badgeEmoji: string
  color: string
  tagline: string
}

const MILESTONES: Milestone[] = [
  { connections: 1,   change: 500,    premiumDays: 3,   badge: 'First Spark',  badgeEmoji: '✨', color: '#F5B700', tagline: 'Your Circle begins.' },
  { connections: 3,   change: 1000,   premiumDays: 7,   badge: 'Connector',    badgeEmoji: '🔗', color: '#3FE7FF', tagline: 'Three people trust you.' },
  { connections: 5,   change: 2000,   premiumDays: 14,  badge: 'Amplifier',    badgeEmoji: '📡', color: '#0066FF', tagline: 'Your signal is growing.' },
  { connections: 10,  change: 5000,   premiumDays: 30,  badge: 'Change Maker', badgeEmoji: '⚡', color: '#9945FF', tagline: 'Double digits. Real momentum.' },
  { connections: 25,  change: 12000,  premiumDays: 60,  badge: 'Catalyst',     badgeEmoji: '🌀', color: '#FC7E2F', tagline: 'Your network effect is felt.' },
  { connections: 50,  change: 25000,  premiumDays: 90,  badge: 'Legend',       badgeEmoji: '🏆', color: '#FFD700', tagline: 'Few reach this. Remarkable.' },
  { connections: 100, change: 75000,  premiumDays: 180, badge: 'Legend+',      badgeEmoji: '🌟', color: '#FFFFFF', tagline: 'Unprecedented. You built something.' },
]

function fmtChange(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `${n}`
}

export default function MilestoneUnlocks({ activeConnections = 3, onBack, onInvite }: MilestoneUnlocksProps) {
  const nextMilestone = MILESTONES.find(m => m.connections > activeConnections)

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Milestone Unlocks</p>
          <p className="font-body text-[10px] text-text-muted">{activeConnections} Active Connections · {nextMilestone ? `${nextMilestone.connections - activeConnections} to next` : 'All unlocked'}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {/* Progress bar to next */}
        {nextMilestone && (
          <div className="rounded-[--radius-xl] px-4 py-3.5"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
            <div className="flex justify-between mb-2">
              <p className="font-body text-xs font-semibold text-text">Next: {nextMilestone.badge} {nextMilestone.badgeEmoji}</p>
              <p className="font-body text-[10px] text-text-muted">{activeConnections}/{nextMilestone.connections}</p>
            </div>
            <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(175,197,255,0.08)' }}>
              <div className="h-full rounded-full"
                style={{ width: `${(activeConnections / nextMilestone.connections) * 100}%`, background: `linear-gradient(90deg, ${nextMilestone.color}99, ${nextMilestone.color})` }} />
            </div>
          </div>
        )}

        {/* Milestone cards */}
        {MILESTONES.map(m => {
          const reached = activeConnections >= m.connections
          const isCurrent = activeConnections >= m.connections && (!MILESTONES.find(x => x.connections > m.connections && activeConnections >= x.connections))
          const isNext = m.connections === nextMilestone?.connections
          return (
            <div key={m.connections}
              className="rounded-[--radius-2xl] overflow-hidden transition-all"
              style={{ background: reached ? `${m.color}09` : 'rgba(175,197,255,0.02)', border: `1.5px solid ${reached ? `${m.color}35` : isNext ? `${m.color}25` : 'rgba(175,197,255,0.08)'}`, opacity: reached || isNext ? 1 : 0.5 }}>
              {/* Top bar */}
              <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className="w-11 h-11 rounded-[15px] flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${m.color}15`, boxShadow: reached ? `0 0 14px ${m.color}25` : 'none' }}>
                  {reached ? m.badgeEmoji : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3.5" y="6.5" width="7" height="6" rx="1" stroke="rgba(175,197,255,0.25)" strokeWidth="1" /><path d="M5 6.5V5a2 2 0 0 1 4 0v1.5" stroke="rgba(175,197,255,0.25)" strokeWidth="1" strokeLinecap="round" /></svg>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm font-extrabold" style={{ color: reached ? m.color : 'rgba(175,197,255,0.4)' }}>{m.badge}</p>
                    {isCurrent && <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${m.color}18`, color: m.color }}>Current</span>}
                    {isNext && !reached && <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(175,197,255,0.08)', color: 'rgba(175,197,255,0.5)' }}>Next up</span>}
                  </div>
                  <p className="font-body text-[10px] text-text-muted">{m.connections} Active Connection{m.connections !== 1 ? 's' : ''} · {m.tagline}</p>
                </div>
              </div>
              {/* Rewards row */}
              <div className="flex gap-2 px-4 pb-4">
                {[
                  { icon: '💎', label: `${fmtChange(m.change)} Change`, color: '#F5B700' },
                  { icon: '⭐', label: `${m.premiumDays}d Premium`, color: '#9945FF' },
                  { icon: m.badgeEmoji, label: m.badge + ' badge', color: m.color },
                ].map(r => (
                  <div key={r.label} className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-[--radius-xl]"
                    style={{ background: reached ? `${r.color}0E` : 'rgba(175,197,255,0.04)', border: `1px solid ${reached ? `${r.color}25` : 'rgba(175,197,255,0.07)'}` }}>
                    <span className="text-base">{r.icon}</span>
                    <p className="font-body text-[9px] font-semibold text-center leading-tight" style={{ color: reached ? r.color : 'rgba(175,197,255,0.3)' }}>{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <button onClick={onInvite}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
          style={{ background: 'var(--gradient-primary)' }}>
          Invite to Unlock More
        </button>
      </div>
    </div>
  )
}
