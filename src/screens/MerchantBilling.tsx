import { useState } from 'react'
import { MERCHANT_TIERS, type TierName } from '@/data/merchantTiers'

interface BillingRecord {
  id: string
  date: string
  tier: TierName
  amount: number
  status: 'paid' | 'upcoming'
  invoiceNo: string
}

const BILLING_HISTORY: BillingRecord[] = []

interface MerchantBillingProps {
  onBack?: () => void
  onChangePlan?: () => void
}

export default function MerchantBilling({ onBack, onChangePlan }: MerchantBillingProps) {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloaded, setDownloaded] = useState<string[]>([])

  const currentTierName: TierName = 'Startup'
  const currentTier = MERCHANT_TIERS.find(t => t.name === currentTierName)!
  const nextBilling = ''
  const totalPaid = BILLING_HISTORY.filter(r => r.status === 'paid').reduce((s, r) => s + r.amount, 0)

  const handleDownload = (id: string) => {
    if (downloaded.includes(id)) return
    setDownloading(id)
    setTimeout(() => {
      setDownloading(null)
      setDownloaded(prev => [...prev, id])
    }, 900)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Billing</p>
          <p className="font-body text-[10px] text-text-muted">Subscription &amp; invoice history</p>
        </div>
        <button onClick={onChangePlan}
          className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
          style={{ color: currentTier.color, border: `1px solid ${currentTier.borderColor}`, background: currentTier.bgColor }}>
          Change plan
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Active plan card */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl]"
          style={{
            background: `linear-gradient(135deg, ${currentTier.bgColor} 0%, rgba(0,10,40,0.6) 100%)`,
            border: `1px solid ${currentTier.borderColor}`,
            boxShadow: `0 4px 20px ${currentTier.glowColor}`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: currentTier.color, boxShadow: `0 0 6px ${currentTier.color}` }} />
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider" style={{ color: currentTier.color }}>
              Active
            </p>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-display text-xl font-extrabold text-text">{currentTierName} Plan</p>
              <p className="font-body text-[10px] text-text-muted mt-0.5">{currentTier.apvRange}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-bold" style={{ color: currentTier.color }}>
                ${currentTier.annualPrice.toLocaleString()}/yr
              </p>
              <p className="font-body text-[10px] text-text-muted">≈ ${(currentTier.annualPrice / 12).toFixed(2)}/mo</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[--radius-xl]"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="flex-1">
              <p className="font-body text-[10px] text-text-muted">Platform fee</p>
              <p className="font-body text-xs font-bold text-text">$0 — subscribed</p>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div className="flex-1">
              <p className="font-body text-[10px] text-text-muted">Next billing</p>
              <p className="font-body text-xs font-semibold text-text">{nextBilling}</p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex gap-3">
          {[
            { label: 'Paid this year', value: `$${totalPaid.toLocaleString()}` },
            { label: 'Invoices', value: String(BILLING_HISTORY.filter(r => r.status === 'paid').length) },
            { label: 'Since', value: '' },
          ].map((s, i) => (
            <div key={i} className="flex-1 px-3 py-2.5 rounded-[--radius-xl] text-center"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <p className="font-mono text-sm font-bold text-text">{s.value}</p>
              <p className="font-body text-[9px] text-text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Invoice list */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Invoice history
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {BILLING_HISTORY.map((record, i) => {
              const tier = MERCHANT_TIERS.find(t => t.name === record.tier)!
              const isDownloading = downloading === record.id
              const isDone = downloaded.includes(record.id)
              const isUpcoming = record.status === 'upcoming'
              return (
                <div key={record.id} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < BILLING_HISTORY.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: isUpcoming ? 'rgba(245,183,0,0.08)' : tier.bgColor, border: `1px solid ${isUpcoming ? 'rgba(245,183,0,0.2)' : tier.borderColor}` }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 2h8v12H4V2z" stroke={isUpcoming ? '#F5B700' : tier.color} strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M6 6h4M6 9h3" stroke={isUpcoming ? '#F5B700' : tier.color} strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-body text-xs font-semibold text-text">{record.invoiceNo}</p>
                      {isUpcoming && (
                        <span className="px-1.5 py-0.5 rounded-full font-body text-[9px]"
                          style={{ background: 'rgba(245,183,0,0.1)', color: '#F5B700' }}>Upcoming</span>
                      )}
                    </div>
                    <p className="font-body text-[10px] text-text-muted">{record.date} · <span style={{ color: tier.color }}>{record.tier}</span></p>
                  </div>

                  {/* Amount */}
                  <p className="font-mono text-sm font-bold text-text shrink-0">
                    ${record.amount.toLocaleString()}
                  </p>

                  {/* Download */}
                  {!isUpcoming && (
                    <button
                      onClick={() => handleDownload(record.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-all ml-1"
                      style={{ background: isDone ? 'rgba(34,197,94,0.1)' : 'rgba(175,197,255,0.06)', border: `1px solid ${isDone ? 'rgba(34,197,94,0.2)' : 'rgba(175,197,255,0.1)'}` }}>
                      {isDownloading ? (
                        <div className="w-3 h-3 rounded-full border border-t-transparent animate-spin"
                          style={{ borderColor: 'rgba(175,197,255,0.3)', borderTopColor: 'rgba(175,197,255,0.8)' }} />
                      ) : isDone ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2v7M3 7l3 3 3-3M2 10h8" stroke="rgba(175,197,255,0.5)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Platform fee disclosure */}
        <div className="px-3 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            The 0% platform fee applies to ChangeAIPay's own platform fee only. Third-party processor costs, payment-network fees, refunds, and chargebacks remain separate pass-through costs where applicable.
          </p>
        </div>

        {/* Cancellation info */}
        <div className="px-3 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Cancel before <span className="text-text font-semibold">{nextBilling}</span> to avoid the next charge. Without a subscription, the {currentTier.standardFee}% standard platform fee applies per transaction.
          </p>
        </div>
      </div>
    </div>
  )
}
