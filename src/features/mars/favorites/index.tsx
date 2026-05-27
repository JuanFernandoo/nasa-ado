import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../store/favorites.store'
import { MarsPhotoCard } from '../components/MarsPhotoCard'
import { cn } from '@/shared/utils/cn'
import { Star } from 'lucide-react'

export default function FavoritesPage() {
    const { favorites, clearFavorites } = useFavoritesStore()

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Mis Favoritos</h1>
                    <p className="mt-2 text-slate-400">
                        {favorites.length === 0
                            ? 'Aún no tienes favoritos'
                            : `${String(favorites.length)} fotos guardadas`}
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
                        Limpiar todo
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                    <Star className="h-12 w-12 text-slate-600" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-slate-300">Aún no tienes favoritos</h3>
                    <p className="text-sm text-slate-500">
                        Ve al Rover de marte y guarda algunas fotos.
                    </p>
                    <Link
                        to="/mars"
                        className="mt-2 rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover"
                    >
                        Explora marte
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