import { useState } from 'react'
import ainaSrc from '@/imports/Aina.png.jpeg'

interface FlaggedTransactionDetailProps {
  flagId?: string
  onBack?: () => void
  onApprove?: () => void
  onBlock?: () => void
}

const FLAGS: { id: string; merchant: string; amount: string; reason: string; severity: string; status: string; time: string; riskScore: number; aiExplanation: string; metadata: { card: string; ipRegion: string; device: string; velocity: string } }[] = []

const DEFAULT_FLAG = FLAGS[0]

const SEVERITY_COLORS: Record<string, string> = {
  High: '#FF4D5A',
  Medium: '#F5B700',
  Low: '#3FE7FF',
}

const STATUS_COLORS: Record<string, string> = {
  Held: '#FF4D5A',
  'Under Review': '#F5B700',
  Flagged: '#FC7E2F',
  Resolved: '#22C55E',
  Approved: 'rgba(175,197,255,0.5)',
}

export default function FlaggedTransactionDetail({ flagId, onBack, onApprove, onBlock }: FlaggedTransactionDetailProps) {
  const flag = FLAGS.find(f => f.id === flagId) ?? DEFAULT_FLAG
  const [actionTaken, setActionTaken] = useState<'approve' | 'block' | null>(null)

  const handleApprove = () => {
    setActionTaken('approve')
    onApprove?.()
  }

  const handleBlock = () => {
    setActionTaken('block')
    onBlock?.()
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
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff' }}>Flagged Transaction</p>
      </div>

      <div style={{ flex: 1, padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Transaction card */}
        <div
          style={{
            padding: 16,
            borderRadius: 18,
            background: 'rgba(175,197,255,0.03)',
            border: '1px solid rgba(175,197,255,0.09)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{flag.merchant}</p>
              <p style={{ fontSize: 12, color: 'rgba(175,197,255,0.5)' }}>{flag.time}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono, monospace)', marginBottom: 4 }}>{flag.amount}</p>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: STATUS_COLORS[flag.status],
                  background: `${STATUS_COLORS[flag.status]}18`,
                  padding: '3px 9px',
                  borderRadius: 100,
                }}
              >
                {flag.status}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: SEVERITY_COLORS[flag.severity],
                background: `${SEVERITY_COLORS[flag.severity]}18`,
                padding: '2px 8px',
                borderRadius: 100,
              }}
            >
              {flag.severity} Risk
            </span>
            <p style={{ fontSize: 12, color: 'rgba(175,197,255,0.5)' }}>{flag.reason}</p>
          </div>
        </div>

        {/* Aina AI insight card */}
        <div
          style={{
            padding: 16,
            borderRadius: 18,
            background: 'rgba(0,30,90,0.95)',
            border: '1px solid rgba(0,102,255,0.22)',
            boxShadow: '0 0 32px rgba(0,102,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(0,102,255,0.4)',
                boxShadow: '0 0 10px rgba(0,102,255,0.35)',
                flexShrink: 0,
              }}
            >
              <img src={ainaSrc} alt="Aina" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Aina AI Risk Analysis</p>
              <p style={{ fontSize: 10, color: 'rgba(175,197,255,0.5)' }}>Automated fraud assessment</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(175,197,255,0.85)', lineHeight: 1.6 }}>
            {flag.aiExplanation}
          </p>
        </div>

        {/* Risk score bar */}
        <div
          style={{
            padding: 16,
            borderRadius: 18,
            background: 'rgba(175,197,255,0.03)',
            border: '1px solid rgba(175,197,255,0.09)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(175,197,255,0.7)' }}>Risk Score</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: SEVERITY_COLORS[flag.severity], fontFamily: 'var(--font-mono, monospace)' }}>{flag.riskScore}</p>
          </div>
          <div style={{ position: 'relative', height: 8, borderRadius: 100, background: 'rgba(175,197,255,0.08)' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${flag.riskScore}%`,
                borderRadius: 100,
                background: `linear-gradient(90deg, #22C55E, #F5B700, #FF4D5A)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${flag.riskScore}%`,
                transform: 'translate(-50%, -50%)',
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#fff',
                border: `2px solid ${SEVERITY_COLORS[flag.severity]}`,
                boxShadow: `0 0 8px ${SEVERITY_COLORS[flag.severity]}`,
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <p style={{ fontSize: 10, color: '#22C55E' }}>0 — Safe</p>
            <p style={{ fontSize: 10, color: '#FF4D5A' }}>100 — High Risk</p>
          </div>
        </div>

        {/* Metadata table */}
        <div
          style={{
            borderRadius: 18,
            background: 'rgba(175,197,255,0.03)',
            border: '1px solid rgba(175,197,255,0.09)',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Card Last 4', value: flag.metadata.card },
            { label: 'IP Region', value: flag.metadata.ipRegion },
            { label: 'Device', value: flag.metadata.device },
            { label: 'Velocity', value: flag.metadata.velocity },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '13px 16px',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none',
              }}
            >
              <p style={{ fontSize: 12, color: 'rgba(175,197,255,0.5)' }}>{row.label}</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{row.value}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        {actionTaken === null ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={handleApprove}
              style={{
                height: 52,
                borderRadius: 16,
                background: 'rgba(34,197,94,0.08)',
                border: '1.5px solid rgba(34,197,94,0.4)',
                color: '#22C55E',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Approve Transaction
            </button>
            <button
              onClick={handleBlock}
              style={{
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(255,77,90,0.2) 0%, rgba(200,30,50,0.3) 100%)',
                border: '1.5px solid rgba(255,77,90,0.4)',
                color: '#FF4D5A',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Block & Refund
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: 16,
              borderRadius: 16,
              background: actionTaken === 'approve' ? 'rgba(34,197,94,0.08)' : 'rgba(255,77,90,0.08)',
              border: `1px solid ${actionTaken === 'approve' ? 'rgba(34,197,94,0.3)' : 'rgba(255,77,90,0.3)'}`,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: actionTaken === 'approve' ? '#22C55E' : '#FF4D5A' }}>
              {actionTaken === 'approve' ? 'Transaction Approved' : 'Transaction Blocked & Refunded'}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(175,197,255,0.5)', marginTop: 4 }}>Action has been recorded</p>
          </div>
        )}
      </div>
    </div>
  )
}
