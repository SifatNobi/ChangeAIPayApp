import { useState } from 'react'
import Button from '@/components/Button'
import { Chip } from '@/components/Card'

interface AppUpdateProps {
  currentVersion?: string
  latestVersion?: string
  updateSize?: string
  onUpdate?: () => void
  onExit?: () => void
}

/* Minimal phone-download illustration — brand language, no decorative clutter */
function UpdateIllustration() {
  return (
    <svg width="160" height="140" viewBox="0 0 160 140" fill="none" aria-hidden="true">
      {/* Phone outline */}
      <rect x="50" y="10" width="60" height="100" rx="10" stroke="#AFC5FF" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect x="55" y="22" width="50" height="70" rx="5" fill="#101C4D" />
      {/* Home bar */}
      <rect x="68" y="115" width="24" height="3" rx="1.5" fill="#AFC5FF" fillOpacity="0.25" />
      {/* Screen — download icon */}
      <circle cx="80" cy="57" r="18" fill="rgba(0,102,255,0.12)" stroke="rgba(63,231,255,0.3)" strokeWidth="1" />
      {/* Arrow down */}
      <path d="M80 47v16M74 57l6 6 6-6" stroke="#3FE7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Progress bar */}
      <rect x="63" y="77" width="34" height="3" rx="1.5" fill="#101C4D" />
      <rect x="63" y="77" width="22" height="3" rx="1.5" fill="#0066FF" />
      {/* Version badge top right */}
      <rect x="98" y="2" width="36" height="18" rx="9" fill="#0066FF" fillOpacity="0.15" stroke="#0066FF" strokeOpacity="0.4" strokeWidth="1" />
      <text x="116" y="14" textAnchor="middle" fill="#3FE7FF" fontSize="8" fontFamily="JetBrains Mono, monospace">NEW</text>
      {/* Sparkles */}
      <circle cx="32" cy="30" r="2" fill="#3FE7FF" fillOpacity="0.5" />
      <circle cx="130" cy="70" r="1.5" fill="#0066FF" fillOpacity="0.6" />
      <circle cx="40" cy="90" r="1" fill="#AFC5FF" fillOpacity="0.4" />
    </svg>
  )
}

const whatsNew = [
  'Fina AI gains real-time spending alerts',
  'Instant international transfers to 45 new countries',
  'Redesigned transaction history with smart filters',
  'Security: passkey authentication support',
  'Performance: 40% faster app launch',
]

export default function AppUpdate({
  currentVersion = '2.4.1',
  latestVersion = '2.5.0',
  updateSize = '38 MB',
  onUpdate,
  onExit,
}: AppUpdateProps) {
  const [updating, setUpdating] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpdate = () => {
    setUpdating(true)
    // Animate progress
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 12 + 4
      setProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(interval)
        onUpdate?.()
      }
    }, 200)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg px-6 py-12">
      <div className="flex flex-col items-center flex-1 justify-center gap-8">
        <UpdateIllustration />

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-display text-2xl font-extrabold text-text">Update Available</h1>
          <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
            A new version of ChangeAIPay is ready. Update to keep your money safe and get the latest features.
          </p>
        </div>

        {/* Version comparison */}
        <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-[color:var(--color-border)]">
            <div className="p-4 flex flex-col gap-1">
              <p className="font-body text-xs text-text-muted uppercase tracking-widest">Current</p>
              <p className="font-mono text-lg font-medium text-text-2">v{currentVersion}</p>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <p className="font-body text-xs text-text-muted uppercase tracking-widest">Latest</p>
              <p className="font-mono text-lg font-medium text-accent">v{latestVersion}</p>
            </div>
          </div>
          <div className="border-t border-[color:var(--color-border)] px-4 py-3 flex items-center justify-between">
            <p className="font-body text-xs text-text-muted">Download size</p>
            <p className="font-mono text-xs text-text-2">{updateSize}</p>
          </div>
        </div>

        {/* What's new */}
        <div className="w-full flex flex-col gap-3">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">What's new</p>
          <div className="flex flex-col gap-2">
            {whatsNew.map(item => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-primary/12 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
                <p className="font-body text-sm text-text-2 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loading progress bar */}
        {updating && (
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-body text-xs text-text-2">Downloading update…</p>
              <p className="font-mono text-xs text-text-muted">{Math.round(progress)}%</p>
            </div>
            <div className="h-2 rounded-full bg-surface-hi overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${progress}%`,
                  background: 'var(--gradient-primary)',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-6">
        <Button
          variant="primary"
          fullWidth
          loading={updating}
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? 'Updating…' : 'Update Now'}
        </Button>
        <Button
          variant="ghost"
          fullWidth
          onClick={onExit}
          disabled={updating}
        >
          Exit App
        </Button>
      </div>
    </div>
  )
}
