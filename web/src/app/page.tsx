"use client"
import { useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'
import { formatVND } from '../lib/currency'
import Link from 'next/link'

export default function Home() {
  const { transactions } = useTransactions()
  const { categories } = useCategories()

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const balance = income - expense
    return { income, expense, balance }
  }, [transactions])

  const categoryData = useMemo(() => {
    const m: Record<string, { amount: number; color: string }> = {}
    transactions.filter(t => t.type === 'expense').forEach((t) => {
      const k = t.category || 'Uncategorized'
      const cat = categories.find(c => c.name === k)
      if (!m[k]) m[k] = { amount: 0, color: cat?.color || '#6b7280' }
      m[k].amount += t.amount
    })
    return Object.entries(m).sort((a, b) => b[1].amount - a[1].amount).slice(0, 5)
  }, [transactions, categories])

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5)
  }, [transactions])

  const maxExpense = categoryData.length > 0 ? Math.max(...categoryData.map(([_, d]) => d.amount)) : 1

  return (
    <main className="p-4 max-w-screen-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
        <p className="text-gray-600">Personal, static, mobile-first expense tracker</p>
      </div>

      {/* Main Balance Display */}
      <div className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="text-sm uppercase tracking-wide opacity-90 mb-2">Current Balance</div>
          <div className="text-5xl md:text-6xl font-bold mb-4">{formatVND(stats.balance)}</div>
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <div className="opacity-75">Income</div>
              <div className="font-semibold text-lg">+{formatVND(stats.income)}</div>
            </div>
            <div className="border-l border-white/30"></div>
            <div>
              <div className="opacity-75">Expenses</div>
              <div className="font-semibold text-lg">-{formatVND(stats.expense)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow">
          <div className="text-sm opacity-90 mb-1">Balance</div>
          <div className="text-3xl font-bold">{formatVND(stats.balance)}</div>
          <div className="text-xs opacity-75 mt-2">{transactions.length} transactions</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-lg shadow">
          <div className="text-sm opacity-90 mb-1">Income</div>
          <div className="text-3xl font-bold">+{formatVND(stats.income)}</div>
          <div className="text-xs opacity-75 mt-2">{transactions.filter(t => t.type === 'income').length} entries</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-5 rounded-lg shadow">
          <div className="text-sm opacity-90 mb-1">Expenses</div>
          <div className="text-3xl font-bold">-{formatVND(stats.expense)}</div>
          <div className="text-xs opacity-75 mt-2">{transactions.filter(t => t.type === 'expense').length} entries</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Categories Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Expense Categories</h2>
          {categoryData.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-8">No expense data yet</div>
          ) : (
            <div className="space-y-3">
              {categoryData.map(([name, data]) => (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                      <span className="font-medium">{name}</span>
                    </div>
                    <span className="text-gray-600">{formatVND(data.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        backgroundColor: data.color,
                        width: `${(data.amount / maxExpense) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Link href="/transactions" className="text-sm text-blue-600 hover:underline">View all</Link>
          </div>
          {recentTransactions.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-8">No transactions yet</div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((t) => {
                const cat = categories.find(c => c.name === t.category)
                return (
                  <div key={t.id} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: cat?.color ? `${cat.color}20` : '#f3f4f6' }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.color || '#6b7280' }} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{t.category || 'Uncategorized'}</div>
                        <div className="text-xs text-gray-500">{t.date}</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${t.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                      {t.type === 'expense' ? '-' : '+'}{formatVND(t.amount)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/transactions" className="block p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow text-center font-semibold transition-colors">
          Manage Transactions
        </Link>
        <Link href="/dashboard" className="block p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow text-center font-semibold transition-colors">
          View Dashboard
        </Link>
      </div>
    </main>
  )
}
