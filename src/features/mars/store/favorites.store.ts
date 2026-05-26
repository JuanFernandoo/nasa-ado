import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MarsPhoto } from '../schemas/mars.schema'

interface FavoritesState {
  favorites: MarsPhoto[]
  addFavorite: (photo: MarsPhoto) => void
  removeFavorite: (photoId: number) => void
  isFavorite: (photoId: number) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (photo) => {
        set((state) => ({
          favorites: [...state.favorites, photo],
        }))
      },

      removeFavorite: (photoId) => {
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== photoId),
        }))
      },

      isFavorite: (photoId) => {
        return get().favorites.some((p) => p.id === photoId)
      },

      clearFavorites: () => { set({ favorites: [] }) },
    }),
    {
      name: 'mars-favorites',
    },
  ),
)