import { useState } from 'react'

interface SurpriseReward {
  icon: string
  title: string
  description: string
  change?: number
  days?: number
  color: string
}

const SURPRISE: SurpriseReward = {
  icon: '🎁',
  title: '7 Streak Bonus',
  description: "You've sent every week for 7 weeks straight. Fina noticed — and found something for you.",
  change: 750,
  days: 7,
  color: '#9945FF',
}

interface MilestoneSurpriseProps {
  onContinue?: () => void
  onViewVault?: () => void
}

export default function MilestoneSurprise({ onContinue, onViewVault }: MilestoneSurpriseProps) {
  const [revealed, setRevealed] = useState(false)
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    setOpening(true)
    setTimeout(() => { setOpening(false); setRevealed(true) }, 900)
  }

  return (
    <div className="flex flex-col bg-bg items-center justify-center px-6 gap-8" style={{ minHeight: 785 }}>
      {!revealed ? (
        <>
          {/* Fina framing */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-[22px] flex items-center justify-center text-3xl"
              style={{ background: 'rgba(63,231,255,0.1)', border: '1.5px solid rgba(63,231,255,0.3)', boxShadow: '0 0 24px rgba(63,231,255,0.2)' }}>
              🤖
            </div>
            <div>
              <p className="font-display text-xl font-extrabold text-text">Fina found something for you</p>
              <p className="font-body text-sm text-text-muted mt-2 leading-relaxed max-w-[260px]">
                Not random. Not a lottery. Fina tracks your consistent habits and surfaces this when you've genuinely earned it.
              </p>
            </div>
          </div>

          {/* Gift box */}
          <button onClick={handleOpen}
            className="flex flex-col items-center gap-3 transition-all active:scale-[0.95]"
            disabled={opening}>
            <div className="w-28 h-28 rounded-[36px] flex items-center justify-center"
              style={{
                background: 'rgba(153,69,255,0.1)',
                border: '2px solid rgba(153,69,255,0.35)',
                boxShadow: `0 0 ${opening ? '60px' : '28px'} rgba(153,69,255,0.25)`,
                transition: 'box-shadow 600ms ease-out',
                fontSize: opening ? 0 : 56,
              }}>
              {opening
                ? <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(153,69,255,0.5)', borderTopColor: 'transparent' }} />
                : <span style={{ fontSize: 52 }}>🎁</span>}
            </div>
            {!opening && <p className="font-body text-sm font-semibold" style={{ color: '#9945FF' }}>Tap to reveal</p>}
          </button>

          <div className="px-5 py-3 rounded-[--radius-xl] max-w-[280px]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
            <p className="font-body text-[10px] text-text-muted text-center leading-relaxed">
              Milestone Surprises are tied to deterministic triggers — app streaks, Circle milestones, and verified behaviours. They are never random or lottery-style.
            </p>
          </div>
        </>
      ) : (
        /* Revealed state */
        <div className="w-full flex flex-col gap-6 animate-fade-in">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-[28px] flex items-center justify-center text-4xl mx-auto mb-4"
              style={{ background: `${SURPRISE.color}15`, border: `2px solid ${SURPRISE.color}45`, boxShadow: `0 0 36px ${SURPRISE.color}35` }}>
              {SURPRISE.icon}
            </div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">Milestone Surprise</p>
            <p className="font-display text-2xl font-extrabold text-text">{SURPRISE.title}</p>
            <p className="font-body text-sm text-text-muted mt-2 leading-relaxed">{SURPRISE.description}</p>
          </div>

          {/* Rewards */}
          <div className="flex flex-col gap-2.5">
            {SURPRISE.change && (
              <div className="flex items-center gap-3 px-4 py-4 rounded-[--radius-2xl]"
                style={{ background: 'rgba(245,183,0,0.08)', border: '1.5px solid rgba(245,183,0,0.3)' }}>
                <span className="text-2xl">💎</span>
                <div>
                  <p className="font-display text-sm font-extrabold" style={{ color: '#F5B700' }}>{SURPRISE.change.toLocaleString()} Change</p>
                  <p className="font-body text-[10px] text-text-muted">Added to your Change Vault</p>
                </div>
              </div>
            )}
            {SURPRISE.days && (
              <div className="flex items-center gap-3 px-4 py-4 rounded-[--radius-2xl]"
                style={{ background: `${SURPRISE.color}08`, border: `1.5px solid ${SURPRISE.color}30` }}>
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-display text-sm font-extrabold" style={{ color: SURPRISE.color }}>{SURPRISE.days} Premium Days</p>
                  <p className="font-body text-[10px] text-text-muted">Activated · Prime access</p>
                </div>
              </div>
            )}
          </div>

          {/* Trigger explanation */}
          <div className="px-4 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
            <p className="font-body text-[10px] font-semibold text-text mb-0.5">Why you received this</p>
            <p className="font-body text-[10px] text-text-muted leading-relaxed">
              You completed a qualifying send for 7 consecutive weeks. This is a deterministic reward — it fires whenever that condition is met, no exceptions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
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
      )}
    </div>
  )
}
