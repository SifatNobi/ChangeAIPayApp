import { useState } from 'react'

type VoteState = 'up' | 'down' | null

interface FeatureRequest {
  id: string
  title: string
  description: string
  category: string
  categoryColor: string
  votes: number
  status: 'planned' | 'considering' | 'inReview' | 'shipped'
  userVote: VoteState
}

const STATUS_CFG: Record<FeatureRequest['status'], { label: string; color: string; bg: string }> = {
  planned:     { label: 'Planned',     color: '#22C55E', bg: 'rgba(34,197,94,0.1)'   },
  considering: { label: 'Considering', color: '#F5B700', bg: 'rgba(245,183,0,0.1)'   },
  inReview:    { label: 'In Review',   color: '#3FE7FF', bg: 'rgba(63,231,255,0.1)'  },
  shipped:     { label: 'Shipped',     color: '#9945FF', bg: 'rgba(153,69,255,0.1)'  },
}

const INITIAL_FEATURES: FeatureRequest[] = [
  { id: 'f1', title: 'Joint Goals',              description: 'Share a savings goal with another ChangeAIPay user',             category: 'Goals',    categoryColor: '#22C55E', votes: 2841, status: 'planned',     userVote: null },
  { id: 'f2', title: 'Bill Splitting History',    description: 'View full timeline of past split requests and settlements',      category: 'Payments', categoryColor: '#3FE7FF', votes: 2104, status: 'inReview',    userVote: null },
  { id: 'f3', title: 'Fina Memory Export',        description: 'Download or transfer your Fina conversation history',           category: 'AI',       categoryColor: '#9945FF', votes: 1788, status: 'considering', userVote: null },
  { id: 'f4', title: 'Recurring Goal Deposits',   description: 'Auto-schedule deposits into goals like recurring transfers',    category: 'Goals',    categoryColor: '#22C55E', votes: 1563, status: 'planned',     userVote: null },
  { id: 'f5', title: 'Budget Alerts',             description: 'Notify me before I hit 80% of a budget category',              category: 'Insights', categoryColor: '#F5B700', votes: 1230, status: 'considering', userVote: null },
  { id: 'f6', title: 'Multi-Currency Wallet',     description: 'Hold and switch between GBP, EUR, USD without conversion',     category: 'Wallet',   categoryColor: '#FC7E2F', votes: 994,  status: 'considering', userVote: null },
  { id: 'f7', title: 'Dark Mode Themes',          description: 'Custom colour schemes beyond the default dark blue',           category: 'Design',   categoryColor: '#AFC5FF', votes: 820,  status: 'shipped',     userVote: null },
]

const BETA_PROGRAMS = [
  { id: 'b1', name: 'Fina Voice 2.0',    description: 'Multi-turn voice conversations with memory and follow-ups',           spots: 200,  joined: false, emoji: '🎙️' },
  { id: 'b2', name: 'Joint Goals Beta',  description: 'Early access to collaborative goals with a partner or friend',       spots: 500,  joined: true,  emoji: '🎯' },
  { id: 'b3', name: 'Advanced Analytics',description: 'Deeper spending analysis with category forecasting and trends',      spots: 1000, joined: false, emoji: '📊' },
]

interface SupportDevelopmentProps {
  onBack?: () => void
}

export default function SupportDevelopment({ onBack }: SupportDevelopmentProps) {
  const [features, setFeatures]   = useState(INITIAL_FEATURES)
  const [betas, setBetas]         = useState(BETA_PROGRAMS)
  const [tab, setTab]             = useState<'vote' | 'beta'>('vote')
  const [sortBy, setSortBy]       = useState<'votes' | 'status'>('votes')

  const handleVote = (id: string, dir: VoteState) => {
    setFeatures(prev => prev.map(f => {
      if (f.id !== id) return f
      const prevVote = f.userVote
      const delta = dir === prevVote ? 0 - (prevVote === 'up' ? 1 : prevVote === 'down' ? -1 : 0)
                  : (prevVote === 'up' ? -1 : prevVote === 'down' ? 1 : 0) + (dir === 'up' ? 1 : -1)
      return { ...f, votes: f.votes + delta, userVote: dir === prevVote ? null : dir }
    }))
  }

  const handleBeta = (id: string) => {
    setBetas(prev => prev.map(b => b.id === id ? { ...b, joined: !b.joined } : b))
  }

  const sorted = [...features].sort((a, b) =>
    sortBy === 'votes' ? b.votes - a.votes :
    Object.keys(STATUS_CFG).indexOf(a.status) - Object.keys(STATUS_CFG).indexOf(b.status)
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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Support Development</p>
          <p className="font-body text-[10px] text-text-muted">Shape what we build next</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 px-5 pb-3 shrink-0">
        {[
          { id: 'vote', label: '🗳️ Feature Votes' },
          { id: 'beta', label: '🧪 Beta Programs' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
            style={{ background: tab === t.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${tab === t.id ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}`, color: tab === t.id ? '#3FE7FF' : 'rgba(175,197,255,0.5)' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {tab === 'vote' && (
          <>
            {/* Sort chips */}
            <div className="flex gap-2">
              {([['votes', 'Most voted'], ['status', 'By status']] as const).map(([key, label]) => (
                <button key={key} onClick={() => setSortBy(key)}
                  className="h-7 px-3 rounded-full font-body text-[10px] font-semibold transition-all"
                  style={{ background: sortBy === key ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${sortBy === key ? 'rgba(63,231,255,0.3)' : 'rgba(175,197,255,0.1)'}`, color: sortBy === key ? '#3FE7FF' : 'rgba(175,197,255,0.4)' }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-2.5">
              {sorted.map(f => {
                const cfg = STATUS_CFG[f.status]
                return (
                  <div key={f.id} className="rounded-[--radius-2xl] px-4 py-4"
                    style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <button onClick={() => handleVote(f.id, 'up')}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-[0.9]"
                          style={{ background: f.userVote === 'up' ? 'rgba(34,197,94,0.15)' : 'rgba(175,197,255,0.06)', border: `1px solid ${f.userVote === 'up' ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.12)'}` }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5 8V2M2 5l3-3 3 3" stroke={f.userVote === 'up' ? '#22C55E' : 'rgba(175,197,255,0.5)'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <p className="font-mono text-[10px] font-bold" style={{ color: f.userVote === 'up' ? '#22C55E' : f.userVote === 'down' ? '#F87171' : 'rgba(175,197,255,0.5)' }}>{f.votes.toLocaleString()}</p>
                        <button onClick={() => handleVote(f.id, 'down')}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-[0.9]"
                          style={{ background: f.userVote === 'down' ? 'rgba(239,68,68,0.1)' : 'rgba(175,197,255,0.06)', border: `1px solid ${f.userVote === 'down' ? 'rgba(239,68,68,0.25)' : 'rgba(175,197,255,0.12)'}` }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5 2v6M2 5l3 3 3-3" stroke={f.userVote === 'down' ? '#F87171' : 'rgba(175,197,255,0.5)'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="font-body text-sm font-semibold text-text">{f.title}</p>
                          <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                        </div>
                        <p className="font-body text-[10px] text-text-muted leading-relaxed">{f.description}</p>
                        <span className="inline-block mt-1.5 font-body text-[9px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: `${f.categoryColor}10`, color: f.categoryColor }}>{f.category}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-[--radius-xl] px-4 py-3"
              style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.15)' }}>
              <p className="font-body text-[10px] text-text-muted leading-relaxed">
                Votes inform our roadmap — they are not guarantees. Features marked <strong className="text-text">Planned</strong> are confirmed for a future release.
              </p>
            </div>
          </>
        )}

        {tab === 'beta' && (
          <>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Beta programs give early access to features still in testing. Bugs are expected — your feedback shapes the final version.
            </p>
            <div className="flex flex-col gap-3">
              {betas.map(b => (
                <div key={b.id} className="rounded-[--radius-2xl] px-4 py-4"
                  style={{ background: b.joined ? 'rgba(0,102,255,0.07)' : 'rgba(175,197,255,0.03)', border: `1.5px solid ${b.joined ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.09)'}` }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-11 h-11 rounded-[15px] flex items-center justify-center text-2xl shrink-0"
                      style={{ background: b.joined ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.06)', border: `1px solid ${b.joined ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.12)'}` }}>
                      {b.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-body text-sm font-semibold text-text">{b.name}</p>
                        {b.joined && <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0,102,255,0.12)', color: '#3FE7FF' }}>Enrolled</span>}
                      </div>
                      <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-[10px] text-text-muted">{b.spots.toLocaleString()} spots</p>
                    <button onClick={() => handleBeta(b.id)}
                      className="h-9 px-4 rounded-[--radius-xl] font-body text-xs font-semibold transition-all active:scale-[0.95]"
                      style={{ background: b.joined ? 'rgba(239,68,68,0.08)' : 'rgba(0,102,255,0.1)', border: `1px solid ${b.joined ? 'rgba(239,68,68,0.22)' : 'rgba(0,102,255,0.28)'}`, color: b.joined ? '#F87171' : '#3FE7FF' }}>
                      {b.joined ? 'Leave beta' : 'Join beta'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[--radius-xl] px-4 py-3"
              style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.18)' }}>
              <p className="font-body text-[10px] text-text-muted leading-relaxed">
                Beta features may be unstable. You can leave any beta program at any time with no impact on your account.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
