import { useState } from 'react'
import Button from '@/components/Button'
import { Chip } from '@/components/Card'

interface MaintenanceProps {
  estimatedTime?: string
  onNotify?: () => void
  onRetry?: () => void
}

/* Calm maintenance illustration — tools, not alarm */
function MaintenanceIllustration() {
  return (
    <svg width="160" height="140" viewBox="0 0 160 140" fill="none" aria-hidden="true">
      {/* Background circle */}
      <circle cx="80" cy="72" r="48" fill="rgba(16,28,77,0.8)" stroke="rgba(175,197,255,0.1)" strokeWidth="1" />
      {/* Gear large */}
      <g transform="translate(58,50)">
        <circle cx="22" cy="22" r="12" stroke="rgba(63,231,255,0.4)" strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="22" r="5" fill="rgba(63,231,255,0.15)" stroke="rgba(63,231,255,0.4)" strokeWidth="1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="20" y="5"
            width="4" height="6"
            rx="1.5"
            fill="rgba(63,231,255,0.35)"
            transform={`rotate(${angle} 22 22)`}
          />
        ))}
      </g>
      {/* Gear small */}
      <g transform="translate(92,72)">
        <circle cx="14" cy="14" r="8" stroke="rgba(0,102,255,0.5)" strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="14" r="3" fill="rgba(0,102,255,0.15)" stroke="rgba(0,102,255,0.4)" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <rect
            key={i}
            x="12.5" y="2"
            width="3" height="5"
            rx="1"
            fill="rgba(0,102,255,0.4)"
            transform={`rotate(${angle} 14 14)`}
          />
        ))}
      </g>
      {/* Wrench */}
      <path
        d="M42 100 L68 74 M65 71 L72 78"
        stroke="rgba(175,197,255,0.3)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="42" cy="100" r="5" fill="rgba(175,197,255,0.12)" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" />
      {/* Status dot animated */}
      <circle cx="80" cy="24" r="5" fill="#00D26A" fillOpacity="0.9" />
      <circle cx="80" cy="24" r="8" stroke="#00D26A" strokeOpacity="0.25" strokeWidth="1" />
      {/* Subtle horizontal lines */}
      <line x1="28" y1="120" x2="52" y2="120" stroke="rgba(175,197,255,0.12)" strokeWidth="1" />
      <line x1="108" y1="120" x2="132" y2="120" stroke="rgba(175,197,255,0.12)" strokeWidth="1" />
    </svg>
  )
}

export default function Maintenance({
  estimatedTime = '11:30 PM UTC',
  onNotify,
  onRetry,
}: MaintenanceProps) {
  const [notified, setNotified] = useState(false)
  const [retrying, setRetrying] = useState(false)

  const handleNotify = () => {
    setNotified(true)
    onNotify?.()
  }

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => {
      setRetrying(false)
      onRetry?.()
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg px-6 py-12">
      <div className="flex flex-col items-center flex-1 justify-center gap-8">

        <MaintenanceIllustration />

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 mb-1">
            {/* Live status indicator — a simple pulsing dot, NOT Pulse */}
            <span className="relative flex w-2.5 h-2.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60"
                style={{ animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }}
              />
              <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-success" />
            </span>
            <p className="font-body text-xs font-semibold text-success">All other systems operational</p>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-text">Planned Maintenance</h1>
          <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
            We're upgrading our infrastructure to serve you better. This is a scheduled window — your funds are completely safe.
          </p>
        </div>

        {/* Service status card */}
        <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[color:var(--color-border)]">
            <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-3">Service Status</p>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Payments',        status: 'maintenance', label: 'Paused' },
                { name: 'Account access',  status: 'down',        label: 'Limited' },
                { name: 'AI Assistants',   status: 'maintenance', label: 'Paused' },
                { name: 'Notifications',   status: 'ok',          label: 'Operational' },
                { name: 'Card services',   status: 'ok',          label: 'Operational' },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <p className="font-body text-sm text-text-2">{s.name}</p>
                  <Chip
                    label={s.label}
                    variant={s.status === 'ok' ? 'success' : s.status === 'maintenance' ? 'warning' : 'error'}
                    dot
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <p className="font-body text-xs text-text-muted">Estimated completion</p>
            <p className="font-mono text-sm font-medium text-text">{estimatedTime}</p>
          </div>
        </div>

        <p className="font-body text-xs text-text-muted text-center max-w-xs leading-relaxed">
          You'll receive a push notification the moment we're back online. No action needed on your end.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-6">
        <Button
          variant="primary"
          fullWidth
          onClick={handleNotify}
          disabled={notified}
        >
          {notified ? "✓ We'll notify you" : 'Notify Me When Back'}
        </Button>
        <Button
          variant="ghost"
          fullWidth
          loading={retrying}
          onClick={handleRetry}
        >
          {retrying ? 'Checking…' : 'Retry'}
        </Button>
      </div>
    </div>
  )
}
