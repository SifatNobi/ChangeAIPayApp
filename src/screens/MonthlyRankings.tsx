import { useState } from 'react'

type Month = 'aug' | 'sep'

const MONTHLY_DATA: Record<Month, {
  label: string
  communityGoalsCompleted: number
  communityStreakDays: number
  usersParticipated: number
  challengesRun: number
  highlights: { icon: string; text: string }[]
  personalPercentile: number
  personalRank: number
  personalTotal: number
  personalBestStreak: number
  personalGoals: number
}> = {
  aug: {
    label: 'August 2026',
    communityGoalsCompleted: 0,
    communityStreakDays: 0,
    usersParticipated: 0,
    challengesRun: 0,
    highlights: [
      { icon: '🎯', text: '14,280 goals reached across the community' },
      { icon: '🔥', text: 'Longest collective savings streak: 8 days' },
      { icon: '🏅', text: 'Most popular challenge: No-Spend Weekend' },
      { icon: '🌍', text: '52,400 members participated' },
    ],
    personalPercentile: 0,
    personalRank: 0,
    personalTotal: 0,
    personalBestStreak: 0,
    personalGoals: 0,
  },
  sep: {
    label: 'September 2026',
    communityGoalsCompleted: 0,
    communityStreakDays: 0,
    usersParticipated: 0,
    challengesRun: 0,
    highlights: [
      { icon: '🎯', text: '9,140 goals reached so far this month' },
      { icon: '🔥', text: 'Current community streak: 5 days' },
      { icon: '🏅', text: 'Active challenge: Save $50 This Month' },
      { icon: '🌍', text: '48,700 members active so far' },
    ],
    personalPercentile: 0,
    personalRank: 0,
    personalTotal: 0,
    personalBestStreak: 0,
    personalGoals: 0,
  },
}

interface MonthlyRankingsProps {
  isOptedIn?: boolean
  onBack?: () => void
  onViewLeaderboard?: () => void
  onViewChallenges?: () => void
}

export default function MonthlyRankings({ isOptedIn = true, onBack, onViewLeaderboard, onViewChallenges }: MonthlyRankingsProps) {
  const [month, setMonth] = useState<Month>('sep')
  const data = MONTHLY_DATA[month]

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Monthly Rankings</p>
          <p className="font-body text-[10px] text-text-muted">Community savings recap</p>
        </div>
      </div>

      {/* Month toggle */}
      <div className="flex gap-2 px-5 pb-3 shrink-0">
        {(['sep', 'aug'] as Month[]).map(m => (
          <button key={m} onClick={() => setMonth(m)}
            className="h-8 px-4 rounded-full font-body text-xs font-semibold transition-all"
            style={{ background: month === m ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${month === m ? 'rgba(63,231,255,0.3)' : 'rgba(175,197,255,0.1)'}`, color: month === m ? '#3FE7FF' : 'rgba(175,197,255,0.45)' }}>
            {MONTHLY_DATA[m].label.split(' ')[0]}
          </button>
        ))}
        {month === 'aug' && (
          <span className="self-center ml-1 font-body text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(175,197,255,0.07)', color: 'rgba(175,197,255,0.4)' }}>Final</span>
        )}
        {month === 'sep' && (
          <span className="self-center ml-1 font-body text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>In Progress</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Community hero stats */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.25)' }}>
          <p className="font-display text-xs font-extrabold uppercase tracking-widest" style={{ color: 'rgba(175,197,255,0.5)' }}>{data.label} · Community</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: data.communityGoalsCompleted.toLocaleString(), label: 'Goals completed', color: '#22C55E', icon: '🎯' },
              { value: data.usersParticipated.toLocaleString(),       label: 'Members active',  color: '#3FE7FF', icon: '👥' },
              { value: `${data.communityStreakDays}d`,                label: 'Community streak', color: '#FC7E2F', icon: '🔥' },
              { value: data.challengesRun.toString(),                  label: 'Challenges run',  color: '#9945FF', icon: '⚡' },
            ].map(s => (
              <div key={s.label} className="flex flex-col gap-1 px-3 py-3 rounded-[--radius-xl]"
                style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                <span className="text-lg">{s.icon}</span>
                <p className="font-display text-lg font-extrabold" style={{ color: s.color }}>{s.value}</p>
                <p className="font-body text-[9px] text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community highlights */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Highlights</p>
          <div className="flex flex-col gap-2">
            {data.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
                <span className="text-lg shrink-0">{h.icon}</span>
                <p className="font-body text-xs text-text">{h.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal percentile — only if opted in */}
        {isOptedIn ? (
          <div className="rounded-[--radius-2xl] px-5 py-5"
            style={{ background: 'rgba(34,197,94,0.06)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-4">Your Position</p>
            <div className="flex items-center gap-4 mb-4">
              {/* Percentile ring */}
              <div className="relative shrink-0" style={{ width: 72, height: 72 }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" stroke="rgba(175,197,255,0.08)" strokeWidth="5" fill="none" />
                  <circle cx="36" cy="36" r="30" stroke="#22C55E" strokeWidth="5" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - data.personalPercentile / 100)}`}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '36px 36px' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-display text-base font-extrabold" style={{ color: '#22C55E' }}>{data.personalPercentile}%</p>
                </div>
              </div>
              <div>
                <p className="font-display text-sm font-extrabold text-text">Top {100 - data.personalPercentile}%</p>
                <p className="font-body text-xs text-text-muted mt-0.5">
                  Rank #{data.personalRank.toLocaleString()} of {data.personalTotal.toLocaleString()}
                </p>
                <p className="font-body text-[10px] text-text-muted mt-1">
                  Best streak: {data.personalBestStreak} days · Goals: {data.personalGoals}
                </p>
              </div>
            </div>
            <p className="font-body text-[10px] text-text-muted">
              Percentile is based on savings streak length and goals completed — never balance or spend amounts.
            </p>
          </div>
        ) : (
          <div className="rounded-[--radius-xl] px-4 py-4 flex items-start gap-3"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
              <circle cx="7" cy="7" r="6" stroke="rgba(175,197,255,0.35)" strokeWidth="1" />
              <path d="M7 6v4M7 4.5v.5" stroke="rgba(175,197,255,0.35)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[11px] text-text-muted leading-relaxed">
              Join the Savings Leaderboard to see your personal percentile each month.
            </p>
          </div>
        )}

        <div className="flex gap-2.5">
          <button onClick={onViewLeaderboard}
            className="flex-1 h-12 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)', color: 'rgba(175,197,255,0.65)' }}>
            Leaderboard
          </button>
          <button onClick={onViewChallenges}
            className="flex-1 h-12 rounded-[--radius-2xl] font-body text-xs font-semibold text-white transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}>
            Join a Challenge
          </button>
        </div>
      </div>
    </div>
  )
}
