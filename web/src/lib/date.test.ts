import { describe, it, expect } from 'vitest'
import { groupByMonth, sum } from './date'

describe('date helpers', () => {
  it('groups transactions by YYYY-MM', () => {
    const txs = [
      { id: '1', date: '2026-01-01', amount: 10, type: 'expense' },
      { id: '2', date: '2026-01-15', amount: 5, type: 'income' },
      { id: '3', date: '2026-02-02', amount: 7, type: 'expense' }
    ] as any
    const groups = groupByMonth(txs)
    expect(Object.keys(groups).sort()).toEqual(['2026-01', '2026-02'])
    expect(groups['2026-01'].length).toBe(2)
    expect(groups['2026-02'].length).toBe(1)
  })

  it('sums signed amounts (income positive, expense negative)', () => {
    const txs = [
      { id: '1', date: '2026-01-01', amount: 10, type: 'expense' },
      { id: '2', date: '2026-01-02', amount: 5, type: 'income' }
    ] as any
    const total = sum(txs)
    expect(total).toBe(-5)
  })
})
