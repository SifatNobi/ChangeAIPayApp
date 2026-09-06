import { useEffect, useState } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'

interface WelcomeBackProps {
  name?: string
  onComplete: () => void
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

/* ── Ambient particles — deliberately not Pulse ─────────────── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left:     `${8 + ((i * 19 + 7) % 84)}%`,
  bottom:   (i * 23) % 55,
  size:     1.5 + (i % 3) * 0.8,
  duration: 2400 + (i * 213) % 1800,
  delay:    (i * 280) % 3200,
  color:
    i % 3 === 0 ? 'rgba(0,102,255,0.55)'
    : i % 3 === 1 ? 'rgba(63,231,255,0.45)'
    : 'rgba(175,197,255,0.35)',
}))

export default function WelcomeBack({
  name = 'Maya Patel',
  onComplete,
}: WelcomeBackProps) {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setTimeout(() => setFading(true), 1700)
    const t3 = setTimeout(onComplete, 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  const skip = () => {
    setFading(true)
    setTimeout(onComplete, 350)
  }

  const firstName = name.split(' ')[0]

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#050B2D',
        opacity: fading ? 0 : 1,
        transition: fading ? 'opacity 450ms ease-out' : 'opacity 550ms ease-in',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={skip}
      role="button"
      aria-label={`${greeting()}, ${firstName}. Tap to skip`}
    >
      {/* Radial depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 52%, rgba(0,102,255,0.11) 0%, transparent 65%)',
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: p.bottom,
              width:  p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              animation: `wb-float ${p.duration}ms ease-out ${p.delay}ms infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="flex flex-col items-center gap-6 relative z-10"
        style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition:
            'opacity 700ms ease-out, transform 700ms cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <div
          style={{
            background: 'rgba(0,102,255,0.08)',
            border: '1px solid rgba(63,231,255,0.14)',
            borderRadius: '50%',
            padding: 14,
          }}
        >
          <img
            src={logoSrc}
            alt="ChangeAIPay"
            className="w-14 h-14 object-contain"
            style={{ filter: 'drop-shadow(0 0 16px rgba(63,231,255,0.28))' }}
          />
        </div>

        <div className="text-center flex flex-col items-center gap-1.5">
          <p
            className="font-body text-sm font-medium"
            style={{ color: 'rgba(175,197,255,0.65)' }}
          >
            {greeting()},
          </p>
          <h1 className="font-display text-[42px] font-extrabold text-text tracking-tight leading-none">
            {firstName}
          </h1>
          <p
            className="font-body text-xs mt-2"
            style={{ color: 'rgba(175,197,255,0.4)' }}
          >
            Tap to continue
          </p>
        </div>
      </div>

      <style>{`
        @keyframes wb-float {
          0%   { transform: translateY(0)     scale(1);   opacity: 0;   }
          18%  {                                           opacity: 0.9; }
          75%  {                                           opacity: 0.4; }
          100% { transform: translateY(-72px) scale(0.3); opacity: 0;   }
        }
      `}</style>
    </div>
  )
}
