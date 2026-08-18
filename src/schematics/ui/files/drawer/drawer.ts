import { Component, effect, ElementRef, input, model, untracked, viewChild } from '@angular/core';

import { DrawerGesture, GestureCallbacks } from './drawer-gesture';

type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * ZenDrawer is a reusable side-sheet / bottom-sheet component built on the native HTML `<dialog>` element.
 * It slides in from any edge with swipe-to-dismiss gesture support, snap points, and background scaling.
 *
 * @example
 * ```html
 * <zen-drawer #drawer [(open)]="isOpen" side="right" size="md">
 *   <h2 drawer-header>Drawer Title</h2>
 *   <p>Drawer content</p>
 *   <button (click)="drawer.close()">Close</button>
 * </zen-drawer>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 * ```css
 * :root {
 *   --zen-drawer-padding: 1rem;
 *   --zen-drawer-bg: white;
 *   --zen-drawer-leading-border-radius: 12px;
 *   --zen-drawer-shadow: 0 4px 24px rgb(0 0 0 / 20%);
 *   --zen-drawer-inset: 0px;
 *   --zen-drawer-backdrop-bg: rgba(0, 0, 0, 0.5);
 *   --zen-drawer-overlay-min-opacity: 0;
 *   --zen-drawer-bleed-background: #fff;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [MDN Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 * @see [Vaul](https://vaul.emilkowal.ski/)
 */
@Component({
  selector: 'zen-drawer',
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
})
export class ZenDrawer {
  readonly open = model<boolean>(false);
  readonly side = input<DrawerSide>('right');
  readonly size = input<DrawerSize>('md');
  readonly closeOnEscape = input(true);
  readonly swipeHandle = input(true);
  readonly handleOnly = input(false);
  readonly scaleBackground = input(false);
  readonly snapPoints = input<(number | string)[]>([]);
  readonly initialSnap = input<number | string | undefined>(undefined);

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('drawerDialog');
  private readonly gesture = new DrawerGesture();

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
          element.showModal();
          element.style.removeProperty('--zen-drawer-drag');
          element.style.removeProperty('--zen-drawer-height');

          if (shouldScale) {
            document.body.classList.add('zen-drawer-open');
          }

          if (this.isVertical()) {
            const snaps = this.gesture.resolveSnapPoints(this.snapPoints());
            if (snaps.length > 0) {
              const openSnap = this.gesture.initSnapHeight(this.initialSnap());
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

  close(): void {
    this.open.set(false);
  }

  protected pointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    if (this.handleOnly() && !(event.target as HTMLElement).closest('.zen-drawer-swipe-handle')) {
      return;
    }
    this.gesture.pointerDown(event, this.side(), this.isVertical(), this.gestureCallbacks());
  }

  protected pointerMove(event: PointerEvent): void {
    this.gesture.pointerMove(event, this.side(), this.isVertical(), this.gestureCallbacks());
  }

  protected pointerUp(event: PointerEvent): void {
    this.gesture.pointerUp(event.pointerId, this.side(), this.isVertical(), this.gestureCallbacks());
  }

  protected pointerCancel(event: PointerEvent): void {
    this.gesture.pointerCancel(event.pointerId, this.side(), this.isVertical(), this.gestureCallbacks());
  }

  private isVertical(): boolean {
    return this.side() === 'top' || this.side() === 'bottom';
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
