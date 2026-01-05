"use client"
import TransactionForm from '../../components/TransactionForm'
import TransactionList from '../../components/TransactionList'
import { useTransactions } from '../../hooks/useTransactions'

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()

  function handleAdd(t: any) {
    addTransaction(t)
  }

  return (
    <main className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Transactions</h1>
      <section className="mb-6">
        <TransactionForm onSubmit={handleAdd} />
      </section>
      <section>
        <TransactionList items={transactions} onDelete={deleteTransaction} onEdit={(t) => updateTransaction(t.id, t)} />
      </section>
    </main>
  )
}
