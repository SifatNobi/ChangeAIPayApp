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

export const TRANSACTIONS: Transaction[] = [
  { id: 't1',  type: 'sent',       merchant: 'Alex Johnson',    counterpartyHandle: '@alexj',      category: 'Transfer',      amount: '$50.00',   amountNum: 50,   positive: false, status: 'completed', date: 'Today',         time: '10:42 AM', dateGroup: 'Today',    transactionId: 'TXN-2026-0088AF', fee: 'Free',    note: 'Lunch split' },
  { id: 't2',  type: 'received',   merchant: 'Sarah Kim',       counterpartyHandle: '@sarahk',     category: 'Transfer',      amount: '$120.00',  amountNum: 120,  positive: true,  status: 'completed', date: 'Today',         time: '09:14 AM', dateGroup: 'Today',    transactionId: 'TXN-2026-0088AE' },
  { id: 't3',  type: 'sent',       merchant: 'Netflix',         category: 'Subscriptions',         amount: '$15.99',  amountNum: 15.99, positive: false, status: 'completed', date: 'Yesterday',     time: '08:00 AM', dateGroup: 'Yesterday', transactionId: 'TXN-2026-0088AA', fee: '$0.00',   note: 'Monthly plan' },
  { id: 't4',  type: 'topup',      merchant: 'Chase Checking',  category: 'Add Money',             amount: '$200.00',  amountNum: 200,  positive: true,  status: 'completed', date: 'Yesterday',     time: '02:30 PM', dateGroup: 'Yesterday', transactionId: 'TXN-2026-0088A9' },
  { id: 't5',  type: 'sent',       merchant: 'Marcus Webb',     counterpartyHandle: '@marcuswebb', category: 'Transfer',      amount: '$35.00',  amountNum: 35,   positive: false, status: 'pending',   date: 'Yesterday',     time: '11:55 AM', dateGroup: 'Yesterday', transactionId: 'TXN-2026-0088A8' },
  { id: 't6',  type: 'refund',     merchant: 'Coffee & Co',     category: 'Refund',                amount: '$24.50',  amountNum: 24.50, positive: true,  status: 'completed', date: 'Aug 28',        time: '03:22 PM', dateGroup: 'Aug 28',   transactionId: 'TXN-2026-0088A2' },
  { id: 't7',  type: 'sent',       merchant: 'Spotify',         category: 'Subscriptions',         amount: '$9.99',   amountNum: 9.99,  positive: false, status: 'completed', date: 'Aug 28',        time: '08:00 AM', dateGroup: 'Aug 28',   transactionId: 'TXN-2026-0088A1', fee: '$0.00' },
  { id: 't8',  type: 'received',   merchant: 'Jamie Lee',       counterpartyHandle: '@jamielee',   category: 'Transfer',      amount: '$60.00',  amountNum: 60,   positive: true,  status: 'completed', date: 'Aug 27',        time: '06:10 PM', dateGroup: 'Aug 27',   transactionId: 'TXN-2026-0088A0', note: 'Rent share' },
  { id: 't9',  type: 'withdrawal', merchant: 'Chase Checking',  category: 'Withdrawal',            amount: '$100.00',  amountNum: 100,  positive: false, status: 'completed', date: 'Aug 27',        time: '12:00 PM', dateGroup: 'Aug 27',   transactionId: 'TXN-2026-008899' },
  { id: 't10', type: 'sent',       merchant: 'Raj Patel',       counterpartyHandle: '@rajp',       category: 'Transfer',      amount: '$18.00',  amountNum: 18,   positive: false, status: 'failed',    date: 'Aug 26',        time: '07:42 PM', dateGroup: 'Aug 26',   transactionId: 'TXN-2026-008890' },
  { id: 't11', type: 'received',   merchant: 'Nina Chen',       counterpartyHandle: '@ninac',      category: 'Transfer',      amount: '$75.00',  amountNum: 75,   positive: true,  status: 'completed', date: 'Aug 26',        time: '11:30 AM', dateGroup: 'Aug 26',   transactionId: 'TXN-2026-00888F' },
  { id: 't12', type: 'topup',      merchant: 'Chase Checking',  category: 'Add Money',             amount: '$300.00',  amountNum: 300,  positive: true,  status: 'completed', date: 'Aug 25',        time: '09:00 AM', dateGroup: 'Aug 25',   transactionId: 'TXN-2026-008880' },
]

export const TX_CATEGORIES = ['All', 'Transfer', 'Subscriptions', 'Add Money', 'Withdrawal', 'Refund']
