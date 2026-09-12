import { useState, useEffect } from 'react'
import Pulse from '@/components/Pulse'

type OutcomeState = 'approved' | 'denied' | 'pending'

interface RefundResultProps {
  outcome?: OutcomeState
  refundAmount?: string
  currency?: string
  merchantName?: string
  denialReason?: 'outside_policy' | 'insufficient_evidence' | 'resolved_previously' | 'fraud_detection'
  estimatedReview?: string
  onDone?: () => void
  onAppeal?: () => void
  onSupport?: () => void
  onViewBalance?: () => void
}

const DENIAL_REASONS = {
  outside_policy: {
    headline: "Outside refund policy window",
    detail: "This transaction is older than 60 days. Refund requests must be submitted within 60 days of the payment date.",
  },
  insufficient_evidence: {
    headline: "Insufficient evidence provided",
    detail: "We couldn't verify the claim with the information submitted. Adding a screenshot or order confirmation may help with an appeal.",
  },
  resolved_previously: {
    headline: "Already resolved",
    detail: "A refund or dispute for this transaction was previously processed. You can contact support if you believe this is an error.",
  },
  fraud_detection: {
    headline: "Flagged by our fraud systems",
    detail: "Our systems flagged this request for review. This doesn't reflect on your account standing — contact support for details.",
  },
}

export default function RefundResult({
  outcome = 'approved',
  refundAmount = '$24.50',
  currency = 'USD',
  merchantName = 'Coffee & Co',
  denialReason = 'outside_policy',
  estimatedReview = '1–3 business days',
  onDone,
  onAppeal,
  onSupport,
  onViewBalance,
}: RefundResultProps) {
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    if (outcome !== 'approved') {
      setContentVisible(true)
      return
    }
    const t1 = setTimeout(() => { setCircleScale(1); setPulseTrigger(true) }, 120)
    const t2 = setTimeout(() => setCheckVisible(true), 480)
    const t3 = setTimeout(() => setContentVisible(true), 720)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [outcome])

  const sym = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'
  const denial = DENIAL_REASONS[denialReason]

  return (
    <div className="flex flex-col items-center bg-bg" style={{ minHeight: 785 }}>

      {/* Pulse — only for approved */}
      {outcome === 'approved' && (
        <div className="absolute inset-x-0 top-20 flex items-center justify-center pointer-events-none z-0">
          <Pulse trigger={pulseTrigger} width={320} height={50} color="#3FE7FF" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center px-5 pt-12 pb-8 w-full flex-1">

        {/* ── APPROVED ─────────────────────────────────────────── */}
        {outcome === 'approved' && (
          <>
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-5 transition-all duration-[500ms]"
              style={{
                transform: `scale(${circleScale})`,
                background: 'linear-gradient(135deg, #00AA6C, #22C55E)',
                boxShadow: circleScale === 1
                  ? '0 0 0 16px rgba(34,197,94,0.08), 0 0 0 32px rgba(34,197,94,0.04)'
                  : 'none',
              }}
            >
              {checkVisible && (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-fade-in">
                  <path d="M8 20l8 9 16-18" stroke="white" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-1">Refund Approved</h1>
            <p className="font-body text-sm text-text-muted text-center mb-6">
              {sym}{refundAmount} from {merchantName} is back in your wallet
            </p>

            {contentVisible && (
              <>
                <div
                  className="w-full rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3 animate-fade-in mb-4"
                  style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}
                >
                  {[
                    { label: 'Refund amount', value: `${sym}${refundAmount}` },
                    { label: 'Merchant',       value: merchantName },
                    { label: 'Credited to',    value: 'Main Wallet' },
                    { label: 'Settled',        value: 'Instant' },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between">
                      <p className="font-body text-xs text-text-muted">{row.label}</p>
                      <p className={`font-mono text-sm ${row.label === 'Settled' ? 'text-success' : 'text-text-2'}`}>
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-col gap-3 animate-fade-in mt-auto pt-4">
                  <button
                    onClick={onViewBalance}
                    className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                  >
                    View Balance
                  </button>
                  <button
                    onClick={onDone}
                    className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all duration-[200ms] active:scale-[0.98]"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ── DENIED ───────────────────────────────────────────── */}
        {outcome === 'denied' && (
          <>
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(255,77,90,0.07)', border: '2px solid rgba(255,77,90,0.22)' }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="14" stroke="#FF4D5A" strokeWidth="1.5" />
                <line x1="20" y1="12" x2="20" y2="22" stroke="#FF4D5A" strokeWidth="2" strokeLinecap="round" />
                <circle cx="20" cy="27" r="1.8" fill="#FF4D5A" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-2">Refund Declined</h1>
            <p className="font-body text-sm text-text-2 text-center mb-6 px-2">
              We reviewed your request for {sym}{refundAmount} from {merchantName}.
            </p>

            <div
              className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3 mb-4"
              style={{ background: 'rgba(255,77,90,0.05)', border: '1px solid rgba(255,77,90,0.18)' }}
            >
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#FF4D5A" strokeWidth="1" />
                  <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#FF4D5A" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="6" cy="8.2" r="0.55" fill="#FF4D5A" />
                </svg>
                <p className="font-body text-xs font-semibold text-error">{denial.headline}</p>
              </div>
              <p className="font-body text-sm text-text-2 leading-relaxed">{denial.detail}</p>
            </div>

            <div className="w-full flex flex-col gap-3 mt-auto pt-4">
              <button
                onClick={onAppeal}
                className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Appeal Decision
              </button>
              <button
                onClick={onSupport}
                className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                Contact Support
              </button>
              <button
                onClick={onDone}
                className="w-full h-10 font-body text-sm text-text-muted flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </>
        )}

        {/* ── PENDING ──────────────────────────────────────────── */}
        {outcome === 'pending' && (
          <>
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 relative"
              style={{
                background: 'rgba(245,183,0,0.07)',
                border: '2px solid rgba(245,183,0,0.25)',
                boxShadow: '0 0 28px rgba(245,183,0,0.08)',
              }}
            >
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <circle cx="19" cy="19" r="13" stroke="#F5B700" strokeWidth="1.5" />
                <path d="M19 11v8.5l5.5 3" stroke="#F5B700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="100" height="100" viewBox="0 0 100 100" className="absolute inset-0"
                style={{ animation: 'spin 3s linear infinite' }}>
                <circle cx="50" cy="50" r="48"
                  stroke="#F5B700" strokeWidth="1.5" strokeOpacity="0.25" fill="none"
                  strokeDasharray="48 254" strokeLinecap="round"
                  transform="rotate(-90 50 50)" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-2">Under Review</h1>
            <p className="font-body text-sm text-text-2 text-center mb-6 px-2">
              Your refund request for {sym}{refundAmount} from {merchantName} is being reviewed.
            </p>

            <div
              className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3 mb-4"
              style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.18)' }}
            >
              <p className="font-body text-xs font-semibold text-warning">What happens next</p>
              {[
                "Our team reviews the transaction with the merchant",
                "You'll receive a push notification with the outcome",
                "If approved, funds are credited to your wallet instantly",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(245,183,0,0.12)', border: '1px solid rgba(245,183,0,0.3)' }}>
                    <span className="font-mono text-[9px] font-bold text-warning">{i + 1}</span>
                  </div>
                  <p className="font-body text-sm text-text-2 leading-relaxed">{step}</p>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-2 mt-1">
                <p className="font-body text-xs text-text-muted">Estimated review time</p>
                <p className="font-mono text-xs font-semibold text-warning">{estimatedReview}</p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 mt-auto pt-4">
              <button
                onClick={onSupport}
                className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                Contact Support
              </button>
              <button
                onClick={onDone}
                className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all duration-[200ms] active:scale-[0.98]"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Done
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
