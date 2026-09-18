import { useState } from 'react'

type InvoiceState = 'draft' | 'sent' | 'sending'

interface LineItem {
  id: string
  description: string
  qty: number
  rate: number
}

interface InvoiceProps {
  onSend?: () => void
  onSaveDraft?: () => void
  onBack?: () => void
}

const genId = () => Math.random().toString(36).slice(2, 8)

const INITIAL_ITEMS: LineItem[] = []

export default function Invoice({ onSend, onSaveDraft, onBack }: InvoiceProps) {
  const [state, setState] = useState<InvoiceState>('draft')
  const [items, setItems] = useState<LineItem[]>(INITIAL_ITEMS)
  const [customer, setCustomer] = useState('')
  const [email, setEmail] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [note, setNote] = useState('')
  const [sendMethod, setSendMethod] = useState<'email' | 'link'>('email')
  const [copied, setCopied] = useState(false)

  const subtotal = items.reduce((acc, i) => acc + i.qty * i.rate, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const addItem = () => {
    setItems(prev => [...prev, { id: genId(), description: '', qty: 1, rate: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(prev => prev.filter(i => i.id !== id))
  }

  const handleSend = () => {
    setState('sending')
    setTimeout(() => {
      setState('sent')
      onSend?.()
    }, 1600)
  }

  const handleCopyLink = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (state === 'sent') {
    return (
      <div className="flex flex-col bg-bg items-center justify-center px-5" style={{ minHeight: 785 }}>
        <div
          className="w-20 h-20 rounded-[26px] flex items-center justify-center mb-5"
          style={{
            background: 'rgba(34,197,94,0.1)',
            border: '2px solid rgba(34,197,94,0.3)',
            boxShadow: '0 0 32px rgba(34,197,94,0.15)',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M7 18l7 7 15-14" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-xl font-extrabold text-text text-center">Invoice sent!</p>
        <p className="font-body text-sm text-text-muted text-center mt-2">
          {sendMethod === 'email' ? `Delivered to ${email}` : 'Payment link is ready to share'}
        </p>
        <div
          className="mt-6 px-5 py-3 rounded-[--radius-xl] text-center"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-mono text-base font-bold text-text">${total.toFixed(2)}</p>
          <p className="font-body text-xs text-text-muted">Invoice #INV-0001</p>
        </div>
        <button
          onClick={onBack}
          className="mt-8 w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Back to Payments
        </button>
      </div>
    )
  }

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">New Invoice</p>
          <p className="font-body text-[10px] text-text-muted">#INV-0001</p>
        </div>
        <button
          onClick={onSaveDraft}
          className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
          style={{ background: 'rgba(175,197,255,0.08)', color: 'rgba(175,197,255,0.7)', border: '1px solid rgba(175,197,255,0.15)' }}
        >
          Save draft
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Customer info */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Bill To</p>
          <div className="flex flex-col gap-2">
            <input
              className="w-full bg-transparent font-body text-sm text-text placeholder-text-muted outline-none py-1.5 border-b"
              style={{ borderColor: 'rgba(175,197,255,0.1)' }}
              placeholder="Customer name"
              value={customer}
              onChange={e => setCustomer(e.target.value)}
            />
            <input
              className="w-full bg-transparent font-body text-sm text-text placeholder-text-muted outline-none py-1.5 border-b"
              style={{ borderColor: 'rgba(175,197,255,0.1)' }}
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Due date */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" />
            <path d="M2 7h12M5 1v4M11 1v4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-text-muted flex-1">Due date</p>
          <input
            type="date"
            className="bg-transparent font-body text-xs text-text outline-none"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>

        {/* Line items */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Line Items</p>
          <div className="flex flex-col gap-2">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-[--radius-xl] px-4 py-3"
                style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.09)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    className="flex-1 bg-transparent font-body text-xs text-text placeholder-text-muted outline-none"
                    placeholder={`Item ${idx + 1} description`}
                    value={item.description}
                    onChange={e => updateItem(item.id, 'description', e.target.value)}
                  />
                  {items.length > 1 && (
                    <button onClick={() => removeItem(item.id)} className="w-5 h-5 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <p className="font-body text-[10px] text-text-muted">Qty</p>
                    <input
                      type="number"
                      className="w-12 bg-transparent font-mono text-xs text-text outline-none text-center py-1 rounded"
                      style={{ background: 'rgba(175,197,255,0.06)' }}
                      value={item.qty}
                      onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-body text-[10px] text-text-muted">Rate</p>
                    <div className="flex items-center">
                      <span className="font-mono text-xs text-text-muted">$</span>
                      <input
                        type="number"
                        className="w-16 bg-transparent font-mono text-xs text-text outline-none py-1 pl-0.5"
                        value={item.rate}
                        onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <p className="font-mono text-xs font-bold text-text ml-auto">
                    ${(item.qty * item.rate).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="w-full mt-2 h-10 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px dashed rgba(175,197,255,0.18)', color: 'rgba(175,197,255,0.6)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Add line item
          </button>
        </div>

        {/* Totals */}
        <div
          className="rounded-[--radius-xl] px-4 py-4 flex flex-col gap-2"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <div className="flex justify-between">
            <p className="font-body text-xs text-text-muted">Subtotal</p>
            <p className="font-mono text-xs text-text">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-body text-xs text-text-muted">Tax (8%)</p>
            <p className="font-mono text-xs text-text">${tax.toFixed(2)}</p>
          </div>
          <div
            className="flex justify-between pt-2 mt-1"
            style={{ borderTop: '1px solid rgba(175,197,255,0.1)' }}
          >
            <p className="font-body text-sm font-semibold text-text">Total</p>
            <p className="font-mono text-base font-extrabold text-text">${total.toFixed(2)}</p>
          </div>
        </div>

        {/* Note */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Note (optional)</p>
          <textarea
            className="w-full bg-transparent font-body text-xs text-text placeholder-text-muted outline-none p-3 rounded-[--radius-xl] resize-none"
            style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.1)', minHeight: 64 }}
            placeholder="Payment terms, reference number, or thank you note..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>

        {/* Send method */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Send via</p>
          <div className="flex gap-2">
            {(['email', 'link'] as const).map(m => (
              <button
                key={m}
                onClick={() => setSendMethod(m)}
                className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                style={{
                  background: sendMethod === m ? 'var(--color-accent)' : 'rgba(175,197,255,0.06)',
                  color: sendMethod === m ? 'white' : 'rgba(175,197,255,0.6)',
                  border: `1px solid ${sendMethod === m ? 'transparent' : 'rgba(175,197,255,0.14)'}`,
                }}
              >
                {m === 'email' ? 'Email' : 'Payment link'}
              </button>
            ))}
          </div>

          {sendMethod === 'link' && (
            <button
              onClick={handleCopyLink}
              className="w-full mt-2 h-10 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              style={{
                background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(175,197,255,0.04)',
                border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.14)'}`,
                color: copied ? '#22C55E' : 'rgba(175,197,255,0.6)',
              }}
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Link copied!
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8 4H9a2 2 0 0 1 0 4H8M4 8H3a2 2 0 0 1 0-4h1M4 6h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                  Copy payment link
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Send CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-5 pb-6 pt-4"
        style={{
          background: 'linear-gradient(to top, rgba(6,8,15,0.98) 80%, transparent)',
        }}
      >
        <button
          onClick={handleSend}
          disabled={state === 'sending'}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: state === 'sending' ? 'rgba(0,102,255,0.5)' : 'var(--gradient-primary)' }}
        >
          {state === 'sending' ? (
            <>
              <div
                className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
              />
              Sending…
            </>
          ) : (
            <>
              {sendMethod === 'email' ? 'Send Invoice' : 'Generate & Share'}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
