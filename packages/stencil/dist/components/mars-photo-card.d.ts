import type { Components, JSX } from "../types/components";

interface MarsPhotoCard extends Components.MarsPhotoCard, HTMLElement {}
export const MarsPhotoCard: {
    prototype: MarsPhotoCard;
    new (): MarsPhotoCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
