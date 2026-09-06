interface ShareReceiptProps {
  transactionId?: string
  onMessage?: () => void
  onEmail?: () => void
  onSavePDF?: () => void
  onSaveImage?: () => void
  onCopyLink?: () => void
  onDismiss?: () => void
}

const SHARE_OPTIONS = [
  {
    id: 'message',
    label: 'Message',
    sub: 'Send via SMS or iMessage',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6l-3 2V6a1 1 0 0 1 1-1Z"
          stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M7 10h8M7 13h5" stroke="rgba(175,197,255,0.5)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    sub: 'Send as an email attachment',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="6" width="16" height="11" rx="1.5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" />
        <path d="M3 7.5l8 5.5 8-5.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'pdf',
    label: 'Save as PDF',
    sub: 'Full-page formatted document',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 4h8l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
          stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M13 4v4h4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13h6M8 16h4" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'image',
    label: 'Save as Image',
    sub: 'PNG to Photos / Camera Roll',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="12" rx="1.5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" />
        <circle cx="8" cy="9.5" r="1.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1" />
        <path d="M3 14.5l5-4 3 3 3-2.5 5 3.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'link',
    label: 'Copy Link',
    sub: 'Shareable receipt URL',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M9 13a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 0 0-5.66-5.66l-1.41 1.41"
          stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M13 9a4 4 0 0 0-5.66 0L4.51 11.83a4 4 0 0 0 5.66 5.66l1.41-1.41"
          stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function ShareReceipt({
  transactionId = 'TXN-2026-0088AF',
  onMessage,
  onEmail,
  onSavePDF,
  onSaveImage,
  onCopyLink,
  onDismiss,
}: ShareReceiptProps) {
  const handlers: Record<string, (() => void) | undefined> = {
    message: onMessage, email: onEmail, pdf: onSavePDF, image: onSaveImage, link: onCopyLink,
  }

  return (
    <div className="flex flex-col items-center bg-bg" style={{ minHeight: 785 }}>
      {/* Bottom-sheet feel */}
      <div className="flex-1 flex flex-col items-center justify-end w-full pb-4 px-5">
        <div
          className="w-full rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(13,26,74,0.98)', border: '1px solid rgba(175,197,255,0.15)', backdropFilter: 'blur(24px)' }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3">
            <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
          </div>

          {/* Title */}
          <div className="px-5 pt-4 pb-4 border-b border-[color:var(--color-border)]">
            <p className="font-display text-base font-extrabold text-text">Share Receipt</p>
            <p className="font-mono text-xs text-text-muted mt-0.5">{transactionId}</p>
          </div>

          {/* Options */}
          <div className="px-5 pt-3 pb-5 flex flex-col gap-1">
            {SHARE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={handlers[opt.id]}
                className="flex items-center gap-4 h-14 w-full rounded-[--radius-xl] px-3 transition-all duration-[180ms] active:scale-[0.98] hover:bg-surface-hi"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.12)' }}
                >
                  {opt.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body text-sm font-semibold text-text">{opt.label}</p>
                  <p className="font-body text-xs text-text-muted">{opt.sub}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.25)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>

          {/* Cancel */}
          <div className="px-5 pb-5">
            <button
              onClick={onDismiss}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-muted flex items-center justify-center transition-all duration-[180ms] active:scale-[0.98]"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
