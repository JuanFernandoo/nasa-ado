import { Telescope } from 'lucide-react'
import type { ApodItem } from '../schemas/apod.schema'
import { ApodCard } from './ApodCard'

interface ApodGalleryProps {
    items: ApodItem[]
    onSelectItem: (item: ApodItem) => void
}

export function ApodGallery({ items, onSelectItem }: ApodGalleryProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <Telescope className="h-12 w-12 text-slate-600" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-slate-300">No se encontraron imagenes</h3>
                <p className="text-sm text-slate-500">Trata de cambiarel rango de fechas o los términos de búsqueda.</p>
            </div>
        )
    }

    return (
        <section aria-label={`${String(items.length)} imagenes de la nasa`}>
            <p className="mb-4 text-sm text-slate-500">
                Mostrando <span className="font-medium text-slate-300">{items.length}</span> imagenes
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <ApodCard key={item.date} item={item} onClick={onSelectItem} />
                ))}
            </div>
        </section>
    )
}