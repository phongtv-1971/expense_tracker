import { useEffect, useState } from 'react'
import storage from '../lib/storage'
import { Category } from '../types'
import { v4 as uuidv4 } from 'uuid'

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Food & Dining', color: '#ef4444' },
  { id: 'cat-2', name: 'Transportation', color: '#3b82f6' },
  { id: 'cat-3', name: 'Shopping', color: '#8b5cf6' },
  { id: 'cat-4', name: 'Entertainment', color: '#ec4899' },
  { id: 'cat-5', name: 'Bills & Utilities', color: '#f59e0b' },
  { id: 'cat-6', name: 'Healthcare', color: '#10b981' },
  { id: 'cat-7', name: 'Salary', color: '#06b6d4' },
]

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])

  // Load saved categories on client mount only to avoid SSR hydration mismatches
  useEffect(() => {
    try {
      const s = storage.getAll()
      if (s?.categories && s.categories.length) {
        setCategories(s.categories as Category[])
      } else {
        // Seed with mock data on first load
        setCategories(MOCK_CATEGORIES)
        s.categories = MOCK_CATEGORIES
        storage.setAll(s)
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
