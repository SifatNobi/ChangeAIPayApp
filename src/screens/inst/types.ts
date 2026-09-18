export type SettlementStatus = "Pending" | "Matched" | "Settled" | "Failed" | "Partial"
export type AssetClass = "Equities" | "Fixed Income" | "FX" | "Digital Assets"
export type SettlementMethod = "Nano Instant" | "Correspondent Bank" | "SWIFT"
export type ExceptionReason =
  | "Insufficient Securities"
  | "Mismatched Instructions"
  | "Counterparty Default Risk"
  | "Late Confirmation"
export type ExceptionSeverity = "Critical" | "High" | "Medium"

export type InstTab = "dashboard" | "overview" | "monitor" | "exceptions" | "history" | "risk"

export interface Trade {
  id: string
  counterparty: string
  asset: string
  assetClass: AssetClass
  quantity: number
  price: number
  value: number
  tradeDate: string
  settlementDate: string
  method: SettlementMethod
  dvp: boolean
  status: SettlementStatus
}

export interface TradeException {
  id: string
  tradeId: string
  counterparty: string
  reason: ExceptionReason
  severity: ExceptionSeverity
  age: string
  assignedTo: string
  status: "Open" | "Escalated" | "Resolved"
}

export interface Counterparty {
  id: string
  name: string
  since: string
  riskRating: "AAA" | "AA" | "A" | "BBB" | "BB"
  failRate: number
  activeTrades: number
  ytdVolume: number
}
