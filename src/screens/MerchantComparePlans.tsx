import { useState } from 'react'
import { MERCHANT_TIERS, getRecommendedTier, type TierName } from '@/data/merchantTiers'

const COMPARISON_ROWS: { label: string; key: string; format?: (v: unknown) => string }[] = [
  { label: 'Annual payment volume', key: 'apvRange' },
  { label: 'Standard platform fee', key: 'standardFee', format: v => `${v}%` },
  { label: 'Subscription (annual)', key: 'annualPrice', format: v => `$${(v as number).toLocaleString()}/yr` },
  { label: 'Monthly equivalent', key: 'monthlyEquiv', format: v => `$${(v as number).toFixed(2)}/mo` },
  { label: 'FX spread', key: 'fxSpread', format: v => `${v}%` },
  { label: 'Team members', key: 'teamMembers' },
]

const FEATURE_ROWS = [
  'Dashboard & analytics',
  'Invoice & QR payments',
  'Revenue analytics',
  'Business Insights & Aina',
  'Revenue reports',
  'Custom QR codes',
  'API access',
  'White-label invoices',
  'Dedicated account manager',
  'Phone support',
  '99.9% SLA guarantee',
  'Unlimited team members',
  'Custom integrations',
  'Dedicated infrastructure',
  '24/7 priority support',
]

const TIER_FEATURE_MAP: Record<TierName, string[]> = {
  Startup: ['Dashboard & analytics', 'Invoice & QR payments'],
  Growth: ['Dashboard & analytics', 'Invoice & QR payments', 'Revenue analytics'],
  Scale: ['Dashboard & analytics', 'Invoice & QR payments', 'Revenue analytics', 'Business Insights & Aina', 'Revenue reports', 'Custom QR codes'],
  Premium: ['Dashboard & analytics', 'Invoice & QR payments', 'Revenue analytics', 'Business Insights & Aina', 'Revenue reports', 'Custom QR codes', 'API access', 'White-label invoices', 'Dedicated account manager', 'Phone support'],
  Retention: ['Dashboard & analytics', 'Invoice & QR payments', 'Revenue analytics', 'Business Insights & Aina', 'Revenue reports', 'Custom QR codes', 'API access', 'White-label invoices', 'Dedicated account manager', 'Phone support', '99.9% SLA guarantee', 'Custom integrations'],
  Enterprise: ['Dashboard & analytics', 'Invoice & QR payments', 'Revenue analytics', 'Business Insights & Aina', 'Revenue reports', 'Custom QR codes', 'API access', 'White-label invoices', 'Dedicated account manager', 'Phone support', '99.9% SLA guarantee', 'Custom integrations', 'Unlimited team members', 'Dedicated infrastructure', '24/7 priority support'],
}

interface MerchantComparePlansProps {
  onBack?: () => void
  onSelectTier?: (tierName: TierName) => void
  annualVolume?: number
}

export default function MerchantComparePlans({
  onBack,
  onSelectTier,
  annualVolume = 472800,
}: MerchantComparePlansProps) {
  const recommended = getRecommendedTier(annualVolume)
  const [leftTier, setLeftTier] = useState<TierName>('Scale')
  const [rightTier, setRightTier] = useState<TierName>('Premium')
  const [showAll, setShowAll] = useState(false)

  const leftData = MERCHANT_TIERS.find(t => t.name === leftTier)!
  const rightData = MERCHANT_TIERS.find(t => t.name === rightTier)!
  const TIER_NAMES: TierName[] = ['Startup', 'Growth', 'Scale', 'Premium', 'Retention', 'Enterprise']

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Compare Plans</p>
          <p className="font-body text-[10px] text-text-muted">Select two tiers to compare side by side</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Tier pickers */}
        <div className="px-5 flex gap-3">
          {[
            { side: 'left', current: leftTier, set: setLeftTier, other: rightTier },
            { side: 'right', current: rightTier, set: setRightTier, other: leftTier },
          ].map(({ side, current, set, other }) => {
            const tierData = MERCHANT_TIERS.find(t => t.name === current)!
            return (
              <div key={side} className="flex-1 flex flex-col gap-1.5">
                <p className="font-body text-[10px] text-text-muted pl-1">{side === 'left' ? 'Plan A' : 'Plan B'}</p>
                <div
                  className="rounded-[--radius-xl] overflow-hidden"
                  style={{ border: `1px solid ${tierData.borderColor}` }}
                >
                  <select
                    value={current}
                    onChange={e => set(e.target.value as TierName)}
                    className="w-full px-3 h-11 font-body text-sm font-semibold bg-transparent outline-none"
                    style={{ color: tierData.color, background: tierData.bgColor }}
                  >
                    {TIER_NAMES.filter(n => n !== other).map(n => (
                      <option key={n} value={n} style={{ background: '#0A0F1E', color: 'white' }}>{n}</option>
                    ))}
                  </select>
                </div>
                {current === recommended.name && (
                  <p className="font-body text-[9px] font-semibold pl-1" style={{ color: tierData.color }}>
                    ✦ Recommended
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Comparison table header */}
        <div className="px-5">
          <div className="rounded-t-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', borderBottom: 'none' }}>
            <div className="grid grid-cols-3 gap-0 px-4 py-3"
              style={{ background: 'rgba(175,197,255,0.04)', borderBottom: '1px solid rgba(175,197,255,0.09)' }}>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">Feature</p>
              <p className="font-body text-xs font-bold text-center" style={{ color: leftData.color }}>{leftTier}</p>
              <p className="font-body text-xs font-bold text-center" style={{ color: rightData.color }}>{rightTier}</p>
            </div>

            {/* Spec rows */}
            {COMPARISON_ROWS.map((row, i) => {
              const lv = leftData[row.key as keyof typeof leftData]
              const rv = rightData[row.key as keyof typeof rightData]
              const lStr = row.format ? row.format(lv) : String(lv)
              const rStr = row.format ? row.format(rv) : String(rv)
              return (
                <div key={i} className="grid grid-cols-3 gap-0 px-4 py-3"
                  style={{ borderBottom: '1px solid rgba(175,197,255,0.06)' }}>
                  <p className="font-body text-[11px] text-text-muted pr-2">{row.label}</p>
                  <p className="font-mono text-xs font-semibold text-center" style={{ color: 'var(--color-text)' }}>{lStr}</p>
                  <p className="font-mono text-xs font-semibold text-center" style={{ color: 'var(--color-text)' }}>{rStr}</p>
                </div>
              )
            })}

            {/* Savings row */}
            <div className="grid grid-cols-3 gap-0 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(175,197,255,0.06)', background: 'rgba(34,197,94,0.02)' }}>
              <p className="font-body text-[11px] text-text-muted pr-2">Saves you/yr</p>
              {[leftData, rightData].map((tier, i) => {
                const savingsAmt = (annualVolume * tier.standardFee / 100) - tier.annualPrice
                return (
                  <p key={i} className="font-mono text-xs font-bold text-center"
                    style={{ color: savingsAmt > 0 ? '#22C55E' : '#F87171' }}>
                    {savingsAmt > 0 ? `+$${Math.round(savingsAmt).toLocaleString()}` : `−$${Math.abs(Math.round(savingsAmt)).toLocaleString()}`}
                  </p>
                )
              })}
            </div>

            {/* Feature rows */}
            <div className="px-4 py-2 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(175,197,255,0.06)', background: 'rgba(175,197,255,0.03)' }}>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">Features included</p>
              <button onClick={() => setShowAll(v => !v)}
                className="font-body text-[10px]" style={{ color: 'rgba(175,197,255,0.5)' }}>
                {showAll ? 'Show less' : 'Show all'}
              </button>
            </div>

            {(showAll ? FEATURE_ROWS : FEATURE_ROWS.slice(0, 6)).map((feat, i, arr) => {
              const lHas = TIER_FEATURE_MAP[leftTier].includes(feat)
              const rHas = TIER_FEATURE_MAP[rightTier].includes(feat)
              return (
                <div key={i} className="grid grid-cols-3 gap-0 px-4 py-2.5"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(175,197,255,0.05)' : 'none' }}>
                  <p className="font-body text-[11px] text-text-muted pr-2">{feat}</p>
                  {[lHas, rHas].map((has, j) => (
                    <div key={j} className="flex justify-center items-center">
                      {has ? (
                        <div className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(34,197,94,0.12)' }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l2 2 3-3.5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(175,197,255,0.04)' }}>
                          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                            <path d="M1.5 1.5l3 3M4.5 1.5l-3 3" stroke="rgba(175,197,255,0.25)" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="px-5 flex gap-3">
          {[leftData, rightData].map(tier => (
            <button
              key={tier.name}
              onClick={() => onSelectTier?.(tier.name)}
              className="flex-1 h-11 rounded-[--radius-xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
              style={{
                background: tier.name === recommended.name ? `linear-gradient(135deg, ${tier.color}20, ${tier.color}0a)` : 'rgba(175,197,255,0.05)',
                color: tier.color,
                border: `1px solid ${tier.borderColor}`,
              }}
            >
              {tier.name === recommended.name ? `✦ ` : ''}Subscribe {tier.name}
            </button>
          ))}
        </div>

        {/* Platform fee disclosure */}
        <div className="px-5">
          <div className="px-3 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
            <p className="font-body text-[9px] text-text-muted leading-relaxed">
              The 0% platform fee applies to ChangeAIPay's own platform fee only. Third-party processor costs, payment-network fees, refunds, and chargebacks remain separate pass-through costs where applicable.
            </p>
          </div>
        </div>

        {/* All tiers quick list */}
        <div className="px-5">
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">All tiers</p>
          <div className="flex gap-2 flex-wrap">
            {MERCHANT_TIERS.map(tier => (
              <button
                key={tier.name}
                onClick={() => {
                  setLeftTier(tier.name)
                  if (rightTier === tier.name) setRightTier(leftTier)
                }}
                className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
                style={{
                  background: leftTier === tier.name || rightTier === tier.name ? tier.bgColor : 'rgba(175,197,255,0.04)',
                  color: leftTier === tier.name || rightTier === tier.name ? tier.color : 'rgba(175,197,255,0.4)',
                  border: `1px solid ${leftTier === tier.name || rightTier === tier.name ? tier.borderColor : 'rgba(175,197,255,0.09)'}`,
                }}
              >
                {tier.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
