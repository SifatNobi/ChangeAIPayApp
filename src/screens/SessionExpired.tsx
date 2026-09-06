import Button from '@/components/Button'
import { EncryptionBanner } from '@/components/States'

interface SessionExpiredProps {
  onLogin: () => void
}

function LockIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-28 h-28" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="60" cy="60" r="54"
        stroke="rgba(175,197,255,0.08)" strokeWidth="1" strokeDasharray="4 5" />
      {/* Mid ring */}
      <circle cx="60" cy="60" r="42"
        fill="rgba(0,102,255,0.05)"
        stroke="rgba(0,102,255,0.15)" strokeWidth="1" />
      {/* Lock body */}
      <rect x="38" y="56" width="44" height="32" rx="8"
        fill="rgba(0,20,60,0.8)"
        stroke="rgba(175,197,255,0.25)" strokeWidth="1.5" />
      {/* Lock shackle */}
      <path d="M48 56V44a12 12 0 0 1 24 0v12"
        stroke="rgba(175,197,255,0.45)" strokeWidth="2.5"
        strokeLinecap="round" fill="none" />
      {/* Keyhole */}
      <circle cx="60" cy="70" r="5"
        fill="rgba(175,197,255,0.3)" />
      <rect x="57.5" y="70" width="5" height="10" rx="2"
        fill="rgba(175,197,255,0.3)" />
    </svg>
  )
}

export default function SessionExpired({ onLogin }: SessionExpiredProps) {
  return (
    <div className="flex flex-col bg-bg px-5 pt-6 pb-10" style={{ minHeight: 785 }}>
      <div className="flex flex-col flex-1 items-center justify-center gap-8">
        <LockIllustration />

        <div className="text-center flex flex-col gap-2.5 max-w-xs">
          <h1 className="font-display text-2xl font-extrabold text-text">
            Session Timed Out
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            For your security, we automatically sign you out after a period of inactivity.
            This is a normal protection — your account and funds are completely safe.
          </p>
        </div>

        {/* Reassurance card */}
        <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-3">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">
            Nothing changed
          </p>
          {[
            { icon: '💰', text: 'Your balance and transactions are untouched' },
            { icon: '🔒', text: 'No one else can access your account' },
            { icon: '⚡', text: 'Log back in to pick up where you left off' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-base leading-none">{item.icon}</span>
              <p className="font-body text-sm text-text-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <EncryptionBanner />
        <Button variant="primary" fullWidth onClick={onLogin}>
          Log In Again
        </Button>
      </div>
    </div>
  )
}
