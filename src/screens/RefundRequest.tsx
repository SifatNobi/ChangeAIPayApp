import { useState } from 'react'

interface RefundRequestProps {
  merchantName?: string
  transactionAmount?: string
  transactionDate?: string
  transactionId?: string
  onSubmit?: (reason: string, note: string) => void
  onBack?: () => void
}

type Reason = 'wrong_amount' | 'duplicate' | 'no_delivery' | 'other'

const REASONS: { id: Reason; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: 'wrong_amount',
    label: 'Wrong Amount',
    sub: "I was charged more than agreed",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 9h14" stroke="currentColor" strokeWidth="1.2" />
        <line x1="9" y1="2" x2="9" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.1" />
        <line x1="12" y1="11.5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'duplicate',
    label: 'Duplicate Charge',
    sub: "I was charged twice for the same thing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="6" y="4" width="11" height="9" rx="1.5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.3" />
        <path d="M4 9.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M4 12h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'no_delivery',
    label: "Didn't Receive Item / Service",
    sub: "Payment went through but nothing arrived",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 7l7-4 7 4v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M6 14V9a3 3 0 0 1 6 0v5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Other Reason',
    sub: "Something else went wrong",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.5 7c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 1-.6 1.8-1.5 2.2V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="9" cy="13.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
]

const NOTE_MAX = 200

export default function RefundRequest({
  merchantName = '',
  transactionAmount = '$0.00',
  transactionDate = '',
  transactionId = '',
  onSubmit,
  onBack,
}: RefundRequestProps) {
  const [selected, setSelected] = useState<Reason | null>(null)
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!selected) return
    setSubmitting(true)
    setTimeout(() => {
      onSubmit?.(selected, note)
    }, 600)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-body text-sm font-semibold text-text">Request Refund</p>
        <div className="w-11" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Transaction summary */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl] flex flex-col gap-2"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <p className="font-body text-xs text-text-muted uppercase tracking-wider">Transaction</p>
          <div className="flex items-center justify-between">
            <p className="font-body text-base font-semibold text-text">{merchantName}</p>
            <p className="font-display text-lg font-extrabold text-text">{transactionAmount}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-body text-xs text-text-muted">{transactionDate}</p>
            <span className="text-text-muted opacity-40">·</span>
            <p className="font-mono text-xs text-text-muted">{transactionId}</p>
          </div>
        </div>

        {/* Reason selector */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Reason for refund</p>
          {REASONS.map(r => {
            const active = selected === r.id
            return (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all duration-[200ms] active:scale-[0.99]"
                style={{
                  background: active ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.03)',
                  border: `1px solid ${active ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                <div style={{ color: active ? '#3FE7FF' : 'rgba(175,197,255,0.45)' }}>
                  {r.icon}
                </div>
                <div className="flex-1">
                  <p className={`font-body text-sm font-semibold ${active ? 'text-text' : 'text-text-2'}`}>{r.label}</p>
                  <p className="font-body text-xs text-text-muted mt-0.5">{r.sub}</p>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-[200ms]"
                  style={{
                    background: active ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.06)',
                    border: `1.5px solid ${active ? 'transparent' : 'rgba(175,197,255,0.2)'}`,
                  }}
                >
                  {active && (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5l2 2.5 4-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Note field */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Additional details</p>
            <p className={`font-mono text-[10px] ${NOTE_MAX - note.length < 20 ? 'text-warning' : 'text-text-muted'}`}>
              {NOTE_MAX - note.length}
            </p>
          </div>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value.slice(0, NOTE_MAX))}
            placeholder="Tell us more (optional) — e.g. the correct amount, or what didn't arrive"
            rows={3}
            className="w-full px-4 py-3 rounded-[--radius-xl] bg-transparent font-body text-sm text-text placeholder-text-muted outline-none resize-none leading-relaxed"
            style={{ border: '1px solid rgba(175,197,255,0.15)' }}
          />
        </div>

        {/* Policy note */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0">
            <path d="M6 1L1 3v3.8C1 9.7 3 11.5 6 12c3-.5 5-2.3 5-5.2V3L6 1Z"
              stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Refund requests are reviewed within 1–3 business days. You'll receive a notification with the outcome. Submitting a false claim may affect your account standing.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8">
        <button
          disabled={!selected || submitting}
          onClick={handleSubmit}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" style={{ animation: 'spin 0.8s linear infinite' }} />
              Submitting…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M9 4l3 3-3 3" stroke="white" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Submit Request
            </>
          )}
        </button>
      </div>
    </div>
  )
}
