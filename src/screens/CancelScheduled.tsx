import { useState } from 'react'

interface CancelScheduledProps {
  recipient?: string
  handle?: string
  amount?: string
  scheduledDate?: string
  scheduledTime?: string
  isRecurring?: boolean
  onConfirmCancel?: () => void
  onKeep?: () => void
}

export default function CancelScheduled({
  recipient = 'Sarah Kim',
  handle = '@sarahk',
  amount = '$200.00',
  scheduledDate = 'Sep 5, 2026',
  scheduledTime = '09:00 AM',
  isRecurring = false,
  onConfirmCancel,
  onKeep,
}: CancelScheduledProps) {
  const [cancelling, setCancelling] = useState(false)

  const handleCancel = () => {
    if (cancelling) return
    setCancelling(true)
    setTimeout(() => {
      setCancelling(false)
      onConfirmCancel?.()
    }, 600)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Spacer pushes content to vertical center */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6">
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-[--radius-2xl] flex items-center justify-center"
          style={{ background: 'rgba(255,77,90,0.08)', border: '1px solid rgba(255,77,90,0.2)' }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="6" width="24" height="22" rx="2.5" stroke="#FF4D5A" strokeWidth="1.5" />
            <path d="M10 4v4M22 4v4M4 12h24" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 18l8 4-8 4V18Z" stroke="#FF4D5A" strokeWidth="1.2" strokeLinejoin="round" style={{ transform: 'rotate(45deg)', transformOrigin: '16px 20px' }} />
            <path d="M12 17l8 8M20 17l-8 8" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Headline */}
        <div className="text-center">
          <p className="font-display text-xl font-extrabold text-text tracking-tight mb-2">
            Cancel {isRecurring ? 'Recurring Payment' : 'Scheduled Payment'}?
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            {isRecurring
              ? "This will stop all future payments in this series. It won't affect payments already sent."
              : "This payment will be cancelled and no money will be sent."
            }
          </p>
        </div>

        {/* Payment summary card */}
        <div
          className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          {/* Recipient */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-body text-sm font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.7), rgba(63,231,255,0.4))' }}
            >
              {recipient.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-text">{recipient}</p>
              <p className="font-mono text-xs text-text-muted">{handle}</p>
            </div>
            <p className="font-body text-sm font-semibold text-text-2 ml-auto">{amount}</p>
          </div>

          <div className="border-t border-[color:var(--color-border)]" />

          {/* Date */}
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" />
              <path d="M4 1v2M9 1v2M1 5h11" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <p className="font-body text-xs text-text-muted">Scheduled for {scheduledDate} at {scheduledTime}</p>
          </div>
        </div>

        {/* Consequences note */}
        <div
          className="w-full flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.18)' }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5 shrink-0">
            <path d="M7.5 1L14 13H1L7.5 1Z" stroke="#FF4D5A" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M7.5 6v3M7.5 10.5v.5" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold text-[#FF4D5A] mb-0.5">
              {isRecurring ? "All future payments will stop" : "This action cannot be undone"}
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              {isRecurring
                ? "The recipient won't be notified. You'll need to set up a new recurring payment to resume."
                : "The recipient won't be notified. You can always send a new payment."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-5 pb-8 flex flex-col gap-3">
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #FF4D5A, #e03040)' }}
        >
          {cancelling ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M8 2a6 6 0 1 1-4.24 1.76" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Cancelling…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Yes, Cancel {isRecurring ? 'Series' : 'Payment'}
            </>
          )}
        </button>
        <button
          onClick={onKeep}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-muted flex items-center justify-center transition-all duration-[180ms] active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          Keep It
        </button>
      </div>
    </div>
  )
}
