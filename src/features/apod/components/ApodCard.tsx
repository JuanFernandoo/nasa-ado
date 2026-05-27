import { cn } from "@/shared/utils/cn"
import { PlayCircle } from "lucide-react"
import type { ApodItem } from "../schemas/apod.schema"

interface ApodCardProps {
    item: ApodItem
    onClick: (item: ApodItem) => void
}

function getYoutubeThumbnail(url: string): string | null {
    const match = /youtube\.com\/embed\/([^?]+)/.exec(url) ??
        /youtu\.be\/([^?]+)/.exec(url)
    return match?.[1] ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

export function ApodCard({ item, onClick }: ApodCardProps) {
    const imageUrl = item.media_type === 'video'
        ? (item.thumbnail_url ?? getYoutubeThumbnail(item.url) ?? null)
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
            aria-label={`Ver detalles de ${item.title}`}
            tabIndex={0}
        >
            <div className="relative aspect-video overflow-hidden bg-slate-800">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800">
                        <PlayCircle className="h-16 w-16 text-slate-600 group-hover:text-orange-400 transition-colors" aria-hidden="true" />
                    </div>
                )}

                {item.media_type === 'video' && (
                    <span
                        className="absolute right-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white"
                        aria-label="Contenido de video"
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
                    {new Date(item.date + 'T00:00:00').toLocaleDateString('es-CO', {
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