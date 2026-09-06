type KYBFailReason =
  | 'document_mismatch'
  | 'unverifiable_business'
  | 'ownership_discrepancy'
  | 'restricted_industry'
  | 'incomplete_info'
  | 'expired_documents'

const REASON_CONFIG: Record<KYBFailReason, {
  title: string
  explanation: string
  steps: string[]
  canResubmit: boolean
}> = {
  document_mismatch: {
    title: 'Document information mismatch',
    explanation: "The information in your submitted documents doesn't match the details you entered. This is the most common reason for a failed review.",
    steps: [
      'Double-check that your business name matches exactly as registered',
      'Ensure your address matches the document you uploaded for proof of address',
      'Confirm your EIN matches the IRS letter on file',
    ],
    canResubmit: true,
  },
  unverifiable_business: {
    title: 'Business could not be verified',
    explanation: "We were unable to find your business in the relevant state or federal registries. This may be because the registration is recent, uses a different name, or the records aren't yet publicly indexed.",
    steps: [
      'Upload your Articles of Incorporation or state filing certificate directly',
      'Ensure the legal name matches your registration exactly, including punctuation',
      'If registered recently, allow 2–4 weeks for registry indexing',
    ],
    canResubmit: true,
  },
  ownership_discrepancy: {
    title: 'Ownership information discrepancy',
    explanation: 'The beneficial ownership information submitted does not align with the business registration records we verified.',
    steps: [
      'Confirm the names and ownership percentages of all individuals holding 25%+',
      'Upload updated shareholder agreements or operating agreements',
      'Ensure all listed owners have provided valid government-issued ID',
    ],
    canResubmit: true,
  },
  restricted_industry: {
    title: 'Industry requires additional review',
    explanation: "Your business operates in a category that requires additional compliance documentation before we can activate merchant features. This isn't a rejection — it's a regulatory checkpoint.",
    steps: [
      'Contact our compliance team for a list of required licenses',
      'Upload any industry-specific permits or licenses you hold',
      'Our team will reach out within 2 business days with specific requirements',
    ],
    canResubmit: false,
  },
  incomplete_info: {
    title: 'Incomplete information',
    explanation: 'Some required fields or documents were missing or could not be read clearly during review.',
    steps: [
      'Re-upload any documents flagged as unreadable',
      'Ensure all required fields are filled — particularly EIN and date established',
      'Check that document photos capture all four corners and are in focus',
    ],
    canResubmit: true,
  },
  expired_documents: {
    title: 'Expired documents',
    explanation: 'One or more documents submitted are past their validity date. Proof of address must be dated within 90 days.',
    steps: [
      'Obtain a current utility bill or bank statement dated within the last 90 days',
      'Ensure government-issued ID documents are not expired',
      'Re-upload the updated documents and resubmit',
    ],
    canResubmit: true,
  },
}

interface KYBFailedProps {
  reason?: KYBFailReason
  onResubmit?: () => void
  onSupport?: () => void
  onBack?: () => void
}

export default function KYBFailed({
  reason = 'document_mismatch', onResubmit, onSupport, onBack,
}: KYBFailedProps) {
  const config = REASON_CONFIG[reason]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Verification Review</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Status badge */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="w-20 h-20 rounded-[26px] flex items-center justify-center"
            style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', boxShadow: '0 0 32px rgba(239,68,68,0.15)' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M11 11l14 14M25 11L11 25" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">Needs attention</p>
            <p className="font-display text-xl font-extrabold text-text">{config.title}</p>
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-[--radius-2xl] px-5 py-4"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <p className="font-body text-xs text-text-muted leading-relaxed">{config.explanation}</p>
        </div>

        {/* Aina guidance */}
        <div className="rounded-[--radius-2xl] px-4 py-4 flex items-start gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.25)' }}>
          <div className="w-9 h-9 flex items-center justify-center font-display text-sm font-extrabold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #0066FF, #3FE7FF)', borderRadius: '12px 12px 12px 3px', boxShadow: '0 0 12px rgba(0,102,255,0.45)' }}>
            A
          </div>
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#3FE7FF' }}>Aina</p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              This is fixable. Follow the steps below, then resubmit — most cases are resolved on the second review. If anything is unclear, contact our support team directly and I'll help you prepare.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Steps to resolve</p>
          <div className="flex flex-col gap-2">
            {config.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5"
                  style={{ background: 'rgba(0,102,255,0.12)', color: '#3FE7FF' }}>
                  {i + 1}
                </div>
                <p className="font-body text-xs text-text-muted leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tone note */}
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.14)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6" cy="6" r="5" stroke="#3FE7FF" strokeWidth="1" />
            <path d="M6 5v3M6 3.5v.5" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Your application is not permanently rejected. You may resubmit as many times as needed. Each review is independent.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {config.canResubmit && (
            <button onClick={onResubmit}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}>
              Resubmit Verification
            </button>
          )}
          <button onClick={onSupport}
            className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.7)' }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
