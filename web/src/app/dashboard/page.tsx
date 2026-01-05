"use client"
import { useEffect, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { groupByMonth, sum } from '../../lib/date'
import { exportTransactionsCSV } from '../../lib/csv'
import ImportDialog from '../../components/ImportDialog'

export default function DashboardPage() {
  const { transactions } = useTransactions()
  const [groups, setGroups] = useState<Record<string, any>>({})

  useEffect(() => {
    setGroups(groupByMonth(transactions))
  }, [transactions])

  return (
    <main className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <button onClick={() => exportTransactionsCSV(transactions)} className="px-3 py-2 bg-blue-600 text-white rounded">Export CSV</button>
      </div>
      <div className="mb-4">
        <ImportDialog />
      </div>
      <div className="space-y-3">
        {Object.keys(groups)
          .sort()
          .reverse()
          .map((k) => (
            <div key={k} className="p-3 border rounded">
              <div className="font-medium">{k}</div>
              <div className="text-sm">Total: {sum(groups[k])}</div>
            </div>
          ))}
      </div>
    </main>
  )
}
