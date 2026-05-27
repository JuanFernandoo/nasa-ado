import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarsPhotoCard {
    imgSrc: string;
    cameraName: string;
    earthDate: string;
    sol: number;
    roverName: string;
    favorited: boolean;
    favoriteToggle: EventEmitter<{
        sol: number;
        favorited: boolean;
    }>;
    private handleFavoriteClick;
    render(): any;
}
