import { useState } from 'react'

interface CreatePaymentLinkProps {
  onBack?: () => void
  onCreate?: (link: { name: string; amount: string; isOpen: boolean; oneTime: boolean; expiry: string; description: string }) => void
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 48,
  borderRadius: 12,
  background: 'rgba(175,197,255,0.04)',
  border: '1px solid rgba(175,197,255,0.12)',
  color: '#fff',
  fontSize: 14,
  padding: '0 14px',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'rgba(175,197,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
  display: 'block',
}

function PillToggle({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        background: 'rgba(175,197,255,0.04)',
        border: '1px solid rgba(175,197,255,0.09)',
        borderRadius: 12,
        padding: 3,
        gap: 3,
      }}
    >
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            height: 38,
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
            background: value === opt.value ? 'linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)' : 'transparent',
            color: value === opt.value ? '#fff' : 'rgba(175,197,255,0.5)',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function CreatePaymentLink({ onBack, onCreate }: CreatePaymentLinkProps) {
  const [name, setName] = useState('')
  const [amountType, setAmountType] = useState<'fixed' | 'open'>('fixed')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [useType, setUseType] = useState<'one-time' | 'reusable'>('reusable')
  const [expiryType, setExpiryType] = useState<'none' | 'set'>('none')
  const [expiryDate, setExpiryDate] = useState('')

  const canSubmit = name.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    onCreate?.({
      name: name.trim(),
      amount: amountType === 'open' ? 'Open' : amount,
      isOpen: amountType === 'open',
      oneTime: useType === 'one-time',
      expiry: expiryType === 'set' ? expiryDate : '',
      description,
    })
  }

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: 'rgba(5,11,45,1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '56px 20px 12px' }}>
        <button
          onClick={onBack}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff' }}>Create Payment Link</p>
      </div>

      {/* Form */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          padding: '8px 20px 120px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Link name */}
        <div>
          <label style={labelStyle}>Link Name</label>
          <input
            style={inputStyle}
            placeholder="e.g. Summer Sale"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Amount type */}
        <div>
          <label style={labelStyle}>Amount Type</label>
          <PillToggle
            options={[
              { label: 'Fixed Amount', value: 'fixed' },
              { label: 'Customer Enters', value: 'open' },
            ]}
            value={amountType}
            onChange={v => setAmountType(v as 'fixed' | 'open')}
          />
        </div>

        {/* Amount input (fixed only) */}
        {amountType === 'fixed' && (
          <div>
            <label style={labelStyle}>Amount</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(175,197,255,0.5)', fontSize: 15, fontWeight: 600 }}>$</span>
              <input
                style={{ ...inputStyle, paddingLeft: 28 }}
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                type="number"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label style={labelStyle}>Description <span style={{ opacity: 0.5 }}>(optional)</span></label>
          <textarea
            style={{
              ...inputStyle,
              height: 80,
              padding: '12px 14px',
              resize: 'none',
              lineHeight: '1.5',
            } as React.CSSProperties}
            placeholder="Describe what this link is for..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Use type */}
        <div>
          <label style={labelStyle}>Use Type</label>
          <PillToggle
            options={[
              { label: 'One-time Use', value: 'one-time' },
              { label: 'Reusable', value: 'reusable' },
            ]}
            value={useType}
            onChange={v => setUseType(v as 'one-time' | 'reusable')}
          />
        </div>

        {/* Expiry */}
        <div>
          <label style={labelStyle}>Expiry</label>
          <PillToggle
            options={[
              { label: 'No Expiry', value: 'none' },
              { label: 'Set Expiry Date', value: 'set' },
            ]}
            value={expiryType}
            onChange={v => setExpiryType(v as 'none' | 'set')}
          />
          {expiryType === 'set' && (
            <input
              style={{ ...inputStyle, marginTop: 10 }}
              type="date"
              value={expiryDate}
              onChange={e => setExpiryDate(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Submit */}
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
          Create Payment Link
        </button>
      </div>
    </div>
  )
}
