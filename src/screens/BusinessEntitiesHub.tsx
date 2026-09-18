import { useState } from 'react'

interface BusinessEntity {
  id: string
  name: string
  taxId: string
  description?: string
  totalTagged: number
}

interface BusinessEntitiesHubProps {
  onBack?: () => void
  onAddEntity?: () => void
  onSelectEntity?: (id: string) => void
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="14" width="24" height="18" rx="3" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" />
      <path d="M14 14v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" />
      <line x1="8" y1="22" x2="32" y2="22" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" />
    </svg>
  )
}

function maskTaxId(taxId: string) {
  if (taxId.length <= 4) return taxId
  return '••••' + taxId.slice(-4)
}

export default function BusinessEntitiesHub({ onBack, onAddEntity, onSelectEntity }: BusinessEntitiesHubProps) {
  const [entities] = useState<BusinessEntity[]>([])

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,102,255,0.13) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex items-center justify-between px-5 pt-14 pb-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="rgba(175,197,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-display text-base font-bold text-white">Business Entities</h1>
        <button
          onClick={onAddEntity}
          className="h-9 px-4 rounded-full font-body text-xs font-semibold text-white flex items-center gap-1"
          style={{ background: 'rgba(0,102,255,0.25)', border: '1px solid rgba(0,102,255,0.4)' }}
        >
          <span style={{ fontSize: 15, lineHeight: 1 }}>+</span> Add Entity
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6">
        {entities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 pb-16">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <BriefcaseIcon />
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-white mb-1">No business entities yet</p>
              <p className="font-body text-xs text-center" style={{ color: 'rgba(175,197,255,0.5)', maxWidth: 260, lineHeight: 1.6 }}>
                Add your first entity to separate business and personal transactions.
              </p>
            </div>
            <button
              onClick={onAddEntity}
              className="mt-2 w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white"
              style={{ background: 'var(--gradient-primary, linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%))' }}
            >
              Add Entity
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-2">
            {entities.map(entity => (
              <button
                key={entity.id}
                onClick={() => onSelectEntity?.(entity.id)}
                className="w-full text-left rounded-[--radius-2xl] px-4 py-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
                style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,102,255,0.18)', border: '1px solid rgba(0,102,255,0.3)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="6" width="14" height="10" rx="2" stroke="#3FE7FF" strokeWidth="1.3" />
                    <path d="M6 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="#3FE7FF" strokeWidth="1.3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-semibold text-white truncate">{entity.name}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(175,197,255,0.5)' }}>
                    ID: {maskTaxId(entity.taxId)}
                  </p>
                  <p className="font-body text-xs mt-0.5" style={{ color: '#3FE7FF' }}>
                    ${entity.totalTagged.toFixed(2)} tagged
                  </p>
                </div>
                <ChevronRight />
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative z-10 px-5 py-4 mx-5 mb-8 rounded-[--radius-2xl]"
        style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
      >
        <p className="font-body text-[11px] text-center leading-relaxed" style={{ color: 'rgba(175,197,255,0.4)' }}>
          Business entities are lightweight bookkeeping separation — not a separate account or subscription.
        </p>
      </div>
    </div>
  )
}
