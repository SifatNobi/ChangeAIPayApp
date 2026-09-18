import { useState, useRef, useCallback } from 'react'
import { Header, BottomNav } from '@/components/Nav'

type PlanTier = 'free' | 'edge' | 'prime' | 'apex'

interface SubscriptionPlansProps {
  accountType?: 'personal' | 'business'
  currentPlan?: PlanTier
  kycComplete?: boolean
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotifications?: () => void
  onSelectPlan?: (plan: PlanTier) => void
  onVerify?: () => void
}

/* ── Plan data ─────────────────────────────────────────────── */
const PLANS = [
  {
    id: 'free' as PlanTier,
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'Perfect for personal users getting started.',
    note: 'Requires KYC + phone verification to transact.',
    fxFee: '1.45%',
    monthlyVolume: 'Up to $400/month',
    features: [
      'AI Finance Chat (Basic)',
      'Send & Request Money',
      'Basic Fraud Alerts',
      'Smart Payment Transcripts',
    ],
    treatment: 'standard',
    ctaLabel: (kycComplete: boolean) => kycComplete ? 'Your Current Plan' : 'Complete Verification',
    checkColor: '#AFC5FF',
    cardGradient: 'linear-gradient(145deg, rgba(13,26,74,0.95) 0%, rgba(5,11,45,0.98) 100%)',
    borderColor: 'rgba(175,197,255,0.14)',
    glowColor: 'transparent',
  },
  {
    id: 'edge' as PlanTier,
    name: 'Edge',
    price: '$24.99',
    period: '/month',
    tagline: 'Everything in Free, plus smart AI tools.',
    note: 'FX-free first $1,500/month, then 0.95%',
    fxFee: '0.95% (after $1,500)',
    monthlyVolume: 'FX-free up to $1,500/month',
    features: [
      'Full AI Assistant',
      'Fraud Protection',
      'Smart Payment Routing',
      'Predictive Reminders',
      'Spending Alerts',
      'Payment Speaker / Message',
      'AI Note Taking',
    ],
    treatment: 'standard',
    ctaLabel: () => 'Get Edge',
    checkColor: '#3FE7FF',
    cardGradient: 'linear-gradient(145deg, rgba(0,50,100,0.9) 0%, rgba(5,11,45,0.98) 100%)',
    borderColor: 'rgba(63,231,255,0.2)',
    glowColor: 'transparent',
  },
  {
    id: 'prime' as PlanTier,
    name: 'Prime',
    price: '$39.99',
    period: '/month',
    tagline: 'Everything in Edge, plus smarter AI tools.',
    note: 'FX-free first $3,000/month, then 0.72%',
    fxFee: '0.72% (after $3,000)',
    monthlyVolume: 'FX-free up to $3,000/month',
    features: [
      'AI-assisted financial insights',
      'Smart Undo Payments',
      'Smart contact suggestions',
      'Advanced Fraud Detection',
      'AI-powered budget suggestions',
    ],
    treatment: 'popular',
    ctaLabel: () => 'Get Prime',
    checkColor: '#3FE7FF',
    cardGradient: 'linear-gradient(145deg, rgba(0,30,80,0.95) 0%, rgba(0,60,140,0.6) 60%, rgba(5,11,45,0.98) 100%)',
    borderColor: '#0066FF',
    glowColor: 'rgba(0,102,255,0.35)',
  },
  {
    id: 'apex' as PlanTier,
    name: 'Apex',
    price: '$64.99',
    period: '/month',
    tagline: 'Everything in Prime, plus expanded AI capabilities.',
    note: 'FX-free first $6,000/month, then 0.58%',
    fxFee: '0.58% (after $6,000)',
    monthlyVolume: 'FX-free up to $6,000/month',
    features: [
      'AI-assisted payment automation',
      'AI-assisted expense optimisation',
      'Life Event Mode',
      'Priority Smart Routing',
      'Booking + Pay Workflows',
    ],
    treatment: 'legendary',
    ctaLabel: () => 'Get Apex',
    checkColor: '#F5B700',
    cardGradient: 'linear-gradient(145deg, rgba(50,35,0,0.95) 0%, rgba(90,60,0,0.6) 50%, rgba(5,11,45,0.98) 100%)',
    borderColor: '#F5B700',
    glowColor: 'rgba(245,183,0,0.3)',
  },
]

/* ── Animated rotating border for Prime ─────────────────────── */
function RotatingBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-[1.5px] rounded-[32px]" style={{ background: 'transparent' }}>
      {/* Animated conic gradient ring */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{
          background: 'conic-gradient(from 0deg, #0066FF, #3FE7FF, #AFC5FF, #0066FF)',
          animation: 'gradient-rotate 3s linear infinite',
        }}
      />
      <div className="relative rounded-[30.5px] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

/* ── Gold static border for Apex ───────────────────────────── */
function GoldBorder({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative p-[1.5px] rounded-[32px]"
      style={{
        background: 'linear-gradient(135deg, #F5B700 0%, #FFE066 40%, #C98A00 70%, #F5B700 100%)',
        boxShadow: '0 0 32px rgba(245,183,0,0.25), 0 0 8px rgba(245,183,0,0.15)',
      }}
    >
      <div className="rounded-[30.5px] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

/* ── Plan card ───────────────────────────────────────────────── */
function PlanCard({
  plan, isCurrent, kycComplete, onSelect, onVerify,
}: {
  plan: typeof PLANS[0]
  isCurrent: boolean
  kycComplete: boolean
  onSelect: () => void
  onVerify: () => void
}) {
  const [pressed, setPressed] = useState(false)

  const card = (
    <div
      className="flex flex-col gap-5 p-6"
      style={{
        background: plan.cardGradient,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        minHeight: 520,
      }}
    >
      {/* Top: badge + plan name */}
      <div className="flex items-start justify-between mt-2">
        <div>
          {/* Treatment badge */}
          {plan.treatment === 'popular' && (
            <div
              className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full mb-2 animate-fade-in"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1l1.5 3h3l-2.5 2 1 3L5 7.5 2 9l1-3-2.5-2h3L5 1Z"
                  fill="white" />
              </svg>
              <span className="font-body text-[10px] font-bold text-white">Most Popular</span>
            </div>
          )}
          {plan.treatment === 'legendary' && (
            <div
              className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full mb-2 animate-fade-in"
              style={{ background: 'var(--gradient-legendary)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8l1.5-5 2 3.5 2-3.5 1.5 5H2Z" fill="#050B2D" />
              </svg>
              <span className="font-body text-[10px] font-bold text-bg">Legendary</span>
            </div>
          )}
          {isCurrent && (
            <div
              className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full mb-2"
              style={{ background: 'rgba(175,197,255,0.12)', border: '1px solid rgba(175,197,255,0.25)' }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" fill="#3FE7FF" />
              </svg>
              <span className="font-body text-[10px] font-semibold text-accent">Active</span>
            </div>
          )}
          <p className="font-body text-xs uppercase tracking-widest text-text-muted">{plan.name}</p>
        </div>
        {/* FX badge */}
        <div
          className="px-2 py-1 rounded-xl text-right"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-[9px] text-text-muted leading-tight">FX fee</p>
          <p className="font-mono text-[11px] font-bold"
            style={{ color: plan.treatment === 'legendary' ? '#F5B700' : plan.treatment === 'popular' ? '#3FE7FF' : '#AFC5FF' }}>
            {plan.fxFee}
          </p>
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex items-end gap-1">
          <p
            className="font-display font-extrabold tracking-tight leading-none"
            style={{
              fontSize: 44,
              background: plan.treatment === 'legendary'
                ? 'var(--gradient-legendary)'
                : plan.treatment === 'popular'
                ? 'var(--gradient-primary)'
                : 'white',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {plan.price}
          </p>
          <p className="font-body text-sm text-text-muted mb-1.5">{plan.period}</p>
        </div>
        <p className="font-body text-xs text-text-muted mt-1 leading-relaxed">{plan.tagline}</p>
      </div>

      {/* Volume pill */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-[--radius-xl]"
        style={{
          background: plan.treatment === 'legendary'
            ? 'rgba(245,183,0,0.07)'
            : plan.treatment === 'popular'
            ? 'rgba(0,102,255,0.1)'
            : 'rgba(175,197,255,0.05)',
          border: `1px solid ${plan.treatment === 'legendary' ? 'rgba(245,183,0,0.18)' : plan.treatment === 'popular' ? 'rgba(63,231,255,0.2)' : 'rgba(175,197,255,0.1)'}`,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke={plan.checkColor} strokeWidth="1" strokeOpacity="0.7" />
          <path d="M3.5 6l2 2 3-3" stroke={plan.checkColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-body text-xs font-semibold" style={{ color: plan.checkColor }}>{plan.monthlyVolume}</p>
      </div>

      {/* Feature list */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2.5">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0 mt-[1px]">
              <circle cx="7.5" cy="7.5" r="6.5"
                fill={plan.treatment === 'legendary' ? 'rgba(245,183,0,0.1)' : plan.treatment === 'popular' ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.05)'} />
              <path d="M4.5 7.5l2.2 2.2 3.8-4" stroke={plan.checkColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-body text-sm text-text-2 leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      {/* KYC note */}
      <p className="font-body text-[10px] text-text-muted leading-relaxed">{plan.note}</p>

      {/* CTA */}
      <button
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onClick={plan.id === 'free' && !kycComplete ? onVerify : onSelect}
        disabled={isCurrent && kycComplete}
        className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold flex items-center justify-center gap-2 transition-all duration-[180ms] focus-ring"
        style={{
          transform: pressed ? 'scale(0.96)' : 'scale(1)',
          boxShadow: pressed ? 'none' : plan.treatment === 'legendary'
            ? '0 4px 20px rgba(245,183,0,0.25)'
            : plan.treatment === 'popular'
            ? '0 4px 20px rgba(0,102,255,0.3)'
            : 'none',
          background: isCurrent && kycComplete
            ? 'rgba(175,197,255,0.08)'
            : plan.treatment === 'legendary'
            ? 'var(--gradient-legendary)'
            : plan.treatment === 'popular'
            ? 'var(--gradient-primary)'
            : plan.id === 'free' && !kycComplete
            ? 'rgba(245,158,11,0.15)'
            : 'rgba(175,197,255,0.1)',
          border: isCurrent && kycComplete
            ? '1px solid rgba(175,197,255,0.15)'
            : plan.id === 'free' && !kycComplete
            ? '1px solid rgba(245,158,11,0.3)'
            : plan.treatment === 'standard'
            ? `1px solid ${plan.borderColor}`
            : 'none',
          color: isCurrent && kycComplete
            ? 'var(--color-text-muted)'
            : plan.treatment === 'legendary'
            ? '#050B2D'
            : plan.id === 'free' && !kycComplete
            ? '#F59E0B'
            : 'white',
          cursor: isCurrent && kycComplete ? 'default' : 'pointer',
        }}
      >
        {isCurrent && kycComplete ? (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Current Plan
          </>
        ) : plan.id === 'free' && !kycComplete ? (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 3.3v5C2 11 4 13 7 14c3-1 5-3 5-5.7V3.3L7 1Z"
                stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Complete Verification
          </>
        ) : (
          plan.ctaLabel(kycComplete)
        )}
      </button>
    </div>
  )

  if (plan.treatment === 'legendary') {
    return <GoldBorder>{card}</GoldBorder>
  }
  if (plan.treatment === 'popular') {
    return <RotatingBorder>{card}</RotatingBorder>
  }
  return (
    <div
      className="rounded-[32px] overflow-hidden"
      style={{ border: `1px solid ${plan.borderColor}` }}
    >
      {card}
    </div>
  )
}

/* ── Screen ──────────────────────────────────────────────────── */
export default function SubscriptionPlans({
  accountType = 'personal',
  currentPlan = 'free',
  kycComplete = false,
  onNavigate,
  onBack,
  onNotifications,
  onSelectPlan,
  onVerify,
}: SubscriptionPlansProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const dragStartX = useRef<number | null>(null)
  const dragStartIndex = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const CARD_WIDTH = 330  // px, cards are 330 wide with gap between
  const TOTAL = PLANS.length

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    dragStartIndex.current = activeIndex
    setIsDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [activeIndex])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    setDragOffset(delta)
  }, [])

  const handlePointerUp = useCallback(() => {
    if (dragStartX.current === null) return
    const threshold = CARD_WIDTH * 0.25
    let next = dragStartIndex.current
    if (dragOffset < -threshold && next < TOTAL - 1) next++
    else if (dragOffset > threshold && next > 0) next--
    setActiveIndex(next)
    setDragOffset(0)
    setIsDragging(false)
    dragStartX.current = null
  }, [dragOffset, TOTAL])

  const translateX = -(activeIndex * (CARD_WIDTH + 16)) + dragOffset

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={0} onNotification={onNotifications} />

      <div className="overflow-y-auto flex-1 pb-24" style={{ scrollbarWidth: 'none' }}>
        {/* Header row */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-1">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight leading-tight">
              Choose Your Plan
            </h1>
            <p className="font-body text-xs text-text-muted">All plans · monthly billing</p>
          </div>
        </div>

        {/* Swipeable carousel */}
        <div className="relative mt-4 mb-2" style={{ height: 580 }}>
          <div
            ref={containerRef}
            className="absolute inset-0 flex items-start select-none"
            style={{ touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div
              className="flex gap-4 pl-[30px]"
              style={{
                transform: `translateX(${translateX}px)`,
                transition: isDragging ? 'none' : 'transform 0.42s cubic-bezier(0.34,1.56,0.64,1)',
                willChange: 'transform',
              }}
            >
              {PLANS.map((plan, i) => (
                <div
                  key={plan.id}
                  style={{
                    width: CARD_WIDTH,
                    flexShrink: 0,
                    transition: isDragging ? 'none' : 'opacity 0.3s, transform 0.3s',
                    opacity: i === activeIndex ? 1 : 0.55,
                    transform: i === activeIndex ? 'scale(1)' : 'scale(0.95)',
                    pointerEvents: i === activeIndex ? 'auto' : 'none',
                  }}
                >
                  <PlanCard
                    plan={plan}
                    isCurrent={plan.id === currentPlan}
                    kycComplete={kycComplete}
                    onSelect={() => onSelectPlan?.(plan.id)}
                    onVerify={() => onVerify?.()}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-1 mb-4">
          {PLANS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="transition-all duration-300"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeIndex ? 'var(--color-accent)' : 'rgba(175,197,255,0.2)',
              }}
              aria-label={`Go to ${PLANS[i].name}`}
            />
          ))}
        </div>

        {/* Plan name label beneath dots */}
        <p className="text-center font-display text-sm font-bold text-text-2 tracking-tight mb-4">
          {PLANS[activeIndex].name} Plan
        </p>

        {/* Comparison footnote */}
        <div className="mx-5 rounded-[--radius-xl] px-4 py-3 flex flex-col gap-1"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}>
          <p className="font-body text-xs text-text-muted text-center leading-relaxed">
            All plans require completed KYC + phone verification to transact. No annual commitment — cancel any time.
          </p>
        </div>
      </div>

      <BottomNav active="subscription" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
