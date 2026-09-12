import { useState } from 'react'

type ChallengeStatus = 'active' | 'upcoming' | 'completed'

interface Challenge {
  id: string
  title: string
  description: string
  emoji: string
  color: string
  status: ChallengeStatus
  startDate: string
  endDate: string
  participantsK: number
  progressPct?: number
  joined: boolean
  reward: string
  daysLeft?: number
}

const INITIAL: Challenge[] = []

interface CommunityChallengesProps {
  onBack?: () => void
  onViewLeaderboard?: () => void
}

export default function CommunityChallenges({ onBack, onViewLeaderboard }: CommunityChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL)
  const [celebrating, setCelebrating] = useState<string | null>(null)

  const toggle = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id !== id) return c
      if (!c.joined) {
        setCelebrating(id)
        setTimeout(() => setCelebrating(null), 1800)
      }
      return { ...c, joined: !c.joined }
    }))
  }

  const active    = challenges.filter(c => c.status === 'active')
  const upcoming  = challenges.filter(c => c.status === 'upcoming')
  const completed = challenges.filter(c => c.status === 'completed')

  const ChallengeCard = ({ c }: { c: Challenge }) => (
    <div className="rounded-[--radius-2xl] overflow-hidden"
      style={{ background: c.joined ? `${c.color}07` : 'rgba(175,197,255,0.03)', border: `1.5px solid ${c.joined ? `${c.color}35` : 'rgba(175,197,255,0.09)'}` }}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-[15px] flex items-center justify-center text-2xl shrink-0"
            style={{ background: `${c.color}15`, boxShadow: c.joined ? `0 0 14px ${c.color}25` : 'none' }}>
            {c.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-display text-sm font-extrabold text-text">{c.title}</p>
              {c.joined && c.status !== 'completed' && (
                <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${c.color}18`, color: c.color }}>Joined</span>
              )}
              {c.status === 'completed' && (
                <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(175,197,255,0.07)', color: 'rgba(175,197,255,0.4)' }}>Ended</span>
              )}
            </div>
            <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed">{c.description}</p>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 px-4 pb-2 text-[9px] font-body text-text-muted">
        <span>📅 {c.startDate}–{c.endDate}</span>
        <span>👥 {c.participantsK}K members</span>
        {c.daysLeft !== undefined && c.status === 'active' && (
          <span style={{ color: c.color }}>{c.daysLeft}d left</span>
        )}
      </div>

      {/* Progress bar for active joined */}
      {c.joined && c.status === 'active' && c.progressPct !== undefined && (
        <div className="px-4 pb-3">
          <div className="flex justify-between mb-1.5">
            <p className="font-body text-[9px] text-text-muted">Community progress</p>
            <p className="font-body text-[9px]" style={{ color: c.color }}>{c.progressPct}%</p>
          </div>
          <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(175,197,255,0.08)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${c.progressPct}%`, background: c.color }} />
          </div>
        </div>
      )}

      {/* Reward + CTA */}
      <div className="flex items-center gap-3 px-4 pb-4">
        <div className="flex-1">
          <p className="font-body text-[9px] text-text-muted">Reward</p>
          <p className="font-body text-[10px] font-semibold" style={{ color: c.color }}>{c.reward}</p>
        </div>
        {c.status !== 'completed' && (
          <button onClick={() => toggle(c.id)}
            className="h-9 px-4 rounded-[--radius-xl] font-body text-xs font-semibold transition-all active:scale-[0.95]"
            style={{
              background: celebrating === c.id ? 'rgba(34,197,94,0.12)' : c.joined ? 'rgba(239,68,68,0.08)' : `${c.color}12`,
              border: `1px solid ${celebrating === c.id ? 'rgba(34,197,94,0.3)' : c.joined ? 'rgba(239,68,68,0.25)' : `${c.color}30`}`,
              color: celebrating === c.id ? '#22C55E' : c.joined ? '#F87171' : c.color,
            }}>
            {celebrating === c.id ? '🎉 Joined!' : c.joined ? 'Leave' : 'Join'}
          </button>
        )}
        {c.status === 'completed' && c.joined && (
          <span className="font-body text-[10px] font-semibold" style={{ color: '#22C55E' }}>✓ Completed</span>
        )}
      </div>
    </div>
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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Community Challenges</p>
          <p className="font-body text-[10px] text-text-muted">Healthy money habits together</p>
        </div>
        <button onClick={onViewLeaderboard}
          className="h-8 px-3 rounded-full font-body text-[10px] font-semibold transition-all"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)', color: '#22C55E' }}>
          Rankings
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Active */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Active Challenges</p>
          <div className="flex flex-col gap-3">
            {active.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Coming Soon</p>
          <div className="flex flex-col gap-3">
            {upcoming.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </div>

        {/* Completed */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Past Challenges</p>
          <div className="flex flex-col gap-3">
            {completed.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
