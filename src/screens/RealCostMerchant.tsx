import { useState } from 'react'

interface RealCostMerchantProps {
  onContinue?: () => void
  onSkip?: () => void
  onBack?: () => void
}

interface Processor {
  id: string
  name: string
  stat: string
  detail: string
  ratePct: number
  flatFee: number
}

const PROCESSORS: Processor[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    stat: '2.9% + $0.30',
    detail: 'per online transaction',
    ratePct: 2.9,
    flatFee: 0.30,
  },
  {
    id: 'square',
    name: 'Square',
    stat: '2.9% + $0.30',
    detail: 'online · 2.6% + $0.15 in-person',
    ratePct: 2.9,
    flatFee: 0.30,
  },
  {
    id: 'paypal-biz',
    name: 'PayPal Business',
    stat: '2.99% + $0.49',
    detail: 'per transaction',
    ratePct: 2.99,
    flatFee: 0.49,
  },
]

const VOLUMES = [1000, 5000, 10000, 25000]

const AVG_TICKET = 50

function estimateTxCount(volume: number) {
  return volume / AVG_TICKET
}

function fmtUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

function fmtVolLabel(v: number) {
  return v >= 1000 ? `$${v / 1000}K` : `$${v}`
}

export default function RealCostMerchant({ onContinue, onSkip, onBack }: RealCostMerchantProps) {
  const [selectedVolume, setSelectedVolume] = useState(5000)
  const [selectedId, setSelectedId] = useState('stripe')

  const processor = PROCESSORS.find(p => p.id === selectedId) ?? PROCESSORS[0]
  const txCount = estimateTxCount(selectedVolume)

  const processorFee = selectedVolume * processor.ratePct / 100 + txCount * processor.flatFee
  const paygoFee = selectedVolume * 1.25 / 100
  const subscriptionFee = 0

  const savingsVsPaygo = processorFee - paygoFee
  const savingsVsSubscription = processorFee - subscriptionFee

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 10% 30%, rgba(255,50,50,0.08) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 90% 35%, rgba(0,102,255,0.10) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
          background: 'linear-gradient(to top, rgba(0,10,40,0.5), transparent)',
        }} />
      </div>

      {/* Back */}
      <div className="relative z-10 px-5 pt-4 shrink-0 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="font-body text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(245,183,0,0.5)' }}>
          Screen 248 · Merchant
        </span>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Headline */}
        <div className="pt-3 flex flex-col gap-1.5">
          <p className="font-display text-[24px] font-extrabold leading-[1.18] tracking-tight text-text">
            Every processor takes its cut before you ever see the money.
          </p>
          <p
            className="font-display text-[24px] font-extrabold leading-[1.18] tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #3FE7FF 0%, #0066FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {"Here's the math."}
          </p>
        </div>

        {/* Processor selector */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Select a processor to compare
          </p>
          {PROCESSORS.map(proc => (
            <button
              key={proc.id}
              onClick={() => setSelectedId(proc.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] transition-all active:scale-[0.99]"
              style={{
                background: selectedId === proc.id ? 'rgba(255,60,60,0.07)' : 'rgba(175,197,255,0.03)',
                border: selectedId === proc.id
                  ? '1px solid rgba(255,80,80,0.28)'
                  : '1px solid rgba(175,197,255,0.08)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-display text-xs font-extrabold text-white"
                style={{ background: 'rgba(255,80,80,0.22)', border: '1px solid rgba(255,80,80,0.18)' }}
              >
                {proc.name[0]}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-body text-sm font-semibold text-text">{proc.name}</p>
                <p className="font-body text-[10px] text-text-muted truncate">{proc.detail}</p>
              </div>
              <p className="font-mono text-xs font-bold shrink-0" style={{ color: 'rgba(255,90,90,0.9)' }}>
                {proc.stat}
              </p>
            </button>
          ))}
        </div>

        {/* Volume calculator */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <div className="px-4 pt-4 pb-3">
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
              Monthly processing volume
            </p>
            <div className="flex gap-2">
              {VOLUMES.map(vol => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  className="flex-1 h-9 rounded-[--radius-xl] font-mono text-xs font-bold transition-all"
                  style={{
                    background: selectedVolume === vol ? 'rgba(0,102,255,0.14)' : 'rgba(175,197,255,0.05)',
                    border: selectedVolume === vol ? '1px solid rgba(0,102,255,0.4)' : '1px solid rgba(175,197,255,0.1)',
                    color: selectedVolume === vol ? '#3FE7FF' : 'rgba(175,197,255,0.55)',
                  }}
                >
                  {fmtVolLabel(vol)}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div className="px-4 pb-4 flex flex-col gap-2">
            {/* Processor row */}
            <div
              className="flex items-center justify-between px-3.5 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(255,50,50,0.07)', border: '1px solid rgba(255,60,60,0.15)' }}
            >
              <div>
                <p className="font-body text-xs font-semibold text-text-muted">{processor.name}</p>
                <p className="font-body text-[9px]" style={{ color: 'rgba(255,90,90,0.5)' }}>
                  Monthly cost on {fmtVolLabel(selectedVolume)}
                </p>
              </div>
              <p
                className="font-mono text-xl font-extrabold"
                style={{ color: 'rgba(255,100,100,0.45)', textDecoration: 'line-through' }}
              >
                {fmtUSD(processorFee)}
              </p>
            </div>

            {/* ChangeAIPay rows */}
            <div
              className="flex items-center justify-between px-3.5 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(0,102,255,0.07)', border: '1px solid rgba(0,102,255,0.22)' }}
            >
              <div>
                <p className="font-body text-xs font-semibold text-text">ChangeAIPay</p>
                <p className="font-body text-[9px] text-text-muted">Pay-as-you-go · 1.25%</p>
              </div>
              <div className="text-right">
                <p
                  className="font-mono text-xl font-extrabold"
                  style={{
                    background: 'linear-gradient(90deg, #3FE7FF 0%, #0066FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {fmtUSD(paygoFee)}
                </p>
                <p className="font-body text-[9px]" style={{ color: '#22C55E' }}>
                  Save {fmtUSD(savingsVsPaygo)} vs {processor.name}
                </p>
              </div>
            </div>

            <div
              className="flex items-center justify-between px-3.5 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(0,102,255,0.04)', border: '1px solid rgba(63,231,255,0.2)' }}
            >
              <div>
                <p className="font-body text-xs font-semibold text-text">ChangeAIPay</p>
                <p className="font-body text-[9px] text-text-muted">Subscribed · 0% platform fee</p>
              </div>
              <div className="text-right">
                <p
                  className="font-mono text-xl font-extrabold"
                  style={{
                    background: 'linear-gradient(90deg, #3FE7FF 0%, #22C55E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 8px rgba(0,102,255,0.4))',
                  }}
                >
                  $0.00
                </p>
                <p className="font-body text-[9px]" style={{ color: '#22C55E' }}>
                  Save {fmtUSD(savingsVsSubscription)} vs {processor.name}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription note */}
          <div
            className="mx-4 mb-4 px-3 py-2.5 rounded-[--radius-xl]"
            style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.15)' }}
          >
            <p className="font-body text-[10px] text-text-muted leading-relaxed">
              <span className="font-semibold text-text">0% platform fee</span>
              {" is ChangeAIPay's own fee only. Third-party processor costs, FX spreads, refunds, and chargebacks are separate pass-through costs where applicable."}
            </p>
          </div>
        </div>

        {/* Transparent both-rates note */}
        <div
          className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 2v4M7 8.5v.5" stroke="rgba(63,231,255,0.7)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="7" r="5.5" stroke="rgba(63,231,255,0.4)" strokeWidth="1.1" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Pay-as-you-go (1.25%) beats all three processors even before you subscribe. Subscription tiers start at $99/month and scale with your volume.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="font-body text-[9px] leading-relaxed" style={{ color: 'rgba(175,197,255,0.28)' }}>
          Comparison based on publicly available processor fee schedules as of 2026. Rates vary by transaction type, volume, and account terms.
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-5 pb-10 pt-2 shrink-0">
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: 'var(--gradient-primary)',
            boxShadow: '0 4px 24px rgba(0,102,255,0.32)',
          }}
        >
          {"Let's get your business set up"}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={onSkip ?? onContinue} className="w-full mt-3 font-body text-xs text-text-muted text-center active:opacity-70 py-2">
          Skip for now →
        </button>
      </div>
    </div>
  )
}
