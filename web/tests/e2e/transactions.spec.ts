import { test, expect } from '@playwright/test'
+
+test('add transaction flow', async ({ page }) => {
+  await page.goto('http://localhost:3000/transactions')
+  await page.fill('input[type=date]', '2026-01-01')
+  await page.fill('input[type=number]', '12')
+  await page.click('button:has-text("Save")')
+  await expect(page.locator('text=12')).toBeVisible()
+})
+