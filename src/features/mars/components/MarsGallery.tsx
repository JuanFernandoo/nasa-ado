import type { MarsPhoto } from "../schemas/mars.schema";
import { MarsPhotoCard } from "./MarsPhotoCard";

interface MarsGalleryProps {
    photos: MarsPhoto[]
}

export function MarsGallery({ photos }: MarsGalleryProps) {
    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <span className="text-5xl" aria-hidden="true">🔴</span>
                <h3 className="text-lg font-semibold text-slate-300">No photos found</h3>
                <p className="text-sm text-slate-500">
                    Try a different rover, camera, or date.
                </p>
            </div>
        )
    }

    return (
        <section aria-label={`${String(photos.length)} Mars rover photos`}>
            <p className="mb-4 text-sm text-slate-500">
                Showing <span className="font-medium text-slate-300">{String(photos.length)}</span> photos
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo) => (
                    <MarsPhotoCard key={photo.id} photo={photo} />
                ))}
            </div>
        </section>
    )
}