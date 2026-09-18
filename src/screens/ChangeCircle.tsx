import { useState } from 'react'

type ConnStatus = 'active' | 'pending'

interface Connection {
  id: string
  initials: string
  firstName: string
  joinedDate: string
  status: ConnStatus
  color: string
}

const CONNECTIONS: Connection[] = []

const MILESTONES = [1, 3, 5, 10, 25, 50, 100]

interface ChangeCircleProps {
  userName?: string
  onBack?: () => void
  onInvite?: () => void
  onViewMilestones?: () => void
}

export default function ChangeCircle({ userName = 'Maya', onBack, onInvite, onViewMilestones }: ChangeCircleProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const active  = CONNECTIONS.filter(c => c.status === 'active')
  const pending = CONNECTIONS.filter(c => c.status === 'pending')
  const nextMilestone = MILESTONES.find(m => m > active.length) ?? 100

  const selected = CONNECTIONS.find(c => c.id === selectedId)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">My Change Circle</p>
        <button onClick={onInvite}
          className="h-9 px-4 rounded-full font-body text-xs font-semibold text-white flex items-center gap-1.5 transition-all active:scale-[0.96]"
          style={{ background: 'var(--gradient-primary)' }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 2v7M2 5.5h7" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg>
          Invite
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Visual circle */}
        <div className="flex flex-col items-center py-4">
          <div className="relative" style={{ width: 220, height: 220 }}>
            {/* Outer ring */}
            <svg width="220" height="220" viewBox="0 0 220 220" className="absolute inset-0">
              <circle cx="110" cy="110" r="100" stroke="rgba(0,102,255,0.12)" strokeWidth="1" strokeDasharray="4 6" fill="none" />
              <circle cx="110" cy="110" r="72" stroke="rgba(63,231,255,0.1)" strokeWidth="1" fill="none" />
            </svg>
            {/* Center: user */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-[20px] flex items-center justify-center font-display text-xl font-extrabold text-white z-10"
              style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 24px rgba(63,231,255,0.4)' }}>
              {userName.slice(0, 2).toUpperCase()}
            </div>
            {/* Placed active connections on orbit */}
            {active.map((c, i) => {
              const angle = (i / Math.max(active.length, 1)) * Math.PI * 2 - Math.PI / 2
              const r = 72
              const x = 110 + r * Math.cos(angle) - 20
              const y = 110 + r * Math.sin(angle) - 20
              return (
                <button key={c.id} onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}
                  className="absolute w-10 h-10 rounded-2xl flex items-center justify-center font-display text-xs font-extrabold text-white transition-all active:scale-[0.93]"
                  style={{ left: x, top: y, background: `${c.color}22`, border: `2px solid ${c.color}66`, boxShadow: selectedId === c.id ? `0 0 14px ${c.color}55` : 'none', color: c.color, zIndex: 5 }}>
                  {c.initials}
                </button>
              )
            })}
            {/* Pending connections on outer ring */}
            {pending.map((c, i) => {
              const angle = (i / Math.max(pending.length, 1)) * Math.PI * 2 - Math.PI * 0.3
              const r = 100
              const x = 110 + r * Math.cos(angle) - 16
              const y = 110 + r * Math.sin(angle) - 16
              return (
                <button key={c.id} onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}
                  className="absolute w-8 h-8 rounded-xl flex items-center justify-center font-display text-[10px] font-extrabold transition-all"
                  style={{ left: x, top: y, background: 'rgba(245,183,0,0.1)', border: '1.5px dashed rgba(245,183,0,0.4)', color: '#F5B700', zIndex: 4 }}>
                  {c.initials}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#3FE7FF]" />
              <p className="font-body text-[10px] text-text-muted">{active.length} Active</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full border border-[#F5B700]" style={{ background: 'transparent' }} />
              <p className="font-body text-[10px] text-text-muted">{pending.length} Pending</p>
            </div>
          </div>
        </div>

        {/* Selected connection detail */}
        {selected && (
          <div className="animate-fade-in rounded-[--radius-xl] px-4 py-4 flex items-center gap-3"
            style={{ background: `${selected.color}0C`, border: `1.5px solid ${selected.color}33` }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-display text-sm font-extrabold shrink-0"
              style={{ background: `${selected.color}18`, border: `1.5px solid ${selected.color}44`, color: selected.color }}>
              {selected.initials}
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-text">{selected.firstName}</p>
              <p className="font-body text-[10px] text-text-muted">Joined {selected.joinedDate}</p>
            </div>
            <span className="font-body text-[10px] font-bold px-2 py-1 rounded-full"
              style={{ background: selected.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(245,183,0,0.12)', color: selected.status === 'active' ? '#22C55E' : '#F5B700' }}>
              {selected.status === 'active' ? 'Active' : 'Pending'}
            </span>
          </div>
        )}

        {/* Progress to next milestone */}
        <div className="rounded-[--radius-2xl] px-5 py-4"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="flex justify-between items-baseline mb-3">
            <p className="font-display text-sm font-extrabold text-text">{active.length} Active Connections</p>
            <button onClick={onViewMilestones} className="font-body text-[10px] font-semibold" style={{ color: '#3FE7FF' }}>See milestones →</button>
          </div>
          <div className="h-2 w-full rounded-full mb-2" style={{ background: 'rgba(175,197,255,0.08)' }}>
            <div className="h-full rounded-full"
              style={{ width: `${Math.min((active.length / nextMilestone) * 100, 100)}%`, background: 'var(--gradient-primary)' }} />
          </div>
          <p className="font-body text-[10px] text-text-muted">
            {nextMilestone - active.length} more to reach the {nextMilestone}-connection milestone
          </p>
        </div>

        {/* All connections list */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Your Connections</p>
          <div className="flex flex-col gap-2">
            {CONNECTIONS.map(c => (
              <button key={c.id} onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all"
                style={{ background: selectedId === c.id ? `${c.color}0A` : 'rgba(175,197,255,0.03)', border: `1px solid ${selectedId === c.id ? `${c.color}33` : 'rgba(175,197,255,0.09)'}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-xs font-extrabold shrink-0"
                  style={{ background: `${c.color}14`, border: `1px solid ${c.color}30`, color: c.color }}>
                  {c.initials}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{c.firstName}</p>
                  <p className="font-body text-[10px] text-text-muted">Joined {c.joinedDate}</p>
                </div>
                <span className="font-body text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: c.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(245,183,0,0.1)', color: c.status === 'active' ? '#22C55E' : '#F5B700' }}>
                  {c.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={onInvite}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 2v11M2 7.5h11" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
          Invite Someone New
        </button>
      </div>
    </div>
  )
}
