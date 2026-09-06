import { useState } from 'react'

interface CryptoWalletAddressProps {
  symbol?: string
  name?: string
  color?: string
  onDeposit?: () => void
  onBack?: () => void
}

const WALLET_ADDRESSES: Record<string, { address: string; networks: string[] }> = {
  BTC: { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', networks: ['Bitcoin (BTC)', 'Lightning'] },
  ETH: { address: '0x742d35Cc6634C0532925a3b8D4d90b1f5c3A1234', networks: ['Ethereum (ERC-20)', 'Base', 'Arbitrum'] },
  SOL: { address: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV',  networks: ['Solana'] },
}

// Deterministic 9×9 QR-style grid from string seed
function seedCell(seed: string, i: number): boolean {
  let h = 0
  for (let c = 0; c < seed.length; c++) h = (Math.imul(31, h) + seed.charCodeAt(c)) | 0
  return (((h * 31 + i * 17) ^ (i * 7 + 13)) % 3) !== 0
}

function MiniQR({ seed, size = 108 }: { seed: string; size?: number }) {
  const n = 9, cell = size / n
  const cells: boolean[][] = Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => {
      // Corner finder patterns (3×3 filled squares)
      const inCorner = (r < 3 && c < 3) || (r < 3 && c >= 6) || (r >= 6 && c < 3)
      if (inCorner) return true
      return seedCell(seed, r * n + c)
    })
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {cells.map((row, r) =>
        row.map((filled, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * cell + 1}
            y={r * cell + 1}
            width={cell - 2}
            height={cell - 2}
            rx="1"
            fill={filled ? 'rgba(175,197,255,0.85)' : 'transparent'}
          />
        ))
      )}
    </svg>
  )
}

export default function CryptoWalletAddress({
  symbol = 'ETH',
  name = 'Ethereum',
  color = '#627EEA',
  onDeposit,
  onBack,
}: CryptoWalletAddressProps) {
  const data = WALLET_ADDRESSES[symbol] ?? WALLET_ADDRESSES.ETH
  const [selectedNetwork, setSelectedNetwork] = useState(data.networks[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shortAddr = `${data.address.slice(0, 10)}…${data.address.slice(-8)}`

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">{symbol} Address</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Network selector */}
        {data.networks.length > 1 && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Network</p>
            <div className="flex flex-col gap-2">
              {data.networks.map(net => (
                <button
                  key={net}
                  onClick={() => setSelectedNetwork(net)}
                  className="flex items-center gap-3 h-12 px-4 rounded-[--radius-xl] transition-all duration-[180ms]"
                  style={{
                    background: selectedNetwork === net ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)',
                    border: `1px solid ${selectedNetwork === net ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: selectedNetwork === net ? '#0066FF' : 'rgba(175,197,255,0.3)' }}
                  >
                    {selectedNetwork === net && <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                  </div>
                  <p className="font-body text-sm font-semibold text-text flex-1 text-left">{net}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QR card */}
        <div
          className="rounded-[--radius-2xl] flex flex-col items-center gap-4 px-6 py-6"
          style={{ background: 'linear-gradient(160deg, rgba(0,30,80,0.92) 0%, rgba(5,11,45,0.98) 100%)', border: '1px solid rgba(0,102,255,0.2)', boxShadow: '0 0 40px rgba(0,102,255,0.07)' }}
        >
          {/* Asset label */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-display text-xs font-extrabold"
              style={{ background: color + '20', border: `1px solid ${color}40`, color }}
            >
              {symbol.slice(0, 1)}
            </div>
            <p className="font-body text-sm font-semibold text-text">{name} · {selectedNetwork.split(' ')[0]}</p>
          </div>

          {/* QR */}
          <div
            className="rounded-[--radius-xl] p-3"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            <MiniQR seed={`${symbol}-${selectedNetwork}-${data.address}`} size={120} />
          </div>

          {/* Address */}
          <div className="w-full flex flex-col items-center gap-1">
            <p className="font-mono text-[11px] text-text-muted text-center break-all leading-relaxed px-2">
              {data.address}
            </p>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 h-11 px-5 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all duration-[200ms] active:scale-[0.97]"
            style={{
              background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(175,197,255,0.08)',
              border: `1px solid ${copied ? 'rgba(34,197,94,0.35)' : 'rgba(175,197,255,0.18)'}`,
              color: copied ? '#22C55E' : '#AFC5FF',
            }}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="#AFC5FF" strokeWidth="1.2" />
                  <path d="M2 10V3a1 1 0 0 1 1-1h7" stroke="#AFC5FF" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Copy Address
              </>
            )}
          </button>
        </div>

        {/* Safety notice */}
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)' }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5 shrink-0">
            <path d="M7.5 1L14 13H1L7.5 1Z" stroke="#FF4D5A" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M7.5 6v3M7.5 10.5v.5" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold text-[#FF4D5A] mb-1">Send only {symbol} on {selectedNetwork.split(' ')[0]}</p>
            <p className="font-body text-[10px] text-text-muted leading-relaxed">
              Only send {symbol} to this address on the <strong className="text-text-2">{selectedNetwork}</strong> network. Sending other assets or using the wrong network will result in permanent loss of funds.
            </p>
          </div>
        </div>

        {/* Deposit instructions button */}
        <button
          onClick={onDeposit}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v7M4.5 6.5L7 9l2.5-2.5M2 12h10" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          View Deposit Instructions
        </button>
      </div>
    </div>
  )
}
