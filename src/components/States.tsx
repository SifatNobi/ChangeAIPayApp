import { type ReactNode } from 'react'

/* ── Skeleton loaders ─────────────────────────────────────────── */
export function SkeletonLine({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
  return <div className={`${width} ${height} rounded-full animate-shimmer`} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[--radius-lg] animate-shimmer shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <SkeletonLine width="w-1/2" height="h-3.5" />
          <SkeletonLine width="w-1/3" height="h-3" />
        </div>
      </div>
      <SkeletonLine height="h-3" />
      <SkeletonLine width="w-3/4" height="h-3" />
    </div>
  )
}

export function SkeletonWalletCard() {
  return (
    <div className="rounded-[--radius-3xl] overflow-hidden p-6 flex flex-col gap-8 animate-shimmer" style={{ minHeight: 180 }}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <SkeletonLine width="w-20" height="h-3" />
          <SkeletonLine width="w-28" height="h-3.5" />
        </div>
        <div className="w-10 h-10 rounded-full animate-shimmer" />
      </div>
      <SkeletonLine width="w-40" height="h-9" />
    </div>
  )
}

export function SkeletonTransactionList({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col divide-y divide-[color:var(--color-border)]">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3.5">
          <div className="w-10 h-10 rounded-[--radius-lg] animate-shimmer shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <SkeletonLine width="w-1/2" height="h-3.5" />
            <SkeletonLine width="w-1/4" height="h-3" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <SkeletonLine width="w-16" height="h-3.5" />
            <SkeletonLine width="w-12" height="h-3" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Loading states ───────────────────────────────────────────── */
export function LoadingSpinner({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-spin-slow ${className}`}
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <LoadingSpinner size={36} className="text-primary" />
      <p className="font-body text-sm text-text-muted">Loading…</p>
    </div>
  )
}

export function InlineLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-text-muted">
      <LoadingSpinner size={14} className="text-current" />
      <span className="font-body text-xs">{label}</span>
    </div>
  )
}

/* ── Success state ────────────────────────────────────────────── */
interface SuccessStateProps {
  title: string
  body?: string
  action?: string
  onAction?: () => void
}

export function SuccessState({ title, body, action, onAction }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-success/12 border border-success/25 flex items-center justify-center animate-success">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M7 14l5 5 9-10" stroke="#00D26A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="font-display text-xl font-bold text-text">{title}</p>
        {body && <p className="font-body text-sm text-text-2 mt-1">{body}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="h-11 px-6 rounded-[--radius-lg] bg-primary text-white font-body text-sm font-semibold hover:brightness-110 transition-all focus-ring"
        >
          {action}
        </button>
      )}
    </div>
  )
}

/* ── Error state ──────────────────────────────────────────────── */
interface ErrorStateProps {
  title: string
  body?: string
  action?: string
  onAction?: () => void
}

export function ErrorState({ title, body, action, onAction }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-error/10 border border-error/20 flex items-center justify-center animate-error-shake">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 9v6M14 19v1" stroke="#FF4D5A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="font-display text-xl font-bold text-text">{title}</p>
        {body && <p className="font-body text-sm text-text-2 mt-1">{body}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="h-11 px-6 rounded-[--radius-lg] bg-error/15 border border-error/30 text-error font-body text-sm font-semibold hover:bg-error/25 transition-all focus-ring"
        >
          {action}
        </button>
      )}
    </div>
  )
}

/* ── Empty state ──────────────────────────────────────────────── */
interface EmptyStateProps {
  icon: ReactNode
  title: string
  body?: string
  action?: string
  onAction?: () => void
}

export function EmptyState({ icon, title, body, action, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] flex items-center justify-center text-text-muted">
        {icon}
      </div>
      <div>
        <p className="font-body text-base font-semibold text-text">{title}</p>
        {body && <p className="font-body text-sm text-text-muted mt-1 max-w-xs">{body}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="h-9 px-4 rounded-[--radius-lg] bg-primary/10 border border-primary/25 text-accent font-body text-sm font-semibold hover:bg-primary/20 transition-all focus-ring"
        >
          {action}
        </button>
      )}
    </div>
  )
}

/* ── Toast / Snackbar ─────────────────────────────────────────── */
type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  variant?: ToastVariant
  message: string
  action?: string
  onAction?: () => void
  onDismiss?: () => void
}

const toastConfig: Record<ToastVariant, { icon: string; color: string; bg: string; border: string }> = {
  success: { icon: '✓', color: 'text-success', bg: 'bg-success/10', border: 'border-success/25' },
  error:   { icon: '!', color: 'text-error',   bg: 'bg-error/10',   border: 'border-error/25' },
  warning: { icon: '⚠', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  info:    { icon: 'i', color: 'text-accent',  bg: 'bg-primary/8',  border: 'border-accent/20' },
}

export function Toast({ variant = 'info', message, action, onAction, onDismiss }: ToastProps) {
  const c = toastConfig[variant]
  return (
    <div
      className={`flex items-center gap-3 px-4 h-12 rounded-[--radius-full] ${c.bg} border ${c.border} shadow-[var(--shadow-lg)] animate-slide-up`}
    >
      <span className={`font-body text-sm font-bold w-4 text-center ${c.color}`}>{c.icon}</span>
      <p className="font-body text-sm text-text flex-1">{message}</p>
      {action && (
        <button onClick={onAction} className={`font-body text-xs font-bold ${c.color} hover:underline shrink-0`}>
          {action}
        </button>
      )}
      {onDismiss && (
        <button onClick={onDismiss} className="text-text-muted hover:text-text shrink-0" aria-label="Dismiss">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

/* ── Animated progress bar ────────────────────────────────────── */
export function ProgressBar({
  value,
  max = 100,
  label,
  color = '#0066FF',
}: {
  value: number
  max?: number
  label?: string
  color?: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex flex-col gap-1.5">
      {label && <p className="font-body text-xs text-text-muted">{label}</p>}
      <div className="h-2 rounded-full bg-surface-hi overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[600ms] ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

/* ── Verification step header ─────────────────────────────────── */
export function VerificationHeader({
  step,
  total,
  title,
}: {
  step: number
  total: number
  title: string
}) {
  const pct = ((step - 1) / (total - 1)) * 100
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-body text-sm font-semibold text-text">{title}</p>
        <p className="font-mono text-xs text-text-muted">
          {step}/{total} · {Math.round(pct)}%
        </p>
      </div>
      <ProgressBar value={step - 1} max={total - 1} color="var(--gradient-primary)" />
    </div>
  )
}

/* ── Security components ──────────────────────────────────────── */
export function SecurityBadge({
  label,
  active = true,
  icon,
}: {
  label: string
  active?: boolean
  icon: ReactNode
}) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-[--radius-xl] border transition-all duration-[250ms]
        ${active
          ? 'bg-success/6 border-success/20'
          : 'bg-surface border-[color:var(--color-border)]'
        }`}
    >
      <div
        className={`w-9 h-9 rounded-[--radius-lg] flex items-center justify-center ${active ? 'bg-success/15 text-success' : 'bg-surface-hi text-text-muted'}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-body text-sm font-medium text-text">{label}</p>
        <p className={`font-body text-xs ${active ? 'text-success' : 'text-text-muted'}`}>
          {active ? 'Enabled' : 'Not set up'}
        </p>
      </div>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-success' : 'bg-border'}`} />
    </div>
  )
}

export function EncryptionBanner() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] bg-primary/6 border border-primary/15">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent shrink-0">
        <rect x="3" y="7" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="font-body text-xs text-text-2">
        End-to-end encrypted · PCI DSS Level 1 · GDPR compliant
      </p>
    </div>
  )
}
