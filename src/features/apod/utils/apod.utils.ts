function toDateString(date: Date): string {
  const iso = date.toISOString()
  const parts = iso.split('T')
  return parts[0] ?? iso
}

export const today = toDateString(new Date())

export const sevenDaysAgo = toDateString(
  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
)