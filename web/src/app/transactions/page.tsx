"use client"
import TransactionForm from '../../components/TransactionForm'
import TransactionList from '../../components/TransactionList'
import CategoryEditor from '../../components/CategoryEditor'
import { useTransactions } from '../../hooks/useTransactions'
import { useCategories } from '../../hooks/useCategories'

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()

  function handleAdd(t: any) {
    addTransaction(t)
  }

  return (
    <main className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Transactions</h1>
      <section className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TransactionForm onSubmit={handleAdd} />
          </div>
          <div>
            <CategoryEditor />
          </div>
        </div>
      </section>
      <section>
        <TransactionList items={transactions} onDelete={deleteTransaction} onEdit={(t) => updateTransaction(t.id, t)} />
      </section>
    </main>
  )
}
