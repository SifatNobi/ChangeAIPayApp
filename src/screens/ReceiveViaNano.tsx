import { useState, useEffect } from 'react'
import { Header } from '@/components/Nav'

interface ReceiveViaNanoProps {
  nanoAddress?: string
  onBack?: () => void
}

const DEFAULT_NANO_ADDRESS = 'nano_1ysn6p7s7gbrxkr67c5emzhq1xpbzcfsgchjcsbcmfxfh8qnqz8guwdx5dwn'

export default function ReceiveViaNano({
  nanoAddress = DEFAULT_NANO_ADDRESS,
  onBack,
}: ReceiveViaNanoProps) {
  const [copied, setCopied] = useState(false)
  const [waitingForTx, setWaitingForTx] = useState(true)
  const [incomingConfirmed, setIncomingConfirmed] = useState(false)

  // Simulate incoming transaction after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIncomingConfirmed(true)
      setWaitingForTx(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(nanoAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Truncate address for display
  const displayAddress = `${nanoAddress.slice(0, 12)}...${nanoAddress.slice(-8)}`

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header onNotification={() => {}} />

      <div className="overflow-y-auto pb-24 flex-1 px-5 flex flex-col gap-5 pt-5" style={{ scrollbarWidth: 'none' }}>
        {/* Back button + title */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
            aria-label="Back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="var(--color-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Receive NANO</h1>
        </div>

        {/* Warning banner */}
        <div
          className="rounded-[--radius-2xl] px-4 py-3 flex gap-2"
          style={{ background: 'rgba(255,109,2,0.08)', border: '1px solid rgba(255,109,2,0.2)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <path d="M8 2v7M8 12v2" stroke="#FF6D02" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="2.5" r="0.75" fill="#FF6D02" />
          </svg>
          <p className="font-body text-xs text-[#FF6D02]">
            <strong>Only send NANO to this address.</strong> Sending any other asset will result in permanent loss.
          </p>
        </div>

        {/* QR Code section */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-40 h-40 rounded-[--radius-2xl] flex items-center justify-center"
            style={{ background: 'white' }}
          >
            {/* Placeholder QR code — in production, generate real QR with qrcode.react */}
            <div className="flex flex-col items-center gap-1">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <rect x="10" y="10" width="80" height="80" fill="white" stroke="#000" strokeWidth="1" />
                {/* QR pattern placeholder */}
                <rect x="15" y="15" width="15" height="15" fill="#000" />
                <rect x="70" y="15" width="15" height="15" fill="#000" />
                <rect x="15" y="70" width="15" height="15" fill="#000" />
                <circle cx="50" cy="50" r="8" fill="#000" />
              </svg>
              <p className="font-body text-[10px] text-text-muted mt-1">QR Code</p>
            </div>
          </div>

          {/* Address display */}
          <div
            className="w-full rounded-[--radius-2xl] px-4 py-3 flex items-center gap-2"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-text-muted mb-1">Your NANO Address</p>
              <p className="font-mono text-xs text-text break-all">{displayAddress}</p>
            </div>
            <button
              onClick={handleCopyAddress}
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-surface-hi"
              aria-label="Copy address"
            >
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8l3 3 9-9" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="6" width="7" height="7" rx="1" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                  <path d="M6 6V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Waiting for transaction state */}
        {waitingForTx && !incomingConfirmed && (
          <div
            className="rounded-[--radius-2xl] px-4 py-5 flex flex-col items-center gap-3"
            style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.2)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(63,231,255,0.2)',
                animation: 'spin 1.5s linear infinite',
              }}
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(63,231,255,0) 0deg, rgba(63,231,255,0.6) 180deg)',
                }}
              />
            </div>
            <p className="font-body text-sm text-text text-center">Waiting for incoming transaction...</p>
            <p className="font-body text-xs text-text-muted">Nano settles instantly — you'll see it confirmed here sub-second</p>
          </div>
        )}

        {/* Incoming confirmed state */}
        {incomingConfirmed && (
          <div
            className="rounded-[--radius-2xl] px-4 py-5 flex flex-col items-center gap-3 animate-fade-in"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(34,197,94,0.2)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10l3 3 7-7" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-success">Transaction confirmed!</p>
              <p className="font-body text-xs text-text-muted mt-1">$25.00 NANO received and settled on the Nano network</p>
            </div>
          </div>
        )}

        {/* Info section */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <div>
            <p className="font-body text-xs font-semibold text-text-muted mb-1.5 uppercase">How it works</p>
            <div className="flex flex-col gap-2">
              {[
                { step: '1', text: 'Share your address with the sender' },
                { step: '2', text: 'They send NANO to your address on the Nano network' },
                { step: '3', text: 'Funds settle instantly — no fees, no delay' },
                { step: '4', text: 'Your ChangeAIPay balance updates automatically' },
              ].map(item => (
                <div key={item.step} className="flex gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-body text-xs font-bold text-white"
                    style={{ background: 'rgba(175,197,255,0.4)' }}
                  >
                    {item.step}
                  </div>
                  <p className="font-body text-xs text-text-muted leading-relaxed pt-0.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
