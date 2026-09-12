interface AMLReviewProps {
  onContinue?: () => void
  onContactSupport?: () => void
  caseRef?: string
  accountType?: 'personal' | 'business'
}

const ACCESS_LIMITS = [
  { label: 'Sending money', restricted: true },
  { label: 'Receiving payments', restricted: false },
  { label: 'Withdrawals to bank', restricted: true },
  { label: 'Viewing balance & history', restricted: false },
  { label: 'Crypto purchases', restricted: true },
]

export default function AMLReview({ onContinue, onContactSupport, caseRef = 'CLR-20261021-4482', accountType = 'personal' }: AMLReviewProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header — no back button; this is a mandatory gate */}
      <div className="px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L2 5.5V9c0 4 2.5 6.5 7 7.5 4.5-1 7-3.5 7-7.5V5.5L9 2z" stroke="#F5B700" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M9 6.5v3M9 11.5v.5" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Account Under Review</p>
            <p className="font-body text-[10px] text-text-muted">Standard compliance check</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Case reference */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.15)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M2 2h10v10H2V2z" stroke="#F5B700" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M4 5h6M4 7.5h4" stroke="#F5B700" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-text-muted flex-1">Case reference</p>
          <p className="font-mono text-xs font-semibold" style={{ color: '#F5B700' }}>{caseRef}</p>
        </div>

        {/* Explanation */}
        <div className="flex flex-col gap-3">
          <p className="font-body text-sm text-text leading-relaxed">
            We're conducting a standard compliance review on your {accountType === 'business' ? 'business ' : ''}account. This is a routine process we perform to meet our regulatory obligations — it does not mean your account has done anything wrong.
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            We may ask you to provide some additional information or documentation. Most reviews complete within <span className="text-text font-medium">1–3 business days</span>, though some may take up to 10 business days.
          </p>
        </div>

        {/* What happens next */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">What happens next</p>
          <div className="flex flex-col gap-2">
            {[
              { step: '1', text: 'You may be asked to provide documentation or answer questions in the following steps.', done: false },
              { step: '2', text: 'Our compliance team will review your submission — usually within 1–3 business days.', done: false },
              { step: '3', text: "You'll be notified by email and push notification when the review is complete.", done: false },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.2)' }}>
                  <p className="font-mono text-[10px] font-bold" style={{ color: '#F5B700' }}>{item.step}</p>
                </div>
                <p className="font-body text-xs text-text-muted leading-relaxed flex-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Access status */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">Account access during review</p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {ACCESS_LIMITS.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < ACCESS_LIMITS.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: item.restricted ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)' }}>
                  {item.restricted ? (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M2 2l5 5M7 2L2 7" stroke="#F87171" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5l2 2 4-4" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p className="flex-1 font-body text-xs"
                  style={{ color: item.restricted ? 'rgba(175,197,255,0.45)' : 'var(--color-text)' }}>
                  {item.label}
                </p>
                <span className="font-body text-[10px] font-semibold"
                  style={{ color: item.restricted ? '#F87171' : '#22C55E' }}>
                  {item.restricted ? 'Limited' : 'Available'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button onClick={onContinue}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, rgba(245,183,0,0.6), rgba(245,183,0,0.4))', boxShadow: '0 4px 16px rgba(245,183,0,0.12)' }}>
          Continue
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button onClick={onContactSupport}
          className="w-full h-11 rounded-[--radius-2xl] font-body text-sm font-medium flex items-center justify-center transition-all"
          style={{ color: 'rgba(175,197,255,0.55)' }}>
          Questions? Contact support
        </button>
      </div>
    </div>
  )
}
