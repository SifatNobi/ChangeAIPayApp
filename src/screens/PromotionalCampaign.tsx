import { useState } from 'react'

interface PromoOffer {
  id: string
  badge: string
  headline: string
  subline: string
  bodyLines: string[]
  ctaLabel: string
  expires?: string
  terms?: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
  glowColor: string
}

const OFFERS: Record<string, PromoOffer> = {
  'prime-gift': {
    id: 'prime-gift',
    badge: 'A gift from us',
    headline: 'Three months of Prime — on us',
    subline: "You've been with ChangeAIPay for over a year. Thank you.",
    bodyLines: [
      'Prime includes unlimited transactions with no monthly fee cap, full Fina chat, financial reports, and priority support.',
      "No card required. This is yours — no conditions, no auto-renewal surprises. After the three months, you stay on your current plan.",
    ],
    ctaLabel: 'Activate Prime',
    expires: 'Offer expires Oct 31, 2026',
    terms: 'Complimentary 3-month Prime access. No payment required. Reverts to your current plan automatically after period ends.',
    gradientFrom: '#9945FF',
    gradientTo: '#0066FF',
    accentColor: '#BF8FFF',
    glowColor: 'rgba(153,69,255,0.3)',
  },
  'scale-trial': {
    id: 'scale-trial',
    badge: 'New business accounts',
    headline: '30 days of Scale — free',
    subline: '$0 platform fee. Full business analytics. No commitment.',
    bodyLines: [
      'Try the Scale plan — including Aina for Business, revenue reports, and team access for up to 5 members — at no cost for your first 30 days.',
      "After 30 days, subscribe to Scale at $1,799/yr or revert to pay-as-you-go. No card charged during the trial.",
    ],
    ctaLabel: 'Start free trial',
    expires: 'New business accounts only',
    terms: '30-day trial for new business accounts. Subscription required to continue at trial end.',
    gradientFrom: '#4D9FFF',
    gradientTo: '#3FE7FF',
    accentColor: '#7BC5FF',
    glowColor: 'rgba(63,231,255,0.25)',
  },
}

interface PromotionalCampaignProps {
  onDismiss?: () => void
  onCTA?: (offerId: string) => void
  offerId?: string
}

export default function PromotionalCampaign({
  onDismiss,
  onCTA,
  offerId = 'prime-gift',
}: PromotionalCampaignProps) {
  const offer = OFFERS[offerId] ?? OFFERS['prime-gift']
  const [ctaState, setCtaState] = useState<'idle' | 'activating' | 'done'>('idle')
  const [dismissed, setDismissed] = useState(false)

  const handleCTA = () => {
    setCtaState('activating')
    setTimeout(() => {
      setCtaState('done')
      setTimeout(() => onCTA?.(offer.id), 1200)
    }, 1200)
  }

  const handleDismiss = () => {
    setDismissed(true)
    setTimeout(() => onDismiss?.(), 200)
  }

  return (
    <div
      className="flex flex-col bg-bg transition-opacity duration-200"
      style={{ minHeight: 785, opacity: dismissed ? 0 : 1 }}
    >
      {/* Promotional header — always visible and prominent */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-0 shrink-0">
        <div className="flex-1 flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(153,69,255,0.1)', color: '#BF8FFF', border: '1px solid rgba(153,69,255,0.2)' }}>
            Promotional
          </div>
          <p className="font-body text-[10px] text-text-muted">From ChangeAIPay</p>
        </div>
        {/* Dismiss — always available for promos */}
        <button
          onClick={handleDismiss}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
          aria-label="Dismiss promotion"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Hero gradient card */}
        <div
          className="relative rounded-[--radius-2xl] overflow-hidden px-5 pt-6 pb-5"
          style={{
            background: `linear-gradient(135deg, ${offer.gradientFrom}40 0%, ${offer.gradientTo}25 60%, rgba(0,10,40,0.7) 100%)`,
            border: `1px solid ${offer.accentColor}30`,
            boxShadow: `0 8px 40px ${offer.glowColor}`,
          }}
        >
          {/* Subtle background glow orb */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${offer.gradientFrom}30 0%, transparent 70%)`,
              transform: 'translate(20%, -20%)',
            }}
          />

          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: offer.accentColor, boxShadow: `0 0 6px ${offer.accentColor}` }} />
            <p className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ color: offer.accentColor }}>
              {offer.badge}
            </p>
          </div>

          {/* Headline */}
          <p className="font-display text-2xl font-extrabold text-text leading-tight mb-2">
            {offer.headline}
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            {offer.subline}
          </p>

          {/* Expires */}
          {offer.expires && (
            <p className="font-body text-[10px] mt-3" style={{ color: 'rgba(175,197,255,0.4)' }}>
              {offer.expires}
            </p>
          )}
        </div>

        {/* Body content */}
        <div className="flex flex-col gap-3">
          {offer.bodyLines.map((line, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${offer.accentColor}15` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: offer.accentColor }} />
              </div>
              <p className="font-body text-sm text-text-muted leading-relaxed">{line}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          disabled={ctaState !== 'idle'}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: ctaState === 'done'
              ? 'rgba(34,197,94,0.15)'
              : `linear-gradient(135deg, ${offer.gradientFrom}, ${offer.gradientTo})`,
            color: ctaState === 'done' ? '#22C55E' : 'white',
            border: ctaState === 'done' ? '1px solid rgba(34,197,94,0.25)' : 'none',
            boxShadow: ctaState === 'idle' ? `0 4px 20px ${offer.glowColor}` : 'none',
          }}
        >
          {ctaState === 'activating' ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : ctaState === 'done' ? (
            '✓ Activated'
          ) : offer.ctaLabel}
        </button>

        {/* Not interested */}
        <button onClick={handleDismiss}
          className="w-full h-11 font-body text-sm text-text-muted rounded-[--radius-xl] transition-colors hover:text-text">
          Not interested
        </button>

        {/* Terms */}
        {offer.terms && (
          <p className="font-body text-[10px] text-center leading-relaxed px-3"
            style={{ color: 'rgba(175,197,255,0.3)' }}>
            {offer.terms}
          </p>
        )}
      </div>
    </div>
  )
}
