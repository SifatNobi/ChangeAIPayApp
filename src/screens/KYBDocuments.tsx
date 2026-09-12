import { useState } from 'react'

type DocStatus = 'idle' | 'uploading' | 'ready' | 'error'

interface DocItem {
  id: string
  label: string
  description: string
  required: boolean
  status: DocStatus
  fileName?: string
  quality?: 'good' | 'blurry' | 'partial'
}

const INITIAL_DOCS: DocItem[] = [
  { id: 'd1', label: 'Business registration', description: 'Articles of incorporation, LLC operating agreement, or equivalent state filing', required: true, status: 'idle' },
  { id: 'd2', label: 'Proof of address',        description: 'Utility bill, bank statement, or official correspondence dated within 90 days', required: true, status: 'idle' },
  { id: 'd3', label: 'Stakeholder ID',           description: 'Government-issued photo ID for each beneficial owner with 25%+ ownership', required: true, status: 'idle' },
  { id: 'd4', label: 'EIN confirmation letter',  description: 'IRS CP 575 or 147C letter confirming your Employer Identification Number', required: false, status: 'idle' },
  { id: 'd5', label: 'Industry license',         description: 'Required only if your industry is regulated (e.g. finance, healthcare, food service)', required: false, status: 'idle' },
]

interface KYBDocumentsProps {
  onContinue?: () => void
  onBack?: () => void
}

export default function KYBDocuments({ onContinue, onBack }: KYBDocumentsProps) {
  const [docs, setDocs] = useState(INITIAL_DOCS)
  const [activeDoc, setActiveDoc] = useState<string | null>(null)

  const simulateUpload = (id: string) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'uploading' } : d))
    const outcome: DocStatus = Math.random() > 0.15 ? 'ready' : 'error'
    const quality = outcome === 'ready' ? (Math.random() > 0.2 ? 'good' : 'blurry') : undefined
    setTimeout(() => {
      setDocs(prev => prev.map(d => {
        if (d.id !== id) return d
        return {
          ...d,
          status: quality === 'blurry' ? 'error' : outcome,
          fileName: outcome === 'ready' ? `document_${id}.pdf` : undefined,
          quality,
        }
      }))
      setActiveDoc(null)
    }, 1400)
  }

  const retry = (id: string) =>
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'idle', fileName: undefined, quality: undefined } : d))

  const requiredReady = docs.filter(d => d.required).every(d => d.status === 'ready')

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Documents</p>
          <p className="font-body text-[10px] text-text-muted">Step 4 of 4</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2,3].map(i => (
            <div key={i} className="h-1.5 rounded-full" style={{ width: i === 3 ? 16 : 6, background: 'var(--color-accent)' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>

        {/* Upload tip */}
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6" cy="6" r="5" stroke="#3FE7FF" strokeWidth="1" />
            <path d="M6 5v3M6 3.5v.5" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Use well-lit photos or scan PDFs. All text must be legible and all four corners visible. File or camera upload accepted.
          </p>
        </div>

        {docs.map(d => (
          <div key={d.id} className="rounded-[--radius-2xl] overflow-hidden"
            style={{ background: d.status === 'ready' ? 'rgba(34,197,94,0.05)' : d.status === 'error' ? 'rgba(239,68,68,0.05)' : 'rgba(175,197,255,0.03)', border: `1.5px solid ${d.status === 'ready' ? 'rgba(34,197,94,0.25)' : d.status === 'error' ? 'rgba(239,68,68,0.25)' : 'rgba(175,197,255,0.1)'}` }}>
            <div className="flex items-start gap-3 px-4 py-4">
              {/* Status icon */}
              <div className="w-10 h-10 rounded-[13px] flex items-center justify-center shrink-0"
                style={{ background: d.status === 'ready' ? 'rgba(34,197,94,0.12)' : d.status === 'error' ? 'rgba(239,68,68,0.1)' : d.status === 'uploading' ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.07)' }}>
                {d.status === 'idle' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 11V5M5 8l3-3 3 3" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="2" y="12" width="12" height="1.5" rx="0.75" fill="rgba(175,197,255,0.15)" />
                  </svg>
                )}
                {d.status === 'uploading' && (
                  <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(63,231,255,0.4)', borderTopColor: 'transparent' }} />
                )}
                {d.status === 'ready' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {d.status === 'error' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 5v4M8 10.5v.5" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M8 2L1 14h14L8 2Z" stroke="#F87171" strokeWidth="1" fill="none" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="font-body text-sm font-semibold text-text">{d.label}</p>
                  {!d.required && (
                    <span className="font-body text-[8px] text-text-muted px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(175,197,255,0.07)' }}>Optional</span>
                  )}
                </div>
                <p className="font-body text-[10px] text-text-muted leading-relaxed">{d.description}</p>
                {d.status === 'ready' && d.fileName && (
                  <p className="font-body text-[10px] mt-1" style={{ color: '#22C55E' }}>✓ {d.fileName}</p>
                )}
                {d.status === 'error' && d.quality === 'blurry' && (
                  <p className="font-body text-[10px] mt-1" style={{ color: '#F87171' }}>
                    Document is blurry — please retake with better lighting
                  </p>
                )}
                {d.status === 'error' && d.quality !== 'blurry' && (
                  <p className="font-body text-[10px] mt-1" style={{ color: '#F87171' }}>Upload failed — tap to retry</p>
                )}
              </div>
            </div>

            {/* Upload / retry actions */}
            {(d.status === 'idle' || d.status === 'error') && (
              <div className="flex gap-2 px-4 pb-4">
                <button onClick={() => { setActiveDoc(d.id); simulateUpload(d.id) }}
                  className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.96]"
                  style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)', color: '#3FE7FF' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 8V3M3.5 5.5L6 3l2.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {d.status === 'error' ? 'Try again' : 'Upload file'}
                </button>
                <button onClick={() => { setActiveDoc(d.id); simulateUpload(d.id) }}
                  className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.96]"
                  style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.65)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1" /><path d="M1 10.5c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" /></svg>
                  Take photo
                </button>
                {d.status === 'error' && (
                  <button onClick={() => retry(d.id)}
                    className="w-10 h-10 rounded-[--radius-xl] flex items-center justify-center transition-all active:scale-[0.96]"
                    style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6a4 4 0 1 1 1 2.7M2 6V3M2 6H5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        <button onClick={() => requiredReady && onContinue?.()} disabled={!requiredReady}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: requiredReady ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.07)', opacity: requiredReady ? 1 : 0.6, cursor: requiredReady ? 'pointer' : 'not-allowed' }}>
          Submit for Review
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {!requiredReady && (
          <p className="font-body text-[10px] text-center text-text-muted">
            Upload all required documents to continue
          </p>
        )}
      </div>
    </div>
  )
}
