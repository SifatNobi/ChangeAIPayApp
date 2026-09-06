import { useState } from 'react'

type AmountMode = 'fixed' | 'open'
type QRAction = 'display' | 'share' | 'print'

interface MerchantQRProps {
  businessName?: string
  onBack?: () => void
  onShare?: () => void
  onPrint?: () => void
}

function QRPattern({ size = 180, seed = 42 }: { size?: number; seed?: number }) {
  const cells = 21
  const cellSize = size / cells

  const pseudoRand = (x: number, y: number, s: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.3) * 43758.5453
    return n - Math.floor(n)
  }

  const isFinderPattern = (x: number, y: number) =>
    (x < 7 && y < 7) ||
    (x > cells - 8 && y < 7) ||
    (x < 7 && y > cells - 8)

  const isAlignmentPattern = (x: number, y: number) =>
    x >= cells - 10 && x <= cells - 5 && y >= cells - 10 && y <= cells - 5

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: cells }, (_, y) =>
        Array.from({ length: cells }, (_, x) => {
          const inFinder = isFinderPattern(x, y)
          const inAlignment = isAlignmentPattern(x, y)
          const filled = inFinder || inAlignment || pseudoRand(x, y, seed) > 0.48

          return filled ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill={inFinder ? '#0066FF' : inAlignment ? '#9945FF' : 'white'}
              opacity={inFinder ? 1 : inAlignment ? 0.9 : 0.85}
            />
          ) : null
        })
      )}
    </svg>
  )
}

export default function MerchantQR({
  businessName = 'Apex Studio LLC',
  onBack,
  onShare,
  onPrint,
}: MerchantQRProps) {
  const [mode, setMode] = useState<AmountMode>('open')
  const [amount, setAmount] = useState('')
  const [label, setLabel] = useState('')
  const [activeAction, setActiveAction] = useState<QRAction | null>(null)

  const displayAmount = mode === 'fixed' && amount ? `$${parseFloat(amount).toFixed(2)}` : null

  const handleAction = (action: QRAction) => {
    setActiveAction(action)
    setTimeout(() => {
      setActiveAction(null)
      if (action === 'share') onShare?.()
      if (action === 'print') onPrint?.()
    }, 800)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Payment QR Code</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Mode toggle */}
        <div
          className="flex p-1 rounded-[--radius-xl] gap-1"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          {(['open', 'fixed'] as AmountMode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 h-8 rounded-[--radius-lg] font-body text-xs font-semibold transition-all"
              style={{
                background: mode === m ? 'var(--color-accent)' : 'transparent',
                color: mode === m ? 'white' : 'rgba(175,197,255,0.5)',
              }}
            >
              {m === 'open' ? 'Any Amount' : 'Fixed Amount'}
            </button>
          ))}
        </div>

        {/* Fixed amount input */}
        {mode === 'fixed' && (
          <div
            className="rounded-[--radius-xl] px-4 py-4"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <p className="font-body text-xs text-text-muted mb-2">Amount</p>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-extrabold text-text">$</span>
              <input
                type="number"
                className="flex-1 bg-transparent font-display text-3xl font-extrabold text-text outline-none"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <input
              className="mt-3 w-full bg-transparent font-body text-xs text-text placeholder-text-muted outline-none border-t pt-3"
              style={{ borderColor: 'rgba(175,197,255,0.1)' }}
              placeholder="Label (optional — e.g. Table 12)"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
          </div>
        )}

        {/* QR display */}
        <div
          className="flex flex-col items-center rounded-[--radius-2xl] py-8 px-6"
          style={{
            background: 'linear-gradient(135deg, rgba(175,197,255,0.04) 0%, rgba(0,102,255,0.06) 100%)',
            border: '1px solid rgba(175,197,255,0.12)',
          }}
        >
          {/* QR card */}
          <div
            className="rounded-[20px] p-5 flex flex-col items-center gap-3"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(175,197,255,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div
              className="rounded-[16px] p-3"
              style={{ background: '#0A0E1A' }}
            >
              <QRPattern size={180} seed={businessName.length + (amount ? parseFloat(amount) : 0)} />
            </div>

            <div className="text-center">
              <p className="font-display text-sm font-extrabold text-text">{businessName}</p>
              {displayAmount && (
                <p className="font-mono text-xl font-bold mt-1" style={{ color: '#22C55E' }}>{displayAmount}</p>
              )}
              {label && (
                <p className="font-body text-xs text-text-muted mt-0.5">{label}</p>
              )}
              {!displayAmount && (
                <p className="font-body text-xs text-text-muted mt-0.5">Scan to pay any amount</p>
              )}
            </div>

            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <p className="font-body text-[10px] font-semibold" style={{ color: 'rgba(175,197,255,0.7)' }}>
                ChangeAIPay · Secure payment
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleAction('display')}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: activeAction === 'display' ? 'rgba(0,102,255,0.6)' : 'var(--gradient-primary)',
            }}
          >
            {activeAction === 'display' ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.3" />
                <path d="M5 13v2M11 13v2M3 15h10" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            )}
            Display QR
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => handleAction('share')}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{
                background: activeAction === 'share' ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.06)',
                border: '1px solid rgba(175,197,255,0.14)',
                color: 'rgba(175,197,255,0.7)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="11" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="11" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4.5 6.2l5-2.4M4.5 7.8l5 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Share
            </button>
            <button
              onClick={() => handleAction('print')}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{
                background: activeAction === 'print' ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.06)',
                border: '1px solid rgba(175,197,255,0.14)',
                color: 'rgba(175,197,255,0.7)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 5V2h6v3M4 10H2V6h10v4h-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="4" y="8" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Print
            </button>
          </div>
        </div>

        {/* Usage note */}
        <div
          className="flex items-start gap-2.5 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.12)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6" cy="6" r="5" stroke="#3FE7FF" strokeWidth="1" />
            <path d="M6 5v3M6 3.5v.5" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            QR codes are unique to your merchant account. Payments are credited instantly and appear in your dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
