/** Vertical axis position relative to the host element. */
export type PinVerticalPosition = 'top' | 'bottom' | 'center';

/** Horizontal axis position relative to the host element. */
export type PinHorizontalPosition = 'left' | 'right' | 'center';

/**
 * Position of the pinned overlay relative to its anchor.
 * Accepts one or two values (e.g. `'top'`, `'left'`, `'top right'`, `'center left'`).
 * Uses CSS `position-area` under the hood.
 */
export type PinPosition =
  `${PinVerticalPosition} ${PinHorizontalPosition}` | PinVerticalPosition | PinHorizontalPosition;
