const STORAGE_KEY = 'expense_tracker:v1'

export interface StorageShape {
  transactions: any[]
  categories: any[]
  settings: Record<string, any>
}

function readRaw(): StorageShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { transactions: [], categories: [], settings: {} }
    return JSON.parse(raw) as StorageShape
  } catch (e) {
    console.error('storage read error', e)
    return { transactions: [], categories: [], settings: {} }
  }
}

function writeRaw(v: StorageShape) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  } catch (e) {
    console.error('storage write error', e)
  }
}

export const storage = {
  getAll() {
    return readRaw()
  },
  setAll(v: StorageShape) {
    writeRaw(v)
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export default storage
