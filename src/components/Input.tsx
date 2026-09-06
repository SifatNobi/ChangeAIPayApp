import {
  type InputHTMLAttributes,
  type ReactNode,
  useState,
  useRef,
  useEffect,
} from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  leading?: ReactNode
  trailing?: ReactNode
}

export function TextInput({
  label,
  hint,
  error,
  leading,
  trailing,
  className = '',
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-body text-sm font-medium text-text-2">
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-3 h-13 px-4 rounded-[--radius-lg] border bg-surface transition-all duration-[250ms]
          ${error ? 'border-error/60 shadow-[0_0_0_2px_rgba(255,77,90,0.15)]' : 'border-[color:var(--color-border)] focus-within:border-accent/50 focus-within:shadow-[0_0_0_2px_rgba(63,231,255,0.08)]'}`}
      >
        {leading && <span className="text-text-muted shrink-0">{leading}</span>}
        <input
          className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
          {...rest}
        />
        {trailing && <span className="text-text-muted shrink-0">{trailing}</span>}
      </div>
      {(hint || error) && (
        <p className={`font-body text-xs ${error ? 'text-error' : 'text-text-muted'}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  )
}

export function PasswordInput({ label, hint, error, ...rest }: InputProps) {
  const [visible, setVisible] = useState(false)
  return (
    <TextInput
      label={label}
      hint={hint}
      error={error}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="text-text-muted hover:text-text-2 transition-colors text-xs font-semibold"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'HIDE' : 'SHOW'}
        </button>
      }
      {...rest}
    />
  )
}

interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (val: string) => void
  error?: boolean
}

export function OTPInput({ length = 6, value = '', onChange, error }: OTPInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const handleChange = (i: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1)
    const arr = value.split('')
    arr[i] = digit
    onChange?.(arr.join('').slice(0, length))
    if (digit && i < length - 1) refs.current[i + 1]?.focus()
  }

  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          maxLength={1}
          value={value[i] ?? ''}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          inputMode="numeric"
          className={`w-11 h-13 rounded-[--radius-lg] text-center font-mono text-xl font-medium text-text bg-surface border transition-all duration-[250ms] outline-none focus:border-accent/60 focus:shadow-[0_0_0_2px_rgba(63,231,255,0.1)]
            ${error ? 'border-error/60' : value[i] ? 'border-primary/60' : 'border-[color:var(--color-border)]'}`}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}

interface SwitchProps {
  checked?: boolean
  onChange?: (v: boolean) => void
  label?: string
  disabled?: boolean
}

export function Switch({ checked = false, onChange, label, disabled }: SwitchProps) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={`relative w-12 h-7 rounded-full transition-all duration-[250ms] ease-out focus-ring
          ${checked ? 'bg-primary' : 'bg-surface border border-[color:var(--color-border)]'}`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-[250ms] cubic-bezier(0.34,1.56,0.64,1)
            ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
      {label && <span className="font-body text-sm text-text-2 group-hover:text-text transition-colors">{label}</span>}
    </label>
  )
}

interface CheckboxProps {
  checked?: boolean
  onChange?: (v: boolean) => void
  label?: string
  disabled?: boolean
}

export function Checkbox({ checked = false, onChange, label, disabled }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <button
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all duration-[200ms] focus-ring
          ${checked ? 'bg-primary border-primary' : 'bg-transparent border-border hover:border-primary/50'}`}
      >
        {checked && (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {label && <span className="font-body text-sm text-text-2 group-hover:text-text transition-colors">{label}</span>}
    </label>
  )
}

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onClear?: () => void
}

export function SearchInput({ onClear, value, className = '', ...rest }: SearchInputProps) {
  return (
    <div className={`flex items-center gap-3 h-11 px-4 rounded-[--radius-full] bg-surface border border-[color:var(--color-border)] focus-within:border-accent/40 transition-all duration-[250ms] ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted shrink-0">
        <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
        value={value}
        {...rest}
      />
      {value && onClear && (
        <button onClick={onClear} className="text-text-muted hover:text-text transition-colors" aria-label="Clear">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

/* Password strength meter */
interface StrengthMeterProps { password: string }
export function PasswordStrengthMeter({ password }: StrengthMeterProps) {
  const score = (() => {
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', '#FF4D5A', '#F5B700', '#3FE7FF', '#00D26A']

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-[300ms]"
            style={{ backgroundColor: i <= score ? colors[score] : 'rgba(175,197,255,0.12)' }}
          />
        ))}
      </div>
      {password && (
        <p className="font-body text-xs" style={{ color: colors[score] }}>
          {labels[score]}
        </p>
      )}
    </div>
  )
}
