import { useState, useCallback } from 'react'

// The sender's own Nano address (same account as NanoReceive)
const OWN_NANO_ADDRESS = 'nano_1ysn6p7s7gbrxkr67c5emzhq1xpbzcfsgchjcsbcmfxfh8qnqz8guwdx5dwn'

interface NanoSendProps {
  onBack?: () => void
  onSuccess?: () => void
  onScanQR?: () => void
}

type Step = 'form' | 'confirm' | 'sending' | 'success'

// Validate a Nano address: must start with nano_ or xrb_, followed by 60 chars [13456789abcdefghijkmnopqrstuwxyz]
function isValidNanoAddress(addr: string): boolean {
  return /^(nano|xrb)_[13456789abcdefghijkmnopqrstuwxyz]{60}$/.test(addr.trim())
}

function fmtNano(n: string) {
  const num = parseFloat(n)
  if (isNaN(num)) return '0'
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })
}

export default function NanoSend({ onBack, onSuccess, onScanQR }: NanoSendProps) {
  const [step, setStep] = useState<Step>('form')
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [addressError, setAddressError] = useState('')
  const [amountError, setAmountError] = useState('')
  const [blockHash] = useState('C8F3A2D9E1B7F4C6A3D8E2B5F1C9A4D7E3B6F2C8A5D1E9B4F7C3A6D2E8B1F5C4')

  const availableNano = 12.847 // mock balance

  const validateAndProceed = useCallback(() => {
    let ok = true
    if (!isValidNanoAddress(destination)) {
      setAddressError('Enter a valid nano_... address (64 characters after the prefix)')
      ok = false
    } else {
      setAddressError('')
    }
    const num = parseFloat(amount)
    if (!amount || isNaN(num) || num <= 0) {
      setAmountError('Enter an amount greater than 0')
      ok = false
    } else if (num > availableNano) {
      setAmountError(`Insufficient balance — you have ${availableNano} NANO`)
      ok = false
    } else {
      setAmountError('')
    }
    if (ok) setStep('confirm')
  }, [destination, amount])

  const handleSend = useCallback(() => {
    setStep('sending')
    // Nano settles sub-second; simulate the round-trip
    setTimeout(() => setStep('success'), 900)
  }, [])

  const destShort = destination.length > 20
    ? `${destination.slice(0, 12)}...${destination.slice(-8)}`
    : destination

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 65% 45% at 50% 25%, rgba(0,102,255,0.07) 0%, transparent 65%)',
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={step === 'confirm' ? () => setStep('form') : onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-display text-xs font-extrabold shrink-0"
            style={{ background: 'rgba(63,231,255,0.15)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.3)' }}
          >
            N
          </div>
          <span className="font-body text-sm font-semibold text-text">
            {step === 'confirm' ? 'Confirm Nano Send' : 'Send to External Nano Wallet'}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* ── FORM STEP ── */}
        {step === 'form' && (
          <>
            {/* Irreversibility warning */}
            <div
              className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
              style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.25)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                <path d="M8 2L1.5 13h13L8 2Z" stroke="#FF4D5A" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M8 6v3.5M8 11v.5" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(255,100,110,0.9)' }}>
                <span className="font-bold">Double-check the address.</span>{' '}
                Blockchain sends are irreversible — there is no way to recover funds sent to a wrong address.
              </p>
            </div>

            {/* Destination address */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Destination Address</p>
                <button
                  onClick={onScanQR}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-full font-body text-xs font-semibold transition-colors"
                  style={{ background: 'rgba(63,231,255,0.08)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.2)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1" />
                    <rect x="7" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1" />
                    <rect x="1" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1" />
                    <path d="M7 7h1.5v1.5H7zM9.5 7v1.5M7 9.5h1.5M9.5 9.5v1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  Scan QR
                </button>
              </div>
              <textarea
                value={destination}
                onChange={e => { setDestination(e.target.value); setAddressError('') }}
                placeholder="nano_1abc..."
                rows={2}
                className="w-full px-4 py-3 rounded-[--radius-xl] font-mono text-xs text-text placeholder-text-muted outline-none resize-none leading-relaxed"
                style={{
                  background: 'rgba(175,197,255,0.04)',
                  border: `1px solid ${addressError ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.15)'}`,
                }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
              />
              {addressError && (
                <p className="font-body text-[10px]" style={{ color: '#FF4D5A' }}>{addressError}</p>
              )}
              {destination && isValidNanoAddress(destination) && (
                <div className="flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <circle cx="5.5" cy="5.5" r="4.5" stroke="#22C55E" strokeWidth="0.9" />
                    <path d="M3 5.5l1.8 1.8 3.2-3.6" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-body text-[10px] text-success">Valid Nano address</p>
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Amount (NANO)</p>
                <button
                  onClick={() => setAmount(String(availableNano))}
                  className="font-body text-xs font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Max: {availableNano} NANO
                </button>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={e => { setAmount(e.target.value); setAmountError('') }}
                  placeholder="0.000000"
                  className="w-full h-14 px-4 pr-20 rounded-[--radius-xl] font-display text-xl font-bold text-text placeholder-text-muted outline-none"
                  style={{
                    background: 'rgba(175,197,255,0.04)',
                    border: `1px solid ${amountError ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.15)'}`,
                  }}
                  min="0"
                  step="0.000001"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm font-semibold"
                  style={{ color: '#3FE7FF' }}
                >
                  NANO
                </span>
              </div>
              {amountError && (
                <p className="font-body text-[10px]" style={{ color: '#FF4D5A' }}>{amountError}</p>
              )}
            </div>

            {/* Fee display */}
            <div
              className="flex items-center justify-between px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.18)' }}
            >
              <div className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="#22C55E" strokeWidth="1" />
                  <path d="M4 6.5l2 2 3-3" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-xs text-text-2">Network fee</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-bold text-success">$0.00</p>
                <p className="font-body text-[9px] text-text-muted">Nano is feeless — this is real, not a promo</p>
              </div>
            </div>

            {/* From address */}
            <div
              className="px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              <p className="font-body text-[10px] text-text-muted mb-1">Sending from</p>
              <p className="font-mono text-xs text-text-2 break-all">{OWN_NANO_ADDRESS}</p>
            </div>

            <button
              onClick={validateAndProceed}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
              style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 24px rgba(0,102,255,0.3)' }}
            >
              Review Send
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* ── CONFIRM STEP ── */}
        {step === 'confirm' && (
          <>
            {/* Summary card */}
            <div
              className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))',
                border: '1px solid rgba(0,102,255,0.2)',
              }}
            >
              <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted">You are sending</p>
              <p
                className="font-display text-4xl font-extrabold tracking-tighter"
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {fmtNano(amount)} NANO
              </p>
              <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid rgba(175,197,255,0.1)' }}>
                {[
                  { label: 'To', value: destShort, mono: true },
                  { label: 'Network fee', value: '$0.00 (feeless)', green: true },
                  { label: 'Network', value: 'Nano Mainnet' },
                  { label: 'Settlement', value: 'Sub-second, irreversible' },
                ].map(row => (
                  <div key={row.label} className="flex items-start justify-between gap-3">
                    <p className="font-body text-xs text-text-muted shrink-0">{row.label}</p>
                    <p
                      className={`text-xs text-right break-all ${row.mono ? 'font-mono' : 'font-body'} ${row.green ? 'text-success font-semibold' : 'text-text-2'}`}
                    >
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full address confirmation */}
            <div
              className="px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(255,77,90,0.05)', border: '1px solid rgba(255,77,90,0.2)' }}
            >
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,100,110,0.7)' }}>
                Verify full destination address
              </p>
              <p className="font-mono text-[10px] text-text-2 break-all leading-relaxed">{destination}</p>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleSend}
                className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 24px rgba(0,102,255,0.3)' }}
              >
                Confirm & Send
              </button>
              <button
                onClick={() => setStep('form')}
                className="w-full h-11 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 transition-all active:scale-[0.98]"
                style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
              >
                Edit
              </button>
            </div>
          </>
        )}

        {/* ── SENDING STEP ── */}
        {step === 'sending' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-16">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(63,231,255,0.1)', border: '2px solid rgba(63,231,255,0.3)' }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-[#3FE7FF]/30 border-t-[#3FE7FF] animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-extrabold text-text">Broadcasting to Nano network</p>
              <p className="font-body text-sm text-text-muted mt-1">Settling in under a second…</p>
            </div>
          </div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === 'success' && (
          <>
            <div
              className="rounded-[--radius-2xl] px-5 py-8 flex flex-col items-center gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))',
                border: '1px solid rgba(34,197,94,0.25)',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center animate-success"
                style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 6 11-10" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-extrabold text-text">{fmtNano(amount)} NANO</p>
                <p className="font-body text-sm text-text-muted mt-1">Sent and confirmed on Nano</p>
              </div>
              <div
                className="w-full px-4 py-3 rounded-[--radius-xl] flex flex-col gap-1"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}
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
                  Verify on NanoLooker
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M4 2H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V6M6 1h3v3M5 5l4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <button
              onClick={onSuccess}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  )
}
