export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface GestureCallbacks {
  readonly onOpenChange: (open: boolean) => void;
  readonly setDragStyle: (cssVar: string, value: string) => void;
  readonly removeDragStyle: (cssVar: string) => void;
  readonly getDimension: () => number;
  readonly setPointerCapture: (pointerId: number) => void;
  readonly setAttribute: (name: string, value: string) => void;
  readonly removeAttribute: (name: string) => void;
  readonly setOverscrollStyle: (sizePx: number) => void;
  readonly removeOverscrollStyle: () => void;
}
