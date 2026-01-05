export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  date: string // ISO date YYYY-MM-DD
  amount: number
  type: TransactionType
  category?: string
  notes?: string
}

export interface Category {
  id: string
  name: string
  color?: string
}

export interface UserSettings {
  currency?: string
  startOfWeek?: number
  timezone?: string
}
