import { h } from "@stencil/core";
export class MarsPhotoCard {
    imgSrc;
    cameraName;
    earthDate;
    sol;
    roverName;
    favorited = false;
    favoriteToggle;
    handleFavoriteClick = (e) => {
        e.stopPropagation();
        this.favorited = !this.favorited;
        this.favoriteToggle.emit({ sol: this.sol, favorited: this.favorited });
    };
    render() {
        return (h("article", { key: '089478036c47f0d097d4bdcf9d4d2a65ee0b89a7', class: "card" }, h("div", { key: 'b8f8ad39f8f99acd3dae9858bb3445bbaded6f92', class: "image-wrapper" }, h("img", { key: 'a5df4ab31583b7b58243073ccd0a5bd44aa42307', src: this.imgSrc, alt: `${this.roverName} rover — ${this.cameraName} on ${this.earthDate}`, loading: "lazy", decoding: "async" }), h("button", { key: 'ea07e720986c24b92355a5ae1618dc04fa1dc3f8', class: `favorite-btn ${this.favorited ? 'favorite-btn--active' : ''}`, onClick: this.handleFavoriteClick, "aria-label": this.favorited ? 'Remove from favorites' : 'Add to favorites', "aria-pressed": this.favorited ? 'true' : 'false' }, this.favorited ? '★' : '☆')), h("div", { key: '913a4ee585f0f47614ed216e0f2d6846dad5d7d5', class: "content" }, h("p", { key: '9c4087703e2ac3265d1f273c46b171b5df0c4fd9', class: "camera" }, this.cameraName), h("p", { key: '45ba2bd3f1811bdf57e0fa3e0e3491d37e5f4ebd', class: "meta" }, "Sol ", this.sol, " \u00B7 ", this.earthDate), h("p", { key: 'e861a9e6dfe432114384948ed6f8e7ff27691d95', class: "rover" }, this.roverName))));
    }
    static get is() { return "mars-photo-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["mars-photo-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["mars-photo-card.css"]
        };
    }
    static get properties() {
        return {
            "imgSrc": {
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
                "attribute": "img-src"
            },
            "cameraName": {
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
                "attribute": "camera-name"
            },
            "earthDate": {
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
                "attribute": "earth-date"
            },
            "sol": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "sol"
            },
            "roverName": {
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
                "attribute": "rover-name"
            },
            "favorited": {
                "type": "boolean",
                "mutable": true,
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
                "attribute": "favorited",
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "favoriteToggle",
                "name": "favoriteToggle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ sol: number; favorited: boolean }",
                    "resolved": "{ sol: number; favorited: boolean; }",
                    "references": {}
                }
            }];
    }
}
