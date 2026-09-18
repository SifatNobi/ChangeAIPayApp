import { Header, BottomNav } from '@/components/Nav'

interface NotificationDetailProps {
  accountType?: 'personal' | 'business'
  notificationId?: string
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotifications?: () => void
  onCTA?: () => void
}

const NOTIFICATION_DATA: Record<string, {
  type: 'payment' | 'security' | 'system' | 'promo'
  title: string
  body: string
  time: string
  fullDate: string
  ctaLabel?: string
  ctaVariant?: 'primary' | 'warning' | 'secondary'
  details?: { label: string; value: string }[]
}> = {}

const FALLBACK = {
  type: 'system' as const,
  title: 'Notification',
  body: 'No additional details available.',
  time: 'Recently', fullDate: '',
  ctaLabel: undefined, ctaVariant: undefined as 'primary' | 'warning' | 'secondary' | undefined,
  details: [],
}

const TYPE_ICON_LARGE: Record<string, React.ReactNode> = {
  payment: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="7" width="24" height="16" rx="3" stroke="#3FE7FF" strokeWidth="1.5" />
      <path d="M8 14h4m4 0h4" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 12h24" stroke="#3FE7FF" strokeWidth="1.5" />
    </svg>
  ),
  security: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2L3 6.5v9C3 21 7.5 25 14 27c6.5-2 11-6 11-11.5V6.5L14 2Z"
        stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="14" y1="9" x2="14" y2="15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="18.5" r="1.2" fill="#F59E0B" />
    </svg>
  ),
  system: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="#AFC5FF" strokeWidth="1.5" />
      <line x1="14" y1="9" x2="14" y2="15" stroke="#AFC5FF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="19" r="1.2" fill="#AFC5FF" />
    </svg>
  ),
  promo: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3l3.5 7.5h8.5l-7 5.5 2.5 8.5L14 20l-7.5 4.5 2.5-8.5-7-5.5H10.5L14 3Z"
        stroke="#0066FF" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
}

const TYPE_BG: Record<string, string> = {
  payment:  'rgba(63,231,255,0.08)',
  security: 'rgba(245,158,11,0.08)',
  system:   'rgba(175,197,255,0.06)',
  promo:    'rgba(0,102,255,0.08)',
}

const CTA_STYLES: Record<string, string> = {
  primary:   'linear-gradient(135deg, #0044CC 0%, #0066FF 60%, #3FE7FF 100%)',
  warning:   'linear-gradient(135deg, #92400E 0%, #F59E0B 100%)',
  secondary: 'transparent',
}

export default function NotificationDetail({
  accountType = 'personal',
  notificationId = '',
  onNavigate,
  onBack,
  onNotifications,
  onCTA,
}: NotificationDetailProps) {
  const data = NOTIFICATION_DATA[notificationId] ?? FALLBACK

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={0} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Back row */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Notification</h1>
        </div>

        <div className="px-5 flex flex-col gap-5">
          {/* Icon + title */}
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: TYPE_BG[data.type] }}
            >
              {TYPE_ICON_LARGE[data.type]}
            </div>
            <div className="flex-1 pt-1">
              <h2 className="font-display text-xl font-extrabold text-text tracking-tight mb-1">{data.title}</h2>
              <p className="font-body text-xs text-text-muted">{data.fullDate}</p>
            </div>
          </div>

          {/* Body */}
          <p className="font-body text-sm text-text-2 leading-relaxed">{data.body}</p>

          {/* Detail rows */}
          {data.details && data.details.length > 0 && (
            <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
              {data.details.map((d, i) => (
                <div key={i}
                  className={`flex items-center justify-between px-4 py-3.5 ${i < (data.details?.length ?? 0) - 1 ? 'border-b border-[color:var(--color-border)]' : ''}`}>
                  <p className="font-body text-xs text-text-muted">{d.label}</p>
                  <p className="font-body text-sm font-semibold text-text text-right max-w-[60%] truncate">{d.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {data.ctaLabel && (
            <button
              onClick={onCTA}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ background: CTA_STYLES[data.ctaVariant ?? 'primary'] }}
            >
              {data.ctaLabel}
            </button>
          )}

          <button
            onClick={onBack}
            className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center transition-colors hover:bg-surface-hi"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            Dismiss
          </button>
        </div>
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
