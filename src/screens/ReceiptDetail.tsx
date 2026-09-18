import { useState } from 'react'

export interface ReceiptData {
  id: string
  vendor: string
  date: string
  total: string
  tax?: string
  category: string
  paymentMethod: string
  imageUrl?: string
}

interface ReceiptDetailProps {
  receipt?: ReceiptData
  onBack?: () => void
  onEdit?: (receipt: ReceiptData) => void
  onDelete?: (id: string) => void
}

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  Meals:    { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  Travel:   { color: '#3FE7FF', bg: 'rgba(63,231,255,0.1)' },
  Office:   { color: '#0066FF', bg: 'rgba(0,102,255,0.1)' },
  Personal: { color: '#AFC5FF', bg: 'rgba(175,197,255,0.1)' },
  Other:    { color: 'rgba(175,197,255,0.5)', bg: 'rgba(175,197,255,0.06)' },
}

export default function ReceiptDetail({ receipt, onBack, onEdit, onDelete }: ReceiptDetailProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!receipt) {
    return (
      <div className="flex flex-col items-center justify-center bg-bg" style={{ minHeight: 785 }}>
        <p className="font-body text-sm text-text-muted">No receipt selected.</p>
        <button onClick={onBack} className="mt-4 font-body text-sm text-accent">Go back</button>
      </div>
    )
  }

  const catStyle = CATEGORY_COLORS[receipt.category] ?? CATEGORY_COLORS['Other']

  const fields: { label: string; value: string; mono?: boolean }[] = [
    { label: 'Vendor',          value: receipt.vendor },
    { label: 'Date',            value: receipt.date },
    { label: 'Total',           value: receipt.total,          mono: true },
    ...(receipt.tax ? [{ label: 'Tax', value: receipt.tax, mono: true }] : []),
    { label: 'Payment Method',  value: receipt.paymentMethod },
  ]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Receipt</p>
          <p className="font-body text-[10px] text-text-muted">{receipt.vendor}</p>
        </div>
        <button
          onClick={() => onEdit?.(receipt)}
          className="h-8 px-3 rounded-full font-body text-xs font-semibold transition-all"
          style={{ color: 'rgba(175,197,255,0.8)', background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.18)' }}
        >
          Edit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Receipt image / placeholder */}
        <div
          className="w-full rounded-[--radius-2xl] overflow-hidden flex items-center justify-center"
          style={{
            height: 200,
            background: receipt.imageUrl ? undefined : 'rgba(175,197,255,0.03)',
            border: '1px solid rgba(175,197,255,0.1)',
          }}
        >
          {receipt.imageUrl ? (
            <img src={receipt.imageUrl} alt="Receipt" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="8" y="4" width="20" height="28" rx="2" stroke="rgba(175,197,255,0.2)" strokeWidth="1.2" />
                <path d="M12 12h12M12 17h12M12 22h8" stroke="rgba(175,197,255,0.18)" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <p className="font-body text-[10px] text-text-muted">No image captured</p>
            </div>
          )}
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full font-body text-xs font-semibold"
            style={{ background: catStyle.bg, color: catStyle.color, border: `1px solid ${catStyle.color}33` }}
          >
            {receipt.category}
          </span>
          <span className="font-body text-[10px] text-text-muted">#{receipt.id.slice(0, 8)}</span>
        </div>

        {/* Fields */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden"
          style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
        >
          {fields.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-between px-4 py-3.5"
              style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
            >
              <p className="font-body text-xs text-text-muted">{f.label}</p>
              <p
                className={`text-sm font-semibold text-text ${f.mono ? 'font-mono' : 'font-body'}`}
              >
                {f.value}
              </p>
            </div>
          ))}
        </div>

        {/* AI disclaimer */}
        <div
          className="flex gap-2.5 px-3 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.18)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 1.5L.5 13h13L7 1.5Z" stroke="#F5B700" strokeWidth="1" strokeLinejoin="round" />
            <line x1="7" y1="5.5" x2="7" y2="8.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
            <circle cx="7" cy="10.5" r="0.6" fill="#F5B700" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Fields were extracted with AI assistance. Always verify amounts and details before filing or submitting.
          </p>
        </div>

        {/* Delete */}
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)', color: '#FF4D5A' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 4h9M5 4V2.5h4V4M4 4l.5 7.5h5L10 4" stroke="#FF4D5A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Delete Receipt
          </button>
        ) : (
          <div
            className="rounded-[--radius-xl] px-4 py-4 flex flex-col gap-3"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.25)' }}
          >
            <p className="font-body text-sm font-semibold text-center" style={{ color: '#FF4D5A' }}>Delete this receipt?</p>
            <p className="font-body text-[10px] text-text-muted text-center">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-10 rounded-[--radius-xl] font-body text-sm font-semibold transition-all"
                style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.15)', color: 'rgba(175,197,255,0.7)' }}
              >
                Cancel
              </button>
              <button
                onClick={() => { onDelete?.(receipt.id); onBack?.() }}
                className="flex-1 h-10 rounded-[--radius-xl] font-body text-sm font-semibold transition-all"
                style={{ background: 'rgba(255,77,90,0.15)', border: '1px solid rgba(255,77,90,0.35)', color: '#FF4D5A' }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
