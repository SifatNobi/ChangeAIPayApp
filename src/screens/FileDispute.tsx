import { useState } from 'react'

interface FileDisputeProps {
  onBack?: () => void
  onSubmit?: () => void
}

const REASONS = [
  { id: 'unauthorized', label: 'Unauthorized charge', icon: '🔒' },
  { id: 'not-received', label: 'Item not received', icon: '📦' },
  { id: 'not-as-described', label: 'Item not as described', icon: '⚠️' },
  { id: 'duplicate', label: 'Duplicate charge', icon: '🔁' },
  { id: 'not-provided', label: 'Service not provided', icon: '🚫' },
  { id: 'other', label: 'Other', icon: '💬' },
]

export default function FileDispute({ onBack, onSubmit }: FileDisputeProps) {
  const [step, setStep] = useState(1)
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [evidence, setEvidence] = useState<string | null>(null)

  const canProceedStep1 = reason !== ''
  const canProceedStep2 = description.trim().length >= 20

  const handleBack = () => {
    if (step === 1) {
      onBack?.()
    } else {
      setStep(s => s - 1)
    }
  }

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1)
  }

  const handleAttach = () => {
    setEvidence('document_evidence.pdf')
  }

  const handleSubmit = () => {
    onSubmit?.()
  }

  const selectedReason = REASONS.find(r => r.id === reason)

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: 'rgba(5,11,45,1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '56px 20px 12px', flexShrink: 0 }}>
        <button
          onClick={handleBack}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff' }}>File a Dispute</p>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 20px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 100,
                background: s <= step ? 'linear-gradient(90deg, #0066FF, #3FE7FF)' : 'rgba(175,197,255,0.1)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'rgba(175,197,255,0.4)' }}>
          Step {step} of 3 — {step === 1 ? 'Select Reason' : step === 2 ? 'Describe Issue' : 'Review & Submit'}
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          padding: '0 20px 120px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Step 1: Reason selection */}
        {step === 1 && (
          <>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(175,197,255,0.6)', marginBottom: 4 }}>
              What is the reason for this dispute?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {REASONS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setReason(r.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: reason === r.id ? 'rgba(0,102,255,0.08)' : 'rgba(175,197,255,0.03)',
                    border: `1.5px solid ${reason === r.id ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.09)'}`,
                    textAlign: 'left',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{r.icon}</span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{r.label}</p>
                  {reason === r.id && (
                    <div style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, #0066FF, #3FE7FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Description + evidence */}
        {step === 2 && (
          <>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(175,197,255,0.6)', marginBottom: 4 }}>
              Describe what happened
            </p>
            <textarea
              style={{
                width: '100%',
                height: 140,
                borderRadius: 12,
                background: 'rgba(175,197,255,0.04)',
                border: `1px solid ${description.length > 0 && description.length < 20 ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.12)'}`,
                color: '#fff',
                fontSize: 14,
                padding: '12px 14px',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
                lineHeight: 1.5,
              } as React.CSSProperties}
              placeholder="Please describe the issue in detail (minimum 20 characters)..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            {description.length > 0 && description.length < 20 && (
              <p style={{ fontSize: 11, color: '#FF4D5A', marginTop: -4 }}>
                Minimum 20 characters required ({description.length}/20)
              </p>
            )}

            {/* Attach evidence */}
            <button
              onClick={handleAttach}
              style={{
                height: 48,
                borderRadius: 14,
                background: evidence ? 'rgba(34,197,94,0.08)' : 'rgba(175,197,255,0.04)',
                border: `1.5px dashed ${evidence ? 'rgba(34,197,94,0.4)' : 'rgba(175,197,255,0.2)'}`,
                color: evidence ? '#22C55E' : 'rgba(175,197,255,0.6)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {evidence ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3 3 7-7" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {evidence}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="rgba(175,197,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Attach Evidence (optional)
                </>
              )}
            </button>
          </>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(175,197,255,0.6)', marginBottom: 4 }}>
              Review your dispute
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Reason', value: selectedReason?.label ?? '' },
                { label: 'Description', value: description.length > 80 ? description.slice(0, 80) + '…' : description },
                { label: 'Evidence', value: evidence ?? 'None attached' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: 'rgba(175,197,255,0.03)',
                    border: '1px solid rgba(175,197,255,0.09)',
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(175,197,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{item.label}</p>
                  <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.5 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'rgba(175,197,255,0.4)', textAlign: 'center', marginTop: 4 }}>
              Once submitted, your dispute will be reviewed within 5–10 business days.
            </p>
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <button
          onClick={step === 3 ? handleSubmit : handleNext}
          disabled={step === 1 ? !canProceedStep1 : step === 2 ? !canProceedStep2 : false}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 16,
            background:
              (step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)
                ? 'rgba(175,197,255,0.08)'
                : 'linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)',
            border: 'none',
            color:
              (step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)
                ? 'rgba(175,197,255,0.3)'
                : '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor:
              (step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)
                ? 'not-allowed'
                : 'pointer',
          }}
        >
          {step === 3 ? 'Submit Dispute' : 'Next'}
        </button>
      </div>
    </div>
  )
}
