import { useEffect, useState } from 'react'

const CONFETTI_COLORS = ['#3FE7FF', '#0066FF', '#9945FF', '#F5B700', '#FC7E2F', '#FFD700', '#AFC5FF', '#22C55E']

interface Piece {
  id: number; x: number; delay: number; duration: number
  size: number; rotation: number; shape: 'rect' | 'circle' | 'triangle'; color: string
}

function makePieces(): Piece[] {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.7,
    duration: 2.2 + Math.random() * 1.2,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    shape: (['rect', 'circle', 'triangle'] as const)[Math.floor(Math.random() * 3)],
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }))
}

interface SavingsMilestone {
  id: string
  label: string
  description: string
  emoji: string
  color: string
  reached: boolean
  reachedDate?: string
  change: number
}

const MILESTONES: SavingsMilestone[] = [
  { id: 'm1', label: 'First Save',        description: 'Added money to a savings goal for the first time',     emoji: '🌱', color: '#22C55E', reached: false, change: 100  },
  { id: 'm2', label: 'First Goal',        description: 'Completed your first savings goal',                    emoji: '🎯', color: '#3FE7FF', reached: false, change: 300  },
  { id: 'm3', label: '7-Day Streak',      description: 'Saved consistently for 7 days in a row',              emoji: '🔥', color: '#FC7E2F', reached: false, change: 200  },
  { id: 'm4', label: '30-Day Streak',     description: '30 consecutive days of saving activity',              emoji: '⚡', color: '#F5B700', reached: false, change: 500  },
  { id: 'm5', label: '3 Goals',           description: 'Completed three savings goals total',                 emoji: '🏅', color: '#9945FF', reached: false, change: 800  },
  { id: 'm6', label: 'Auto-Save 90 Days', description: 'Auto-save running continuously for 3 months',        emoji: '🤖', color: '#0066FF', reached: false, change: 600  },
  { id: 'm7', label: '90-Day Streak',     description: '90 consecutive days of consistent saving',            emoji: '🌟', color: '#FFD700', reached: false, change: 1500 },
  { id: 'm8', label: '5 Goals',           description: 'Completed five savings goals — a genuine habit',     emoji: '🏆', color: '#AFC5FF', reached: false, change: 2000 },
]

interface SavingsMilestonesProps {
  celebrating?: boolean
  celebrationMilestone?: string
  onBack?: () => void
  onViewGoals?: () => void
  onViewVault?: () => void
}

export default function SavingsMilestones({
  celebrating = false,
  celebrationMilestone = '30-Day Streak',
  onBack, onViewGoals, onViewVault,
}: SavingsMilestonesProps) {
  const [pieces] = useState(makePieces)
  const [showConfetti, setShowConfetti] = useState(celebrating)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (celebrating) {
      const t = setTimeout(() => setRevealed(true), 100)
      return () => clearTimeout(t)
    }
  }, [celebrating])

  const reached   = MILESTONES.filter(m => m.reached)
  const milestone = MILESTONES.find(m => m.label === celebrationMilestone) ?? MILESTONES[3]

  if (showConfetti && celebrating) {
    return (
      <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
        <style>{`
          @keyframes confetti-fall {
            0%   { transform: translateY(-30px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(820px) rotate(720deg); opacity: 0; }
          }
        `}</style>
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {pieces.map(p => (
            <div key={p.id} style={{
              position: 'absolute', left: `${p.x}%`, top: -20,
              width: p.size, height: p.shape === 'circle' ? p.size : p.size * 0.6,
              background: p.shape === 'triangle' ? 'transparent' : p.color,
              borderRadius: p.shape === 'circle' ? '50%' : 2,
              border: p.shape === 'triangle' ? `${p.size * 0.4}px solid transparent` : 'none',
              borderBottom: p.shape === 'triangle' ? `${p.size * 0.7}px solid ${p.color}` : undefined,
              animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in both`,
            }} />
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 relative z-20 pb-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-24 h-24 rounded-[32px] flex items-center justify-center text-5xl"
              style={{ background: `${milestone.color}15`, border: `2.5px solid ${milestone.color}45`, boxShadow: `0 0 ${revealed ? '40px' : '0px'} ${milestone.color}40`, transition: 'box-shadow 600ms' }}>
              {milestone.emoji}
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-text-muted mb-1">Savings Milestone</p>
              <p className="font-display text-2xl font-extrabold" style={{ color: milestone.color }}>{milestone.label}</p>
              <p className="font-body text-sm text-text-muted mt-1 leading-relaxed">{milestone.description}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            {[
              { icon: '💎', label: `${milestone.change} Change`,         sub: 'Added to your Change Vault', color: '#F5B700' },
              { icon: milestone.emoji, label: milestone.label + ' badge', sub: 'Added to your profile',      color: milestone.color },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-[--radius-2xl]"
                style={{ background: `${r.color}0C`, border: `1.5px solid ${r.color}30`, transform: revealed ? 'translateY(0)' : 'translateY(16px)', opacity: revealed ? 1 : 0, transition: `all 380ms ${160 + i * 100}ms ease-out` }}>
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <p className="font-display text-sm font-extrabold" style={{ color: r.color }}>{r.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{r.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col gap-3">
            <button onClick={onViewVault}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}>
              View Change Vault
            </button>
            <button onClick={() => setShowConfetti(false)}
              className="font-body text-sm text-text-muted active:opacity-60">
              See all milestones
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Savings Milestones</p>
          <p className="font-body text-[10px] text-text-muted">{reached.length} of {MILESTONES.length} reached</p>
        </div>
        <button onClick={onViewGoals}
          className="h-8 px-3 rounded-full font-body text-[10px] font-semibold transition-all"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)', color: '#22C55E' }}>
          My Goals
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {/* Progress overview */}
        <div className="rounded-[--radius-xl] px-4 py-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="flex justify-between mb-2">
            <p className="font-body text-xs font-semibold text-text">Progress</p>
            <p className="font-body text-[10px] text-text-muted">{reached.length}/{MILESTONES.length}</p>
          </div>
          <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(175,197,255,0.08)' }}>
            <div className="h-full rounded-full" style={{ width: `${(reached.length / MILESTONES.length) * 100}%`, background: 'var(--gradient-primary)' }} />
          </div>
        </div>

        {/* Milestones */}
        {MILESTONES.map((m, i) => {
          const isNext = !m.reached && MILESTONES.slice(0, i).every(prev => prev.reached)
          return (
            <div key={m.id} className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: m.reached ? `${m.color}08` : 'rgba(175,197,255,0.02)', border: `1.5px solid ${m.reached ? `${m.color}30` : isNext ? `${m.color}20` : 'rgba(175,197,255,0.07)'}`, opacity: m.reached || isNext ? 1 : 0.45 }}>
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-11 h-11 rounded-[15px] flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${m.color}14`, boxShadow: m.reached ? `0 0 14px ${m.color}25` : 'none' }}>
                  {m.reached ? m.emoji : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="3.5" y="6.5" width="7" height="6" rx="1" stroke="rgba(175,197,255,0.25)" strokeWidth="1" />
                      <path d="M5 6.5V5a2 2 0 0 1 4 0v1.5" stroke="rgba(175,197,255,0.25)" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-display text-sm font-extrabold" style={{ color: m.reached ? m.color : 'rgba(175,197,255,0.4)' }}>{m.label}</p>
                    {m.reached && <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${m.color}18`, color: m.color }}>✓ {m.reachedDate}</span>}
                    {isNext && !m.reached && <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(175,197,255,0.07)', color: 'rgba(175,197,255,0.5)' }}>Next up</span>}
                  </div>
                  <p className="font-body text-[10px] text-text-muted leading-snug">{m.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-body text-[9px] text-text-muted">Reward</p>
                  <p className="font-mono text-[10px] font-bold" style={{ color: m.reached ? '#F5B700' : 'rgba(175,197,255,0.3)' }}>💎 {m.change}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
