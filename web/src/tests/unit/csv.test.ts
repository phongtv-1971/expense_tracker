import { dedupeImported } from '../../lib/csv'

describe('csv dedupe', () => {
  it('removes duplicates by date/amount/notes', () => {
    const rows = [
      { date: '2026-01-01', amount: 10, notes: 'Lunch' },
      { date: '2026-01-01', amount: 10, notes: 'Lunch' },
      { date: '2026-01-02', amount: 5, notes: 'Snack' },
    ]

    const { unique } = dedupeImported(rows as any)
    expect(unique.length).toBe(2)
  })
})
