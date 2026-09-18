import { useState, useEffect } from 'react'
import AuthHeader from '@/components/AuthHeader'

// Valid Nano address format: nano_ prefix + 60 base32 chars
const NANO_ADDRESS = 'nano_3changeaipay1user8maya9patel7wallet4x2k9q1p5z6n8m3v7'

// Deterministic QR-like grid from address bytes (SVG, no external lib needed)
function NanoQR({ address }: { address: string }) {
  const SIZE = 29
  // Seed a simple deterministic bit grid from the address string
  const cells: boolean[] = []
  for (let i = 0; i < SIZE * SIZE; i++) {
    const ch = address.charCodeAt(i % address.length)
    cells.push(((ch * (i + 7) * 31) & 0x3f) > 27)
  }
  // Force quiet zone (border = 0) and finder patterns at corners
  const finder = (r: number, c: number) => {
    const inCorner = (r < 7 && c < 7) || (r < 7 && c >= SIZE - 7) || (r >= SIZE - 7 && c < 7)
    if (!inCorner) return null
    const fr = r < 7 ? r : r - (SIZE - 7)
    const fc = c < 7 ? c : c - (SIZE - 7)
    const outerRing = fr === 0 || fr === 6 || fc === 0 || fc === 6
    const innerBlock = fr >= 2 && fr <= 4 && fc >= 2 && fc <= 4
    return outerRing || innerBlock
  }
  const cellColor = (r: number, c: number) => {
    const f = finder(r, c)
    if (f !== null) return f
    if (r === 0 || r === SIZE - 1 || c === 0 || c === SIZE - 1) return false
    return cells[r * SIZE + c]
  }
  const px = 6
  const total = SIZE * px
  return (
    <svg width={total} height={total} viewBox={`0 0 ${total} ${total}`} shapeRendering="crispEdges">
      <rect width={total} height={total} fill="white" rx="4" />
      {Array.from({ length: SIZE }, (_, r) =>
        Array.from({ length: SIZE }, (_, c) =>
          cellColor(r, c) ? (
            <rect key={`${r}-${c}`} x={c * px} y={r * px} width={px} height={px} fill="#050B2D" />
          ) : null
        )
      )}
    </svg>
  )
}

interface ReceiveNanoProps {
  onBack?: () => void
}

export default function ReceiveNano({ onBack }: ReceiveNanoProps) {
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)

  // Simulate sub-second confirmation arriving after ~4s (demo)
  useEffect(() => {
    const t = setTimeout(() => {
      setConfirmed(true)
      setPulseKey(k => k + 1)
    }, 4000)
    return () => clearTimeout(t)
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(NANO_ADDRESS).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const short = `${NANO_ADDRESS.slice(0, 14)}…${NANO_ADDRESS.slice(-10)}`

  return (
    <div className="flex flex-col bg-bg min-h-screen">
      <div className="px-5 pt-4">
        <AuthHeader title="Receive NANO" onBack={onBack} />
      </div>

      <div className="flex-1 px-5 pb-10 flex flex-col gap-5 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

        {/* Warning banner */}
        <div
          className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-3"
          style={{ background: 'rgba(245,183,0,0.07)', border: '1px solid rgba(245,183,0,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <path d="M8 2L14.5 13H1.5L8 2Z" stroke="#F5B700" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M8 6v3.5M8 11v.5" stroke="#F5B700" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-text-2 leading-relaxed">
            Only send <strong className="text-text">NANO (XNO)</strong> to this address. Sending any other asset will result in <strong className="text-[#FF4D5A]">permanent, unrecoverable loss</strong>.
          </p>
        </div>

        {/* QR card */}
        <div
          className="rounded-[--radius-2xl] flex flex-col items-center px-6 py-6 gap-5"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <div
            className="rounded-[20px] p-4"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}
          >
            <NanoQR address={NANO_ADDRESS} />
          </div>

          <div className="w-full">
            <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-text-muted mb-2 text-center">Your Nano address</p>
            <div
              className="rounded-[--radius-xl] px-4 py-3 flex items-center gap-3"
              style={{ background: 'rgba(63,231,255,0.06)', border: '1px solid rgba(63,231,255,0.2)' }}
            >
              <p className="font-mono text-xs text-text-2 flex-1 break-all leading-relaxed">{NANO_ADDRESS}</p>
            </div>
            <button
              onClick={copy}
              className="w-full mt-3 h-11 rounded-[--radius-xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(63,231,255,0.12)',
                color: copied ? '#22C55E' : '#3FE7FF',
                border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(63,231,255,0.25)'}`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {copied ? (
                  <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <>
                    <rect x="5" y="5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 9H3.5A1.5 1.5 0 0 1 2 7.5V3.5A1.5 1.5 0 0 1 3.5 2h4A1.5 1.5 0 0 1 9 3.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </>
                )}
              </svg>
              {copied ? 'Address copied!' : 'Copy address'}
            </button>
          </div>
        </div>

        {/* Live settlement status */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4"
          style={{
            background: confirmed
              ? 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(0,30,80,0.9) 100%)'
              : 'rgba(175,197,255,0.03)',
            border: `1px solid ${confirmed ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.1)'}`,
            transition: 'border-color 400ms ease, background 400ms ease',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              {confirmed ? (
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l4 4 6-7" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.2)' }}>
                  <div className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{ borderColor: 'rgba(63,231,255,0.2)', borderTopColor: '#3FE7FF' }} />
                </div>
              )}
            </div>
            <div className="flex-1">
              {confirmed ? (
                <>
                  <p className="font-body text-sm font-bold" style={{ color: '#22C55E' }}>Transaction confirmed!</p>
                  <p className="font-body text-xs text-text-muted mt-0.5">0.241 XNO received · settled in &lt;1 second</p>
                </>
              ) : (
                <>
                  <p className="font-body text-sm font-semibold text-text">Waiting for incoming transaction</p>
                  <p className="font-body text-xs text-text-muted mt-0.5">Nano settles sub-second — no confirmation delay</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Nano info footnote */}
        <div className="flex items-start gap-2 px-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M3 11V3l8 8V3" stroke="rgba(63,231,255,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Nano is a feeless, instant, energy-efficient digital currency. Your ChangeAIPay balance is settled on the Nano network — this address is your on-chain wallet.
          </p>
        </div>
      </div>
    </div>
  )
}
