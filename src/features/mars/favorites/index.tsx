import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../store/favorites.store'
import { MarsPhotoCard } from '../components/MarsPhotoCard'
import { cn } from '@/shared/utils/cn'

export default function FavoritesPage() {
    const { favorites, clearFavorites } = useFavoritesStore()

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Favorites</h1>
                    <p className="mt-2 text-slate-400">
                        {favorites.length === 0
                            ? 'No favorites yet.'
                            : `${String(favorites.length)} saved photos.`}
                    </p>
                </div>

                {favorites.length > 0 && (
                    <button
                        onClick={() => { clearFavorites() }}
                        className={cn(
                            'rounded-lg border border-red-500/30 px-4 py-2 text-sm',
                            'text-red-400 transition-colors hover:bg-red-500/10',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
                        )}
                    >
                        Clear all
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                    <span className="text-5xl" aria-hidden="true">⭐</span>
                    <h3 className="text-lg font-semibold text-slate-300">No favorites yet</h3>
                    <p className="text-sm text-slate-500">
                        Go to Mars Rover and save some photos.
                    </p>
                    <Link
                        to="/mars"
                        className="mt-2 rounded-lg bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                        Explore Mars
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {favorites.map((photo) => (
                        <MarsPhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            )}
        </div>
    )
}