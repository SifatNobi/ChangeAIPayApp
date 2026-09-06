import { useState } from 'react'

interface RemittanceCostProps {
  onContinue?: () => void
  onBack?: () => void
}

interface Provider {
  id: string
  name: string
  type: string
  ratePct: number
  flatFee: number
  rateLabel: string
  detail: string
  color: string
  honest?: boolean
}

const PROVIDERS: Provider[] = [
  {
    id: 'bank',
    name: 'Bank Wire',
    type: 'Traditional',
    ratePct: 2.5,
    flatFee: 45,
    rateLabel: '~$45 flat + 2–3% FX markup',
    detail: 'Hidden exchange-rate spread on top of the flat fee',
    color: '#6B84C4',
  },
  {
    id: 'wu',
    name: 'Western Union',
    type: 'Remittance',
    ratePct: 3.5,
    flatFee: 0,
    rateLabel: '3–4%+ all-in on most corridors',
    detail: 'Varies heavily by corridor, amount, and delivery method',
    color: '#F5B700',
  },
  {
    id: 'mg',
    name: 'MoneyGram',
    type: 'Remittance',
    ratePct: 2.5,
    flatFee: 8,
    rateLabel: '2%+ FX markup + up to $16 fee',
    detail: 'Fee depends on payment method; FX spread adds to total cost',
    color: '#FF6B35',
  },
  {
    id: 'wise',
    name: 'Wise',
    type: 'Fintech',
    ratePct: 0.43,
    flatFee: 0,
    rateLabel: 'From ~0.43% on some corridors',
    detail: 'Genuinely competitive — mid-market rate, transparent fees',
    color: '#00B9A5',
    honest: true,
  },
  {
    id: 'change',
    name: 'ChangeAIPay',
    type: 'Our rate',
    ratePct: 1.45,
    flatFee: 0,
    rateLabel: '~1.45% baseline · lower on paid tiers',
    detail: 'Clear advantage vs. banks, Western Union & MoneyGram',
    color: '#3FE7FF',
  },
]

const AMOUNTS = [200, 500, 1000, 2000]
const FREQUENCIES = [
  { id: 'monthly', label: 'Monthly', times: 12 },
  { id: 'biweekly', label: 'Bi-weekly', times: 26 },
  { id: 'weekly', label: 'Weekly', times: 52 },
]

function fmtUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function calcAnnualFee(p: Provider, amount: number, times: number) {
  const perSend = amount * p.ratePct / 100 + p.flatFee
  return perSend * times
}

export default function RemittanceCost({ onContinue, onBack }: RemittanceCostProps) {
  const [amount, setAmount] = useState(500)
  const [freqId, setFreqId] = useState('monthly')

  const freq = FREQUENCIES.find(f => f.id === freqId) ?? FREQUENCIES[0]
  const changeProvider = PROVIDERS.find(p => p.id === 'change')!
  const ourAnnual = calcAnnualFee(changeProvider, amount, freq.times)

  // Best competitor saving (vs WU or bank, not Wise)
  const mainCompetitors = PROVIDERS.filter(p => p.id !== 'change' && p.id !== 'wise')
  const worstAnnual = Math.max(...mainCompetitors.map(p => calcAnnualFee(p, amount, freq.times)))
  const maxSaving = worstAnnual - ourAnnual

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 65% 50% at 20% 30%, rgba(63,231,255,0.07) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 45% at 80% 60%, rgba(0,102,255,0.08) 0%, transparent 65%)',
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
        <span className="font-body text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(63,231,255,0.45)' }}>
          Screen 249 · Remittance
        </span>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Headline */}
        <div className="pt-3 flex flex-col gap-2">
          <p className="font-display text-[24px] font-extrabold leading-[1.2] tracking-tight text-text">
            Sending money to family abroad?
          </p>
          <p
            className="font-display text-[24px] font-extrabold leading-[1.2] tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #3FE7FF 0%, #0066FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Here's what it's really costing you.
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed mt-1">
            Most people still use banks, Western Union, or MoneyGram. The fees are real — and they add up fast.
          </p>
        </div>

        {/* Interactive calculator */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <div className="px-4 pt-4 pb-3 flex flex-col gap-3">
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              How much do you send?
            </p>
            <div className="flex gap-2">
              {AMOUNTS.map(amt => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="flex-1 h-9 rounded-[--radius-xl] font-mono text-xs font-bold transition-all"
                  style={{
                    background: amount === amt ? 'rgba(0,102,255,0.14)' : 'rgba(175,197,255,0.05)',
                    border: amount === amt ? '1px solid rgba(0,102,255,0.4)' : '1px solid rgba(175,197,255,0.1)',
                    color: amount === amt ? '#3FE7FF' : 'rgba(175,197,255,0.55)',
                  }}
                >
                  {amt >= 1000 ? `$${amt / 1000}K` : `$${amt}`}
                </button>
              ))}
            </div>

            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              How often?
            </p>
            <div className="flex gap-2">
              {FREQUENCIES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFreqId(f.id)}
                  className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                  style={{
                    background: freqId === f.id ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.05)',
                    border: freqId === f.id ? '1px solid rgba(63,231,255,0.35)' : '1px solid rgba(175,197,255,0.1)',
                    color: freqId === f.id ? '#3FE7FF' : 'rgba(175,197,255,0.55)',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Annual savings callout */}
          {maxSaving > 0 && (
            <div
              className="mx-4 mb-4 px-4 py-3 rounded-[--radius-xl] text-center"
              style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <p className="font-body text-[10px] text-text-muted mb-1">
                vs. bank wire or Western Union, you could save
              </p>
              <p
                className="font-display text-3xl font-extrabold"
                style={{ color: '#22C55E', filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.4))' }}
              >
                {fmtUSD(maxSaving)}/yr
              </p>
              <p className="font-body text-[10px] text-text-muted mt-1">
                sending {fmtUSD(amount)} {freq.label.toLowerCase()}
              </p>
            </div>
          )}
        </div>

        {/* Provider comparison table */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Annual cost comparison
          </p>
          {PROVIDERS.map(p => {
            const annual = calcAnnualFee(p, amount, freq.times)
            const isUs = p.id === 'change'
            const isWise = p.id === 'wise'
            const saving = annual - ourAnnual

            return (
              <div
                key={p.id}
                className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] transition-all"
                style={{
                  background: isUs
                    ? 'rgba(0,102,255,0.09)'
                    : isWise
                    ? 'rgba(0,185,165,0.06)'
                    : 'rgba(175,197,255,0.03)',
                  border: isUs
                    ? '1px solid rgba(63,231,255,0.3)'
                    : isWise
                    ? '1px solid rgba(0,185,165,0.2)'
                    : '1px solid rgba(175,197,255,0.08)',
                }}
              >
                {/* Color dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: p.color, boxShadow: `0 0 6px ${p.color}60` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-body text-sm font-semibold text-text">{p.name}</p>
                    {isUs && (
                      <span
                        className="px-1.5 py-0.5 rounded-full font-body text-[9px] font-bold"
                        style={{ background: 'rgba(63,231,255,0.15)', color: '#3FE7FF' }}
                      >
                        US
                      </span>
                    )}
                    {isWise && (
                      <span
                        className="px-1.5 py-0.5 rounded-full font-body text-[9px] font-bold"
                        style={{ background: 'rgba(0,185,165,0.15)', color: '#00B9A5' }}
                      >
                        Competitive
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[10px] text-text-muted truncate">{p.rateLabel}</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="font-mono text-sm font-bold"
                    style={{
                      color: isUs ? '#3FE7FF' : isWise ? '#00B9A5' : 'rgba(255,100,100,0.8)',
                    }}
                  >
                    {fmtUSD(annual)}/yr
                  </p>
                  {!isUs && saving > 0 && (
                    <p className="font-body text-[9px]" style={{ color: '#22C55E' }}>
                      save {fmtUSD(saving)}
                    </p>
                  )}
                  {!isUs && saving <= 0 && (
                    <p className="font-body text-[9px]" style={{ color: 'rgba(175,197,255,0.35)' }}>
                      similar
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Honest note about Wise */}
        <div
          className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(0,185,165,0.05)', border: '1px solid rgba(0,185,165,0.15)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 2v4M7 8.5v.5" stroke="rgba(0,185,165,0.7)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="7" r="5.5" stroke="rgba(0,185,165,0.4)" strokeWidth="1.1" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            <span style={{ color: '#00B9A5' }}>Wise is genuinely competitive</span> on many corridors — we're not dismissing them. Our clear advantage is against banks, Western Union, and MoneyGram, which is how most people actually send remittances today.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="font-body text-[9px] leading-relaxed" style={{ color: 'rgba(175,197,255,0.28)' }}>
          Estimates based on publicly available provider rate data as of 2026. Actual costs vary by corridor, amount, and payment method. ChangeAIPay baseline rate of ~1.45% applies to standard tier; paid tiers offer lower rates.
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
          Create my account
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
