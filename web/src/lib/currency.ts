export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export function formatVNDCompact(amount: number): string {
  // For large numbers, show in millions (triệu)
  if (Math.abs(amount) >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M ₫`
  }
  // For thousands, show in K
  if (Math.abs(amount) >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}K ₫`
  }
  return `${amount.toFixed(0)} ₫`
}
