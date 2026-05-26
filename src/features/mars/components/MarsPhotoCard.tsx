import { cn } from "@/shared/utils/cn";
import type { MarsPhoto } from "../schemas/mars.schema";
import { useFavoritesStore } from "../store/favorites.store";

interface MarsPhotoCardProps {
    photo: MarsPhoto
}

export function MarsPhotoCard({ photo }: MarsPhotoCardProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()
    const favorited = isFavorite(photo.id)

    const toggleFavorite = () => {
        if (favorited) {
            removeFavorite(photo.id)
        } else {
            addFavorite(photo)
        }
    }

    return (
        <article className={cn(
            'group relative overflow-hidden rounded-xl bg-slate-900',
            'border border-slate-800 transition-all duration-300',
            'hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10',
        )}>
            <div className="relative aspect-square overflow-hidden bg-slate-800">
                <img
                    src={photo.img_src}
                    alt={`${photo.rover.name} rover — ${photo.camera.full_name} on ${photo.earth_date}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Mars'
                    }}
                />

                <button
                    onClick={toggleFavorite}
                    className={cn(
                        'absolute right-2 top-2 rounded-full p-2 transition-all',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                        favorited
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-orange-400',
                    )}
                    aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={favorited}
                >
                    <svg className="h-4 w-4" fill={favorited ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>
            </div>

            <div className="p-3">
                <p className="text-xs font-medium text-orange-400">{photo.camera.full_name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                    Sol {String(photo.sol)} · {photo.earth_date}
                </p>
                <p className="mt-0.5 text-xs text-slate-600">ID #{String(photo.id)}</p>
            </div>
        </article>
    )
}
