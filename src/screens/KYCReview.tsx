import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { Checkbox } from '@/components/Input'
import { EncryptionBanner } from '@/components/States'
import type { PersonalData } from './KYCPersonalDetails'
import type { IDSelectionData } from './KYCIDSelection'

interface KYCReviewProps {
  personalData: PersonalData
  idSelection: IDSelectionData
  onSubmit: () => void
  onEditPersonal: () => void
  onEditID: () => void
  onBack: () => void
}

const ID_TYPE_LABELS: Record<IDSelectionData['idType'], string> = {
  passport:        'Passport',
  drivers_license: "Driver's Licence",
  national_id:     'National ID Card',
}

/* ── Mock captured ID image placeholder ───────────────────────── */
function CapturedDocCard({ side }: { side: 'Front' | 'Back' }) {
  return (
    <div
      className="flex-1 rounded-[--radius-xl] flex flex-col items-center justify-center gap-1.5"
      style={{ height: 72, background: 'rgba(175,197,255,0.05)', border: '1px dashed rgba(175,197,255,0.15)' }}
    >
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="18.5" height="12.5" rx="2" stroke="rgba(175,197,255,0.35)" strokeWidth="1" />
        <line x1="3" y1="5" x2="9" y2="5" stroke="rgba(175,197,255,0.2)" strokeWidth="1" strokeLinecap="round" />
        <line x1="3" y1="7.5" x2="7" y2="7.5" stroke="rgba(175,197,255,0.15)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="15" cy="7" r="3" fill="rgba(0,210,106,0.15)" stroke="rgba(0,210,106,0.35)" strokeWidth="0.8" />
        <path d="M13.5 7l1 1 2-2" stroke="rgba(0,210,106,0.7)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="font-mono text-[10px] text-text-muted">{side} captured</p>
    </div>
  )
}

function CapturedSelfie() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 rounded-[--radius-xl]"
      style={{ height: 72, background: 'rgba(175,197,255,0.05)', border: '1px dashed rgba(175,197,255,0.15)' }}
    >
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="7" r="5" stroke="rgba(175,197,255,0.35)" strokeWidth="1" />
        <path d="M1 19c0-5 3.5-8 8-8s8 3 8 8" stroke="rgba(175,197,255,0.25)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="9" cy="7" r="2" fill="rgba(0,210,106,0.15)" stroke="rgba(0,210,106,0.35)" strokeWidth="0.8" />
      </svg>
      <p className="font-mono text-[10px] text-text-muted">Selfie captured</p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-[color:var(--color-border)] last:border-0">
      <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">{label}</p>
      <p className="font-body text-sm text-text">{value || '—'}</p>
    </div>
  )
}

export default function KYCReview({
  personalData,
  idSelection,
  onSubmit,
  onEditPersonal,
  onEditID,
  onBack,
}: KYCReviewProps) {
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)

  const addr = [
    personalData.addressLine1,
    personalData.addressLine2,
    personalData.city,
    personalData.postcode,
  ].filter(Boolean).join(', ')

  const handleSubmit = async () => {
    if (!consent) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    onSubmit()
  }

  return (
    <div className="flex flex-col bg-bg px-5 pt-4 pb-10" style={{ minHeight: 785 }}>
      <AuthHeader onBack={onBack} title="Review" step={5} totalSteps={5} />

      <div className="flex flex-col gap-5 mt-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-text mb-1">Review your submission</h1>
          <p className="font-body text-sm text-text-2">Check everything before submitting. Errors may delay verification.</p>
        </div>

        {/* Captured images */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">Captured Images</p>
          <div className="flex gap-2">
            <CapturedDocCard side="Front" />
            {idSelection.idType === 'drivers_license' && <CapturedDocCard side="Back" />}
            <CapturedSelfie />
          </div>
        </div>

        {/* Personal details */}
        <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--color-border)]">
            <p className="font-body text-xs text-text-muted uppercase tracking-widest">Personal Details</p>
            <button
              onClick={onEditPersonal}
              className="font-body text-xs font-semibold text-accent focus-ring rounded px-1 py-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              Edit
            </button>
          </div>
          <div className="px-4">
            <Row label="Full Legal Name"  value={personalData.fullName} />
            <Row label="Date of Birth"    value={personalData.dob} />
            <Row label="Nationality"      value={personalData.nationality} />
            <Row label="Residential Address" value={addr} />
          </div>
        </div>

        {/* ID selection */}
        <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--color-border)]">
            <p className="font-body text-xs text-text-muted uppercase tracking-widest">ID Document</p>
            <button
              onClick={onEditID}
              className="font-body text-xs font-semibold text-accent focus-ring rounded px-1 py-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              Edit
            </button>
          </div>
          <div className="px-4">
            <Row label="Issuing Country" value={idSelection.country} />
            <Row label="Document Type"   value={ID_TYPE_LABELS[idSelection.idType]} />
          </div>
        </div>

        {/* Consent */}
        <div
          className="rounded-[--radius-xl] px-4 py-4"
          style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.12)' }}
        >
          <Checkbox
            label="I confirm that all the information and documents provided are accurate and genuine. I consent to ChangeAIPay processing my data for identity verification purposes."
            checked={consent}
            onChange={setConsent}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <EncryptionBanner />
        <Button
          variant="primary" fullWidth
          loading={loading}
          disabled={!consent || loading}
          onClick={handleSubmit}
        >
          Submit for Verification
        </Button>
      </div>
    </div>
  )
}
