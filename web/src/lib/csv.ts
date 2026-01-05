import { Transaction } from '../types'
import Papa from 'papaparse'

export function exportTransactionsCSV(transactions: Transaction[]) {
  const rows = transactions.map((t) => ({ id: t.id, date: t.date, amount: t.amount, type: t.type, category: t.category || '', notes: t.notes || '' }))
  const csv = Papa.unparse(rows)
  if (typeof document === 'undefined') return csv
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export function dedupeImported(rows: Array<Record<string, any>>) {
  const seen = new Set<string>()
  const unique: Transaction[] = []
  const skipped: Transaction[] = []

  rows.forEach((r) => {
    const date = r.date
    const amount = Number(r.amount)
    const notes = (r.notes || '').trim().toLowerCase()
    const key = `${date}|${amount}|${notes}`
    const t: Transaction = { id: r.id || `tx-${Math.random().toString(36).slice(2,9)}`, date, amount, type: r.type || 'expense', category: r.category || '', notes: r.notes || '' }
    if (seen.has(key)) skipped.push(t)
    else {
      seen.add(key)
      unique.push(t)
    }
  })

  return { unique, skipped }
}

export function dedupeTransactions(existing: Transaction[], incoming: Transaction[]) {
  const existingSet = new Set(existing.map((e) => `${e.date}|${e.amount}|${(e.notes||'').trim().toLowerCase()}`))
  const toAdd: Transaction[] = []
  const skipped: Transaction[] = []
  incoming.forEach((t) => {
    const key = `${t.date}|${t.amount}|${(t.notes||'').trim().toLowerCase()}`
    if (existingSet.has(key)) skipped.push(t)
    else toAdd.push(t)
  })
  return { toAdd, skipped }
}
