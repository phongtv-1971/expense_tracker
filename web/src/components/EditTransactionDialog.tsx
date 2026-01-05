"use client"
import React from 'react'
import { Transaction } from '../types'
import TransactionForm from './TransactionForm'

type Props = {
  transaction: Transaction
  onSave: (id: string, updated: Omit<Transaction, 'id'>) => void
  onCancel: () => void
}

export default function EditTransactionDialog({ transaction, onSave, onCancel }: Props) {
  function handleSave(t: Omit<Transaction, 'id'>) {
    onSave(transaction.id, t)
    onCancel()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
        <TransactionForm 
          initial={transaction} 
          onSave={handleSave} 
          onCancel={onCancel}
        />
      </div>
    </div>
  )
}
