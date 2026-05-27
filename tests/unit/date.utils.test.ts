import { daysAgo, toDateString } from '@/shared/utils/date.utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('toDateString', () => {
    it('formats a date to YYYY-MM-DD', () => {
        const date = new Date('2024-03-15T10:30:00.000Z')
        expect(toDateString(date)).toBe('2024-03-15')
    })

    it('strips time portion from the result', () => {
        const date = new Date('2024-12-31T23:59:59.999Z')
        const result = toDateString(date)

        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(result).not.toContain('T')
        expect(result).not.toContain(':')
    })

    it('handles first day of year correctly', () => {
        const date = new Date('2024-01-01T00:00:00.000Z')
        expect(toDateString(date)).toBe('2024-01-01')
    })
})

describe('daysAgo', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns today when days is 0', () => {
        expect(daysAgo(0)).toBe('2024-06-15')
    })

    it('returns correct date 7 days ago', () => {
        expect(daysAgo(7)).toBe('2024-06-08')
    })

    it('returns correct date 30 days ago', () => {
        expect(daysAgo(30)).toBe('2024-05-16')
    })

    it('result is always before today', () => {
        const today = toDateString(new Date())
        const result = daysAgo(1)
        expect(result < today).toBe(true)
    })

    it('returns a valid YYYY-MM-DD formatted string', () => {
        expect(daysAgo(14)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
})