import { Component, computed, effect, ElementRef, input, model, OnDestroy, untracked, viewChild } from '@angular/core';

import { DrawerSide, DrawerSize, GestureCallbacks } from './drawer.types';
import { DrawerGesture } from './drawer-gesture';

@Component({
  selector: 'zen-drawer',
  standalone: true,
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  host: {
    '(click)': 'onBackdropClick($event)',
  },
})
export class ZenDrawer implements OnDestroy {
  readonly open = model<boolean>(false);
  readonly side = input<DrawerSide>('right');
  readonly size = input<DrawerSize>('md');
  readonly closeOnEscape = input(true);
  readonly backdrop = input(true);
  readonly swipeHandle = input(false);
  readonly handleOnly = input(false);
  readonly scaleBackground = input(false);

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('drawerDialog');
  private readonly gesture = new DrawerGesture();

  private backdropMouseDown = false;
  private wasDragging = false;
  private isClosing = false;
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  protected readonly isVertical = computed(() => this.side() === 'top' || this.side() === 'bottom');
  protected readonly sideAxis = computed(() => (this.isVertical() ? 'y' : 'x'));

  constructor() {
    effect(() => {
      const isOpen = this.open();
      const dialog = this.dialogRef();
      const shouldScale = this.scaleBackground();

      untracked(() => {
        if (!dialog) return;

        const element = dialog.nativeElement;

        if (isOpen) {
          this.cancelClosing(element);

          if (!element.open) {
            element.showModal();
          }
          element.style.removeProperty('--zen-drawer-drag');
          element.style.removeProperty('--zen-drawer-height');
          element.style.removeProperty('--zen-drawer-width');

          if (shouldScale) {
            document.body.classList.add('zen-drawer-open');
          }
        } else if (element.open && !this.isClosing) {
          this.animateAndClose(element, shouldScale);
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    if (this.scaleBackground()) {
      document.body.classList.remove('zen-drawer-open');
    }
  }

  close(): void {
    this.open.set(false);
  }

  protected cancel(event: Event): void {
    event.preventDefault();
    if (this.closeOnEscape()) {
      this.close();
    }
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (!this.backdrop()) return;

    if (this.wasDragging) {
      this.wasDragging = false;
      this.backdropMouseDown = false;
      return;
    }

    if (!this.backdropMouseDown) return;
    this.backdropMouseDown = false;

    const dialog = this.dialogRef()?.nativeElement;
    if (!dialog || event.target !== dialog) return;

    if (this.isClickOutside(dialog, event)) {
      this.close();
    }
  }

  protected pointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;

    this.wasDragging = false;
    const dialog = this.dialogRef()?.nativeElement;

    if (dialog && event.target === dialog) {
      this.backdropMouseDown = this.isClickOutside(dialog, event);
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

  private animateAndClose(element: HTMLDialogElement, shouldScale: boolean): void {
    this.isClosing = true;

    if (shouldScale) {
      document.body.classList.remove('zen-drawer-open');
    }

    element.removeAttribute('data-swiping');
    element.setAttribute('data-closing', 'true');
    element.style.removeProperty('--zen-drawer-drag');

    const handleTransitionEnd = (event: TransitionEvent): void => {
      if (event.target === element && (event.propertyName === 'transform' || event.propertyName === 'opacity')) {
        element.removeEventListener('transitionend', handleTransitionEnd);
        this.finalizeClose(element);
      }
    };

    element.addEventListener('transitionend', handleTransitionEnd);

    this.closeTimeout = setTimeout(() => {
      element.removeEventListener('transitionend', handleTransitionEnd);
      this.finalizeClose(element);
    }, 350);
  }

  private finalizeClose(element: HTMLDialogElement): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    element.removeAttribute('data-closing');
    if (element.open) {
      element.close();
    }
    this.isClosing = false;
  }

  private cancelClosing(element: HTMLDialogElement): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.isClosing = false;
    element.removeAttribute('data-closing');
  }

  private isClickOutside(dialog: HTMLDialogElement, event: MouseEvent): boolean {
    const rect = dialog.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0
      ? event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
      : true;
  }

  private gestureCallbacks(): GestureCallbacks {
    const el = this.dialogRef()!.nativeElement;
    const vertical = this.isVertical();

    return {
      onOpenChange: (open: boolean) => this.open.set(open),
      setDragStyle: (cssVar: string, value: string) => el.style.setProperty(cssVar, value),
      removeDragStyle: (cssVar: string) => el.style.removeProperty(cssVar),
      getDimension: () => (vertical ? el.offsetHeight : el.offsetWidth),
      setPointerCapture: (id: number) => el.setPointerCapture(id),
      setAttribute: (name: string, value: string) => el.setAttribute(name, value),
      removeAttribute: (name: string) => el.removeAttribute(name),
      setOverscrollStyle: (sizePx: number) => {
        const prop = vertical ? 'height' : 'width';
        el.style.setProperty(prop, `${sizePx}px`);
      },
      removeOverscrollStyle: () => {
        el.style.removeProperty('width');
        el.style.removeProperty('height');
      },
    };
  }
}
