import { useState } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { TransactionRow, Chip } from '@/components/Card'

interface WalletDetailProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
  onAddMoney?: () => void
  onWithdraw?: () => void
  onNotifications?: () => void
  onNanoReceive?: () => void
  onNanoSend?: () => void
}

const ALL_TX = [
  { icon: <span className="text-lg">🥗</span>, merchant: 'Pret A Manger', category: 'Food', amount: '$8.50', date: 'Today, 12:34 PM', status: 'completed' as const, positive: false },
  { icon: <span className="text-lg">🎬</span>, merchant: 'Netflix', category: 'Entertainment', amount: '$15.99', date: 'Yesterday', status: 'completed' as const, positive: false },
  { icon: <span className="text-lg">💰</span>, merchant: 'Incoming Transfer', category: 'Income', amount: '$500.00', date: 'Aug 5', status: 'completed' as const, positive: true },
  { icon: <span className="text-lg">🛒</span>, merchant: 'Whole Foods', category: 'Groceries', amount: '$62.14', date: 'Aug 4', status: 'completed' as const, positive: false },
  { icon: <span className="text-lg">⏳</span>, merchant: 'Stripe Payout', category: 'Income', amount: '$200.00', date: 'Aug 3', status: 'pending' as const, positive: true },
  { icon: <span className="text-lg">☕</span>, merchant: 'Blue Bottle Coffee', category: 'Food', amount: '$6.50', date: 'Aug 2', status: 'completed' as const, positive: false },
  { icon: <span className="text-lg">✈️</span>, merchant: 'British Airways', category: 'Travel', amount: '$320.00', date: 'Aug 1', status: 'completed' as const, positive: false },
  { icon: <span className="text-lg">❌</span>, merchant: 'Amazon', category: 'Shopping', amount: '$89.99', date: 'Jul 30', status: 'failed' as const, positive: false },
]

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar',    balance: '$1,847.50', flag: '🇺🇸' },
  { code: 'GBP', name: 'British Pound', balance: '£620.00',  flag: '🇬🇧' },
  { code: 'EUR', name: 'Euro',          balance: '€380.00',  flag: '🇪🇺' },
]

export default function WalletDetail({
  accountType = 'personal',
  onNavigate,
  onBack,
  onAddMoney,
  onWithdraw,
  onNotifications,
  onNanoReceive,
  onNanoSend,
}: WalletDetailProps) {
  const [filter, setFilter] = useState<'all' | 'incoming' | 'outgoing' | 'pending'>('all')
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  const filtered = ALL_TX.filter(tx => {
    if (filter === 'incoming') return tx.positive
    if (filter === 'outgoing') return !tx.positive && tx.status !== 'pending'
    if (filter === 'pending')  return tx.status === 'pending'
    return true
  })

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={3} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Back row + title */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-1">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
            aria-label="Back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="var(--color-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">My Wallet</h1>
          <div className="flex-1" />
          {/* Export button */}
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(o => !o)}
              className="h-11 px-4 rounded-full flex items-center gap-1.5 font-body text-xs font-semibold text-text-2 hover:bg-surface-hi transition-colors"
              style={{ border: '1px solid var(--color-border)', minWidth: 44 }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v7.5M2 8.5l4.5 3.5 4.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export
            </button>
            {exportMenuOpen && (
              <div
                className="absolute right-0 top-11 z-50 rounded-[--radius-xl] p-1 flex flex-col min-w-[140px]"
                style={{ background: 'var(--color-surface-hi)', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                {['CSV', 'PDF Statement', 'JSON'].map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setExportMenuOpen(false)}
                    className="px-3 py-2.5 text-left font-body text-sm text-text hover:text-accent rounded-[--radius-lg] hover:bg-surface transition-colors"
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 flex flex-col gap-4">
          {/* Balance summary */}
          <div className="rounded-[--radius-2xl] p-4"
            style={{ background: 'linear-gradient(145deg, #0D1A4A 0%, #0066FF 70%, #3FE7FF 100%)' }}>
            <p className="font-body text-xs text-white/60 mb-1">Total Balance</p>
            <p className="font-display text-3xl font-extrabold text-white tracking-tight">$2,847.50</p>
            <div className="flex items-center gap-3 mt-3">
              <div>
                <p className="font-body text-[10px] text-white/50 mb-0.5">Available</p>
                <p className="font-mono text-sm font-semibold text-white">$2,647.50</p>
              </div>
              <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <div>
                <p className="font-body text-[10px] text-white/50 mb-0.5">Pending</p>
                <p className="font-mono text-sm font-semibold text-white/80">$200.00</p>
              </div>
              <div className="flex-1" />
              <Chip label="Personal" variant="info" />
            </div>
          </div>

          {/* CTA row */}
          <div className="flex gap-3">
            <button
              onClick={onAddMoney}
              className="flex-1 h-12 rounded-[--radius-2xl] flex items-center justify-center gap-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Add Money
            </button>
            <button
              onClick={onWithdraw}
              className="flex-1 h-12 rounded-[--radius-2xl] flex items-center justify-center gap-2 font-body text-sm font-semibold text-text-2 transition-colors hover:bg-surface-hi active:scale-[0.98]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Withdraw
            </button>
          </div>

          {/* Currency breakdown */}
          <div>
            <p className="font-body text-sm font-semibold text-text mb-2">Currencies</p>
            <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
              {CURRENCIES.map((c, i) => (
                <div key={c.code}
                  className={`flex items-center justify-between px-4 py-3.5 ${i < CURRENCIES.length - 1 ? 'border-b border-[color:var(--color-border)]' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.flag}</span>
                    <div>
                      <p className="font-body text-sm font-semibold text-text">{c.code}</p>
                      <p className="font-body text-xs text-text-muted">{c.name}</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-semibold text-text">{c.balance}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Linked bank */}
          <div>
            <p className="font-body text-sm font-semibold text-text mb-2">Linked Account</p>
            <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] px-4 py-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,102,255,0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="7" width="14" height="9" rx="1.5" stroke="#AFC5FF" strokeWidth="1.3" />
                  <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="9" cy="11.5" r="1.5" fill="#AFC5FF" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">Chase Bank</p>
                <p className="font-body text-xs text-text-muted">Checking ••••4821</p>
              </div>
              <Chip label="Verified" variant="success" dot />
            </div>
          </div>

          {/* Powered by Nano section */}
          <div>
            <p className="font-body text-sm font-semibold text-text mb-2">Powered by Nano</p>
            <div
              className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
              style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.2)' }}
            >
              {/* Nano address */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-text-muted mb-1">Your Nano Address</p>
                  <p className="font-mono text-xs text-text">nano_1ysn6p7...dw</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText('nano_1ysn6p7s7gbrxkr67c5emzhq1xpbzcfsgchjcsbcmfxfh8qnqz8guwdx5dwn')}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-hi transition-colors shrink-0"
                  aria-label="Copy address"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2.5" y="4.5" width="5" height="5" rx="0.8" stroke="rgba(175,197,255,0.6)" strokeWidth="0.9" />
                    <path d="M4.5 4.5V3.5a0.8 0.8 0 0 1 0.8-0.8h4.7a0.8 0.8 0 0 1 0.8 0.8v4.7a0.8 0.8 0 0 1-0.8 0.8H9.5" stroke="rgba(175,197,255,0.6)" strokeWidth="0.9" />
                  </svg>
                </button>
              </div>

              {/* Confirmed balance */}
              <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-3">
                <div>
                  <p className="font-body text-xs text-text-muted mb-1">Confirmed Balance</p>
                  <p className="font-mono text-sm font-semibold text-text">$2,847.50</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              </div>

              {/* Feeless settlement badge */}
              <div
                className="flex items-center gap-2 px-2.5 py-2 rounded-[--radius-lg] w-fit"
                style={{ background: 'rgba(63,231,255,0.12)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#3FE7FF" strokeWidth="1" />
                  <path d="M3 6l2 2 4-4" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-xs font-semibold text-[#3FE7FF]">Feeless • Instant Settlement</p>
              </div>

              {/* Nano network actions */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={onNanoReceive}
                  className="flex-1 h-9 rounded-[--radius-xl] flex items-center justify-center gap-1.5 font-body text-xs font-semibold transition-all active:scale-[0.97]"
                  style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.25)', color: '#3FE7FF' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2v7M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Receive NANO
                </button>
                <button
                  onClick={onNanoSend}
                  className="flex-1 h-9 rounded-[--radius-xl] flex items-center justify-center gap-1.5 font-body text-xs font-semibold transition-all active:scale-[0.97]"
                  style={{ background: 'rgba(63,231,255,0.06)', border: '1px solid rgba(63,231,255,0.18)', color: 'rgba(63,231,255,0.8)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 10V3M2 5l4-4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Send NANO
                </button>
              </div>
            </div>
          </div>

          {/* Transaction filter chips */}
          <div>
            <div className="flex gap-2 mb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {(['all','incoming','outgoing','pending'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`h-8 px-3 rounded-full font-body text-xs font-semibold whitespace-nowrap transition-colors capitalize
                    ${filter === f ? 'bg-accent text-[#050B2D]' : 'bg-surface text-text-2 border border-[color:var(--color-border)]'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] px-4 overflow-hidden">
              {filtered.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="font-body text-sm text-text-muted">No transactions</p>
                </div>
              ) : (
                filtered.map((tx, i) => <TransactionRow key={i} {...tx} />)
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
