import type { FlatAsteroid } from '@/features/neo/types/neo.types'

interface NeoBadgeWCProps {
  asteroid: FlatAsteroid
}

export function NeoBadgeWC({ asteroid }: NeoBadgeWCProps) {
  return (
    <neo-badge
      name={asteroid.name}
      hazardous={asteroid.isHazardous}
      distance-km={asteroid.distanceKm}
      velocity-kph={asteroid.velocityKph}
    />
  )
}