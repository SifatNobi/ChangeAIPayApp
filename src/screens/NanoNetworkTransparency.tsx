import AuthHeader from '@/components/AuthHeader'

interface NanoNetworkTransparencyProps {
  onBack?: () => void
}

const REPRESENTATIVES: { label: string; account: string; votingWeight: string; uptime: string; location: string; provider: string; trusted?: boolean }[] = []

export default function NanoNetworkTransparency({ onBack }: NanoNetworkTransparencyProps) {
  return (
    <div className="flex flex-col bg-bg min-h-screen">
      <div className="px-5 pt-4">
        <AuthHeader title="Network Transparency" onBack={onBack} />
      </div>

      <div className="flex-1 px-5 pb-10 flex flex-col gap-6 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

        {/* Header badge */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(63,231,255,0.12)', border: '1px solid rgba(63,231,255,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12V2l10 10V2" stroke="#3FE7FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-body text-xs font-bold" style={{ color: '#3FE7FF' }}>Powered by Nano</span>
          <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider ml-1"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)' }}>
            Live network
          </span>
        </div>

        {/* What is a representative */}
        <div
          className="rounded-[--radius-2xl] px-5 py-5"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.85) 0%, rgba(13,26,74,0.95) 100%)', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#3FE7FF' }}>
            What is a representative?
          </p>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            The Nano network uses a voting system called <strong className="text-text">Open Representative Voting (ORV)</strong> to confirm transactions. Instead of miners or stakers, any node can vote on which transactions are valid. Accounts <em>delegate</em> their voting weight to a representative they trust.
          </p>
          <p className="font-body text-sm text-text-2 leading-relaxed mt-3">
            ChangeAIPay runs its own nodes and delegates to them by default. This is transparent, auditable on-chain, and common practice for services that operate at scale. <strong className="text-text">No single representative controls the network</strong> — consensus requires a supermajority of all voting weight across thousands of independent nodes.
          </p>
          <p className="font-body text-sm text-text-2 leading-relaxed mt-3">
            Why does this matter? A representative with outsized voting weight could theoretically slow confirmation or (in extreme concentration) attempt a fork. Healthy decentralization means no single entity holds enough weight to do this unilaterally. ChangeAIPay's combined weight is well below any threshold of concern.
          </p>
        </div>

        {/* Representatives list */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
            ChangeAIPay delegation — current configuration
          </p>
          <div className="flex flex-col gap-3">
            {REPRESENTATIVES.map(rep => (
              <div
                key={rep.account}
                className="rounded-[--radius-2xl] px-4 py-4"
                style={{
                  background: rep.trusted ? 'rgba(34,197,94,0.04)' : 'rgba(175,197,255,0.03)',
                  border: `1px solid ${rep.trusted ? 'rgba(34,197,94,0.2)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: rep.trusted ? 'rgba(34,197,94,0.1)' : 'rgba(63,231,255,0.08)', border: `1px solid ${rep.trusted ? 'rgba(34,197,94,0.3)' : 'rgba(63,231,255,0.2)'}` }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 10V2l9 9V2" stroke={rep.trusted ? '#22C55E' : '#3FE7FF'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="font-body text-sm font-bold text-text truncate">{rep.label}</p>
                  </div>
                  {rep.trusted && (
                    <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider shrink-0"
                      style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)' }}>
                      Foundation
                    </span>
                  )}
                </div>

                {/* Account address */}
                <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-text-muted mb-1">Account</p>
                <p className="font-mono text-[10px] text-text-2 break-all leading-relaxed mb-3">
                  {rep.account.slice(0, 16)}…{rep.account.slice(-12)}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Voting weight', value: rep.votingWeight },
                    { label: 'Uptime', value: rep.uptime, green: true },
                    { label: 'Location', value: rep.location },
                  ].map(stat => (
                    <div key={stat.label}>
                      <p className="font-body text-[8px] font-semibold uppercase tracking-wider text-text-muted mb-0.5">{stat.label}</p>
                      <p className="font-body text-[10px] font-semibold" style={{ color: stat.green ? '#22C55E' : 'rgba(175,197,255,0.7)' }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network health */}
        <div
          className="rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Nano network health</p>
          {[
            { label: 'Network confirmations per second', value: '~450 CPS', color: '#22C55E' },
            { label: 'Average confirmation time', value: '< 0.5 seconds', color: '#22C55E' },
            { label: 'Transaction fee', value: '$0.00', color: '#22C55E' },
            { label: 'Total voting representatives', value: '> 150 active', color: '#AFC5FF' },
            { label: 'ChangeAIPay combined weight', value: '~0.03%', color: '#AFC5FF' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="font-body text-xs text-text-muted">{item.label}</span>
              <span className="font-mono text-xs font-semibold" style={{ color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* External links */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-[10px] text-text-muted mb-1">Verify independently</p>
          {[
            { label: 'NanoLooker — block explorer', href: 'https://nanolooker.com' },
            { label: 'Nano.org — network status', href: 'https://nano.org' },
            { label: 'Nanocrawler — voting weight stats', href: 'https://nanocrawler.cc' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ color: '#3FE7FF' }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M4.5 2H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M7 1h3v3M10 1L5.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {link.label}
            </a>
          ))}
        </div>

        <p className="font-body text-[10px] text-text-muted leading-relaxed text-center px-4">
          This information is for transparency only. No action is available here. Representative delegation is managed by ChangeAIPay infrastructure and does not affect your funds or account.
        </p>
      </div>
    </div>
  )
}
