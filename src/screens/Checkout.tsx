import { useState } from 'react'

type PlanId = 'edge' | 'prime' | 'apex'
type Cycle = 'monthly' | 'annual'

interface PlanInfo {
  name: string
  monthlyPrice: number
  annualPrice: number
  color: string
  perks: string[]
}

const PLANS: Record<PlanId, PlanInfo> = {
  edge:  { name: 'Edge',  monthlyPrice: 9.99,  annualPrice: 99.99,  color: '#3FE7FF', perks: ['$1,500/mo limit', 'Zero domestic fees', '10 savings goals'] },
  prime: { name: 'Prime', monthlyPrice: 39.99, annualPrice: 399.99, color: '#0066FF', perks: ['$10,000/mo limit', 'Zero FX fees', 'Unlimited goals', 'Voice Mode'] },
  apex:  { name: 'Apex',  monthlyPrice: 64.99, annualPrice: 649.99, color: '#F5B700', perks: ['Unlimited transfers', 'Zero FX fees', 'Dedicated support', 'Real-time reports'] },
}

const PAYMENT_METHODS = [
  { id: 'chase', name: 'Chase Checking', last4: '4521', icon: '🏦' },
  { id: 'boa',   name: 'Bank of America', last4: '8834', icon: '🏦' },
]

interface CheckoutProps {
  plan?: PlanId
  onConfirm?: (plan: PlanId, cycle: Cycle) => void
  onBack?: () => void
  onComparePlans?: () => void
}

export default function Checkout({ plan = 'prime', onConfirm, onBack, onComparePlans }: CheckoutProps) {
  const [cycle, setCycle] = useState<Cycle>('monthly')
  const [paymentId, setPaymentId] = useState(PAYMENT_METHODS[0].id)
  const [authing, setAuthing] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const info = PLANS[plan]
  const price = cycle === 'monthly' ? info.monthlyPrice : info.annualPrice
  const annualSaving = (info.monthlyPrice * 12 - info.annualPrice).toFixed(2)
  const today = new Date()
  const renewsDate = new Date(today.getFullYear(), today.getMonth() + (cycle === 'monthly' ? 1 : 12), today.getDate())
  const renewsStr = renewsDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const handleSubscribe = () => {
    setAuthing(true)
    setTimeout(() => {
      setAuthing(false)
      setConfirming(true)
      setTimeout(() => {
        setConfirming(false)
        onConfirm?.(plan, cycle)
      }, 1400)
    }, 1100)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Checkout</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Plan summary card */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
          style={{ background: `${info.color}0C`, border: `1.5px solid ${info.color}33` }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-xl font-extrabold" style={{ color: info.color }}>{info.name}</p>
              <p className="font-body text-xs text-text-muted mt-0.5">ChangeAIPay subscription</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-bold text-text">${price.toFixed(2)}</p>
              <p className="font-body text-[10px] text-text-muted">{cycle === 'monthly' ? 'per month' : 'per year'}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {info.perks.map(perk => (
              <div key={perk} className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={info.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p className="font-body text-xs text-text-muted">{perk}</p>
              </div>
            ))}
          </div>
          <button onClick={onComparePlans} className="font-body text-[10px] font-semibold text-left" style={{ color: info.color, opacity: 0.7, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Compare all plans
          </button>
        </div>

        {/* Billing cycle */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Billing Cycle</p>
          <div className="flex gap-2.5">
            {(['monthly', 'annual'] as Cycle[]).map(c => (
              <button key={c} onClick={() => setCycle(c)}
                className="flex-1 flex flex-col items-start px-4 py-3.5 rounded-[--radius-xl] text-left transition-all"
                style={{ background: cycle === c ? `${info.color}10` : 'rgba(175,197,255,0.04)', border: `1.5px solid ${cycle === c ? `${info.color}44` : 'rgba(175,197,255,0.1)'}` }}>
                <div className="flex items-center gap-2 w-full mb-1">
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: cycle === c ? info.color : 'rgba(175,197,255,0.3)' }}>
                    {cycle === c && <div className="w-2 h-2 rounded-full" style={{ background: info.color }} />}
                  </div>
                  <p className="font-body text-sm font-semibold text-text capitalize">{c}</p>
                  {c === 'annual' && (
                    <span className="ml-auto font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>
                      Save ${annualSaving}
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-text-muted pl-6">
                  {c === 'monthly' ? `$${info.monthlyPrice}/mo` : `$${info.annualPrice}/yr · $${(info.annualPrice / 12).toFixed(2)}/mo`}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Payment Method</p>
          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS.map(pm => (
              <button key={pm.id} onClick={() => setPaymentId(pm.id)}
                className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all"
                style={{ background: paymentId === pm.id ? 'rgba(175,197,255,0.07)' : 'rgba(175,197,255,0.03)', border: `1px solid ${paymentId === pm.id ? 'rgba(175,197,255,0.22)' : 'rgba(175,197,255,0.09)'}` }}>
                <span className="text-lg">{pm.icon}</span>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{pm.name}</p>
                  <p className="font-body text-[10px] text-text-muted">····{pm.last4}</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: paymentId === pm.id ? info.color : 'rgba(175,197,255,0.3)' }}>
                  {paymentId === pm.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: info.color }} />}
                </div>
              </button>
            ))}
            <button className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left"
              style={{ background: 'rgba(175,197,255,0.02)', border: '1px dashed rgba(175,197,255,0.15)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(175,197,255,0.06)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7h8" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </div>
              <p className="font-body text-sm text-text-muted">Add payment method</p>
            </button>
          </div>
          <p className="font-body text-[10px] text-text-muted mt-2 px-1">LightCard coming soon — link your physical card for direct billing.</p>
        </div>

        {/* Order total */}
        <div className="rounded-[--radius-xl] px-4 py-4 flex flex-col gap-2"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="flex justify-between">
            <p className="font-body text-xs text-text-muted">{info.name} plan · {cycle}</p>
            <p className="font-mono text-xs text-text">${price.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-body text-xs text-text-muted">Tax</p>
            <p className="font-mono text-xs text-text">$0.00</p>
          </div>
          <div className="border-t border-[rgba(175,197,255,0.09)] pt-2 flex justify-between">
            <p className="font-body text-sm font-semibold text-text">Charged today</p>
            <p className="font-mono text-sm font-bold text-text">${price.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-body text-xs text-text-muted">Renews</p>
            <p className="font-mono text-xs text-text-muted">{renewsStr}</p>
          </div>
        </div>

        {/* Biometric auth + confirm */}
        {confirming ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" /><path d="M8 2a6 6 0 0 1 6 6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Activating subscription…</p>
          </div>
        ) : (
          <button onClick={handleSubscribe} disabled={authing}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-70"
            style={{ background: 'var(--gradient-primary)' }}>
            {authing ? (
              <><svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.2)" strokeWidth="2" /><path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg> Verifying identity…</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8C4 5.8 5.8 4 8 4s4 1.8 4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" /><circle cx="8" cy="9.5" r="2.5" stroke="white" strokeWidth="1.2" /><path d="M5 13c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" /></svg> Confirm & Subscribe · ${price.toFixed(2)}</>
            )}
          </button>
        )}
        <p className="font-body text-[10px] text-text-muted text-center leading-relaxed">
          Cancel anytime. No refunds for partial months unless required by law.
        </p>
      </div>
    </div>
  )
}
