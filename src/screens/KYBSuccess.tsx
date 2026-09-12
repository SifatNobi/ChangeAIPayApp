interface KYBSuccessProps {
  businessName?: string
  onContinue?: () => void
}

const UNLOCKED = [
  { icon: '💳', label: 'Accept payments',         sub: 'Receive transfers and card-not-present payments' },
  { icon: '📊', label: 'Merchant analytics',       sub: 'Revenue tracking, Aina insights, and reporting' },
  { icon: '🔗', label: 'Payment links',             sub: 'Create shareable links and invoice QR codes' },
  { icon: '🏦', label: 'Business bank transfers',  sub: 'Higher limits and priority settlement' },
  { icon: '🤖', label: 'Aina business assistant',  sub: 'AI-powered financial guidance for your business' },
]

export default function KYBSuccess({ businessName = 'Your Business', onContinue }: KYBSuccessProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col px-5 pb-8 pt-8 gap-6" style={{ overflow: 'hidden' }}>

        {/* Success mark */}
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            {/* Glow rings */}
            <div className="absolute inset-0 rounded-[36px] animate-pulse"
              style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)', transform: 'scale(1.6)' }} />
            <div className="w-24 h-24 rounded-[30px] flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(0,102,255,0.1))', border: '2px solid rgba(34,197,94,0.4)', boxShadow: '0 0 40px rgba(34,197,94,0.3)' }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M8 22l9 9 19-19" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">Verification complete</p>
            <p className="font-display text-2xl font-extrabold text-text">{businessName}</p>
            <p className="font-body text-sm text-text-muted mt-1">is now a verified ChangeAIPay merchant</p>
          </div>
        </div>

        {/* Aina message */}
        <div className="rounded-[--radius-2xl] px-5 py-4 flex items-start gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.28)' }}>
          <div className="w-10 h-10 flex items-center justify-center font-display text-base font-extrabold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #0066FF, #3FE7FF)', borderRadius: '13px 13px 13px 3px', boxShadow: '0 0 14px rgba(0,102,255,0.5)' }}>
            A
          </div>
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#3FE7FF' }}>Aina</p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Your merchant account is active. Full payment capabilities are available immediately. I'll be here whenever you need business insights, revenue analysis, or payment strategy.
            </p>
          </div>
        </div>

        {/* Unlocked features */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Merchant features unlocked</p>
          <div className="flex flex-col gap-2">
            {UNLOCKED.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
                style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.16)' }}>
                <span className="text-lg shrink-0">{item.icon}</span>
                <div>
                  <p className="font-body text-xs font-semibold text-text">{item.label}</p>
                  <p className="font-body text-[9px] text-text-muted">{item.sub}</p>
                </div>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="ml-auto shrink-0">
                  <path d="M2 5.5l2.5 2.5 4-4" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          Go to Merchant Home
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}
