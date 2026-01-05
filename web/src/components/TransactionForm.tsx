"use client"
import { useState } from 'react'
import { Transaction, TransactionType } from '../types'

type Props = {
  onSubmit: (t: Omit<Transaction, 'id'>) => void
  initial?: Partial<Transaction>
}

export default function TransactionForm({ onSubmit, initial }: Props) {
  const [date, setDate] = useState(initial?.date || '')
  const [amount, setAmount] = useState(initial?.amount?.toString() || '')
  const [type, setType] = useState<TransactionType>(initial?.type || 'expense')
  const [category, setCategory] = useState(initial?.category || '')
  const [notes, setNotes] = useState(initial?.notes || '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const amt = Number(amount)
    if (!date || Number.isNaN(amt)) return
    onSubmit({ date, amount: amt, type, category, notes })
    setDate('')
    setAmount('')
    setCategory('')
    setNotes('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm">Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value as TransactionType)} className="w-full p-2 border rounded">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm">Notes</label>
        <input value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  )
}
