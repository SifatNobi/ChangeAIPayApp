import { useEffect, useState } from 'react'
import Button from '@/components/Button'

interface AccountCreatedProps {
  name: string
  accountType: 'personal' | 'business'
  onContinue: () => void
}

/* Confetti piece */
const CONFETTI_COLORS = ['#0066FF', '#3FE7FF', '#00D26A', '#F5B700', '#AFC5FF', '#FFFFFF']
const PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  x: 10 + Math.random() * 80,      // % from left
  delay: Math.random() * 0.8,       // seconds
  duration: 1.0 + Math.random() * 0.8,
  size: 5 + Math.random() * 5,
  rotation: Math.random() * 360,
  shape: i % 3 === 0 ? 'circle' : 'rect',
}))

function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PIECES.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.shape === 'circle' ? p.size : p.size * 0.6,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            background: p.color,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

export default function AccountCreated({ name, accountType, onContinue }: AccountCreatedProps) {
  const [phase, setPhase] = useState<'animating' | 'done'>('animating')
  const firstName = name.split(' ')[0] || name

  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative flex flex-col min-h-screen bg-bg items-center justify-between px-5 py-16 overflow-hidden">
      <Confetti active={phase === 'animating'} />

      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
        {/* Animated success mark */}
        <div
          className="w-24 h-24 rounded-full bg-success/12 border border-success/25 flex items-center justify-center animate-success"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 20l8 8 14-16"
              stroke="#00D26A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-3xl font-extrabold text-text">
            Welcome, {firstName}!
          </h1>
          <p className="font-body text-base text-text-2 leading-relaxed max-w-xs">
            {accountType === 'personal'
              ? "Your personal account is ready. Fina is excited to meet you."
              : "Your business account is ready. Aina is ready to get to work."}
          </p>
        </div>

        {/* What's set up */}
        <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-3">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-1">
            Your account includes
          </p>
          {[
            accountType === 'personal' ? 'Fina AI personal coach activated' : 'Aina AI business analyst activated',
            'Zero-fee international transfers enabled',
            'Multi-currency wallet created',
            '256-bit encryption active',
            'Account number assigned',
          ].map(item => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-success/12 flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#00D26A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-body text-sm text-text-2">{item}</p>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-text-muted text-center">
          Next: set your PIN to secure your account
        </p>
      </div>

      <div className="w-full relative z-10">
        <Button variant="primary" fullWidth onClick={onContinue}>
          Set Up PIN →
        </Button>
      </div>
    </div>
  )
}
