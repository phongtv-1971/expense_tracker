import { Transaction } from '../types'
import { parseISO, format, startOfWeek, endOfWeek } from 'date-fns'

export function groupByMonth(transactions: Transaction[]) {
  const map: Record<string, Transaction[]> = {}
  transactions.forEach((t) => {
    const key = t.date.slice(0, 7) // YYYY-MM
    map[key] = map[key] || []
    map[key].push(t)
  })
  return map
}

export function sum(transactions: Transaction[]) {
  return transactions.reduce((s, t) => s + t.amount * (t.type === 'expense' ? -1 : 1), 0)
}
