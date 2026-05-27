import { useEffect, useRef } from 'react'
import { cn } from '@/shared/utils/cn'
import type { ApodItem } from '../schemas/apod.schema'

interface ApodModalProps {
  item: ApodItem | null
  onClose: () => void
}

export function ApodModal({ item, onClose }: ApodModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (item) {
      closeBtnRef.current?.focus()
    }
  }, [item])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose() }
    }

    document.addEventListener('keydown', handleKey)
    return () => { document.removeEventListener('keydown', handleKey) }
  }, [onClose])

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [item])

  if (!item) return null

  const imageUrl = item.media_type === 'video'
    ? (item.thumbnail_url ?? '')
    : (item.hdurl ?? item.url)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={cn(
        'relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto',
        'rounded-2xl bg-slate-900 shadow-2xl',
        'border border-slate-700',
      )}>
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className={cn(
            'absolute right-4 top-4 z-10 rounded-full bg-slate-800 p-2',
            'text-slate-400 hover:bg-slate-700 hover:text-white',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
            'transition-colors',
          )}
          aria-label="Cerrar modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {item.media_type === 'video' ? (
          <div className="aspect-video w-full">
            <iframe
              src={item.url}
              title={item.title}
              className="h-full w-full rounded-t-2xl"
              allowFullScreen
            />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={item.title}
            className="max-h-[60vh] w-full rounded-t-2xl object-contain bg-slate-950"
          />
        )}

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 id="modal-title" className="text-xl font-bold text-white">
                {item.title}
              </h2>
              <time dateTime={item.date} className="text-sm text-slate-400">
                {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {item.copyright && (
              <span className="shrink-0 text-xs text-slate-500">© {item.copyright}</span>
            )}
          </div>
          <p className="leading-relaxed text-slate-300">{item.explanation}</p>
        </div>
      </div>
    </div>
  )
}