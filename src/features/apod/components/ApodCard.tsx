import { cn } from "@/shared/utils/cn"
import type { ApodItem } from "../schemas/apod.schema"

interface ApodCardProps {
    item: ApodItem
    onClick: (item: ApodItem) => void
}

export function ApodCard({ item, onClick }: ApodCardProps) {
    const imageUrl = item.media_type === 'video'
        ? (item.thumbnail_url ?? '/placeholder.jpg')
        : item.url

    return (
        <button
            className={cn(
                'group relative w-full overflow-hidden rounded-xl bg-slate-900 text-left',
                'border border-slate-800 transition-all duration-300',
                'hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
            )}
            onClick={() => { onClick(item) }}
            aria-label={`View details for ${item.title}`}
            onKeyDown={(e) => { if (e.key === 'Enter') onClick(item) }}
            tabIndex={0}
        >
            <div className="relative aspect-video overflow-hidden bg-slate-800">
                <img
                    src={imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x225?text=NASA'
                    }}
                />
                {item.media_type === 'video' && (
                    <span
                        className="absolute right-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white"
                        aria-label="Video content"
                    >
                        VIDEO
                    </span>
                )}
            </div>

            <div className="p-4">
                <time
                    dateTime={item.date}
                    className="mb-1 block text-xs text-slate-500"
                >
                    {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
                <h3 className="line-clamp-2 font-semibold text-slate-100 group-hover:text-orange-400 transition-colors">
                    {item.title}
                </h3>
                {item.copyright && (
                    <p className="mt-1 text-xs text-slate-500">© {item.copyright}</p>
                )}
            </div>
        </button>
    )
}
