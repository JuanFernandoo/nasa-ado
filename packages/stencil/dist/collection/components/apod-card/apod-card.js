import { h } from "@stencil/core";
export class ApodCard {
    imageUrl;
    cardTitle;
    date;
    copyright;
    isVideo = false;
    cardClick;
    handleClick = () => {
        this.cardClick.emit({ title: this.cardTitle, date: this.date });
    };
    handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleClick();
        }
    };
    formatDate(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    render() {
        return (h("article", { key: '7211700d6469bf5ce61cef2000d76f089ee12249', class: "card", onClick: this.handleClick, onKeyDown: this.handleKeyDown, tabIndex: 0, role: "button", "aria-label": `View details for ${this.cardTitle}` }, h("div", { key: 'c943f50f80913aa71890a3c7e125e4879bcaea2d', class: "image-wrapper" }, h("img", { key: 'fe0afe8b244eee8a021e2ccdf756bd1331e295cf', src: this.imageUrl, alt: this.cardTitle, loading: "lazy", decoding: "async" }), this.isVideo && (h("span", { key: '13e7b1fa73a2a85d141235a0b29d103dbbe714d9', class: "badge", "aria-label": "Video content" }, "VIDEO"))), h("div", { key: '29a98f6333ea98a86215b5051b7474ac3672f8cb', class: "content" }, h("time", { key: 'eb02d4b258dbed2baf09c1c162ed98c5aa283d22', dateTime: this.date, class: "date" }, this.formatDate(this.date)), h("h3", { key: '904ffab0eb3e5e2a8f02fc3208a78128f0e9e47c', class: "title" }, this.cardTitle), this.copyright && (h("p", { key: '76d2e13662026c11ac404ae3525a50d8da952208', class: "copyright" }, "\u00A9 ", this.copyright)))));
    }
    static get is() { return "apod-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["apod-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["apod-card.css"]
        };
    }
    static get properties() {
        return {
            "imageUrl": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "image-url"
            },
            "cardTitle": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "card-title"
            },
            "date": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "date"
            },
            "copyright": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "copyright"
            },
            "isVideo": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "is-video",
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "cardClick",
                "name": "cardClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ title: string; date: string }",
                    "resolved": "{ title: string; date: string; }",
                    "references": {}
                }
            }];
    }
}
