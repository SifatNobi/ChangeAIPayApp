import { useState } from 'react'

type DocType = 'payslip' | 'bank_statement' | 'tax_return' | 'sale_agreement' | 'investment' | 'gift_letter' | 'other'

interface DocCategory {
  key: DocType
  label: string
  sub: string
  icon: React.ReactNode
  color: string
}

const DOC_TYPES: DocCategory[] = [
  {
    key: 'payslip', label: 'Pay slip / Salary', sub: 'Last 3 months',
    color: '#22C55E',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h10v12H3V2z" stroke="#22C55E" strokeWidth="1.1" strokeLinejoin="round" /><path d="M5 5h6M5 7.5h6M5 10h3" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
  {
    key: 'bank_statement', label: 'Bank statement', sub: 'Last 3 months, official',
    color: '#4D9FFF',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1.5 5h13v7H1.5V5z" stroke="#4D9FFF" strokeWidth="1.1" strokeLinejoin="round" /><path d="M1.5 8h13" stroke="#4D9FFF" strokeWidth="1.1" /><path d="M8 1.5L1.5 5h13L8 1.5z" stroke="#4D9FFF" strokeWidth="1.1" strokeLinejoin="round" /></svg>,
  },
  {
    key: 'tax_return', label: 'Tax return / P60', sub: 'Most recent financial year',
    color: '#9945FF',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h10v12H3V2z" stroke="#9945FF" strokeWidth="1.1" strokeLinejoin="round" /><path d="M5 6l2 2 4-4" stroke="#9945FF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 10h6" stroke="#9945FF" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
  {
    key: 'sale_agreement', label: 'Sale / Purchase agreement', sub: 'Property, business, or asset',
    color: '#FF9F43',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h10v12H3V2z" stroke="#FF9F43" strokeWidth="1.1" strokeLinejoin="round" /><path d="M5 5h6M5 7.5h4M5 10h6" stroke="#FF9F43" strokeWidth="1.1" strokeLinecap="round" /><path d="M10 13l2-1" stroke="#FF9F43" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
  {
    key: 'investment', label: 'Investment / Dividend statement', sub: 'Brokerage or fund statement',
    color: '#3FE7FF',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l3-4 3 2 3-5 3 3" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    key: 'gift_letter', label: 'Gift declaration letter', sub: 'Signed by donor, with relationship',
    color: '#BF8FFF',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 6h11v7H2.5V6z" stroke="#BF8FFF" strokeWidth="1.1" strokeLinejoin="round" /><path d="M2.5 6c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5M8 6c0-1.5 1-2.5 2.5-2.5S13 4.5 13 6" stroke="#BF8FFF" strokeWidth="1.1" strokeLinecap="round" /><path d="M8 6v7" stroke="#BF8FFF" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
  {
    key: 'other', label: 'Other supporting document', sub: 'Any official document explaining the funds',
    color: 'rgba(175,197,255,0.6)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h10v12H3V2z" stroke="rgba(175,197,255,0.6)" strokeWidth="1.1" strokeLinejoin="round" /><path d="M5 5h6M5 7.5h6M5 10h4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
]

interface UploadedFile {
  id: string
  name: string
  docType: DocType
  size: string
}

interface SourceOfFundsProps {
  onBack?: () => void
  onSubmit?: () => void
  caseRef?: string
  flaggedAmount?: string
}

export default function SourceOfFunds({ onBack, onSubmit, caseRef = 'CLR-20261021-4482', flaggedAmount = '$8,400.00' }: SourceOfFundsProps) {
  const [selectedType, setSelectedType] = useState<DocType | null>(null)
  const [uploads, setUploads] = useState<UploadedFile[]>([])
  const [explanation, setExplanation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const canSubmit = selectedType !== null && uploads.length > 0 && !submitting

  const addUpload = () => {
    if (!selectedType || uploads.length >= 5) return
    const typeLabel = DOC_TYPES.find(d => d.key === selectedType)?.label ?? 'Document'
    const file: UploadedFile = {
      id: Date.now().toString(),
      name: `${typeLabel.replace(/\s+/g, '_').toLowerCase()}_${uploads.length + 1}.pdf`,
      docType: selectedType,
      size: `${(Math.random() * 2 + 0.3).toFixed(1)} MB`,
    }
    setUploads(prev => [...prev, file])
  }

  const removeUpload = (id: string) => setUploads(prev => prev.filter(f => f.id !== id))

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      onSubmit?.()
    }, 1600)
  }

  const selectedDocCfg = DOC_TYPES.find(d => d.key === selectedType)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Source of Funds</p>
          <p className="font-body text-[10px] text-text-muted">{caseRef}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Context card */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.04)', border: '1px solid rgba(245,183,0,0.14)' }}>
          <p className="font-body text-sm text-text leading-relaxed">
            To complete your compliance review, we need documentation confirming the origin of the funds involved in this case.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <p className="font-body text-[10px] text-text-muted">Amount under review</p>
            <p className="font-mono text-xs font-semibold" style={{ color: '#F5B700' }}>{flaggedAmount}</p>
          </div>
        </div>

        {/* Acceptable documents */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">Select document type</p>

          <button
            onClick={() => setShowPicker(v => !v)}
            className="w-full h-11 flex items-center gap-3 px-4 rounded-[--radius-xl] text-left transition-all mb-2"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: `1px solid ${selectedType ? `${selectedDocCfg?.color}35` : 'rgba(175,197,255,0.12)'}`,
            }}>
            {selectedType ? (
              <>
                <div className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: selectedDocCfg?.color, boxShadow: `0 0 5px ${selectedDocCfg?.color}80` }} />
                <p className="flex-1 font-body text-sm text-text">{selectedDocCfg?.label}</p>
              </>
            ) : (
              <p className="flex-1 font-body text-sm text-text-muted">Choose document type</p>
            )}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: showPicker ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              <path d="M3 5l4 4 4-4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showPicker && (
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.1)', background: 'rgba(175,197,255,0.02)' }}>
              {DOC_TYPES.map((doc, i) => (
                <button key={doc.key}
                  onClick={() => { setSelectedType(doc.key); setShowPicker(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface/50 transition-colors"
                  style={{ borderBottom: i < DOC_TYPES.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0"
                    style={{ background: `${doc.color}12` }}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-text">{doc.label}</p>
                    <p className="font-body text-[10px] text-text-muted">{doc.sub}</p>
                  </div>
                  {selectedType === doc.key && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke={doc.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upload area */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Upload documents <span className="normal-case font-normal">(up to 5 files)</span>
          </p>

          {/* Existing uploads */}
          {uploads.length > 0 && (
            <div className="flex flex-col gap-2 mb-3">
              {uploads.map(f => {
                const cfg = DOC_TYPES.find(d => d.key === f.docType)
                return (
                  <div key={f.id} className="flex items-center gap-3 px-3 py-3 rounded-[--radius-xl]"
                    style={{ background: `${cfg?.color ?? '#4D9FFF'}08`, border: `1px solid ${cfg?.color ?? '#4D9FFF'}20` }}>
                    <div className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0"
                      style={{ background: `${cfg?.color}12` }}>
                      {cfg?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold text-text truncate">{f.name}</p>
                      <p className="font-body text-[9px] text-text-muted">{f.size} · {cfg?.label}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(34,197,94,0.12)' }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2 3-3" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <button onClick={() => removeUpload(f.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(175,197,255,0.35)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Upload trigger */}
          {uploads.length < 5 && (
            <button onClick={addUpload} disabled={!selectedType}
              className="w-full py-5 rounded-[--radius-2xl] flex flex-col items-center gap-2 transition-all"
              style={{
                background: 'rgba(175,197,255,0.03)',
                border: `1.5px dashed ${selectedType ? `${selectedDocCfg?.color}40` : 'rgba(175,197,255,0.12)'}`,
                opacity: selectedType ? 1 : 0.5,
              }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: selectedType ? `${selectedDocCfg?.color}10` : 'rgba(175,197,255,0.06)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3v10M4 8l5-5 5 5" stroke={selectedType ? (selectedDocCfg?.color ?? '#AFC5FF') : 'rgba(175,197,255,0.4)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 15h14" stroke={selectedType ? (selectedDocCfg?.color ?? '#AFC5FF') : 'rgba(175,197,255,0.3)'} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-body text-sm font-medium" style={{ color: selectedType ? selectedDocCfg?.color : 'rgba(175,197,255,0.4)' }}>
                {selectedType ? 'Tap to upload' : 'Select a document type first'}
              </p>
              <p className="font-body text-[10px] text-text-muted">PDF, JPG, PNG · Max 10 MB per file</p>
            </button>
          )}
        </div>

        {/* Optional explanation */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2">Additional context <span className="font-normal text-text-muted">(optional)</span></p>
          <textarea
            className="w-full bg-transparent font-body text-sm text-text placeholder-text-muted outline-none px-4 py-3 rounded-[--radius-xl] resize-none"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)', minHeight: 80 }}
            placeholder="Briefly describe the origin of these funds if it would help clarify the documentation."
            value={explanation}
            onChange={e => setExplanation(e.target.value.slice(0, 500))}
          />
        </div>

        {/* Security note */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 1.5L2 3.5V6c0 3 2 5 5 6 3-1 5-3 5-6V3.5L7 1.5z" stroke="#22C55E" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Your documents are encrypted in transit and at rest. They are reviewed only by our compliance team and are not shared externally except where legally required.
          </p>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!canSubmit}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: canSubmit ? 'linear-gradient(135deg, rgba(245,183,0,0.6), rgba(245,183,0,0.4))' : 'rgba(175,197,255,0.08)',
            color: canSubmit ? 'white' : 'rgba(175,197,255,0.3)',
            boxShadow: canSubmit ? '0 4px 16px rgba(245,183,0,0.12)' : 'none',
          }}>
          {submitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : 'Submit Documents'}
        </button>
      </div>
    </div>
  )
}
