import { useState, useEffect } from 'react'
import Button from '@/components/Button'

type LimitReason = 'id_capture' | 'liveness'

interface KYCAttemptLimitProps {
  reason?: LimitReason
  cooldownSeconds?: number
  onContactSupport: () => void
  onRetry?: () => void
}

function BlockedIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-28 h-28 mx-auto" aria-hidden="true">
      <circle cx="60" cy="60" r="54" stroke="rgba(255,59,48,0.09)" strokeWidth="1" strokeDasharray="5 4" />
      <circle cx="60" cy="60" r="42" fill="rgba(255,59,48,0.04)" stroke="rgba(255,59,48,0.18)" strokeWidth="1" />
      {/* Camera / face icon with slash */}
      <circle cx="60" cy="56" r="22" fill="rgba(0,20,60,0.7)" stroke="rgba(255,59,48,0.25)" strokeWidth="1.3" />
      {/* Simplified face */}
      <circle cx="53" cy="52" r="3" fill="rgba(175,197,255,0.2)" />
      <circle cx="67" cy="52" r="3" fill="rgba(175,197,255,0.2)" />
      <path d="M53 64 Q60 70 67 64" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Diagonal slash */}
      <line x1="40" y1="36" x2="80" y2="76"
        stroke="rgba(255,59,48,0.7)" strokeWidth="3" strokeLinecap="round" />
      {/* Badge */}
      <circle cx="60" cy="98" r="14" fill="rgba(255,59,48,0.1)" stroke="rgba(255,59,48,0.35)" strokeWidth="1.3" />
      <line x1="60" y1="91" x2="60" y2="97" stroke="#FF3B30" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="60" cy="100.5" r="1.3" fill="#FF3B30" />
    </svg>
  )
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`
}

const REASON_COPY: Record<LimitReason, { title: string; explanation: string; help: string[] }> = {
  id_capture: {
    title: 'Too many capture attempts',
    explanation: "You have reached the maximum number of document capture attempts allowed in one session. This limit helps protect against automated fraud. You are not in trouble — this happens occasionally.",
    help: [
      "Make sure your document is in good condition — no tears, folds over text, or heavy wear.",
      "Use a dark, non-reflective surface to place the document on.",
      "Try in a different location with more even lighting.",
    ],
  },
  liveness: {
    title: 'Liveness check attempts exceeded',
    explanation: "You have used all three liveness check attempts in this session. This limit is a security measure. Your account and any submitted data are safe.",
    help: [
      "Ensure your face is fully visible — remove glasses, hats, or face coverings.",
      "Find a space with even, forward-facing lighting — avoid windows behind you.",
      "Follow the on-screen prompts slowly and hold each pose for a full second.",
    ],
  },
}

export default function KYCAttemptLimit({
  reason = 'liveness',
  cooldownSeconds = 300,
  onContactSupport,
  onRetry,
}: KYCAttemptLimitProps) {
  const [remaining, setRemaining] = useState(cooldownSeconds)
  const done = remaining <= 0

  useEffect(() => {
    if (done) return
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000)
    return () => clearInterval(id)
  }, [done])

  const copy = REASON_COPY[reason]
  const progress = done ? 1 : 1 - remaining / cooldownSeconds

  /* Mini arc timer */
  const r = 30
  const circ = 2 * Math.PI * r

  return (
    <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
      <div className="flex flex-col flex-1 gap-6">
        {/* Status badge */}
        <div className="flex justify-center">
          <div
            className="font-body text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,59,48,0.1)', color: '#FF3B30', border: '1px solid rgba(255,59,48,0.25)' }}
          >
            Attempt Limit Reached
          </div>
        </div>

        <BlockedIllustration />

        {/* Heading */}
        <div className="text-center flex flex-col gap-2 max-w-xs mx-auto">
          <h1 className="font-display text-[22px] font-extrabold text-text leading-tight">
            {copy.title}
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            {copy.explanation}
          </p>
        </div>

        {/* Cooldown timer */}
        {!done ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
                <circle cx="38" cy="38" r={r} stroke="rgba(175,197,255,0.1)" strokeWidth="5" />
                <circle cx="38" cy="38" r={r}
                  stroke="rgba(0,102,255,0.55)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - progress)}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '38px 38px', transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center leading-none">
                <span className="font-display text-lg font-extrabold text-text">{formatTime(remaining)}</span>
              </div>
            </div>
            <p className="font-body text-xs text-text-muted">before you can try again</p>
          </div>
        ) : (
          <div
            className="rounded-[--radius-xl] px-4 py-3 flex items-center gap-2 animate-scale-in"
            style={{ background: 'rgba(0,210,106,0.08)', border: '1px solid rgba(0,210,106,0.2)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-6" stroke="#00D26A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-sm font-semibold text-success">Cooldown complete — you can try again</p>
          </div>
        )}

        {/* Tips */}
        <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-4 flex flex-col gap-3">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">Tips for next time</p>
          {copy.help.map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}
              >
                <span className="font-mono text-[9px] font-bold text-accent">{i + 1}</span>
              </div>
              <p className="font-body text-sm text-text-2 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div
          className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-2"
          style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
            <path d="M7 1L2 3.5v5c0 3 2.2 4.6 5 5 2.8-.4 5-2 5-5v-5L7 1Z"
              stroke="#AFC5FF" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-2 leading-relaxed">
            Your account and any information you have already submitted remain safe and intact. The limit resets automatically.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        {done && onRetry && (
          <Button variant="primary" fullWidth onClick={onRetry}>
            Try Again
          </Button>
        )}
        {!done && (
          <Button variant="secondary" fullWidth disabled>
            Try Again in {formatTime(remaining)}
          </Button>
        )}
        <Button
          variant={done && !onRetry ? 'primary' : 'ghost'}
          fullWidth
          onClick={onContactSupport}
        >
          Contact Support
        </Button>
      </div>
    </div>
  )
}
