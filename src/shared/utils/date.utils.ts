export function toDateString(date: Date): string {
  const iso = date.toISOString()
  const parts = iso.split('T')
  return parts[0] ?? iso
}

export function daysAgo(days: number): string {
  return toDateString(new Date(Date.now() - days * 24 * 60 * 60 * 1000))
}

export const today = toDateString(new Date())

export const sevenDaysAgo = daysAgo(7)