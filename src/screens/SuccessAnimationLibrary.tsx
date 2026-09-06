import { useState } from 'react'

interface SuccessEntry {
  id: string
  name: string
  screen: string
  trigger: string
  primaryColor: string
  glowColor: string
  bgColor: string
  borderColor: string
  animationType: string
  icon: React.ReactNode
  usePulse: boolean
}

const ENTRIES: SuccessEntry[] = [
  {
    id: 'payment',
    name: 'Payment Success',
    screen: 'Screen 57',
    trigger: 'Send completes',
    primaryColor: '#3FE7FF',
    glowColor: 'rgba(63,231,255,0.35)',
    bgColor: 'rgba(63,231,255,0.1)',
    borderColor: 'rgba(63,231,255,0.3)',
    animationType: 'Scale-in ring → check draw → Pulse ECG',
    usePulse: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#3FE7FF" strokeWidth="1.8" fill="rgba(63,231,255,0.08)" />
        <path d="M8.5 14l4 4 7-7" stroke="#3FE7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'goal',
    name: 'Goal Celebration',
    screen: 'Screen 108',
    trigger: 'Goal fully funded',
    primaryColor: '#22C55E',
    glowColor: 'rgba(34,197,94,0.3)',
    bgColor: 'rgba(34,197,94,0.08)',
    borderColor: 'rgba(34,197,94,0.25)',
    animationType: 'Confetti burst → emoji ring → stat reveal',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#22C55E" strokeWidth="1.8" fill="rgba(34,197,94,0.08)"
          strokeDasharray="6 3">
          <animateTransform attributeName="transform" type="rotate" from="0 14 14" to="360 14 14" dur="10s" repeatCount="indefinite" />
        </circle>
        <text x="14" y="19" textAnchor="middle" fontSize="13">🏆</text>
      </svg>
    ),
  },
  {
    id: 'kycsuccess',
    name: 'KYC Approved',
    screen: 'Screen 33',
    trigger: 'Identity verified',
    primaryColor: '#22C55E',
    glowColor: 'rgba(34,197,94,0.3)',
    bgColor: 'rgba(34,197,94,0.08)',
    borderColor: 'rgba(34,197,94,0.25)',
    animationType: 'Ring draw animation → checkmark',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l2.4 3.6 4.2-.6 .6 4.2 3.6 2.4-3.6 2.4-.6 4.2-4.2-.6L14 24l-2.4-3.6-4.2.6-.6-4.2L3.2 14l3.6-2.4.6-4.2 4.2.6z"
          stroke="#22C55E" strokeWidth="1.5" fill="rgba(34,197,94,0.08)" />
        <path d="M10 14l3 3 5-5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'compliance',
    name: 'Compliance Approved',
    screen: 'Screen 221',
    trigger: 'Compliance review passes',
    primaryColor: '#22C55E',
    glowColor: 'rgba(34,197,94,0.28)',
    bgColor: 'rgba(34,197,94,0.07)',
    borderColor: 'rgba(34,197,94,0.22)',
    animationType: 'Shield fill → access-restored list reveal',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l9 3v7c0 5-4 9-9 10-5-1-9-5-9-10V7z" stroke="#22C55E" strokeWidth="1.6" fill="rgba(34,197,94,0.1)" />
        <path d="M10 14l3 3 5-5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'milestone',
    name: 'Milestone Reveal',
    screen: 'Screen 147',
    trigger: 'Savings milestone hit',
    primaryColor: '#F5B700',
    glowColor: 'rgba(245,183,0,0.35)',
    bgColor: 'rgba(245,183,0,0.08)',
    borderColor: 'rgba(245,183,0,0.25)',
    animationType: 'Badge flip → shimmer sweep',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="13" r="8" stroke="#F5B700" strokeWidth="1.6" fill="rgba(245,183,0,0.1)" />
        <path d="M11 19l3 5 3-5" stroke="#F5B700" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.5 13l2 2 4-4" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'bonus',
    name: 'Bonus / Boost Activated',
    screen: 'Inline widget',
    trigger: 'Change Points redeemed',
    primaryColor: '#9945FF',
    glowColor: 'rgba(153,69,255,0.35)',
    bgColor: 'rgba(153,69,255,0.08)',
    borderColor: 'rgba(153,69,255,0.25)',
    animationType: 'Starburst expand → shimmer particles',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l2 6h6l-5 4 2 6-5-3.5L9 20l2-6-5-4h6z" stroke="#9945FF" strokeWidth="1.5" fill="rgba(153,69,255,0.1)" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'feature',
    name: "Feature Shipped",
    screen: 'Screen 196',
    trigger: "Feature request delivered",
    primaryColor: '#3FE7FF',
    glowColor: 'rgba(63,231,255,0.28)',
    bgColor: 'rgba(63,231,255,0.06)',
    borderColor: 'rgba(63,231,255,0.2)',
    animationType: 'Rocket launch → sparkle trail',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 20c0 0 0-8 6-12s8-4 8-4-0 4-4 8-12 8-12 8z" stroke="#3FE7FF" strokeWidth="1.5" fill="rgba(63,231,255,0.1)" strokeLinejoin="round" />
        <circle cx="10" cy="18" r="2.5" stroke="#3FE7FF" strokeWidth="1.2" fill="rgba(63,231,255,0.08)" />
        <path d="M6 22l2-2M20 4l.5.5" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ticket',
    name: 'Ticket Resolved',
    screen: 'Screen 214',
    trigger: 'Support case closed',
    primaryColor: '#4D9FFF',
    glowColor: 'rgba(0,102,255,0.3)',
    bgColor: 'rgba(0,102,255,0.07)',
    borderColor: 'rgba(0,102,255,0.22)',
    animationType: 'Check stamp → 5-star reveal',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="6" width="18" height="16" rx="3" stroke="#4D9FFF" strokeWidth="1.5" fill="rgba(0,102,255,0.06)" />
        <path d="M9 14l3 3 7-6" stroke="#4D9FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'maintenance',
    name: "Maintenance Complete",
    screen: 'Screen 240',
    trigger: 'Maintenance window closes',
    primaryColor: '#22C55E',
    glowColor: 'rgba(34,197,94,0.28)',
    bgColor: 'rgba(34,197,94,0.06)',
    borderColor: 'rgba(34,197,94,0.2)',
    animationType: 'Status dots flip green → slide-up copy',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#22C55E" strokeWidth="1.6" fill="rgba(34,197,94,0.07)" />
        <path d="M9 14l3.5 3.5L20 10" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'kyb',
    name: 'KYB Approved',
    screen: 'Screen 165',
    trigger: 'Business verified',
    primaryColor: '#F5B700',
    glowColor: 'rgba(245,183,0,0.3)',
    bgColor: 'rgba(245,183,0,0.07)',
    borderColor: 'rgba(245,183,0,0.22)',
    animationType: 'Building outline fill → checkmark',
    usePulse: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="10" width="18" height="14" rx="2" stroke="#F5B700" strokeWidth="1.5" fill="rgba(245,183,0,0.08)" />
        <path d="M9 10V7l5-3 5 3v3" stroke="#F5B700" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M11 20v-5h6v5" stroke="#F5B700" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function SuccessAnimationLibrary() {
  const [selected, setSelected] = useState<string | null>(null)
  const detail = ENTRIES.find(e => e.id === selected)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(34,197,94,0.8)' }}>Design System · Internal Reference</p>
        </div>
        <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Success Animation Library</p>
        <p className="font-body text-[10px] text-text-muted mt-0.5">{ENTRIES.length} patterns · tap any card to inspect</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Legend */}
        <div className="flex gap-4 flex-wrap">
          {[
            { color: '#22C55E', label: 'Green — resolution / approval' },
            { color: '#3FE7FF', label: 'Cyan — payment / feature' },
            { color: '#F5B700', label: 'Amber — milestone / badge' },
            { color: '#9945FF', label: 'Purple — reward / bonus' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
              <p className="font-body text-[9px] text-text-muted">{l.label}</p>
            </div>
          ))}
        </div>

        {/* Pulse callout */}
        <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M1 7h2.5l2-4 2.5 8 2-4H13" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            <span className="text-text font-semibold">Pulse ECG</span> fires only on: Balance refresh · AI thinking · Payment success · Splash. Never on other success states.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {ENTRIES.map(entry => (
            <button
              key={entry.id}
              onClick={() => setSelected(selected === entry.id ? null : entry.id)}
              className="flex flex-col gap-3 p-4 rounded-[--radius-2xl] text-left transition-all active:scale-[0.97]"
              style={{
                background: selected === entry.id ? entry.bgColor : 'rgba(175,197,255,0.03)',
                border: `1px solid ${selected === entry.id ? entry.borderColor : 'rgba(175,197,255,0.09)'}`,
                boxShadow: selected === entry.id ? `0 0 16px ${entry.glowColor}` : 'none',
              }}
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                style={{ background: entry.bgColor, border: `1px solid ${entry.borderColor}`, boxShadow: `0 0 10px ${entry.glowColor}` }}>
                {entry.icon}
              </div>

              {/* Name + screen */}
              <div>
                <p className="font-body text-xs font-bold text-text leading-tight">{entry.name}</p>
                <p className="font-body text-[9px] text-text-muted mt-0.5">{entry.screen}</p>
              </div>

              {/* Color swatch + Pulse flag */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: entry.primaryColor, boxShadow: `0 0 4px ${entry.primaryColor}` }} />
                <span className="font-mono text-[9px]" style={{ color: 'rgba(175,197,255,0.45)' }}>{entry.primaryColor}</span>
                {entry.usePulse && (
                  <span className="ml-auto px-1.5 py-0.5 rounded font-body text-[8px] font-bold"
                    style={{ background: 'rgba(63,231,255,0.1)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.2)' }}>
                    PULSE
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {detail && (
          <div
            className="px-4 py-4 rounded-[--radius-2xl] flex flex-col gap-3"
            style={{
              background: detail.bgColor,
              border: `1px solid ${detail.borderColor}`,
              boxShadow: `0 0 20px ${detail.glowColor}`,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[16px] flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${detail.borderColor}` }}>
                {detail.icon}
              </div>
              <div>
                <p className="font-display text-sm font-extrabold text-text">{detail.name}</p>
                <p className="font-body text-[10px] text-text-muted">{detail.screen}</p>
              </div>
            </div>
            {[
              { label: 'Trigger', value: detail.trigger },
              { label: 'Animation', value: detail.animationType },
              { label: 'Primary color', value: detail.primaryColor },
              { label: 'Pulse ECG', value: detail.usePulse ? 'Yes — fires on this state' : 'No' },
            ].map(row => (
              <div key={row.label} className="flex items-start justify-between gap-4"
                style={{ borderTop: '1px solid rgba(175,197,255,0.07)', paddingTop: 8 }}>
                <p className="font-body text-[10px] text-text-muted shrink-0">{row.label}</p>
                <p className="font-body text-[11px] font-semibold text-text text-right">{row.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
