"use client"
import { useEffect, useMemo, useState } from 'react'
import TransactionForm from '../../components/TransactionForm'
import TransactionList from '../../components/TransactionList'
import EditTransactionDialog from '../../components/EditTransactionDialog'
import CategoryEditor from '../../components/CategoryEditor'
import FilterBar from '../../components/FilterBar'
import ExportButton from '../../components/ExportButton'
import ImportDialog from '../../components/ImportDialog'
import { useTransactions } from '../../hooks/useTransactions'
import { useCategories } from '../../hooks/useCategories'
import { formatVND } from '../../lib/currency'
import { Transaction } from '../../types'

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()
  const { categories } = useCategories()
  const [hydrated, setHydrated] = useState(false)
  const [query, setQuery] = useState('')
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    setHydrated(true)
  }, [])

  function handleAdd(t: any) {
    addTransaction(t)
  }

  function handleEdit(t: Transaction) {
    setEditingTransaction(t)
  }

  function handleUpdate(id: string, updated: Omit<Transaction, 'id'>) {
    updateTransaction(id, updated)
    setEditingTransaction(null)
  }

  const total = useMemo(() => transactions.reduce((s, t) => s + (t.type === 'expense' ? -t.amount : t.amount), 0), [transactions])

  return (
    <main className="p-4 max-w-screen-lg mx-auto">
      <div className="mb-6">
        <div className="bg-white shadow-sm rounded-lg p-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Transactions</h1>
            <p className="text-sm text-gray-500">Add, edit, and manage your personal expenses and income.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Balance</div>
            <div className={`text-lg font-semibold ${total < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {hydrated ? formatVND(total) : '—'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-medium mb-2">Add Transaction</h2>
            <TransactionForm onSave={handleAdd} />
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <FilterBar query={query} onQuery={setQuery} />
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-medium mb-2">All Transactions</h2>
            <TransactionList items={transactions.filter(t => (
              !query || (t.notes||'').toLowerCase().includes(query.toLowerCase()) || (t.category||'').toLowerCase().includes(query.toLowerCase())
            ))} onDelete={deleteTransaction} onEdit={handleEdit} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white shadow rounded-lg p-4 sticky top-6">
            <h3 className="text-md font-medium mb-2">Categories ({categories.length})</h3>
            <CategoryEditor />
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <ExportButton transactions={transactions} />
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <ImportDialog />
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-md font-medium mb-2">Quick Stats</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Total transactions: <strong>{transactions.length}</strong></li>
              <li>Categories: <strong>{categories.length}</strong></li>
              <li>Current balance: <strong className={total < 0 ? 'text-red-500' : 'text-green-600'}>{hydrated ? formatVND(total) : '—'}</strong></li>
            </ul>
          </div>
        </aside>
      </div>

      {editingTransaction && (
        <EditTransactionDialog 
          transaction={editingTransaction}
          onSave={handleUpdate}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </main>
  )
}
