import { Component, Prop, Event, EventEmitter, h } from '@stencil/core'

@Component({
    tag: 'apod-card',
    styleUrl: 'apod-card.css',
    shadow: true,
})
export class ApodCard {
    @Prop() imageUrl!: string
    @Prop() cardTitle!: string
    @Prop() date!: string
    @Prop() copyright?: string
    @Prop() isVideo: boolean = false

    @Event() cardClick!: EventEmitter<{ title: string; date: string }>

    private handleClick = () => {
        this.cardClick.emit({ title: this.cardTitle, date: this.date })
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            this.handleClick()
        }
    }

    private formatDate(dateStr: string): string {
        const date = new Date(dateStr + 'T00:00:00')
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    render() {
        return (
            <article
                class="card"
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${this.cardTitle}`}
            >
                <div class="image-wrapper">
                    <img
                        src={this.imageUrl}
                        alt={this.cardTitle}
                        loading="lazy"
                        decoding="async"
                    />
                    {this.isVideo && (
                        <span class="badge" aria-label="Video content">VIDEO</span>
                    )}
                </div>
                <div class="content">
                    <time dateTime={this.date} class="date">
                        {this.formatDate(this.date)}
                    </time>
                    <h3 class="title">{this.cardTitle}</h3>
                    {this.copyright && (
                        <p class="copyright">© {this.copyright}</p>
                    )}
                </div>
            </article>
        )
    }
}