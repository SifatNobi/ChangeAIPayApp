import { useState } from 'react'

interface RealCostConsumerProps {
  onContinue?: () => void
  onSkip?: () => void
  onBack?: () => void
}

interface Competitor {
  id: string
  name: string
  stat: string
  detail: string
  ratePct: number
  flatFee: number
}

const COMPETITORS: Competitor[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    stat: 'Up to 3.49%',
    detail: '+ fees on international or card-funded sends',
    ratePct: 3.49,
    flatFee: 0,
  },
  {
    id: 'venmo',
    name: 'Venmo',
    stat: '1.75%',
    detail: 'instant cash-out · 3% on credit card sends',
    ratePct: 1.75,
    flatFee: 0,
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    stat: '0.5–1.75%',
    detail: 'instant transfer · 3% on credit card sends',
    ratePct: 1.75,
    flatFee: 0,
  },
  {
    id: 'rizon',
    name: 'Rizon',
    stat: 'Free*',
    detail: '*Network & conversion fees when moving off-app',
    ratePct: 0,
    flatFee: 0,
  },
]

const AMOUNTS = [100, 500, 1000, 5000]

function fmtUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

export default function RealCostConsumer({ onContinue, onSkip, onBack }: RealCostConsumerProps) {
  const [selectedAmount, setSelectedAmount] = useState(500)
  const [selectedId, setSelectedId] = useState('paypal')

  const selected = COMPETITORS.find(c => c.id === selectedId) ?? COMPETITORS[0]
  const compFee = selectedAmount * selected.ratePct / 100 + selected.flatFee
  const ourFee = 0

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Confrontational ambient — red left, blue right */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 15% 35%, rgba(255,50,50,0.09) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 85% 40%, rgba(0,102,255,0.10) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
          background: 'linear-gradient(to top, rgba(0,10,40,0.6), transparent)',
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
        <span className="font-body text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,100,100,0.55)' }}>
          Screen 247 · Consumer
        </span>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Headline */}
        <div className="pt-3 flex flex-col gap-1.5">
          <p className="font-display text-[26px] font-extrabold leading-[1.15] tracking-tight text-text">
            Other apps take a cut every time you move your money.
          </p>
          <p
            className="font-display text-[26px] font-extrabold leading-[1.15] tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #3FE7FF 0%, #0066FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            We don't.
          </p>
        </div>

        {/* Competitor selector */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">Select a competitor to compare</p>
          {COMPETITORS.map(comp => (
            <button
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] transition-all active:scale-[0.99]"
              style={{
                background: selectedId === comp.id
                  ? 'rgba(255,60,60,0.07)'
                  : 'rgba(175,197,255,0.03)',
                border: selectedId === comp.id
                  ? '1px solid rgba(255,80,80,0.28)'
                  : '1px solid rgba(175,197,255,0.08)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-display text-xs font-extrabold text-white"
                style={{ background: 'rgba(255,80,80,0.25)', border: '1px solid rgba(255,80,80,0.2)' }}
              >
                {comp.name[0]}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-body text-sm font-semibold text-text">{comp.name}</p>
                <p className="font-body text-[10px] text-text-muted truncate">{comp.detail}</p>
              </div>
              <p className="font-mono text-sm font-bold shrink-0" style={{ color: 'rgba(255,90,90,0.9)' }}>
                {comp.stat}
              </p>
            </button>
          ))}
        </div>

        {/* Calculator */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <div className="px-4 pt-4 pb-3">
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
              How much are you sending?
            </p>
            <div className="flex gap-2">
              {AMOUNTS.map(amt => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className="flex-1 h-9 rounded-[--radius-xl] font-mono text-xs font-bold transition-all"
                  style={{
                    background: selectedAmount === amt ? 'rgba(0,102,255,0.14)' : 'rgba(175,197,255,0.05)',
                    border: selectedAmount === amt ? '1px solid rgba(0,102,255,0.4)' : '1px solid rgba(175,197,255,0.1)',
                    color: selectedAmount === amt ? '#3FE7FF' : 'rgba(175,197,255,0.55)',
                  }}
                >
                  {amt >= 1000 ? `$${amt / 1000}K` : `$${amt}`}
                </button>
              ))}
            </div>
          </div>

          {/* Them vs Us comparison */}
          <div className="px-4 pb-4 flex items-stretch gap-2">
            {/* Competitor */}
            <div
              className="flex-1 rounded-[--radius-xl] px-3 py-3 flex flex-col gap-1"
              style={{ background: 'rgba(255,50,50,0.07)', border: '1px solid rgba(255,60,60,0.18)' }}
            >
              <p className="font-body text-[10px] text-text-muted">{selected.name} takes</p>
              <p
                className="font-mono text-2xl font-extrabold"
                style={{
                  color: compFee > 0 ? 'rgba(255,100,100,0.45)' : 'rgba(175,197,255,0.25)',
                  textDecoration: compFee > 0 ? 'line-through' : 'none',
                }}
              >
                {fmtUSD(compFee)}
              </p>
              <p className="font-body text-[9px]" style={{ color: 'rgba(255,90,90,0.5)' }}>
                {compFee > 0 ? "you never see this" : "free between users"}
              </p>
            </div>

            {/* VS */}
            <div className="flex items-center justify-center shrink-0 w-8">
              <p className="font-display text-[10px] font-extrabold" style={{ color: 'rgba(175,197,255,0.3)' }}>VS</p>
            </div>

            {/* ChangeAIPay */}
            <div
              className="flex-1 rounded-[--radius-xl] px-3 py-3 flex flex-col gap-1"
              style={{ background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.28)' }}
            >
              <p className="font-body text-[10px] text-text-muted">ChangeAIPay</p>
              <p
                className="font-mono text-2xl font-extrabold"
                style={{
                  background: 'linear-gradient(90deg, #3FE7FF 0%, #0066FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 6px rgba(0,102,255,0.5))',
                }}
              >
                {fmtUSD(ourFee)}
              </p>
              <p className="font-body text-[9px]" style={{ color: '#22C55E' }}>0% domestic</p>
            </div>
          </div>

          {/* Savings callout */}
          {compFee > 0 && (
            <div
              className="mx-4 mb-4 px-3 py-2.5 rounded-[--radius-xl] text-center"
              style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <p className="font-body text-xs text-text-muted">
                {"You'd save "}
                <span className="font-bold" style={{ color: '#22C55E' }}>{fmtUSD(compFee)}</span>
                {" on this transfer"}
              </p>
            </div>
          )}
        </div>

        {/* Cross-border transparency note */}
        <div
          className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 2v4M7 8.5v.5" stroke="rgba(63,231,255,0.7)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="7" r="5.5" stroke="rgba(63,231,255,0.4)" strokeWidth="1.1" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Cross-border sends: ~1.45% FX spread — still dramatically lower than stacked international fees from other apps. No hidden charges.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="font-body text-[9px] leading-relaxed" style={{ color: 'rgba(175,197,255,0.28)' }}>
          Comparison based on publicly available fee schedules as of 2026. Rates vary by transaction type and provider terms.
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
          See how much you keep
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
