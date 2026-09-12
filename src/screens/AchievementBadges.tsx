import { useState } from 'react'

type BadgeSystem = 'wellness' | 'circle'
type BadgeStatus = 'earned' | 'inProgress' | 'locked'

interface Badge {
  id: string
  emoji: string
  name: string
  description: string
  system: BadgeSystem
  status: BadgeStatus
  earnedDate?: string
  progress?: number
  progressMax?: number
  color: string
}

const BADGES: Badge[] = [
  // Wellness badges
  { id: 'w1', emoji: '🎯', name: 'First Goal',       description: 'Complete your very first savings goal',         system: 'wellness', status: 'locked', color: '#22C55E' },
  { id: 'w2', emoji: '🔥', name: '30-Day Streak',    description: '30 consecutive days of consistent saving',      system: 'wellness', status: 'locked', color: '#FC7E2F' },
  { id: 'w3', emoji: '🛡️', name: 'Budget Guardian',  description: 'Stay within budget for a full calendar month',  system: 'wellness', status: 'locked', color: '#0066FF' },
  { id: 'w4', emoji: '🌱', name: 'Consistent Saver', description: 'AutoSave active for 3 consecutive months',      system: 'wellness', status: 'locked', color: '#3FE7FF' },
  { id: 'w5', emoji: '💰', name: 'Goal Tripler',     description: 'Reach 3 savings goals simultaneously',          system: 'wellness', status: 'locked', color: '#F5B700' },
  { id: 'w6', emoji: '📊', name: 'Insight Reader',   description: 'Review a Fina spending report 5 times',        system: 'wellness', status: 'locked', color: '#9945FF' },
  { id: 'w7', emoji: '⭐', name: '90-Day Streak',    description: '90 consecutive days of saving activity',        system: 'wellness', status: 'locked', color: '#FFD700' },
  { id: 'w8', emoji: '🏦', name: 'Debt-Free Step',   description: 'Pay off a recurring debt tracked in app',      system: 'wellness', status: 'locked', color: '#AFC5FF' },

  // Circle / status badges
  { id: 'c1', emoji: '✨', name: 'First Spark',     description: 'First active connection in your Change Circle',  system: 'circle',   status: 'locked', color: '#F5B700' },
  { id: 'c2', emoji: '🔗', name: 'Connector',       description: '3 active connections in your Change Circle',    system: 'circle',   status: 'locked', color: '#3FE7FF' },
  { id: 'c3', emoji: '📡', name: 'Amplifier',       description: '5 active connections in your Change Circle',    system: 'circle',   status: 'locked', color: '#0066FF' },
  { id: 'c4', emoji: '⚡', name: 'Change Maker',    description: '10 active connections in your Change Circle',   system: 'circle',   status: 'locked', color: '#9945FF' },
  { id: 'c5', emoji: '🌀', name: 'Catalyst',        description: '25 active connections in your Change Circle',   system: 'circle',   status: 'locked', color: '#FC7E2F' },
  { id: 'c6', emoji: '🏆', name: 'Legend',          description: '50 active connections in your Change Circle',   system: 'circle',   status: 'locked', color: '#FFD700' },
]

const STATUS_ORDER: BadgeStatus[] = ['earned', 'inProgress', 'locked']

interface AchievementBadgesProps {
  onBack?: () => void
  onViewCircle?: () => void
}

export default function AchievementBadges({ onBack, onViewCircle }: AchievementBadgesProps) {
  const [filter, setFilter] = useState<BadgeSystem | 'all'>('all')
  const [selected, setSelected] = useState<Badge | null>(null)

  const visible = BADGES
    .filter(b => filter === 'all' || b.system === filter)
    .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status))

  const earned    = BADGES.filter(b => b.status === 'earned').length
  const total     = BADGES.length
  const earnedWellness = BADGES.filter(b => b.system === 'wellness' && b.status === 'earned').length
  const earnedCircle   = BADGES.filter(b => b.system === 'circle'  && b.status === 'earned').length

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Achievement Badges</p>
          <p className="font-body text-[10px] text-text-muted">{earned} of {total} earned</p>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex gap-2.5 px-5 pb-3 shrink-0">
        {[
          { id: 'all',      label: `All (${earned}/${total})`,                      color: '#3FE7FF' },
          { id: 'wellness', label: `Wellness (${earnedWellness}/${BADGES.filter(b => b.system === 'wellness').length})`, color: '#22C55E' },
          { id: 'circle',   label: `Circle (${earnedCircle}/${BADGES.filter(b => b.system === 'circle').length})`,   color: '#F5B700' },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id as typeof filter)}
            className="h-8 px-3 rounded-full font-body text-[10px] font-semibold transition-all shrink-0"
            style={{ background: filter === f.id ? `${f.color}12` : 'rgba(175,197,255,0.05)', border: `1px solid ${filter === f.id ? `${f.color}35` : 'rgba(175,197,255,0.1)'}`, color: filter === f.id ? f.color : 'rgba(175,197,255,0.45)' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Progress bar */}
        <div className="flex gap-2 items-center">
          <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.08)' }}>
            <div className="h-full rounded-full" style={{ width: `${(earned / total) * 100}%`, background: 'var(--gradient-primary)' }} />
          </div>
          <p className="font-body text-[10px] text-text-muted shrink-0">{earned}/{total}</p>
        </div>

        {/* Badge grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {visible.map(b => (
            <button key={b.id} onClick={() => setSelected(b === selected ? null : b)}
              className="flex flex-col items-center gap-2 px-2 py-3.5 rounded-[--radius-2xl] text-center transition-all active:scale-[0.94]"
              style={{
                background: b.status === 'earned' ? `${b.color}09` : 'rgba(175,197,255,0.02)',
                border: `1.5px solid ${b.status === 'earned' ? `${b.color}35` : selected?.id === b.id ? `${b.color}25` : 'rgba(175,197,255,0.08)'}`,
                opacity: b.status === 'locked' ? 0.4 : 1,
              }}>
              <span className="text-3xl" style={{ filter: b.status === 'locked' ? 'grayscale(1)' : 'none' }}>{b.emoji}</span>
              <p className="font-body text-[9px] font-semibold leading-tight" style={{ color: b.status === 'earned' ? b.color : 'rgba(175,197,255,0.55)' }}>{b.name}</p>
              {b.status === 'earned' && <span className="text-[8px] text-text-muted">{b.earnedDate}</span>}
              {b.status === 'inProgress' && b.progress !== undefined && (
                <div className="w-full px-1">
                  <div className="h-1 rounded-full" style={{ background: 'rgba(175,197,255,0.1)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(b.progress / b.progressMax!) * 100}%`, background: b.color }} />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Selected badge detail */}
        {selected && (
          <div className="animate-fade-in rounded-[--radius-2xl] px-4 py-4 flex items-start gap-3"
            style={{ background: `${selected.color}09`, border: `1.5px solid ${selected.color}30` }}>
            <span className="text-2xl shrink-0">{selected.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-display text-sm font-extrabold" style={{ color: selected.color }}>{selected.name}</p>
                <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: selected.status === 'earned' ? 'rgba(34,197,94,0.1)' : selected.status === 'inProgress' ? 'rgba(245,183,0,0.1)' : 'rgba(175,197,255,0.07)', color: selected.status === 'earned' ? '#22C55E' : selected.status === 'inProgress' ? '#F5B700' : 'rgba(175,197,255,0.4)' }}>
                  {selected.status === 'earned' ? 'Earned' : selected.status === 'inProgress' ? 'In progress' : 'Locked'}
                </span>
              </div>
              <p className="font-body text-[10px] text-text-muted leading-relaxed">{selected.description}</p>
              {selected.status === 'inProgress' && selected.progress !== undefined && (
                <p className="font-body text-[10px] mt-1.5" style={{ color: selected.color }}>
                  {selected.progress} / {selected.progressMax} complete
                </p>
              )}
              {selected.system === 'circle' && selected.status !== 'earned' && (
                <button onClick={onViewCircle}
                  className="mt-2 font-body text-[10px] font-semibold underline underline-offset-2"
                  style={{ color: selected.color }}>
                  Go to Change Circle →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Cross-system note */}
        <div className="rounded-[--radius-xl] px-4 py-3"
          style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.18)' }}>
          <p className="font-body text-xs font-semibold text-text mb-0.5">Two systems, one identity</p>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Wellness badges are earned by saving and budgeting. Circle badges are earned by building your Change Circle. Both appear here as part of your ChangeAIPay identity.
          </p>
        </div>
      </div>
    </div>
  )
}
