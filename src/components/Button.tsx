import { type ReactNode, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'text' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
  children?: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 font-body font-semibold transition-all duration-[250ms] ease-out focus-ring select-none active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white rounded-[--radius-lg] hover:brightness-110 active:brightness-95',
  secondary:
    'bg-surface text-text border border-[color:var(--color-border)] rounded-[--radius-lg] hover:bg-surface-hi',
  ghost:
    'bg-transparent text-text-2 border border-[color:var(--color-border)] rounded-[--radius-lg] hover:bg-surface hover:text-text',
  text:
    'bg-transparent text-text-2 rounded-[--radius-md] hover:text-text hover:bg-white/5 underline-offset-4',
  danger:
    'bg-error/10 text-error border border-error/25 rounded-[--radius-lg] hover:bg-error/20',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-6 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin-slow" />
      ) : (
        icon
      )}
      {children && <span>{children}</span>}
      {!loading && iconRight}
    </button>
  )
}

/* Floating action button */
export function FAB({
  children,
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[var(--shadow-primary)] hover:brightness-110 active:scale-95 transition-all duration-[250ms] ease-out focus-ring ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

/* Icon-only button */
export function IconButton({
  children,
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`w-10 h-10 rounded-[--radius-md] flex items-center justify-center text-text-2 hover:text-text hover:bg-surface transition-all duration-[250ms] focus-ring ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
