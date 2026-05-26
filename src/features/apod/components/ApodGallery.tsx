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
                <span className="text-5xl" aria-hidden="true">🔭</span>
                <h3 className="text-lg font-semibold text-slate-300">No pictures found</h3>
                <p className="text-sm text-slate-500">Try adjusting the date range or search terms.</p>
            </div>
        )
    }

    return (
        <section aria-label={`${String(items.length)} astronomy pictures`}>
            <p className="mb-4 text-sm text-slate-500">
                Showing <span className="font-medium text-slate-300">{items.length}</span> pictures
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <ApodCard key={item.date} item={item} onClick={onSelectItem} />
                ))}
            </div>
        </section>
    )
}