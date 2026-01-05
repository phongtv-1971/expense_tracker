import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'
import { useTransactions } from './useTransactions'

describe('useTransactions hook', () => {
  it('adds and deletes transactions', () => {
    const { result } = renderHook(() => useTransactions())
    act(() => {
      result.current.addTransaction({ date: '2026-01-01', amount: 5, type: 'expense' as any })
    })
    expect(result.current.transactions.length).toBeGreaterThan(0)
    const id = result.current.transactions[0].id
    act(() => {
      result.current.deleteTransaction(id)
    })
    expect(result.current.transactions.find((t) => t.id === id)).toBeUndefined()
  })
})
