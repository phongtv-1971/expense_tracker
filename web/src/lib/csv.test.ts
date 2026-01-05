import { describe, it, expect } from 'vitest'
+import { exportTransactionsCSV } from './csv'
+
+describe('csv export', () => {
+  it('generates CSV string without throwing', () => {
+    const txs = [
+      { id: '1', date: '2026-01-01', amount: 10, type: 'expense', category: 'Food', notes: 'Lunch' }
+    ]
+    // exportTransactionsCSV triggers download; ensure function exists and does not throw
+    expect(() => exportTransactionsCSV(txs as any)).not.toThrow()
+  })
+})
+