import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { TextInput } from '@/components/Input'

interface KYCPersonalDetailsProps {
  onContinue: (data: PersonalData) => void
  onBack: () => void
  initial?: Partial<PersonalData>
}

export interface PersonalData {
  fullName: string
  dob: string
  addressLine1: string
  addressLine2: string
  city: string
  postcode: string
  nationality: string
}

const NATIONALITIES = [
  'British', 'American', 'Australian', 'Canadian', 'German', 'French',
  'Nigerian', 'Ghanaian', 'Kenyan', 'South African', 'Indian', 'Pakistani',
  'Bangladeshi', 'Chinese', 'Japanese', 'Brazilian', 'Mexican', 'Other',
]

function isAdult(dob: string): boolean {
  if (!dob || dob.length < 10) return true
  const birth = new Date(dob)
  const now = new Date()
  const age = now.getFullYear() - birth.getFullYear()
  return age >= 18
}

function isValidDate(v: string) {
  if (!v) return false
  const d = new Date(v)
  return !isNaN(d.getTime()) && v.length === 10
}

export default function KYCPersonalDetails({
  onContinue,
  onBack,
  initial = {},
}: KYCPersonalDetailsProps) {
  const [data, setData] = useState<PersonalData>({
    fullName:    initial.fullName    ?? '',
    dob:         initial.dob         ?? '',
    addressLine1:initial.addressLine1 ?? '',
    addressLine2:initial.addressLine2 ?? '',
    city:        initial.city        ?? '',
    postcode:    initial.postcode    ?? '',
    nationality: initial.nationality ?? '',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalData, boolean>>>({})
  const [loading, setLoading] = useState(false)
  const [showNatPicker, setShowNatPicker] = useState(false)

  const touch = (f: keyof PersonalData) => setTouched(t => ({ ...t, [f]: true }))
  const set = (f: keyof PersonalData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [f]: e.target.value }))

  const errors: Partial<Record<keyof PersonalData, string>> = {
    fullName:    touched.fullName    && data.fullName.trim().split(' ').length < 2     ? 'Enter your full legal name' : '',
    dob:         touched.dob         && (!isValidDate(data.dob) || !isAdult(data.dob)) ? (!isAdult(data.dob) ? 'You must be 18 or older' : 'Enter a valid date') : '',
    addressLine1:touched.addressLine1 && !data.addressLine1.trim()                     ? 'Address is required' : '',
    city:        touched.city        && !data.city.trim()                              ? 'City is required' : '',
    postcode:    touched.postcode    && !data.postcode.trim()                          ? 'Postcode is required' : '',
    nationality: touched.nationality && !data.nationality                              ? 'Select your nationality' : '',
  }

  const allValid =
    data.fullName.trim().split(' ').length >= 2 &&
    isValidDate(data.dob) && isAdult(data.dob) &&
    data.addressLine1.trim() && data.city.trim() &&
    data.postcode.trim() && data.nationality

  const handleContinue = async () => {
    setTouched({ fullName: true, dob: true, addressLine1: true, city: true, postcode: true, nationality: true })
    if (!allValid) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    onContinue(data)
  }

  return (
    <div className="flex flex-col bg-bg px-5 pt-4 pb-10" style={{ minHeight: 785 }}>
      <AuthHeader onBack={onBack} title="Personal Details" step={1} totalSteps={5} />

      <div className="flex flex-col gap-5 mt-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-text mb-1">Your details</h1>
          <p className="font-body text-sm text-text-2">Must match your government-issued ID exactly.</p>
        </div>

        {/* Name */}
        <TextInput
          label="Full Legal Name"
          placeholder="As it appears on your ID"
          value={data.fullName}
          onChange={set('fullName')}
          onBlur={() => touch('fullName')}
          error={errors.fullName || ''}
          autoComplete="name"
        />

        {/* DOB */}
        <TextInput
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          value={data.dob}
          onChange={set('dob')}
          onBlur={() => touch('dob')}
          error={errors.dob || ''}
          autoComplete="bday"
          hint="Format: YYYY-MM-DD"
        />

        {/* Nationality */}
        <div className="flex flex-col gap-1.5">
          <p className="font-body text-sm font-medium text-text-2">Nationality</p>
          <button
            type="button"
            onClick={() => setShowNatPicker(true)}
            onBlur={() => touch('nationality')}
            className={`w-full h-12 flex items-center justify-between px-4 rounded-[--radius-xl]
              border bg-surface font-body text-sm transition-colors focus-ring
              ${errors.nationality ? 'border-error text-error' : data.nationality ? 'text-text border-[color:var(--color-border)]' : 'text-text-muted border-[color:var(--color-border)]'}`}
          >
            <span>{data.nationality || 'Select nationality'}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {errors.nationality && (
            <p className="font-body text-xs text-error animate-fade-in">{errors.nationality}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-1">Residential Address</p>
          <div className="flex flex-col gap-3">
            <TextInput
              label="Address Line 1"
              placeholder="House/flat number and street"
              value={data.addressLine1}
              onChange={set('addressLine1')}
              onBlur={() => touch('addressLine1')}
              error={errors.addressLine1 || ''}
              autoComplete="address-line1"
            />
            <TextInput
              label="Address Line 2 (optional)"
              placeholder="Apartment, suite, etc."
              value={data.addressLine2}
              onChange={set('addressLine2')}
              autoComplete="address-line2"
            />
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                label="City / Town"
                placeholder="London"
                value={data.city}
                onChange={set('city')}
                onBlur={() => touch('city')}
                error={errors.city || ''}
                autoComplete="address-level2"
              />
              <TextInput
                label="Postcode"
                placeholder="EC1A 1BB"
                value={data.postcode}
                onChange={set('postcode')}
                onBlur={() => touch('postcode')}
                error={errors.postcode || ''}
                autoComplete="postal-code"
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="primary" fullWidth
        loading={loading}
        disabled={loading}
        onClick={handleContinue}
        className="mt-8"
      >
        Continue
      </Button>

      {/* Nationality picker bottom sheet */}
      {showNatPicker && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowNatPicker(false)}
        >
          <div
            className="rounded-t-[28px] bg-surface border-t border-[color:var(--color-border)] pb-10"
            style={{ maxHeight: '65%' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--color-border)]">
              <p className="font-body text-sm font-semibold text-text">Select Nationality</p>
              <button onClick={() => setShowNatPicker(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="rgba(175,197,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(65vh - 64px)' }}>
              {NATIONALITIES.map(nat => (
                <button key={nat}
                  onClick={() => { setData(d => ({ ...d, nationality: nat })); touch('nationality'); setShowNatPicker(false) }}
                  className={`w-full flex items-center justify-between px-5 py-4 font-body text-sm
                    border-b border-[color:var(--color-border)] last:border-0 transition-colors
                    ${data.nationality === nat ? 'text-accent bg-primary/6' : 'text-text-2 hover:bg-bg'}`}
                >
                  {nat}
                  {data.nationality === nat && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="#3FE7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
