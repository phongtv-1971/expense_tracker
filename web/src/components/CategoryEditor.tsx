"use client"
import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'

export default function CategoryEditor() {
  const { categories, addCategory, deleteCategory } = useCategories()
  const [name, setName] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    addCategory(name)
    setName('')
  }

  return (
    <div className="p-3 border rounded">
      <h2 className="font-medium mb-2">Categories</h2>
      <form onSubmit={handleAdd} className="mb-3 w-full">
        <div className="w-full grid items-stretch" style={{ gridTemplateColumns: 'minmax(0,1fr) auto' }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New category"
            className="min-w-0 h-10 px-3 border border-gray-300 border-r-0 rounded-l-md focus:outline-none"
            aria-label="New category"
          />
          <button type="submit" className="h-10 px-4 bg-blue-600 text-white border border-gray-300 rounded-r-md">Add</button>
        </div>
      </form>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {c.color && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />}
              <span>{c.name}</span>
            </div>
            <div>
              <button onClick={() => deleteCategory(c.id)} className="px-2 py-1 text-xs bg-red-400 text-white rounded hover:bg-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
