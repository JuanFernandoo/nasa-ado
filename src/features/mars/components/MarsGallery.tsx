import { CircleDot } from "lucide-react";
import type { MarsPhoto } from "../schemas/mars.schema";
import { MarsPhotoCard } from "./MarsPhotoCard";

interface MarsGalleryProps {
    photos: MarsPhoto[]
}

export function MarsGallery({ photos }: MarsGalleryProps) {
    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <CircleDot className="h-12 w-12 text-slate-600" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-slate-300">No se encontraron fotos</h3>
                <p className="text-sm text-slate-500">
                   Intenta con otro rover, cámara o fecha
                </p>
            </div>
        )
    }

    return (
        <section aria-label={`${String(photos.length)} Fotos del rover de marte`}>
            <p className="mb-4 text-sm text-slate-500">
                Mostrando <span className="font-medium text-slate-300">{String(photos.length)}</span> fotos
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo) => (
                    <MarsPhotoCard key={photo.id} photo={photo} />
                ))}
            </div>
        </section>
    )
}