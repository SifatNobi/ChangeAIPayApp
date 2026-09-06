import { useState, useRef, useEffect } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { WalletCard, TransactionRow, Chip } from '@/components/Card'
import { SkeletonWalletCard, SkeletonTransactionList } from '@/components/States'
import Pulse from '@/components/Pulse'
import finaSrc from '@/imports/Fina.png.jpeg'
import ainaSrc from '@/imports/Aina.png.jpeg'

type KYCStatus = 'incomplete' | 'pending' | 'complete'
type Plan      = 'free' | 'edge' | 'prime' | 'apex'

interface HomeProps {
  userName?: string
  accountType?: 'personal' | 'business'
  kycStatus?: KYCStatus
  plan?: Plan
  currentNav?: string
  onNavigate: (tab: string) => void
  onSend?: () => void
  onRequest?: () => void
  onAddMoney?: () => void
  onScan?: () => void
  onSeeAllTransactions?: () => void
  onNotifications?: () => void
  onVerify?: () => void
  onUpgrade?: (recommendedPlan?: 'prime' | 'apex') => void
  onWalletDetail?: () => void
  highVolume?: boolean
}

/* ── Mock data ───────────────────────────────────────────────── */
const MOCK_TX = [
  {
    icon: <span className="text-lg">🥗</span>,
    merchant: 'Pret A Manger',
    category: 'Food & Drink',
    amount: '$8.50',
    date: 'Today',
    status: 'completed' as const,
    positive: false,
  },
  {
    icon: <span className="text-lg">🎬</span>,
    merchant: 'Netflix',
    category: 'Entertainment',
    amount: '$15.99',
    date: 'Yesterday',
    status: 'completed' as const,
    positive: false,
  },
  {
    icon: <span className="text-lg">💰</span>,
    merchant: 'Incoming Transfer',
    category: 'Income',
    amount: '$500.00',
    date: '2 days ago',
    status: 'completed' as const,
    positive: true,
  },
  {
    icon: <span className="text-lg">🛒</span>,
    merchant: 'Whole Foods',
    category: 'Groceries',
    amount: '$62.14',
    date: '3 days ago',
    status: 'completed' as const,
    positive: false,
  },
]

const SPENDING_CATS = [
  { name: 'Food & Drink', amount: 84,  pct: 42, color: '#0066FF' },
  { name: 'Transport',    amount: 52,  pct: 26, color: '#3FE7FF' },
  { name: 'Shopping',     amount: 38,  pct: 19, color: '#AFC5FF' },
  { name: 'Other',        amount: 26,  pct: 13, color: 'rgba(175,197,255,0.3)' },
]

/* ── Floating speed-dial quick actions ───────────────────────── */
interface SpeedDialProps {
  onSend?: () => void
  onRequest?: () => void
  onAddMoney?: () => void
  onScan?: () => void
}

function SpeedDial({ onSend, onRequest, onAddMoney, onScan }: SpeedDialProps) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-collapse after 4s of inactivity
  useEffect(() => {
    if (open) {
      timerRef.current = setTimeout(() => setOpen(false), 4000)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [open])

  const handle = (fn?: () => void) => {
    setOpen(false)
    fn?.()
  }

  const ACTIONS = [
    {
      label: 'Send',
      onClick: () => handle(onSend),
      color: '#0066FF',
      glow: 'rgba(0,102,255,0.45)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 14V4M4 9l5-5 5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: 'Request',
      onClick: () => handle(onRequest),
      color: '#9945FF',
      glow: 'rgba(153,69,255,0.4)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 4v10M4 9l5 5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: 'Add',
      onClick: () => handle(onAddMoney),
      color: '#00D26A',
      glow: 'rgba(0,210,106,0.4)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 4v10M4 9h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'Scan',
      onClick: () => handle(onScan),
      color: '#3FE7FF',
      glow: 'rgba(63,231,255,0.4)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 6V3h3M12 3h3v3M2 12v3h3M12 15h3v-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="5" y="5" width="8" height="8" rx="1" stroke="white" strokeWidth="1.2" strokeDasharray="2 1.5" />
        </svg>
      ),
    },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 100,
        zIndex: 48,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Action items — expand upward */}
      {ACTIONS.map((action, i) => (
        <div
          key={action.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0) scale(1)' : `translateY(${(ACTIONS.length - i) * 12}px) scale(0.7)`,
            transition: `opacity 220ms ease ${open ? i * 45 : (ACTIONS.length - 1 - i) * 30}ms, transform 280ms cubic-bezier(0.34,1.56,0.64,1) ${open ? i * 45 : (ACTIONS.length - 1 - i) * 30}ms`,
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {/* Label pill */}
          <div
            style={{
              background: 'rgba(10,16,52,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(175,197,255,0.15)',
              borderRadius: 20,
              padding: '4px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="font-body text-xs font-semibold" style={{ color: action.color }}>{action.label}</span>
          </div>
          {/* Action button */}
          <button
            onClick={action.onClick}
            className="flex items-center justify-center transition-all active:scale-90"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: action.color,
              boxShadow: `0 4px 16px ${action.glow}, 0 2px 6px rgba(0,0,0,0.3)`,
              border: '1.5px solid rgba(255,255,255,0.15)',
              pointerEvents: 'auto',
            }}
            aria-label={action.label}
          >
            {action.icon}
          </button>
        </div>
      ))}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center transition-all active:scale-90"
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: open
            ? 'rgba(175,197,255,0.12)'
            : 'linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)',
          boxShadow: open
            ? '0 4px 16px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(175,197,255,0.2)'
            : '0 0 0 6px rgba(0,102,255,0.12), 0 0 0 12px rgba(0,102,255,0.06), 0 8px 24px rgba(0,102,255,0.45)',
          border: open ? '1.5px solid rgba(175,197,255,0.25)' : 'none',
          transition: 'background 280ms ease, box-shadow 280ms ease',
          pointerEvents: 'auto',
        }}
        aria-label={open ? 'Close quick actions' : 'Open quick actions'}
        aria-expanded={open}
      >
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 280ms cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export default function Home({
  userName = 'Maya Patel',
  accountType = 'personal',
  kycStatus = 'complete',
  plan = 'free',
  currentNav = 'home',
  onNavigate,
  onSend,
  onRequest,
  onAddMoney,
  onScan,
  onSeeAllTransactions,
  onNotifications,
  onVerify,
  onUpgrade,
  onWalletDetail,
  highVolume = false,
}: HomeProps) {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [upgradeDismissed, setUpgradeDismissed] = useState(false)
  const [finaCardDismissed, setFinaCardDismissed] = useState(false)
  const [demoMode, setDemoMode] = useState<'loaded' | 'loading' | 'empty'>('loaded')

  const displayBalance = balanceVisible ? '$2,847.50' : '••••••'
  const aiSrc = accountType === 'business' ? ainaSrc : finaSrc
  const aiName = accountType === 'business' ? 'Aina' : 'Fina'

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(r => setTimeout(r, 1600))
    setRefreshing(false)
  }

  if (demoMode === 'loading') {
    return (
      <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
        <Header notificationCount={0} onNotification={onNotifications} />
        <div className="px-5 pt-4 pb-20 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
          <SkeletonWalletCard />
          <div className="flex gap-3 mt-2">
            {[0,1,2,3].map(i => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-surface animate-shimmer" />
                <div className="w-10 h-2.5 rounded-full bg-surface animate-shimmer" />
              </div>
            ))}
          </div>
          <SkeletonTransactionList />
        </div>
        <div className="fixed bottom-3 right-3 z-[60]">
          <button onClick={() => setDemoMode('loaded')} className="bg-accent text-[#050B2D] text-[10px] font-bold px-2 py-1 rounded-full">Loaded</button>
        </div>
        <BottomNav active={currentNav as any} accountType={accountType} onChange={tab => onNavigate(tab)} />
      </div>
    )
  }

  if (demoMode === 'empty') {
    return (
      <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
        <Header notificationCount={0} onNotification={onNotifications} />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 pb-20">
          <WalletCard name={userName} balance="$0.00" accountType={accountType} />
          <div className="text-center flex flex-col gap-2">
            <h2 className="font-display text-xl font-extrabold text-text">Welcome to ChangeAIPay</h2>
            <p className="font-body text-sm text-text-2 leading-relaxed">Add money to get started — zero fees on your first transfer.</p>
          </div>
          <button
            onClick={onAddMoney}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            Add Your First £
          </button>
        </div>
        <div className="fixed bottom-3 right-3 z-[60]">
          <button onClick={() => setDemoMode('loaded')} className="bg-accent text-[#050B2D] text-[10px] font-bold px-2 py-1 rounded-full">Loaded</button>
        </div>
        <BottomNav active={currentNav as any} accountType={accountType} onChange={tab => onNavigate(tab)} />
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={3} onNotification={onNotifications} />

      {/* Scrollable content */}
      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        <div className="px-5 pt-3 flex flex-col gap-4">

          {/* KYC nudge */}
          {kycStatus !== 'complete' && (
            <button
              onClick={onVerify}
              className="w-full flex items-center justify-between px-4 py-3 rounded-[--radius-xl] transition-colors focus-ring"
              style={{ background: 'rgba(245,183,0,0.08)', border: '1px solid rgba(245,183,0,0.25)' }}
            >
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L2 3.5v5c0 3 2.2 4.6 5 5 2.8-.4 5-2 5-5v-5L7 1Z"
                    stroke="#F5B700" strokeWidth="1.2" strokeLinejoin="round" />
                  <line x1="7" y1="4.5" x2="7" y2="7" stroke="#F5B700" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="9" r="0.7" fill="#F5B700" />
                </svg>
                <span className="font-body text-xs font-semibold text-warning">
                  {kycStatus === 'pending' ? 'Verification under review' : 'Verify your identity to unlock full access'}
                </span>
              </div>
              {kycStatus !== 'pending' && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          )}

          {/* Wallet card */}
          <div className="relative">
            <button onClick={onWalletDetail} className="w-full text-left focus-ring rounded-[--radius-3xl]">
              <WalletCard
                name={userName}
                balance={displayBalance}
                accountType={accountType}
                currency="USD"
              />
            </button>
            {/* Pulse — fires ONLY during balance refresh */}
            {refreshing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 rounded-[--radius-3xl] bg-black/20">
                <Pulse trigger={refreshing} width={200} height={40} color="#3FE7FF" />
              </div>
            )}
          </div>

          {/* Balance controls row — 44×44pt separate tap targets */}
          <div className="flex items-center gap-2 -mt-2">
            <button
              onClick={() => setBalanceVisible(v => !v)}
              className="flex items-center gap-2 h-11 px-4 rounded-full font-body text-xs font-semibold text-text-2 transition-all duration-[200ms] hover:text-text active:scale-[0.96]"
              style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.12)' }}
              aria-label={balanceVisible ? 'Hide balance' : 'Show balance'}
            >
              {balanceVisible ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <ellipse cx="7" cy="7" rx="6" ry="4" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="7" cy="7" r="2" fill="currentColor" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1.5 1.5l11 11M5.5 5A3.5 3.5 0 0 0 7 12c1.8-.3 3.5-1.5 4.5-4C10.5 5.5 9 4.5 7 4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
              {balanceVisible ? 'Hide' : 'Show'}
            </button>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 h-11 px-4 rounded-full font-body text-xs font-semibold text-text-2 transition-all duration-[200ms] hover:text-text active:scale-[0.96] disabled:opacity-50"
              style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.12)' }}
              aria-label="Refresh balance"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                className={refreshing ? 'animate-spin' : ''}>
                <path d="M11.5 2A5.5 5.5 0 0 0 1.5 6.5M1.5 11A5.5 5.5 0 0 0 11.5 6.5"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M11.5 2v3.5H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 11V7.5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {/* Upgrade nudge — Free plan only, dismissible */}
          {plan === 'free' && !upgradeDismissed && (() => {
            const rec = highVolume ? 'apex' : 'prime'
            const recLabel = highVolume ? 'Apex' : 'Prime'
            const recPrice = highVolume ? '$64.99/mo' : '$39.99/mo'
            const recPerk  = highVolume
              ? 'Unlimited transfers, zero FX, dedicated support'
              : 'Higher limits, zero FX, priority support'
            return (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] animate-fade-in"
                style={{
                  background: highVolume ? 'rgba(153,69,255,0.07)' : 'rgba(0,102,255,0.07)',
                  border: `1px solid ${highVolume ? 'rgba(153,69,255,0.22)' : 'rgba(0,102,255,0.15)'}`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M8 2l2 4.5h5l-4 3 1.5 5L8 12l-4.5 2.5 1.5-5-4-3H5L8 2Z"
                    stroke={highVolume ? '#9945FF' : '#AFC5FF'} strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                <button
                  onClick={() => onUpgrade?.(rec)}
                  className="flex-1 text-left font-body text-xs text-text-2 hover:text-text transition-colors"
                >
                  <span className="font-semibold" style={{ color: highVolume ? '#9945FF' : 'var(--color-accent)' }}>
                    Upgrade to {recLabel} — {recPrice}
                  </span>
                  {' '}— {recPerk}
                </button>
                <button
                  onClick={() => setUpgradeDismissed(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
                  aria-label="Dismiss upgrade suggestion"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2l6 6M8 2l-6 6" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )
          })()}

          {/* Quick actions — floating speed-dial (see SpeedDial component above) */}
          {/* SpeedDial is rendered outside the scroll container, fixed to viewport */}

          {/* Fina / Aina AI insight card — dismissible */}
          {!finaCardDismissed && (
            <div
              className="relative rounded-[--radius-2xl] p-4 flex items-start gap-3 animate-fade-in"
              style={{ background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)' }}
            >
              <img src={aiSrc} alt={aiName}
                className="w-10 h-10 rounded-full object-cover shrink-0"
                style={{ border: '2px solid rgba(63,231,255,0.3)' }} />
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs font-semibold text-accent mb-0.5">{aiName}</p>
                <p className="font-body text-sm text-text-2 leading-relaxed">
                  {accountType === 'business'
                    ? "Your subscriptions renewed $47 this week. I found a bundle that could save you $12/mo."
                    : "You saved $24 on groceries vs. last month. Want me to track your food budget this week?"}
                </p>
              </div>
              <button
                onClick={() => setFinaCardDismissed(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0 -mt-1 -mr-1"
                aria-label="Dismiss"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="rgba(175,197,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

          {/* Recent transactions */}
          <div className="flex flex-col gap-0">
            <div className="flex items-center justify-between mb-1">
              <p className="font-body text-sm font-semibold text-text">Recent Activity</p>
              <button
                onClick={onSeeAllTransactions}
                className="font-body text-xs font-semibold text-accent focus-ring rounded px-1 py-1 min-h-[44px] flex items-center"
              >
                See All
              </button>
            </div>
            <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] px-4 overflow-hidden">
              {MOCK_TX.map((tx, i) => (
                <TransactionRow key={i} {...tx} />
              ))}
            </div>
          </div>

          {/* Spending insights */}
          <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-body text-sm font-semibold text-text">Spending This Month</p>
              <Chip label="$200 of $400" variant="info" />
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full mb-4" style={{ background: 'rgba(175,197,255,0.1)' }}>
              <div className="h-full rounded-full" style={{ width: '50%', background: 'var(--gradient-primary)' }} />
            </div>
            {/* Category bars */}
            <div className="flex flex-col gap-2">
              {SPENDING_CATS.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-1.5 h-4 rounded-full shrink-0" style={{ background: cat.color }} />
                  <p className="font-body text-xs text-text-2 w-24 truncate">{cat.name}</p>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.08)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                  <p className="font-mono text-xs text-text-2 w-10 text-right">${cat.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Demo state toggle strip */}
          <div className="flex gap-2 pb-2">
            {(['loaded','loading','empty'] as const).map(mode => (
              <button key={mode} onClick={() => setDemoMode(mode)}
                className={`flex-1 h-8 rounded-full font-body text-[10px] font-semibold transition-colors
                  ${demoMode === mode ? 'bg-accent text-[#050B2D]' : 'bg-surface text-text-muted'}`}>
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active={currentNav as any} accountType={accountType} onChange={tab => onNavigate(tab)} />

      {/* Floating speed-dial quick actions */}
      <SpeedDial
        onSend={onSend}
        onRequest={onRequest}
        onAddMoney={onAddMoney}
        onScan={onScan}
      />
    </div>
  )
}
