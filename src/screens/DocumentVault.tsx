import { useState } from 'react'

interface VaultDoc {
  id: string
  name: string
  category: 'invoice' | 'warranty' | 'receipt' | 'other'
  date: string
  sizeKb?: number
}

interface DocumentVaultProps {
  onBack?: () => void
  onCaptureDocument?: () => void
  onSelectDocument?: (id: string) => void
}

type FilterCategory = 'all' | VaultDoc['category']

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  all: 'All',
  invoice: 'Invoices',
  warranty: 'Warranties',
  receipt: 'Receipts',
  other: 'Other',
}

const FILTER_TABS: FilterCategory[] = ['all', 'invoice', 'warranty', 'receipt', 'other']

function CategoryIcon({ category }: { category: VaultDoc['category'] }) {
  if (category === 'invoice') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  }
  if (category === 'warranty') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }
  if (category === 'receipt') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 3 3 21 5 19 7 21 9 19 11 21 13 19 15 21 17 19 19 21 21 19 21 3 3 3" />
        <line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" />
      </svg>
    )
  }
  // other
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  )
}

const CAT_COLOR: Record<VaultDoc['category'], string> = {
  invoice: '#3FE7FF',
  warranty: '#22C55E',
  receipt: '#F5B700',
  other: 'rgba(175,197,255,0.5)',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatSize(kb?: number): string {
  if (kb === undefined) return ''
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${kb} KB`
}

export default function DocumentVault({ onBack, onCaptureDocument, onSelectDocument }: DocumentVaultProps) {
  const [documents] = useState<VaultDoc[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filtered = activeFilter === 'all'
    ? documents
    : documents.filter(d => d.category === activeFilter)

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div
        className="px-5 pt-4 pb-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid rgba(175,197,255,0.12)' }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 focus-ring"
          style={{ background: 'rgba(175,197,255,0.06)' }}
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="font-display text-base font-semibold text-text-1 flex-1">Document Vault</h1>
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full"
          style={{ background: 'rgba(175,197,255,0.06)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Action buttons */}
        <div className="px-5 pt-5 grid grid-cols-2 gap-3">
          <button
            onClick={onCaptureDocument}
            className="flex flex-col items-center gap-2 rounded-2xl px-4 py-5 focus-ring"
            style={{
              background: 'rgba(175,197,255,0.06)',
              border: '1px solid rgba(175,197,255,0.12)',
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text-1">Scan Document</p>
              <p className="font-body text-xs text-text-muted mt-0.5">Use your camera</p>
            </div>
          </button>

          <button
            onClick={onCaptureDocument}
            className="flex flex-col items-center gap-2 rounded-2xl px-4 py-5 focus-ring"
            style={{
              background: 'rgba(175,197,255,0.06)',
              border: '1px solid rgba(175,197,255,0.12)',
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text-1">Upload File</p>
              <p className="font-body text-xs text-text-muted mt-0.5">From your device</p>
            </div>
          </button>
        </div>

        {/* Filter chips */}
        <div className="px-5 mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className="shrink-0 px-4 py-1.5 rounded-full font-body text-xs font-semibold focus-ring transition-colors"
              style={{
                background: activeFilter === tab ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.06)',
                border: activeFilter === tab ? 'none' : '1px solid rgba(175,197,255,0.12)',
                color: activeFilter === tab ? '#fff' : 'rgba(175,197,255,0.7)',
              }}
            >
              {CATEGORY_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-5 mt-4">
          {filtered.length === 0 ? (
            <div
              className="rounded-2xl px-5 py-8 flex flex-col items-center text-center"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(175,197,255,0.08)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1" />
                </svg>
              </div>
              <p className="font-display text-sm font-semibold text-text-2 mb-2">Your vault is empty</p>
              <p className="font-body text-xs text-text-muted max-w-[220px]">
                Scan or upload invoices, warranties, and receipts to keep them secure.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onSelectDocument?.(doc.id)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left w-full focus-ring"
                  style={{
                    background: 'rgba(175,197,255,0.06)',
                    border: '1px solid rgba(175,197,255,0.12)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${CAT_COLOR[doc.category]}15`, color: CAT_COLOR[doc.category] }}
                  >
                    <CategoryIcon category={doc.category} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-text-1 truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-body text-xs text-text-muted">{formatDate(doc.date)}</span>
                      {doc.sizeKb !== undefined && (
                        <>
                          <span className="text-text-muted opacity-40">·</span>
                          <span className="font-body text-xs text-text-muted">{formatSize(doc.sizeKb)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Security note */}
      <div
        className="mx-5 mb-6 rounded-xl px-4 py-3 flex items-start gap-2"
        style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p className="font-body text-xs text-text-muted leading-relaxed">
          Documents are encrypted and stored securely. Only you can access them.
        </p>
      </div>
    </div>
  )
}
