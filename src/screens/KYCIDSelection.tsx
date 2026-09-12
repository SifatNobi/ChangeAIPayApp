import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'

interface KYCIDSelectionProps {
  onContinue: (data: IDSelectionData) => void
  onBack: () => void
}

export interface IDSelectionData {
  country: string
  idType: 'passport' | 'drivers_license' | 'national_id'
}

interface CountryConfig {
  code: string
  name: string
  flag: string
  available: IDSelectionData['idType'][]
  note: string
}

const COUNTRIES: CountryConfig[] = [
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', available: ['passport', 'drivers_license'], note: 'Passports and UK driving licences are accepted.' },
  { code: 'US', name: 'United States',  flag: '🇺🇸', available: ['passport', 'drivers_license'], note: "US passports and state driver's licenses are accepted." },
  { code: 'NG', name: 'Nigeria',        flag: '🇳🇬', available: ['passport', 'national_id'],     note: 'International passport and national ID cards are accepted.' },
  { code: 'GH', name: 'Ghana',          flag: '🇬🇭', available: ['passport', 'national_id'],     note: 'Passport and Ghana card (national ID) are accepted.' },
  { code: 'KE', name: 'Kenya',          flag: '🇰🇪', available: ['passport', 'national_id'],     note: 'Passport and Kenyan national ID are accepted.' },
  { code: 'ZA', name: 'South Africa',   flag: '🇿🇦', available: ['passport', 'national_id'],     note: 'SA passport and green ID card or smart ID are accepted.' },
  { code: 'IN', name: 'India',          flag: '🇮🇳', available: ['passport', 'national_id'],     note: 'Passport and Aadhaar card are accepted.' },
  { code: 'AU', name: 'Australia',      flag: '🇦🇺', available: ['passport', 'drivers_license'], note: 'Australian passport and state driver licences are accepted.' },
  { code: 'CA', name: 'Canada',         flag: '🇨🇦', available: ['passport', 'drivers_license'], note: "Canadian passport and provincial driver's licences are accepted." },
  { code: 'DE', name: 'Germany',        flag: '🇩🇪', available: ['passport', 'national_id'],     note: 'German passport and Personalausweis are accepted.' },
  { code: 'FR', name: 'France',         flag: '🇫🇷', available: ['passport', 'national_id'],     note: "French passport and carte nationale d'identité are accepted." },
  { code: 'PK', name: 'Pakistan',       flag: '🇵🇰', available: ['passport', 'national_id'],     note: 'Passport and CNIC (national ID) are accepted.' },
]

const ID_LABELS: Record<IDSelectionData['idType'], { label: string; sublabel: string; icon: React.ReactNode }> = {
  passport: {
    label: 'Passport',
    sublabel: 'Any country — most widely accepted',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="11" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3" />
        <line x1="6" y1="15.5" x2="16" y2="15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="7.5" y1="5" x2="14.5" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  drivers_license: {
    label: "Driver's Licence",
    sublabel: 'Front and back required',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="7.5" cy="11" r="3" stroke="currentColor" strokeWidth="1.3" />
        <line x1="12" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  national_id: {
    label: 'National ID Card',
    sublabel: 'Government-issued national identity card',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="4" y="7" width="6" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="9.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
        <path d="M4 14c0-2.2 1.3-3.5 3-3.5s3 1.3 3 3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="12" y1="8.5" x2="18" y2="8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="12" y1="11.5" x2="16" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
}

export default function KYCIDSelection({ onContinue, onBack }: KYCIDSelectionProps) {
  const [country, setCountry]   = useState<CountryConfig | null>(null)
  const [idType,  setIdType]    = useState<IDSelectionData['idType'] | null>(null)
  const [showCountryPicker, setShowCountryPicker] = useState(false)

  const canContinue = country !== null && idType !== null

  const handleCountrySelect = (c: CountryConfig) => {
    setCountry(c)
    setIdType(null)
    setShowCountryPicker(false)
  }

  return (
    <div className="flex flex-col bg-bg px-5 pt-4 pb-10" style={{ minHeight: 785 }}>
      <AuthHeader onBack={onBack} title="ID Selection" step={2} totalSteps={5} />

      <div className="flex flex-col gap-5 mt-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-text mb-1">Choose your ID</h1>
          <p className="font-body text-sm text-text-2">Select the country and document type that matches your ID.</p>
        </div>

        {/* Country picker trigger */}
        <div className="flex flex-col gap-1.5">
          <p className="font-body text-sm font-medium text-text-2">Issuing Country</p>
          <button
            onClick={() => setShowCountryPicker(true)}
            className="w-full h-14 flex items-center gap-3 px-4 rounded-[--radius-xl] bg-surface border border-[color:var(--color-border)] transition-colors hover:border-accent/30 focus-ring"
          >
            {country ? (
              <>
                <span className="text-2xl leading-none">{country.flag}</span>
                <span className="font-body text-sm text-text font-medium">{country.name}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-auto shrink-0">
                  <path d="M4 6l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </>
            ) : (
              <>
                <span className="font-body text-sm text-text-muted flex-1 text-left">Select issuing country</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M4 6l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* ID type cards */}
        {country && (
          <div className="flex flex-col gap-2 animate-fade-in">
            <p className="font-body text-sm font-medium text-text-2">Document Type</p>
            {country.available.map(type => {
              const config = ID_LABELS[type]
              const selected = idType === type
              return (
                <button
                  key={type}
                  onClick={() => setIdType(type)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-[--radius-2xl] border text-left transition-all duration-[200ms]
                    ${selected
                      ? 'border-accent/40 bg-primary/6'
                      : 'border-[color:var(--color-border)] bg-surface hover:border-accent/20'
                    }`}
                >
                  <div
                    className={`w-11 h-11 rounded-[--radius-xl] flex items-center justify-center shrink-0 transition-colors
                      ${selected ? 'text-accent bg-primary/10' : 'text-text-muted bg-bg'}`}
                  >
                    {config.icon}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <p className={`font-body text-sm font-semibold transition-colors ${selected ? 'text-text' : 'text-text-2'}`}>
                      {config.label}
                    </p>
                    <p className="font-body text-xs text-text-muted">{config.sublabel}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                      ${selected ? 'border-accent bg-accent' : 'border-[color:var(--color-border)]'}`}
                  >
                    {selected && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5 4-4" stroke="#050B2D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}

            {/* Country note */}
            <div
              className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-2"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                <circle cx="7" cy="7" r="5.5" stroke="rgba(175,197,255,0.45)" strokeWidth="1.2" />
                <line x1="7" y1="4.5" x2="7" y2="7.5" stroke="rgba(175,197,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="7" cy="9.5" r="0.65" fill="rgba(175,197,255,0.45)" />
              </svg>
              <p className="font-body text-xs text-text-muted leading-relaxed">{country.note}</p>
            </div>
          </div>
        )}
      </div>

      <Button
        variant="primary" fullWidth
        disabled={!canContinue}
        onClick={() => canContinue && onContinue({ country: country!.name, idType: idType! })}
        className="mt-auto pt-8"
      >
        Continue
      </Button>

      {/* Country picker bottom sheet */}
      {showCountryPicker && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowCountryPicker(false)}
        >
          <div
            className="rounded-t-[28px] bg-surface border-t border-[color:var(--color-border)] pb-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--color-border)]">
              <p className="font-body text-sm font-semibold text-text">Select Country</p>
              <button onClick={() => setShowCountryPicker(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="rgba(175,197,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 320 }}>
              {COUNTRIES.map(c => (
                <button key={c.code}
                  onClick={() => handleCountrySelect(c)}
                  className={`w-full flex items-center gap-3 px-5 py-4 font-body text-sm
                    border-b border-[color:var(--color-border)] last:border-0 transition-colors
                    ${country?.code === c.code ? 'text-accent bg-primary/6' : 'text-text-2 hover:bg-bg'}`}
                >
                  <span className="text-xl leading-none">{c.flag}</span>
                  <span className="flex-1 text-left">{c.name}</span>
                  {country?.code === c.code && (
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
