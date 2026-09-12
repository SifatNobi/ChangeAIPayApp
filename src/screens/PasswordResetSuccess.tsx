import Button from '@/components/Button'
import { SecurityBadge } from '@/components/States'

interface PasswordResetSuccessProps {
  onLogin: () => void
  biometricActive?: boolean
  twoFAActive?: boolean
}

export default function PasswordResetSuccess({
  onLogin,
  biometricActive = false,
  twoFAActive = false,
}: PasswordResetSuccessProps) {
  const suggestBiometric = !biometricActive
  const suggest2FA = !twoFAActive

  return (
    <div className="flex flex-col min-h-screen bg-bg px-5 py-12">
      <div className="flex flex-col flex-1 items-center justify-center gap-8">
        {/* Success mark */}
        <div className="w-24 h-24 rounded-full bg-success/12 border border-success/25 flex items-center justify-center animate-success">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 20l8 8 14-16"
              stroke="#00D26A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text">
            Password Reset
          </h1>
          <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
            Your password has been updated. You have been logged out of all other devices for your security.
          </p>
        </div>

        {/* Security tips — only shown if not already active */}
        {(suggestBiometric || suggest2FA) && (
          <div className="w-full flex flex-col gap-3">
            <p className="font-body text-xs text-text-muted uppercase tracking-widest">
              Strengthen your account
            </p>

            {suggestBiometric && (
              <SecurityBadge
                label="Enable Face ID or Fingerprint"
                active={false}
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2c-3.31 0-6 2.69-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 5c-1.66 0-3 1.34-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                    <path d="M8 2c3.31 0 6 2.69 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 5c1.66 0 3 1.34 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                }
              />
            )}

            {suggest2FA && (
              <SecurityBadge
                label="Enable Two-Factor Authentication"
                active={false}
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                }
              />
            )}

            <p className="font-body text-xs text-text-muted leading-relaxed">
              These security features protect you even if your password is ever compromised again.
            </p>
          </div>
        )}

        {/* All secure confirmation */}
        <div className="w-full rounded-[--radius-xl] bg-success/6 border border-success/18 px-4 py-3 flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-success shrink-0">
            <path d="M8 2L3 4v5c0 3.5 2.5 5.5 5 6 2.5-.5 5-2.5 5-6V4L8 2Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-2">
            Your account and funds remain fully secure during this process.
          </p>
        </div>
      </div>

      <Button variant="primary" fullWidth onClick={onLogin}>
        Log In with New Password
      </Button>
    </div>
  )
}
