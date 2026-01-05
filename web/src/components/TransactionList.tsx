"use client"
import { Transaction } from '../types'

type Props = {
  items: Transaction[]
  onEdit?: (t: Transaction) => void
  onDelete?: (id: string) => void
}

export default function TransactionList({ items, onEdit, onDelete }: Props) {
  if (!items || items.length === 0) return <div className="p-4 text-sm text-gray-600">No transactions</div>

  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t.id} className="p-3 border rounded flex justify-between items-center">
          <div>
            <div className="font-medium">{t.category || '—'} • {t.type}</div>
            <div className="text-sm text-gray-600">{t.date} • {t.amount}</div>
          </div>
          <div className="space-x-2">
            <button onClick={() => onEdit?.(t)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
            <button onClick={() => onDelete?.(t.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
