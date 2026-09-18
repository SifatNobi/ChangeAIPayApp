import { type ReactNode } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'

/* ── Base flat card — default treatment for most content ──────── */
interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 ${onClick ? 'cursor-pointer hover:bg-surface-hi transition-colors duration-[250ms]' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  )
}

/* ── Glass card — reserved for elevated surfaces (AI, bottom sheet) */
export function GlassCard({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-[--radius-2xl] glass p-5 ${className}`}
    >
      {children}
    </div>
  )
}

/* ── Wallet / balance card ────────────────────────────────────── */
interface WalletCardProps {
  name: string
  balance: string
  currency?: string
  accountType?: 'personal' | 'business'
  cardNumber?: string
  className?: string
}

export function WalletCard({
  name,
  balance,
  currency = 'USD',
  accountType = 'personal',
  cardNumber = '•••• 4821',
  className = '',
}: WalletCardProps) {
  return (
    <div
      className={`relative rounded-[--radius-3xl] overflow-hidden p-6 select-none ${className}`}
      style={{ background: 'linear-gradient(145deg, #0D1A4A 0%, #0066FF 60%, #3FE7FF 100%)' }}
    >
      {/* Subtle mesh overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(63,231,255,0.4) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(0,102,255,0.3) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body text-xs text-white/60 uppercase tracking-widest mb-1">
              {accountType === 'business' ? 'Business' : 'Personal'} Account
            </p>
            <p className="font-body text-sm font-medium text-white/90">{name}</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
            <img src={logoSrc} alt="ChangeAIPay" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <p className="font-body text-xs text-white/55 mb-1">{currency} Balance</p>
          <p className="font-display text-4xl font-extrabold text-white tracking-tight animate-counter">
            {balance}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm text-white/50">{cardNumber}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Notification card ────────────────────────────────────────── */
interface NotificationCardProps {
  icon: ReactNode
  title: string
  body: string
  time: string
  unread?: boolean
}

export function NotificationCard({
  icon,
  title,
  body,
  time,
  unread = false,
}: NotificationCardProps) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-[--radius-xl] border transition-colors duration-[250ms] cursor-pointer
        ${unread ? 'bg-primary/6 border-primary/20 hover:bg-primary/10' : 'bg-surface border-[color:var(--color-border)] hover:bg-surface-hi'}`}
    >
      <div className="w-10 h-10 rounded-[--radius-lg] bg-surface-hi flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className="font-body text-sm font-semibold text-text truncate">{title}</p>
          <span className="font-mono text-xs text-text-muted shrink-0">{time}</span>
        </div>
        <p className="font-body text-xs text-text-2 line-clamp-2">{body}</p>
      </div>
      {unread && <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />}
    </div>
  )
}

/* ── Analytics card ───────────────────────────────────────────── */
interface AnalyticsCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
  sparkline?: number[]
}

export function AnalyticsCard({
  label,
  value,
  change,
  positive = true,
  sparkline = [40, 55, 45, 70, 60, 80, 75],
}: AnalyticsCardProps) {
  const max = Math.max(...sparkline)
  const min = Math.min(...sparkline)
  const range = max - min || 1
  const w = 72
  const h = 28
  const pts = sparkline.map((v, i) => {
    const x = (i / (sparkline.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  })

  return (
    <div className="bg-surface rounded-[--radius-2xl] p-5 border border-[color:var(--color-border)] flex flex-col gap-4">
      <p className="font-body text-xs text-text-muted uppercase tracking-widest">{label}</p>
      <div className="flex items-end justify-between">
        <p className="font-display text-3xl font-extrabold text-text">{value}</p>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
          <polyline
            points={pts.join(' ')}
            stroke={positive ? '#00D26A' : '#FF4D5A'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      {change && (
        <p className={`font-body text-xs font-medium ${positive ? 'text-success' : 'text-error'}`}>
          {positive ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  )
}

/* ── Transaction row ──────────────────────────────────────────── */
interface TransactionRowProps {
  icon: ReactNode
  merchant: string
  category: string
  amount: string
  date: string
  status?: 'completed' | 'pending' | 'failed'
  positive?: boolean
}

export function TransactionRow({
  icon,
  merchant,
  category,
  amount,
  date,
  status = 'completed',
  positive = false,
}: TransactionRowProps) {
  const statusColor = { completed: 'text-success', pending: 'text-warning', failed: 'text-error' }
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-[color:var(--color-border)] last:border-0">
      <div className="w-10 h-10 rounded-[--radius-lg] bg-surface-hi flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-text">{merchant}</p>
        <p className="font-body text-xs text-text-muted">{category}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`font-display text-sm font-bold ${positive ? 'text-success' : 'text-text'}`}>
          {positive ? '+' : '-'}{amount}
        </p>
        <p className={`font-mono text-xs ${statusColor[status]}`}>{date}</p>
      </div>
    </div>
  )
}

/* ── Status chip ──────────────────────────────────────────────── */
type ChipVariant = 'success' | 'warning' | 'error' | 'info' | 'default'

interface ChipProps {
  label: string
  variant?: ChipVariant
  dot?: boolean
}

const chipStyles: Record<ChipVariant, string> = {
  success: 'bg-success/12 text-success border-success/20',
  warning: 'bg-warning/12 text-warning border-warning/20',
  error:   'bg-error/12 text-error border-error/20',
  info:    'bg-primary/12 text-accent border-accent/20',
  default: 'bg-surface text-text-2 border-[color:var(--color-border)]',
}

export function Chip({ label, variant = 'default', dot = false }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 h-7 rounded-full border font-body text-xs font-medium ${chipStyles[variant]}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {label}
    </span>
  )
}

/* ── QR code placeholder ──────────────────────────────────────── */
export function QRCard({ value }: { value: string }) {
  return (
    <Card className="flex flex-col items-center gap-4 py-8">
      {/* Minimal QR grid representation */}
      <div className="w-36 h-36 rounded-[--radius-xl] bg-white p-3 grid grid-cols-7 grid-rows-7 gap-px">
        {Array.from({ length: 49 }).map((_, i) => {
          const row = Math.floor(i / 7)
          const col = i % 7
          const corner =
            (row < 3 && col < 3) ||
            (row < 3 && col > 3) ||
            (row > 3 && col < 3)
          return (
            <div
              key={i}
              className="rounded-[1px]"
              style={{
                backgroundColor: corner || Math.random() > 0.5 ? '#050B2D' : 'transparent',
              }}
            />
          )
        })}
      </div>
      <div>
        <p className="font-body text-xs text-text-muted text-center">Scan to pay</p>
        <p className="font-mono text-xs text-text-2 text-center mt-1">{value}</p>
      </div>
    </Card>
  )
}
