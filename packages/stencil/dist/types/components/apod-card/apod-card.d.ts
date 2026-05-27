import { EventEmitter } from '../../stencil-public-runtime';
export declare class ApodCard {
    imageUrl: string;
    cardTitle: string;
    date: string;
    copyright?: string;
    isVideo: boolean;
    cardClick: EventEmitter<{
        title: string;
        date: string;
    }>;
    private handleClick;
    private handleKeyDown;
    private formatDate;
    render(): any;
}
