import { useRef, useEffect, useCallback } from 'react'
import type { MarsPhoto } from '@/features/mars/schemas/mars.schema'

interface MarsPhotoCardWCProps {
    photo: MarsPhoto
    favorited?: boolean
    onFavoriteToggle?: (photoId: number, favorited: boolean) => void
}

export function MarsPhotoCardWC({
    photo,
    favorited = false,
    onFavoriteToggle,
}: MarsPhotoCardWCProps) {
    const ref = useRef<HTMLElement>(null)

    const handleFavoriteToggle = useCallback(
        (e: Event) => {
            const detail = (e as CustomEvent<{ sol: number; favorited: boolean }>).detail
            onFavoriteToggle?.(photo.id, detail.favorited)
        },
        [photo.id, onFavoriteToggle],
    )

    useEffect(() => {
        const el = ref.current
        if (!el) return
        el.addEventListener('favoriteToggle', handleFavoriteToggle)
        return () => { el.removeEventListener('favoriteToggle', handleFavoriteToggle) }
    }, [handleFavoriteToggle])

    return (
        <mars-photo-card
            ref={ref}
            img-src={photo.img_src}
            camera-name={photo.camera.full_name}
            earth-date={photo.earth_date}
            sol={photo.sol}
            rover-name={photo.rover.name}
            favorited={favorited}
        />
    )
}