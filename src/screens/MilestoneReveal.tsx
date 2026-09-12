import { useEffect, useState } from 'react'

const CONFETTI_COLORS = ['#3FE7FF', '#0066FF', '#9945FF', '#F5B700', '#FC7E2F', '#FFD700', '#AFC5FF', '#22C55E']

interface Piece {
  id: number; x: number; delay: number; duration: number
  size: number; rotation: number; shape: 'rect' | 'circle' | 'triangle'
  color: string
}

function makePieces(): Piece[] {
  return Array.from({ length: 32 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2.4 + Math.random() * 1.2,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    shape: (['rect', 'circle', 'triangle'] as const)[Math.floor(Math.random() * 3)],
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }))
}

interface MilestoneRevealProps {
  connections?: number
  badge?: string
  badgeEmoji?: string
  badgeColor?: string
  changeEarned?: number
  premiumDays?: number
  onContinue?: () => void
  onViewVault?: () => void
}

export default function MilestoneReveal({
  connections = 5, badge = 'Amplifier', badgeEmoji = '📡', badgeColor = '#0066FF',
  changeEarned = 2000, premiumDays = 14, onContinue, onViewVault,
}: MilestoneRevealProps) {
  const [pieces] = useState(makePieces)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Confetti */}
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
            transform: `rotate(${p.rotation}deg)`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 relative z-20 pb-12">
        {/* Badge reveal */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-[36px] flex items-center justify-center text-6xl"
            style={{
              background: `${badgeColor}15`,
              border: `2.5px solid ${badgeColor}50`,
              boxShadow: `0 0 ${revealed ? '48px' : '0px'} ${badgeColor}45`,
              transition: 'box-shadow 600ms ease-out',
            }}>
            {badgeEmoji}
          </div>
          <div className="text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">Milestone Unlocked</p>
            <p className="font-display text-3xl font-extrabold" style={{ color: badgeColor }}>{badge}</p>
            <p className="font-body text-sm text-text-muted mt-1">{connections} Active Connections</p>
          </div>
        </div>

        {/* Reward tiles */}
        <div className="w-full flex flex-col gap-2.5">
          {[
            { icon: '💎', label: `${changeEarned.toLocaleString()} Change`, sub: 'Added to your Change Vault', color: '#F5B700' },
            { icon: '⭐', label: `${premiumDays} Premium Days`,              sub: 'Activated · expires in 14 days', color: '#9945FF' },
            { icon: badgeEmoji, label: `${badge} Badge`,                    sub: 'Permanent · visible on your profile', color: badgeColor },
          ].map((r, i) => (
            <div key={i}
              className="flex items-center gap-4 px-5 py-4 rounded-[--radius-2xl] transition-all"
              style={{
                background: `${r.color}0C`,
                border: `1.5px solid ${r.color}35`,
                transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                opacity: revealed ? 1 : 0,
                transition: `all 400ms ${200 + i * 120}ms ease-out`,
              }}>
              <span className="text-2xl">{r.icon}</span>
              <div>
                <p className="font-display text-sm font-extrabold" style={{ color: r.color }}>{r.label}</p>
                <p className="font-body text-[10px] text-text-muted">{r.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="w-full flex flex-col gap-3">
          <button onClick={onViewVault}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}>
            View Change Vault
          </button>
          <button onClick={onContinue}
            className="font-body text-sm text-text-muted transition-all active:opacity-60">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
