"use client"
import { Transaction } from '../types'
import { useCategories } from '../hooks/useCategories'
import { formatVND } from '../lib/currency'

type Props = {
  items: Transaction[]
  onEdit?: (t: Transaction) => void
  onDelete?: (id: string) => void
}

export default function TransactionList({ items, onEdit, onDelete }: Props) {
  const { categories } = useCategories()
  
  if (!items || items.length === 0) return <div className="p-4 text-sm text-gray-600">No transactions</div>

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName)
    return category?.color
  }

  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t.id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50">
          <div className="flex items-center gap-3">
            {t.category && getCategoryColor(t.category) && (
              <div className="w-1 h-12 rounded" style={{ backgroundColor: getCategoryColor(t.category) }} />
            )}
            <div>
              <div className="font-medium flex items-center gap-2">
                <span>{t.category || 'Uncategorized'}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {t.type}
                </span>
              </div>
              <div className="text-sm text-gray-600">{t.notes}</div>
              <div className="text-xs text-gray-400">{t.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-lg font-semibold ${t.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
              {t.type === 'expense' ? '-' : '+'}{formatVND(t.amount)}
            </div>
            <div className="space-x-2">
              <button onClick={() => onEdit?.(t)} className="px-2 py-1 text-xs bg-yellow-400 rounded hover:bg-yellow-500">Edit</button>
              <button onClick={() => onDelete?.(t.id)} className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
