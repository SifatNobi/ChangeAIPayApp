import { useState } from 'react'

type PlanId = 'free' | 'edge' | 'prime' | 'apex'

interface PlanDef {
  id: PlanId
  name: string
  price: string
  priceNote: string
  color: string
  tagline: string
}

interface FeatureRow {
  category: string
  label: string
  free: string | boolean
  edge: string | boolean
  prime: string | boolean
  apex: string | boolean
  note?: string
}

const PLANS: PlanDef[] = [
  { id: 'free',  name: 'Free',  price: '$0',     priceNote: 'forever',   color: 'rgba(175,197,255,0.5)', tagline: 'Essential banking' },
  { id: 'edge',  name: 'Edge',  price: '$24.99', priceNote: '/month',    color: '#3FE7FF',               tagline: 'Better limits' },
  { id: 'prime', name: 'Prime', price: '$39.99', priceNote: '/month',    color: '#0066FF',               tagline: 'Most popular' },
  { id: 'apex',  name: 'Apex',  price: '$64.99', priceNote: '/month',    color: '#F5B700',               tagline: 'Power users' },
]

const FEATURES: FeatureRow[] = [
  // Transfers
  { category: 'Transfers', label: 'Monthly limit',       free: '$400',     edge: '$1,500',   prime: '$10,000',  apex: 'Unlimited'  },
  { category: 'Transfers', label: 'Daily limit',         free: '$400',     edge: '$750',     prime: '$2,500',   apex: 'Unlimited'  },
  { category: 'Transfers', label: 'Zero domestic fees',  free: false,      edge: true,       prime: true,       apex: true         },
  { category: 'Transfers', label: 'Zero FX fees',        free: false,      edge: false,      prime: true,       apex: true         },
  { category: 'Transfers', label: 'International sends', free: '+1.75%',   edge: 'Free $1,500/mo · 0.95% over',   prime: '+0.5%',    apex: 'Free'       },
  { category: 'Transfers', label: 'Instant transfers',   free: true,       edge: true,       prime: true,       apex: true         },
  // Crypto
  { category: 'Crypto',    label: 'Buy & sell crypto',   free: true,       edge: true,       prime: true,       apex: true         },
  { category: 'Crypto',    label: 'Crypto trading fee',  free: '1.5%',     edge: '1.0%',     prime: '0.5%',     apex: '0.25%'      },
  { category: 'Crypto',    label: 'Nano (XNO) trading fee', free: '$0',   edge: '$0',       prime: '$0',       apex: '$0',        note: 'Nano trades are always fee-free, regardless of plan.' },
  { category: 'Crypto',    label: 'Wallet deposit/withdraw', free: true,   edge: true,       prime: true,       apex: true         },
  // Goals
  { category: 'Goals',     label: 'Savings goals',       free: 'Up to 3',  edge: 'Up to 10', prime: 'Unlimited',apex: 'Unlimited'  },
  { category: 'Goals',     label: 'AutoSave round-ups',  free: true,       edge: true,       prime: true,       apex: true         },
  { category: 'Goals',     label: 'Paycheck split',      free: false,      edge: true,       prime: true,       apex: true         },
  // Fina AI
  { category: 'Fina AI',   label: 'AI chat & insights',  free: true,       edge: true,       prime: true,       apex: true         },
  { category: 'Fina AI',   label: 'AI Memory',           free: '7 days',   edge: '30 days',  prime: '1 year',   apex: 'Forever'    },
  { category: 'Fina AI',   label: 'Financial reports',   free: false,      edge: 'Monthly',  prime: 'Weekly',   apex: 'Real-time'  },
  { category: 'Fina AI',   label: 'Voice Mode',          free: false,      edge: false,      prime: true,       apex: true         },
  // Support
  { category: 'Support',   label: 'Response time',       free: '48 hrs',   edge: '24 hrs',   prime: '4 hrs',    apex: 'Dedicated'  },
  { category: 'Support',   label: 'Phone support',       free: false,      edge: false,      prime: true,       apex: true         },
  { category: 'Support',   label: 'Dedicated manager',   free: false,      edge: false,      prime: false,      apex: true         },
]

const CATEGORIES = ['Transfers', 'Crypto', 'Goals', 'Fina AI', 'Support']

function Cell({ val, color }: { val: string | boolean; color: string }) {
  if (val === true) return (
    <div className="flex items-center justify-center h-full">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3.5 3.5 5.5-5.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  )
  if (val === false) return (
    <div className="flex items-center justify-center h-full">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="rgba(175,197,255,0.2)" strokeWidth="1.2" strokeLinecap="round" /></svg>
    </div>
  )
  return <p className="font-body text-[10px] text-center leading-tight" style={{ color }}>{val}</p>
}

interface ComparePlansProps {
  currentPlan?: PlanId
  recommendedPlan?: PlanId
  onSelectPlan?: (plan: PlanId) => void
  onBack?: () => void
}

export default function ComparePlans({ currentPlan = 'free', recommendedPlan = 'prime', onSelectPlan, onBack }: ComparePlansProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(CATEGORIES))
  const toggle = (cat: string) => setOpenCategories(prev => {
    const n = new Set(prev); n.has(cat) ? n.delete(cat) : n.add(cat); return n
  })

  const COL_W = 62

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Compare Plans</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-8" style={{ scrollbarWidth: 'none' }}>

        {/* Plan header row */}
        <div className="flex px-4 gap-1 pb-3 pt-1 sticky top-0 z-10"
          style={{ background: 'var(--color-bg)', borderBottom: '1px solid rgba(175,197,255,0.08)' }}>
          <div style={{ flex: 1 }} />
          {PLANS.map(p => {
            const isCurrent = p.id === currentPlan
            const isRec = p.id === recommendedPlan
            return (
              <div key={p.id} style={{ width: COL_W }} className="flex flex-col items-center gap-0.5">
                <div className="w-full py-2 rounded-[--radius-xl] flex flex-col items-center"
                  style={{ background: isRec ? `${p.color}14` : isCurrent ? 'rgba(175,197,255,0.06)' : 'transparent', border: isRec ? `1.5px solid ${p.color}44` : isCurrent ? '1px solid rgba(175,197,255,0.15)' : 'none' }}>
                  {isRec && <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full mb-0.5" style={{ background: `${p.color}20`, color: p.color }}>Recommended</span>}
                  {isCurrent && !isRec && <span className="font-body text-[8px] font-bold px-1.5 py-0.5 rounded-full mb-0.5" style={{ background: 'rgba(175,197,255,0.1)', color: 'rgba(175,197,255,0.6)' }}>Current</span>}
                  <p className="font-display text-xs font-extrabold" style={{ color: p.color }}>{p.name}</p>
                  <p className="font-mono text-[9px]" style={{ color: isRec || isCurrent ? p.color : 'rgba(175,197,255,0.4)' }}>{p.price}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature rows by category */}
        <div className="flex flex-col">
          {CATEGORIES.map(cat => {
            const rows = FEATURES.filter(f => f.category === cat)
            const open = openCategories.has(cat)
            return (
              <div key={cat}>
                <button onClick={() => toggle(cat)}
                  className="flex items-center w-full px-4 py-2.5 transition-colors hover:bg-surface-hi"
                  style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}>
                  <p className="font-body text-[10px] font-bold uppercase tracking-wider text-text-muted flex-1 text-left">{cat}</p>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
                    <path d="M2.5 5l4 4 4-4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open && rows.map((row, i) => (
                  <div key={row.label}>
                    <div className="flex items-center px-4 py-2.5 gap-1"
                      style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent' }}>
                      <p className="font-body text-[11px] text-text-muted leading-tight" style={{ flex: 1 }}>{row.label}</p>
                      {PLANS.map(p => {
                        const val = row[p.id as keyof typeof row] as string | boolean
                        return (
                          <div key={p.id} style={{ width: COL_W }} className="flex items-center justify-center">
                            <Cell val={val} color={p.color} />
                          </div>
                        )
                      })}
                    </div>
                    {row.note && (
                      <p className="px-4 pb-2 font-body text-[9px] leading-relaxed" style={{ color: 'rgba(63,231,255,0.5)' }}>
                        ↳ {row.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* CTA row */}
        <div className="flex px-4 gap-1.5 pt-5 pb-2">
          <div style={{ flex: 1 }} />
          {PLANS.map(p => {
            const isCurrent = p.id === currentPlan
            const isRec = p.id === recommendedPlan
            const isDowngrade = PLANS.findIndex(x => x.id === p.id) < PLANS.findIndex(x => x.id === currentPlan)
            return (
              <div key={p.id} style={{ width: COL_W }} className="flex flex-col items-center">
                {isCurrent ? (
                  <div className="w-full h-9 rounded-[--radius-xl] flex items-center justify-center"
                    style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)' }}>
                    <p className="font-body text-[9px] font-bold" style={{ color: 'rgba(175,197,255,0.4)' }}>Current</p>
                  </div>
                ) : (
                  <button onClick={() => onSelectPlan?.(p.id)}
                    className="w-full h-9 rounded-[--radius-xl] font-body text-[10px] font-semibold transition-all active:scale-[0.96]"
                    style={{ background: isRec ? `${p.color}18` : 'rgba(175,197,255,0.05)', border: `1px solid ${isRec ? `${p.color}44` : 'rgba(175,197,255,0.12)'}`, color: isRec ? p.color : isDowngrade ? 'rgba(175,197,255,0.4)' : p.color }}>
                    {isDowngrade ? 'Downgrade' : 'Select'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
