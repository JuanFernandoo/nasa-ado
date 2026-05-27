import { Earth } from 'lucide-react'
import type { EpicImage } from '../schemas/epic.schema'
import { EpicCard } from './EpicCard'

interface EpicGalleryProps {
    images: EpicImage[]
}

export function EpicGallery({ images }: EpicGalleryProps) {
    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <Earth className="h-12 w-12 text-slate-600" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-slate-300">No se encontraron imagenes</h3>
                <p className="text-sm text-slate-500">
                    Trata con otra fecha, Las imágenes EPIC están disponibles desde junio de 2015
                </p>
            </div>
        )
    }

    return (
        <section aria-label={`${String(images.length)} imágenes EPIC de la Tierra`}>
            <p className="mb-4 text-sm text-slate-500">
                Mostrando{' '}
                <span className="font-medium text-slate-300">{String(images.length)}</span>{' '}
                imagenes
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                    <EpicCard key={image.identifier} image={image} />
                ))}
            </div>
        </section>
    )
}