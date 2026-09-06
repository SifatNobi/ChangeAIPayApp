interface EmptyNotificationsProps {
  onExplore?: () => void
}

export default function EmptyNotifications({ onExplore }: EmptyNotificationsProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 gap-6" style={{ minHeight: 480 }}>
      {/* Illustration */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-24 h-24 rounded-[28px] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(245,183,0,0.08) 0%, rgba(245,183,0,0.03) 100%)',
            border: '1px solid rgba(245,183,0,0.18)',
            boxShadow: '0 0 32px rgba(245,183,0,0.1)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 8C20 8 12 12 12 22v4H10v2h20v-2h-2v-4c0-10-8-14-8-14z"
              stroke="rgba(245,183,0,0.55)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M17 28v1a3 3 0 006 0v-1" stroke="rgba(245,183,0,0.55)" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="20" cy="8" r="2" fill="rgba(245,183,0,0.2)" stroke="rgba(245,183,0,0.5)" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-2 max-w-[260px]">
        <p className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">All clear</p>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          No notifications right now. Payment confirmations, security alerts, and account updates will appear here when they arrive.
        </p>
      </div>

      {/* Hint chips */}
      <div className="flex flex-wrap gap-2 justify-center max-w-[280px]">
        {["Payment received", "Transfer sent", "Security alert", "Feature update"].map(label => (
          <span
            key={label}
            className="px-2.5 py-1 rounded-full font-body text-[11px]"
            style={{
              background: 'rgba(175,197,255,0.04)',
              color: 'rgba(175,197,255,0.4)',
              border: '1px solid rgba(175,197,255,0.09)',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <button
        onClick={onExplore}
        className="h-12 px-8 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
        style={{
          background: 'rgba(175,197,255,0.05)',
          color: 'rgba(175,197,255,0.7)',
          border: '1px solid rgba(175,197,255,0.12)',
        }}
      >
        Explore the app
      </button>
    </div>
  )
}
