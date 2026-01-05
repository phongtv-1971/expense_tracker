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
      <form onSubmit={handleAdd} className="flex gap-2 mb-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category" className="flex-1 p-2 border rounded" />
        <button className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.id} className="flex justify-between items-center">
            <div>{c.name}</div>
            <div>
              <button onClick={() => deleteCategory(c.id)} className="px-2 py-1 bg-red-400 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
