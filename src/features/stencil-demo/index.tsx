import { useState } from 'react'
import { ApodCardWC } from '@/shared/components/wc/ApodCardWC'
import { NeoBadgeWC } from '@/shared/components/wc/NeoBadgeWC'
import { MarsPhotoCardWC } from '@/shared/components/wc/MarsPhotoCardWC'
import type { ApodItem } from '@/features/apod/schemas/apod.schema'
import type { MarsPhoto } from '@/features/mars/schemas/mars.schema'
import type { FlatAsteroid } from '@/features/neo/types/neo.types'

const demoApod: ApodItem = {
    date: '2024-01-15',
    title: 'Andromeda Galaxy',
    explanation: 'The nearest major galaxy to the Milky Way.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/960px-Andromeda_Galaxy_%28with_h-alpha%29.jpg', hdurl: 'https://apod.nasa.gov/apod/image/2401/AndromedaGalaxy_Kennett_4096.jpg',
    media_type: 'image',
    copyright: 'Robert Kennett',
}

const demoAsteroid: FlatAsteroid = {
    id: '54016477',
    name: '2020 HZ',
    date: '2024-01-01',
    isHazardous: true,
    diameterMinKm: 0.15,
    diameterMaxKm: 0.35,
    velocityKph: 75000,
    distanceKm: 300000,
    nasaUrl: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=54016477',
}

const demoMarsPhoto: MarsPhoto = {
    id: 102693,
    sol: 1004,
    camera: {
        id: 20,
        name: 'FHAZ',
        rover_id: 5,
        full_name: 'Front Hazard Avoidance Camera',
    },
    img_src: 'https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG',
    earth_date: '2015-06-03',
    rover: {
        id: 5,
        name: 'Curiosity',
        landing_date: '2012-08-06',
        launch_date: '2011-11-26',
        status: 'active',
    },
}

export default function StencilDemoPage() {
    const [lastEvent, setLastEvent] = useState<string>('')

    return (
        <div>
            <div className="mb-8">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">
                    <span className="text-xs font-medium text-orange-400">
                        Web Components con Stencil.js
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-white">Demo de componentes</h1>
                <p className="mt-2 text-slate-400">
                    Librería UI de la NASA  construida con Stencil.js
                </p>
            </div>

            {lastEvent && (
                <div className="mb-8 rounded-lg border border-slate-700 bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">Último evento recibido por React:</p>
                    <p className="mt-1 font-mono text-sm text-orange-400">{lastEvent}</p>
                </div>
            )}

            <section className="mb-12">
                <h2 className="mb-2 text-xl font-semibold text-white">
                    <code className="rounded bg-slate-800 px-2 py-1 text-sm text-orange-400">
                        {'<apod-card>'}
                    </code>
                </h2>
                <p className="mb-4 text-sm text-slate-500">
                    Haz clic en la tarjeta para ver el evento personalizado enviado a React
                </p>
                <div className="max-w-sm">
                    <ApodCardWC
                        item={demoApod}
                        onCardClick={(item) => {
                            setLastEvent(`cardClick → "${item.title}" — ${item.date}`)
                        }}
                    />
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mb-2 text-xl font-semibold text-white">
                    <code className="rounded bg-slate-800 px-2 py-1 text-sm text-orange-400">
                        {'<neo-badge>'}
                    </code>
                </h2>
                <p className="mb-4 text-sm text-slate-500">
                    Cuadro del estado del asteroide con indicador de peligro.
                </p>
                <div className="max-w-sm">
                    <NeoBadgeWC asteroid={demoAsteroid} />
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mb-2 text-xl font-semibold text-white">
                    <code className="rounded bg-slate-800 px-2 py-1 text-sm text-orange-400">
                        {'<mars-photo-card>'}
                    </code>
                </h2>
                <p className="mb-4 text-sm text-slate-500">
                    Alterna el botón de favorito para ver el evento enviado a React
                </p>
                <div className="max-w-xs">
                    <MarsPhotoCardWC
                        photo={demoMarsPhoto}
                        onFavoriteToggle={(id, fav) => {
                            setLastEvent(`favoriteToggle → id: ${String(id)}, favorited: ${String(fav)}`)
                        }}
                    />
                </div>
            </section>
        </div>
    )
}