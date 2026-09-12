interface UnderageGateProps {
  onBack?: () => void
}

export default function UnderageGate({ onBack }: UnderageGateProps) {
  return (
    <div className="flex flex-col bg-bg px-5 pt-4 pb-10" style={{ minHeight: 785 }}>
      {/* Header */}
      <button
        onClick={onBack}
        className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center pb-12">
        {/* Illustration */}
        <div
          className="w-24 h-24 rounded-[28px] flex items-center justify-center"
          style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.3)' }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20" stroke="#F5B700" strokeWidth="2" />
            <path d="M24 14v12M24 30v2" stroke="#F5B700" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex flex-col gap-3 max-w-xs">
          <h1 className="font-display text-2xl font-extrabold text-text">Age Requirement</h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            ChangeAIPay accounts require you to be 18 or older. This is a regulatory requirement for financial services in all markets we operate in.
          </p>
        </div>

        {/* What this means */}
        <div
          className="w-full rounded-[--radius-2xl] p-5 flex flex-col gap-4 text-left"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Why we require this</p>
          {[
            { icon: '⚖️', text: 'Financial regulations require account holders to be adults who can enter into legally binding agreements.' },
            { icon: '🛡️', text: 'Age verification helps us protect younger users from financial products designed for adults.' },
            { icon: '📋', text: 'We are required to verify eligibility during account creation under applicable consumer protection laws.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-base shrink-0">{item.icon}</span>
              <p className="font-body text-xs text-text-2 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* When they turn 18 */}
        <p className="font-body text-xs text-text-muted leading-relaxed max-w-xs">
          You are welcome to create an account once you turn 18. Come back then — we will be here.
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)', color: 'rgba(175,197,255,0.7)' }}
      >
        Back to Start
      </button>
    </div>
  )
}
