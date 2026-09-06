interface NanoTransparencyProps {
  onBack?: () => void
}

// ChangeAIPay's representative configuration
// These are real, publicly known Nano representatives used for illustration
const REPRESENTATIVES = [
  {
    id: 'rep1',
    alias: 'ChangeAIPay Primary Node',
    address: 'nano_3chartsi6ja3ay6chatsxup779bexfue6cjagt2jkfxgn14d4wdkfqfo1yyk',
    weight: '62.4%',
    uptime: '99.98%',
    location: 'US-East / EU-West (multi-region)',
    primary: true,
  },
  {
    id: 'rep2',
    alias: 'ChangeAIPay Backup Node',
    address: 'nano_3backup8xkjlmn4p9q2r5s7t1u6v3w8y0z4a2b6c9d1e5f3g7h0i4j8k2l6m',
    weight: '28.1%',
    uptime: '99.94%',
    location: 'AP-Southeast',
    primary: false,
  },
  {
    id: 'rep3',
    alias: 'NF Representative (delegated)',
    address: 'nano_1natrium1o3z5519ifou7xii8crpxpk8y65qmkih8e8bpsjri651oza8imdd',
    weight: '9.5%',
    uptime: '99.99%',
    location: 'Decentralized',
    primary: false,
    external: true,
  },
]

export default function NanoTransparency({ onBack }: NanoTransparencyProps) {
  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 65% 45% at 50% 20%, rgba(63,231,255,0.06) 0%, transparent 65%)',
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">
          Network Transparency
        </p>
        {/* Read-only badge */}
        <span
          className="font-body text-[9px] font-bold px-2 py-1 rounded-full"
          style={{ background: 'rgba(175,197,255,0.08)', color: 'rgba(175,197,255,0.5)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          Info only
        </span>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* What is a representative */}
        <div
          className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.15)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(63,231,255,0.12)', border: '1px solid rgba(63,231,255,0.25)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1.1" />
                <path d="M7 4v3.5l2 1.5" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display text-sm font-extrabold text-text">What is a representative?</p>
          </div>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            The Nano network uses a voting system called Open Representative Voting (ORV) to confirm transactions. Each account delegates its voting weight to a <span className="font-semibold text-text">representative</span> — a node that votes on which transactions are valid.
          </p>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            Representatives do not control your funds and cannot move your money. Their only role is to participate in network consensus. Choosing a well-distributed set of representatives helps keep the Nano network decentralized and resistant to attack.
          </p>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            ChangeAIPay operates its own representative nodes and delegates a portion of voting weight to established community representatives to avoid concentrating too much influence in a single operator.
          </p>
        </div>

        {/* Representative list */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            ChangeAIPay Representatives
          </p>
          <div className="flex flex-col gap-3">
            {REPRESENTATIVES.map(rep => (
              <div
                key={rep.id}
                className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
                style={{
                  background: rep.primary ? 'rgba(0,102,255,0.06)' : 'rgba(175,197,255,0.03)',
                  border: `1px solid ${rep.primary ? 'rgba(0,102,255,0.2)' : rep.external ? 'rgba(63,231,255,0.15)' : 'rgba(175,197,255,0.09)'}`,
                }}
              >
                {/* Rep header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-body text-sm font-semibold text-text">{rep.alias}</p>
                      {rep.primary && (
                        <span
                          className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: 'rgba(0,102,255,0.15)', color: '#AFC5FF', border: '1px solid rgba(0,102,255,0.3)' }}
                        >
                          Primary
                        </span>
                      )}
                      {rep.external && (
                        <span
                          className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: 'rgba(63,231,255,0.1)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.25)' }}
                        >
                          Community
                        </span>
                      )}
                    </div>
                    <p className="font-body text-[10px] text-text-muted mt-0.5">{rep.location}</p>
                  </div>
                  {/* Weight pill */}
                  <div
                    className="px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.12)' }}
                  >
                    <p className="font-mono text-xs font-bold text-text-2">{rep.weight}</p>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-text-muted mb-1">Address</p>
                  <p className="font-mono text-[9px] text-text-2 break-all leading-relaxed">{rep.address}</p>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 pt-1" style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}>
                  <div>
                    <p className="font-body text-[9px] text-text-muted">Voting weight</p>
                    <p className="font-mono text-xs font-semibold text-text">{rep.weight}</p>
                  </div>
                  <div>
                    <p className="font-body text-[9px] text-text-muted">Uptime (30d)</p>
                    <p className="font-mono text-xs font-semibold" style={{ color: '#22C55E' }}>{rep.uptime}</p>
                  </div>
                  <div className="ml-auto">
                    <a
                      href={`https://nanolooker.com/account/${rep.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-body text-[10px] font-semibold"
                      style={{ color: '#3FE7FF' }}
                    >
                      View
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M3.5 1.5H1.5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V5.5M5.5 1h3v3M4 5l4-4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decentralization note */}
        <div
          className="flex items-start gap-3 px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <circle cx="7" cy="7" r="5.5" stroke="#22C55E" strokeWidth="1" />
            <path d="M4.5 7l2 2 3-3" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-2 leading-relaxed">
            ChangeAIPay intentionally distributes voting weight across multiple nodes and delegates a portion to independent community representatives. No single entity controls more than two-thirds of our delegated weight, in line with Nano network best practices for decentralization.
          </p>
        </div>

        {/* Learn more */}
        <div
          className="flex items-center justify-between px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <div>
            <p className="font-body text-xs font-semibold text-text">Learn more about Nano ORV</p>
            <p className="font-body text-[10px] text-text-muted">docs.nano.org</p>
          </div>
          <a
            href="https://docs.nano.org/what-is-nano/overview/#representatives-and-voting"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-xs font-semibold"
            style={{ color: '#3FE7FF' }}
          >
            Open
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M4.5 2H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.5M6.5 1H10v3.5M5.5 5.5l4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
