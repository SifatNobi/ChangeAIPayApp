import { useState, useEffect, useCallback } from 'react'

// Real, correctly-formatted Nano address (64-char account string, nano_ prefix)
const NANO_ADDRESS = 'nano_1ysn6p7s7gbrxkr67c5emzhq1xpbzcfsgchjcsbcmfxfh8qnqz8guwdx5dwn'
const NANO_ADDRESS_SHORT = 'nano_1ysn6p7...x5dwn'

interface NanoReceiveProps {
  onBack?: () => void
  onDone?: () => void
}

// Deterministic QR-like grid seeded from the address
function NanoQR({ address }: { address: string }) {
  const seed = address.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0)
  const cell = (i: number) => {
    const row = Math.floor(i / 11)
    const col = i % 11
    // Finder patterns (top-left, top-right, bottom-left)
    const finder =
      (row < 3 && col < 3) ||
      (row < 3 && col >= 8) ||
      (row >= 8 && col < 3)
    return finder || (((seed * 31 + i * 17) ^ (i * 7 + 13)) % 3) !== 0
  }

  return (
    <div
      className="rounded-[20px] p-4"
      style={{
        background: 'white',
        width: 200,
        height: 200,
        display: 'grid',
        gridTemplateColumns: 'repeat(11, 1fr)',
        gridTemplateRows: 'repeat(11, 1fr)',
        gap: 2,
      }}
    >
      {Array.from({ length: 121 }).map((_, i) => (
        <div
          key={i}
          style={{
            borderRadius: 2,
            backgroundColor: cell(i) ? '#050B2D' : 'transparent',
          }}
        />
      ))}
    </div>
  )
}

// Simulated incoming transaction watcher
// In production this would be a WebSocket subscription to the Nano node
function useNanoWatcher() {
  const [status, setStatus] = useState<'waiting' | 'detected' | 'confirmed'>('waiting')
  const [incomingAmount, setIncomingAmount] = useState<string | null>(null)
  const [blockHash, setBlockHash] = useState<string | null>(null)

  useEffect(() => {
    // Simulate a transaction arriving after ~8s for demo purposes
    const detectTimer = setTimeout(() => {
      setStatus('detected')
      setIncomingAmount('0.42')
    }, 8000)

    const confirmTimer = setTimeout(() => {
      setStatus('confirmed')
      // Real Nano block hash format: 64 hex chars
      setBlockHash('A170D9EF3A9B4C2F8E1D7B6A3C5F2E9D4B8A1C7E3F6D2B9A4C8E1F5D3B7A2C6')
    }, 8800) // Nano confirms sub-second after detection

    return () => {
      clearTimeout(detectTimer)
      clearTimeout(confirmTimer)
    }
  }, [])

  return { status, incomingAmount, blockHash }
}

export default function NanoReceive({ onBack, onDone }: NanoReceiveProps) {
  const [copied, setCopied] = useState(false)
  const { status, incomingAmount, blockHash } = useNanoWatcher()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(NANO_ADDRESS).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Ambient glow — cyan tint for Nano */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(63,231,255,0.07) 0%, transparent 65%)',
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {/* Nano "N" mark */}
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-display text-xs font-extrabold"
            style={{ background: 'rgba(63,231,255,0.15)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.3)' }}
          >
            N
          </div>
          <span className="font-body text-sm font-semibold text-text">Receive via Nano Network</span>
        </div>
        <button
          onClick={onDone}
          className="font-body text-sm font-semibold text-accent min-h-[44px] flex items-center"
        >
          Done
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Warning banner — prominent, above the QR */}
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.07)', border: '1px solid rgba(245,183,0,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <path d="M8 2L1.5 13h13L8 2Z" stroke="#F5B700" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M8 6v3.5M8 11v.5" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-warning leading-relaxed">
            <span className="font-bold">Only send NANO to this address.</span>{' '}
            Sending any other asset will result in permanent, unrecoverable loss.
          </p>
        </div>

        {/* QR code */}
        <div
          className="flex flex-col items-center gap-4 px-4 py-6 rounded-[--radius-2xl]"
          style={{
            background: 'rgba(175,197,255,0.03)',
            border: '1px solid rgba(63,231,255,0.15)',
          }}
        >
          <NanoQR address={NANO_ADDRESS} />

          {/* Network badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.2)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#3FE7FF]" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="font-body text-xs font-semibold" style={{ color: '#3FE7FF' }}>Nano Network · Mainnet</span>
          </div>
        </div>

        {/* Address display + copy */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">Your Nano Address</p>

          {/* Full address — monospace, selectable */}
          <p
            className="font-mono text-xs text-text-2 leading-relaxed break-all select-all"
            style={{ wordBreak: 'break-all' }}
          >
            {NANO_ADDRESS}
          </p>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.97]"
            style={{
              background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(63,231,255,0.1)',
              border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(63,231,255,0.25)'}`,
              color: copied ? '#22C55E' : '#3FE7FF',
            }}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3.5 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Address Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2.5" y="4.5" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1" />
                  <path d="M4.5 4.5V3.5a0.8 0.8 0 0 1 0.8-0.8h4.7a0.8 0.8 0 0 1 0.8 0.8v4.7a0.8 0.8 0 0 1-0.8 0.8H9.5" stroke="currentColor" strokeWidth="1" />
                </svg>
                Copy Address
              </>
            )}
          </button>
        </div>

        {/* Live incoming transaction watcher */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3 transition-all duration-500"
          style={{
            background: status === 'confirmed'
              ? 'rgba(34,197,94,0.07)'
              : status === 'detected'
              ? 'rgba(63,231,255,0.06)'
              : 'rgba(175,197,255,0.03)',
            border: `1px solid ${
              status === 'confirmed'
                ? 'rgba(34,197,94,0.3)'
                : status === 'detected'
                ? 'rgba(63,231,255,0.25)'
                : 'rgba(175,197,255,0.09)'
            }`,
          }}
        >
          <div className="flex items-center gap-2.5">
            {status === 'waiting' && (
              <>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(175,197,255,0.08)' }}
                >
                  {/* Animated radar rings */}
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <div
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        border: '1.5px solid rgba(175,197,255,0.4)',
                        animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                      }}
                    />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(175,197,255,0.5)' }} />
                  </div>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-text">Waiting for incoming transaction</p>
                  <p className="font-body text-[10px] text-text-muted">Nano confirms in under 1 second — no refresh needed</p>
                </div>
              </>
            )}

            {status === 'detected' && (
              <>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 animate-spin-slow"
                  style={{ background: 'rgba(63,231,255,0.12)', border: '1.5px solid rgba(63,231,255,0.3)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v3M7 9v3M2 7h3M9 7h3" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold" style={{ color: '#3FE7FF' }}>Transaction detected</p>
                  <p className="font-body text-[10px] text-text-muted">Confirming on Nano network…</p>
                </div>
                <p className="font-mono text-sm font-bold ml-auto" style={{ color: '#3FE7FF' }}>+{incomingAmount} NANO</p>
              </>
            )}

            {status === 'confirmed' && (
              <>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 animate-success"
                  style={{ background: 'rgba(34,197,94,0.15)', border: '1.5px solid rgba(34,197,94,0.35)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3.5 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>Confirmed instantly</p>
                  <p className="font-body text-[10px] text-text-muted">Settled on Nano — zero fees, zero wait</p>
                </div>
                <p className="font-mono text-sm font-bold" style={{ color: '#22C55E' }}>+{incomingAmount} NANO</p>
              </>
            )}
          </div>

          {/* Block hash — shown on confirm */}
          {status === 'confirmed' && blockHash && (
            <div
              className="px-3 py-2.5 rounded-[--radius-lg] flex flex-col gap-1"
              style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}
            >
              <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-text-muted">Block Hash</p>
              <p className="font-mono text-[9px] text-text-2 break-all leading-relaxed">{blockHash}</p>
              <a
                href={`https://nanolooker.com/block/${blockHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[10px] font-semibold mt-0.5 flex items-center gap-1"
                style={{ color: '#22C55E' }}
              >
                View on NanoLooker
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M4 2H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V6M6 1h3v3M5 5l4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Feeless info */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1" />
            <path d="M4.5 7l2 2 3-3" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-2">
            Nano is <span className="font-semibold text-[#3FE7FF]">feeless and instant</span> — the sender pays nothing and you receive the full amount.
          </p>
        </div>
      </div>
    </div>
  )
}
