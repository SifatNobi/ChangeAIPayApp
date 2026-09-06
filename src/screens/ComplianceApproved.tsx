interface ComplianceApprovedProps {
  onContinue?: () => void
  caseRef?: string
  resolvedAt?: string
  accountType?: 'personal' | 'business'
}

const RESTORED = [
  'Sending money and transfers',
  'Withdrawals to linked bank account',
  'Crypto purchases',
  'All payment features',
]

export default function ComplianceApproved({ onContinue, caseRef = 'CLR-20261021-4482', resolvedAt = 'Oct 24, 2026', accountType = 'personal' }: ComplianceApprovedProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* No header — this is a standalone resolved screen */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5 pt-8" style={{ scrollbarWidth: 'none' }}>

        {/* Hero */}
        <div className="flex flex-col items-center py-8 px-6 rounded-[--radius-2xl] text-center"
          style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.14)' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '2px solid rgba(34,197,94,0.2)',
              boxShadow: '0 0 40px rgba(34,197,94,0.1)',
            }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l7 7 13-14" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-display text-2xl font-extrabold text-text tracking-tight">Review complete</p>
          <p className="font-body text-sm text-text-muted mt-2 leading-relaxed max-w-[260px]">
            Your {accountType === 'business' ? 'business ' : ''}account has passed its compliance review. Everything is back to normal.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="rgba(34,197,94,0.5)" strokeWidth="0.9" />
              <path d="M5.5 3.5v2.5l1.5 1" stroke="rgba(34,197,94,0.6)" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[10px]" style={{ color: 'rgba(34,197,94,0.7)' }}>Resolved {resolvedAt}</p>
          </div>
        </div>

        {/* Case ref */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
            <path d="M2 2h9v9H2V2z" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
            <path d="M4 5h5M4 7h3" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-text-muted flex-1">Case reference</p>
          <p className="font-mono text-xs font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>{caseRef}</p>
        </div>

        {/* Access restored */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">Access restored</p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(34,197,94,0.14)', background: 'rgba(34,197,94,0.02)' }}>
            {RESTORED.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < RESTORED.length - 1 ? '1px solid rgba(34,197,94,0.08)' : 'none' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(34,197,94,0.1)' }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2.5 2.5 3.5-4" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-body text-sm text-text">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Thank-you note */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Thank you for your patience and for providing the requested documentation. Your cooperation helps us maintain a safe and compliant platform for everyone.
          </p>
        </div>

        {/* CTA */}
        <button onClick={onContinue}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.7), rgba(34,197,94,0.5))',
            boxShadow: '0 4px 20px rgba(34,197,94,0.15)',
          }}>
          Continue to {accountType === 'business' ? 'Merchant Home' : 'Home'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
