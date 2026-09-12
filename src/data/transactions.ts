export type TxStatus = 'completed' | 'pending' | 'failed'
export type TxType   = 'sent' | 'received' | 'refund' | 'topup' | 'withdrawal'

export interface Transaction {
  id: string
  type: TxType
  merchant: string
  counterpartyHandle?: string
  category: string
  amount: string
  amountNum: number
  positive: boolean
  status: TxStatus
  date: string
  time: string
  dateGroup: string
  fee?: string
  note?: string
  transactionId: string
}

export const TRANSACTIONS: Transaction[] = []

export const TX_CATEGORIES = ['All', 'Transfer', 'Subscriptions', 'Add Money', 'Withdrawal', 'Refund']
