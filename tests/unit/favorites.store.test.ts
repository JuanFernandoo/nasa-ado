import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useFavoritesStore } from '@/features/mars/store/favorites.store'
import { marsPhotoFixtures } from '../mocks/fixtures'

const photo1 = marsPhotoFixtures[0]
const photo2 = marsPhotoFixtures[1]

if (!photo1 || !photo2) {
  throw new Error('Fixtures not found — check marsPhotoFixtures array')
}

describe('useFavoritesStore', () => {
    beforeEach(() => {
        act(() => { useFavoritesStore.getState().clearFavorites() })
    })

    describe('initial state', () => {
        it('starts with an empty favorites list', () => {
            const { result } = renderHook(() => useFavoritesStore())
            expect(result.current.favorites).toHaveLength(0)
        })

        it('isFavorite returns false for any photo initially', () => {
            const { result } = renderHook(() => useFavoritesStore())
            expect(result.current.isFavorite(photo1.id)).toBe(false)
        })
    })

    describe('addFavorite', () => {
        it('adds a photo to favorites', () => {
            const { result } = renderHook(() => useFavoritesStore())

            act(() => { result.current.addFavorite(photo1) })

            expect(result.current.favorites).toHaveLength(1)
            expect(result.current.favorites[0]?.id).toBe(photo1.id)
        })

        it('isFavorite returns true after adding', () => {
            const { result } = renderHook(() => useFavoritesStore())

            act(() => { result.current.addFavorite(photo1) })

            expect(result.current.isFavorite(photo1.id)).toBe(true)
        })

        it('can add multiple different photos', () => {
            const { result } = renderHook(() => useFavoritesStore())

            act(() => { result.current.addFavorite(photo1) })
            act(() => { result.current.addFavorite(photo2) })

            expect(result.current.favorites).toHaveLength(2)
        })
    })

    describe('removeFavorite', () => {
        it('removes a photo from favorites by id', () => {
            const { result } = renderHook(() => useFavoritesStore())

            act(() => { result.current.addFavorite(photo1) })
            act(() => { result.current.addFavorite(photo2) })
            act(() => { result.current.removeFavorite(photo1.id) })

            expect(result.current.favorites).toHaveLength(1)
            expect(result.current.isFavorite(photo1.id)).toBe(false)
            expect(result.current.isFavorite(photo2.id)).toBe(true)
        })

        it('does nothing when removing a non-existent photo', () => {
            const { result } = renderHook(() => useFavoritesStore())

            act(() => { result.current.addFavorite(photo1) })
            act(() => { result.current.removeFavorite(99999) })

            expect(result.current.favorites).toHaveLength(1)
        })
    })

    describe('clearFavorites', () => {
        it('removes all favorites at once', () => {
            const { result } = renderHook(() => useFavoritesStore())

            act(() => { result.current.addFavorite(photo1) })
            act(() => { result.current.addFavorite(photo2) })
            act(() => { result.current.clearFavorites() })

            expect(result.current.favorites).toHaveLength(0)
        })

        it('isFavorite returns false for all after clearing', () => {
            const { result } = renderHook(() => useFavoritesStore())

            act(() => { result.current.addFavorite(photo1) })
            act(() => { result.current.clearFavorites() })

            expect(result.current.isFavorite(photo1.id)).toBe(false)
        })
    })
})