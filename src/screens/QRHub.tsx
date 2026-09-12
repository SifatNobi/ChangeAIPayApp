import { useState, useCallback } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'

interface QRHubProps {
  handle?: string
  displayName?: string
  avatarInitials?: string
  avatarColor?: string
  onScan?: () => void
  onBack?: () => void
  onSelectContact?: (name: string) => void
}

const RECENT_QR = [
  { initials: 'AJ', name: 'Alex',   color: '#0066FF', handle: '@alexj',    verified: true },
  { initials: 'SK', name: 'Sarah',  color: '#3FE7FF', handle: '@sarahk',   verified: true },
  { initials: 'JL', name: 'Jamie',  color: '#7B4FFF', handle: '@jamielee', verified: true },
  { initials: 'RP', name: 'Raj',    color: '#FF6B6B', handle: '@rajp',     verified: false },
  { initials: 'NC', name: 'Nina',   color: '#FF9F43', handle: '@ninac',    verified: true },
]

function MiniQR({ value, size = 200 }: { value: string; size?: number }) {
  const seed = value.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const cols = 9
  const pseudo = (i: number) => (((seed * 31 + i * 17) ^ (i * 7 + 13)) % 3) !== 0
  return (
    <div
      className="rounded-[20px] bg-white p-3"
      style={{ width: size, height: size, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1.5 }}
    >
      {Array.from({ length: cols * cols }).map((_, i) => {
        const row = Math.floor(i / cols), col = i % cols
        const corner =
          (row < 4 && col < 4) || (row < 4 && col >= 5) || (row >= 5 && col < 4)
        return (
          <div
            key={i}
            style={{ borderRadius: 1.5, backgroundColor: corner || pseudo(i) ? '#050B2D' : 'transparent' }}
          />
        )
      })}
    </div>
  )
}

export default function QRHub({
  handle = '@mayapatel',
  displayName = 'Maya Patel',
  avatarInitials = 'MP',
  avatarColor = '#0066FF',
  onScan,
  onBack,
  onSelectContact,
}: QRHubProps) {
  const [tab, setTab] = useState<'my' | 'scan'>('my')
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          <img src={logoSrc} alt="ChangeAIPay" className="w-5 h-5 object-contain" />
          <span className="font-body text-sm font-semibold text-text">QR Pay</span>
        </div>
        <div className="w-11" />
      </div>

      {/* Toggle */}
      <div className="mx-5 mb-5 flex p-1 rounded-[--radius-2xl]" style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
        {(['my', 'scan'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); if (t === 'scan') onScan?.() }}
            className="flex-1 h-10 rounded-[--radius-xl] font-body text-sm font-semibold transition-all duration-[200ms] flex items-center justify-center gap-2"
            style={{
              background: tab === t ? 'rgba(0,102,255,0.2)' : 'transparent',
              color: tab === t ? '#AFC5FF' : 'rgba(175,197,255,0.4)',
              border: tab === t ? '1px solid rgba(0,102,255,0.3)' : '1px solid transparent',
            }}
          >
            {t === 'my' ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="9.5" y="9.5" width="2" height="2" rx="0.5" fill="currentColor" />
                </svg>
                My QR
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 4V2a1 1 0 0 1 1-1h2M10 1h2a1 1 0 0 1 1 1v2M13 10v2a1 1 0 0 1-1 1h-2M4 13H2a1 1 0 0 1-1-1v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Scan
              </>
            )}
          </button>
        ))}
      </div>

      {tab === 'my' && (
        <div className="flex flex-col items-center px-5 gap-5">
          {/* Profile */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-body text-base font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${avatarColor}cc, ${avatarColor}44)` }}
            >
              {avatarInitials}
            </div>
            <p className="font-body text-sm font-semibold text-text">{displayName}</p>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.18)' }}>
              <span className="font-mono text-xs font-semibold text-accent">{handle}</span>
            </div>
          </div>

          {/* QR card */}
          <div
            className="flex flex-col items-center gap-4 px-6 pt-6 pb-5 rounded-[--radius-2xl] w-full"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.12)', backdropFilter: 'blur(16px)' }}
          >
            <MiniQR value={handle} size={208} />
            <div className="flex items-center gap-2 opacity-50">
              <img src={logoSrc} alt="ChangeAIPay" className="w-3.5 h-3.5 object-contain" />
              <p className="font-mono text-[10px] text-text-muted">changeaipay.app/{handle.replace('@', '')}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            {[
              { label: 'Save Image', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 10v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 2v8M5 7l3 3 3-3" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { label: 'Share Link', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-3 3M14 5H7a4 4 0 0 0-4 4v2" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { label: copied ? 'Copied!' : 'Copy Handle', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.2"/><path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="rgba(175,197,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/></svg>, action: handleCopy },
            ].map(a => (
              <button
                key={a.label}
                onClick={a.action}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[--radius-xl] transition-all duration-[180ms] active:scale-[0.95]"
                style={{ background: 'rgba(175,197,255,0.05)', border: `1px solid ${copied && a.label.includes('Copy') ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.1)'}` }}
              >
                {a.icon}
                <span className={`font-body text-[10px] ${copied && a.label.includes('Copy') ? 'text-success' : 'text-text-muted'}`}>{a.label}</span>
              </button>
            ))}
          </div>

          {/* Recent QR contacts */}
          <div className="w-full">
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Recent</p>
            <div className="flex flex-col gap-2">
              {RECENT_QR.map(c => (
                <button
                  key={c.handle}
                  onClick={() => onSelectContact?.(c.name)}
                  className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] transition-all duration-[180ms] active:scale-[0.98] w-full"
                  style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}
                >
                  <div className="relative shrink-0">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-body text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${c.color}cc, ${c.color}44)` }}
                    >
                      {c.initials}
                    </div>
                    {c.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#22C55E' }}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5l1.8 1.8 3-3.6" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-body text-sm font-semibold text-text">{c.name}</p>
                    <p className="font-mono text-xs text-text-muted">{c.handle}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'scan' && (
        <div className="flex flex-col items-center gap-4 px-5 mt-4">
          {/* Redirect hint */}
          <div
            className="w-full flex items-center gap-3 px-4 py-4 rounded-[--radius-2xl]"
            style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.2)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 6V3a1 1 0 0 1 1-1h3M14 2h3a1 1 0 0 1 1 1v3M18 14v3a1 1 0 0 1-1 1h-3M6 18H3a1 1 0 0 1-1-1v-3" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="10" cy="10" r="2.5" stroke="#3FE7FF" strokeWidth="1.3" />
            </svg>
            <p className="font-body text-sm text-text-2">Opening the QR scanner…</p>
          </div>
          <button
            onClick={onScan}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all duration-[200ms] active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            Open Camera
          </button>
        </div>
      )}
    </div>
  )
}
