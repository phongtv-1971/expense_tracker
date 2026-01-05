import { useEffect, useState } from 'react'
import storage from '../lib/storage'
import { Category } from '../types'
import { v4 as uuidv4 } from 'uuid'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])

  // Load saved categories on client mount only to avoid SSR hydration mismatches
  useEffect(() => {
    try {
      const s = storage.getAll()
      if (s?.categories && s.categories.length) {
        setCategories(s.categories as Category[])
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // Persist categories to storage when they change (client-side)
  useEffect(() => {
    try {
      const s = storage.getAll()
      s.categories = categories
      storage.setAll(s)
    } catch (e) {
      // ignore
    }
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
