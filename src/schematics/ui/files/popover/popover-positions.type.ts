/** Vertical axis position relative to the host element. */
export type PopoverVerticalPosition = 'top' | 'bottom' | 'center';

/** Horizontal axis position relative to the host element. */
export type PopoverHorizontalPosition = 'left' | 'right' | 'center';

/**
 * Position of the popover relative to its trigger.
 * Accepts one or two values (e.g. `'top'`, `'left'`, `'top right'`, `'center left'`).
 * Uses CSS `position-area` under the hood.
 */
export type PopoverPosition =
  `${PopoverVerticalPosition} ${PopoverHorizontalPosition}` | PopoverVerticalPosition | PopoverHorizontalPosition;
