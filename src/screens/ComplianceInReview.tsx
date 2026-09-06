import { useState } from 'react'

interface ComplianceInReviewProps {
  onHome?: () => void
  onContactSupport?: () => void
  caseRef?: string
  submittedAt?: string
  estimatedDays?: number
}

export default function ComplianceInReview({ onHome, onContactSupport, caseRef = 'CLR-20261021-4482', submittedAt = 'Oct 21, 2026', estimatedDays = 3 }: ComplianceInReviewProps) {
  const [notifyEnabled, setNotifyEnabled] = useState(true)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#F5B700" strokeWidth="1.3" />
              <path d="M9 5v4.5l3 2" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Under Review</p>
            <p className="font-body text-[10px] text-text-muted">{caseRef}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Status card */}
        <div className="flex flex-col items-center py-8 px-6 rounded-[--radius-2xl] text-center"
          style={{ background: 'rgba(245,183,0,0.04)', border: '1px solid rgba(245,183,0,0.14)' }}>
          {/* Animated ring */}
          <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 animate-spin"
              style={{ borderColor: 'rgba(245,183,0,0.15)', borderTopColor: '#F5B700', animationDuration: '2.5s' }} />
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(245,183,0,0.08)', border: '1.5px solid rgba(245,183,0,0.2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v8l4 2.5" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke="#F5B700" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <p className="font-display text-xl font-extrabold text-text tracking-tight">
            Documents received
          </p>
          <p className="font-body text-sm text-text-muted mt-1.5 leading-relaxed">
            Your submission is with our compliance team. We typically complete reviews within{' '}
            <span className="text-text font-medium">{estimatedDays} business days</span>.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" />
              <path d="M5.5 3.5v2.5l1.5 1" stroke="rgba(175,197,255,0.4)" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[10px] text-text-muted">Submitted {submittedAt}</p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">Review steps</p>
          <div className="relative pl-8 flex flex-col gap-0">
            {[
              { label: 'Documents received', sub: 'Your submission has been logged', done: true, active: false },
              { label: 'Initial review', sub: 'Compliance team reviewing documentation', done: false, active: true },
              { label: 'Decision', sub: 'Outcome communicated by email and notification', done: false, active: false },
              { label: 'Access restored', sub: 'Full account access reinstated on approval', done: false, active: false },
            ].map((step, i, arr) => (
              <div key={i} className="relative flex items-start gap-3 pb-4">
                {/* Vertical line */}
                {i < arr.length - 1 && (
                  <div className="absolute left-[-22px] top-6 w-px h-full"
                    style={{ background: step.done ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.1)' }} />
                )}
                {/* Dot */}
                <div className="absolute left-[-28px] top-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: step.done ? 'rgba(34,197,94,0.12)' : step.active ? 'rgba(245,183,0,0.12)' : 'rgba(175,197,255,0.06)',
                    border: `1.5px solid ${step.done ? 'rgba(34,197,94,0.3)' : step.active ? 'rgba(245,183,0,0.3)' : 'rgba(175,197,255,0.12)'}`,
                  }}>
                  {step.done ? (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5l2.5 2.5 3.5-4" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : step.active ? (
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F5B700' }} />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
                  )}
                </div>
                <div>
                  <p className="font-body text-xs font-semibold"
                    style={{ color: step.done ? '#22C55E' : step.active ? '#F5B700' : 'rgba(175,197,255,0.4)' }}>
                    {step.label}
                  </p>
                  <p className="font-body text-[10px] text-text-muted">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limited access */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <p className="font-body text-xs font-semibold text-text mb-2">While under review</p>
          <div className="flex flex-col gap-2">
            {[
              'Sending money and withdrawals are temporarily paused',
              'You can still receive payments and view your balance',
              'Scheduled payments may be held until review completes',
            ].map((note, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                  style={{ background: 'rgba(245,183,0,0.5)' }} />
                <p className="font-body text-xs text-text-muted leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notify me toggle */}
        <button onClick={() => setNotifyEnabled(v => !v)}
          className="flex items-center gap-3 px-4 py-4 rounded-[--radius-xl] w-full text-left"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="w-11 h-6 rounded-full relative shrink-0 transition-colors"
            style={{ background: notifyEnabled ? 'rgba(0,102,255,0.5)' : 'rgba(175,197,255,0.1)', border: `1px solid ${notifyEnabled ? 'rgba(0,102,255,0.6)' : 'rgba(175,197,255,0.15)'}` }}>
            <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
              style={{ left: notifyEnabled ? 'calc(100% - 22px)' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
          </div>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">Notify me when resolved</p>
            <p className="font-body text-[10px] text-text-muted">Push + email when the review is complete</p>
          </div>
        </button>

        {/* Actions */}
        <button onClick={onHome}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.08)', color: 'rgba(175,197,255,0.7)', border: '1px solid rgba(175,197,255,0.12)' }}>
          Return to Home
        </button>

        <button onClick={onContactSupport}
          className="w-full h-11 rounded-[--radius-2xl] font-body text-sm font-medium flex items-center justify-center transition-all"
          style={{ color: 'rgba(175,197,255,0.5)' }}>
          Contact support about this case
        </button>
      </div>
    </div>
  )
}
