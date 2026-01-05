import { Transaction } from '../types'
import Papa from 'papaparse'

export function exportTransactionsCSV(transactions: Transaction[]) {
  const rows = transactions.map((t) => ({ id: t.id, date: t.date, amount: t.amount, type: t.type, category: t.category || '', notes: t.notes || '' }))
  const csv = Papa.unparse(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}
