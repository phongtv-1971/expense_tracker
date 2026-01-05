"use client"
import React from 'react'
import { Transaction } from '../types'
import { exportTransactionsCSV } from '../lib/csv'

export default function ExportButton({ transactions }: { transactions: Transaction[] }) {
  function handleExport() {
    exportTransactionsCSV(transactions)
  }

  return <button onClick={handleExport} className="px-3 py-2 bg-gray-800 text-white rounded">Export CSV</button>
}
