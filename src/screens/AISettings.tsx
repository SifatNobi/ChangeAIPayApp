import { useState } from 'react'

type NotifFreq = 'realtime' | 'daily' | 'weekly' | 'off'

interface AISettingsProps {
  onBack?: () => void
  onMemory?: () => void
  onPrivacy?: () => void
}

export default function AISettings({ onBack, onMemory, onPrivacy }: AISettingsProps) {
  const [notifFreq,  setNotifFreq]  = useState<NotifFreq>('daily')
  const [voiceDefault, setVoiceDefault] = useState(false)
  const [proactiveAlerts, setProactiveAlerts] = useState(true)
  const [weeklyReport,    setWeeklyReport]    = useState(true)
  const [goalNudges,      setGoalNudges]      = useState(true)
  const [spendAlerts,     setSpendAlerts]     = useState(true)
  const [clearConfirm,    setClearConfirm]    = useState(false)
  const [memCleared,      setMemCleared]      = useState(false)

  const NOTIF_OPTIONS: { id: NotifFreq; label: string; sub: string }[] = [
    { id: 'realtime', label: 'Real-time',  sub: 'Notify immediately when Fina has a new insight' },
    { id: 'daily',    label: 'Daily digest',sub: 'One summary notification each morning' },
    { id: 'weekly',   label: 'Weekly recap',sub: "Every Monday — Fina's week in review" },
    { id: 'off',      label: 'Off',        sub: 'No proactive notifications from Fina' },
  ]

  const handleClearMemory = () => {
    if (!clearConfirm) { setClearConfirm(true); return }
    setMemCleared(true)
    setClearConfirm(false)
  }

  const toggleStyle = (on: boolean) => ({
    background: on ? '#0066FF' : 'rgba(175,197,255,0.15)',
    boxShadow: on ? '0 0 8px rgba(0,102,255,0.4)' : 'none',
  })

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">AI Settings</p>
          <p className="font-body text-[10px] text-text-muted">Fina preferences &amp; controls</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Notification frequency */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Proactive Suggestions</p>
          <div className="flex flex-col gap-2">
            {NOTIF_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => setNotifFreq(opt.id)}
                className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all duration-[150ms]"
                style={{ background: notifFreq === opt.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)', border: `1px solid ${notifFreq === opt.id ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}` }}>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{opt.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{opt.sub}</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: notifFreq === opt.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}>
                  {notifFreq === opt.id && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Specific alert toggles */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Alert Types</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {[
              { label: 'Proactive Insights',   sub: "Fina notices something and pings you", val: proactiveAlerts, set: setProactiveAlerts },
              { label: 'Weekly Report',         sub: 'Summary of your financial week',       val: weeklyReport,    set: setWeeklyReport    },
              { label: 'Goal Nudges',           sub: 'Progress updates on your goals',       val: goalNudges,      set: setGoalNudges      },
              { label: 'Spend Over-Budget',     sub: 'Alert when a category exceeds limit',  val: spendAlerts,     set: setSpendAlerts     },
            ].map((row, i) => (
              <div key={row.label} className="flex items-center gap-3 px-4 py-3.5"
                style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{row.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{row.sub}</p>
                </div>
                <button onClick={() => row.set((p: boolean) => !p)}
                  className="relative w-11 h-6 rounded-full transition-all duration-[200ms] shrink-0"
                  style={toggleStyle(row.val)}>
                  <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-[200ms]"
                    style={{ left: row.val ? 'calc(100% - 22px)' : '2px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Mode default */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Voice Mode</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: voiceDefault ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${voiceDefault ? 'rgba(63,231,255,0.25)' : 'rgba(175,197,255,0.1)'}` }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" stroke={voiceDefault ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.2" />
                  <path d="M3 7.5A5 5 0 0 0 13 7.5" stroke={voiceDefault ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="8" y1="12.5" x2="8" y2="14.5" stroke={voiceDefault ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">Default to Voice Mode</p>
                <p className="font-body text-[10px] text-text-muted">Open voice conversation when accessing Fina</p>
              </div>
              <button onClick={() => setVoiceDefault(p => !p)}
                className="relative w-11 h-6 rounded-full transition-all duration-[200ms] shrink-0"
                style={{ background: voiceDefault ? '#3FE7FF' : 'rgba(175,197,255,0.15)', boxShadow: voiceDefault ? '0 0 8px rgba(63,231,255,0.4)' : 'none' }}>
                <div className="absolute top-0.5 h-5 w-5 rounded-full transition-all duration-[200ms]"
                  style={{ left: voiceDefault ? 'calc(100% - 22px)' : '2px', background: voiceDefault ? '#050B2D' : 'white' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Data usage summary — links to Privacy + Memory */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Data &amp; Memory</p>
          <div className="flex flex-col gap-2">
            <button onClick={onPrivacy}
              className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all hover:bg-surface-hi"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(153,69,255,0.12)', border: '1px solid rgba(153,69,255,0.25)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5l4.5 2v3.5c0 2.8-2 5.2-4.5 6-2.5-.8-4.5-3.2-4.5-6V3.5L7 1.5Z" stroke="#9945FF" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">Data Access &amp; Privacy</p>
                <p className="font-body text-[10px] text-text-muted">Control what Fina can access</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <button onClick={onMemory}
              className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all hover:bg-surface-hi"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.22)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <ellipse cx="7" cy="5.5" rx="5.5" ry="4" stroke="#3FE7FF" strokeWidth="1.1" />
                  <path d="M1.5 5.5c0 2.5 2.5 4.5 5.5 4.5s5.5-2 5.5-4.5" stroke="#3FE7FF" strokeWidth="1.1" />
                  <path d="M7 9.5V12" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">AI Memory</p>
                <p className="font-body text-[10px] text-text-muted">View and edit what Fina remembers</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* Clear memory */}
        <div>
          {memCleared ? (
            <div className="w-full h-12 rounded-[--radius-2xl] flex items-center justify-center gap-2"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3.5 3.5 5.5-5.5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Memory cleared</p>
            </div>
          ) : (
            <button onClick={handleClearMemory}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
              style={{
                background: clearConfirm ? 'rgba(255,77,90,0.12)' : 'rgba(255,77,90,0.06)',
                border: `1px solid ${clearConfirm ? 'rgba(255,77,90,0.4)' : 'rgba(255,77,90,0.2)'}`,
                color: '#FF4D5A',
              }}>
              {clearConfirm ? '⚠ Tap again to confirm reset' : 'Reset AI Memory'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
