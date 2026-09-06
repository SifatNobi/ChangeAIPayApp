import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { PasswordInput, PasswordStrengthMeter } from '@/components/Input'

interface ResetPasswordProps {
  onReset: () => void
  onBack: () => void
}

export default function ResetPassword({ onReset, onBack }: ResetPasswordProps) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({ password: false, confirm: false })

  const passwordError = touched.password && password.length > 0 && password.length < 8
    ? 'Password must be at least 8 characters'
    : ''
  const confirmError = touched.confirm && confirm && confirm !== password
    ? "Passwords don't match"
    : ''

  const strength = (() => {
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()

  const canSubmit = password.length >= 8 && confirm === password && strength >= 2

  const handleReset = async () => {
    setTouched({ password: true, confirm: true })
    if (!canSubmit) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1300))
    setLoading(false)
    onReset()
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg px-5 pt-4 pb-10">
      <AuthHeader onBack={onBack} title="Create New Password" />

      <div className="flex flex-col flex-1 mt-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-extrabold text-text mb-2">
            New Password
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            Choose a strong password you have not used before. Your account will be logged out on all other devices.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <PasswordInput
              label="New Password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              error={passwordError}
              autoComplete="new-password"
            />
            {password && (
              <div className="mt-2">
                <PasswordStrengthMeter password={password} />
              </div>
            )}
          </div>

          <PasswordInput
            label="Confirm New Password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, confirm: true }))}
            error={confirmError}
            autoComplete="new-password"
          />

          {/* Requirements */}
          <div className="rounded-[--radius-xl] bg-surface border border-[color:var(--color-border)] p-4 flex flex-col gap-2">
            <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-1">Requirements</p>
            {[
              { label: 'At least 8 characters', met: password.length >= 8 },
              { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
              { label: 'One number', met: /[0-9]/.test(password) },
              { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-[250ms]
                  ${r.met ? 'bg-success/15' : 'bg-surface-hi'}`}>
                  {r.met && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3" stroke="#00D26A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p className={`font-body text-xs transition-colors duration-[250ms] ${r.met ? 'text-success' : 'text-text-muted'}`}>
                  {r.label}
                </p>
              </div>
            ))}
          </div>

          {/* Mismatch warning */}
          {touched.confirm && confirm && confirm !== password && (
            <div className={`rounded-[--radius-xl] bg-error/8 border border-error/20 px-4 py-3 animate-fade-in ${confirmError ? 'animate-error-shake' : ''}`}>
              <p className="font-body text-sm text-error">Passwords do not match.</p>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        loading={loading}
        disabled={!canSubmit || loading}
        onClick={handleReset}
        className="mt-8"
      >
        Reset Password
      </Button>
    </div>
  )
}
