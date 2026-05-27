import type { Components, JSX } from "../types/components";

interface ApodCard extends Components.ApodCard, HTMLElement {}
export const ApodCard: {
    prototype: ApodCard;
    new (): ApodCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
