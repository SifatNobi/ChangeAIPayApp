import { useState, useEffect } from 'react'
import Pulse from '@/components/Pulse'

interface CryptoWithdrawProps {
  symbol?: string
  name?: string
  color?: string
  availableCrypto?: number
  onDone?: () => void
  onBack?: () => void
}

type Step = 'form' | 'auth' | 'processing' | 'success'

const NETWORKS: { id: string; label: string; fee: string; feeUSD: string; time: string }[] = [
  { id: 'eth',  label: 'Ethereum (ERC-20)', fee: '~0.0008 ETH', feeUSD: '~$2.63', time: '~2–5 min' },
  { id: 'base', label: 'Base',              fee: '~0.0001 ETH', feeUSD: '~$0.33', time: '~10 sec'  },
  { id: 'arb',  label: 'Arbitrum',          fee: '~0.0002 ETH', feeUSD: '~$0.66', time: '~1–2 min' },
]

function ProcessingView({ symbol, onComplete }: { symbol: string; onComplete: () => void }) {
  const steps = ['Validating address', 'Authorising withdrawal', 'Broadcasting to network']
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    let i = 0
    const adv = () => {
      if (i < steps.length - 1) { i++; setIdx(i); setTimeout(adv, 900) }
      else setTimeout(onComplete, 700)
    }
    const t = setTimeout(adv, 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6 flex-1 px-5">
      <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" className="absolute" style={{ animation: 'spin 1.1s linear infinite' }}>
          <circle cx="40" cy="40" r="36" stroke="rgba(175,197,255,0.08)" strokeWidth="3" fill="none" />
          <circle cx="40" cy="40" r="36" stroke="url(#wGrad)" strokeWidth="3" fill="none" strokeDasharray="55 170" strokeLinecap="round" />
          <defs>
            <linearGradient id="wGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0066FF" /><stop offset="100%" stopColor="#3FE7FF" />
            </linearGradient>
          </defs>
        </svg>
        <p className="font-display text-sm font-extrabold" style={{ color: 'rgba(175,197,255,0.6)' }}>{symbol}</p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[280px]">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: i < idx ? 'rgba(34,197,94,0.15)' : i === idx ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.05)', border: `1px solid ${i < idx ? 'rgba(34,197,94,0.3)' : i === idx ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}` }}>
              {i < idx
                ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2.5 4-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" /></svg>
                : i === idx
                  ? <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" style={{ animation: 'pulse 1s ease-in-out infinite' }} />
                  : <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
              }
            </div>
            <p className="font-body text-sm" style={{ color: i <= idx ? (i < idx ? '#22C55E' : '#AFC5FF') : 'rgba(175,197,255,0.3)', fontWeight: i === idx ? 600 : 400 }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BiometricAuthOverlay({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [scanning, setScanning] = useState(false)

  const handleTap = () => {
    if (scanning) return
    setScanning(true)
    setTimeout(() => { setScanning(false); onConfirm() }, 1100)
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 px-5"
      style={{ background: 'rgba(7,11,30,0.88)', backdropFilter: 'blur(12px)' }}>
      <div
        className="w-full rounded-[--radius-2xl] px-6 py-6 flex flex-col items-center gap-5"
        style={{ background: 'rgba(13,26,74,0.98)', border: '1px solid rgba(175,197,255,0.15)' }}
      >
        <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
        <p className="font-display text-base font-extrabold text-text">Confirm Withdrawal</p>
        <p className="font-body text-sm text-text-muted text-center">
          Authenticate to authorise this crypto transfer. This action cannot be undone.
        </p>

        {/* Fingerprint button */}
        <button
          onClick={handleTap}
          className="w-20 h-20 rounded-[--radius-2xl] flex items-center justify-center transition-all duration-[300ms]"
          style={{
            background: scanning ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.06)',
            border: `2px solid ${scanning ? 'rgba(0,102,255,0.5)' : 'rgba(175,197,255,0.15)'}`,
            boxShadow: scanning ? '0 0 24px rgba(0,102,255,0.25)' : 'none',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M12 18c0-3.3 2.7-6 6-6s6 2.7 6 6c0 2 0 7-6 7" stroke={scanning ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 8a10 10 0 0 1 10 10c0 5 0 8-2 10" stroke={scanning ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 18c0-5.5 4.5-10 10-10" stroke={scanning ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 28c-3 0-6-1.5-8-4" stroke={scanning ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 14v4" stroke={scanning ? '#3FE7FF' : 'rgba(175,197,255,0.3)'} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <p className="font-body text-xs text-text-muted">
          {scanning ? 'Scanning…' : 'Tap to authenticate with Face ID / fingerprint'}
        </p>
        <p className="font-body text-xs text-text-muted opacity-60">Or use PIN instead</p>

        <button
          onClick={onCancel}
          className="w-full h-11 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-muted flex items-center justify-center transition-all duration-[180ms]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function CryptoWithdraw({
  symbol = 'ETH', name = 'Ethereum', color = '#627EEA',
  availableCrypto = 0.45, onDone, onBack,
}: CryptoWithdrawProps) {
  const [step, setStep] = useState<Step>('form')
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [network, setNetwork] = useState(NETWORKS[0])
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)

  const amountNum = parseFloat(amount) || 0
  const isFormValid = address.trim().length >= 20 && amountNum > 0 && amountNum <= availableCrypto

  // Success state animation — Pulse fires at 120ms (sending-value family)
  useEffect(() => {
    if (step !== 'success') return
    const t1 = setTimeout(() => { setCircleScale(1); setPulseTrigger(true) }, 120)
    const t2 = setTimeout(() => setCheckVisible(true), 480)
    const t3 = setTimeout(() => setDetailVisible(true), 760)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [step])

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center bg-bg" style={{ minHeight: 785 }}>
        <div className="absolute inset-x-0 top-24 flex items-center justify-center pointer-events-none z-0">
          <Pulse trigger={pulseTrigger} width={320} height={50} color="#3FE7FF" />
        </div>
        <div className="relative z-10 flex flex-col items-center px-5 pt-16 pb-8 w-full flex-1">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-[500ms]"
            style={{
              transform: `scale(${circleScale})`,
              background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
              boxShadow: circleScale === 1 ? `0 0 0 16px ${color}14, 0 0 0 32px ${color}08` : 'none',
            }}
          >
            {checkVisible && (
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-fade-in">
                <path d="M8 20l8 9 16-18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray: 42, strokeDashoffset: 0, animation: 'dash-in 0.4s ease forwards' }} />
              </svg>
            )}
          </div>
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-1">Withdrawal Sent!</h1>
          <p className="font-body text-sm text-text-muted mb-6 text-center">
            {amountNum} {symbol} broadcast to the {network.label.split(' ')[0]} network
          </p>
          {detailVisible && (
            <div className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-2.5 animate-fade-in mb-6"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}>
              {[
                { label: 'Amount',    value: `${amountNum} ${symbol}` },
                { label: 'Network',   value: network.label },
                { label: 'Network fee',value: `${network.fee} (${network.feeUSD})` },
                { label: 'Est. arrival',value: network.time },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <p className="font-body text-xs text-text-muted">{r.label}</p>
                  <p className="font-mono text-xs text-text-2">{r.value}</p>
                </div>
              ))}
              <div className="pt-2 border-t border-[color:var(--color-border)]">
                <p className="font-body text-[10px] text-text-muted break-all">To: {address.slice(0, 18)}…{address.slice(-6)}</p>
              </div>
            </div>
          )}
          <div className="flex-1" />
          {detailVisible && (
            <button onClick={onDone}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center animate-fade-in transition-all duration-[200ms] active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}>
              Done
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Biometric overlay */}
      {step === 'auth' && (
        <BiometricAuthOverlay
          onConfirm={() => setStep('processing')}
          onCancel={() => setStep('form')}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button
          onClick={step === 'processing' ? undefined : onBack}
          disabled={step === 'processing'}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0 disabled:opacity-30"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Withdraw {symbol}</p>
      </div>

      {step === 'processing' ? (
        <ProcessingView symbol={symbol} onComplete={() => setStep('success')} />
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
          {/* Destination address */}
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Destination Address</p>
            <div
              className="flex items-center gap-2 px-3.5 py-3 rounded-[--radius-2xl]"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.13)' }}
            >
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder={`Paste ${symbol} address…`}
                className="flex-1 bg-transparent font-mono text-xs text-text placeholder:text-text-muted outline-none"
              />
              {/* Paste */}
              <button
                onClick={() => setAddress('0x742d35Cc6634C0532925a3b8D4d90b1f5c3A1234')}
                className="h-8 px-2.5 rounded-full font-body text-xs font-semibold text-text-muted flex items-center gap-1 transition-all hover:text-text"
                style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1" />
                  <path d="M1 8V2a1 1 0 0 1 1-1h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                Paste
              </button>
              {/* Scan QR */}
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
                aria-label="Scan QR"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="rgba(175,197,255,0.5)" strokeWidth="1" />
                  <rect x="9" y="1" width="4" height="4" rx="0.8" stroke="rgba(175,197,255,0.5)" strokeWidth="1" />
                  <rect x="1" y="9" width="4" height="4" rx="0.8" stroke="rgba(175,197,255,0.5)" strokeWidth="1" />
                  <path d="M9 9h2v2M11 9v2h2M9 11h2" stroke="rgba(175,197,255,0.5)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Amount</p>
            <div
              className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
              style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.18)' }}
            >
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0"
                  className="flex-1 bg-transparent font-display text-3xl font-extrabold outline-none placeholder:text-text-muted"
                  style={{ color: amountNum > availableCrypto ? '#FF4D5A' : '#AFC5FF' }}
                />
                <span className="font-display text-xl font-extrabold text-text-muted">{symbol}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-body text-xs text-text-muted">Available: {availableCrypto} {symbol}</p>
                <button
                  onClick={() => setAmount(availableCrypto.toString())}
                  className="h-6 px-2 rounded-full font-body text-[10px] font-semibold"
                  style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)', color: '#AFC5FF' }}
                >
                  Max
                </button>
              </div>
            </div>
          </div>

          {/* Network selector */}
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Network</p>
            <div className="flex flex-col gap-2">
              {NETWORKS.map(net => (
                <button
                  key={net.id}
                  onClick={() => setNetwork(net)}
                  className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] transition-all duration-[180ms]"
                  style={{
                    background: network.id === net.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)',
                    border: `1px solid ${network.id === net.id ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                  }}
                >
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: network.id === net.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}>
                    {network.id === net.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-body text-sm font-semibold text-text">{net.label}</p>
                    <p className="font-body text-xs text-text-muted">{net.time}</p>
                  </div>
                  <p className="font-body text-xs text-text-muted">{net.feeUSD}</p>
                </button>
              ))}
            </div>
          </div>

          {/* External network fee disclosure */}
          <div
            className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
            style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
              <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1.2" />
              <path d="M7 5v3M7 9.5v.5" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-body text-xs font-semibold text-[#3FE7FF] mb-1">Network fee: {network.fee} ({network.feeUSD})</p>
              <p className="font-body text-[10px] text-text-muted leading-relaxed">
                ChangeAIPay charges <strong className="text-text-2">no fee</strong> for withdrawals. The <strong className="text-text-2">{network.label.split(' ')[0]} network</strong> fee above is paid directly to the blockchain — separate from and unrelated to ChangeAIPay's own zero-fee promise.
              </p>
            </div>
          </div>

          {/* Irreversibility warning */}
          <div
            className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)' }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5 shrink-0">
              <path d="M7.5 1L14 13H1L7.5 1Z" stroke="#FF4D5A" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M7.5 6v3M7.5 10.5v.5" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-body text-xs font-semibold text-[#FF4D5A] mb-1">Double-check the destination address</p>
              <p className="font-body text-[10px] text-text-muted leading-relaxed">
                Crypto transfers are <strong className="text-text-2">irreversible</strong>. Once sent, funds cannot be recalled if the address is wrong or belongs to someone else. Verify the address before confirming.
              </p>
            </div>
          </div>

          {/* Biometric note */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 7.5c-.8-1 0-3 0-3M7 4.5c2 0 3.5 1 3.5 3.5 0 1.5 0 3.5-3.5 3.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M3.5 8c0-2 1.5-4 3.5-4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M1.5 7c0-3 2.5-5.5 5.5-5.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M7 11.5c-2 0-3-1-4-2.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <p className="font-body text-xs text-text-muted">
              Face ID / fingerprint or PIN required to authorise withdrawal
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => setStep('auth')}
            disabled={!isFormValid}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-35"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v7M4.5 6.5L7 9l2.5-2.5M2 12h10" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Continue to Authenticate
          </button>
        </div>
      )}
    </div>
  )
}
