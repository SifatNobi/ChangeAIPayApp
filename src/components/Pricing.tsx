import { type ReactNode } from 'react'

type ConsumerTier = 'FREE' | 'EDGE' | 'PRIME' | 'APEX'
type MerchantTier = 'STARTUP' | 'GROWTH' | 'SCALE' | 'PREMIUM' | 'RETENTION' | 'ENTERPRISE'

interface PricingCardProps {
  tier: ConsumerTier | MerchantTier
  price: string
  period?: string
  features: string[]
  current?: boolean
  recommended?: boolean
  legendary?: boolean
  onSelect?: () => void
  children?: ReactNode
}

export function PricingCard({
  tier,
  price,
  period = '/month',
  features,
  current = false,
  recommended = false,
  legendary = false,
  onSelect,
  children,
}: PricingCardProps) {
  /* Legendary — top tier: gold gradient border + crown badge */
  if (legendary) {
    return (
      <div className="relative p-px rounded-[--radius-3xl] animate-fade-in"
        style={{ background: 'var(--gradient-legendary)', boxShadow: 'var(--shadow-legendary)' }}>
        <div className="rounded-[calc(var(--radius-3xl)-1px)] bg-surface p-6 flex flex-col gap-5">
          {/* Crown badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 h-8 rounded-full flex items-center gap-2"
            style={{ background: 'var(--gradient-legendary)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10l2-6 3 4 3-4 2 6H2Z" fill="#050B2D" stroke="#050B2D" strokeLinejoin="round" />
            </svg>
            <span className="font-body text-xs font-bold text-bg">Legendary</span>
          </div>

          <div className="mt-3">
            <p className="font-body text-xs uppercase tracking-widest text-text-muted mb-1">{tier}</p>
            <p className="font-display text-4xl font-extrabold text-gradient-legendary">{price}</p>
            <p className="font-body text-xs text-text-muted mt-0.5">{period}</p>
          </div>

          <ul className="flex flex-col gap-3">
            {features.map(f => (
              <li key={f} className="flex items-start gap-2.5 font-body text-sm text-text-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="8" cy="8" r="7" fill="rgba(245,183,0,0.12)" />
                  <path d="M5 8l2 2 4-4" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {children}

          <button
            onClick={onSelect}
            className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-bold text-bg transition-all duration-[250ms] hover:brightness-110 active:scale-[0.98] focus-ring"
            style={{ background: 'var(--gradient-legendary)' }}
          >
            {current ? 'Current Plan' : 'Get Legendary'}
          </button>
        </div>
      </div>
    )
  }

  /* Most Popular — rotating gradient border */
  if (recommended) {
    return (
      <div className="relative p-px rounded-[--radius-3xl] animate-fade-in"
        style={{
          background: 'conic-gradient(from var(--gradient-angle, 0deg), #0066FF, #3FE7FF, #0066FF)',
          animation: 'gradient-rotate 3s linear infinite',
        }}>
        <div className="rounded-[calc(var(--radius-3xl)-1px)] bg-surface p-6 flex flex-col gap-5">
          {/* Most Popular badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 h-8 rounded-full flex items-center gap-2"
            style={{ background: 'var(--gradient-primary)' }}>
            <span className="font-body text-xs font-bold text-bg">Most Popular</span>
          </div>

          <div className="mt-3">
            <p className="font-body text-xs uppercase tracking-widest text-text-muted mb-1">{tier}</p>
            <p className="font-display text-4xl font-extrabold text-gradient-primary">{price}</p>
            <p className="font-body text-xs text-text-muted mt-0.5">{period}</p>
          </div>

          <ul className="flex flex-col gap-3">
            {features.map(f => (
              <li key={f} className="flex items-start gap-2.5 font-body text-sm text-text-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="8" cy="8" r="7" fill="rgba(0,102,255,0.12)" />
                  <path d="M5 8l2 2 4-4" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {children}

          <button
            onClick={onSelect}
            className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-bold text-white transition-all duration-[250ms] hover:brightness-110 active:scale-[0.98] focus-ring"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {current ? 'Current Plan' : 'Get Started'}
          </button>
        </div>
      </div>
    )
  }

  /* Standard — quiet flat card */
  return (
    <div
      className={`rounded-[--radius-3xl] bg-surface border p-6 flex flex-col gap-5 animate-fade-in transition-all duration-[250ms]
        ${current ? 'border-primary/40' : 'border-[color:var(--color-border)]'}`}
    >
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="font-body text-xs uppercase tracking-widest text-text-muted">{tier}</p>
          {current && (
            <span className="px-2 h-5 rounded-full bg-primary/15 border border-primary/25 font-body text-[10px] font-semibold text-accent flex items-center">
              Active
            </span>
          )}
        </div>
        <p className="font-display text-3xl font-extrabold text-text">{price}</p>
        <p className="font-body text-xs text-text-muted mt-0.5">{period}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2.5 font-body text-sm text-text-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
              <path d="M5 8l2 2 4-4" stroke="#AFC5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {children}

      <button
        onClick={onSelect}
        className={`w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all duration-[250ms] active:scale-[0.98] focus-ring
          ${current
            ? 'bg-surface-hi border border-primary/30 text-text-2 cursor-default'
            : 'bg-surface-hi border border-[color:var(--color-border)] text-text hover:border-primary/40 hover:text-accent'
          }`}
      >
        {current ? 'Current Plan' : 'Select Plan'}
      </button>
    </div>
  )
}

/* Consumer pricing data */
export const consumerPlans: Array<{
  tier: ConsumerTier
  price: string
  features: string[]
  recommended?: boolean
  legendary?: boolean
}> = [
  {
    tier: 'FREE',
    price: '$0',
    features: ['5 transfers / month', 'Basic AI insights', 'Standard support'],
  },
  {
    tier: 'EDGE',
    price: '$9',
    features: ['Unlimited transfers', 'Fina AI assistant', 'Instant notifications', '2 FX currencies'],
  },
  {
    tier: 'PRIME',
    price: '$19',
    features: ['Everything in EDGE', 'Priority support', 'Advanced analytics', '10 FX currencies', 'Goal tracker'],
    recommended: true,
  },
  {
    tier: 'APEX',
    price: '$49',
    features: [
      'Everything in PRIME',
      'Dedicated account manager',
      'All FX currencies',
      'Fina premium coaching',
      'API access',
      'White-glove onboarding',
    ],
    legendary: true,
  },
]

/* Merchant pricing data */
export const merchantPlans: Array<{
  tier: MerchantTier
  price: string
  features: string[]
  recommended?: boolean
  legendary?: boolean
}> = [
  {
    tier: 'STARTUP',
    price: '$0',
    features: ['100 transactions/mo', 'Basic dashboard', 'Email support'],
  },
  {
    tier: 'GROWTH',
    price: '$29',
    features: ['2,000 transactions/mo', 'Aina AI insights', 'Webhook integrations'],
  },
  {
    tier: 'SCALE',
    price: '$79',
    features: ['10,000 transactions/mo', 'Advanced analytics', 'Multi-user access', 'Priority support'],
    recommended: true,
  },
  {
    tier: 'PREMIUM',
    price: '$149',
    features: ['50,000 transactions/mo', 'Custom reporting', 'Dedicated CSM', 'SLA guarantee'],
  },
  {
    tier: 'RETENTION',
    price: '$249',
    features: ['Unlimited transactions', 'Loyalty program tools', 'Churn prediction', 'Revenue analytics'],
  },
  {
    tier: 'ENTERPRISE',
    price: 'Custom',
    features: ['Unlimited everything', 'White-label options', 'On-prem deployment', 'Enterprise SLA', 'Aina executive AI'],
    legendary: true,
  },
]
