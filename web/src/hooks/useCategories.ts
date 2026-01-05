import { useEffect, useState } from 'react'
import storage from '../lib/storage'
import { Category } from '../types'
import { v4 as uuidv4 } from 'uuid'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const s = storage.getAll()
      return s.categories || []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    const s = storage.getAll()
    s.categories = categories
    storage.setAll(s)
  }, [categories])

  function addCategory(name: string, color?: string) {
    const c = { id: uuidv4(), name, color }
    setCategories((s) => [...s, c])
    return c
  }

  function updateCategory(id: string, patch: Partial<Category>) {
    setCategories((s) => s.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  function deleteCategory(id: string) {
    setCategories((s) => s.filter((c) => c.id !== id))
  }

  return { categories, addCategory, updateCategory, deleteCategory }
}
