import { useState } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { GlassCard } from '@/components/Card'

interface QuickActionsProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotifications?: () => void
  onSend?: () => void
  onRequest?: () => void
  onAddMoney?: () => void
  onScan?: () => void
  onPayBills?: () => void
  onSplitBill?: () => void
}

const ACTIONS = [
  {
    id: 'send',
    label: 'Send',
    description: 'Transfer to anyone',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'linear-gradient(145deg, #0044CC, #0066FF)',
    glow: 'rgba(0,102,255,0.35)',
    badge: null,
  },
  {
    id: 'request',
    label: 'Request',
    description: 'Ask for payment',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'linear-gradient(145deg, #005C8A, #0088CC)',
    glow: 'rgba(0,136,204,0.3)',
    badge: null,
  },
  {
    id: 'addMoney',
    label: 'Add Money',
    description: 'Top up your wallet',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'linear-gradient(145deg, #006640, #00AA6C)',
    glow: 'rgba(0,170,108,0.3)',
    badge: null,
  },
  {
    id: 'scan',
    label: 'Scan & Pay',
    description: 'QR or NFC payment',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9V4h5M3 15v5h5M16 4h5v5M16 20h5v-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1.5" strokeDasharray="2.5 2" />
        <circle cx="12" cy="12" r="1.5" fill="white" />
      </svg>
    ),
    gradient: 'linear-gradient(145deg, #4A00A0, #7000FF)',
    glow: 'rgba(112,0,255,0.3)',
    badge: null,
  },
  {
    id: 'payBills',
    label: 'Pay Bills',
    description: 'Utilities, rent & more',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="1.8" />
        <path d="M3 10h18" stroke="white" strokeWidth="1.5" />
        <path d="M7 15h4M7 13h2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="17" cy="14" r="2" fill="white" fillOpacity="0.5" />
        <path d="M16 14l.7.7 1.3-1.3" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'linear-gradient(145deg, #7A3800, #CC6200)',
    glow: 'rgba(204,98,0,0.3)',
    badge: '3 due',
  },
  {
    id: 'splitBill',
    label: 'Split Bill',
    description: 'Divide with friends',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.6" />
        <circle cx="16" cy="8" r="3" stroke="white" strokeWidth="1.6" />
        <path d="M4 19c0-2.8 1.8-5 4-5h1M20 19c0-2.8-1.8-5-4-5h-1" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 14v5M10 17h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'linear-gradient(145deg, #8A0040, #CC0060)',
    glow: 'rgba(204,0,96,0.28)',
    badge: null,
  },
]

type ActionId = typeof ACTIONS[number]['id']

export default function QuickActions({
  accountType = 'personal',
  onNavigate,
  onBack,
  onNotifications,
  onSend, onRequest, onAddMoney, onScan, onPayBills, onSplitBill,
}: QuickActionsProps) {
  const [pressed, setPressed] = useState<ActionId | null>(null)

  const handlers: Record<ActionId, (() => void) | undefined> = {
    send: onSend,
    request: onRequest,
    addMoney: onAddMoney,
    scan: onScan,
    payBills: onPayBills,
    splitBill: onSplitBill,
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={3} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Title */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Quick Actions</h1>
            <p className="font-body text-xs text-text-muted">Tap to get started instantly</p>
          </div>
        </div>

        <div className="px-5 flex flex-col gap-5">
          {/* 2-column action grid */}
          <div className="grid grid-cols-2 gap-3">
            {ACTIONS.map(action => (
              <button
                key={action.id}
                onPointerDown={() => setPressed(action.id)}
                onPointerUp={() => setPressed(null)}
                onPointerLeave={() => setPressed(null)}
                onClick={handlers[action.id]}
                className="relative flex flex-col gap-3 p-4 rounded-[--radius-2xl] text-left transition-all duration-[180ms] focus-ring overflow-hidden"
                style={{
                  background: action.gradient,
                  transform: pressed === action.id ? 'scale(0.95)' : 'scale(1)',
                  boxShadow: pressed === action.id
                    ? 'none'
                    : `0 8px 24px ${action.glow}, inset 0 0 0 0.5px rgba(255,255,255,0.12)`,
                  minHeight: 110,
                }}
              >
                {/* Badge */}
                {action.badge && (
                  <div
                    className="absolute top-3 right-3 px-1.5 h-5 rounded-full flex items-center"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    <span className="font-body text-[9px] font-bold text-white">{action.badge}</span>
                  </div>
                )}

                {/* Subtle corner glow */}
                <div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.08)', filter: 'blur(12px)' }}
                />

                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  {action.icon}
                </div>
                <div>
                  <p className="font-body text-sm font-bold text-white">{action.label}</p>
                  <p className="font-body text-[10px] text-white/60 mt-0.5">{action.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Recents */}
          <div>
            <p className="font-body text-sm font-semibold text-text mb-2">Recent Recipients</p>
            <GlassCard className="p-0 overflow-hidden divide-y divide-[color:var(--color-border)]">
              {[
                { initials: 'AJ', name: 'Alex Johnson', sub: 'Last sent $50 · 2 days ago', color: '#0066FF' },
                { initials: 'SK', name: 'Sarah Kim', sub: 'Last sent $120 · 1 week ago', color: '#3FE7FF' },
              ].map(p => (
                <button key={p.name} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors text-left active:scale-[0.99]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-body text-xs font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${p.color}aa, ${p.color}44)` }}
                  >
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-text truncate">{p.name}</p>
                    <p className="font-body text-xs text-text-muted">{p.sub}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              ))}
            </GlassCard>
          </div>
        </div>
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
