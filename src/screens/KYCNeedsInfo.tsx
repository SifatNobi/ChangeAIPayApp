import { useState } from 'react'
import Button from '@/components/Button'
import { Switch } from '@/components/Input'

type ReviewMode = 'resubmit_doc' | 'manual_review'

interface NeedsInfoConfig {
  mode: ReviewMode
  detail?: string
}

interface KYCNeedsInfoProps {
  mode?: ReviewMode
  detail?: string
  onResubmit?: () => void
  onContinue: () => void
}

/* ── Mode configs ─────────────────────────────────────────────── */
const CONFIGS: Record<ReviewMode, {
  badge: string
  badgeColor: string
  title: string
  explanation: string
  ctaLabel: string
  estimatedTime?: string
}> = {
  resubmit_doc: {
    badge: 'Action Required',
    badgeColor: 'rgba(245,183,0,',
    title: 'We need a clearer document',
    explanation: 'The photo of your ID was not clear enough for our verification system to read all the required details. Please recapture it following the tips below.',
    ctaLabel: 'Resubmit Document',
    estimatedTime: undefined,
  },
  manual_review: {
    badge: 'Under Manual Review',
    badgeColor: 'rgba(0,102,255,',
    title: 'A human is reviewing your case',
    explanation: "Your application has been flagged for manual review by our compliance team. This is a normal part of our verification process and does not indicate a problem with your application.",
    ctaLabel: 'Notify Me When Done',
    estimatedTime: 'Up to 48 hours',
  },
}

function ClockIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 mx-auto" aria-hidden="true">
      <circle cx="60" cy="60" r="52" stroke="rgba(0,102,255,0.12)" strokeWidth="1" strokeDasharray="5 4" />
      <circle cx="60" cy="60" r="40" fill="rgba(0,20,60,0.6)" stroke="rgba(0,102,255,0.28)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="3" fill="rgba(175,197,255,0.6)" />
      <line x1="60" y1="60" x2="60" y2="36" stroke="rgba(175,197,255,0.7)" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="60" x2="78" y2="68" stroke="rgba(63,231,255,0.6)" strokeWidth="2" strokeLinecap="round" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const isMajor = i % 3 === 0
        const r1 = isMajor ? 34 : 36
        const r2 = 40
        return (
          <line key={deg}
            x1={60 + r1 * Math.sin(rad)} y1={60 - r1 * Math.cos(rad)}
            x2={60 + r2 * Math.sin(rad)} y2={60 - r2 * Math.cos(rad)}
            stroke={isMajor ? 'rgba(175,197,255,0.35)' : 'rgba(175,197,255,0.15)'}
            strokeWidth={isMajor ? 1.5 : 0.75} strokeLinecap="round" />
        )
      })}
      {/* Person icon below */}
      <circle cx="60" cy="98" r="7" fill="rgba(0,102,255,0.1)" stroke="rgba(0,102,255,0.3)" strokeWidth="1.2" />
      <circle cx="60" cy="96" r="2.5" fill="rgba(175,197,255,0.4)" />
      <path d="M55 103c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="rgba(175,197,255,0.35)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function DocumentIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 mx-auto" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="60" cy="60" r="52" stroke="rgba(245,183,0,0.12)" strokeWidth="1" strokeDasharray="5 4" />
      <circle cx="60" cy="60" r="40" fill="rgba(0,20,60,0.6)" stroke="rgba(245,183,0,0.25)" strokeWidth="1.5" />
      {/* Document */}
      <rect x="40" y="36" width="40" height="52" rx="5"
        fill="rgba(0,20,60,0.85)" stroke="rgba(245,183,0,0.4)" strokeWidth="1.3" />
      <rect x="46" y="44" width="28" height="4" rx="2" fill="rgba(175,197,255,0.25)" />
      <rect x="46" y="52" width="20" height="3" rx="1.5" fill="rgba(175,197,255,0.15)" />
      <rect x="46" y="59" width="24" height="3" rx="1.5" fill="rgba(175,197,255,0.12)" />
      {/* Warning badge */}
      <circle cx="72" cy="76" r="12"
        fill="rgba(245,183,0,0.1)" stroke="rgba(245,183,0,0.4)" strokeWidth="1.3" />
      <line x1="72" y1="70" x2="72" y2="74.5" stroke="#F5B700" strokeWidth="2" strokeLinecap="round" />
      <circle cx="72" cy="77.5" r="1" fill="#F5B700" />
    </svg>
  )
}

const RESUBMIT_TIPS = [
  'Use a flat, evenly lit surface with no shadows.',
  'Ensure all four corners of the document are visible.',
  'Avoid placing fingers over any text or photo.',
  'Disable flash if it creates glare on the document surface.',
]

const LIMITED_ACCESS = [
  'View your account and balance',
  'Receive payments and transfers',
  'Add money to your wallet',
]

export default function KYCNeedsInfo({
  mode = 'resubmit_doc',
  detail,
  onResubmit,
  onContinue,
}: KYCNeedsInfoProps) {
  const config = CONFIGS[mode]
  const [notify, setNotify] = useState(true)

  const accentRgba = (opacity: number) => `${config.badgeColor}${opacity})`

  return (
    <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
      <div className="flex flex-col flex-1 gap-6">
        {/* Status badge */}
        <div className="flex justify-center">
          <div
            className="font-body text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: accentRgba(0.1),
              color: mode === 'resubmit_doc' ? '#F5B700' : '#AFC5FF',
              border: `1px solid ${accentRgba(0.28)}`,
            }}
          >
            {config.badge}
          </div>
        </div>

        {/* Illustration */}
        {mode === 'resubmit_doc' ? <DocumentIllustration /> : <ClockIllustration />}

        {/* Heading */}
        <div className="text-center flex flex-col gap-2 max-w-xs mx-auto">
          <h1 className="font-display text-[22px] font-extrabold text-text leading-tight">
            {config.title}
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            {detail ?? config.explanation}
          </p>
        </div>

        {/* Estimated time — manual review mode */}
        {mode === 'manual_review' && config.estimatedTime && (
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
              <div>
                <p className="font-body text-sm font-semibold text-text">Estimated review time</p>
                <p className="font-body text-xs text-text-muted">{config.estimatedTime}</p>
              </div>
            </div>
            <div className="px-4 py-4 flex items-center justify-between gap-3 min-h-[56px]">
              <div>
                <p className="font-body text-sm font-semibold text-text">Notify me when done</p>
                <p className="font-body text-xs text-text-muted">Push notification when your review is complete</p>
              </div>
              <Switch checked={notify} onChange={setNotify} />
            </div>
          </div>
        )}

        {/* Tips — resubmit mode */}
        {mode === 'resubmit_doc' && (
          <div className="flex flex-col gap-2">
            <p className="font-body text-xs text-text-muted uppercase tracking-widest">Before retaking your photo</p>
            {RESUBMIT_TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.2)' }}
                >
                  <span className="font-mono text-[9px] font-bold" style={{ color: '#F5B700' }}>{i + 1}</span>
                </div>
                <p className="font-body text-sm text-text-2 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        )}

        {/* Limited access card */}
        <div
          className="rounded-[--radius-xl] px-4 py-3.5 flex flex-col gap-2.5"
          style={{ background: 'rgba(0,210,106,0.05)', border: '1px solid rgba(0,210,106,0.15)' }}
        >
          <p className="font-body text-xs text-success font-semibold">While we review, you can still:</p>
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

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        {mode === 'resubmit_doc' && onResubmit ? (
          <>
            <Button variant="primary" fullWidth onClick={onResubmit}>
              Resubmit Document
            </Button>
            <Button variant="ghost" fullWidth onClick={onContinue}>
              Continue to App
            </Button>
          </>
        ) : (
          <Button variant="primary" fullWidth onClick={onContinue}>
            Continue to App
          </Button>
        )}
      </div>
    </div>
  )
}
