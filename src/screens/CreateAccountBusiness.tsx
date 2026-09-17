import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { TextInput } from '@/components/Input'

interface CreateAccountBusinessProps {
  accountType?: 'personal' | 'business'
  country?: string
  onBack: () => void
  onContinue: (data: {
    currency: string
    taxId: string
    hasBusiness: boolean
    businessTaxId: string
  }) => void
}

interface Currency {
  code: string
  name: string
  flag: string
}

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
]

const COUNTRY_DEFAULT_CURRENCY: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  AU: 'AUD',
  CA: 'CAD',
  CH: 'CHF',
  JP: 'JPY',
  CN: 'CNY',
  NG: 'NGN',
  KE: 'KES',
  GH: 'GHS',
  ZA: 'ZAR',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
}

function getTaxIdLabel(country?: string): string {
  if (country === 'US') return 'Social Security Number (SSN) or EIN'
  if (country === 'GB') return 'National Insurance Number or UTR'
  return 'Tax ID Number'
}

function getDefaultCurrency(country?: string): string {
  if (!country) return 'USD'
  return COUNTRY_DEFAULT_CURRENCY[country] || 'USD'
}

export default function CreateAccountBusiness({
  accountType,
  country,
  onBack,
  onContinue,
}: CreateAccountBusinessProps) {
  const [currency, setCurrency] = useState<string>(getDefaultCurrency(country))
  const [taxId, setTaxId] = useState('')
  const [hasBusiness, setHasBusiness] = useState(false)
  const [businessTaxId, setBusinessTaxId] = useState('')
  const [loading, setLoading] = useState(false)

  const taxIdLabel = getTaxIdLabel(country)

  const handleContinue = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    onContinue({ currency, taxId, hasBusiness, businessTaxId })
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-5 pt-4 pb-6">
        <AuthHeader onBack={onBack} title="Financial Details" step={3} totalSteps={5} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="mb-6">
          <p className="font-body text-sm text-text-2">
            {accountType === 'personal'
              ? "Tell us your preferred currency and tax information."
              : "Set up currency preferences and compliance details for your business."}
          </p>
        </div>

        {/* Currency section */}
        <div className="mb-6">
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Preferred Currency
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(175,197,255,0.06)',
              border: '1px solid rgba(175,197,255,0.12)',
            }}
          >
            {CURRENCIES.map((cur, idx) => (
              <button
                key={cur.code}
                onClick={() => setCurrency(cur.code)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left focus-ring transition-colors"
                style={{
                  borderTop: idx === 0 ? 'none' : '1px solid rgba(175,197,255,0.08)',
                  background: currency === cur.code ? 'rgba(0,102,255,0.12)' : 'transparent',
                }}
              >
                <span className="text-xl leading-none">{cur.flag}</span>
                <div className="flex-1">
                  <span className="font-body text-sm font-semibold text-text-1">{cur.code}</span>
                  <span className="font-body text-xs text-text-muted ml-2">{cur.name}</span>
                </div>
                {currency === cur.code && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tax ID section */}
        <div className="mb-6">
          <TextInput
            label={taxIdLabel}
            placeholder="Optional"
            value={taxId}
            onChange={e => setTaxId(e.target.value)}
          />
          <p className="font-body text-xs text-text-muted mt-1.5 px-1">
            Used only for compliance — never shared.
          </p>
        </div>

        {/* Business toggle */}
        <div
          className="rounded-2xl px-4 py-4 mb-4"
          style={{
            background: 'rgba(175,197,255,0.06)',
            border: '1px solid rgba(175,197,255,0.12)',
          }}
        >
          <button
            onClick={() => setHasBusiness(v => !v)}
            className="flex items-center justify-between w-full focus-ring rounded-lg"
          >
            <div>
              <p className="font-body text-sm font-semibold text-text-1">Do you have a business?</p>
              <p className="font-body text-xs text-text-muted mt-0.5">
                Add your business tax information
              </p>
            </div>
            {/* Toggle pill */}
            <div
              className="relative w-11 h-6 rounded-full shrink-0 transition-all duration-200"
              style={{
                background: hasBusiness ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.15)',
              }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200"
                style={{ left: hasBusiness ? '22px' : '2px' }}
              />
            </div>
          </button>

          {hasBusiness && (
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(175,197,255,0.1)' }}>
              <TextInput
                label="Business Tax ID / VAT / EIN"
                placeholder="Enter business tax ID"
                value={businessTaxId}
                onChange={e => setBusinessTaxId(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sticky actions */}
      <div
        className="px-5 pb-[max(env(safe-area-inset-bottom,0px),24px)] pt-4 border-t bg-bg"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <Button
          variant="primary"
          fullWidth
          loading={loading}
          onClick={handleContinue}
          disabled={loading}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
