import { useState } from 'react'
import Button from '@/components/Button'
import { Switch } from '@/components/Input'

interface KYCPendingProps {
  onContinue: () => void
}

function ProcessingIllustration({ notifyEnabled }: { notifyEnabled: boolean }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[220px] mx-auto" aria-hidden="true">
      {/* Central document */}
      <rect x="68" y="24" width="64" height="80" rx="7"
        fill="rgba(0,20,60,0.85)" stroke="rgba(0,102,255,0.35)" strokeWidth="1.5" />
      {/* Document lines */}
      <rect x="76" y="36" width="40" height="5" rx="2.5" fill="rgba(175,197,255,0.25)" />
      <rect x="76" y="46" width="32" height="4" rx="2" fill="rgba(175,197,255,0.15)" />
      <rect x="76" y="55" width="36" height="4" rx="2" fill="rgba(175,197,255,0.12)" />
      <rect x="76" y="64" width="28" height="4" rx="2" fill="rgba(175,197,255,0.1)" />
      {/* Spinning orbit ring */}
      <circle cx="100" cy="64" r="52"
        stroke="rgba(0,102,255,0.12)" strokeWidth="1"
        strokeDasharray="6 5" />
      {/* Orbit dot — animated with spin-slow */}
      <circle cx="100" cy="12" r="5"
        fill="rgba(63,231,255,0.5)"
        style={{ transformOrigin: '100px 64px', animation: 'spin 3s linear infinite' }} />
      {/* Shield badge at bottom */}
      <circle cx="100" cy="120" r="18"
        fill="rgba(0,210,106,0.08)" stroke="rgba(0,210,106,0.3)" strokeWidth="1.2" />
      <path d="M100 110l-8 4v6c0 4 2.8 6.2 8 7 5.2-.8 8-3 8-7v-6l-8-4Z"
        stroke="rgba(0,210,106,0.6)" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(0,210,106,0.08)" />

      {/* Bell when notify enabled */}
      {notifyEnabled && (
        <g style={{ animation: 'kyc-ring 1.8s ease-in-out 600ms infinite' }}>
          <path d="M152 38c0-4.4-2.7-8-7-9.5"
            stroke="rgba(245,183,0,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M155 44c0-6-3.5-11-10-12.8V28a3 3 0 0 0-6 0v3.2C132.5 33 129 38 129 44v6l-3 4h26l-3-4v-6Z"
            stroke="rgba(245,183,0,0.7)" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(245,183,0,0.08)" />
          <path d="M139 54a3 3 0 0 0 6 0"
            stroke="rgba(245,183,0,0.6)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </g>
      )}
      <style>{`
        @keyframes kyc-ring {
          0%, 100% { transform: rotate(-8deg); transform-origin: 142px 45px; }
          50%       { transform: rotate( 8deg); transform-origin: 142px 45px; }
        }
      `}</style>
    </svg>
  )
}

const WHAT_HAPPENS = [
  { step: '1', text: 'Our team reviews your documents — typically under 24 hours.' },
  { step: '2', text: "We'll cross-check your details with official records." },
  { step: '3', text: "You'll be notified the moment your account is fully verified." },
]

const LIMITED_ACCESS = [
  'View your account and balance',
  'Receive payments and transfers',
  'Add money to your wallet',
]

export default function KYCPending({ onContinue }: KYCPendingProps) {
  const [notify, setNotify] = useState(true)

  return (
    <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <ProcessingIllustration notifyEnabled={notify} />

          <div className="flex flex-col gap-2 max-w-xs">
            <div
              className="font-body text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mx-auto"
              style={{ background: 'rgba(245,183,0,0.1)', color: '#F5B700', border: '1px solid rgba(245,183,0,0.25)' }}
            >
              Under Review
            </div>
            <h1 className="font-display text-[26px] font-extrabold text-text leading-tight">
              Verification submitted
            </h1>
            <p className="font-body text-sm text-text-2 leading-relaxed">
              We have received everything we need. Our team is reviewing your submission and will notify you as soon as it is approved.
            </p>
          </div>
        </div>

        {/* Estimated time + notify toggle */}
        <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          <div className="px-4 py-4 flex items-center gap-3 border-b border-[color:var(--color-border)]">
            <div
              className="w-10 h-10 rounded-[--radius-lg] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,102,255,0.1)' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="#AFC5FF" strokeWidth="1.3" />
                <path d="M9 5v4.5l3 3" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-body text-sm font-semibold text-text">Estimated review time</p>
              <p className="font-body text-xs text-text-muted">Usually under 24 hours, often faster</p>
            </div>
          </div>
          <div className="px-4 py-4 flex items-center justify-between gap-3 min-h-[56px]">
            <div className="flex flex-col gap-0.5">
              <p className="font-body text-sm font-semibold text-text">Notify me when approved</p>
              <p className="font-body text-xs text-text-muted">Push notification as soon as it is done</p>
            </div>
            <Switch checked={notify} onChange={setNotify} />
          </div>
        </div>

        {/* What happens next */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">What happens next</p>
          {WHAT_HAPPENS.map(s => (
            <div key={s.step} className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}
              >
                <span className="font-mono text-[10px] font-bold text-accent">{s.step}</span>
              </div>
              <p className="font-body text-sm text-text-2 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Limited access while pending */}
        <div
          className="rounded-[--radius-xl] px-4 py-3.5 flex flex-col gap-2.5"
          style={{ background: 'rgba(0,210,106,0.05)', border: '1px solid rgba(0,210,106,0.15)' }}
        >
          <p className="font-body text-xs text-success font-semibold">While pending, you can still:</p>
          {LIMITED_ACCESS.map(item => (
            <div key={item} className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#00D26A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-xs text-text-2">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <Button variant="primary" fullWidth onClick={onContinue} className="mt-6">
        Explore the App
      </Button>
    </div>
  )
}
