import { useState } from 'react'

interface PaymentLinkDetailProps {
  linkId?: string
  onBack?: () => void
  onShare?: () => void
  onDeactivate?: () => void
}

const LINKS: { id: string; name: string; amount: string; status: string; collected: string; completions: number; views: number }[] = []

const STATUS_COLORS: Record<string, string> = {
  Active: '#22C55E',
  Expired: 'rgba(175,197,255,0.4)',
  Completed: '#0066FF',
}

// Simple SVG QR-code-like pattern (7×7 finder pattern + data cells)
function QRCodeSVG() {
  // Finder pattern top-left, top-right, bottom-left + random data
  const size = 180
  const cells = 21
  const cellSize = size / cells

  // Build a deterministic pattern that looks like a QR code
  const grid: boolean[][] = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      // Top-left finder
      if (r < 7 && c < 7) {
        return (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4))
      }
      // Top-right finder
      if (r < 7 && c >= cells - 7) {
        const lc = c - (cells - 7)
        return (r === 0 || r === 6 || lc === 0 || lc === 6 || (r >= 2 && r <= 4 && lc >= 2 && lc <= 4))
      }
      // Bottom-left finder
      if (r >= cells - 7 && c < 7) {
        const lr = r - (cells - 7)
        return (lr === 0 || lr === 6 || c === 0 || c === 6 || (lr >= 2 && lr <= 4 && c >= 2 && c <= 4))
      }
      // Timing patterns
      if (r === 6 || c === 6) return (r + c) % 2 === 0
      // Pseudo-random data
      const v = (r * 31 + c * 17 + r * c * 7) % 100
      return v < 45
    })
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <rect width={size} height={size} fill="rgba(255,255,255,0.04)" rx="12" />
      {grid.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize + 1}
              y={r * cellSize + 1}
              width={cellSize - 2}
              height={cellSize - 2}
              fill="#fff"
              rx={1}
            />
          ) : null
        )
      )}
    </svg>
  )
}

export default function PaymentLinkDetail({ linkId, onBack, onShare, onDeactivate }: PaymentLinkDetailProps) {
  const link = LINKS.find(l => l.id === linkId) ?? LINKS[0]
  const [copied, setCopied] = useState(false)
  const [confirmDeactivate, setConfirmDeactivate] = useState(false)

  const generatedUrl = `pay.changeaipay.com/l/${link.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${generatedUrl}`).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeactivate = () => {
    if (!confirmDeactivate) {
      setConfirmDeactivate(true)
      return
    }
    onDeactivate?.()
    setConfirmDeactivate(false)
  }

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: 'rgba(5,11,45,1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '56px 20px 12px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff' }}>Payment Link</p>
      </div>

      <div style={{ flex: 1, padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Name + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', flex: 1 }}>{link.name}</p>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: STATUS_COLORS[link.status],
              background: `${STATUS_COLORS[link.status]}18`,
              padding: '3px 10px',
              borderRadius: 100,
              border: `1px solid ${STATUS_COLORS[link.status]}30`,
            }}
          >
            {link.status}
          </span>
        </div>

        {/* QR Code */}
        <div
          style={{
            background: 'rgba(175,197,255,0.03)',
            border: '1px solid rgba(175,197,255,0.09)',
            borderRadius: 20,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <QRCodeSVG />
          <p style={{ fontSize: 11, color: 'rgba(175,197,255,0.4)', textAlign: 'center' }}>Scan to pay · {link.amount}</p>
        </div>

        {/* Link URL + copy */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(175,197,255,0.04)',
            border: '1px solid rgba(175,197,255,0.12)',
            borderRadius: 12,
            padding: '10px 14px',
            gap: 10,
          }}
        >
          <p
            style={{
              flex: 1,
              fontSize: 13,
              color: 'rgba(175,197,255,0.7)',
              fontFamily: 'var(--font-mono, monospace)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {generatedUrl}
          </p>
          <button
            onClick={handleCopy}
            style={{
              height: 32,
              padding: '0 12px',
              borderRadius: 8,
              background: copied ? '#22C55E20' : 'rgba(0,102,255,0.2)',
              border: `1px solid ${copied ? '#22C55E40' : 'rgba(0,102,255,0.4)'}`,
              color: copied ? '#22C55E' : '#3FE7FF',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'Views', value: link.views },
            { label: 'Completions', value: link.completions },
            { label: 'Collected', value: link.collected },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                padding: '14px 10px',
                borderRadius: 14,
                background: 'rgba(175,197,255,0.03)',
                border: '1px solid rgba(175,197,255,0.09)',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono, monospace)' }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: 'rgba(175,197,255,0.4)', marginTop: 2 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Share button */}
        <button
          onClick={onShare}
          style={{
            height: 52,
            borderRadius: 16,
            background: 'transparent',
            border: '1.5px solid rgba(0,102,255,0.5)',
            color: '#3FE7FF',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Share Link
        </button>

        {/* Deactivate */}
        {link.status === 'Active' && (
          <div>
            {!confirmDeactivate ? (
              <button
                onClick={handleDeactivate}
                style={{
                  width: '100%',
                  height: 52,
                  borderRadius: 16,
                  background: 'rgba(255,77,90,0.1)',
                  border: '1px solid rgba(255,77,90,0.3)',
                  color: '#FF4D5A',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Deactivate Link
              </button>
            ) : (
              <div
                style={{
                  borderRadius: 16,
                  background: 'rgba(255,77,90,0.08)',
                  border: '1px solid rgba(255,77,90,0.25)',
                  padding: 16,
                }}
              >
                <p style={{ fontSize: 13, color: 'rgba(175,197,255,0.8)', marginBottom: 12, textAlign: 'center' }}>
                  Deactivating this link will stop all payments. Confirm?
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setConfirmDeactivate(false)}
                    style={{ flex: 1, height: 44, borderRadius: 12, background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)', color: 'rgba(175,197,255,0.7)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeactivate}
                    style={{ flex: 1, height: 44, borderRadius: 12, background: 'rgba(255,77,90,0.2)', border: '1px solid rgba(255,77,90,0.4)', color: '#FF4D5A', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Yes, Deactivate
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
