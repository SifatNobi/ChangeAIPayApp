import { useState } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'
import Button from '@/components/Button'
import { TextInput, PasswordInput } from '@/components/Input'
import { Checkbox } from '@/components/Input'

interface LoginProps {
  onLogin: () => void
  onForgotPassword: () => void
  onSignUp: () => void
  onGoogle?: () => void
  onApple?: () => void
  biometricEnabled?: boolean
  onBiometric?: () => void
}

type LoginError = 'none' | 'wrongPassword' | 'unknownAccount' | 'tooManyAttempts' | 'loading' | 'success'

const ERROR_MESSAGES: Record<string, string> = {
  wrongPassword: "Incorrect password. Please try again.",
  unknownAccount: "No account found with this email or phone number.",
  tooManyAttempts: "Too many failed attempts. Your account has been temporarily locked for 30 minutes.",
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.638-.057-1.252-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18L12.048 13.56c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.712H.957v2.332C2.438 15.983 5.482 18 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path d="M12.75 9.563c-.012-1.918 1.563-2.85 1.637-2.9-1.8-1.613-3.6-.9-4.5-.9-1.8 0-2.7.9-3.6.9-.9 0-2.1-1.013-3.375-.9C1.35 5.963 0 7.563 0 9.563c0 3.6 3.15 7.65 4.5 7.65.9 0 1.8-.9 2.7-.9.9 0 1.8.9 2.7.9 1.35 0 4.5-3.825 4.5-7.65h-1.65Z" fill="currentColor"/>
      <path d="M10.65 0c.225 1.35-.675 2.7-1.575 3.375-.9.675-2.025.675-2.25-.675.225-1.35 1.35-2.7 2.25-3.15.675-.45 1.575-.45 1.575.45Z" fill="currentColor"/>
    </svg>
  )
}

export default function Login({
  onLogin, onForgotPassword, onSignUp, onGoogle, onApple,
  biometricEnabled = false, onBiometric,
}: LoginProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errorState, setErrorState] = useState<LoginError>('none')
  const [attempts, setAttempts] = useState(0)
  const [touched, setTouched] = useState({ identifier: false, password: false })

  const isLocked = errorState === 'tooManyAttempts'
  const isLoading = errorState === 'loading'

  const handleLogin = async () => {
    setTouched({ identifier: true, password: true })
    if (!identifier || !password) return
    if (isLocked) return

    setErrorState('loading')
    await new Promise(r => setTimeout(r, 1200))

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (newAttempts >= 5) {
      setErrorState('tooManyAttempts')
    } else if (identifier.includes('noaccount')) {
      setErrorState('unknownAccount')
    } else if (password === 'wrong') {
      setErrorState('wrongPassword')
    } else {
      setErrorState('success')
      await new Promise(r => setTimeout(r, 500))
      onLogin()
    }
  }

  const fieldError = (field: 'identifier' | 'password') => {
    if (!touched[field]) return ''
    if (field === 'identifier' && !identifier) return 'Email or phone is required'
    if (field === 'password' && !password) return 'Password is required'
    return ''
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="flex flex-col items-center pt-12 pb-8 px-5">
        <img src={logoSrc} alt="ChangeAIPay" className="w-14 h-14 object-contain mb-4" />
        <h1 className="font-display text-2xl font-extrabold text-text">Welcome back</h1>
        <p className="font-body text-sm text-text-2 mt-1">Log in to your account</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <div className="flex flex-col gap-4">
          <TextInput
            label="Email or Phone"
            placeholder="maya@example.com"
            type="email"
            value={identifier}
            onChange={e => { setIdentifier(e.target.value); setErrorState('none') }}
            onBlur={() => setTouched(t => ({ ...t, identifier: true }))}
            error={
              (errorState === 'unknownAccount' ? ERROR_MESSAGES.unknownAccount : '') ||
              fieldError('identifier')
            }
            autoComplete="email"
          />

          <div>
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrorState('none') }}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              error={
                (errorState === 'wrongPassword' ? ERROR_MESSAGES.wrongPassword : '') ||
                fieldError('password')
              }
              autoComplete="current-password"
            />
          </div>

          {/* Too many attempts banner */}
          {isLocked && (
            <div className="rounded-[--radius-xl] bg-error/8 border border-error/20 px-4 py-3 animate-fade-in">
              <p className="font-body text-sm text-error leading-relaxed">
                {ERROR_MESSAGES.tooManyAttempts}
              </p>
            </div>
          )}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
            <button
              onClick={onForgotPassword}
              className="font-body text-sm text-accent hover:underline underline-offset-2 focus-ring rounded"
            >
              Forgot password?
            </button>
          </div>

          {/* Biometric quick-login */}
          {biometricEnabled && (
            <button
              onClick={onBiometric}
              className="flex items-center justify-center gap-3 w-full h-12 rounded-[--radius-xl] border border-[color:var(--color-border)] bg-surface hover:bg-surface-hi transition-all duration-[250ms] focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
                <path d="M10 3c-3.87 0-7 3.13-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 6c-2.21 0-4 1.79-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 3c3.87 0 7 3.13 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 6c2.21 0 4 1.79 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 12v5M7 14l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-body text-sm text-text-2">Use Face ID / Fingerprint</span>
            </button>
          )}
        </div>
      </div>

      {/* Sticky auth actions */}
      <div className="px-5 pb-[max(env(safe-area-inset-bottom,0px),24px)] pt-4 border-t border-[color:var(--color-border)] bg-bg">
        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLocked || isLoading}
            onClick={handleLogin}
          >
            Log In
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <p className="font-body text-xs text-text-muted">or continue with</p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            onClick={onGoogle}
            className="w-full h-12 rounded-[--radius-lg] bg-white flex items-center justify-center gap-3 font-body text-sm font-semibold text-[#1a1a1a] hover:bg-gray-50 active:scale-[0.98] transition-all focus-ring"
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <button
            onClick={onApple}
            className="w-full h-12 rounded-[--radius-lg] bg-[#1a1a1a] border border-white/15 flex items-center justify-center gap-3 font-body text-sm font-semibold text-white hover:bg-[#242424] active:scale-[0.98] transition-all focus-ring"
          >
            <AppleIcon />
            Continue with Apple
          </button>

          <p className="font-body text-sm text-center text-text-muted">
            {"Don't have an account? "}
            <button
              onClick={onSignUp}
              className="text-accent font-semibold hover:underline underline-offset-2 focus-ring rounded"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
