export type TierName = 'Startup' | 'Growth' | 'Scale' | 'Premium' | 'Retention' | 'Enterprise'

export interface MerchantTier {
  name: TierName
  apvRange: string
  apvMin: number
  apvMax: number | null
  standardFee: number
  annualPrice: number
  monthlyEquiv: number
  fxSpread: number
  teamMembers: string
  features: string[]
  color: string
  glowColor: string
  bgColor: string
  borderColor: string
  badge?: string
}

export const MERCHANT_TIERS: MerchantTier[] = [
  {
    name: 'Startup',
    apvRange: 'Up to $10K/yr',
    apvMin: 0,
    apvMax: 10000,
    standardFee: 1.25,
    annualPrice: 99,
    monthlyEquiv: 8.25,
    fxSpread: 1.00,
    teamMembers: '1 member',
    features: [
      'AI Revenue Booster (basic sales pattern insights)',
      'Basic Cash Flow Predictor',
      'Smart transcripts + money monitoring',
      'Entry analytics dashboard',
      'Payment speaker or message',
      'AI note taking',
    ],
    color: 'rgba(175,197,255,0.8)',
    glowColor: 'rgba(175,197,255,0.2)',
    bgColor: 'rgba(175,197,255,0.05)',
    borderColor: 'rgba(175,197,255,0.14)',
  },
  {
    name: 'Growth',
    apvRange: '$10K–$50K/yr',
    apvMin: 10000,
    apvMax: 50000,
    standardFee: 1.75,
    annualPrice: 399,
    monthlyEquiv: 33.25,
    fxSpread: 0.85,
    teamMembers: 'Up to 3',
    features: [
      'AI Revenue Booster (basic sales pattern insights)',
      'Basic Cash Flow Predictor',
      'Smart transcripts + money monitoring',
      'Entry analytics dashboard',
      'Payment speaker or message',
      'AI note taking',
      'Auto-Personalized Marketing',
      'AI Upsell Assistant',
      'Improved pricing suggestions',
      'Customer re-engagement starter tools',
    ],
    color: '#3FE7FF',
    glowColor: 'rgba(63,231,255,0.25)',
    bgColor: 'rgba(63,231,255,0.05)',
    borderColor: 'rgba(63,231,255,0.18)',
  },
  {
    name: 'Scale',
    apvRange: '$50K–$100K/yr',
    apvMin: 50000,
    apvMax: 250000,
    standardFee: 2.25,
    annualPrice: 799,
    monthlyEquiv: 66.58,
    fxSpread: 0.70,
    teamMembers: 'Up to 5',
    features: [
      'AI Revenue Booster (basic sales pattern insights)',
      'Basic Cash Flow Predictor',
      'Smart transcripts + money monitoring',
      'Entry analytics dashboard',
      'Payment speaker or message',
      'AI note taking',
      'Auto-Personalized Marketing',
      'AI Upsell Assistant',
      'Improved pricing suggestions',
      'Customer re-engagement starter tools',
      'Smart Pricing Engine',
      'Customer Lifetime Value Predictor',
      'Full Business Health Intelligence Dashboard',
      'Stronger Cash Flow Predictor',
    ],
    color: '#4D9FFF',
    glowColor: 'rgba(0,102,255,0.3)',
    bgColor: 'rgba(0,102,255,0.07)',
    borderColor: 'rgba(0,102,255,0.22)',
  },
  {
    name: 'Premium',
    apvRange: '$250K–$1M/yr',
    apvMin: 250000,
    apvMax: 1000000,
    standardFee: 2.50,
    annualPrice: 999.99,
    monthlyEquiv: 83.33,
    fxSpread: 0.60,
    teamMembers: 'Up to 10',
    features: [
      'AI Revenue Booster (basic sales pattern insights)',
      'Basic Cash Flow Predictor',
      'Smart transcripts + money monitoring',
      'Entry analytics dashboard',
      'Payment speaker or message',
      'AI note taking',
      'Auto-Personalized Marketing',
      'AI Upsell Assistant',
      'Improved pricing suggestions',
      'Customer re-engagement starter tools',
      'Smart Pricing Engine',
      'Customer Lifetime Value Predictor',
      'Full Business Health Intelligence Dashboard',
      'Stronger Cash Flow Predictor',
      'AI Customer Recovery System',
      'Dynamic demand pricing',
      'Advanced churn prevention',
      'Priority support + premium analytics',
    ],
    color: '#9945FF',
    glowColor: 'rgba(153,69,255,0.3)',
    bgColor: 'rgba(153,69,255,0.07)',
    borderColor: 'rgba(153,69,255,0.22)',
    badge: 'Most Popular',
  },
  {
    name: 'Retention',
    apvRange: '$1M–$5M/yr',
    apvMin: 1000000,
    apvMax: 5000000,
    standardFee: 2.35,
    annualPrice: 2999.99,
    monthlyEquiv: 249.99,
    fxSpread: 0.50,
    teamMembers: 'Up to 20',
    features: [
      'AI Revenue Booster (basic sales pattern insights)',
      'Basic Cash Flow Predictor',
      'Smart transcripts + money monitoring',
      'Entry analytics dashboard',
      'Payment speaker or message',
      'AI note taking',
      'Auto-Personalized Marketing',
      'AI Upsell Assistant',
      'Improved pricing suggestions',
      'Customer re-engagement starter tools',
      'Smart Pricing Engine',
      'Customer Lifetime Value Predictor',
      'Full Business Health Intelligence Dashboard',
      'Stronger Cash Flow Predictor',
      'AI Customer Recovery System',
      'Dynamic demand pricing',
      'Advanced churn prevention',
      'Priority support + premium analytics',
      'Retention-focused AI campaigns',
      'Dedicated profitability optimization models',
      'Lower FX pricing to reduce churn',
    ],
    color: '#F5B700',
    glowColor: 'rgba(245,183,0,0.3)',
    bgColor: 'rgba(245,183,0,0.06)',
    borderColor: 'rgba(245,183,0,0.22)',
  },
  {
    name: 'Enterprise',
    apvRange: '$5M+/yr',
    apvMin: 5000000,
    apvMax: null,
    standardFee: 2.20,
    annualPrice: 4999.99,
    monthlyEquiv: 416.67,
    fxSpread: 0.45,
    teamMembers: 'Unlimited',
    features: [
      'AI Revenue Booster (basic sales pattern insights)',
      'Basic Cash Flow Predictor',
      'Smart transcripts + money monitoring',
      'Entry analytics dashboard',
      'Payment speaker or message',
      'AI note taking',
      'Auto-Personalized Marketing',
      'AI Upsell Assistant',
      'Improved pricing suggestions',
      'Customer re-engagement starter tools',
      'Smart Pricing Engine',
      'Customer Lifetime Value Predictor',
      'Full Business Health Intelligence Dashboard',
      'Stronger Cash Flow Predictor',
      'AI Customer Recovery System',
      'Dynamic demand pricing',
      'Advanced churn prevention',
      'Priority support + premium analytics',
      'Retention-focused AI campaigns',
      'Dedicated profitability optimization models',
      'Lower FX pricing to reduce churn',
      'AI call handling and messaging',
      'Custom AI workflow automation',
      'Enterprise infrastructure licensing',
      'Dedicated fraud intelligence models',
      'API customization + private routing logic',
      'Strategic account management',
    ],
    color: '#FFB830',
    glowColor: 'rgba(255,184,48,0.32)',
    bgColor: 'rgba(255,184,48,0.06)',
    borderColor: 'rgba(255,184,48,0.24)',
    badge: 'Legendary',
  },
]

export function getRecommendedTier(annualVolume: number): MerchantTier {
  return (
    MERCHANT_TIERS.find(t => annualVolume >= t.apvMin && (t.apvMax === null || annualVolume < t.apvMax))
    ?? MERCHANT_TIERS[MERCHANT_TIERS.length - 1]
  )
}

export function calcStandardFees(volume: number, feePercent: number): number {
  return (volume * feePercent) / 100
}

export function calcAnnualSavings(volume: number, tier: MerchantTier): number {
  return calcStandardFees(volume, tier.standardFee) - tier.annualPrice
}

export function fmt(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n.toFixed(2)}`
}
