import { useEffect, useState } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'

interface LoadingGatewayProps {
  onAuthenticated: () => void
  onExpired: () => void
  onFirstTime: () => void
}

type Phase = 'in' | 'checking' | 'out'

export default function LoadingGateway({
  onAuthenticated,
  onExpired: _onExpired,
  onFirstTime: _onFirstTime,
}: LoadingGatewayProps) {
  const [phase, setPhase] = useState<Phase>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('checking'), 400)
    const t2 = setTimeout(() => setPhase('out'), 1900)
    const t3 = setTimeout(onAuthenticated, 2350)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onAuthenticated])

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: '#050B2D',
        opacity: phase === 'out' ? 0 : 1,
        transition:
          phase === 'out' ? 'opacity 450ms ease-out' : 'opacity 500ms ease-in',
      }}
      aria-label="Loading ChangeAIPay"
      role="status"
    >
      {/* Ambient depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 48%, rgba(0,102,255,0.09) 0%, transparent 68%)',
        }}
      />

      <div
        className="flex flex-col items-center gap-8 relative z-10"
        style={{
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 500ms ease, transform 500ms cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Breathing logo */}
        <div
          style={{
            animation:
              phase === 'checking' ? 'gw-breathe 2.6s ease-in-out infinite' : 'none',
          }}
        >
          <img
            src={logoSrc}
            alt="ChangeAIPay"
            className="w-[72px] h-[72px] object-contain"
            style={{ filter: 'drop-shadow(0 0 18px rgba(63,231,255,0.20))' }}
          />
        </div>

        {/* Typing dots — reuses existing keyframe from index.css */}
        <div className="flex items-center gap-1.5">
          {([0, 150, 300] as const).map(delay => (
            <div
              key={delay}
              className="w-[5px] h-[5px] rounded-full"
              style={{
                background: 'rgba(175,197,255,0.45)',
                animation: `dots-typing 1.2s ease-in-out ${delay}ms infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gw-breathe {
          0%, 100% { transform: scale(1);    opacity: 0.82; }
          50%       { transform: scale(1.07); opacity: 1;    }
        }
      `}</style>
    </div>
  )
}
