import { useState } from 'react'
import {
  MERCHANT_TIERS,
  getRecommendedTier,
  calcStandardFees,
  calcAnnualSavings,
  fmt,
  type MerchantTier,
} from '@/data/merchantTiers'

function fmtPrice(n: number): string {
  const hasDecimals = n % 1 !== 0
  return hasDecimals
    ? `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$${n.toLocaleString('en-US')}`
}

interface MerchantPlansProps {
  onBack?: () => void
  onSelectTier?: (tier: MerchantTier) => void
  onCompare?: () => void
  onEnterprise?: () => void
  annualVolume?: number
  currentTier?: string | null
}

export default function MerchantPlans({
  onBack,
  onSelectTier,
  onCompare,
  onEnterprise,
  annualVolume = 472800,
  currentTier = null,
}: MerchantPlansProps) {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual')
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({})
  const recommended = getRecommendedTier(annualVolume)
  const stdFees = calcStandardFees(annualVolume, recommended.standardFee)
  const savings = calcAnnualSavings(annualVolume, recommended)

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Subscription Plans</p>
          <p className="font-body text-[10px] text-text-muted">Subscribe once. Pay 0% platform fees.</p>
        </div>
        <button onClick={onCompare}
          className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
          style={{ color: 'rgba(175,197,255,0.6)', border: '1px solid rgba(175,197,255,0.14)' }}>
          Compare
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Slogan */}
        <p className="font-body text-xs text-text-muted leading-relaxed text-center px-2">
          Subscribe once. Pay 0% platform fees, unlock advanced AI, and keep more of every payment using ChangeAIPay.
        </p>

        {/* Savings widget */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl]"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,80,0.85) 0%, rgba(10,20,60,0.9) 100%)',
            border: `1px solid ${recommended.borderColor}`,
            boxShadow: `0 0 24px ${recommended.glowColor}`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: recommended.color, boxShadow: `0 0 6px ${recommended.color}` }} />
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider" style={{ color: recommended.color }}>
              Based on your volume
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { label: "You've processed", value: `${fmt(annualVolume)} this year`, muted: false },
              { label: 'Standard platform fees', value: fmt(stdFees), highlight: '#F87171' },
              { label: `${recommended.name} subscription`, value: `${fmtPrice(recommended.annualPrice)}/yr`, color: recommended.color },
              { label: 'Your net saving', value: `${fmt(savings)}/yr`, highlight: '#22C55E' },
              { label: 'AI-assisted business tools', value: 'Unlocked', highlight: '#22C55E' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="font-body text-[11px] text-text-muted">{row.label}</p>
                <p className="font-body text-[11px] font-semibold"
                  style={{ color: row.highlight ?? row.color ?? 'var(--color-text)' }}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div
          className="px-4 py-3 rounded-[--radius-xl] flex flex-col gap-2"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <p className="font-body text-xs font-semibold text-text">How plans work</p>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(34,197,94,0.12)' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3.5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="font-body text-[11px] text-text-muted leading-relaxed">
              <span className="text-text font-medium">Subscribe</span> → $0 platform fee. You pay the annual subscription price instead.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(175,197,255,0.08)' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="2.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1" /></svg>
            </div>
            <p className="font-body text-[11px] text-text-muted leading-relaxed">
              <span className="text-text font-medium">Don't subscribe</span> → keep using ChangeAIPay normally. The standard fee % applies per transaction.
            </p>
          </div>
          <p className="font-body text-[10px] mt-1" style={{ color: 'rgba(175,197,255,0.4)' }}>
            FX spread is a separate fee applied on currency conversions, regardless of subscription status.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center gap-2 self-center">
          <button
            onClick={() => setBilling('annual')}
            className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
            style={{
              background: billing === 'annual' ? 'rgba(0,102,255,0.12)' : 'transparent',
              color: billing === 'annual' ? '#4D9FFF' : 'rgba(175,197,255,0.4)',
              border: `1px solid ${billing === 'annual' ? 'rgba(0,102,255,0.25)' : 'transparent'}`,
            }}>
            Annual
          </button>
          <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
            Best value
          </span>
          <button
            onClick={() => setBilling('monthly')}
            className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
            style={{
              background: billing === 'monthly' ? 'rgba(0,102,255,0.12)' : 'transparent',
              color: billing === 'monthly' ? '#4D9FFF' : 'rgba(175,197,255,0.4)',
              border: `1px solid ${billing === 'monthly' ? 'rgba(0,102,255,0.25)' : 'transparent'}`,
            }}>
            Monthly
          </button>
        </div>

        {/* Tier cards */}
        <div className="flex flex-col gap-3">
          {MERCHANT_TIERS.map(tier => {
            const isRecommended = tier.name === recommended.name
            const isCurrent = tier.name === currentTier
            const isPremium = tier.badge === 'Most Popular'
            const isLegendary = tier.badge === 'Legendary'
            const displayPrice = billing === 'annual'
              ? `${fmtPrice(tier.annualPrice)}/yr`
              : `$${tier.monthlyEquiv.toFixed(2)}/mo`
            const tierSavings = calcAnnualSavings(annualVolume, tier)
            const showSavings = tierSavings > 0

            const cardBorder = isPremium
              ? '2px solid rgba(153,69,255,0.7)'
              : isLegendary
                ? '2px solid rgba(255,184,48,0.75)'
                : `1px solid ${isRecommended ? tier.borderColor : 'rgba(175,197,255,0.09)'}`
            const cardShadow = isPremium
              ? '0 0 0 3px rgba(0,102,255,0.18), 0 8px 32px rgba(153,69,255,0.3)'
              : isLegendary
                ? '0 0 0 3px rgba(255,184,48,0.12), 0 8px 32px rgba(255,184,48,0.28)'
                : isRecommended ? `0 4px 24px ${tier.glowColor}` : 'none'

            return (
              <div key={tier.name} className="relative" style={{ paddingTop: tier.badge ? 12 : 0 }}>
                {/* Floating badge */}
                {tier.badge && (
                  <div
                    className="absolute left-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full z-10"
                    style={{
                      top: 0,
                      transform: 'translateX(-50%)',
                      background: isPremium
                        ? 'linear-gradient(135deg, #9945FF, #0066FF)'
                        : 'linear-gradient(135deg, #FFB830, #F5B700)',
                      boxShadow: isPremium
                        ? '0 2px 12px rgba(153,69,255,0.5)'
                        : '0 2px 12px rgba(255,184,48,0.5)',
                    }}
                  >
                    {isLegendary && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1l1 2.5h2.5L6 5l1 3L5 6.5 3 8l1-3-2.5-1.5H4L5 1Z" fill="white" />
                      </svg>
                    )}
                    {isPremium && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1.5l1.2 2.8 3 .2-2.2 1.9.7 3L5 7.8 2.3 9.4l.7-3L.8 4.5l3-.2L5 1.5Z" fill="white" />
                      </svg>
                    )}
                    <span className="font-body text-[9px] font-bold text-white uppercase tracking-wider">{tier.badge}</span>
                  </div>
                )}

              <div
                className="rounded-[--radius-2xl] overflow-hidden"
                style={{
                  border: cardBorder,
                  background: (isPremium || isLegendary || isRecommended)
                    ? `linear-gradient(135deg, ${tier.bgColor} 0%, rgba(0,10,40,0.6) 100%)`
                    : 'rgba(175,197,255,0.02)',
                  boxShadow: cardShadow,
                }}
              >
                {isRecommended && !tier.badge && (
                  <div className="px-4 py-1.5 flex items-center gap-1.5"
                    style={{ background: `${tier.bgColor}`, borderBottom: `1px solid ${tier.borderColor}` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: tier.color, boxShadow: `0 0 6px ${tier.color}` }} />
                    <p className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ color: tier.color }}>
                      Recommended for your volume
                    </p>
                  </div>
                )}

                <div className="px-4 py-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-display text-base font-extrabold text-text">{tier.name}</p>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold"
                            style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
                            Current
                          </span>
                        )}
                      </div>
                      <p className="font-body text-[10px]" style={{ color: 'rgba(175,197,255,0.5)' }}>{tier.apvRange}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lg font-bold" style={{ color: tier.color }}>
                        {displayPrice}
                      </p>
                      {billing === 'monthly' && (
                        <p className="font-body text-[10px] text-text-muted">{fmtPrice(tier.annualPrice)}/yr billed annually</p>
                      )}
                    </div>
                  </div>

                  {/* Fee comparison row */}
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-[--radius-xl] mb-3"
                    style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
                  >
                    <div className="flex-1 text-center">
                      <p className="font-body text-[10px] text-text-muted">Standard fee</p>
                      <p className="font-mono text-xs font-bold" style={{ color: '#F87171' }}>{tier.standardFee}%</p>
                    </div>
                    <div className="w-px h-7 bg-white/10" />
                    <div className="flex-1 text-center">
                      <p className="font-body text-[10px] text-text-muted">With subscription</p>
                      <p className="font-mono text-xs font-bold text-text">0% platform fee</p>
                    </div>
                    <div className="w-px h-7 bg-white/10" />
                    <div className="flex-1 text-center">
                      <p className="font-body text-[10px] text-text-muted">FX spread</p>
                      <p className="font-mono text-xs font-bold text-text">{tier.fxSpread}%</p>
                    </div>
                  </div>

                  {/* Savings note */}
                  {showSavings && (
                    <p className="font-body text-[10px] mb-3 px-0.5" style={{ color: '#22C55E' }}>
                      At your volume: saves {fmt(tierSavings)}/yr vs. pay-as-you-go
                    </p>
                  )}

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(expandedTiers[tier.name] ? tier.features : tier.features.slice(0, 3)).map((f, i) => (
                      <span key={i} className="px-2 py-1 rounded-full font-body text-[10px]"
                        style={{ background: 'rgba(175,197,255,0.05)', color: 'rgba(175,197,255,0.6)', border: '1px solid rgba(175,197,255,0.09)' }}>
                        {f === 'AI call handling and messaging' ? (
                          <span title="AI Agent takes calls for merchants when busy or unavailable, helps book a service when needed by checking and matching available time slots, and sends and receives messages if a customer prefers messaging instead of calls after customer approval.">
                            AI call handling and messaging ⓘ
                          </span>
                        ) : f}
                      </span>
                    ))}
                    {tier.features.length > 3 && !expandedTiers[tier.name] && (
                      <button
                        onClick={() => setExpandedTiers(p => ({ ...p, [tier.name]: true }))}
                        aria-expanded={false}
                        aria-label={`Show ${tier.features.length - 3} more features for ${tier.name} tier`}
                        className="px-2 py-1 rounded-full font-body text-[10px] transition-colors hover:border-[rgba(175,197,255,0.18)]"
                        style={{ color: 'rgba(175,197,255,0.4)', border: '1px solid rgba(175,197,255,0.07)' }}>
                        +{tier.features.length - 3} more
                      </button>
                    )}
                    {expandedTiers[tier.name] && (
                      <button
                        onClick={() => setExpandedTiers(p => ({ ...p, [tier.name]: false }))}
                        aria-expanded={true}
                        aria-label={`Show less features for ${tier.name} tier`}
                        className="px-2 py-1 rounded-full font-body text-[10px] transition-colors hover:border-[rgba(175,197,255,0.18)]"
                        style={{ color: 'rgba(175,197,255,0.4)', border: '1px solid rgba(175,197,255,0.07)' }}>
                        Show less
                      </button>
                    )}
                  </div>

                  {tier.name === 'Enterprise' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectTier?.(tier)}
                        className="flex-1 h-11 rounded-[--radius-xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
                        style={{ background: tier.bgColor, color: tier.color, border: `1px solid ${tier.borderColor}` }}>
                        {`Subscribe — ${fmtPrice(tier.annualPrice)}/yr`}
                      </button>
                      <button
                        onClick={onEnterprise}
                        className="px-3 h-11 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                        style={{ color: 'rgba(175,197,255,0.6)', border: '1px solid rgba(175,197,255,0.12)' }}>
                        Custom terms
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelectTier?.(tier)}
                      disabled={isCurrent}
                      className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
                      style={{
                        background: isCurrent
                          ? 'rgba(175,197,255,0.06)'
                          : isRecommended
                            ? `linear-gradient(135deg, ${tier.color}25, ${tier.color}10)`
                            : 'rgba(175,197,255,0.06)',
                        color: isCurrent ? 'rgba(175,197,255,0.3)' : isRecommended ? tier.color : 'rgba(175,197,255,0.7)',
                        border: `1px solid ${isCurrent ? 'rgba(175,197,255,0.08)' : tier.borderColor}`,
                        fontWeight: isRecommended ? 700 : 600,
                      }}>
                      {isCurrent ? 'Current plan' : `Subscribe — ${billing === 'annual' ? fmtPrice(tier.annualPrice) + '/yr' : '$' + tier.monthlyEquiv.toFixed(2) + '/mo'}`}
                    </button>
                  )}
                </div>
              </div>
              </div>
            )
          })}
        </div>

        {/* Platform fee disclosure */}
        <div className="px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            The 0% platform fee applies to ChangeAIPay's own platform fee only. Third-party processor costs, payment-network fees, refunds, and chargebacks remain separate pass-through costs where applicable. FX spread is a separate charge on currency conversions, independent of subscription status. Cancel anytime before your renewal date.
          </p>
        </div>
      </div>
    </div>
  )
}
