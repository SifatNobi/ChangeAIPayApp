import { useState } from 'react'

interface LeaderEntry {
  rank: number
  initials: string
  displayName: string
  activeConnections: number
  status: string
  statusEmoji: string
  color: string
  isYou: boolean
}

const ENTRIES: LeaderEntry[] = []

interface LeaderboardProps {
  isOptedIn?: boolean
  onBack?: () => void
  onInvite?: () => void
}

export default function Leaderboard({ isOptedIn = false, onBack, onInvite }: LeaderboardProps) {
  const [optedIn, setOptedIn] = useState(isOptedIn)
  const [confirmOpt, setConfirmOpt] = useState(false)

  const handleOptToggle = () => {
    if (optedIn) {
      setOptedIn(false)
    } else {
      setConfirmOpt(true)
    }
  }

  const confirmJoin = () => { setOptedIn(true); setConfirmOpt(false) }

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Leaderboard</p>
          <p className="font-body text-[10px] text-text-muted">Ranked by Active Connections only</p>
        </div>
        <button onClick={handleOptToggle}
          className="h-8 px-3 rounded-full font-body text-xs font-semibold transition-all"
          style={{ background: optedIn ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.06)', border: `1px solid ${optedIn ? 'rgba(63,231,255,0.3)' : 'rgba(175,197,255,0.15)'}`, color: optedIn ? '#3FE7FF' : 'rgba(175,197,255,0.5)' }}>
          {optedIn ? 'Leave' : 'Join'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Opt-in gate */}
        {!optedIn && (
          <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1.5px solid rgba(175,197,255,0.12)' }}>
            <p className="font-display text-sm font-extrabold text-text">Leaderboard is opt-in</p>
            <div className="flex flex-col gap-1.5">
              {[
                'You are not visible until you choose to join',
                'Rankings show Active Connections only — never dollar amounts or balances',
                'Display names are initials only, never full names',
                'You can leave at any time and be removed immediately',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: 'rgba(63,231,255,0.5)' }} />
                  <p className="font-body text-xs text-text-muted">{point}</p>
                </div>
              ))}
            </div>
            <button onClick={handleOptToggle}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}>
              Join Leaderboard
            </button>
          </div>
        )}

        {/* Confirm opt-in sheet */}
        {confirmOpt && (
          <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
            <div className="w-full rounded-t-[32px] px-6 pt-6 pb-10 flex flex-col gap-5"
              style={{ background: 'rgba(10,16,56,0.98)', border: '1px solid rgba(175,197,255,0.12)', borderBottom: 'none' }}>
              <p className="font-display text-lg font-extrabold text-text">Join the Leaderboard?</p>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Only your initials and Active Connection count will be visible to others. No financial data is ever shown.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmOpt(false)}
                  className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all"
                  style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.7)' }}>
                  Cancel
                </button>
                <button onClick={confirmJoin}
                  className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
                  style={{ background: 'var(--gradient-primary)' }}>
                  Yes, Join
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rankings */}
        {optedIn && (
          <>
            {/* Privacy notice */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-[--radius-xl]"
              style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.18)' }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1L1 4.5V10h3V7h3v3h3V4.5L5.5 1Z" stroke="#3FE7FF" strokeWidth="0.9" strokeLinejoin="round" /></svg>
              <p className="font-body text-[10px] text-text-muted">Ranked by Active Connections only · No balances or send amounts shown</p>
            </div>

            {/* Top 3 podium */}
            <div className="flex items-end justify-center gap-2 pt-2 pb-4">
              {[ENTRIES[1], ENTRIES[0], ENTRIES[2]].map((e, i) => {
                const heights = [80, 100, 68]
                const medals = ['🥈', '🥇', '🥉']
                const displayRank = [2, 1, 3]
                return (
                  <div key={e.rank} className="flex flex-col items-center gap-2">
                    <div className="w-11 h-11 rounded-[14px] flex items-center justify-center font-display text-sm font-extrabold"
                      style={{ background: `${e.color}18`, border: `1.5px solid ${e.color}40`, color: e.color }}>
                      {e.initials}
                    </div>
                    <div className="w-16 rounded-t-[10px] flex flex-col items-center justify-end pb-2"
                      style={{ height: heights[i], background: `${e.color}0E`, border: `1px solid ${e.color}25` }}>
                      <span className="text-lg">{medals[i]}</span>
                      <p className="font-mono text-xs font-bold" style={{ color: e.color }}>{e.activeConnections}</p>
                      <p className="font-body text-[8px] text-text-muted">{displayRank[i]}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Full list */}
            <div className="flex flex-col gap-2">
              {ENTRIES.map(e => (
                <div key={e.rank}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] transition-all"
                  style={{ background: e.isYou ? `${e.color}0A` : 'rgba(175,197,255,0.03)', border: `1.5px solid ${e.isYou ? `${e.color}35` : 'rgba(175,197,255,0.09)'}` }}>
                  <p className="font-mono text-xs font-bold w-7 shrink-0"
                    style={{ color: e.rank <= 3 ? e.color : 'rgba(175,197,255,0.35)' }}>
                    #{e.rank}
                  </p>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-xs font-extrabold shrink-0"
                    style={{ background: `${e.color}14`, border: `1px solid ${e.color}30`, color: e.color }}>
                    {e.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-text">
                      {e.displayName} {e.isYou && <span className="font-body text-[10px] text-text-muted">(you)</span>}
                    </p>
                    <p className="font-body text-[10px] text-text-muted">{e.statusEmoji} {e.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold" style={{ color: e.color }}>{e.activeConnections}</p>
                    <p className="font-body text-[9px] text-text-muted">active</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onInvite}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}>
              Invite to Climb the Board
            </button>
          </>
        )}
      </div>
    </div>
  )
}
