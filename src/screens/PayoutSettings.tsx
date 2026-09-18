import { useState } from 'react'

interface PayoutSettingsProps {
  onBack?: () => void
  onHistory?: () => void
}

const SCHEDULES = [
  { id: 'instant', label: 'Instant', note: 'Small processing fee applies', icon: '⚡' },
  { id: 'daily', label: 'Daily', note: 'Business days only', icon: '📅' },
  { id: 'weekly', label: 'Weekly', note: 'Every Monday', icon: '🗓' },
  { id: 'manual', label: 'Manual', note: 'Trigger payouts yourself', icon: '🎛' },
]

export default function PayoutSettings({ onBack, onHistory }: PayoutSettingsProps) {
  const [schedule, setSchedule] = useState('daily')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff' }}>Payout Settings</p>
      </div>

      <div style={{ flex: 1, padding: '8px 20px 120px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Payout Schedule */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(175,197,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            Payout Schedule
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SCHEDULES.map(s => (
              <button
                key={s.id}
                onClick={() => setSchedule(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderRadius: 16,
                  background: schedule === s.id ? 'rgba(0,102,255,0.08)' : 'rgba(175,197,255,0.03)',
                  border: `1.5px solid ${schedule === s.id ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.09)'}`,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  width: '100%',
                }}
              >
                {/* Radio dot */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: `2px solid ${schedule === s.id ? '#0066FF' : 'rgba(175,197,255,0.25)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {schedule === s.id && (
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #0066FF, #3FE7FF)' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{s.label}</p>
                  <p style={{ fontSize: 11, color: 'rgba(175,197,255,0.45)', marginTop: 1 }}>{s.note}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Default Bank Account */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(175,197,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            Default Bank Account
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px',
              borderRadius: 16,
              background: 'rgba(175,197,255,0.03)',
              border: '1px solid rgba(175,197,255,0.09)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(0,102,255,0.12)',
                border: '1px solid rgba(0,102,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="6" width="16" height="11" rx="2" stroke="#0066FF" strokeWidth="1.4" />
                <path d="M2 9h16" stroke="#0066FF" strokeWidth="1.4" />
                <path d="M6 13h3" stroke="#3FE7FF" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Chase ••4821</p>
              <p style={{ fontSize: 11, color: 'rgba(175,197,255,0.45)', marginTop: 1 }}>Routing ••••0621 · Checking</p>
            </div>
            <button
              onClick={onBack}
              style={{ fontSize: 13, fontWeight: 600, color: '#3FE7FF', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px' }}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 390, padding: '0 20px 32px', background: 'rgba(5,11,45,1)', borderTop: '1px solid rgba(175,197,255,0.06)' }}>
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 16,
            background: saved ? 'rgba(34,197,94,0.15)' : 'linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)',
            border: saved ? '1.5px solid rgba(34,197,94,0.4)' : 'none',
            color: saved ? '#22C55E' : '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: 12,
            transition: 'all 0.2s',
          }}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
        <button
          onClick={onHistory}
          style={{ width: '100%', height: 44, background: 'none', border: 'none', color: 'rgba(175,197,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          View Payout History →
        </button>
      </div>
    </div>
  )
}
