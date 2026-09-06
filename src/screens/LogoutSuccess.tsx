interface LogoutSuccessProps {
  onLogin?: () => void
}

export default function LogoutSuccess({ onLogin }: LogoutSuccessProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6">
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-[28px] flex items-center justify-center"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 32px rgba(63,231,255,0.3)' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M11 18l5.5 5.5L25 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center flex flex-col gap-1.5">
            <p className="font-display text-xl font-extrabold text-text">You have been logged out</p>
            <p className="font-body text-sm text-text-muted">Your session has ended. All devices have been signed out of this session.</p>
          </div>
        </div>

        {/* Info tiles */}
        <div className="w-full flex flex-col gap-2.5">
          {[
            { icon: '🔒', label: 'Session ended', sub: 'Your account is secure' },
            { icon: '🔄', label: 'Transfers continue', sub: 'Scheduled payments run normally' },
            { icon: '📲', label: 'Log back in anytime', sub: 'Use PIN, Face ID, or password' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
              <span className="text-base shrink-0">{item.icon}</span>
              <div>
                <p className="font-body text-xs font-semibold text-text">{item.label}</p>
                <p className="font-body text-[10px] text-text-muted">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onLogin}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          Log Back In
        </button>
      </div>
    </div>
  )
}
