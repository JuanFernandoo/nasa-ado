'use strict';

var index = require('./index-D0vIrhFF.js');

const marsPhotoCardCss = () => `:host{display:block}.card{background:#0f172a;border:1px solid #1e293b;border-radius:12px;overflow:hidden;transition:border-color 0.3s, box-shadow 0.3s}.card:hover{border-color:rgba(249, 115, 22, 0.5);box-shadow:0 8px 24px rgba(249, 115, 22, 0.1)}.image-wrapper{position:relative;aspect-ratio:1;overflow:hidden;background:#1e293b}.image-wrapper img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}.card:hover .image-wrapper img{transform:scale(1.05)}.favorite-btn{position:absolute;top:8px;right:8px;background:rgba(15, 23, 42, 0.8);border:none;border-radius:50%;width:32px;height:32px;font-size:16px;cursor:pointer;color:#94a3b8;display:flex;align-items:center;justify-content:center;transition:background 0.2s, color 0.2s}.favorite-btn:hover{background:#1e293b;color:#fb923c}.favorite-btn:focus-visible{outline:2px solid #f97316;outline-offset:2px}.favorite-btn--active{background:#f97316;color:white}.content{padding:12px}.camera{margin:0 0 2px;font-size:12px;font-weight:500;color:#fb923c}.meta{margin:0 0 2px;font-size:11px;color:#64748b}.rover{margin:0;font-size:11px;color:#475569}`;

const MarsPhotoCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.favoriteToggle = index.createEvent(this, "favoriteToggle");
    }
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
        return (index.h("article", { key: '089478036c47f0d097d4bdcf9d4d2a65ee0b89a7', class: "card" }, index.h("div", { key: 'b8f8ad39f8f99acd3dae9858bb3445bbaded6f92', class: "image-wrapper" }, index.h("img", { key: 'a5df4ab31583b7b58243073ccd0a5bd44aa42307', src: this.imgSrc, alt: `${this.roverName} rover — ${this.cameraName} on ${this.earthDate}`, loading: "lazy", decoding: "async" }), index.h("button", { key: 'ea07e720986c24b92355a5ae1618dc04fa1dc3f8', class: `favorite-btn ${this.favorited ? 'favorite-btn--active' : ''}`, onClick: this.handleFavoriteClick, "aria-label": this.favorited ? 'Remove from favorites' : 'Add to favorites', "aria-pressed": this.favorited ? 'true' : 'false' }, this.favorited ? '★' : '☆')), index.h("div", { key: '913a4ee585f0f47614ed216e0f2d6846dad5d7d5', class: "content" }, index.h("p", { key: '9c4087703e2ac3265d1f273c46b171b5df0c4fd9', class: "camera" }, this.cameraName), index.h("p", { key: '45ba2bd3f1811bdf57e0fa3e0e3491d37e5f4ebd', class: "meta" }, "Sol ", this.sol, " \u00B7 ", this.earthDate), index.h("p", { key: 'e861a9e6dfe432114384948ed6f8e7ff27691d95', class: "rover" }, this.roverName))));
    }
};
MarsPhotoCard.style = marsPhotoCardCss();

exports.mars_photo_card = MarsPhotoCard;
