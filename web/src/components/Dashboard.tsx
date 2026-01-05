"use client"
import React, { useMemo, useState } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'
import { groupByMonth, sum } from '../lib/date'
import { formatVND } from '../lib/currency'

export default function Dashboard() {
  const { transactions } = useTransactions()
  const { categories } = useCategories()
  const [view, setView] = useState<'day'|'week'|'month'>('month')

  const total = useMemo(() => sum(transactions), [transactions])
  const byMonth = useMemo(() => groupByMonth(transactions), [transactions])

  const categoryTotals = useMemo(() => {
    const m: Record<string, number> = {}
    transactions.forEach((t) => {
      const k = t.category || 'Uncategorized'
      m[k] = (m[k] || 0) + (t.type === 'expense' ? -t.amount : t.amount)
    })
    return m
  }, [transactions])

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName)
    return category?.color || '#6b7280'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setView('day')} className={`px-3 py-1 rounded ${view==='day'? 'bg-blue-600 text-white' : 'border'}`}>Day</button>
        <button onClick={() => setView('week')} className={`px-3 py-1 rounded ${view==='week'? 'bg-blue-600 text-white' : 'border'}`}>Week</button>
        <button onClick={() => setView('month')} className={`px-3 py-1 rounded ${view==='month'? 'bg-blue-600 text-white' : 'border'}`}>Month</button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium">Total ({view})</h3>
        <div className={`text-2xl font-semibold ${total < 0 ? 'text-red-500' : 'text-green-600'}`}>{formatVND(total)}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-2">By Month</h3>
        <ul className="text-sm">
          {Object.keys(byMonth).sort().reverse().map((m) => (
            <li key={m} className="flex justify-between py-1">
              <span>{m}</span>
              <span className={`font-semibold ${sum(byMonth[m]) < 0 ? 'text-red-500' : 'text-green-600'}`}>{formatVND(sum(byMonth[m]))}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-2">Category Breakdown</h3>
        <ul className="space-y-2">
          {Object.entries(categoryTotals).map(([k,v]) => (
            <li key={k} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(k) }} />
                <span>{k}</span>
              </div>
              <span className={`font-semibold ${v < 0 ? 'text-red-500' : 'text-green-600'}`}>{formatVND(v)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
