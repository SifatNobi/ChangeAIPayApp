import { useState } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { GlassCard, TransactionRow } from '@/components/Card'

interface PaymentsHubProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onNotifications?: () => void
  onSend?: () => void
  onRequest?: () => void
  onAddMoney?: () => void
  onSplitBill?: () => void
  onPayBills?: () => void
  onMySubscriptions?: () => void
  onSearch?: () => void
  onContact?: (name: string) => void
  onTransaction?: () => void
}

const RECENT_CONTACTS: { initials: string; name: string; color: string; verified: boolean }[] = []

const RECENT_ACTIVITY: { icon: React.ReactNode; merchant: string; category: string; amount: string; date: string; status: 'completed' | 'pending' | 'failed'; positive: boolean }[] = []

const ACTIONS = [
  {
    id: 'send', label: 'Send',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 16V4M4 10l6-6 6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    gradient: 'linear-gradient(145deg,#0044CC,#0066FF)',
    glow: 'rgba(0,102,255,0.3)',
  },
  {
    id: 'request', label: 'Request',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10l6 6 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    gradient: 'linear-gradient(145deg,#005C8A,#0088CC)',
    glow: 'rgba(0,136,204,0.28)',
  },
  {
    id: 'add', label: 'Add Money',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>,
    gradient: 'linear-gradient(145deg,#006640,#00AA6C)',
    glow: 'rgba(0,170,108,0.28)',
  },
  {
    id: 'split', label: 'Split Bill',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="3" stroke="white" strokeWidth="1.5" /><circle cx="13" cy="7" r="3" stroke="white" strokeWidth="1.5" /><path d="M3 17c0-2.5 1.8-4.5 4-4.5h1M17 17c0-2.5-1.8-4.5-4-4.5h-1M10 13v4M8.5 16h3" stroke="white" strokeWidth="1.4" strokeLinecap="round" /></svg>,
    gradient: 'linear-gradient(145deg,#8A0040,#CC0060)',
    glow: 'rgba(204,0,96,0.25)',
  },
  {
    id: 'bills', label: 'Pay Bills',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="10" rx="2" stroke="white" strokeWidth="1.5" /><path d="M3 9h14" stroke="white" strokeWidth="1.3" /><path d="M6 13h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg>,
    gradient: 'linear-gradient(145deg,#7A3800,#CC6200)',
    glow: 'rgba(204,98,0,0.25)',
  },
]

export default function PaymentsHub({
  accountType = 'personal',
  onNavigate,
  onNotifications,
  onSend, onRequest, onAddMoney, onSplitBill, onPayBills, onMySubscriptions,
  onSearch, onContact, onTransaction,
}: PaymentsHubProps) {
  const [pressed, setPressed] = useState<string | null>(null)

  const handlers: Record<string, (() => void) | undefined> = {
    send: onSend, request: onRequest, add: onAddMoney, split: onSplitBill, bills: onPayBills,
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={0} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-28 flex-1" style={{ scrollbarWidth: 'none' }}>
        <div className="px-5 pt-4 flex flex-col gap-5">

          {/* Search entry */}
          <button
            onClick={onSearch}
            className="flex items-center gap-3 h-11 px-4 rounded-[--radius-2xl] w-full text-left transition-colors hover:brightness-110"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text-muted shrink-0">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="font-body text-sm text-text-muted">Search people, transactions…</span>
          </button>

          {/* 5 action tiles in a 3+2 layout */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              {ACTIONS.slice(0, 3).map(a => (
                <ActionTile key={a.id} action={a} pressed={pressed === a.id}
                  onPointerDown={() => setPressed(a.id)}
                  onPointerUp={() => setPressed(null)}
                  onClick={handlers[a.id]} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ACTIONS.slice(3).map(a => (
                <ActionTile key={a.id} action={a} pressed={pressed === a.id}
                  onPointerDown={() => setPressed(a.id)}
                  onPointerUp={() => setPressed(null)}
                  onClick={handlers[a.id]} />
              ))}
            </div>
          </div>

          {/* Recent contacts */}
          <div>
            <p className="font-body text-sm font-semibold text-text mb-3">Quick Send</p>
            <div className="flex gap-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {RECENT_CONTACTS.map(c => (
                <button
                  key={c.name}
                  onClick={() => onContact?.(c.name)}
                  className="flex flex-col items-center gap-1.5 min-w-[52px] active:scale-[0.94] transition-transform duration-[150ms]"
                >
                  <div className="relative">
                    <div
                      className="w-13 h-13 rounded-full flex items-center justify-center font-body text-sm font-bold text-white"
                      style={{
                        width: 52, height: 52,
                        background: `linear-gradient(135deg, ${c.color}cc, ${c.color}55)`,
                        border: `2px solid ${c.color}40`,
                        boxShadow: `0 4px 12px ${c.color}30`,
                      }}
                    >
                      {c.initials}
                    </div>
                    {c.verified && (
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: '#22C55E', border: '2px solid var(--color-bg)' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="font-body text-[10px] text-text-muted">{c.name}</p>
                </button>
              ))}
              <button
                onClick={onSend}
                className="flex flex-col items-center gap-1.5 min-w-[52px] active:scale-[0.94] transition-transform duration-[150ms]"
              >
                <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(175,197,255,0.06)', border: '2px dashed rgba(175,197,255,0.2)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="rgba(175,197,255,0.5)" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="font-body text-[10px] text-text-muted">Add</p>
              </button>
            </div>
          </div>

          {/* My ChangeAIPay Subscriptions shortcut */}
          <button
            onClick={onMySubscriptions}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="#3FE7FF" strokeWidth="1.2" />
                <path d="M6 8h2.5v-2.5" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body text-xs font-semibold text-text">My Subscriptions</p>
              <p className="font-body text-[10px] text-text-muted">Recurring charges from ChangeAIPay merchants</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Recent activity */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-body text-sm font-semibold text-text">Recent Activity</p>
              <button className="font-body text-xs font-semibold text-accent min-h-[44px] flex items-center">See All</button>
            </div>
            <GlassCard className="p-0 overflow-hidden px-4">
              {RECENT_ACTIVITY.map((tx, i) => <TransactionRow key={i} {...tx} />)}
            </GlassCard>
          </div>

        </div>
      </div>

      <BottomNav active="payments" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}

function ActionTile({
  action, pressed, onPointerDown, onPointerUp, onClick,
}: {
  action: typeof ACTIONS[0]
  pressed: boolean
  onPointerDown: () => void
  onPointerUp: () => void
  onClick?: () => void
}) {
  return (
    <button
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onClick={onClick}
      className="flex flex-col items-center gap-2 py-4 rounded-[--radius-2xl] transition-all duration-[160ms] focus-ring"
      style={{
        background: action.gradient,
        transform: pressed ? 'scale(0.93)' : 'scale(1)',
        boxShadow: pressed ? 'none' : `0 6px 20px ${action.glow}, inset 0 0 0 0.5px rgba(255,255,255,0.1)`,
        minHeight: 80,
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.15)' }}>
        {action.icon}
      </div>
      <p className="font-body text-xs font-semibold text-white">{action.label}</p>
    </button>
  )
}
