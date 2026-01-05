import { renderHook, act } from '@testing-library/react'
import { useTransactions } from '../../hooks/useTransactions'

describe('useTransactions', () => {
  it('adds, updates, and deletes transactions', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ date: '2026-01-01', amount: 10, type: 'expense', category: 'food', notes: '' })
    })

    expect(result.current.transactions.length).toBeGreaterThanOrEqual(1)
    const tx = result.current.transactions[0]

    act(() => {
      result.current.updateTransaction(tx.id, { notes: 'updated' })
    })

    expect(result.current.transactions[0].notes).toBe('updated')

    act(() => {
      result.current.deleteTransaction(tx.id)
    })

    expect(result.current.transactions.find(t => t.id === tx.id)).toBeUndefined()
  })
})
