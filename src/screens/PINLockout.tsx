import { useState, useEffect } from 'react'
import Button from '@/components/Button'

interface PINLockoutProps {
  lockoutSeconds?: number
  failedAttempts?: number
  lockoutReason?: 'pin' | 'biometric'
  onPasswordLogin: () => void
  onRetry?: () => void
}

const LOCKOUT_TIERS = [
  { attempts: 3,  seconds: 30 },
  { attempts: 5,  seconds: 120 },
  { attempts: 7,  seconds: 300 },
  { attempts: 10, seconds: 900 },
]

function LockoutIllustration({ progress }: { progress: number }) {
  const radius = 40
  const circ   = 2 * Math.PI * radius
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-28 h-28" aria-hidden="true">
      {/* Track */}
      <circle cx="60" cy="60" r={radius}
        stroke="rgba(175,197,255,0.1)" strokeWidth="5" />
      {/* Progress arc */}
      <circle cx="60" cy="60" r={radius}
        stroke="rgba(0,102,255,0.55)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - progress)}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 1s linear' }}
      />
      {/* Lock icon */}
      <rect x="46" y="56" width="28" height="22" rx="5"
        fill="rgba(0,20,60,0.85)"
        stroke="rgba(175,197,255,0.35)" strokeWidth="1.5" />
      <path d="M52 56V50a8 8 0 0 1 16 0v6"
        stroke="rgba(175,197,255,0.5)" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      <circle cx="60" cy="65" r="3.5" fill="rgba(175,197,255,0.4)" />
      <rect x="58.5" y="65" width="3" height="7" rx="1.5"
        fill="rgba(175,197,255,0.4)" />
    </svg>
  )
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  if (m > 0) return `${m}:${String(s).padStart(2, '0')}`
  return `${s}s`
}

export default function PINLockout({
  lockoutSeconds: initialLockout,
  failedAttempts = 5,
  lockoutReason = 'pin',
  onPasswordLogin,
  onRetry,
}: PINLockoutProps) {
  const computedLockout =
    initialLockout ??
    (LOCKOUT_TIERS.find(t => failedAttempts <= t.attempts) ?? LOCKOUT_TIERS[LOCKOUT_TIERS.length - 1]).seconds

  const [remaining, setRemaining] = useState(computedLockout)
  const done = remaining <= 0

  useEffect(() => {
    if (done) return
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000)
    return () => clearInterval(id)
  }, [done])

  const progress = done ? 1 : 1 - remaining / computedLockout
  const reasonLabel = lockoutReason === 'biometric' ? 'biometric' : 'PIN'

  return (
    <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
      <div className="flex flex-col flex-1 items-center justify-center gap-8">
        {/* Timer circle illustration */}
        <div className="flex flex-col items-center gap-3">
          <LockoutIllustration progress={progress} />
          {!done && (
            <div className="text-center flex flex-col gap-0.5">
              <p
                className="font-display text-4xl font-extrabold tracking-tight"
                style={{
                  color: remaining < 30 ? '#3FE7FF' : 'rgba(175,197,255,0.75)',
                  transition: 'color 500ms',
                }}
              >
                {formatTime(remaining)}
              </p>
              <p className="font-body text-xs text-text-muted">before you can try again</p>
            </div>
          )}
          {done && (
            <div className="text-center flex flex-col gap-0.5 animate-scale-in">
              <p className="font-display text-xl font-extrabold text-success">
                You can try again
              </p>
            </div>
          )}
        </div>

        {/* Explanation */}
        <div className="text-center flex flex-col gap-2.5 max-w-xs">
          <h1 className="font-display text-[22px] font-extrabold text-text leading-tight">
            {reasonLabel === 'biometric' ? 'Biometric' : 'PIN'} temporarily locked
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            After {failedAttempts} failed {reasonLabel} attempts, we have temporarily
            locked this method to protect your account. This is an automatic security measure.
          </p>
        </div>

        {/* Attempt history pills */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.min(failedAttempts, 8) }, (_, i) => (
            <div
              key={i}
              className="w-6 h-2 rounded-full"
              style={{ background: 'rgba(255,59,48,0.45)' }}
            />
          ))}
          {failedAttempts > 8 && (
            <p className="font-body text-xs text-text-muted ml-1">+{failedAttempts - 8}</p>
          )}
        </div>

        {/* Security note */}
        <div
          className="w-full rounded-[--radius-xl] px-4 py-3 flex items-start gap-3"
          style={{
            background: 'rgba(0,102,255,0.06)',
            border: '1px solid rgba(0,102,255,0.14)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="text-accent shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
            <line x1="8" y1="5" x2="8" y2="8.5"
              stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.7" fill="currentColor" />
          </svg>
          <p className="font-body text-xs text-text-2 leading-relaxed">
            Your account and balance remain secure. The lock protects against
            brute-force access attempts.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        {done && onRetry && (
          <Button variant="primary" fullWidth onClick={onRetry}>
            Try {reasonLabel === 'biometric' ? 'Biometrics' : 'PIN'} Again
          </Button>
        )}
        <Button
          variant={done && !onRetry ? 'primary' : 'secondary'}
          fullWidth
          onClick={onPasswordLogin}
        >
          Log In with Email &amp; Password
        </Button>
      </div>
    </div>
  )
}
