import { useEffect, useState } from 'react'

interface GoalCelebrationProps {
  goalName?: string
  goalEmoji?: string
  goalAmount?: number
  monthsToReach?: number
  onNewGoal?: () => void
  onContinue?: () => void
}

const CONFETTI_COLORS = ['#3FE7FF', '#0066FF', '#9945FF', '#F5B700', '#22C55E', '#E6007A', '#FC7E2F', '#AFC5FF']

const PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 5 + (i * 87 / 27) * (1 + (i % 3) * 0.12),
  delay: (i * 73 % 17) * 0.09,
  duration: 1.8 + (i * 37 % 13) * 0.12,
  size: 5 + (i * 53 % 7),
  rotation: (i * 97 % 360),
  shape: i % 3,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
}))

function ConfettiBurst() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PIECES.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-8px',
            width: p.shape === 2 ? p.size : p.size,
            height: p.shape === 2 ? p.size : Math.round(p.size * 0.5),
            background: p.color,
            borderRadius: p.shape === 0 ? '50%' : p.shape === 1 ? '2px' : '1px',
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}

export default function GoalCelebration({
  goalName = 'Emergency Fund',
  goalEmoji = '🛡️',
  goalAmount = 5000,
  monthsToReach = 7,
  onNewGoal,
  onContinue,
}: GoalCelebrationProps) {
  const [visible, setVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setTimeout(() => setStatsVisible(true), 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(63,231,255,0.07) 0%, transparent 70%)' }} />

      <ConfettiBurst />

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 relative z-10">
        {/* Trophy animation */}
        <div
          className="flex flex-col items-center gap-4 transition-all duration-[600ms]"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.9)' }}
        >
          {/* Animated ring burst */}
          <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
            {/* Glow rings */}
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(63,231,255,0.18) 0%, transparent 70%)' }} />
            <svg className="absolute inset-0" width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" stroke="rgba(63,231,255,0.15)" strokeWidth="1.5" fill="none" />
              <circle cx="60" cy="60" r="44" stroke="rgba(63,231,255,0.2)" strokeWidth="2" fill="none"
                strokeDasharray="20 10" strokeDashoffset="0">
                <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="60" r="36" stroke="rgba(63,231,255,0.35)" strokeWidth="2.5" fill="none" />
            </svg>
            {/* Center emoji */}
            <div className="relative z-10 w-20 h-20 rounded-[28px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(63,231,255,0.18), rgba(0,102,255,0.18))', border: '2px solid rgba(63,231,255,0.4)', boxShadow: '0 0 24px rgba(63,231,255,0.3)' }}>
              <span style={{ fontSize: 38 }}>{goalEmoji}</span>
            </div>
          </div>

          <div className="text-center flex flex-col gap-2">
            <p className="font-body text-sm font-semibold tracking-widest uppercase" style={{ color: 'rgba(63,231,255,0.7)' }}>Goal Reached!</p>
            <p className="font-display text-3xl font-extrabold text-text tracking-tight leading-tight">{goalName}</p>
            <p
              className="font-display text-4xl font-extrabold tracking-tighter"
              style={{ background: 'linear-gradient(135deg, #3FE7FF, #0066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              ${goalAmount.toLocaleString()}
            </p>
            <p className="font-body text-sm text-text-muted">saved in full</p>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="w-full flex gap-3 transition-all duration-[500ms]"
          style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? 'translateY(0)' : 'translateY(16px)' }}
        >
          {[
            { label: 'Time to reach',  value: `${monthsToReach} months`, icon: '⏱' },
            { label: 'Total saved',    value: `$${goalAmount.toLocaleString()}`, icon: '💰' },
            { label: 'Status',         value: '100% done', icon: '🎯' },
          ].map(s => (
            <div key={s.label} className="flex-1 flex flex-col items-center gap-1 py-3.5 rounded-[--radius-2xl]"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
              <span className="text-base">{s.icon}</span>
              <p className="font-body text-xs font-bold text-text">{s.value}</p>
              <p className="font-body text-[9px] text-text-muted text-center">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Congrats message */}
        <div
          className="w-full px-5 py-4 rounded-[--radius-2xl] text-center transition-all duration-[500ms]"
          style={{ background: 'rgba(63,231,255,0.06)', border: '1px solid rgba(63,231,255,0.2)', opacity: statsVisible ? 1 : 0 }}
        >
          <p className="font-body text-sm text-text-2 leading-relaxed">
            You did it! Your {goalName.toLowerCase()} goal is fully funded. Keep the habit going by setting your next target.
          </p>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-5 pb-10 flex flex-col gap-3 relative z-10"
        style={{ opacity: statsVisible ? 1 : 0, transition: 'opacity 500ms ease 400ms' }}>
        <button onClick={onNewGoal}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          style={{ background: 'var(--gradient-primary)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Set a New Goal
        </button>
        <button onClick={onContinue}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)', color: 'rgba(175,197,255,0.6)' }}>
          Back to Goals
        </button>
      </div>
    </div>
  )
}
