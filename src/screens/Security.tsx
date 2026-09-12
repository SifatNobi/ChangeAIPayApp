import { useState } from 'react'

interface SecurityProps {
  onBack?: () => void
  onChangePin?: () => void
  onBiometric?: () => void
  onTwoFactor?: () => void
  onExportWallet?: () => void
  onNetworkTransparency?: () => void
}

type LoginEntry = { id: string; device: string; location: string; ts: string; current?: boolean }
type SessionEntry = { id: string; device: string; os: string; lastSeen: string; current?: boolean }

const SESSIONS: SessionEntry[] = [
  { id: 's1', device: 'iPhone 16 Pro',    os: 'iOS 18.4',       lastSeen: 'Now',         current: true  },
  { id: 's2', device: 'MacBook Pro 16"',  os: 'macOS 15.4',     lastSeen: '2h ago',      current: false },
  { id: 's3', device: 'iPad Pro 13"',     os: 'iPadOS 18.3',    lastSeen: 'Yesterday',   current: false },
]

const LOGIN_HISTORY: LoginEntry[] = [
  { id: 'l1', device: 'iPhone 16 Pro',   location: 'New York, US',     ts: 'Today 09:14' },
  { id: 'l2', device: 'MacBook Pro 16"', location: 'New York, US',     ts: 'Today 07:32' },
  { id: 'l3', device: 'iPhone 16 Pro',   location: 'New York, US',     ts: 'Yesterday 18:05' },
  { id: 'l4', device: 'Unknown device',  location: 'Chicago, US',      ts: 'Aug 28, 22:41' },
]

function RowLink({ icon, label, sub, onPress, danger }: { icon: React.ReactNode; label: string; sub?: string; onPress?: () => void; danger?: boolean }) {
  return (
    <button onClick={onPress}
      className="flex items-center gap-3 px-4 py-3.5 w-full text-left transition-colors hover:bg-surface-hi"
      style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: danger ? 'rgba(255,77,90,0.1)' : 'rgba(175,197,255,0.06)', border: `1px solid ${danger ? 'rgba(255,77,90,0.25)' : 'rgba(175,197,255,0.1)'}` }}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-body text-sm font-semibold" style={{ color: danger ? '#FF4D5A' : 'var(--color-text)' }}>{label}</p>
        {sub && <p className="font-body text-[10px] text-text-muted">{sub}</p>}
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke={danger ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.35)'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function Security({ onBack, onChangePin, onBiometric, onTwoFactor, onExportWallet, onNetworkTransparency }: SecurityProps) {
  const [biometricOn, setBiometricOn] = useState(true)
  const [sessions, setSessions] = useState(SESSIONS)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [showPwChange, setShowPwChange] = useState(false)
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  const removeSession = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      setSessions(prev => prev.filter(s => s.id !== id))
      setRemovingId(null)
    }, 800)
  }

  const handleSavePw = () => {
    if (!newPw || newPw !== confirmPw) return
    setPwSaved(true)
    setShowPwChange(false)
    setNewPw('')
    setConfirmPw('')
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Security</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Password */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Password</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {!showPwChange ? (
              <button onClick={() => { setShowPwChange(true); setPwSaved(false) }}
                className="flex items-center gap-3 px-4 py-4 w-full text-left hover:bg-surface-hi transition-colors">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="6.5" r="2" stroke="#0066FF" strokeWidth="1.1" />
                    <path d="M3 12.5s-.2-2.8 4-2.8 4 2.8 4 2.8" stroke="#0066FF" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">Change Password</p>
                  <p className="font-body text-[10px] text-text-muted">Last changed 3 months ago</p>
                </div>
                {pwSaved && (
                  <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>Changed</span>
                )}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <div className="px-4 py-4 flex flex-col gap-3">
                <p className="font-body text-sm font-semibold text-text">New Password</p>
                <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Enter new password"
                  className="h-11 px-3.5 rounded-[--radius-xl] font-body text-sm text-text outline-none"
                  style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }} />
                <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Confirm new password"
                  className="h-11 px-3.5 rounded-[--radius-xl] font-body text-sm text-text outline-none"
                  style={{ background: 'rgba(175,197,255,0.05)', border: `1px solid ${confirmPw && confirmPw !== newPw ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.12)'}` }} />
                {confirmPw && confirmPw !== newPw && <p className="font-body text-[10px]" style={{ color: '#FF4D5A' }}>Passwords do not match</p>}
                <div className="flex gap-2 pt-1">
                  <button onClick={() => { setShowPwChange(false); setNewPw(''); setConfirmPw('') }}
                    className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold"
                    style={{ background: 'rgba(175,197,255,0.06)', color: 'rgba(175,197,255,0.6)', border: '1px solid rgba(175,197,255,0.1)' }}>
                    Cancel
                  </button>
                  <button onClick={handleSavePw} disabled={!newPw || newPw !== confirmPw}
                    className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold text-white transition-all disabled:opacity-30"
                    style={{ background: 'var(--gradient-primary)' }}>
                    Save Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Authentication */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Authentication</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {/* PIN */}
            <RowLink
              icon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="5.5" width="10" height="7.5" rx="1.5" stroke="#3FE7FF" strokeWidth="1.1" /><path d="M5 5.5V4a2 2 0 0 1 4 0v1.5" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" /></svg>}
              label="Change PIN"
              sub="6-digit transaction PIN"
              onPress={onChangePin}
            />
            {/* Biometrics */}
            <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: biometricOn ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.06)', border: `1px solid ${biometricOn ? 'rgba(63,231,255,0.25)' : 'rgba(175,197,255,0.1)'}` }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 5C2 2.8 4.2 1 7 1s5 1.8 5 4" stroke={biometricOn ? '#3FE7FF' : 'rgba(175,197,255,0.35)'} strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="7" cy="7.5" r="2" stroke={biometricOn ? '#3FE7FF' : 'rgba(175,197,255,0.35)'} strokeWidth="1.1" />
                  <path d="M4 10.5c.8 1.3 1.8 2 3 2s2.2-.7 3-2" stroke={biometricOn ? '#3FE7FF' : 'rgba(175,197,255,0.35)'} strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">Face ID / Biometrics</p>
                <p className="font-body text-[10px] text-text-muted">Unlock app and approve transfers</p>
              </div>
              <button onClick={() => { setBiometricOn(p => !p); onBiometric?.() }}
                className="relative w-11 h-6 rounded-full transition-all duration-[200ms] shrink-0"
                style={toggleStyle(biometricOn)}>
                <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-[200ms]"
                  style={{ left: biometricOn ? 'calc(100% - 22px)' : '2px' }} />
              </button>
            </div>
            {/* 2FA */}
            <RowLink
              icon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="8" rx="1.5" stroke="#9945FF" strokeWidth="1.1" /><path d="M5 4V3a2 2 0 0 1 4 0v1" stroke="#9945FF" strokeWidth="1.1" strokeLinecap="round" /><circle cx="7" cy="8" r="1" fill="#9945FF" /><line x1="7" y1="9" x2="7" y2="10.5" stroke="#9945FF" strokeWidth="0.9" strokeLinecap="round" /></svg>}
              label="Two-Factor Authentication"
              sub="Authenticator app · Enabled"
              onPress={onTwoFactor}
            />
          </div>
        </div>

        {/* Active sessions */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Active Sessions</p>
          <div className="flex flex-col gap-2">
            {sessions.map(s => (
              <div key={s.id} className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: `1px solid ${s.current ? 'rgba(63,231,255,0.2)' : 'rgba(175,197,255,0.09)'}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: s.current ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${s.current ? 'rgba(63,231,255,0.2)' : 'rgba(175,197,255,0.1)'}` }}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect x="2" y="2" width="11" height="8.5" rx="1.5" stroke={s.current ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.1" />
                    <path d="M5 13h5M7.5 10.5V13" stroke={s.current ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm font-semibold text-text truncate">{s.device}</p>
                    {s.current && <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(63,231,255,0.12)', color: '#3FE7FF' }}>This device</span>}
                  </div>
                  <p className="font-body text-[10px] text-text-muted">{s.os} · {s.lastSeen}</p>
                </div>
                {!s.current && (
                  <button onClick={() => removeSession(s.id)} disabled={removingId === s.id}
                    className="shrink-0 h-8 px-3 rounded-full font-body text-[10px] font-semibold transition-all disabled:opacity-40"
                    style={{ background: 'rgba(255,77,90,0.08)', color: '#FF4D5A', border: '1px solid rgba(255,77,90,0.2)' }}>
                    {removingId === s.id ? '...' : 'Sign out'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advanced / Nano */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Advanced &amp; Transparency</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            <RowLink
              onPress={onNetworkTransparency}
              icon={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12V2l10 10V2" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              label="Network Transparency"
              sub="Nano representatives &amp; voting weight"
            />
            <RowLink
              onPress={onExportWallet}
              danger
              icon={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#FF4D5A" strokeWidth="1.1" />
                  <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="#FF4D5A" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="7" cy="9.5" r="1" fill="#FF4D5A" />
                </svg>
              }
              label="Export Nano Wallet"
              sub="Advanced — reveals private key. Requires PIN + biometric."
            />
          </div>
        </div>

        {/* Login history */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Recent Login Activity</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {LOGIN_HISTORY.map((entry, i) => {
              const suspicious = entry.location === 'Chicago, US'
              return (
                <div key={entry.id} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ background: suspicious ? 'rgba(255,77,90,0.03)' : i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: suspicious ? 'rgba(255,77,90,0.1)' : 'rgba(175,197,255,0.05)' }}>
                    {suspicious
                      ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1.5L.5 10h10L5.5 1.5Z" stroke="#FF4D5A" strokeWidth="0.9" strokeLinejoin="round" /><line x1="5.5" y1="4.5" x2="5.5" y2="7" stroke="#FF4D5A" strokeWidth="0.8" strokeLinecap="round" /></svg>
                      : <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs font-semibold truncate" style={{ color: suspicious ? '#FF4D5A' : 'var(--color-text)' }}>{entry.device}</p>
                    <p className="font-body text-[10px] text-text-muted">{entry.location} · {entry.ts}</p>
                  </div>
                  {suspicious && <span className="font-body text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(255,77,90,0.1)', color: '#FF4D5A', border: '1px solid rgba(255,77,90,0.25)' }}>Review</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
