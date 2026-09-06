import { useState } from 'react'

interface TicketResolvedProps {
  ticketId?: string
  onBack?: () => void
  onReopen?: () => void
  onFeedback?: () => void
  onHome?: () => void
}

export default function TicketResolved({ ticketId = 'TKT-482910', onBack, onReopen, onFeedback, onHome }: TicketResolvedProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    if (rating === null || submitting) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Ticket {ticketId}</p>
        <span className="px-2.5 py-1 rounded-full font-body text-[9px] font-bold uppercase tracking-wider"
          style={{ background: 'rgba(34,197,94,0.08)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
          Resolved
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Success hero */}
        <div className="flex flex-col items-center py-8 px-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.14)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: 'rgba(34,197,94,0.1)',
              border: '1.5px solid rgba(34,197,94,0.25)',
              boxShadow: '0 0 32px rgba(34,197,94,0.12)',
            }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6 6 12-12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-display text-xl font-extrabold text-text tracking-tight">Issue resolved</p>
          <p className="font-body text-sm text-text-muted text-center mt-1.5 leading-relaxed">
            Your support request has been closed. We hope everything is working as expected.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" />
              <path d="M6 4v3l2 1.5" stroke="rgba(175,197,255,0.4)" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[10px] text-text-muted">
              Closed Sep 1, 2026 · 1h 48m resolution time
            </p>
          </div>
        </div>

        {/* Satisfaction rating */}
        {!submitted ? (
          <div className="px-4 py-5 rounded-[--radius-2xl]"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
            <p className="font-body text-sm font-semibold text-text mb-1">How was your support experience?</p>
            <p className="font-body text-[10px] text-text-muted mb-4">Rate the support you received for this ticket</p>

            {/* Stars */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setRating(star)}
                  className="flex-1 h-12 flex flex-col items-center justify-center gap-1 rounded-[--radius-xl] transition-all"
                  style={{
                    background: rating !== null && star <= rating ? 'rgba(245,183,0,0.1)' : 'rgba(175,197,255,0.04)',
                    border: `1px solid ${rating !== null && star <= rating ? 'rgba(245,183,0,0.25)' : 'rgba(175,197,255,0.09)'}`,
                  }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2l1.8 5.4H17L12 11l2 5.4L9 13l-5 3.4 2-5.4-5-3.6h6.2L9 2z"
                      stroke={rating !== null && star <= rating ? '#F5B700' : 'rgba(175,197,255,0.25)'}
                      fill={rating !== null && star <= rating ? 'rgba(245,183,0,0.7)' : 'none'}
                      strokeWidth="1.1" strokeLinejoin="round" />
                  </svg>
                  <p className="font-body text-[9px]"
                    style={{ color: rating !== null && star <= rating ? '#F5B700' : 'rgba(175,197,255,0.3)' }}>
                    {['Terrible', 'Poor', 'OK', 'Good', 'Great'][star - 1]}
                  </p>
                </button>
              ))}
            </div>

            {/* Comment */}
            {rating !== null && (
              <>
                <textarea
                  className="w-full bg-transparent font-body text-sm text-text placeholder-text-muted outline-none px-4 py-3 rounded-[--radius-xl] resize-none mb-3"
                  style={{
                    background: 'rgba(175,197,255,0.05)',
                    border: '1px solid rgba(175,197,255,0.1)',
                    minHeight: 80,
                  }}
                  placeholder="Any comments about your support experience? (optional)"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  style={{ background: submitting ? 'rgba(34,197,94,0.3)' : 'linear-gradient(135deg, rgba(34,197,94,0.8), #22C55E)' }}>
                  {submitting ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : 'Submit feedback'}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 px-4 py-4 rounded-[--radius-xl]"
            style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(34,197,94,0.1)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3 3 6-6" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Feedback submitted</p>
              <p className="font-body text-[10px] text-text-muted">Thank you — it helps us improve our support.</p>
            </div>
          </div>
        )}

        {/* Reopen */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <p className="font-body text-xs font-semibold text-text mb-1">Not actually resolved?</p>
          <p className="font-body text-[10px] text-text-muted mb-3 leading-relaxed">
            If the issue has come back or was not fully fixed, you can reopen this ticket and it will be reassigned to the same agent.
          </p>
          <button onClick={onReopen}
            className="flex items-center gap-2 px-3 h-9 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
            style={{ background: 'rgba(255,159,67,0.08)', color: '#FF9F43', border: '1px solid rgba(255,159,67,0.2)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6a4 4 0 1 1 1.5 3.1" stroke="#FF9F43" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M2 9.5V6.5h3" stroke="#FF9F43" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Reopen ticket
          </button>
        </div>

        {/* Done */}
        <button onClick={onHome}
          className="w-full h-11 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.06)', color: 'rgba(175,197,255,0.7)', border: '1px solid rgba(175,197,255,0.12)' }}>
          Back to Home
        </button>
      </div>
    </div>
  )
}
