import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'

interface KYCBiometricConsentProps {
  onAccept: () => void
  onDecline: () => void
  onBack: () => void
}

function FaceScanIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[200px] mx-auto" aria-hidden="true">
      {/* Outer scan ring */}
      <circle cx="100" cy="80" r="62"
        stroke="rgba(0,102,255,0.12)" strokeWidth="1" strokeDasharray="5 5" />

      {/* Face oval */}
      <ellipse cx="100" cy="78" rx="44" ry="54"
        fill="rgba(0,20,60,0.6)" stroke="rgba(63,231,255,0.35)" strokeWidth="1.5" />

      {/* Corner scan brackets */}
      {[
        [56, 24,  1,  1],
        [144,24, -1,  1],
        [56, 132, 1, -1],
        [144,132,-1, -1],
      ].map(([x, y, sx, sy], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x + sx * 14} y2={y}
            stroke="rgba(63,231,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          <line x1={x} y1={y} x2={x} y2={y + sy * 14}
            stroke="rgba(63,231,255,0.5)" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}

      {/* Face feature dots */}
      {/* Eyes */}
      <circle cx="84"  cy="68" r="4" fill="rgba(175,197,255,0.2)" stroke="rgba(175,197,255,0.3)" strokeWidth="1" />
      <circle cx="116" cy="68" r="4" fill="rgba(175,197,255,0.2)" stroke="rgba(175,197,255,0.3)" strokeWidth="1" />
      {/* Nose */}
      <circle cx="100" cy="82" r="2.5" fill="rgba(175,197,255,0.15)" />
      {/* Mouth */}
      <path d="M90 94 Q100 100 110 94" stroke="rgba(175,197,255,0.25)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Mapping mesh lines — subtle */}
      {[[84,68,100,82],[116,68,100,82],[100,82,100,94],[84,68,76,58],[116,68,124,58]].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(63,231,255,0.12)" strokeWidth="0.75" />
      ))}

      {/* Shield badge */}
      <circle cx="100" cy="148" r="12"
        fill="rgba(0,210,106,0.1)" stroke="rgba(0,210,106,0.35)" strokeWidth="1.2" />
      <path d="M100 142l-5 2.5v4c0 2.5 2 3.8 5 4.2 3-.4 5-1.7 5-4.2v-4l-5-2.5Z"
        stroke="rgba(0,210,106,0.6)" strokeWidth="1.1" strokeLinejoin="round" fill="rgba(0,210,106,0.08)" />
    </svg>
  )
}

const DATA_POINTS = [
  { label: 'What we capture',  value: 'A mathematical representation of your facial geometry — not a stored photo or video.' },
  { label: 'How long we keep it', value: 'Deleted within 30 days of verification completing, or immediately on request.' },
  { label: 'How it is used',   value: 'Exclusively for identity verification. Never used for authentication, advertising, or shared with third parties.' },
  { label: 'Your rights',      value: 'You can request deletion at any time from Settings → Privacy → Your Data.' },
]

export default function KYCBiometricConsent({
  onAccept,
  onDecline,
  onBack,
}: KYCBiometricConsentProps) {
  const [declining, setDeclining] = useState(false)

  if (declining) {
    return (
      <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
        <div className="flex flex-col flex-1 items-center justify-center gap-6 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(245,183,0,0.08)', border: '1px solid rgba(245,183,0,0.2)' }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 8v12M18 26v2" stroke="#F5B700" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M15 4L3 26a4 4 0 0 0 3.5 6h23A4 4 0 0 0 33 26L21 4a4 4 0 0 0-6 0Z"
                stroke="#F5B700" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex flex-col gap-2.5 max-w-xs">
            <h2 className="font-display text-[22px] font-extrabold text-text leading-tight">
              Verification requires biometric consent
            </h2>
            <p className="font-body text-sm text-text-2 leading-relaxed">
              Financial regulations require us to verify your identity using a liveness check. Without consent to process your facial biometric data, we cannot complete this step and your account will remain unverified.
            </p>
          </div>

          <div
            className="w-full rounded-[--radius-xl] px-4 py-3.5 flex flex-col gap-2"
            style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.18)' }}
          >
            <p className="font-body text-xs font-semibold text-warning">With an unverified account you can:</p>
            {['Receive payments', 'View your balance', 'Add money to your wallet'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-xs text-text-2">{item}</p>
              </div>
            ))}
            <p className="font-body text-[11px] text-text-muted mt-1">
              Sending money and full features require a verified account.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Button variant="primary" fullWidth onClick={() => setDeclining(false)}>
            Review Consent Again
          </Button>
          <Button variant="ghost" fullWidth onClick={onDecline}>
            Continue Without Verifying
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg px-5 pt-4 pb-10" style={{ minHeight: 785 }}>
      <AuthHeader onBack={onBack} title="Biometric Consent" step={2} totalSteps={6} />

      <div className="flex flex-col gap-5 mt-5">
        <FaceScanIllustration />

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[24px] font-extrabold text-text leading-tight">
            Biometric data consent
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            Our liveness check captures a brief scan of your face to confirm you are a real person. Before we proceed, we need your explicit consent to process this data.
          </p>
        </div>

        {/* Data handling cards */}
        <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          {DATA_POINTS.map((item, i) => (
            <div
              key={item.label}
              className={`px-4 py-4 flex flex-col gap-1 ${i < DATA_POINTS.length - 1 ? 'border-b border-[color:var(--color-border)]' : ''}`}
            >
              <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">{item.label}</p>
              <p className="font-body text-sm text-text-2 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Legal basis note */}
        <div
          className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-2"
          style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.12)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mt-0.5 shrink-0">
            <path d="M6.5 1L2 3.2v4.5c0 2.8 2 4.3 4.5 4.7 2.5-.4 4.5-1.9 4.5-4.7V3.2L6.5 1Z"
              stroke="#AFC5FF" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Processing is lawful under GDPR Article 9(2)(g) — substantial public interest in preventing financial crime. You may withdraw consent at any time; this will pause your verification.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-auto pt-8">
        <Button variant="primary" fullWidth onClick={onAccept}>
          I Accept — Continue to Verification
        </Button>
        <Button variant="ghost" fullWidth onClick={() => setDeclining(true)}>
          Decline
        </Button>
      </div>
    </div>
  )
}
