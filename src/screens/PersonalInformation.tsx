import { useState } from 'react'

interface PersonalInfoData {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  postcode: string
  country: string
  dob: string
}

const DEFAULT_DATA: PersonalInfoData = {
  firstName: 'Maya',
  lastName: 'Patel',
  email: 'maya@example.com',
  phone: '+1 (555) 012-3456',
  addressLine1: '24 Baker Street',
  addressLine2: 'Apt 3B',
  city: 'New York',
  postcode: '10001',
  country: 'United States',
  dob: '1992-06-15',
}

interface PersonalInformationProps {
  initial?: Partial<PersonalInfoData>
  onSave?: (data: PersonalInfoData) => void
  onBack?: () => void
  onReVerify?: () => void
}

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  note?: string
  disabled?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}

function Field({ label, value, onChange, type = 'text', note, disabled, inputMode }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-body text-[10px] font-semibold text-text-muted uppercase tracking-wider">{label}</p>
      <div className="relative">
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className="w-full h-12 px-4 rounded-[--radius-xl] font-body text-sm text-text outline-none transition-all duration-[150ms] disabled:opacity-50"
          style={{ background: disabled ? 'rgba(175,197,255,0.03)' : 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
        />
        {disabled && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="3" y="6" width="8" height="6.5" rx="1" stroke="rgba(175,197,255,0.3)" strokeWidth="1.1" />
              <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="rgba(175,197,255,0.3)" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
      {note && <p className="font-body text-[10px] px-1 leading-relaxed" style={{ color: 'rgba(245,183,0,0.75)' }}>{note}</p>}
    </div>
  )
}

export default function PersonalInformation({ initial, onSave, onBack, onReVerify }: PersonalInformationProps) {
  const [data, setData] = useState<PersonalInfoData>({ ...DEFAULT_DATA, ...initial })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [photoHover, setPhotoHover] = useState(false)

  const up = (key: keyof PersonalInfoData) => (v: string) => setData(d => ({ ...d, [key]: v }))

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => { setSaving(false); setSaved(true); onSave?.(data) }, 1200)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Personal Information</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Photo upload */}
        <div className="flex flex-col items-center gap-3">
          <button
            className="relative w-20 h-20 rounded-[24px] flex items-center justify-center font-display text-2xl font-extrabold text-white transition-all duration-[200ms]"
            style={{ background: 'var(--gradient-primary)', boxShadow: `0 0 ${photoHover ? '32px' : '20px'} rgba(63,231,255,${photoHover ? '0.55' : '0.35'})` }}
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
          >
            MP
            <div className="absolute inset-0 rounded-[24px] flex items-center justify-center transition-all duration-[200ms]"
              style={{ background: photoHover ? 'rgba(5,11,45,0.5)' : 'transparent' }}>
              {photoHover && (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M2 16V19h3L17 7l-3-3L2 16ZM18.7 5.3l-2-2a1 1 0 0 0-1.4 0l-1.3 1.3 3 3 1.7-1.7a1 1 0 0 0 0-1.6Z" fill="white" />
                </svg>
              )}
            </div>
          </button>
          <p className="font-body text-xs text-text-muted">Tap to change photo</p>
        </div>

        {/* Name */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Name</p>
          <div className="flex gap-3">
            <div className="flex-1"><Field label="First name" value={data.firstName} onChange={up('firstName')} /></div>
            <div className="flex-1"><Field label="Last name"  value={data.lastName}  onChange={up('lastName')}  /></div>
          </div>
          {/* Legal name change notice */}
          <div className="mt-2.5 rounded-[--radius-xl] px-3.5 py-3 flex items-start gap-2.5"
            style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.2)' }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mt-0.5 shrink-0">
              <path d="M6.5 1.5L1 11.5h11L6.5 1.5Z" stroke="#F5B700" strokeWidth="1" strokeLinejoin="round" />
              <path d="M6.5 5v3.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
              <circle cx="6.5" cy="10" r="0.55" fill="#F5B700" />
            </svg>
            <div className="flex-1">
              <p className="font-body text-[11px] text-text-muted leading-relaxed">
                Legal name changes require identity re-verification.{' '}
                <button onClick={onReVerify} className="font-semibold underline-offset-2" style={{ color: '#F5B700', textDecoration: 'underline' }}>
                  Start KYC
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Contact</p>
          <div className="flex flex-col gap-3">
            <Field label="Email" value={data.email} onChange={up('email')} type="email" inputMode="email" />
            <Field label="Phone" value={data.phone} onChange={up('phone')} type="tel" inputMode="tel" />
          </div>
        </div>

        {/* Date of birth — locked (KYC-set) */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Date of Birth</p>
          <Field
            label=""
            value={new Date(data.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            onChange={() => {}}
            disabled
            note="Date of birth is set during identity verification and cannot be changed here."
          />
        </div>

        {/* Address */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Address</p>
          <div className="flex flex-col gap-3">
            <Field label="Address line 1" value={data.addressLine1} onChange={up('addressLine1')} />
            <Field label="Address line 2 (optional)" value={data.addressLine2} onChange={up('addressLine2')} />
            <div className="flex gap-3">
              <div className="flex-1"><Field label="City"     value={data.city}     onChange={up('city')}     /></div>
              <div className="w-28"> <Field label="Postcode"  value={data.postcode}  onChange={up('postcode')} inputMode="numeric" /></div>
            </div>
            <Field label="Country" value={data.country} onChange={up('country')} />
          </div>
        </div>

        {/* Save */}
        {saved ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Changes saved</p>
          </div>
        ) : (
          <button onClick={handleSave} disabled={saving}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
            style={{ background: 'var(--gradient-primary)' }}>
            {saving ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Save Changes
            </>}
          </button>
        )}
      </div>
    </div>
  )
}
