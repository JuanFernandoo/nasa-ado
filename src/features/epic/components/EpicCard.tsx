import { cn } from '@/shared/utils/cn'
import { buildEpicImageUrl } from '../api/epic.api'
import type { EpicImage } from '../schemas/epic.schema'
import { useState } from 'react'

interface EpicCardProps {
    image: EpicImage
}

export function EpicCard({ image }: EpicCardProps) {
    const [imgError, setImgError] = useState(false)
    const imageUrl = buildEpicImageUrl(image)

    const [datePart] = image.date.split(' ')
    const displayDate = datePart ?? image.date

    return (
        <article className={cn(
            'overflow-hidden rounded-xl bg-slate-900',
            'border border-slate-800 transition-all duration-300',
            'hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10',
        )}>
            <div className="relative aspect-square overflow-hidden bg-slate-800">
                {imgError ? (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800">
                        <span className="text-4xl" aria-hidden="true">🌍</span>
                    </div>
                ) : (
                    <img
                        src={imageUrl}
                        alt={`Earth from DSCOVR satellite on ${displayDate}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={() => { setImgError(true) }}
                    />
                )}
            </div>
            <div className="p-4">
                <time dateTime={displayDate} className="block text-xs text-slate-500">
                    {new Date(displayDate + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{image.caption}</p>
                <p className="mt-1 text-xs text-slate-600">
                    Lat {image.centroid_coordinates.lat.toFixed(2)}° ·{' '}
                    Lon {image.centroid_coordinates.lon.toFixed(2)}°
                </p>
            </div>
        </article>
    )
}