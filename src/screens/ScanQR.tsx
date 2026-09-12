import { useState, useEffect, useRef, useCallback } from 'react'

interface ScanQRProps {
  onSuccess?: (handle: string) => void
  onInvalid?: () => void
  onExpired?: () => void
  onBack?: () => void
}

type CamState = 'requesting' | 'denied' | 'live' | 'detected' | 'error'

// Extract a usable value from scanned QR data
function parseQRResult(raw: string): string {
  // ChangeAIPay @handle QR
  const handleMatch = raw.match(/@[\w.]+/)
  if (handleMatch) return handleMatch[0]
  // nano_ address
  if (raw.startsWith('nano_')) return raw.trim()
  // URL containing handle
  try {
    const url = new URL(raw)
    const h = url.searchParams.get('handle') || url.pathname.split('/').pop()
    if (h) return h.startsWith('@') ? h : `@${h}`
  } catch { /* not a URL */ }
  return raw.trim().slice(0, 64)
}

export default function ScanQR({ onSuccess, onInvalid, onBack }: ScanQRProps) {
  const [camState, setCamState] = useState<CamState>('requesting')
  const [flashOn, setFlashOn] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const detectedRef = useRef(false)

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setCamState('live')
    } catch (err: unknown) {
      const name = (err as Error)?.name ?? ''
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        setCamState('denied')
      } else {
        setCamState('error')
      }
    }
  }, [])

  // Stop camera
  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }, [])

  useEffect(() => {
    startCamera()
    return stopCamera
  }, [startCamera, stopCamera])

  // Toggle torch (flash) via track constraints
  useEffect(() => {
    const track = streamRef.current?.getVideoTracks()[0]
    if (!track) return
    // @ts-expect-error torch is non-standard
    track.applyConstraints({ advanced: [{ torch: flashOn }] }).catch(() => {})
  }, [flashOn])

  // Scan loop using BarcodeDetector (Chrome/Edge/Safari 17+) with canvas fallback hint
  useEffect(() => {
    if (camState !== 'live') return
    detectedRef.current = false

    // @ts-expect-error BarcodeDetector not in TS lib yet
    const BarcodeDetectorAPI = window.BarcodeDetector
    if (!BarcodeDetectorAPI) {
      // No BarcodeDetector — keep frame live but rely on tap-to-simulate fallback
      return
    }
    // @ts-expect-error
    const detector = new BarcodeDetectorAPI({ formats: ['qr_code'] })

    const scan = async () => {
      if (detectedRef.current) return
      const video = videoRef.current
      if (!video || video.readyState < 2) { rafRef.current = requestAnimationFrame(scan); return }
      try {
        const barcodes = await detector.detect(video)
        if (barcodes.length > 0 && !detectedRef.current) {
          detectedRef.current = true
          const raw = barcodes[0].rawValue as string
          const parsed = parseQRResult(raw)
          setResult(parsed)
          setCamState('detected')
          stopCamera()
          setTimeout(() => onSuccess?.(parsed), 700)
          return
        }
      } catch { /* frame not ready */ }
      rafRef.current = requestAnimationFrame(scan)
    }
    rafRef.current = requestAnimationFrame(scan)
    return () => cancelAnimationFrame(rafRef.current)
  }, [camState, onSuccess, stopCamera])

  // Fallback tap-to-simulate (used when BarcodeDetector unavailable in sandbox)
  const handleFrameTap = () => {
    if (camState === 'detected') return
    // @ts-expect-error
    if (window.BarcodeDetector) return // real scanning is active
    detectedRef.current = true
    setCamState('detected')
    stopCamera()
    setTimeout(() => onSuccess?.('@alexj'), 700)
  }

  const isDetected = camState === 'detected'
  const scanning = camState === 'live'

  // ── Permission denied ────────────────────────────────────────
  if (camState === 'denied') {
    return (
      <div className="flex flex-col bg-bg min-h-screen items-center justify-center px-8 gap-6 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,77,90,0.1)', border: '1.5px solid rgba(255,77,90,0.3)' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="14" width="20" height="14" rx="3" stroke="#FF4D5A" strokeWidth="1.8" />
            <path d="M10 14v-4a6 6 0 0 1 12 0v4" stroke="#FF4D5A" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="21" r="2.5" fill="#FF4D5A" />
            <path d="M16 23.5v2" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="font-display text-xl font-extrabold text-text mb-2">Camera access required</p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            ChangeAIPay needs camera access to scan QR codes. Please enable it in your browser or device settings and try again.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={startCamera}
            className="w-full h-13 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center"
            style={{ background: 'var(--gradient-primary)' }}
          >
            Try again
          </button>
          <button onClick={onBack} className="font-body text-sm text-text-muted">Go back</button>
        </div>
      </div>
    )
  }

  // ── Main scanner view ────────────────────────────────────────
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden" style={{ background: '#000' }}>

        {/* Live video feed */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
          muted
          style={{ opacity: camState === 'requesting' ? 0 : 1, transition: 'opacity 0.4s' }}
        />
        {/* Hidden canvas for future manual decode fallback */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(5,11,45,0.55) 0%, transparent 25%, transparent 75%, rgba(5,11,45,0.75) 100%)' }} />

        {/* Dimmed surround with clear frame cutout (CSS clip approach) */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 9999px rgba(5,11,45,0.45)' }} />

        {/* Frame overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ width: 240, height: 240 }}>
            {/* Corner brackets */}
            {([
              'top-0 left-0',
              'top-0 right-0 rotate-90',
              'bottom-0 right-0 rotate-180',
              'bottom-0 left-0 -rotate-90',
            ] as const).map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-10 h-10`}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M4 20V4h16"
                    stroke={isDetected ? '#22C55E' : scanning ? '#3FE7FF' : 'rgba(175,197,255,0.8)'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'stroke 0.3s' }}
                  />
                </svg>
              </div>
            ))}

            {/* Scan line */}
            {!isDetected && (
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
            {isDetected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(34,197,94,0.25)', border: '2px solid #22C55E', boxShadow: '0 0 24px rgba(34,197,94,0.4)' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 7 12-14" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}

            {/* Tap target for fallback simulation */}
            <button onClick={handleFrameTap} className="absolute inset-0" aria-label="Scan" style={{ background: 'transparent' }} />
          </div>
        </div>

        {/* Loading spinner while camera initialises */}
        {camState === 'requesting' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
        )}

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4 z-10">
          <button
            onClick={() => { stopCamera(); onBack?.() }}
            className="w-11 h-11 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(5,11,45,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(175,197,255,0.15)' }}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14l-5-5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setFlashOn(f => !f)}
            className="w-11 h-11 flex items-center justify-center rounded-full transition-all"
            style={{
              background: flashOn ? 'rgba(245,183,0,0.2)' : 'rgba(5,11,45,0.7)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${flashOn ? 'rgba(245,183,0,0.4)' : 'rgba(175,197,255,0.15)'}`,
            }}
            aria-label={flashOn ? 'Turn off flash' : 'Turn on flash'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M10 2L4 10h6l-2 6 8-10h-6l2-4z"
                stroke={flashOn ? '#F5B700' : 'white'} strokeWidth="1.3" strokeLinejoin="round"
                fill={flashOn ? 'rgba(245,183,0,0.3)' : 'none'} />
            </svg>
          </button>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-6 px-5 z-10">
          <p className="font-body text-sm text-white/80 text-center">
            {isDetected
              ? `${result ? `${result} ` : ''}QR detected — loading…`
              : camState === 'requesting'
              ? 'Starting camera…'
              : 'Point at a ChangeAIPay QR code'}
          </p>
          <button
            onClick={onInvalid}
            className="h-10 px-4 rounded-full font-body text-xs font-semibold text-white/70 flex items-center gap-2 active:scale-95"
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

      <style>{`
        @keyframes scan-line {
          0%, 100% { top: 8%; opacity: 1; }
          50% { top: 88%; opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
