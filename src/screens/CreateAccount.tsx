import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { TextInput, PasswordInput, Checkbox } from '@/components/Input'
import { PasswordStrengthMeter } from '@/components/Input'
import { EncryptionBanner } from '@/components/States'

interface CreateAccountProps {
  accountType: 'personal' | 'business'
  onSubmit: (data: { name: string; email: string; phone: string }) => void
  onUnderage?: () => void
  onBack: () => void
  onLogin: () => void
}

function validate(field: string, value: string, compare?: string): string {
  if (!value) return `${field} is required`
  if (field === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Enter a valid email address'
  if (field === 'Phone' && !/^\+?[\d\s\-()]{8,}$/.test(value))
    return 'Enter a valid phone number'
  if (field === 'Password' && value.length < 8)
    return 'Password must be at least 8 characters'
  if (field === 'Confirm Password' && value !== compare)
    return "Passwords don't match"
  return ''
}

function getAge(dob: string): number | null {
  if (!dob) return null
  const birth = new Date(dob)
  if (isNaN(birth.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export default function CreateAccount({ accountType, onSubmit, onUnderage, onBack, onLogin }: CreateAccountProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const age = getAge(dob)
  const dobError = touched.dob
    ? (!dob ? 'Date of birth is required' : age === null ? 'Enter a valid date' : '')
    : ''

  const errors = {
    name: touched.name ? validate('Full Name', name) : '',
    email: touched.email ? validate('Email', email) : '',
    phone: touched.phone ? validate('Phone', phone) : '',
    password: touched.password ? validate('Password', password) : '',
    confirm: touched.confirm ? validate('Confirm Password', confirm, password) : '',
  }

  const allValid =
    !errors.name && !errors.email && !errors.phone &&
    !errors.password && !errors.confirm && !dobError &&
    name && email && phone && dob && password && confirm &&
    terms && privacy && age !== null

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, phone: true, dob: true, password: true, confirm: true })
    if (!dob || age === null) return
    if (age < 18) { onUnderage?.(); return }
    if (!allValid) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onSubmit({ name, email, phone })
  }

  const blur = (field: string) => setTouched(t => ({ ...t, [field]: true }))

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-5 pt-4 pb-6">
        <AuthHeader onBack={onBack} title="Create Account" step={1} totalSteps={5} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="mb-6">
          <p className="font-body text-sm text-text-2">
            {accountType === 'personal'
              ? "Your personal account with Fina starts here."
              : "Your business account with Aina starts here."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <TextInput
            label="Full Name"
            placeholder="Maya Patel"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => blur('name')}
            error={errors.name}
            autoComplete="name"
          />
          <TextInput
            label="Email Address"
            placeholder="maya@example.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => blur('email')}
            error={errors.email}
            autoComplete="email"
          />
          <TextInput
            label="Phone Number"
            placeholder="+1 555 000 0000"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onBlur={() => blur('phone')}
            error={errors.phone}
            autoComplete="tel"
          />
          <TextInput
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            onBlur={() => blur('dob')}
            error={dobError}
            autoComplete="bday"
          />
          <div>
            <PasswordInput
              label="Password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => blur('password')}
              error={errors.password}
              autoComplete="new-password"
            />
            {password && (
              <div className="mt-2">
                <PasswordStrengthMeter password={password} />
              </div>
            )}
          </div>
          <PasswordInput
            label="Confirm Password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            onBlur={() => blur('confirm')}
            error={errors.confirm}
            autoComplete="new-password"
          />

          {/* Agreements */}
          <div className="flex flex-col gap-3 mt-2">
            <Checkbox
              checked={terms}
              onChange={setTerms}
              label="I agree to the Terms of Service"
            />
            <Checkbox
              checked={privacy}
              onChange={setPrivacy}
              label="I agree to the Privacy Policy"
            />
          </div>

          <EncryptionBanner />
        </div>
      </div>

      {/* Sticky actions */}
      <div className="px-5 pb-[max(env(safe-area-inset-bottom,0px),24px)] pt-4 border-t border-[color:var(--color-border)] bg-bg">
        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            fullWidth
            loading={loading}
            onClick={handleSubmit}
            disabled={!allValid || loading}
          >
            Create Account
          </Button>
          <p className="font-body text-sm text-center text-text-muted">
            Already have an account?{' '}
            <button
              onClick={onLogin}
              className="text-accent font-semibold hover:underline underline-offset-2 focus-ring rounded"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
