import { useState } from 'react'
import Button from '@/components/Button'

interface KYCFailedProps {
  reason?: FailureReason
  onResubmit: () => void
  onSupport: () => void
}

type FailureReason =
  | 'blurry_document'
  | 'expired_document'
  | 'name_mismatch'
  | 'address_mismatch'
  | 'liveness_failed'
  | 'unsupported_document'

interface FailureConfig {
  title: string
  explanation: string
  fix: string
  fixSteps: string[]
}

const FAILURES: Record<FailureReason, FailureConfig> = {
  blurry_document: {
    title: 'Document image unclear',
    explanation: "The photo of your ID was too blurry or dark to read the details accurately.",
    fix: 'How to fix this',
    fixSteps: [
      'Use a flat, well-lit surface with no shadows on the document.',
      'Hold your camera steady — prop your hand against a surface.',
      'Make sure the entire document fits within the frame.',
    ],
  },
  expired_document: {
    title: 'Document has expired',
    explanation: "The ID you submitted is past its expiry date. We require a valid, current document.",
    fix: 'What to do',
    fixSteps: [
      'Use a document that is currently valid.',
      'If your renewal is pending, try a different ID type (e.g. passport).',
      'Contact support if you believe this is an error.',
    ],
  },
  name_mismatch: {
    title: 'Name does not match',
    explanation: "The name on your ID does not match the name you entered during sign-up.",
    fix: 'How to fix this',
    fixSteps: [
      'Go back and ensure your full legal name matches your ID exactly.',
      'Include middle names if they appear on your document.',
      'Contact support if you recently changed your name.',
    ],
  },
  address_mismatch: {
    title: 'Address could not be verified',
    explanation: "We could not confirm your residential address from the documents provided.",
    fix: 'What to do',
    fixSteps: [
      'Double-check that your entered address matches your ID exactly.',
      'If your address has changed recently, contact support.',
    ],
  },
  liveness_failed: {
    title: 'Liveness check failed',
    explanation: "We were unable to confirm that the selfie was taken live. This sometimes happens in low light or if the camera is partially covered.",
    fix: 'How to fix this',
    fixSteps: [
      'Find a well-lit area and ensure nothing covers your face or camera.',
      'Remove glasses or hats during the liveness check.',
      'Follow the on-screen prompts slowly and clearly.',
    ],
  },
  unsupported_document: {
    title: 'Document type not accepted',
    explanation: "The document you submitted is not accepted for your country. Different countries require specific ID types.",
    fix: 'What to do',
    fixSteps: [
      "Go back to 'Choose your ID' and select a supported document type.",
      'For most countries, an international passport is always accepted.',
    ],
  },
}

function FailedIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-28 h-28" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="60" cy="60" r="54"
        stroke="rgba(255,59,48,0.1)" strokeWidth="1" strokeDasharray="5 4" />
      {/* Mid */}
      <circle cx="60" cy="60" r="42"
        fill="rgba(255,59,48,0.04)"
        stroke="rgba(255,59,48,0.18)" strokeWidth="1" />
      {/* Document with X */}
      <rect x="36" y="32" width="48" height="60" rx="6"
        fill="rgba(0,20,60,0.8)" stroke="rgba(255,59,48,0.3)" strokeWidth="1.5" />
      <line x1="44" y1="52" x2="76" y2="52" stroke="rgba(175,197,255,0.2)" strokeWidth="1" strokeLinecap="round" />
      <line x1="44" y1="60" x2="68" y2="60" stroke="rgba(175,197,255,0.15)" strokeWidth="1" strokeLinecap="round" />
      <line x1="44" y1="68" x2="72" y2="68" stroke="rgba(175,197,255,0.12)" strokeWidth="1" strokeLinecap="round" />
      {/* X badge */}
      <circle cx="76" cy="80" r="14"
        fill="rgba(255,59,48,0.1)" stroke="rgba(255,59,48,0.4)" strokeWidth="1.5" />
      <path d="M71 75l10 10M81 75l-10 10"
        stroke="rgba(255,59,48,0.85)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function KYCFailed({
  reason = 'blurry_document',
  onResubmit,
  onSupport,
}: KYCFailedProps) {
  const [showFix, setShowFix] = useState(false)
  const config = FAILURES[reason]

  return (
    <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
      <div className="flex flex-col flex-1 items-center gap-6">
        {/* Status badge */}
        <div
          className="font-body text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(255,59,48,0.1)', color: '#FF3B30', border: '1px solid rgba(255,59,48,0.25)' }}
        >
          Verification Unsuccessful
        </div>

        <FailedIllustration />

        {/* Explanation */}
        <div className="text-center flex flex-col gap-2.5 max-w-xs">
          <h1 className="font-display text-[22px] font-extrabold text-text leading-tight">
            {config.title}
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            {config.explanation}
          </p>
        </div>

        {/* Expandable fix guide */}
        <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          <button
            onClick={() => setShowFix(v => !v)}
            className="w-full flex items-center justify-between px-4 py-4 min-h-[56px]"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-[--radius-lg] flex items-center justify-center"
                style={{ background: 'rgba(0,102,255,0.1)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#AFC5FF" strokeWidth="1.2" />
                  <line x1="7" y1="4.5" x2="7" y2="7" stroke="#AFC5FF" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="9" r="0.65" fill="#AFC5FF" />
                </svg>
              </div>
              <p className="font-body text-sm font-semibold text-text">{config.fix}</p>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`transition-transform duration-[200ms] ${showFix ? 'rotate-180' : ''}`}
            >
              <path d="M4 6l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {showFix && (
            <div className="px-4 pb-4 flex flex-col gap-3 animate-fade-in border-t border-[color:var(--color-border)] pt-3">
              {config.fixSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.2)' }}
                  >
                    <span className="font-mono text-[9px] font-bold text-accent">{i + 1}</span>
                  </div>
                  <p className="font-body text-sm text-text-2 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reassurance */}
        <div
          className="w-full rounded-[--radius-xl] px-4 py-3 flex items-start gap-2"
          style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
            <path d="M7 1L2 3.5v5c0 3 2.2 4.6 5 5 2.8-.4 5-2 5-5v-5L7 1Z"
              stroke="#AFC5FF" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-2 leading-relaxed">
            This does not affect your account or any funds already in it. Verification issues are common and easy to resolve.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <Button variant="primary" fullWidth onClick={onResubmit}>
          Try Again
        </Button>
        <Button variant="ghost" fullWidth onClick={onSupport}>
          Contact Support
        </Button>
      </div>
    </div>
  )
}
