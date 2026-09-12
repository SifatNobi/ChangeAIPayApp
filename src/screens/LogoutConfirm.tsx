interface LogoutConfirmProps {
  name?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function LogoutConfirm({ name = 'Maya', onConfirm, onCancel }: LogoutConfirmProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onCancel} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Log Out</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6">
        {/* Icon */}
        <div className="w-20 h-20 rounded-[28px] flex items-center justify-center"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1.5px solid rgba(175,197,255,0.14)' }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M21 11l6 6-6 6M27 17H13" stroke="rgba(175,197,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 8H8.5A2.5 2.5 0 0 0 6 10.5v13A2.5 2.5 0 0 0 8.5 26H13" stroke="rgba(175,197,255,0.3)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        <div className="text-center flex flex-col gap-2">
          <p className="font-display text-xl font-extrabold text-text">Log out of ChangeAIPay?</p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            Hey {name.split(' ')[0]}, you will need to sign in again to access your account. Recurring payments and scheduled transfers will continue.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button onClick={onConfirm}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.07)', border: '1.5px solid rgba(175,197,255,0.2)', color: 'rgba(175,197,255,0.75)' }}>
            Yes, Log Out
          </button>
          <button onClick={onCancel}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}>
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  )
}
