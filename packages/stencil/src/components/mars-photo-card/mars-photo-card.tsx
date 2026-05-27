import { Component, Prop, Event, EventEmitter, h } from '@stencil/core'

@Component({
    tag: 'mars-photo-card',
    styleUrl: 'mars-photo-card.css',
    shadow: true,
})
export class MarsPhotoCard {
    @Prop() imgSrc!: string
    @Prop() cameraName!: string
    @Prop() earthDate!: string
    @Prop() sol!: number
    @Prop() roverName!: string
    @Prop({ mutable: true }) favorited: boolean = false

    @Event() favoriteToggle!: EventEmitter<{ sol: number; favorited: boolean }>

    private handleFavoriteClick = (e: MouseEvent) => {
        e.stopPropagation()
        this.favorited = !this.favorited
        this.favoriteToggle.emit({ sol: this.sol, favorited: this.favorited })
    }

    render() {
        return (
            <article class="card">
                <div class="image-wrapper">
                    <img
                        src={this.imgSrc}
                        alt={`${this.roverName} rover — ${this.cameraName} on ${this.earthDate}`}
                        loading="lazy"
                        decoding="async"
                    />
                    <button
                        class={`favorite-btn ${this.favorited ? 'favorite-btn--active' : ''}`}
                        onClick={this.handleFavoriteClick}
                        aria-label={this.favorited ? 'Remove from favorites' : 'Add to favorites'}
                        aria-pressed={this.favorited ? 'true' : 'false'}
                    >
                        {this.favorited ? '★' : '☆'}
                    </button>
                </div>
                <div class="content">
                    <p class="camera">{this.cameraName}</p>
                    <p class="meta">Sol {this.sol} · {this.earthDate}</p>
                    <p class="rover">{this.roverName}</p>
                </div>
            </article>
        )
    }
}