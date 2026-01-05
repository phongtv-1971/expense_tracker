"use client"
import Papa from 'papaparse'
import { useState } from 'react'
import { Transaction } from '../types'
import { useTransactions } from '../hooks/useTransactions'

function dedupe(existing: Transaction[], incoming: Transaction[]) {
  const existingSet = new Set(existing.map((e) => `${e.date}|${e.amount}|${(e.notes||'').trim().toLowerCase()}`))
  const toAdd: Transaction[] = []
  const skipped: Transaction[] = []
  incoming.forEach((t) => {
    const key = `${t.date}|${t.amount}|${(t.notes||'').trim().toLowerCase()}`
    if (existingSet.has(key)) skipped.push(t)
    else toAdd.push(t)
  })
  return { toAdd, skipped }
}

export default function ImportDialog() {
  const { transactions, addTransaction } = useTransactions()
  const [preview, setPreview] = useState<Transaction[] | null>(null)
  const [report, setReport] = useState<{ added: number; skipped: number } | null>(null)

  function handleFile(f: File | null) {
    if (!f) return
    Papa.parse(f, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[]
        const incoming: Transaction[] = rows.map((r) => ({ id: r.id || '', date: r.date, amount: Number(r.amount), type: r.type, category: r.category, notes: r.notes }))
        setPreview(incoming)
      }
    })
  }

  function handleImport() {
    if (!preview) return
    const { toAdd, skipped } = dedupe(transactions, preview)
    toAdd.forEach((t) => addTransaction({ date: t.date, amount: t.amount, type: t.type as any, category: t.category, notes: t.notes }))
    setReport({ added: toAdd.length, skipped: skipped.length })
    setPreview(null)
  }

  return (
    <div className="p-3 border rounded">
      <h3 className="font-medium mb-2">Import CSV</h3>
      <input type="file" accept="text/csv" onChange={(e) => handleFile(e.target.files?.[0] || null)} className="mb-2" />
      {preview && (
        <div className="mb-2">
          <div className="text-sm">Preview: {preview.length} rows</div>
          <button onClick={handleImport} className="px-3 py-2 bg-green-600 text-white rounded mt-2">Import</button>
        </div>
      )}
      {report && <div className="text-sm">Imported: {report.added}, Skipped (duplicates): {report.skipped}</div>}
    </div>
  )
}
