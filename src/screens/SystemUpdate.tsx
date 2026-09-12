import { useState, useEffect } from 'react'

interface SystemUpdateProps {
  onRestart?: () => void
  onDismiss?: () => void
}

export default function SystemUpdate({ onRestart, onDismiss }: SystemUpdateProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  // Simulate a realistic download that accelerates then slightly slows near the end
  useEffect(() => {
    if (progress >= 100) {
      setDone(true)
      return
    }
    const delay = progress < 30
      ? 60
      : progress < 70
      ? 90
      : progress < 90
      ? 140
      : 200

    const tick = setTimeout(() => {
      setProgress(p => {
        const step = progress < 30 ? 2 : progress < 70 ? 1.5 : 1
        return Math.min(100, p + step)
      })
    }, delay)

    return () => clearTimeout(tick)
  }, [progress])

  const pct = Math.round(progress)

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(4,11,28,0.72)', backdropFilter: 'blur(16px)' }}
    >
      <div
        className="mx-5 w-full rounded-[28px] overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(8,20,60,0.97) 0%, rgba(5,14,44,0.99) 100%)',
          border: '1px solid rgba(0,102,255,0.28)',
          boxShadow: '0 0 0 1px rgba(175,197,255,0.06), 0 32px 64px rgba(0,0,0,0.55), 0 0 80px rgba(0,102,255,0.12)',
        }}
      >
        {/* Top glow strip */}
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,102,255,0.45) 40%, rgba(63,231,255,0.35) 60%, transparent 100%)' }}
        />

        <div className="px-7 pt-7 pb-8 flex flex-col gap-6">
          {/* Icon + label */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-16 h-16 rounded-[20px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,102,255,0.18) 0%, rgba(63,231,255,0.1) 100%)',
                border: '1px solid rgba(0,102,255,0.35)',
                boxShadow: '0 0 24px rgba(0,102,255,0.2), inset 0 1px 0 rgba(175,197,255,0.1)',
              }}
            >
              {done ? (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14l7 7 11-11" stroke="#3FE7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 6v10M14 16l-4-4M14 16l4-4" stroke="#3FE7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 20h16" stroke="rgba(0,102,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="14" cy="14" r="11" stroke="rgba(0,102,255,0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
                </svg>
              )}
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: 'rgba(63,231,255,0.6)' }}>
                {done ? "Update complete" : "Keeping things running smoothly"}
              </p>
              <h2 className="font-display text-xl font-extrabold text-white tracking-tight">
                System Update
              </h2>
              <p className="font-body text-sm leading-relaxed mt-0.5"
                style={{ color: 'rgba(175,197,255,0.55)', maxWidth: 260 }}>
                {done
                  ? "Your update is ready. Restart now to apply the latest improvements."
                  : "We're installing your update in the background. This will only take a moment."}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-body text-xs font-medium" style={{ color: 'rgba(175,197,255,0.5)' }}>Progress</p>
              <p className="font-mono text-xs font-bold" style={{ color: done ? '#3FE7FF' : 'rgba(175,197,255,0.75)' }}>
                {pct}%
              </p>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(175,197,255,0.08)' }}>
              <div
                className="h-full rounded-full transition-all duration-[300ms] ease-out"
                style={{
                  width: `${pct}%`,
                  background: done
                    ? 'linear-gradient(90deg, #0066FF 0%, #3FE7FF 100%)'
                    : 'linear-gradient(90deg, #0066FF 0%, #3FE7FF 100%)',
                  boxShadow: done
                    ? '0 0 12px rgba(63,231,255,0.5)'
                    : '0 0 8px rgba(0,102,255,0.4)',
                }}
              />
            </div>
            {!done && (
              <p className="font-body text-[10px] text-center" style={{ color: 'rgba(175,197,255,0.35)' }}>
                Your current session will not be interrupted.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={done ? onRestart : undefined}
              disabled={!done}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
              style={{
                background: done ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.06)',
                color: done ? 'white' : 'rgba(175,197,255,0.3)',
                border: done ? 'none' : '1px solid rgba(175,197,255,0.1)',
                cursor: done ? 'pointer' : 'not-allowed',
                boxShadow: done ? '0 4px 20px rgba(0,102,255,0.4)' : 'none',
              }}
            >
              {done ? "Restart Now" : "Downloading…"}
            </button>

            {!done && (
              <button
                onClick={onDismiss}
                className="w-full h-10 rounded-[--radius-xl] font-body text-sm transition-all hover:bg-surface-hi active:scale-[0.98]"
                style={{ color: 'rgba(175,197,255,0.4)' }}
              >
                Continue in background
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
