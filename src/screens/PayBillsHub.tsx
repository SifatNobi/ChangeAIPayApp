import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

export interface Biller {
  id: string
  name: string
  category: string
  color: string
  icon: React.ReactNode
}

const BILLERS: Biller[] = [
  { id: 'con_ed',      name: 'Con Edison',       category: 'Utilities',   color: '#F5B700', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L4 10h5l-2 6 7-9h-5l2-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> },
  { id: 'verizon',     name: 'Verizon',           category: 'Phone',       color: '#DC2626', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 4l4 10 4-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { id: 'att',         name: 'AT&T',              category: 'Phone',       color: '#1D4ED8', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" /><ellipse cx="9" cy="9" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1.3" /></svg> },
  { id: 'spectrum',    name: 'Spectrum',          category: 'Internet',    color: '#7C3AED', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9a6 6 0 0 1 12 0M5 9a4 4 0 0 1 8 0M7 9a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> },
  { id: 'xfinity',     name: 'Xfinity',           category: 'Internet',    color: '#0066FF', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9a6 6 0 0 1 12 0M5 9a4 4 0 0 1 8 0M7 9a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> },
  { id: 'geico',       name: 'GEICO',             category: 'Insurance',   color: '#16A34A', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 5v5c0 4 2.5 5.5 6 6 3.5-.5 6-2 6-6V5L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> },
  { id: 'state_farm',  name: 'State Farm',        category: 'Insurance',   color: '#DC2626', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 5v5c0 4 2.5 5.5 6 6 3.5-.5 6-2 6-6V5L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> },
  { id: 'pseg',        name: 'PSE&G',             category: 'Utilities',   color: '#F97316', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L4 10h5l-2 6 7-9h-5l2-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> },
  { id: 'tmobile',     name: 'T-Mobile',          category: 'Phone',       color: '#E11D48', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 4l4 10 4-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { id: 'optimum',     name: 'Optimum',           category: 'Internet',    color: '#3FE7FF', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9a6 6 0 0 1 12 0M5 9a4 4 0 0 1 8 0M7 9a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> },
  { id: 'progressive', name: 'Progressive',       category: 'Insurance',   color: '#1D4ED8', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 5v5c0 4 2.5 5.5 6 6 3.5-.5 6-2 6-6V5L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> },
  { id: 'national_grid', name: 'National Grid',   category: 'Utilities',   color: '#059669', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L4 10h5l-2 6 7-9h-5l2-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> },
]

const CATEGORIES = ['All', 'Utilities', 'Phone', 'Internet', 'Insurance']

interface PayBillsHubProps {
  onSelectBiller?: (biller: Biller) => void
  onBack?: () => void
}

export default function PayBillsHub({ onSelectBiller, onBack }: PayBillsHubProps) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = BILLERS.filter(b => {
    const matchCat = cat === 'All' || b.category === cat
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="flex flex-col bg-bg min-h-screen">
      <div className="px-5 pt-4">
        <AuthHeader title="Pay Bills" onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Search */}
        <div className="relative">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <circle cx="6" cy="6" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M10 10l2.5 2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search billers…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-11 pl-9 pr-4 rounded-[--radius-xl] font-body text-sm text-text outline-none"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="h-8 px-4 rounded-full font-body text-xs font-semibold whitespace-nowrap transition-all active:scale-95"
              style={{
                background: cat === c ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.06)',
                color: cat === c ? 'white' : 'rgba(175,197,255,0.6)',
                border: `1px solid ${cat === c ? 'transparent' : 'rgba(175,197,255,0.12)'}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Billers list */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden"
          style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
        >
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-body text-sm text-text-muted">No billers found</p>
            </div>
          ) : filtered.map((b, i) => (
            <button
              key={b.id}
              onClick={() => onSelectBiller?.(b)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface/40 active:bg-surface/70"
              style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
            >
              <div className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
                style={{ background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>
                {b.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-text">{b.name}</p>
                <p className="font-body text-[10px] text-text-muted">{b.category}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        <p className="font-body text-[10px] text-text-muted text-center px-4">
          Don't see your biller? Contact support to request an addition.
        </p>
      </div>
    </div>
  )
}
