import { useState } from 'react'

interface InvoiceData {
  invoiceId: string
  date: string
  dueDate: string
  plan: string
  planColor: string
  cycle: 'monthly' | 'annual'
  amount: number
  tax: number
  status: 'paid' | 'failed' | 'refunded' | 'pending'
  paymentMethod: string
  last4: string
  customerName: string
  customerEmail: string
}

const MOCK_INVOICE: InvoiceData = {
  invoiceId:      'INV-2026-09',
  date:           'September 1, 2026',
  dueDate:        'September 1, 2026',
  plan:           'Prime',
  planColor:      '#0066FF',
  cycle:          'monthly',
  amount:         39.99,
  tax:            0,
  status:         'paid',
  paymentMethod:  'Chase Checking',
  last4:          '4521',
  customerName:   'Maya Patel',
  customerEmail:  'maya@example.com',
}

const STATUS_CFG = {
  paid:     { label: 'PAID',     color: '#22C55E', bg: 'rgba(34,197,94,0.1)'  },
  failed:   { label: 'FAILED',   color: '#FF4D5A', bg: 'rgba(255,77,90,0.1)' },
  refunded: { label: 'REFUNDED', color: '#F5B700', bg: 'rgba(245,183,0,0.1)' },
  pending:  { label: 'PENDING',  color: '#AFC5FF', bg: 'rgba(175,197,255,0.1)' },
}

interface InvoiceDownloadProps {
  invoiceId?: string
  invoice?: Partial<InvoiceData>
  onBack?: () => void
}

export default function InvoiceDownload({ invoice: invoiceProp, onBack }: InvoiceDownloadProps) {
  const inv: InvoiceData = { ...MOCK_INVOICE, ...invoiceProp }
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => { setDownloading(false); setDownloaded(true) }, 1300)
  }

  const st = STATUS_CFG[inv.status]
  const total = inv.amount + inv.tax

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Invoice</p>
          <p className="font-mono text-[10px] text-text-muted">{inv.invoiceId}</p>
        </div>
        <span className="font-body text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>{st.label}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Invoice card */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}>
          {/* Invoice header */}
          <div className="px-5 pt-5 pb-4 flex items-start justify-between"
            style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 10px rgba(63,231,255,0.3)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5l4-5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-display text-sm font-extrabold text-text">ChangeAIPay</p>
              </div>
              <p className="font-body text-[10px] text-text-muted">billing@changeaipay.com</p>
              <p className="font-body text-[10px] text-text-muted">changeaipay.com</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-bold text-text">${total.toFixed(2)}</p>
              <p className="font-body text-[10px] text-text-muted">{inv.date}</p>
            </div>
          </div>

          {/* Bill to */}
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}>
            <p className="font-body text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Bill To</p>
            <p className="font-body text-sm font-semibold text-text">{inv.customerName}</p>
            <p className="font-body text-[11px] text-text-muted">{inv.customerEmail}</p>
          </div>

          {/* Line items */}
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}>
            <p className="font-body text-[9px] font-bold uppercase tracking-wider text-text-muted mb-3">Items</p>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${inv.planColor}12`, border: `1px solid ${inv.planColor}28` }}>
                    <p className="font-display text-xs font-extrabold" style={{ color: inv.planColor }}>{inv.plan[0]}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-text">{inv.plan} Plan — {inv.cycle}</p>
                    <p className="font-body text-[10px] text-text-muted">Subscription · 1 month</p>
                  </div>
                </div>
                <p className="font-mono text-sm text-text">${inv.amount.toFixed(2)}</p>
              </div>
              {inv.tax > 0 && (
                <div className="flex justify-between">
                  <p className="font-body text-xs text-text-muted">Tax</p>
                  <p className="font-mono text-xs text-text">${inv.tax.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="px-5 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}>
            <p className="font-body text-sm font-semibold text-text">Total</p>
            <p className="font-mono text-lg font-bold text-text">${total.toFixed(2)}</p>
          </div>

          {/* Payment details */}
          <div className="px-5 py-4">
            <p className="font-body text-[9px] font-bold uppercase tracking-wider text-text-muted mb-2">Payment Details</p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Method', val: `${inv.paymentMethod} ····${inv.last4}` },
                { label: 'Status', val: st.label, color: st.color },
                { label: 'Date',   val: inv.date },
                { label: 'Invoice', val: inv.invoiceId },
              ].map(row => (
                <div key={row.label} className="flex justify-between">
                  <p className="font-body text-[10px] text-text-muted">{row.label}</p>
                  <p className="font-mono text-[10px]" style={{ color: row.color ?? 'var(--color-text)' }}>{row.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download */}
        {downloaded ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Invoice downloaded</p>
          </div>
        ) : (
          <button onClick={handleDownload} disabled={downloading}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
            style={{ background: 'var(--gradient-primary)' }}>
            {downloading ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.2)" strokeWidth="2" /><path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : (
              <><svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 2v8.5M4 7.5l3.5 3.5 3.5-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 13h11" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg> Download PDF</>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
