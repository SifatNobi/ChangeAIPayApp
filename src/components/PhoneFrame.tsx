import { type ReactNode, useState, useEffect } from 'react'

/* ── iOS status-bar icons ──────────────────────────────────────── */
function SignalBars() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
      <rect x="0"    y="8"   width="3" height="4"  rx="0.8" fill="white" fillOpacity="0.35" />
      <rect x="4.5"  y="5.5" width="3" height="6.5" rx="0.8" fill="white" fillOpacity="0.6" />
      <rect x="9"    y="3"   width="3" height="9"  rx="0.8" fill="white" />
      <rect x="13.5" y="0"   width="3" height="12" rx="0.8" fill="white" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M1 4C3.7 1.5 6.7 0.3 8 0.3C9.3 0.3 12.3 1.5 15 4"
        stroke="white" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3.2 6.2C4.9 4.6 6.5 3.8 8 3.8C9.5 3.8 11.1 4.6 12.8 6.2"
        stroke="white" strokeOpacity="0.65" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5.5 8.5C6.4 7.6 7.2 7.2 8 7.2C8.8 7.2 9.6 7.6 10.5 8.5"
        stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="11" r="1" fill="white" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.5"
        stroke="white" strokeOpacity="0.35" />
      <rect x="1.5" y="1.5" width="20" height="10" rx="2.5" fill="white" />
      <path d="M24 4.5v4c1.1-.5 1.1-3.5 0-4Z" fill="white" fillOpacity="0.45" />
    </svg>
  )
}

/* ── Phone frame ──────────────────────────────────────────────── */
interface PhoneFrameProps {
  children: ReactNode
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }).format(new Date())
  )

  useEffect(() => {
    const tick = () =>
      setTime(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }).format(new Date()))
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    /* Canvas — dark space outside the phone */
    <div
      className="flex items-start justify-center min-h-screen"
      style={{
        background: '#08080F',
        backgroundImage:
          'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,102,255,0.06) 0%, transparent 60%)',
        padding: '40px 24px 60px',
      }}
    >
      {/* Phone shell — 390 × 844 screen inside a thin bezel */}
      <div
        style={{
          position: 'relative',
          flexShrink: 0,
          width: 390,
          borderRadius: 50,
          background: 'linear-gradient(160deg, #2a2a2a 0%, #141414 100%)',
          padding: 3,
          boxShadow:
            '0 0 0 0.5px rgba(255,255,255,0.12), ' +
            '0 50px 120px rgba(0,0,0,0.85), ' +
            '0 8px 24px rgba(0,0,0,0.6), ' +
            'inset 0 0 0 0.5px rgba(255,255,255,0.06)',
        }}
      >
        {/* Screen glass — transform creates containing block for position:fixed children */}
        <div
          style={{
            borderRadius: 47,
            overflow: 'hidden',
            background: '#050B2D',
            position: 'relative',
            transform: 'translateZ(0)',
            boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.08)',
          }}
        >
          {/* Dynamic Island */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 126,
              height: 37,
              background: '#000',
              borderRadius: 20,
              zIndex: 40,
            }}
          />

          {/* Status bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: 59,
              paddingLeft: 28,
              paddingRight: 22,
              paddingBottom: 10,
              position: 'relative',
              zIndex: 30,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: 'white',
                letterSpacing: '-0.3px',
                lineHeight: 1,
              }}
            >
              {time}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <SignalBars />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* Scrollable content — 785px = 844 − 59 status bar */}
          <div
            style={{
              height: 785,
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'none',
              position: 'relative',
            }}
          >
            {children}
          </div>

          {/* Home indicator */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 134,
              height: 5,
              background: 'rgba(255,255,255,0.26)',
              borderRadius: 3,
              zIndex: 30,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}
