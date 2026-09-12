import { useState } from 'react'

type PlanId = 'free' | 'edge' | 'prime'

interface PlanInfo {
  name: string
  price: number | null
  color: string
}

const PLANS: Record<PlanId, PlanInfo> = {
  free:  { name: 'Free',  price: null,  color: 'rgba(175,197,255,0.5)' },
  edge:  { name: 'Edge',  price: 9.99,  color: '#3FE7FF' },
  prime: { name: 'Prime', price: 39.99, color: '#0066FF' },
}

interface LostFeature {
  label: string
  sub: string
  recoverable: boolean
}

const LOST_FEATURES: Record<string, LostFeature[]> = {
  'apex→prime':  [{ label: 'Unlimited transfers → $10,000/mo',   sub: "You'll hit the limit if you typically send above $10k",    recoverable: true }, { label: 'Dedicated support manager removed', sub: 'Support reverts to standard 4-hr response queue', recoverable: true }, { label: 'Real-time reports → Weekly',         sub: 'AI report cadence drops from continuous to weekly',   recoverable: true }],
  'apex→edge':   [{ label: 'Transfer limit drops to $1,500/mo',   sub: 'Large transfers will be blocked until next cycle',         recoverable: true }, { label: 'Zero FX fees removed', sub: 'Edge FX: free on first $1,500/mo, then 0.95% overage', recoverable: true }, { label: 'Voice Mode no longer available',     sub: 'AI chat stays available; voice is removed',          recoverable: true }],
  'apex→free':   [{ label: 'Transfer limit drops to $400/mo',     sub: 'Over-limit transfers incur a ~1.5% conversion fee',       recoverable: true }, { label: 'Savings goals capped at 3',         sub: 'Existing goals beyond 3 remain but cannot add more', recoverable: false }, { label: 'AI Memory reduced to 7 days',       sub: 'Older memories will be deleted after downgrade',     recoverable: false }],
  'prime→edge':  [{ label: 'Transfer limit drops to $1,500/mo',   sub: 'Transfers above $1,500/mo will require a conversion fee', recoverable: true }, { label: 'FX fee reinstated (+0.5% Edge rate)', sub: 'International sends become slightly more expensive', recoverable: true }, { label: 'Goals capped at 10',                sub: 'Existing unlimited goals remain; cap applies to new', recoverable: true }],
  'prime→free':  [{ label: 'Transfer limit drops to $400/mo',     sub: 'Above-limit transfers still go through at ~1.5% fee',    recoverable: true }, { label: 'FX fees reinstated',                sub: 'Foreign currency transfers will cost more',          recoverable: true }, { label: 'AI Memory reduced to 7 days',       sub: 'Memories older than 7 days will be purged',          recoverable: false }],
  'edge→free':   [{ label: 'Transfer limit drops to $400/mo',     sub: 'Standard Free limits apply immediately',                 recoverable: true }, { label: 'Domestic transfer fee reinstated',  sub: '~1.5% fee on transfers above Free allowance',       recoverable: true }, { label: 'Goals capped at 3',                 sub: 'Existing goals beyond 3 remain; no new ones beyond', recoverable: false }],
}

interface DowngradeProps {
  fromPlan?: 'apex' | 'prime' | 'edge'
  toPlan?: PlanId
  currentCycleEnds?: string
  onConfirm?: () => void
  onBack?: () => void
}

export default function Downgrade({ fromPlan = 'apex', toPlan = 'prime', currentCycleEnds = 'Sep 30, 2026', onConfirm, onBack }: DowngradeProps) {
  const [confirmed, setConfirmed] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [understood, setUnderstood] = useState(false)

  const to = PLANS[toPlan]
  const key = `${fromPlan}→${toPlan}`
  const lost = LOST_FEATURES[key] ?? []

  const handleConfirm = () => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setConfirmed(true); onConfirm?.() }, 1200)
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Downgrade Plan</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Transition summary */}
        <div className="rounded-[--radius-2xl] px-5 py-4 flex items-center gap-4"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}>
          <div className="text-center">
            <p className="font-display text-sm font-extrabold" style={{ color: 'rgba(175,197,255,0.5)' }}>{fromPlan.charAt(0).toUpperCase() + fromPlan.slice(1)}</p>
            <p className="font-body text-[10px] text-text-muted">Current</p>
          </div>
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none" className="flex-1">
            <path d="M26 7H2M8 2l-6 5 6 5" stroke="rgba(175,197,255,0.25)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-center">
            <p className="font-display text-sm font-extrabold" style={{ color: to.color }}>{to.name}</p>
            <p className="font-body text-[10px] text-text-muted">{to.price ? `$${to.price}/mo` : 'Free'}</p>
          </div>
        </div>

        {/* Timing */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1.1" />
            <path d="M7 4.5v2.5l1.5 1.5" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            Downgrade takes effect <span className="font-semibold text-text">at the end of your current billing cycle</span> — {currentCycleEnds}. You keep full access until then.
          </p>
        </div>

        {/* What you lose */}
        {lost.length > 0 && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Changes after {currentCycleEnds}</p>
            <div className="flex flex-col gap-2">
              {lost.map(f => (
                <div key={f.label} className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                  style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: f.recoverable ? 'rgba(245,183,0,0.1)' : 'rgba(255,77,90,0.1)' }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke={f.recoverable ? '#F5B700' : '#FF4D5A'} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-text">{f.label}</p>
                    <p className="font-body text-[10px] text-text-muted leading-relaxed">{f.sub}</p>
                  </div>
                  {!f.recoverable && (
                    <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 mt-0.5" style={{ background: 'rgba(255,77,90,0.1)', color: '#FF4D5A', border: '1px solid rgba(255,77,90,0.2)' }}>
                      Permanent
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No guilt, just facts */}
        <div className="px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            You can upgrade again at any time. If you find {to.name} is not quite right either, you can always switch plans from your profile.
          </p>
        </div>

        {/* Understand checkbox */}
        <button onClick={() => setUnderstood(p => !p)}
          className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all"
          style={{ background: understood ? 'rgba(175,197,255,0.06)' : 'rgba(175,197,255,0.03)', border: `1px solid ${understood ? 'rgba(175,197,255,0.2)' : 'rgba(175,197,255,0.09)'}` }}>
          <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: understood ? 'rgba(175,197,255,0.15)' : 'rgba(175,197,255,0.07)', border: `1.5px solid ${understood ? 'rgba(175,197,255,0.4)' : 'rgba(175,197,255,0.2)'}` }}>
            {understood && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="rgba(175,197,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            I understand the changes listed above and would like to downgrade to {to.name}.
          </p>
        </button>

        {/* CTA */}
        {confirmed ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Downgrade scheduled for {currentCycleEnds}</p>
          </div>
        ) : (
          <button onClick={handleConfirm} disabled={!understood || processing}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-30"
            style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.2)', color: 'rgba(175,197,255,0.75)' }}>
            {processing ? <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" /><path d="M8 2a6 6 0 0 1 6 6" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" /></svg> : `Confirm Downgrade to ${to.name}`}
          </button>
        )}
        <button onClick={onBack} className="font-body text-xs text-text-muted text-center active:opacity-70">Keep current plan</button>
      </div>
    </div>
  )
}
