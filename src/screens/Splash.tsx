import { useEffect, useState } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'
import Pulse from '@/components/Pulse'

interface SplashProps {
  onComplete: () => void
}

export default function Splash({ onComplete }: SplashProps) {
  const [phase, setPhase] = useState<'in' | 'pulse' | 'hold' | 'out'>('in')

  useEffect(() => {
    // Phase timeline: fade-in → Pulse fires → hold → fade-out
    const t1 = setTimeout(() => setPhase('pulse'), 800)
    const t2 = setTimeout(() => setPhase('hold'), 1200)
    const t3 = setTimeout(() => setPhase('out'), 3200)
    const t4 = setTimeout(() => onComplete(), 3700)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: '#050B2D',
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'out' ? 'opacity 500ms ease-out' : 'opacity 600ms ease-in',
      }}
      aria-label="ChangeAIPay loading"
      role="status"
    >
      {/* Subtle radial depth — not a glow wash, just dimensionality */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(0,102,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div
        className="flex flex-col items-center gap-8 relative z-10"
        style={{
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 600ms ease-out, transform 600ms cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Logo */}
        <div className="relative">
          <img
            src={logoSrc}
            alt="ChangeAIPay"
            className="w-24 h-24 object-contain"
            style={{ filter: 'drop-shadow(0 0 20px rgba(63,231,255,0.2))' }}
          />
        </div>

        {/* App name */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-display text-3xl font-extrabold text-text tracking-tight">
            Change<span className="text-gradient-primary">AI</span>Pay
          </h1>
          {/* Pulse — the opening gesture, fires exactly once here */}
          <div
            style={{
              opacity: phase === 'pulse' || phase === 'hold' ? 1 : 0,
              transition: 'opacity 400ms ease',
            }}
          >
            <Pulse
              trigger={phase === 'pulse'}
              width={220}
              height={44}
              color="#3FE7FF"
            />
          </div>
        </div>

        {/* Tagline */}
        <div
          className="max-w-[280px] text-center flex flex-col gap-1"
          style={{
            opacity: phase === 'hold' ? 1 : 0,
            transform: phase === 'hold' ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 500ms ease 200ms, transform 500ms ease 200ms',
          }}
        >
          <p className="font-display text-sm font-bold text-text">
            Beats Of Change!
          </p>
          <p className="font-body text-xs text-text-2 leading-relaxed">
            AI-Powered Payments. Reimagined with zero transaction fees worldwide.
          </p>
        </div>
      </div>
    </div>
  )
}
