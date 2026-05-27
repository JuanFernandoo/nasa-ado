import { h } from "@stencil/core";
export class NeoBadge {
    name;
    hazardous = false;
    distanceKm;
    velocityKph;
    formatNumber(value) {
        return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    render() {
        return (h("div", { key: '709b7f7b2fcb48173b811115d16087d1cf488330', class: `badge ${this.hazardous ? 'badge--hazardous' : 'badge--safe'}` }, h("div", { key: '6470b6cb25dde1bc315d27b5c5adab3414611147', class: "badge__header" }, h("span", { key: '0c87be0301685837da299ad3eda3230da098def8', class: "badge__icon", "aria-hidden": "true" }, this.hazardous ? '⚠️' : '✓'), h("span", { key: '804bc03e7180887a6a2ad039a6b81cffd0e1aad6', class: "badge__name" }, this.name), h("span", { key: '90290a0ebb0d8bdd473701aa6eb4de7cdaa09fe9', class: "badge__status", "aria-label": this.hazardous ? 'Potentially hazardous' : 'Not hazardous' }, this.hazardous ? 'HAZARDOUS' : 'SAFE')), h("div", { key: 'f8ebca30a8a836a97b155a0199ecd0b1f5c5d131', class: "badge__stats" }, h("div", { key: '5de2806c341ec7e45669cbaef1aaf63c0ed70f1b', class: "badge__stat" }, h("span", { key: '9e767a8ae9859106c14d64cb0b20f5229649e5d7', class: "badge__stat-label" }, "Distance"), h("span", { key: 'e64e7250a60911e20fb25efb18f19f4e52122d3e', class: "badge__stat-value" }, this.formatNumber(this.distanceKm), " km")), h("div", { key: '5eb061286616cbbe82fcdd46487948e817e41a46', class: "badge__stat" }, h("span", { key: '8799074b556435e121f940d2458fb72b67e9d635', class: "badge__stat-label" }, "Velocity"), h("span", { key: '2fb13727b67fbda2b00587eea64220f7059e752d', class: "badge__stat-value" }, this.formatNumber(this.velocityKph), " km/h")))));
    }
    static get is() { return "neo-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["neo-badge.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["neo-badge.css"]
        };
    }
    static get properties() {
        return {
            "name": {
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
                "attribute": "name"
            },
            "hazardous": {
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
                "attribute": "hazardous",
                "defaultValue": "false"
            },
            "distanceKm": {
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
                "attribute": "distance-km"
            },
            "velocityKph": {
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
                "attribute": "velocity-kph"
            }
        };
    }
}
