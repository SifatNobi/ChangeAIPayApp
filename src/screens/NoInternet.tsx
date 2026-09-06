import { useState, useEffect } from 'react'
import Button from '@/components/Button'

interface NoInternetProps {
  onRetry?: () => void
  onSettings?: () => void
}

/* Wifi-off illustration — calm, simple arcs */
function NoInternetIllustration({ searching }: { searching: boolean }) {
  return (
    <svg width="160" height="130" viewBox="0 0 160 130" fill="none" aria-hidden="true">
      {/* Background disc */}
      <circle cx="80" cy="68" r="48" fill="rgba(16,28,77,0.8)" stroke="rgba(175,197,255,0.08)" strokeWidth="1" />

      {/* Wifi arcs — broken (disconnected look) */}
      {/* Outer arc — dimmed/broken */}
      <path
        d="M34 60 Q80 18 126 60"
        stroke="rgba(175,197,255,0.15)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="8 6"
      />
      {/* Middle arc */}
      <path
        d="M46 72 Q80 40 114 72"
        stroke="rgba(175,197,255,0.2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="6 5"
      />
      {/* Inner arc */}
      <path
        d="M58 84 Q80 62 102 84"
        stroke="rgba(175,197,255,0.25)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Center dot */}
      <circle cx="80" cy="94" r="4" fill="rgba(175,197,255,0.3)" />

      {/* Diagonal "off" cross */}
      <line x1="60" y1="48" x2="100" y2="88"
        stroke="rgba(255,77,90,0.5)" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="48" x2="60" y2="88"
        stroke="rgba(255,77,90,0.5)" strokeWidth="2" strokeLinecap="round" />

      {/* Searching sweep arc — distinct minor animation, NOT Pulse */}
      {searching && (
        <path
          d="M46 72 Q80 40 114 72"
          stroke="#3FE7FF"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.7"
          style={{
            animation: 'searching-sweep 1.6s ease-in-out infinite',
          }}
        />
      )}
    </svg>
  )
}

export default function NoInternet({ onRetry, onSettings }: NoInternetProps) {
  const [searching, setSearching] = useState(false)
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setSearching(true)
    setRetrying(true)
    setTimeout(() => {
      setSearching(false)
      setRetrying(false)
      onRetry?.()
    }, 3000)
  }

  return (
    <>
      {/* Searching sweep keyframe — minor, distinct, not Pulse */}
      <style>{`
        @keyframes searching-sweep {
          0%   { stroke-dasharray: 0 80; stroke-dashoffset: 80; opacity: 0; }
          20%  { opacity: 0.7; }
          70%  { stroke-dasharray: 80 0; stroke-dashoffset: 0; opacity: 0.7; }
          100% { opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col min-h-screen bg-bg px-6 py-12">
        <div className="flex flex-col items-center flex-1 justify-center gap-8">

          <NoInternetIllustration searching={searching} />

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="font-display text-2xl font-extrabold text-text">No Connection</h1>
            <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
              ChangeAIPay needs internet to work. Check that Wi-Fi or mobile data is turned on, then try again.
            </p>
          </div>

          {/* Connection tips */}
          <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-3">
            <p className="font-body text-xs text-text-muted uppercase tracking-widest">Try these</p>
            {[
              { icon: '📶', tip: 'Turn Wi-Fi off and back on' },
              { icon: '✈️', tip: 'Make sure Airplane mode is off' },
              { icon: '🔄', tip: 'Toggle mobile data on' },
              { icon: '📍', tip: 'Move to an area with better signal' },
            ].map(t => (
              <div key={t.tip} className="flex items-center gap-3">
                <span className="text-base shrink-0">{t.icon}</span>
                <p className="font-body text-sm text-text-2">{t.tip}</p>
              </div>
            ))}
          </div>

          {/* Searching status */}
          {searching && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div
                className="w-3 h-3 rounded-full border-2 border-accent border-t-transparent"
                style={{ animation: 'spin 0.9s linear infinite' }}
              />
              <p className="font-body text-xs text-text-2">Searching for a connection…</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-6">
          <Button
            variant="primary"
            fullWidth
            loading={retrying}
            onClick={handleRetry}
          >
            {retrying ? 'Searching…' : 'Retry'}
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={onSettings}
          >
            Open Settings
          </Button>
        </div>
      </div>
    </>
  )
}
