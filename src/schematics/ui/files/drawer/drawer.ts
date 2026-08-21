import { Component, effect, ElementRef, input, model, untracked, viewChild } from '@angular/core';

import { DrawerGesture, GestureCallbacks } from './drawer-gesture';

type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const SIZE_FRACTIONS: Record<DrawerSize, number> = {
  sm: 0.25,
  md: 0.4,
  lg: 0.55,
  xl: 0.7,
  full: 1,
};

const VERTICAL_SIZE_FRACTIONS: Record<DrawerSize, number> = {
  sm: 0.3,
  md: 0.45,
  lg: 0.6,
  xl: 0.75,
  full: 1,
};

@Component({
  selector: 'zen-drawer',
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  host: {
    '(click)': 'onBackdropClick($event)',
  },
})
export class ZenDrawer {
  readonly open = model<boolean>(false);
  readonly side = input<DrawerSide>('right');
  readonly size = input<DrawerSize>('md');
  readonly snapPoints = input<(number | string)[]>([]);
  readonly closeOnEscape = input(true);
  readonly backdrop = input(true);
  readonly swipeHandle = input(true);
  readonly handleOnly = input(false);
  readonly scaleBackground = input(false);

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('drawerDialog');
  private readonly gesture = new DrawerGesture();

  private backdropMouseDown = false;
  private wasDragging = false;

  protected readonly sideToSwipeDirection = (): string => this.side();
  protected readonly sideAxis = (): string => (this.side() === 'left' || this.side() === 'right' ? 'x' : 'y');
  protected readonly isExpanded = (): 'true' | null => {
    return this.gesture.hasSnaps && this.gesture.snapHeight >= this.gesture.maxSnap ? 'true' : null;
  };
  protected readonly hasSnapPoints = (): 'true' | null => (this.snapPoints().length > 0 ? 'true' : null);

  constructor() {
    effect(() => {
      const isOpen = this.open();
      const dialog = this.dialogRef();
      const shouldScale = this.scaleBackground();

      untracked(() => {
        if (!dialog) return;

        const element = dialog.nativeElement;

        if (isOpen) {
          if (!element.open) {
            element.showModal();
          }
          element.style.removeProperty('--zen-drawer-drag');
          element.style.removeProperty('--zen-drawer-height');

          if (shouldScale) {
            document.body.classList.add('zen-drawer-open');
          }

          if (this.isVertical()) {
            const resolved = this.resolveSnapPoints(this.snapPoints());
            if (resolved.length > 0) {
              const openSnap = this.gesture.initSnapHeight();
              element.style.setProperty('--zen-drawer-height', `${openSnap}px`);
            }
          }
        } else if (element.open) {
          element.close();
          if (shouldScale) {
            document.body.classList.remove('zen-drawer-open');
          }
        }
      });
    });
  }

  protected cancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
    }
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (!this.backdrop()) return;

    if (this.wasDragging) {
      this.wasDragging = false;
      this.backdropMouseDown = false;
      return;
    }

    if (!this.backdropMouseDown) {
      return;
    }

    this.backdropMouseDown = false;

    const dialog = this.dialogRef()?.nativeElement;
    if (!dialog || event.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isOutside =
      rect.width > 0 && rect.height > 0
        ? event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        : true;

    if (isOutside) {
      this.open.set(false);
    }
  }

  close(): void {
    this.open.set(false);
  }

  protected pointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;

    this.wasDragging = false;

    const dialog = this.dialogRef()?.nativeElement;
    if (dialog && event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      this.backdropMouseDown =
        rect.width > 0 && rect.height > 0
          ? event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          : true;
    } else {
      this.backdropMouseDown = false;
    }

    if (this.handleOnly() && !(event.target as HTMLElement).closest('.zen-drawer-swipe-handle')) {
      return;
    }
    this.gesture.pointerDown(event, this.side(), this.isVertical(), this.gestureCallbacks());
  }

  protected pointerMove(event: PointerEvent): void {
    this.gesture.pointerMove(event, this.side(), this.isVertical(), this.gestureCallbacks());
    if (this.gesture.isLocked) {
      this.wasDragging = true;
    }
  }

  protected pointerUp(event: PointerEvent): void {
    this.gesture.pointerUp(event.pointerId, this.side(), this.isVertical(), this.gestureCallbacks());
  }

  protected pointerCancel(event: PointerEvent): void {
    this.wasDragging = false;
    this.backdropMouseDown = false;
    this.gesture.pointerCancel(event.pointerId, this.side(), this.isVertical(), this.gestureCallbacks());
  }

  private isVertical(): boolean {
    return this.side() === 'top' || this.side() === 'bottom';
  }

  private resolveSnapPoints(snapPoints: (number | string)[]): number[] {
    const fractions = this.isVertical() ? VERTICAL_SIZE_FRACTIONS : SIZE_FRACTIONS;
    const resolved = snapPoints.map(snap => {
      if (typeof snap === 'string' && snap in fractions) {
        return fractions[snap as DrawerSize];
      }
      return snap;
    });
    return this.gesture.resolveSnapPoints(resolved);
  }

  private gestureCallbacks(): GestureCallbacks {
    const el: HTMLDialogElement = this.dialogRef()!.nativeElement;
    const vertical = this.isVertical();
    return {
      onOpenChange: (open: boolean): void => {
        this.open.set(open);
      },
      setDragStyle: (cssVar: string, value: string): void => {
        el.style.setProperty(cssVar, value);
      },
      removeDragStyle: (cssVar: string): void => {
        el.style.removeProperty(cssVar);
      },
      getDimension: (): number => (vertical ? el.offsetHeight : el.offsetWidth),
      setPointerCapture: (id: number): void => {
        el.setPointerCapture(id);
      },
      setAttribute: (name: string, value: string): void => {
        el.setAttribute(name, value);
      },
      removeAttribute: (name: string): void => {
        el.removeAttribute(name);
      },
      setOverscrollStyle: (sizePx: number): void => {
        const prop = vertical ? 'height' : 'width';
        el.style.setProperty(prop, `${sizePx}px`);
      },
      removeOverscrollStyle: (): void => {
        el.style.removeProperty('width');
        el.style.removeProperty('height');
      },
    };
  }
}
