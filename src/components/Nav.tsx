import { type ReactNode, useRef, useEffect, useState } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'
import finaSrc from '@/imports/Fina.png.jpeg'
import ainaSrc from '@/imports/Aina.png.jpeg'

interface HeaderProps {
  notificationCount?: number
  onNotification?: () => void
}

export function Header({ notificationCount = 0, onNotification }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 h-16 bg-bg/90 backdrop-blur-[8px] border-b border-[color:var(--color-border)] sticky top-0 z-40">
      <div className="h-9 w-9 rounded-full overflow-hidden shrink-0 flex items-center justify-center" style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}>
        <img src={logoSrc} alt="ChangeAIPay" className="w-full h-full object-cover" />
      </div>
      <button
        onClick={onNotification}
        className="relative w-10 h-10 flex items-center justify-center rounded-[--radius-md] text-text-2 hover:text-text hover:bg-surface transition-all focus-ring"
        aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2.5A5.5 5.5 0 0 0 4.5 8v2.5L3 13h14l-1.5-2.5V8A5.5 5.5 0 0 0 10 2.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 13v.5a2 2 0 0 0 4 0V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {notificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
        )}
      </button>
    </header>
  )
}

/* ── Bottom navigation ─────────────────────────────────────────── */
type NavItem = 'home' | 'payments' | 'subscription' | 'ai' | 'requests' | 'history' | 'profile'

interface BottomNavProps {
  active?: NavItem
  onChange?: (item: NavItem) => void
  accountType?: 'personal' | 'business'
}

const NAV_ITEMS: { id: NavItem; label: string; icon: ReactNode }[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 8.5L10 3l7 5.5V17H13v-4H7v4H3V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'payments',
    label: 'Pay',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="5.5" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2.5 9h15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'subscription',
    label: 'Plans',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l2 5.5h5.5l-4.5 3.5 1.5 5.5L10 14l-4.5 3 1.5-5.5L2.5 8H8l2-5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI',
    icon: null,
  },
  {
    id: 'requests',
    label: 'Requests',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3.5v13M3.5 10h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'history',
    label: 'History',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 17c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

/*
 * Spring-cubic approximation — gives a satisfying overshoot feel without
 * a JS spring library. Used for both the rising and settling transitions.
 */
const SPRING_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
const SETTLE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface BubbleItemProps {
  item: (typeof NAV_ITEMS)[number]
  isActive: boolean
  wasActive: boolean
  onClick: () => void
}

function BubbleItem({ item, isActive, wasActive, onClick }: BubbleItemProps) {
  /*
   * The bubble div sits absolutely above the item's slot.
   * Active → translateY(-22px) with spring ease (rise).
   * Deactivating → translateY(0) with settle ease (fall back).
   * Inactive-and-never-active → no animation needed.
   */
  const shouldAnimate = isActive || wasActive

  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      className="relative flex flex-col items-center justify-end focus-ring rounded-full"
      style={{ minWidth: 40, height: 52, paddingBottom: 4 }}
    >
      {/* Elevated bubble */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: 44,
          height: 44,
          borderRadius: '50%',
          transform: `translateX(-50%) translateY(${isActive ? '-18px' : '0px'})`,
          transition: shouldAnimate
            ? `transform 380ms ${isActive ? SPRING_EASE : SETTLE_EASE}, opacity 220ms ease, box-shadow 300ms ease`
            : 'none',
          // Frosted glass distinct from bar material
          background: isActive
            ? 'rgba(175,197,255,0.14)'
            : 'transparent',
          backdropFilter: isActive ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isActive ? 'blur(20px)' : 'none',
          border: isActive ? '1px solid rgba(175,197,255,0.22)' : 'none',
          boxShadow: isActive
            ? '0 8px 24px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)'
            : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: isActive ? 2 : 1,
        }}
      >
        <span style={{ color: isActive ? 'var(--color-accent)' : 'transparent', transition: 'color 200ms ease' }}>
          {item.icon}
        </span>
      </div>

      {/* Flush icon — visible only when inactive (fades out as bubble rises) */}
      <span
        style={{
          color: 'rgba(175,197,255,0.45)',
          opacity: isActive ? 0 : 1,
          transition: 'opacity 180ms ease',
          position: 'relative',
          zIndex: 1,
          marginBottom: 2,
        }}
      >
        {item.icon}
      </span>

      {/* Label — always rendered, fades when active (icon-only in bubble) */}
      <span
        className="font-body text-[9px] font-medium"
        style={{
          color: isActive ? 'var(--color-accent)' : 'rgba(175,197,255,0.45)',
          opacity: isActive ? 0.8 : 0.6,
          transition: 'color 250ms ease, opacity 250ms ease',
          lineHeight: 1,
        }}
      >
        {item.label}
      </span>
    </button>
  )
}

export function BottomNav({ active = 'home', onChange, accountType = 'personal' }: BottomNavProps) {
  // Track which item was previously active so we can apply settle animation
  const prevActiveRef = useRef<NavItem>(active)
  const [prevActive, setPrevActive] = useState<NavItem>(active)

  useEffect(() => {
    if (active !== prevActiveRef.current) {
      setPrevActive(prevActiveRef.current)
      prevActiveRef.current = active
      // Clear "was active" state after animation completes
      const t = setTimeout(() => setPrevActive(active), 420)
      return () => clearTimeout(t)
    }
  }, [active])

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 flex items-end justify-around px-2 rounded-[28px] bg-surface/90 backdrop-blur-[20px]"
      style={{
        paddingBottom: 8,
        paddingTop: 6,
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(175,197,255,0.12)',
        overflow: 'visible',
      }}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(item => {
        if (item.id === 'ai') {
          const isAiActive = active === 'ai'
          return (
            <button
              key="ai"
              onClick={() => onChange?.('ai')}
              className="relative flex flex-col items-center focus-ring rounded-full"
              aria-label="AI Assistant"
              aria-current={isAiActive ? 'page' : undefined}
              style={{
                marginBottom: 4,
                transform: `translateY(${isAiActive ? '-20px' : '-18px'})`,
                transition: `transform 380ms ${isAiActive ? SPRING_EASE : SETTLE_EASE}`,
              }}
            >
              <div
                className="w-[52px] h-[52px] rounded-full overflow-hidden"
                style={{
                  border: `2px solid ${isAiActive ? 'var(--color-accent)' : 'rgba(0,102,255,0.5)'}`,
                  boxShadow: isAiActive
                    ? '0 0 0 4px rgba(0,102,255,0.15), 0 8px 24px rgba(0,102,255,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                    : '0 4px 16px rgba(0,0,0,0.35)',
                  transition: 'box-shadow 300ms ease, border-color 250ms ease',
                  background: 'linear-gradient(135deg, #0066FF, #3FE7FF)',
                }}
              >
                <img
                  src={accountType === 'business' ? ainaSrc : finaSrc}
                  alt={accountType === 'business' ? 'Aina — Business AI' : 'Fina — Personal AI'}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="font-body text-[9px] font-medium mt-1"
                style={{ color: isAiActive ? 'var(--color-accent)' : 'rgba(175,197,255,0.55)' }}
              >
                {accountType === 'business' ? 'Aina' : 'Fina'}
              </span>
            </button>
          )
        }

        return (
          <BubbleItem
            key={item.id}
            item={item}
            isActive={active === item.id}
            wasActive={prevActive === item.id && active !== item.id}
            onClick={() => onChange?.(item.id)}
          />
        )
      })}
    </nav>
  )
}

/* ── Merchant bottom nav (6 items + Aina center) ──────────────── */
export type MerchantNavItem = 'home' | 'payments' | 'plans' | 'insights' | 'requests' | 'ai' | 'profile'

interface MerchantBottomNavProps {
  active?: MerchantNavItem
  onChange?: (item: MerchantNavItem) => void
}

const MERCHANT_NAV_ITEMS: { id: MerchantNavItem; label: string; icon: ReactNode }[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2.5 7.5L9 2.5l6.5 5V16H12v-3.5H6V16H2.5V7.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'payments',
    label: 'Pay',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 8h14" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: 'plans',
    label: 'Plans',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2l1.8 5h5.2l-4.2 3.1 1.6 5L9 12.5l-4.4 2.6 1.6-5L2 7h5.2L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  { id: 'ai', label: 'Aina', icon: null },
  {
    id: 'requests',
    label: 'Requests',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2.5 13l3.5-4.5 3.5 2.5 3.5-5.5 2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 16c0-3 2.9-5.5 6.5-5.5s6.5 2.5 6.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function MerchantBottomNav({ active = 'home', onChange }: MerchantBottomNavProps) {
  const prevActiveRef = useRef<MerchantNavItem>(active)
  const [prevActive, setPrevActive] = useState<MerchantNavItem>(active)

  useEffect(() => {
    if (active !== prevActiveRef.current) {
      setPrevActive(prevActiveRef.current)
      prevActiveRef.current = active
      const t = setTimeout(() => setPrevActive(active), 420)
      return () => clearTimeout(t)
    }
  }, [active])

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 flex items-end justify-around px-2 rounded-[28px] bg-surface/90 backdrop-blur-[20px]"
      style={{
        paddingBottom: 8,
        paddingTop: 6,
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(175,197,255,0.12)',
        overflow: 'visible',
      }}
      aria-label="Merchant navigation"
    >
      {MERCHANT_NAV_ITEMS.map(item => {
        if (item.id === 'ai') {
          const isActive = active === 'ai'
          return (
            <button
              key="ai"
              onClick={() => onChange?.('ai')}
              className="relative flex flex-col items-center focus-ring rounded-full"
              aria-label="Aina — Business AI"
              aria-current={isActive ? 'page' : undefined}
              style={{
                marginBottom: 4,
                transform: `translateY(${isActive ? '-20px' : '-18px'})`,
                transition: `transform 380ms ${isActive ? SPRING_EASE : SETTLE_EASE}`,
              }}
            >
              <div
                className="w-[52px] h-[52px] rounded-full overflow-hidden"
                style={{
                  border: `2px solid ${isActive ? 'var(--color-accent)' : 'rgba(0,102,255,0.5)'}`,
                  boxShadow: isActive
                    ? '0 0 0 4px rgba(0,102,255,0.15), 0 8px 24px rgba(0,102,255,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                    : '0 4px 16px rgba(0,0,0,0.35)',
                  transition: 'box-shadow 300ms ease, border-color 250ms ease',
                  background: 'linear-gradient(135deg, #0066FF, #3FE7FF)',
                }}
              >
                <img src={ainaSrc} alt="Aina — Business AI" className="w-full h-full object-cover" />
              </div>
              <span
                className="font-body text-[9px] font-medium mt-1"
                style={{ color: isActive ? 'var(--color-accent)' : 'rgba(175,197,255,0.55)' }}
              >
                Aina
              </span>
            </button>
          )
        }

        const isActive = active === item.id
        const wasActive = prevActive === item.id && active !== item.id

        return (
          <BubbleItem
            key={item.id}
            item={item as (typeof NAV_ITEMS)[number]}
            isActive={isActive}
            wasActive={wasActive}
            onClick={() => onChange?.(item.id)}
          />
        )
      })}
    </nav>
  )
}
