import { useState } from 'react'
import { Header } from '@/components/Nav'

interface SendToExternalNanoProps {
  onConfirm?: (recipientAddress: string, amount: string) => void
  onBack?: () => void
}

export default function SendToExternalNano({
  onConfirm,
  onBack,
}: SendToExternalNanoProps) {
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const isValidAddress = recipientAddress.startsWith('nano_') && recipientAddress.length === 65
  const canContinue = isValidAddress && parseFloat(amount) > 0

  const handleScanQR = () => {
    // In production, this would open QR scanner
    alert('QR Scanner would open here')
  }

  const handleContinue = () => {
    if (!canContinue) return
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    if (!canContinue) return
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      onConfirm?.(recipientAddress, amount)
    }, 800)
  }

  if (showConfirmation) {
    return (
      <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
        <Header onNotification={() => {}} />

        <div className="overflow-y-auto pb-24 flex-1 px-5 flex flex-col gap-5 pt-5" style={{ scrollbarWidth: 'none' }}>
          {/* Back + title */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4l-6 6 6 6" stroke="var(--color-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Confirm Send</h1>
          </div>

          {/* Amount hero */}
          <div
            className="rounded-[--radius-2xl] px-5 py-8 flex flex-col items-center gap-2"
            style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
          >
            <p className="font-body text-xs text-white/50 uppercase tracking-wider">Sending</p>
            <p className="font-display text-5xl font-extrabold text-white tracking-tighter">${amount}</p>
            <p className="font-body text-sm text-white/60">NANO</p>
          </div>

          {/* Recipient info */}
          <div
            className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
          >
            <div>
              <p className="font-body text-xs text-text-muted mb-1">To Address</p>
              <p className="font-mono text-xs text-text break-all">{recipientAddress}</p>
            </div>
            <div className="border-t border-[color:var(--color-border)] pt-3">
              <p className="font-body text-xs text-text-muted mb-1">Fee</p>
              <p className="font-mono text-sm font-bold text-success">$0.00</p>
              <p className="font-body text-[10px] text-text-muted mt-1">Nano is completely feeless</p>
            </div>
          </div>

          {/* Warning */}
          <div
            className="rounded-[--radius-2xl] px-4 py-3 flex gap-2"
            style={{ background: 'rgba(255,77,90,0.08)', border: '1px solid rgba(255,77,90,0.2)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
              <path d="M8 2v7M8 12v2" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="2.5" r="0.75" fill="#FF4D5A" />
            </svg>
            <p className="font-body text-xs text-[#FF4D5A]">
              <strong>This action cannot be undone.</strong> Blockchain transactions are irreversible. Double-check the address before confirming.
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 transition-colors hover:bg-surface-hi active:scale-[0.98]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              Edit
            </button>
            <button
              onClick={handleConfirm}
              disabled={!canContinue || confirming}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              style={{ background: confirming ? 'rgba(175,197,255,0.2)' : 'var(--gradient-primary)' }}
            >
              {confirming ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" className="animate-spin">
                    <circle cx="7" cy="7" r="5" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="7.85 31.4" />
                  </svg>
                  Sending...
                </>
              ) : (
                'Confirm Send'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header onNotification={() => {}} />

      <div className="overflow-y-auto pb-24 flex-1 px-5 flex flex-col gap-5 pt-5" style={{ scrollbarWidth: 'none' }}>
        {/* Back + title */}
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
          <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Send to External Wallet</h1>
        </div>

        {/* Info banner */}
        <div
          className="rounded-[--radius-2xl] px-4 py-3 flex gap-2"
          style={{ background: 'rgba(0,170,198,0.08)', border: '1px solid rgba(0,170,198,0.2)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="6.5" stroke="#00AACC" strokeWidth="1.3" />
            <path d="M8 5v4M8 12v0.5" stroke="#00AACC" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-[#00AACC]">
            You're sending NANO directly to the Nano network — funds settle instantly, no fees.
          </p>
        </div>

        {/* Recipient address */}
        <div>
          <p className="font-body text-sm font-semibold text-text mb-2">Recipient Address</p>
          <div
            className="relative rounded-[--radius-2xl] overflow-hidden"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <input
              type="text"
              placeholder="nano_1ysn6p7s7gbrxkr67c5emzhq1xpbzcfsgchjcsbcmfxfh8qnqz8guwdx5dwn"
              value={recipientAddress}
              onChange={e => setRecipientAddress(e.target.value)}
              className="w-full px-4 py-3 bg-transparent font-mono text-xs text-text placeholder:text-text-muted focus:outline-none"
            />
            <button
              onClick={handleScanQR}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-hi transition-colors"
              aria-label="Scan QR"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="4" height="4" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                <rect x="10" y="2" width="4" height="4" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                <rect x="2" y="10" width="4" height="4" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                <circle cx="12" cy="12" r="1.5" fill="rgba(175,197,255,0.6)" />
              </svg>
            </button>
          </div>
          {recipientAddress && !isValidAddress && (
            <p className="font-body text-xs text-[#FF4D5A] mt-1">Invalid Nano address (must start with nano_ and be 65 characters)</p>
          )}
          {isValidAddress && (
            <p className="font-body text-xs text-success mt-1">✓ Valid Nano address</p>
          )}
        </div>

        {/* Amount input */}
        <div>
          <p className="font-body text-sm font-semibold text-text mb-2">Amount</p>
          <div className="relative rounded-[--radius-2xl] overflow-hidden" style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-text-muted">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full pl-7 pr-4 py-3 bg-transparent font-mono text-lg text-text placeholder:text-text-muted focus:outline-none"
            />
          </div>
          {amount && parseFloat(amount) <= 0 && (
            <p className="font-body text-xs text-[#FF4D5A] mt-1">Amount must be greater than 0</p>
          )}
        </div>

        {/* Fee info */}
        <div
          className="rounded-[--radius-2xl] px-4 py-3 flex items-center justify-between"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <p className="font-body text-xs text-text-muted">Transaction Fee</p>
          <p className="font-mono text-sm font-bold text-success">$0.00</p>
        </div>

        {/* Warning */}
        <div
          className="rounded-[--radius-2xl] px-4 py-3 flex gap-2"
          style={{ background: 'rgba(255,109,2,0.08)', border: '1px solid rgba(255,109,2,0.2)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <path d="M8 2v7M8 12v2" stroke="#FF6D02" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="2.5" r="0.75" fill="#FF6D02" />
          </svg>
          <p className="font-body text-xs text-[#FF6D02]">
            <strong>Double-check the address.</strong> Blockchain transactions are irreversible.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full h-12 mt-auto rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
