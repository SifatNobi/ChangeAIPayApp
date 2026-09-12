import { useState } from 'react'

type PlanId = 'edge' | 'prime' | 'apex'

interface PlanInfo {
  name: string
  price: number
  color: string
  features: { label: string; sub: string }[]
}

const PLANS: Record<PlanId, PlanInfo> = {
  edge:  { name: 'Edge',  price: 9.99,  color: '#3FE7FF', features: [{ label: '$1,500/mo limit', sub: 'vs $400 on Free' }, { label: 'Zero domestic fees', sub: 'Save ~$6/mo avg' }, { label: '10 savings goals', sub: 'vs 3 on Free' }] },
  prime: { name: 'Prime', price: 39.99, color: '#0066FF', features: [{ label: '$10,000/mo limit', sub: 'vs $1,500 on Edge' }, { label: 'Zero FX fees', sub: 'Save avg $18/mo on FX' }, { label: 'Voice Mode + reports', sub: 'Weekly AI reports' }] },
  apex:  { name: 'Apex',  price: 64.99, color: '#F5B700', features: [{ label: 'Unlimited transfers', sub: 'No caps, ever' }, { label: 'Dedicated support manager', sub: 'Direct line, priority queue' }, { label: 'Real-time AI reports', sub: 'Continuous monitoring' }] },
}

interface UpgradeProps {
  fromPlan?: PlanId | 'free'
  toPlan?: PlanId
  currentCycleEnds?: string
  billingDate?: number
  onConfirm?: () => void
  onBack?: () => void
}

export default function Upgrade({ fromPlan = 'prime', toPlan = 'apex', currentCycleEnds = 'Sep 30, 2026', billingDate = 15, onConfirm, onBack }: UpgradeProps) {
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  const to = PLANS[toPlan]
  const fromInfo = fromPlan !== 'free' ? PLANS[fromPlan as PlanId] : null
  const fromPrice = fromInfo?.price ?? 0
  const today = new Date()
  const renewsDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
  const renewsStr = renewsDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => { setConfirming(false); setDone(true); onConfirm?.() }, 1400)
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Upgrade Plan</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Upgrade arrow visual */}
        <div className="flex items-center gap-3 justify-center py-3">
          {fromInfo && (
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-[16px] flex items-center justify-center"
                style={{ background: `${fromInfo.color}12`, border: `1px solid ${fromInfo.color}30` }}>
                <p className="font-display text-sm font-extrabold" style={{ color: fromInfo.color }}>{fromInfo.name[0]}</p>
              </div>
              <p className="font-body text-[10px] text-text-muted">{fromInfo.name}</p>
            </div>
          )}
          <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
            <path d="M2 8h22M18 3l6 5-6 5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center"
              style={{ background: `${to.color}15`, border: `2px solid ${to.color}44`, boxShadow: `0 0 20px ${to.color}25` }}>
              <p className="font-display text-lg font-extrabold" style={{ color: to.color }}>{to.name[0]}</p>
            </div>
            <p className="font-body text-xs font-semibold" style={{ color: to.color }}>{to.name}</p>
          </div>
        </div>

        {/* New features */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">What you are gaining</p>
          <div className="flex flex-col gap-2.5">
            {to.features.map(f => (
              <div key={f.label} className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                style={{ background: `${to.color}0A`, border: `1px solid ${to.color}22` }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${to.color}15` }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={to.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-text">{f.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing breakdown */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Billing</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
            {[
              { label: 'Charged today', val: `$${to.price.toFixed(2)}`, sub: `Renews ${renewsStr}` },
              { label: `${to.name} plan`, val: `$${to.price.toFixed(2)}/mo`, sub: `Billed on the ${billingDate}th each month` },
              { label: 'Annual option', val: `Save $${((to.price * 12) - (to.price * 10)).toFixed(0)}/yr`, sub: 'Switch to annual anytime' },
            ].map((row, i) => (
              <div key={row.label} className="flex items-start gap-3 px-4 py-3.5"
                style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none', background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent' }}>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{row.label}</p>
                  {row.sub && <p className="font-body text-[10px] text-text-muted">{row.sub}</p>}
                </div>
                <p className="font-mono text-sm font-bold" style={{ color: to.color }}>{row.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Effective immediately note */}
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="#3FE7FF" strokeWidth="1" />
            <path d="M6.5 4v2.5l1.5 1.5" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[11px] text-text-muted">Upgrade takes effect immediately. Full monthly price charged today. Renews {renewsStr}.</p>
        </div>

        {/* CTA */}
        {done ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Upgraded to {to.name}</p>
          </div>
        ) : (
          <button onClick={handleConfirm} disabled={confirming}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
            style={{ background: 'var(--gradient-primary)' }}>
            {confirming ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.2)" strokeWidth="2" /><path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : `Confirm Upgrade · $${to.price.toFixed(2)} today`}
          </button>
        )}
        <button onClick={onBack} className="font-body text-xs text-text-muted text-center active:opacity-70">Cancel</button>
      </div>
    </div>
  )
}
