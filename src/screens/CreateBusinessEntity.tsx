import { useState } from 'react'

interface CreateBusinessEntityProps {
  onBack?: () => void
  onCreated?: (entity: { name: string; taxId: string; description?: string }) => void
}

export default function CreateBusinessEntity({ onBack, onCreated }: CreateBusinessEntityProps) {
  const [name, setName] = useState('')
  const [taxId, setTaxId] = useState('')
  const [description, setDescription] = useState('')

  const canSubmit = name.trim().length > 0 && taxId.trim().length > 0

  function handleSubmit() {
    if (!canSubmit) return
    onCreated?.({ name: name.trim(), taxId: taxId.trim(), description: description.trim() || undefined })
  }

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,102,255,0.13) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="rgba(175,197,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-display text-base font-bold text-white">New Business Entity</h1>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex flex-col gap-2">
            <label className="font-body text-xs font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>
              Entity Name <span style={{ color: '#3FE7FF' }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Acme Consulting LLC"
              className="w-full h-13 px-4 rounded-[--radius-2xl] font-body text-sm text-white outline-none"
              style={{
                background: 'rgba(175,197,255,0.06)',
                border: '1px solid rgba(175,197,255,0.12)',
                height: 52,
                caretColor: '#3FE7FF',
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body text-xs font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>
              Tax ID / EIN / VAT Number <span style={{ color: '#3FE7FF' }}>*</span>
            </label>
            <input
              type="text"
              value={taxId}
              onChange={e => setTaxId(e.target.value)}
              placeholder="e.g. 12-3456789"
              className="w-full h-13 px-4 rounded-[--radius-2xl] font-body text-sm text-white outline-none"
              style={{
                background: 'rgba(175,197,255,0.06)',
                border: '1px solid rgba(175,197,255,0.12)',
                height: 52,
                caretColor: '#3FE7FF',
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body text-xs font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>
              Description <span style={{ color: 'rgba(175,197,255,0.3)' }}>(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of this entity"
              rows={3}
              className="w-full px-4 py-3 rounded-[--radius-2xl] font-body text-sm text-white outline-none resize-none"
              style={{
                background: 'rgba(175,197,255,0.06)',
                border: '1px solid rgba(175,197,255,0.12)',
                caretColor: '#3FE7FF',
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 px-5 pb-4">
        <div
          className="px-4 py-3 rounded-[--radius-2xl] mb-4"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
        >
          <p className="font-body text-[11px] text-center leading-relaxed" style={{ color: 'rgba(175,197,255,0.4)' }}>
            This creates a local bookkeeping entity. No additional KYB review is required.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-opacity"
          style={{
            background: 'var(--gradient-primary, linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%))',
            opacity: canSubmit ? 1 : 0.35,
          }}
        >
          Create Entity
        </button>
      </div>
    </div>
  )
}
