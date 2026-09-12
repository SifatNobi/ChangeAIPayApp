import { useState } from 'react'

interface QuickActionToolbarProps {
  onSend?: () => void
  onScanQR?: () => void
  onAI?: () => void
  onNotifications?: () => void
}

export default function QuickActionToolbar({
  onSend,
  onScanQR,
  onAI,
  onNotifications,
}: QuickActionToolbarProps) {
  const [open, setOpen] = useState(false)

  const dismiss = () => setOpen(false)

  const handle = (fn?: () => void) => {
    setOpen(false)
    fn?.()
  }

  const ACTIONS = [
    {
      label: 'Send',
      onClick: () => handle(onSend),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 15V5M5 10l5-5 5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      accent: 'rgba(0,102,255,0.9)',
      glow: 'rgba(0,102,255,0.4)',
    },
    {
      label: 'Scan QR',
      onClick: () => handle(onScanQR),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1" stroke="white" strokeWidth="1.4" />
          <rect x="11" y="3" width="6" height="6" rx="1" stroke="white" strokeWidth="1.4" />
          <rect x="3" y="11" width="6" height="6" rx="1" stroke="white" strokeWidth="1.4" />
          <path d="M11 11h2v2h-2zM15 11v2M11 15h2M15 15v2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
      accent: 'rgba(63,231,255,0.85)',
      glow: 'rgba(63,231,255,0.35)',
    },
    {
      label: 'AI',
      onClick: () => handle(onAI),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3s1.5 3 3.5 4 3.5 2 3.5 2-2.5.5-3.5 2S10 17 10 17s-1.5-3-3.5-4S3 11 3 11s2.5-.5 3.5-2S10 3 10 3Z"
            stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      ),
      accent: 'rgba(153,69,255,0.9)',
      glow: 'rgba(153,69,255,0.4)',
    },
    {
      label: 'Alerts',
      onClick: () => handle(onNotifications),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5A5 5 0 0 1 15 9v4l2 2H3l2-2V9a5 5 0 0 1 2-4M10 3v1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 15a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
      accent: 'rgba(245,183,0,0.9)',
      glow: 'rgba(245,183,0,0.3)',
    },
  ]

  return (
    /*
     * Sticky wrapper anchors to scroll viewport top; height:0 keeps
     * it out of the normal flow while overflow:visible lets the panel
     * paint over content below.
     */
    <div
      style={{
        position: 'sticky',
        top: 0,
        height: 0,
        overflow: 'visible',
        zIndex: 45,
        pointerEvents: 'none',
      }}
    >
      <div style={{ position: 'relative', height: 785, pointerEvents: 'auto' }}>

        {/* Backdrop — dismisses panel on tap outside */}
        {open && (
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,5,25,0.45)', backdropFilter: 'blur(2px)' }}
            onClick={dismiss}
            aria-hidden="true"
          />
        )}

        {/* Right-side sliding panel — full height strip */}
        <div
          className="absolute top-0 right-0 flex flex-col"
          style={{
            width: 72,
            height: '100%',
            transform: `translateX(${open ? '0%' : '100%'})`,
            transition: 'transform 0.26s cubic-bezier(0.34, 1.56, 0.64, 1)',
            background: 'rgba(10,16,52,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(175,197,255,0.12)',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.45)',
          }}
        >
          {/* Actions — vertically centered in the panel */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5 py-6">
            {ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="flex flex-col items-center gap-1.5"
                style={{ width: 52 }}
                aria-label={action.label}
              >
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-150 active:scale-90"
                  style={{
                    background: action.accent,
                    boxShadow: `0 4px 16px ${action.glow}`,
                  }}
                >
                  {action.icon}
                </div>
                <p className="font-body text-[9px] font-semibold text-center" style={{ color: 'rgba(175,197,255,0.65)' }}>
                  {action.label}
                </p>
              </button>
            ))}
          </div>

          {/* Close strip at bottom of panel */}
          <button
            onClick={dismiss}
            className="flex items-center justify-center pb-4 pt-2"
            aria-label="Close quick actions"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="rgba(175,197,255,0.4)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}
