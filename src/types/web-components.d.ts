declare namespace React {
    namespace JSX {
        interface IntrinsicElements {
            'apod-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'image-url'?: string | undefined
                'card-title'?: string | undefined
                date?: string | undefined
                copyright?: string | undefined
                'is-video'?: boolean | undefined
            }
            'neo-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                name?: string | undefined
                hazardous?: boolean | undefined
                'distance-km'?: number | undefined
                'velocity-kph'?: number | undefined
            }
            'mars-photo-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'img-src'?: string | undefined
                'camera-name'?: string | undefined
                'earth-date'?: string | undefined
                sol?: number | undefined
                'rover-name'?: string | undefined
                favorited?: boolean | undefined
            }
        }
    }
}