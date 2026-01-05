import { useEffect, useState } from 'react'
import { Transaction } from '../types'
import storage from '../lib/storage'
import { v4 as uuidv4 } from 'uuid'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Load saved transactions on client mount only to avoid SSR hydration mismatches
  useEffect(() => {
    try {
      const s = storage.getAll()
      if (s?.transactions && s.transactions.length) {
        setTransactions(s.transactions as Transaction[])
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
