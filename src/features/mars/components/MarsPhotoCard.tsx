import { cn } from "@/shared/utils/cn";
import type { MarsPhoto } from "../schemas/mars.schema";
import { useFavoritesStore } from "../store/favorites.store";
import { ImageOff, Star } from "lucide-react";
import { useState } from "react";

interface MarsPhotoCardProps {
    photo: MarsPhoto
}

export function MarsPhotoCard({ photo }: MarsPhotoCardProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()
    const favorited = isFavorite(photo.id)
    const [imgError, setImgError] = useState(false)

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
                {imgError ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-800">
                        <ImageOff className="h-10 w-10 text-slate-600" aria-hidden="true" />
                        <span className="text-xs text-slate-600">Sin imagen</span>
                    </div>
                ) : (
                    <img
                        src={photo.img_src}
                        alt={`Rover ${photo.rover.name} — ${photo.camera.full_name} el ${photo.earth_date}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => { setImgError(true) }}
                    />
                )}

                <button
                    onClick={toggleFavorite}
                    className={cn(
                        'absolute right-2 top-2 rounded-full p-2 transition-all',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                        favorited
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-orange-400',
                    )}
                    aria-label={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    aria-pressed={favorited}
                >
                    <Star className="h-4 w-4" fill={favorited ? 'currentColor' : 'none'} aria-hidden="true" />
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
