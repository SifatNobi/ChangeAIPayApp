import { useState } from 'react'

type VaultTab = 'balance' | 'boosts' | 'premium' | 'badges' | 'history'

const TABS: { id: VaultTab; label: string }[] = [
  { id: 'balance',  label: 'Change' },
  { id: 'boosts',   label: 'Boosts' },
  { id: 'premium',  label: 'Premium' },
  { id: 'badges',   label: 'Badges' },
  { id: 'history',  label: 'History' },
]

const BOOSTS = [
  { id: 'b1', name: 'FX Boost',         desc: 'Zero foreign exchange fees for 48 hours', cost: 500,  expires: null,        active: false },
  { id: 'b2', name: 'Fast Track',        desc: 'Priority processing on your next 5 sends', cost: 800, expires: 'Sep 8',    active: true  },
  { id: 'b3', name: 'AI Advisor Boost',  desc: 'Unlock extended Fina session for 7 days',  cost: 1200, expires: null,      active: false },
]

const PREMIUM_DAYS = [
  { id: 'pd1', label: '7 days',  change: 300,  desc: 'Temporary Prime access' },
  { id: 'pd2', label: '14 days', change: 550,  desc: 'Temporary Prime access' },
  { id: 'pd3', label: '30 days', change: 1000, desc: 'Temporary Apex access'  },
]

const BADGES = [
  { id: 'bg1', emoji: '✨', name: 'First Spark',  earned: true,  earnedDate: 'Aug 4' },
  { id: 'bg2', emoji: '🔗', name: 'Connector',    earned: true,  earnedDate: 'Aug 20' },
  { id: 'bg3', emoji: '📡', name: 'Amplifier',    earned: false, earnedDate: null },
  { id: 'bg4', emoji: '⚡', name: 'Change Maker', earned: false, earnedDate: null },
]

const HISTORY = [
  { id: 'h1', label: 'Milestone: Connector',    change: '+1,000', date: 'Aug 20', type: 'earn',  source: 'Milestone' },
  { id: 'h2', label: 'Fast Track Boost',         change: '-800',   date: 'Aug 22', type: 'spend', source: 'Boost' },
  { id: 'h3', label: 'Milestone: First Spark',   change: '+500',   date: 'Aug 4',  type: 'earn',  source: 'Milestone' },
]

interface ChangeVaultProps {
  changeBalance?: number
  onBack?: () => void
}

export default function ChangeVault({ changeBalance = 1200, onBack }: ChangeVaultProps) {
  const [tab, setTab] = useState<VaultTab>('balance')
  const [redeeming, setRedeeming] = useState<string | null>(null)

  const handleRedeem = (id: string) => {
    setRedeeming(id)
    setTimeout(() => setRedeeming(null), 1800)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Change Vault</p>
          <p className="font-body text-[10px] text-text-muted">Your loyalty rewards</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.25)' }}>
          <span className="text-sm">💎</span>
          <p className="font-mono text-sm font-bold" style={{ color: '#F5B700' }}>{changeBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1.5 px-5 pb-3 shrink-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="h-8 px-3.5 rounded-full font-body text-xs font-semibold shrink-0 transition-all"
            style={{ background: tab === t.id ? 'rgba(245,183,0,0.12)' : 'rgba(175,197,255,0.05)', border: `1px solid ${tab === t.id ? 'rgba(245,183,0,0.35)' : 'rgba(175,197,255,0.1)'}`, color: tab === t.id ? '#F5B700' : 'rgba(175,197,255,0.55)' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {tab === 'balance' && (
          <>
            {/* Hero balance */}
            <div className="rounded-[--radius-2xl] px-5 py-6 flex flex-col items-center gap-2"
              style={{ background: 'linear-gradient(135deg, rgba(245,183,0,0.08), rgba(252,126,47,0.06))', border: '1.5px solid rgba(245,183,0,0.25)' }}>
              <span className="text-4xl">💎</span>
              <p className="font-display text-4xl font-extrabold" style={{ color: '#F5B700' }}>{changeBalance.toLocaleString()}</p>
              <p className="font-body text-xs text-text-muted">Change · loyalty currency</p>
              <div className="mt-2 px-4 py-2 rounded-full" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p className="font-body text-[10px] text-center leading-relaxed" style={{ color: '#F87171' }}>
                  Change is never cash-redeemable or convertible to your account balance.
                  Spend it on Boosts, Premium days, badges, and offers.
                </p>
              </div>
            </div>
            {/* Quick links */}
            {[
              { label: 'Boosts',       sub: '2 available',  emoji: '⚡', tab: 'boosts'   as VaultTab },
              { label: 'Premium Days', sub: 'Redeem access', emoji: '⭐', tab: 'premium'  as VaultTab },
              { label: 'Badges',       sub: '2 earned',      emoji: '🏅', tab: 'badges'   as VaultTab },
            ].map(item => (
              <button key={item.label} onClick={() => setTab(item.tab)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] w-full text-left transition-all active:scale-[0.98]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{item.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{item.sub}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3.5l3.5 3.5L5 10.5" stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            ))}
          </>
        )}

        {tab === 'boosts' && (
          <div className="flex flex-col gap-3">
            {BOOSTS.map(b => (
              <div key={b.id} className="rounded-[--radius-2xl] px-4 py-4"
                style={{ background: b.active ? 'rgba(34,197,94,0.05)' : 'rgba(175,197,255,0.03)', border: `1.5px solid ${b.active ? 'rgba(34,197,94,0.25)' : 'rgba(175,197,255,0.09)'}` }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-body text-sm font-semibold text-text">{b.name}</p>
                    <p className="font-body text-[10px] text-text-muted">{b.desc}</p>
                  </div>
                  {b.active && (
                    <span className="font-body text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>
                      Active · expires {b.expires}
                    </span>
                  )}
                </div>
                {!b.active && (
                  <button onClick={() => handleRedeem(b.id)} disabled={changeBalance < b.cost}
                    className="w-full h-9 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                    style={{ background: redeeming === b.id ? 'rgba(34,197,94,0.1)' : changeBalance >= b.cost ? 'rgba(245,183,0,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${redeeming === b.id ? 'rgba(34,197,94,0.3)' : changeBalance >= b.cost ? 'rgba(245,183,0,0.3)' : 'rgba(175,197,255,0.1)'}`, color: redeeming === b.id ? '#22C55E' : changeBalance >= b.cost ? '#F5B700' : 'rgba(175,197,255,0.3)' }}>
                    {redeeming === b.id ? 'Activated!' : `Redeem · 💎 ${b.cost.toLocaleString()}`}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'premium' && (
          <div className="flex flex-col gap-3">
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Use Change to unlock temporary Premium access. This is a limited preview — it does not replace a paid plan.
            </p>
            {PREMIUM_DAYS.map(pd => (
              <div key={pd.id} className="rounded-[--radius-2xl] px-4 py-4"
                style={{ background: 'rgba(153,69,255,0.05)', border: '1.5px solid rgba(153,69,255,0.2)' }}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-body text-sm font-semibold text-text">{pd.label} Premium</p>
                    <p className="font-body text-[10px] text-text-muted">{pd.desc}</p>
                  </div>
                  <button onClick={() => handleRedeem(pd.id)} disabled={changeBalance < pd.change}
                    className="h-9 px-3.5 rounded-[--radius-xl] font-body text-xs font-semibold shrink-0 transition-all"
                    style={{ background: redeeming === pd.id ? 'rgba(34,197,94,0.1)' : changeBalance >= pd.change ? 'rgba(153,69,255,0.12)' : 'rgba(175,197,255,0.05)', border: `1px solid ${redeeming === pd.id ? 'rgba(34,197,94,0.3)' : changeBalance >= pd.change ? 'rgba(153,69,255,0.3)' : 'rgba(175,197,255,0.1)'}`, color: redeeming === pd.id ? '#22C55E' : changeBalance >= pd.change ? '#9945FF' : 'rgba(175,197,255,0.3)' }}>
                    {redeeming === pd.id ? 'Done!' : `💎 ${pd.change.toLocaleString()}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'badges' && (
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map(bg => (
              <div key={bg.id} className="flex flex-col items-center gap-2.5 px-3 py-4 rounded-[--radius-2xl] text-center"
                style={{ background: bg.earned ? 'rgba(245,183,0,0.06)' : 'rgba(175,197,255,0.02)', border: `1.5px solid ${bg.earned ? 'rgba(245,183,0,0.25)' : 'rgba(175,197,255,0.08)'}`, opacity: bg.earned ? 1 : 0.45 }}>
                <span className="text-3xl" style={{ filter: bg.earned ? 'none' : 'grayscale(1)' }}>{bg.emoji}</span>
                <div>
                  <p className="font-body text-xs font-semibold text-text">{bg.name}</p>
                  <p className="font-body text-[9px] text-text-muted">{bg.earned ? `Earned ${bg.earnedDate}` : 'Not yet earned'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'history' && (
          <div className="flex flex-col gap-2">
            {HISTORY.map(h => (
              <div key={h.id} className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
                <div className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: h.type === 'earn' ? '#22C55E' : '#F5B700' }} />
                <div className="flex-1">
                  <p className="font-body text-xs font-semibold text-text">{h.label}</p>
                  <p className="font-body text-[9px] text-text-muted">{h.date} · {h.source}</p>
                </div>
                <p className="font-mono text-xs font-bold shrink-0"
                  style={{ color: h.type === 'earn' ? '#22C55E' : '#F5B700' }}>{h.change}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
