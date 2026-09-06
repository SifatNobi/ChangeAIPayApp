import { useState } from 'react'

interface ComplianceResubmittedProps {
  onHome?: () => void
  onContactSupport?: () => void
  caseRef?: string
  resubmittedAt?: string
  updatedEstimateDays?: number
  originalEstimateDays?: number
}

export default function ComplianceResubmitted({
  onHome, onContactSupport,
  caseRef = 'CLR-20261021-4482',
  resubmittedAt = 'Oct 22, 2026 · 11:48 AM',
  updatedEstimateDays = 2,
  originalEstimateDays = 3,
}: ComplianceResubmittedProps) {
  const [notifyEnabled, setNotifyEnabled] = useState(true)

  const estimateChanged = updatedEstimateDays !== originalEstimateDays

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15 4L7 12l-4-4" stroke="#4D9FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Resubmission Received</p>
            <p className="font-body text-[10px] text-text-muted">{caseRef}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Success confirmation */}
        <div className="flex flex-col items-center py-8 px-6 rounded-[--radius-2xl] text-center"
          style={{ background: 'rgba(0,102,255,0.04)', border: '1px solid rgba(0,102,255,0.14)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'rgba(0,102,255,0.08)', border: '1.5px solid rgba(0,102,255,0.2)', boxShadow: '0 0 24px rgba(0,102,255,0.1)' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5 13l6 6 10-10" stroke="#4D9FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-display text-xl font-extrabold text-text tracking-tight">
            Documents submitted
          </p>
          <p className="font-body text-sm text-text-muted mt-1.5 leading-relaxed max-w-[260px]">
            Your updated documents have been received and re-review has started.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" />
              <path d="M5.5 3.5v2.5l1.5 1" stroke="rgba(175,197,255,0.4)" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[10px] text-text-muted">Resubmitted {resubmittedAt}</p>
          </div>
        </div>

        {/* Updated estimate */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{
            background: estimateChanged ? 'rgba(34,197,94,0.04)' : 'rgba(175,197,255,0.03)',
            border: `1px solid ${estimateChanged ? 'rgba(34,197,94,0.15)' : 'rgba(175,197,255,0.09)'}`,
          }}>
          <div className="flex items-center justify-between mb-1">
            <p className="font-body text-xs font-semibold text-text">New estimated completion</p>
            {estimateChanged && (
              <span className="font-body text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
                Updated
              </span>
            )}
          </div>
          <div className="flex items-end gap-2 mt-1">
            <p className="font-display text-3xl font-extrabold"
              style={{ color: estimateChanged ? '#22C55E' : '#F5B700' }}>
              {updatedEstimateDays}
            </p>
            <p className="font-body text-sm text-text-muted pb-1">business day{updatedEstimateDays !== 1 ? 's' : ''}</p>
            {estimateChanged && (
              <p className="font-body text-xs text-text-muted pb-1 ml-auto">
                was {originalEstimateDays} day{originalEstimateDays !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <p className="font-body text-[10px] text-text-muted mt-1.5 leading-relaxed">
            {estimateChanged
              ? 'Because your resubmission was prompt and complete, our team can prioritize your case.'
              : "The estimated timeframe is unchanged from the original review window."}
          </p>
        </div>

        {/* What was resubmitted */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">What you submitted</p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {[
              { label: 'Updated identity document', count: 1 },
              { label: 'Source of funds documentation', count: 2 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: i === 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,102,255,0.1)' }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2.5 2.5 3.5-4" stroke="#4D9FFF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-body text-sm text-text flex-1">{item.label}</p>
                <span className="font-body text-[10px] text-text-muted">{item.count} file{item.count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What's next */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <p className="font-body text-xs font-semibold text-text mb-2">What happens next</p>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Our compliance team will compare your new submission against our records. You'll receive a push notification and email when a decision has been made. Access restrictions remain in place until the review completes.
          </p>
        </div>

        {/* Notify toggle */}
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
            <p className="font-body text-[10px] text-text-muted">Push + email on outcome</p>
          </div>
        </button>

        <button onClick={onHome}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center transition-all active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.07)', color: 'rgba(175,197,255,0.7)', border: '1px solid rgba(175,197,255,0.12)' }}>
          Return to Home
        </button>

        <button onClick={onContactSupport}
          className="w-full h-11 font-body text-sm flex items-center justify-center transition-all"
          style={{ color: 'rgba(175,197,255,0.45)' }}>
          Questions? Contact support
        </button>
      </div>
    </div>
  )
}
