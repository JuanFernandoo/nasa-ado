import { useRef, useEffect, useCallback } from 'react'
import type { ApodItem } from '@/features/apod/schemas/apod.schema'

interface ApodCardWCProps {
  item: ApodItem
  onCardClick?: (item: ApodItem) => void
}

export function ApodCardWC({ item, onCardClick }: ApodCardWCProps) {
  const ref = useRef<HTMLElement>(null)

  const handleCardClick = useCallback(() => {
    onCardClick?.(item)
  }, [item, onCardClick])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('cardClick', handleCardClick)
    return () => { el.removeEventListener('cardClick', handleCardClick) }
  }, [handleCardClick])

  const imageUrl = item.media_type === 'video'
    ? (item.thumbnail_url ?? item.url)
    : item.url

  return (
    <apod-card
      ref={ref}
      image-url={imageUrl}
      card-title={item.title}
      date={item.date}
      copyright={item.copyright}
      is-video={item.media_type === 'video'}
    />
  )
}