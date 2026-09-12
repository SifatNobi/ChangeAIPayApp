import { useState } from 'react'

type VerificationRequest = 'id_refresh' | 'proof_of_address' | 'business_docs' | 'selfie' | 'beneficial_ownership'

interface VerifItem {
  key: VerificationRequest
  label: string
  reason: string
  icon: React.ReactNode
  color: string
  acceptedDocs: string[]
}

const VERIF_ITEMS: VerifItem[] = [
  {
    key: 'id_refresh',
    label: 'Updated identity document',
    reason: 'Your current ID document on file has expired or is approaching expiry.',
    color: '#4D9FFF',
    acceptedDocs: ['Passport', "Driver's licence", 'National ID card'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="11" rx="2" stroke="#4D9FFF" strokeWidth="1.2" />
        <circle cx="7" cy="10.5" r="2" stroke="#4D9FFF" strokeWidth="1" />
        <path d="M11 9h4M11 11.5h3" stroke="#4D9FFF" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'proof_of_address',
    label: 'Proof of address',
    reason: "We require confirmation that your registered address is current and matches our records.",
    color: '#22C55E',
    acceptedDocs: ['Utility bill (gas, electricity, water)', 'Bank statement', 'Council tax letter', 'Official government letter'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L2 8v10h5v-5h6v5h5V8L10 2z" stroke="#22C55E" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'business_docs',
    label: 'Updated business documents',
    reason: 'Your business registration or ownership documents require an update to reflect current details.',
    color: '#3FE7FF',
    acceptedDocs: ['Certificate of incorporation', 'Articles of association', 'Business license', 'Recent company accounts'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 6l6-3 6 3v11H4V6z" stroke="#3FE7FF" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M8 17v-4h4v4" stroke="#3FE7FF" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'selfie',
    label: 'Refreshed selfie check',
    reason: 'A new liveness check is required to match your identity against the document we hold on file.',
    color: '#9945FF',
    acceptedDocs: ['Selfie taken in good lighting', 'Face clearly visible', 'No glasses or head coverings unless for religious reasons'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="9" r="4" stroke="#9945FF" strokeWidth="1.2" />
        <path d="M3 18c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5" stroke="#9945FF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'beneficial_ownership',
    label: 'Beneficial ownership declaration',
    reason: 'We require an up-to-date declaration of all individuals who own or control your business.',
    color: '#FF9F43',
    acceptedDocs: ['Signed ownership declaration form', 'Updated shareholder register', 'Trust deed (if applicable)'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="#FF9F43" strokeWidth="1.2" />
        <circle cx="5" cy="13" r="2" stroke="#FF9F43" strokeWidth="1" />
        <circle cx="15" cy="13" r="2" stroke="#FF9F43" strokeWidth="1" />
        <path d="M7.5 12.5L10 10l2.5 2.5" stroke="#FF9F43" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

interface UploadedFile {
  id: string
  name: string
  size: string
}

interface AdditionalVerificationProps {
  onBack?: () => void
  onSubmit?: () => void
  caseRef?: string
  requestedTypes?: VerificationRequest[]
}

export default function AdditionalVerification({
  onBack, onSubmit, caseRef = 'CLR-20261021-4482',
  requestedTypes = ['id_refresh', 'proof_of_address'],
}: AdditionalVerificationProps) {
  const [uploads, setUploads] = useState<Record<VerificationRequest, UploadedFile[]>>(
    {} as Record<VerificationRequest, UploadedFile[]>
  )
  const [submitting, setSubmitting] = useState(false)

  const requestedItems = VERIF_ITEMS.filter(v => requestedTypes.includes(v.key))

  const addUpload = (key: VerificationRequest) => {
    const cfg = VERIF_ITEMS.find(v => v.key === key)
    const file: UploadedFile = {
      id: Date.now().toString(),
      name: `${key}_${(uploads[key]?.length ?? 0) + 1}.pdf`,
      size: `${(Math.random() * 2 + 0.3).toFixed(1)} MB`,
    }
    setUploads(prev => ({ ...prev, [key]: [...(prev[key] ?? []), file] }))
  }

  const removeUpload = (key: VerificationRequest, id: string) => {
    setUploads(prev => ({ ...prev, [key]: (prev[key] ?? []).filter(f => f.id !== id) }))
  }

  const allSatisfied = requestedItems.every(item => (uploads[item.key]?.length ?? 0) > 0)

  const handleSubmit = () => {
    if (!allSatisfied || submitting) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); onSubmit?.() }, 1600)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Additional Verification</p>
          <p className="font-body text-[10px] text-text-muted">{caseRef}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Context */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.04)', border: '1px solid rgba(245,183,0,0.14)' }}>
          <p className="font-body text-sm text-text leading-relaxed">
            As part of your ongoing compliance review, we need updated documentation for the item{requestedItems.length > 1 ? 's' : ''} listed below. This is standard practice and is required before we can fully reinstate your account access.
          </p>
        </div>

        {/* Verification items */}
        {requestedItems.map((item, idx) => {
          const itemUploads = uploads[item.key] ?? []
          const satisfied = itemUploads.length > 0
          return (
            <div key={item.key}>
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: satisfied ? 'rgba(34,197,94,0.12)' : `${item.color}12`, border: `1px solid ${satisfied ? 'rgba(34,197,94,0.2)' : `${item.color}30`}` }}>
                  {satisfied ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <p className="font-mono text-[10px] font-bold" style={{ color: item.color }}>{idx + 1}</p>
                  )}
                </div>
                <p className="font-body text-sm font-semibold text-text flex-1">{item.label}</p>
                {satisfied && (
                  <span className="font-body text-[9px] font-bold" style={{ color: '#22C55E' }}>Uploaded</span>
                )}
              </div>

              {/* Reason */}
              <div className="px-4 py-3 rounded-[--radius-xl] mb-3"
                style={{ background: `${item.color}06`, border: `1px solid ${item.color}18` }}>
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div className="flex-1">
                    <p className="font-body text-xs text-text-muted leading-relaxed mb-2">{item.reason}</p>
                    <div>
                      <p className="font-body text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: item.color }}>
                        Accepted documents
                      </p>
                      <div className="flex flex-col gap-1">
                        {item.acceptedDocs.map((doc, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: item.color, opacity: 0.6 }} />
                            <p className="font-body text-[10px] text-text-muted">{doc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded files */}
              {itemUploads.length > 0 && (
                <div className="flex flex-col gap-1.5 mb-2">
                  {itemUploads.map(f => (
                    <div key={f.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[--radius-xl]"
                      style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                        <path d="M2 1.5h8v9H2V1.5z" stroke="#22C55E" strokeWidth="0.9" strokeLinejoin="round" />
                        <path d="M4 4h4M4 6h3" stroke="#22C55E" strokeWidth="0.9" strokeLinecap="round" />
                      </svg>
                      <p className="flex-1 font-body text-xs text-text truncate">{f.name}</p>
                      <p className="font-body text-[9px] text-text-muted shrink-0">{f.size}</p>
                      <button onClick={() => removeUpload(item.key, f.id)}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M2 2l7 7M9 2L2 9" stroke="rgba(175,197,255,0.35)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload button */}
              {itemUploads.length < 3 && (
                <button onClick={() => addUpload(item.key)}
                  className="w-full h-12 rounded-[--radius-xl] flex items-center justify-center gap-2 transition-all"
                  style={{ background: 'rgba(175,197,255,0.03)', border: `1.5px dashed ${item.color}35` }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v8M3 6l4-4 4 4" stroke={item.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.5 12h11" stroke={item.color} strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <p className="font-body text-xs font-medium" style={{ color: item.color }}>
                    {itemUploads.length === 0 ? 'Upload document' : 'Add another'}
                  </p>
                </button>
              )}
            </div>
          )
        })}

        {/* Progress summary */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <circle cx="7" cy="7" r="5.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1" />
            <path d="M7 5v2.5l2 1.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-text-muted flex-1">
            {requestedItems.filter(i => (uploads[i.key]?.length ?? 0) > 0).length} of {requestedItems.length} items uploaded
          </p>
          {allSatisfied && (
            <span className="font-body text-[10px] font-semibold" style={{ color: '#22C55E' }}>Ready to submit</span>
          )}
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!allSatisfied || submitting}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: allSatisfied ? 'linear-gradient(135deg, rgba(245,183,0,0.6), rgba(245,183,0,0.4))' : 'rgba(175,197,255,0.08)',
            color: allSatisfied ? 'white' : 'rgba(175,197,255,0.3)',
            boxShadow: allSatisfied ? '0 4px 16px rgba(245,183,0,0.1)' : 'none',
          }}>
          {submitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : 'Submit for Review'}
        </button>
      </div>
    </div>
  )
}
