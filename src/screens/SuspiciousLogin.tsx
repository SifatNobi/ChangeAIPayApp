import { useState } from 'react'
import Button from '@/components/Button'

interface SuspiciousLoginProps {
  activityType?: string
  location?: string
  onConfirm: () => void
  onSecure: () => void
}

type State = 'idle' | 'confirming' | 'confirmed' | 'securing'

function AlertShieldIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-28 h-28" aria-hidden="true">
      {/* Pulsing outer ring */}
      <circle cx="60" cy="60" r="54"
        stroke="rgba(245,183,0,0.1)" strokeWidth="1.5" strokeDasharray="5 4" />
      <circle cx="60" cy="60" r="44"
        fill="rgba(245,183,0,0.05)"
        stroke="rgba(245,183,0,0.18)" strokeWidth="1" />
      {/* Shield */}
      <path d="M60 22L32 36v28c0 20 14 32 28 36 14-4 28-16 28-36V36L60 22Z"
        fill="rgba(245,183,0,0.08)"
        stroke="rgba(245,183,0,0.5)" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Warning symbol inside shield */}
      <line x1="60" y1="46" x2="60" y2="66"
        stroke="rgba(245,183,0,0.9)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="74" r="2.5" fill="rgba(245,183,0,0.9)" />
    </svg>
  )
}

export default function SuspiciousLogin({
  activityType = 'login from an unusual location',
  location = 'Lagos, Nigeria',
  onConfirm,
  onSecure,
}: SuspiciousLoginProps) {
  const [state, setState] = useState<State>('idle')

  const handleConfirm = async () => {
    setState('confirming')
    await new Promise(r => setTimeout(r, 1100))
    setState('confirmed')
    setTimeout(onConfirm, 700)
  }

  const handleSecure = async () => {
    setState('securing')
    await new Promise(r => setTimeout(r, 900))
    onSecure()
  }

  return (
    <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
      {/* Amber strip header */}
      <div
        className="w-full rounded-[--radius-2xl] flex items-center gap-3 px-4 py-3 mb-6"
        style={{
          background: 'rgba(245,183,0,0.07)',
          border: '1px solid rgba(245,183,0,0.25)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5L1 14h14L8 1.5Z"
            stroke="#F5B700" strokeWidth="1.4" strokeLinejoin="round" />
          <line x1="8" y1="6" x2="8" y2="9.5"
            stroke="#F5B700" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="8" cy="11.5" r="0.8" fill="#F5B700" />
        </svg>
        <p className="font-body text-xs font-semibold text-warning">
          Unusual Activity Detected
        </p>
      </div>

      <div className="flex flex-col flex-1 items-center gap-6">
        <AlertShieldIllustration />

        {/* Explanation */}
        <div className="text-center flex flex-col gap-2.5 max-w-xs">
          <h1 className="font-display text-[22px] font-extrabold text-text leading-tight">
            Suspicious sign-in flagged
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            Our security system detected{' '}
            <span className="font-semibold text-text">{activityType}</span>.
            This could be you travelling — or someone trying to access your account.
          </p>
        </div>

        {/* Activity detail card */}
        <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-3">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">
            What we detected
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M2 13c0-3 2.3-5 5-5s5 2 5 5"
                      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ),
                label: 'Sign-in location',
                value: location,
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M7 4v3.5l2 2"
                      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ),
                label: 'Detected',
                value: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' today',
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="3" width="10" height="8" rx="1.5"
                      stroke="currentColor" strokeWidth="1.3" />
                    <path d="M5 3V2.5a2 2 0 0 1 4 0V3"
                      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ),
                label: 'Risk level',
                value: 'Elevated — please review',
              },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="text-text-muted shrink-0">{row.icon}</span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">
                    {row.label}
                  </p>
                  <p className="font-body text-sm text-text-2 truncate">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="font-body text-xs text-text-muted text-center max-w-xs leading-relaxed">
          Even if you block access, your account and funds remain completely secure.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <Button
          variant="primary" fullWidth
          loading={state === 'confirming'}
          disabled={state === 'confirming' || state === 'confirmed' || state === 'securing'}
          onClick={handleConfirm}
        >
          {state === 'confirmed' ? "Access Approved ✓" : "This Was Me — Continue"}
        </Button>
        <Button
          variant="danger" fullWidth
          loading={state === 'securing'}
          disabled={state === 'confirming' || state === 'confirmed' || state === 'securing'}
          onClick={handleSecure}
        >
          Secure My Account Now
        </Button>
      </div>
    </div>
  )
}
