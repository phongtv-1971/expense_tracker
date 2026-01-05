import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    include: ['src/**/*.test.{ts,tsx,js,jsx}', 'test/**/*.test.{ts,tsx,js,jsx}'],
    exclude: ['tests/e2e/**', 'node_modules/**']
  }
})
