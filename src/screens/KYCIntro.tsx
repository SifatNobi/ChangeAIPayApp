import Button from '@/components/Button'
import { EncryptionBanner } from '@/components/States'

interface KYCIntroProps {
  onStart: () => void
  onBack: () => void
}

function VerifyIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[220px] mx-auto" aria-hidden="true">
      {/* ID card */}
      <rect x="28" y="36" width="100" height="68" rx="8"
        fill="rgba(0,20,60,0.85)" stroke="rgba(0,102,255,0.35)" strokeWidth="1.5" />
      {/* Card stripe */}
      <rect x="28" y="50" width="100" height="12" fill="rgba(0,102,255,0.1)" />
      {/* Photo placeholder */}
      <rect x="36" y="68" width="22" height="26" rx="4"
        fill="rgba(175,197,255,0.1)" stroke="rgba(175,197,255,0.2)" strokeWidth="1" />
      <circle cx="47" cy="75" r="5" fill="rgba(175,197,255,0.2)" />
      <path d="M39 94c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(175,197,255,0.15)" />
      {/* Text lines */}
      <rect x="64" y="68" width="38" height="5" rx="2.5" fill="rgba(175,197,255,0.25)" />
      <rect x="64" y="77" width="28" height="4" rx="2" fill="rgba(175,197,255,0.15)" />
      <rect x="64" y="85" width="32" height="4" rx="2" fill="rgba(175,197,255,0.12)" />
      {/* Corner brackets on card */}
      <path d="M36 44h-6v-6" stroke="rgba(63,231,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M120 44h6v-6" stroke="rgba(63,231,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Selfie circle */}
      <circle cx="152" cy="70" r="30"
        fill="rgba(0,20,60,0.7)" stroke="rgba(63,231,255,0.3)" strokeWidth="1.5"
        strokeDasharray="5 4" />
      <circle cx="152" cy="64" r="10" fill="rgba(175,197,255,0.15)" stroke="rgba(175,197,255,0.25)" strokeWidth="1" />
      <path d="M132 100c0-11 9-20 20-20s20 9 20 20" fill="rgba(175,197,255,0.1)" />
      {/* Success badge */}
      <circle cx="152" cy="100" r="14"
        fill="rgba(0,210,106,0.12)" stroke="rgba(0,210,106,0.4)" strokeWidth="1.5" />
      <path d="M145 100l5 5 9-9"
        stroke="rgba(0,210,106,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Link line between ID and selfie */}
      <line x1="128" y1="70" x2="122" y2="70"
        stroke="rgba(63,231,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  )
}

const STEPS = [
  { icon: '🪪', label: 'Government-issued ID', note: 'Passport, driving licence, or national ID' },
  { icon: '🤳', label: 'Selfie photo',          note: 'A quick liveness check — takes 30 seconds' },
  { icon: '📍', label: 'Your address',           note: 'Must match your government ID' },
]

const PRIVACY = [
  'Your data is encrypted end-to-end and never sold.',
  'Verification is powered by our regulated KYC partner.',
  'Your ID images are deleted 30 days after approval.',
]

export default function KYCIntro({ onStart, onBack }: KYCIntroProps) {
  return (
    <div className="flex flex-col bg-bg px-5 pt-4 pb-10" style={{ minHeight: 785 }}>
      {/* Back arrow */}
      <button
        onClick={onBack}
        className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors focus-ring"
        aria-label="Back"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="rgba(175,197,255,0.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex flex-col flex-1 gap-6 mt-4">
        <VerifyIllustration />

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className="font-body text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,102,255,0.1)', color: '#AFC5FF', border: '1px solid rgba(0,102,255,0.2)' }}
            >
              Identity Verification
            </span>
            <span
              className="font-body text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,210,106,0.08)', color: '#00D26A', border: '1px solid rgba(0,210,106,0.2)' }}
            >
              ~3 minutes
            </span>
          </div>
          <h1 className="font-display text-[26px] font-extrabold text-text leading-tight">
            Verify your identity
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            To comply with financial regulations and protect your account, we need to confirm who you are.
            This is a one-time process.
          </p>
        </div>

        {/* What you need */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">What you need</p>
          {STEPS.map(s => (
            <div key={s.label}
              className="flex items-center gap-3 rounded-[--radius-xl] bg-surface border border-[color:var(--color-border)] px-4 py-3.5">
              <span className="text-xl leading-none shrink-0">{s.icon}</span>
              <div className="flex flex-col gap-0.5">
                <p className="font-body text-sm font-semibold text-text">{s.label}</p>
                <p className="font-body text-xs text-text-muted">{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy */}
        <div
          className="rounded-[--radius-xl] px-4 py-3.5 flex flex-col gap-2"
          style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.12)' }}
        >
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">Your privacy</p>
          {PRIVACY.map(p => (
            <div key={p} className="flex items-start gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0">
                <path d="M6 1L2 3v4c0 2.5 1.8 3.9 4 4.3 2.2-.4 4-1.8 4-4.3V3L6 1Z"
                  stroke="#AFC5FF" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-xs text-text-2 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <EncryptionBanner />
        <Button variant="primary" fullWidth onClick={onStart}>
          Start Verification
        </Button>
      </div>
    </div>
  )
}
