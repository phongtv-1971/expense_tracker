"use client"
import React, { useState } from 'react'
import { Transaction } from '../types'
import { useCategories } from '../hooks/useCategories'

type Props = {
  initial?: Partial<Transaction>
  onSave: (t: Omit<Transaction, 'id'>) => void
  onCancel?: () => void
}

export default function TransactionForm({ initial = {}, onSave, onCancel }: Props) {
  const { categories } = useCategories()
  const [date, setDate] = useState(initial.date ?? new Date().toISOString().slice(0, 10))
  const [amount, setAmount] = useState<string>(initial.amount != null ? String(initial.amount) : '')
  const [type, setType] = useState<'expense'|'income'>(initial.type ?? 'expense')
  const [category, setCategory] = useState(initial.category ?? '')
  const [notes, setNotes] = useState(initial.notes ?? '')
  const [error, setError] = useState<string | null>(null)

  function validate() {
    if (!date) return 'Date is required'
    if (!amount || Number.isNaN(Number(amount))) return 'Valid amount is required'
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    const payload: Omit<Transaction, 'id'> = {
      date,
      amount: Number(amount),
      type,
      category,
      notes,
    }
    onSave(payload)
    
    // Only reset form if it's a new transaction (no initial data)
    if (!initial || !initial.id) {
      setAmount('')
      setCategory('')
      setNotes('')
      setDate(new Date().toISOString().slice(0, 10))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="grid grid-cols-2 gap-2">
        <input className="h-10 px-3 border rounded" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input className="h-10 px-3 border rounded" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <select className="h-10 px-3 border rounded" value={type} onChange={e => setType(e.target.value as any)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <div className="col-span-2">
          <input list="category-list" className="h-10 px-3 border rounded w-full" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
          <datalist id="category-list">
            {categories.map((c) => <option key={c.id} value={c.name} />)}
          </datalist>
        </div>
      </div>
      <textarea className="w-full p-2 border rounded" rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes (optional)" />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>}
      </div>
    </form>
  )
}
