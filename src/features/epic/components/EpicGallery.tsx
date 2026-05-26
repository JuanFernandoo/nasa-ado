import type { EpicImage } from '../schemas/epic.schema'
import { EpicCard } from './EpicCard'

interface EpicGalleryProps {
    images: EpicImage[]
}

export function EpicGallery({ images }: EpicGalleryProps) {
    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <span className="text-5xl" aria-hidden="true">🌍</span>
                <h3 className="text-lg font-semibold text-slate-300">No images found</h3>
                <p className="text-sm text-slate-500">
                    Try a different date. EPIC images are available from June 2015 onwards.
                </p>
            </div>
        )
    }

    return (
        <section aria-label={`${String(images.length)} EPIC Earth images`}>
            <p className="mb-4 text-sm text-slate-500">
                Showing{' '}
                <span className="font-medium text-slate-300">{String(images.length)}</span>{' '}
                images
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                    <EpicCard key={image.identifier} image={image} />
                ))}
            </div>
        </section>
    )
}