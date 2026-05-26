export type RoverName = 'curiosity' | 'opportunity' | 'spirit' | 'perseverance'
export type DateMode = 'earth' | 'sol'

export interface MarsFilters {
    rover: RoverName
    dateMode: DateMode
    earthDate: string
    sol: number
    camera: string
}

export const ROVERS: RoverName[] = ['curiosity', 'opportunity', 'spirit', 'perseverance']

export const CAMERAS: Record<RoverName, { value: string; label: string }[]> = {
    curiosity: [
        { value: '', label: 'All cameras' },
        { value: 'FHAZ', label: 'Front Hazard' },
        { value: 'RHAZ', label: 'Rear Hazard' },
        { value: 'MAST', label: 'Mast Camera' },
        { value: 'CHEMCAM', label: 'ChemCam' },
        { value: 'NAVCAM', label: 'Navigation' },
    ],
    perseverance: [
        { value: '', label: 'All cameras' },
        { value: 'EDL_RUCAM', label: 'Rover Up-Look' },
        { value: 'FRONT_HAZCAM_LEFT_A', label: 'Front Hazard Left' },
        { value: 'NAVCAM_LEFT', label: 'Navigation Left' },
        { value: 'MCZ_LEFT', label: 'Mast Left' },
    ],
    opportunity: [
        { value: '', label: 'All cameras' },
        { value: 'FHAZ', label: 'Front Hazard' },
        { value: 'RHAZ', label: 'Rear Hazard' },
        { value: 'NAVCAM', label: 'Navigation' },
        { value: 'PANCAM', label: 'Panoramic' },
    ],
    spirit: [
        { value: '', label: 'All cameras' },
        { value: 'FHAZ', label: 'Front Hazard' },
        { value: 'RHAZ', label: 'Rear Hazard' },
        { value: 'NAVCAM', label: 'Navigation' },
        { value: 'PANCAM', label: 'Panoramic' },
    ],
}