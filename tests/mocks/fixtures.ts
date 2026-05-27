import type { ApodItem } from '@/features/apod/schemas/apod.schema'
import type { EpicImage } from '@/features/epic/schemas/epic.schema'
import type { MarsPhoto } from '@/features/mars/schemas/mars.schema'
import type { Asteroid } from '@/features/neo/schemas/neo.schema'

export const apodFixtures: ApodItem[] = [
    {
        date: '2024-01-01',
        title: 'Andromeda Galaxy',
        explanation:
            'The nearest major galaxy to the Milky Way, Andromeda is visible to the naked eye on moonless nights and contains over one trillion stars.',
        url: 'https://apod.nasa.gov/apod/image/2401/AndromedaGalaxy_Kennett_960.jpg',
        hdurl: 'https://apod.nasa.gov/apod/image/2401/AndromedaGalaxy_Kennett_4096.jpg',
        media_type: 'image',
        copyright: 'Robert Kennett',
    },
    {
        date: '2024-01-02',
        title: 'Orion Nebula',
        explanation:
            'A diffuse nebula situated in the Milky Way south of Orions Belt, it is one of the brightest nebulae and visible to the naked eye in the night sky.',
        url: 'https://apod.nasa.gov/apod/image/2401/OrionNebula_Hubble_960.jpg',
        hdurl: 'https://apod.nasa.gov/apod/image/2401/OrionNebula_Hubble_18000.jpg',
        media_type: 'image',
        copyright: 'NASA, ESA, Hubble',
    },
    {
        date: '2024-01-03',
        title: 'Saturn Ring Plane Crossing',
        explanation:
            'Every 13 to 15 years Earth crosses the ring plane of Saturn, providing a nearly edge-on view of the rings and revealing their remarkable thinness.',
        url: 'https://www.youtube.com/embed/5THhTL5HDTU',
        media_type: 'video',
        thumbnail_url: 'https://apod.nasa.gov/apod/image/2401/SaturnRings_Hubble_960.jpg',
    },
]

export const marsPhotoFixtures: MarsPhoto[] = [
    {
        id: 102693,
        sol: 1004,
        camera: {
            id: 20,
            name: 'FHAZ',
            rover_id: 5,
            full_name: 'Front Hazard Avoidance Camera',
        },
        img_src:
            'https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG',
        earth_date: '2015-06-03',
        rover: {
            id: 5,
            name: 'Curiosity',
            landing_date: '2012-08-06',
            launch_date: '2011-11-26',
            status: 'active',
        },
    },
    {
        id: 102694,
        sol: 1004,
        camera: {
            id: 21,
            name: 'NAVCAM',
            rover_id: 5,
            full_name: 'Navigation Camera',
        },
        img_src:
            'https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/ncam/NRB_486615536EDR_F0481570NCAM00353M_.JPG',
        earth_date: '2015-06-03',
        rover: {
            id: 5,
            name: 'Curiosity',
            landing_date: '2012-08-06',
            launch_date: '2011-11-26',
            status: 'active',
        },
    },
]

export const asteroidFixtures: Asteroid[] = [
    {
        id: '54016476',
        name: '(2020 HS)',
        nasa_jpl_url:
            'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=54016476',
        is_potentially_hazardous_asteroid: false,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.0404810807,
                estimated_diameter_max: 0.0904982758,
            },
        },
        close_approach_data: [
            {
                close_approach_date: '2024-01-01',
                relative_velocity: { kilometers_per_hour: '25000.500' },
                miss_distance: { kilometers: '1500000.750' },
            },
        ],
    },
    {
        id: '54016477',
        name: '(2020 HZ)',
        nasa_jpl_url:
            'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=54016477',
        is_potentially_hazardous_asteroid: true,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.15,
                estimated_diameter_max: 0.35,
            },
        },
        close_approach_data: [
            {
                close_approach_date: '2024-01-01',
                relative_velocity: { kilometers_per_hour: '75000.250' },
                miss_distance: { kilometers: '300000.100' },
            },
        ],
    },
]

export const epicFixtures: EpicImage[] = [
    {
        identifier: '20240101003633',
        image: 'epic_1b_20240101003633',
        caption:
            'This image was taken by NASA\'s EPIC camera onboard the NOAA DSCOVR spacecraft',
        date: '2024-01-01 00:31:45',
        centroid_coordinates: { lat: -14.609375, lon: 159.875 },
    },
    {
        identifier: '20240101021227',
        image: 'epic_1b_20240101021227',
        caption:
            'This image was taken by NASA\'s EPIC camera onboard the NOAA DSCOVR spacecraft',
        date: '2024-01-01 02:07:45',
        centroid_coordinates: { lat: -14.609375, lon: 134.25 },
    },
]