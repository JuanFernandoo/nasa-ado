import type { Components, JSX } from "../types/components";

interface NeoBadge extends Components.NeoBadge, HTMLElement {}
export const NeoBadge: {
    prototype: NeoBadge;
    new (): NeoBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
