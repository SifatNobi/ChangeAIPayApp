import { useState } from 'react'

interface CryptoDepositProps {
  symbol?: string
  name?: string
  color?: string
  onBack?: () => void
}

const WALLET_ADDRESSES: Record<string, { address: string; networks: Network[] }> = {
  BTC: { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', networks: [
    { id: 'btc',       label: 'Bitcoin (BTC)',  minDeposit: '0.0001 BTC',  confirmTime: '~10–60 min', confirmations: 3 },
    { id: 'lightning', label: 'Lightning',      minDeposit: '1,000 sats',  confirmTime: 'Instant',    confirmations: 0 },
  ]},
  ETH: { address: '0x742d35Cc6634C0532925a3b8D4d90b1f5c3A1234', networks: [
    { id: 'eth',      label: 'Ethereum (ERC-20)', minDeposit: '0.001 ETH', confirmTime: '~2–5 min',  confirmations: 12 },
    { id: 'base',     label: 'Base',              minDeposit: '0.001 ETH', confirmTime: '~10 sec',   confirmations: 1  },
    { id: 'arb',      label: 'Arbitrum',          minDeposit: '0.001 ETH', confirmTime: '~1–2 min',  confirmations: 1  },
  ]},
  SOL: { address: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV', networks: [
    { id: 'sol', label: 'Solana', minDeposit: '0.01 SOL', confirmTime: '~10 sec', confirmations: 1 },
  ]},
}

interface Network {
  id: string
  label: string
  minDeposit: string
  confirmTime: string
  confirmations: number
}

function seedCell(seed: string, i: number): boolean {
  let h = 0
  for (let c = 0; c < seed.length; c++) h = (Math.imul(31, h) + seed.charCodeAt(c)) | 0
  return (((h * 31 + i * 17) ^ (i * 7 + 13)) % 3) !== 0
}

function MiniQR({ seed, size = 88 }: { seed: string; size?: number }) {
  const n = 9, cell = size / n
  const cells: boolean[][] = Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => {
      const inCorner = (r < 3 && c < 3) || (r < 3 && c >= 6) || (r >= 6 && c < 3)
      if (inCorner) return true
      return seedCell(seed, r * n + c)
    })
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {cells.map((row, r) => row.map((filled, c) => (
        <rect key={`${r}-${c}`} x={c * cell + 0.8} y={r * cell + 0.8} width={cell - 1.6} height={cell - 1.6} rx="0.8"
          fill={filled ? 'rgba(175,197,255,0.8)' : 'transparent'} />
      )))}
    </svg>
  )
}

export default function CryptoDeposit({
  symbol = 'ETH', name = 'Ethereum', color = '#627EEA', onBack,
}: CryptoDepositProps) {
  const data = WALLET_ADDRESSES[symbol] ?? WALLET_ADDRESSES.ETH
  const [selectedNet, setSelectedNet] = useState(data.networks[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Deposit {symbol}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Network selector */}
        {data.networks.length > 1 && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Select Network</p>
            <div className="flex flex-col gap-2">
              {data.networks.map(net => (
                <button
                  key={net.id}
                  onClick={() => setSelectedNet(net)}
                  className="flex items-center gap-3 h-12 px-4 rounded-[--radius-xl] transition-all duration-[180ms]"
                  style={{
                    background: selectedNet.id === net.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)',
                    border: `1px solid ${selectedNet.id === net.id ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                  }}
                >
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: selectedNet.id === net.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}>
                    {selectedNet.id === net.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                  </div>
                  <p className="font-body text-sm font-semibold text-text flex-1 text-left">{net.label}</p>
                  <p className="font-body text-xs text-text-muted">{net.confirmTime}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Address + QR — horizontal layout */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex items-center gap-4"
          style={{ background: 'linear-gradient(160deg, rgba(0,30,80,0.92) 0%, rgba(5,11,45,0.98) 100%)', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          {/* QR */}
          <div className="rounded-[--radius-xl] p-2 shrink-0"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}>
            <MiniQR seed={`${symbol}-${selectedNet.id}-${data.address}`} size={92} />
          </div>
          {/* Address */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">Your {symbol} address</p>
            <p className="font-mono text-[10px] text-text-2 leading-relaxed break-all">{data.address}</p>
            <button
              onClick={handleCopy}
              className="self-start flex items-center gap-1.5 h-8 px-3 rounded-full font-body text-xs font-semibold transition-all duration-[180ms]"
              style={{
                background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(175,197,255,0.07)',
                border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.15)'}`,
                color: copied ? '#22C55E' : '#AFC5FF',
              }}
            >
              {copied
                ? <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2.5 4-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" /></svg> Copied</>
                : <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="#AFC5FF" strokeWidth="1" /><path d="M1 7V2a1 1 0 0 1 1-1h5" stroke="#AFC5FF" strokeWidth="1" strokeLinecap="round" /></svg> Copy</>
              }
            </button>
          </div>
        </div>

        {/* Deposit details */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Deposit Details</p>
          {[
            { label: 'Network',         value: selectedNet.label },
            { label: 'Minimum deposit', value: selectedNet.minDeposit },
            { label: 'Confirmations',   value: selectedNet.confirmations === 0 ? 'None required' : `${selectedNet.confirmations} block${selectedNet.confirmations > 1 ? 's' : ''}` },
            { label: 'Est. arrival',    value: selectedNet.confirmTime },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between">
              <p className="font-body text-xs text-text-muted">{row.label}</p>
              <p className="font-body text-xs font-semibold text-text-2">{row.value}</p>
            </div>
          ))}
        </div>

        {/* External network fee disclosure — explicitly distinct from ChangeAIPay's zero-fee promise */}
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
            <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1.2" />
            <path d="M7 5v3M7 9.5v.5" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold text-[#3FE7FF] mb-1">External network fee applies</p>
            <p className="font-body text-[10px] text-text-muted leading-relaxed">
              ChangeAIPay charges <strong className="text-text-2">no fee</strong> to receive {symbol}. However, the <strong className="text-text-2">{selectedNet.label} network</strong> itself charges a miner/gas fee deducted from the sent amount before it reaches your address. This is set by the blockchain — not ChangeAIPay.
            </p>
          </div>
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
            <p className="font-body text-xs font-semibold text-[#FF4D5A] mb-1">Only send {symbol} on {selectedNet.label.split(' ')[0]}</p>
            <p className="font-body text-[10px] text-text-muted leading-relaxed">
              Sending unsupported assets or using the wrong network will result in permanent, unrecoverable loss of funds.
            </p>
          </div>
        </div>

        {/* Waiting indicator */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'rgba(245,183,0,0.8)', animation: 'pulse 2s ease-in-out infinite' }} />
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Waiting for deposit. This screen stays open — your address is ready whenever you initiate the transfer from your external wallet or exchange.
          </p>
        </div>
      </div>
    </div>
  )
}
