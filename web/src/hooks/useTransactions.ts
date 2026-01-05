import { useEffect, useState } from 'react'
import { Transaction } from '../types'
import storage from '../lib/storage'
import { v4 as uuidv4 } from 'uuid'

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', date: '2026-01-05', amount: 150000, type: 'expense', category: 'Food & Dining', notes: 'Lunch at cafe' },
  { id: 'tx-2', date: '2026-01-04', amount: 15000000, type: 'income', category: 'Salary', notes: 'Monthly salary' },
  { id: 'tx-3', date: '2026-01-04', amount: 2500000, type: 'expense', category: 'Shopping', notes: 'New shoes' },
  { id: 'tx-4', date: '2026-01-03', amount: 85000, type: 'expense', category: 'Transportation', notes: 'Taxi to office' },
  { id: 'tx-5', date: '2026-01-03', amount: 450000, type: 'expense', category: 'Bills & Utilities', notes: 'Electricity bill' },
  { id: 'tx-6', date: '2026-01-02', amount: 200000, type: 'expense', category: 'Entertainment', notes: 'Movie tickets' },
  { id: 'tx-7', date: '2026-01-02', amount: 500000, type: 'expense', category: 'Healthcare', notes: 'Doctor visit' },
  { id: 'tx-8', date: '2026-01-01', amount: 180000, type: 'expense', category: 'Food & Dining', notes: 'Dinner with friends' },
]

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Load saved transactions on client mount only to avoid SSR hydration mismatches
  useEffect(() => {
    try {
      const s = storage.getAll()
      if (s?.transactions && s.transactions.length) {
        setTransactions(s.transactions as Transaction[])
      } else {
        // Seed with mock data on first load
        setTransactions(MOCK_TRANSACTIONS)
        s.transactions = MOCK_TRANSACTIONS
        storage.setAll(s)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // Persist transactions to storage when they change (client-side)
  useEffect(() => {
    try {
      const s = storage.getAll()
      s.transactions = transactions
      storage.setAll(s)
    } catch (e) {
      // ignore
    }
  }, [transactions])

  function addTransaction(t: Omit<Transaction, 'id'>) {
    const nt: Transaction = { ...t, id: uuidv4() }
    setTransactions((s) => [nt, ...s])
    return nt
  }

  function updateTransaction(id: string, patch: Partial<Transaction>) {
    setTransactions((s) => s.map((tx) => (tx.id === id ? { ...tx, ...patch } : tx)))
  }

  function deleteTransaction(id: string) {
    setTransactions((s) => s.filter((tx) => tx.id !== id))
  }

  return { transactions, addTransaction, updateTransaction, deleteTransaction, setTransactions }
}
