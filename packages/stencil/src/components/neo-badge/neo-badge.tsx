import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'neo-badge',
    styleUrl: 'neo-badge.css',
    shadow: true,
})
export class NeoBadge {
    @Prop() name!: string
    @Prop() hazardous: boolean = false
    @Prop() distanceKm!: number
    @Prop() velocityKph!: number

    private formatNumber(value: number): string {
        return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
    }

    render() {
        return (
            <div class={`badge ${this.hazardous ? 'badge--hazardous' : 'badge--safe'}`}>
                <div class="badge__header">
                    <span class="badge__icon" aria-hidden="true">
                        {this.hazardous ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                <path d="M12 9v4" /><path d="M12 17h.01" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <path d="m9 11 3 3L22 4" />
                            </svg>
                        )}
                    </span>
                    <span class="badge__name">{this.name}</span>
                    <span
                        class="badge__status"
                        aria-label={this.hazardous ? 'Potencialmente peligroso' : 'No peligroso'}
                    >
                        {this.hazardous ? 'PELIGROSO' : 'SEGURO'}
                    </span>
                </div>
                <div class="badge__stats">
                    <div class="badge__stat">
                        <span class="badge__stat-label">Distancia</span>
                        <span class="badge__stat-value">{this.formatNumber(this.distanceKm)} km</span>
                    </div>
                    <div class="badge__stat">
                        <span class="badge__stat-label">Velocidad</span>
                        <span class="badge__stat-value">{this.formatNumber(this.velocityKph)} km/h</span>
                    </div>
                </div>
            </div>
        )
    }
}