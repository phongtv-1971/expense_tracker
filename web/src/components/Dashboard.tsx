"use client"
import React, { useMemo, useState } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { groupByMonth, sum } from '../lib/date'

export default function Dashboard() {
  const { transactions } = useTransactions()
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setView('day')} className={`px-3 py-1 rounded ${view==='day'? 'bg-blue-600 text-white' : 'border'}`}>Day</button>
        <button onClick={() => setView('week')} className={`px-3 py-1 rounded ${view==='week'? 'bg-blue-600 text-white' : 'border'}`}>Week</button>
        <button onClick={() => setView('month')} className={`px-3 py-1 rounded ${view==='month'? 'bg-blue-600 text-white' : 'border'}`}>Month</button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium">Total ({view})</h3>
        <div className={`text-2xl font-semibold ${total < 0 ? 'text-red-500' : 'text-green-600'}`}>{total.toFixed(2)}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-2">By Month</h3>
        <ul className="text-sm">
          {Object.keys(byMonth).sort().map((m) => (
            <li key={m} className="flex justify-between">
              <span>{m}</span>
              <span>{sum(byMonth[m]).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-2">Category Breakdown</h3>
        <ul>
          {Object.entries(categoryTotals).map(([k,v]) => (
            <li key={k} className="flex justify-between text-sm">
              <span>{k}</span>
              <span>{v.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
