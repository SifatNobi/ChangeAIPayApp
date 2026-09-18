import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import logoSrc from '@/imports/logo.png.jpeg'

interface RemittanceCostProps {
  onContinue?: () => void
  onSkip?: () => void
  onBack?: () => void
}

const PROVIDERS = [
  {
    name: 'Bank Wire',
    fee: '~$45 flat',
    fxMarkup: '2–4%',
    speed: '3–5 days',
    total100k: '$2,045–$4,045',
    color: '#94A3B8',
    bg: 'rgba(148,163,184,0.08)',
    border: 'rgba(148,163,184,0.15)',
  },
  {
    name: 'Western Union',
    fee: 'Varies',
    fxMarkup: '3–4%',
    speed: '1–3 days',
    total100k: '$3,000–$4,000',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.18)',
  },
  {
    name: 'MoneyGram',
    fee: '+fees',
    fxMarkup: '2–3%',
    speed: '1–2 days',
    total100k: '$2,000–$3,000',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.18)',
  },
  {
    name: 'Wise',
    fee: 'Tiered',
    fxMarkup: '~0.43%',
    speed: 'Same day',
    total100k: '~$430',
    color: '#34D399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.18)',
  },
  {
    name: 'ChangeAIPay',
    fee: '0% platform fee*',
    fxMarkup: '~1.45% FX spread',
    speed: 'Instant–2 hrs',
    total100k: '~$1,450',
    color: '#3FE7FF',
    bg: 'rgba(0,102,255,0.1)',
    border: 'rgba(63,231,255,0.3)',
    highlight: true,
  },
]

const FREQUENCIES = [
  { id: 'once', label: 'Once' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'weekly', label: 'Weekly' },
]

const AMOUNTS = [500, 1000, 2500, 5000, 10000]

export default function RemittanceCost({ onContinue, onSkip, onBack }: RemittanceCostProps) {
  const [amount, setAmount] = useState(1000)
  const [freq, setFreq] = useState<'once' | 'monthly' | 'weekly'>('monthly')

  const perTx = amount * 0.0145
  const perTxWire = amount * 0.03 + 45
  const perTxWU = amount * 0.035

  const multiplier = freq === 'weekly' ? 52 : freq === 'monthly' ? 12 : 1
  const annualChangeAI = perTx * multiplier
  const annualWire = perTxWire * multiplier
  const annualWU = perTxWU * multiplier
  const savings = Math.round(((annualWire + annualWU) / 2) - annualChangeAI)

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
      <AuthHeader onBack={onBack} />

      {/* Hero */}
      <div className="mt-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0" style={{ border: '1px solid rgba(63,231,255,0.3)' }}>
            <img src={logoSrc} alt="ChangeAIPay" className="w-full h-full object-cover" />
          </div>
          <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: '#3FE7FF' }}>
            Screen 249 · Remittance
          </span>
        </div>
        <h1 className="font-display text-2xl font-extrabold text-text leading-tight">
          Stop paying too much<br />to send money abroad
        </h1>
        <p className="font-body text-sm text-text-2 mt-2 leading-relaxed">
          Traditional transfers quietly drain hundreds in hidden markups every year. Here is what the market actually charges.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-6 flex flex-col gap-2.5">
        <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
          Cost per $1,000 sent
        </p>
        {PROVIDERS.map(p => (
          <div
            key={p.name}
            className="rounded-[--radius-xl] px-4 py-3"
            style={{
              background: p.highlight
                ? 'linear-gradient(135deg, rgba(0,40,100,0.9) 0%, rgba(13,26,74,0.98) 100%)'
                : p.bg,
              border: `1px solid ${p.border}`,
              boxShadow: p.highlight ? '0 0 24px rgba(0,102,255,0.2)' : 'none',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {p.highlight && (
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <img src={logoSrc} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <span
                  className="font-display text-sm font-bold"
                  style={{ color: p.highlight ? '#fff' : p.color }}
                >
                  {p.name}
                </span>
                {p.highlight && (
                  <span
                    className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(63,231,255,0.15)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.3)' }}
                  >
                    Best value
                  </span>
                )}
              </div>
              <span
                className="font-mono text-xs font-bold"
                style={{ color: p.highlight ? '#3FE7FF' : p.color }}
              >
                {p.total100k}
              </span>
            </div>
            <div className="flex gap-4">
              {[
                { label: 'Flat fee', val: p.fee },
                { label: 'FX markup', val: p.fxMarkup },
                { label: 'Speed', val: p.speed },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-body text-[9px] text-text-muted uppercase tracking-wider">{item.label}</span>
                  <span className="font-body text-[11px] font-medium" style={{ color: p.highlight ? 'rgba(175,197,255,0.85)' : 'rgba(175,197,255,0.6)' }}>
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Savings calculator */}
      <div
        className="rounded-[--radius-2xl] px-5 py-5 mb-6"
        style={{
          background: 'rgba(175,197,255,0.03)',
          border: '1px solid rgba(175,197,255,0.1)',
        }}
      >
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
          Your annual savings calculator
        </p>

        {/* Amount selector */}
        <p className="font-body text-[10px] text-text-muted mb-2">Transfer amount</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {AMOUNTS.map(a => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
              style={{
                background: amount === a ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.07)',
                color: amount === a ? '#fff' : 'rgba(175,197,255,0.6)',
                border: `1px solid ${amount === a ? 'transparent' : 'rgba(175,197,255,0.12)'}`,
              }}
            >
              {a >= 1000 ? `$${a / 1000}k` : `$${a}`}
            </button>
          ))}
        </div>

        {/* Frequency selector */}
        <p className="font-body text-[10px] text-text-muted mb-2">Frequency</p>
        <div className="flex gap-2 mb-5">
          {FREQUENCIES.map(f => (
            <button
              key={f.id}
              onClick={() => setFreq(f.id as typeof freq)}
              className="flex-1 h-9 rounded-[--radius-lg] font-body text-xs font-semibold transition-all"
              style={{
                background: freq === f.id ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.05)',
                color: freq === f.id ? '#AFC5FF' : 'rgba(175,197,255,0.4)',
                border: `1px solid ${freq === f.id ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.08)'}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Result */}
        <div
          className="rounded-[--radius-xl] px-4 py-4"
          style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(63,231,255,0.08) 100%)', border: '1px solid rgba(63,231,255,0.2)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">Avg competitor cost</p>
              <p className="font-mono text-lg font-bold text-text-2 line-through opacity-50">
                {fmt((annualWire + annualWU) / 2)}/yr
              </p>
            </div>
            <div className="text-right">
              <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">ChangeAIPay</p>
              <p className="font-mono text-lg font-bold" style={{ color: '#3FE7FF' }}>
                {fmt(annualChangeAI)}/yr
              </p>
            </div>
          </div>
          <div
            className="rounded-[--radius-lg] px-4 py-3 text-center"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
          >
            <p className="font-body text-[10px] text-text-muted uppercase tracking-wider mb-0.5">You save approximately</p>
            <p className="font-display text-2xl font-extrabold" style={{ color: '#22C55E' }}>
              {savings > 0 ? fmt(savings) : '$0'}
            </p>
            <p className="font-body text-[10px] text-text-muted mt-0.5">
              per year{freq !== 'once' ? ` (${freq} transfers)` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="font-body text-[10px] text-text-muted leading-relaxed mb-6 px-1">
        * The 0% platform fee applies to ChangeAIPay&apos;s own platform fee only. Third-party processor costs, payment-network fees, refunds, and chargebacks remain separate pass-through costs where applicable. FX spread of ~1.45% is indicative; actual rates vary by corridor and market conditions. Competitor fees are estimates based on publicly available data and may vary.
      </p>

      <Button variant="primary" onClick={onContinue}>
        Create my account →
      </Button>
      <button onClick={onSkip ?? onContinue} className="w-full mt-3 font-body text-xs text-text-muted text-center active:opacity-70 py-2">
        Skip for now →
      </button>
    </div>
  )
}
