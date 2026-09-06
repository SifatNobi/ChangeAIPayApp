import { useState, useEffect } from 'react'

interface ScanQRProps {
  onSuccess?: (handle: string) => void
  onInvalid?: () => void
  onExpired?: () => void
  onBack?: () => void
}

export default function ScanQR({ onSuccess, onInvalid, onBack }: ScanQRProps) {
  const [flashOn, setFlashOn] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [detected, setDetected] = useState(false)

  /* Simulate a successful scan after the user taps the frame */
  const handleFrameTap = () => {
    if (scanning || detected) return
    setScanning(true)
    setTimeout(() => {
      setDetected(true)
      setTimeout(() => onSuccess?.('@alexj'), 600)
    }, 900)
  }

  /* Pulse the corner guides */
  useEffect(() => {
    if (detected) return
    const id = setInterval(() => setScanning(s => !s), 1800)
    return () => clearInterval(id)
  }, [detected])

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Dark viewfinder fills most of the screen */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden" style={{ background: '#000' }}>
        {/* Simulated camera noise */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,11,45,0.6) 0%, transparent 30%, transparent 70%, rgba(5,11,45,0.8) 100%)' }} />

        {/* Frame overlay — dimmed surround */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: 240, height: 240 }}>
            {/* Corner brackets */}
            {[
              'top-0 left-0',
              'top-0 right-0 rotate-90',
              'bottom-0 right-0 rotate-180',
              'bottom-0 left-0 -rotate-90',
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-10 h-10`}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M4 20V4h16"
                    stroke={detected ? '#22C55E' : scanning ? '#3FE7FF' : 'rgba(175,197,255,0.8)'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'stroke 0.3s' }}
                  />
                </svg>
              </div>
            ))}

            {/* Scan line */}
            {!detected && (
              <div
                className="absolute left-2 right-2 h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #3FE7FF, transparent)',
                  boxShadow: '0 0 8px #3FE7FF',
                  animation: 'scan-line 1.8s ease-in-out infinite',
                  top: '50%',
                }}
              />
            )}

            {/* Success checkmark */}
            {detected && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.2)', border: '2px solid #22C55E' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 7 12-14" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}

            {/* Tap target — invisible, covers the frame area */}
            <button
              onClick={handleFrameTap}
              className="absolute inset-0"
              aria-label="Tap to simulate scan"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
          <button
            onClick={onBack}
            className="w-11 h-11 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(5,11,45,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(175,197,255,0.15)' }}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14l-5-5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Flash toggle */}
          <button
            onClick={() => setFlashOn(f => !f)}
            className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-[200ms]"
            style={{
              background: flashOn ? 'rgba(245,183,0,0.2)' : 'rgba(5,11,45,0.7)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${flashOn ? 'rgba(245,183,0,0.4)' : 'rgba(175,197,255,0.15)'}`,
            }}
            aria-label={flashOn ? 'Turn off flash' : 'Turn on flash'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M10 2L4 10h6l-2 6 8-10h-6l2-4z" stroke={flashOn ? '#F5B700' : 'white'} strokeWidth="1.3" strokeLinejoin="round" fill={flashOn ? 'rgba(245,183,0,0.3)' : 'none'} />
            </svg>
          </button>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-6 px-5">
          <p className="font-body text-sm text-white/70 text-center">
            {detected ? 'QR code detected — loading…' : 'Point at a ChangeAIPay QR code'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onInvalid}
              className="h-10 px-4 rounded-full font-body text-xs font-semibold text-white/70 flex items-center gap-2 transition-all duration-[180ms] active:scale-[0.96]"
              style={{ background: 'rgba(5,11,45,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(175,197,255,0.2)' }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                <path d="M4 6.5h5M6.5 4v5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Upload from Gallery
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0%, 100% { top: 8%; opacity: 1; }
          50% { top: 88%; opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
