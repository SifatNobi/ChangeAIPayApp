import { useState } from 'react'

interface RespondToDisputeProps {
  onBack?: () => void
  onSubmit?: () => void
}

export default function RespondToDispute({ onBack, onSubmit }: RespondToDisputeProps) {
  const [response, setResponse] = useState('')
  const [evidence, setEvidence] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = response.trim().length > 0

  const handleAttach = () => {
    setEvidence('merchant_receipt.pdf')
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    onSubmit?.()
  }

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: 'rgba(5,11,45,1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '56px 20px 12px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff' }}>Respond to Dispute</p>
      </div>

      <div style={{ flex: 1, padding: '8px 20px 120px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Dispute claim card */}
        <div
          style={{
            padding: 16,
            borderRadius: 18,
            background: 'rgba(245,183,0,0.05)',
            border: '1px solid rgba(245,183,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 4v3m0 2v.5" stroke="#F5B700" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#F5B700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Consumer Dispute Claim</p>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Unauthorized charge</p>
          <p style={{ fontSize: 13, color: 'rgba(175,197,255,0.75)', lineHeight: 1.6 }}>
            Customer reports they did not authorize this transaction on Aug 9, 2026. Amount: $340.00. Filed: Aug 10, 2026.
          </p>
        </div>

        {/* Deadline warning */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderRadius: 12,
            background: 'rgba(245,183,0,0.08)',
            border: '1px solid rgba(245,183,0,0.25)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5a6.5 6.5 0 100 13A6.5 6.5 0 008 1.5zm0 3.5v4m0 2h.01" stroke="#F5B700" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#F5B700' }}>Respond by Aug 17, 2026 to protect your funds.</p>
        </div>

        {/* Response textarea */}
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(175,197,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 8,
              display: 'block',
            }}
          >
            Your Response
          </label>
          <textarea
            style={{
              width: '100%',
              height: 160,
              borderRadius: 12,
              background: 'rgba(175,197,255,0.04)',
              border: '1px solid rgba(175,197,255,0.12)',
              color: '#fff',
              fontSize: 14,
              padding: '12px 14px',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box',
              lineHeight: 1.5,
            } as React.CSSProperties}
            placeholder="Explain why this transaction was authorized and provide supporting context..."
            value={response}
            onChange={e => setResponse(e.target.value)}
          />
        </div>

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

        {submitted && (
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.3)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: '#22C55E' }}>Response Submitted</p>
            <p style={{ fontSize: 12, color: 'rgba(175,197,255,0.5)', marginTop: 4 }}>Your response is under review.</p>
          </div>
        )}
      </div>

      {/* Submit button */}
      <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 16,
            background: canSubmit ? 'linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)' : 'rgba(175,197,255,0.08)',
            border: 'none',
            color: canSubmit ? '#fff' : 'rgba(175,197,255,0.3)',
            fontSize: 15,
            fontWeight: 700,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
        >
          Submit Response
        </button>
      </div>
    </div>
  )
}
