import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'

const NANO_RE = /^nano_[13][13456789abcdefghijkmnopqrstuwxyz]{59}$/

type Step = 'entry' | 'confirm' | 'success'

interface SendNanoExternalProps {
  onBack?: () => void
  onDone?: () => void
  onScanQR?: () => void
}

function fmtNano(val: string) {
  const n = parseFloat(val)
  if (isNaN(n)) return '0'
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 6 })
}

export default function SendNanoExternal({ onBack, onDone, onScanQR }: SendNanoExternalProps) {
  const [step, setStep] = useState<Step>('entry')
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [sending, setSending] = useState(false)

  const isValidAddr = NANO_RE.test(destination.trim())
  const amountNum = parseFloat(amount)
  const isValidAmount = !isNaN(amountNum) && amountNum > 0 && amountNum <= 247.812091
  const canContinue = isValidAddr && isValidAmount

  const handleConfirm = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setStep('success')
    }, 1400)
  }

  const shortAddr = destination.length > 22
    ? `${destination.slice(0, 14)}…${destination.slice(-10)}`
    : destination

  if (step === 'success') {
    return (
      <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
        <AuthHeader title="Send NANO" onBack={onDone} />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.35)', boxShadow: '0 0 32px rgba(34,197,94,0.2)' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l7 7 13-14" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold text-text">Sent!</h2>
            <p className="font-body text-sm text-text-muted mt-1">
              {fmtNano(amount)} XNO sent · settled in &lt;1 second
            </p>
          </div>
          <div
            className="w-full rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-3"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            {[
              { label: 'Amount', value: `${fmtNano(amount)} XNO` },
              { label: 'Network fee', value: '$0.00', green: true },
              { label: 'Destination', value: shortAddr },
              { label: 'Settlement', value: 'Nano network' },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="font-body text-xs text-text-muted">{r.label}</span>
                <span className={`font-mono text-xs font-semibold ${r.green ? 'text-[#22C55E]' : 'text-text'}`}>{r.value}</span>
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={onDone} className="w-full">Done</Button>
        </div>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
        <AuthHeader title="Confirm Send" onBack={() => setStep('entry')} step={2} totalSteps={2} />

        <div className="mt-6 flex flex-col gap-4">
          {/* Amount display */}
          <div
            className="rounded-[--radius-2xl] px-5 py-5 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(0,40,100,0.9) 0%, rgba(13,26,74,0.98) 100%)', border: '1px solid rgba(0,102,255,0.25)' }}
          >
            <p className="font-body text-xs text-text-muted mb-1">You are sending</p>
            <p className="font-display text-4xl font-extrabold text-white">{fmtNano(amount)}</p>
            <p className="font-body text-base text-text-2 mt-0.5">XNO</p>
          </div>

          {/* Details card */}
          <div
            className="rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-4"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            {[
              { label: 'To address', value: shortAddr, mono: true },
              { label: 'Network fee', value: '$0.00 — Nano is feeless', green: true, mono: false },
              { label: 'Settlement', value: 'Sub-second via Nano network', mono: false },
            ].map(r => (
              <div key={r.label} className="flex items-start justify-between gap-4">
                <span className="font-body text-xs text-text-muted shrink-0">{r.label}</span>
                <span className={`text-right text-xs font-semibold ${r.mono ? 'font-mono' : 'font-body'} ${r.green ? 'text-[#22C55E]' : 'text-text'}`}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          {/* Irreversibility warning */}
          <div
            className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-3"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.25)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
              <circle cx="7" cy="7" r="6" stroke="#FF4D5A" strokeWidth="1.2" />
              <path d="M7 4v3.5M7 9v.5" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[11px] text-text-2 leading-relaxed">
              <strong className="text-[#FF4D5A]">Double-check the destination address.</strong> Blockchain sends are irreversible — funds sent to the wrong address cannot be recovered.
            </p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={sending}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: sending ? 'rgba(0,102,255,0.5)' : 'var(--gradient-primary)',
              boxShadow: sending ? 'none' : '0 4px 24px rgba(0,102,255,0.4)',
            }}
          >
            {sending ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11V3l8 8V3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Confirm &amp; Send
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Entry step
  return (
    <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
      <AuthHeader title="Send NANO" onBack={onBack} step={1} totalSteps={2} />

      <div className="mt-6 flex flex-col gap-5">
        {/* Destination address */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-body text-sm font-semibold text-text">Destination address</p>
            <button
              onClick={onScanQR}
              className="flex items-center gap-1 font-body text-xs font-semibold"
              style={{ color: '#3FE7FF' }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1.5" y="1.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
                <rect x="7.5" y="1.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
                <rect x="1.5" y="7.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
                <path d="M7.5 7.5h2v2h-2zM10.5 7.5v2h1.5v-2M7.5 10.5h2M10.5 10.5h1.5v1.5h-3v-1.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Scan QR
            </button>
          </div>
          <textarea
            value={destination}
            onChange={e => setDestination(e.target.value)}
            placeholder="nano_1abc…"
            rows={2}
            className="w-full rounded-[--radius-xl] px-4 py-3 font-mono text-xs text-text-2 resize-none outline-none transition-colors"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: `1px solid ${destination && !isValidAddr ? 'rgba(255,77,90,0.5)' : isValidAddr ? 'rgba(34,197,94,0.4)' : 'rgba(175,197,255,0.15)'}`,
            }}
          />
          {destination && !isValidAddr && (
            <p className="font-body text-[10px] mt-1.5" style={{ color: '#FF4D5A' }}>
              Invalid Nano address — must start with nano_ followed by 60 characters
            </p>
          )}
          {isValidAddr && (
            <p className="font-body text-[10px] mt-1.5" style={{ color: '#22C55E' }}>Valid Nano address</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <p className="font-body text-sm font-semibold text-text mb-2">Amount (XNO)</p>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.000000"
              className="w-full h-14 rounded-[--radius-xl] pl-16 pr-20 font-mono text-xl font-bold text-text outline-none transition-colors"
              style={{
                background: 'rgba(175,197,255,0.05)',
                border: `1px solid ${amount && !isValidAmount ? 'rgba(255,77,90,0.5)' : 'rgba(175,197,255,0.15)'}`,
              }}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-xs font-bold text-text-muted">XNO</span>
            <button
              onClick={() => setAmount('247.812091')}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-7 px-2.5 rounded-full font-body text-[10px] font-semibold"
              style={{ background: 'rgba(63,231,255,0.1)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.2)' }}
            >
              Max
            </button>
          </div>
          {amount && !isValidAmount && amountNum > 247.812091 && (
            <p className="font-body text-[10px] mt-1.5" style={{ color: '#FF4D5A' }}>
              Exceeds available balance (247.812091 XNO)
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <p className="font-body text-[10px] text-text-muted">Available: 247.812091 XNO</p>
            <p className="font-body text-[10px] text-text-muted">Network fee: $0.00</p>
          </div>
        </div>

        {/* Fee highlight */}
        <div
          className="rounded-[--radius-xl] px-4 py-3 flex items-center gap-3"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7V3l10 8V3" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>$0 network fee</p>
            <p className="font-body text-[10px] text-text-muted">Nano is feeless by design — not a promotional offer</p>
          </div>
        </div>

        <button
          onClick={() => setStep('confirm')}
          disabled={!canContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: canContinue ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)',
            color: canContinue ? 'white' : 'rgba(175,197,255,0.3)',
            boxShadow: canContinue ? '0 4px 24px rgba(0,102,255,0.4)' : 'none',
          }}
        >
          Review Send
        </button>
      </div>
    </div>
  )
}
