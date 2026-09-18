import { useState } from 'react'

type RankMetric = 'streak' | 'goals'

interface RankEntry {
  rank: number
  initials: string
  streakDays: number
  goalsCompleted: number
  statusEmoji: string
  color: string
  isYou: boolean
}

const ENTRIES: RankEntry[] = []

const METRIC_LABELS: Record<RankMetric, { singular: string; plural: string }> = {
  streak: { singular: 'day streak', plural: 'day streak' },
  goals:  { singular: 'goal',       plural: 'goals completed' },
}

interface SavingsLeaderboardProps {
  isOptedIn?: boolean
  onBack?: () => void
  onViewChallenges?: () => void
}

export default function SavingsLeaderboard({ isOptedIn = false, onBack, onViewChallenges }: SavingsLeaderboardProps) {
  const [optedIn, setOptedIn]     = useState(isOptedIn)
  const [metric, setMetric]       = useState<RankMetric>('streak')
  const [confirmOpt, setConfirmOpt] = useState(false)

  const sorted = [...ENTRIES].sort((a, b) =>
    metric === 'streak' ? b.streakDays - a.streakDays : b.goalsCompleted - a.goalsCompleted
  )
  const you = ENTRIES.find(e => e.isYou)!

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Savings Leaderboard</p>
          <p className="font-body text-[10px] text-text-muted">Ranked by streaks and goals — never dollar amounts</p>
        </div>
        <button onClick={() => optedIn ? setOptedIn(false) : setConfirmOpt(true)}
          className="h-8 px-3 rounded-full font-body text-xs font-semibold transition-all"
          style={{ background: optedIn ? 'rgba(34,197,94,0.1)' : 'rgba(175,197,255,0.06)', border: `1px solid ${optedIn ? 'rgba(34,197,94,0.35)' : 'rgba(175,197,255,0.15)'}`, color: optedIn ? '#22C55E' : 'rgba(175,197,255,0.5)' }}>
          {optedIn ? 'Leave' : 'Join'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Opt-in gate */}
        {!optedIn && (
          <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1.5px solid rgba(175,197,255,0.12)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[16px] flex items-center justify-center text-2xl shrink-0"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
                🏅
              </div>
              <div>
                <p className="font-display text-sm font-extrabold text-text">Achievement-only board</p>
                <p className="font-body text-[10px] text-text-muted mt-0.5">No balances, no spending. Just saving consistency.</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                'Off by default — you choose to appear',
                'Ranked by savings streak length or goals completed',
                'Display names are initials only, never full names',
                'Dollar amounts are never shown to anyone',
                'Leave at any time — removed immediately',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: 'rgba(34,197,94,0.6)' }} />
                  <p className="font-body text-xs text-text-muted">{point}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setConfirmOpt(true)}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}>
              Join Leaderboard
            </button>
          </div>
        )}

        {optedIn && (
          <>
            {/* Metric toggle */}
            <div className="flex gap-2">
              {(['streak', 'goals'] as RankMetric[]).map(m => (
                <button key={m} onClick={() => setMetric(m)}
                  className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                  style={{ background: metric === m ? 'rgba(34,197,94,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${metric === m ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.1)'}`, color: metric === m ? '#22C55E' : 'rgba(175,197,255,0.5)' }}>
                  {m === 'streak' ? '🔥 Savings Streak' : '🎯 Goals Completed'}
                </button>
              ))}
            </div>

            {/* Your rank card */}
            <div className="rounded-[--radius-2xl] px-4 py-4 flex items-center gap-3"
              style={{ background: 'rgba(34,197,94,0.06)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
              <p className="font-mono text-lg font-bold w-10 shrink-0 text-center" style={{ color: '#22C55E' }}>#{you.rank}</p>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-xs font-extrabold shrink-0"
                style={{ background: 'rgba(34,197,94,0.12)', border: '1.5px solid rgba(34,197,94,0.3)', color: '#22C55E' }}>
                {you.initials}
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">You</p>
                <p className="font-body text-[10px] text-text-muted">
                  {metric === 'streak' ? `${you.streakDays}-day savings streak` : `${you.goalsCompleted} goals completed`}
                </p>
              </div>
              <span className="font-body text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>You</span>
            </div>

            {/* Top 3 podium */}
            <div className="flex items-end justify-center gap-3 pt-2 pb-2">
              {[sorted[1], sorted[0], sorted[2]].map((e, i) => {
                const heights = [76, 96, 64]
                const medals = ['🥈', '🥇', '🥉']
                const ranks = [2, 1, 3]
                const val = metric === 'streak' ? e.streakDays : e.goalsCompleted
                const unit = metric === 'streak' ? 'd' : ''
                return (
                  <div key={e.rank} className="flex flex-col items-center gap-2">
                    <div className="w-11 h-11 rounded-[14px] flex items-center justify-center font-display text-xs font-extrabold"
                      style={{ background: `${e.color}18`, border: `1.5px solid ${e.color}40`, color: e.color }}>
                      {e.initials}
                    </div>
                    <div className="w-16 rounded-t-[10px] flex flex-col items-center justify-end pb-2 gap-0.5"
                      style={{ height: heights[i], background: `${e.color}0E`, border: `1px solid ${e.color}25` }}>
                      <span className="text-base">{medals[i]}</span>
                      <p className="font-mono text-xs font-bold" style={{ color: e.color }}>{val}{unit}</p>
                      <p className="font-body text-[8px] text-text-muted">#{ranks[i]}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Full list */}
            <div className="flex flex-col gap-2">
              {sorted.map(e => (
                <div key={e.rank}
                  className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
                  style={{ background: e.isYou ? 'rgba(34,197,94,0.05)' : 'rgba(175,197,255,0.03)', border: `1.5px solid ${e.isYou ? 'rgba(34,197,94,0.25)' : 'rgba(175,197,255,0.09)'}` }}>
                  <p className="font-mono text-xs font-bold w-7 shrink-0" style={{ color: e.rank <= 3 ? e.color : 'rgba(175,197,255,0.35)' }}>#{e.rank}</p>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-xs font-extrabold shrink-0"
                    style={{ background: `${e.color}14`, border: `1px solid ${e.color}30`, color: e.color }}>
                    {e.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-xs font-semibold text-text">{e.isYou ? 'You' : 'Member'}</p>
                    <p className="font-body text-[9px] text-text-muted">
                      {metric === 'streak' ? `${e.streakDays}-day streak` : `${e.goalsCompleted} goals`}
                    </p>
                  </div>
                  <span className="text-base">{e.statusEmoji}</span>
                </div>
              ))}
            </div>

            <button onClick={onViewChallenges}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)', color: 'rgba(175,197,255,0.65)' }}>
              Join a Community Challenge →
            </button>
          </>
        )}
      </div>

      {/* Confirm join sheet */}
      {confirmOpt && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full rounded-t-[32px] px-6 pt-6 pb-10 flex flex-col gap-5"
            style={{ background: 'rgba(10,16,56,0.98)', border: '1px solid rgba(175,197,255,0.12)', borderBottom: 'none' }}>
            <p className="font-display text-lg font-extrabold text-text">Join the Savings Leaderboard?</p>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Your initials and savings streak (or goals count) will be visible. No financial amounts are ever shown.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmOpt(false)}
                className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all"
                style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.7)' }}>
                Cancel
              </button>
              <button onClick={() => { setOptedIn(true); setConfirmOpt(false) }}
                className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
                style={{ background: 'var(--gradient-primary)' }}>
                Yes, Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
