import { useEffect, useState } from 'react'
import { Transaction } from '../types'
import storage from '../lib/storage'
import { v4 as uuidv4 } from 'uuid'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const s = storage.getAll()
      return s.transactions || []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    const s = storage.getAll()
    s.transactions = transactions
    storage.setAll(s)
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
