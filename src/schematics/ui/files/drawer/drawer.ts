import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  untracked,
  viewChild,
} from '@angular/core';

import { DrawerSide, DrawerSize, GestureCallbacks } from './drawer.types';
import { DrawerGesture } from './drawer-gesture';

/**
 * ZenDrawer is a reusable drawer component built on the native HTML `<dialog>` element.
 * It slides in from one of the four sides (`left`, `right`, `top`, `bottom`) and can be
 * dismissed by clicking the backdrop, pressing Escape, or dragging/swiping the panel.
 *
 * @example
 * ```html
 * <button zen-btn (click)="isOpen.set(true)">Open Drawer</button>
 *
 * <zen-drawer [(open)]="isOpen" side="right" size="md">
 *   <h2 drawer-header>Drawer Title</h2>
 *   <p>Drawer content</p>
 *   <div drawer-footer>
 *     <button zen-btn (click)="isOpen.set(false)" variant="filled" color="danger">Close</button>
 *   </div>
 * </zen-drawer>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 * ```css
 * :root {
 *   --zen-drawer-padding: 1rem;
 *   --zen-drawer-bg: #fff;
 *   --zen-drawer-leading-border-radius: 12px;
 *   --zen-drawer-shadow: 0 4px 24px rgb(0 0 0 / 20%);
 *   --zen-drawer-backdrop-bg: rgb(0 0 0 / 50%);
 *   --zen-drawer-overlay-min-opacity: 0;
 *   --zen-drawer-inset: 0px;
 *   --zen-drawer-drag: 0px;
 *   --zen-drawer-height: auto;
 *   --zen-size-inline-sm: clamp(16rem, 25vw, 24rem);
 *   --zen-size-inline-md: clamp(22rem, 40vw, 34rem);
 *   --zen-size-inline-lg: clamp(30rem, 55vw, 46rem);
 *   --zen-size-inline-xl: clamp(38rem, 70vw, 58rem);
 *   --zen-size-inline-full: calc(100% - var(--zen-drawer-inset) * 2);
 *   --zen-size-block-sm: clamp(14rem, 30dvh, 22rem);
 *   --zen-size-block-md: clamp(18rem, 45dvh, 30rem);
 *   --zen-size-block-lg: clamp(24rem, 60dvh, 38rem);
 *   --zen-size-block-xl: clamp(30rem, 75dvh, 46rem);
 *   --zen-size-block-full: calc(100% - var(--zen-drawer-inset) * 2);
 *   --zen-transition-duration: 0.3s;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [MDN Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 */
@Component({
  selector: 'zen-drawer',
  standalone: true,
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  host: {
    '(click)': 'onBackdropClick($event)',
  },
})
export class ZenDrawer {
  /** Controls the open state of the drawer. Supports two-way binding via `[(open)]`. When `true`, calls `showModal()`; when `false`, animates out and calls `close()` on the native dialog. */
  readonly open = model<boolean>(false);
  /** Side from which the drawer slides in. Sets the slide direction, drag axis, and which dimension `size` controls (`width` for `left`/`right`, `height` for `top`/`bottom`). */
  readonly side = input<DrawerSide>('right');
  /** Size variant of the drawer. For `left`/`right` sets `width`; for `top`/`bottom` sets `height` via the `data-size` attribute. */
  readonly size = input<DrawerSize>('md');
  /** Whether pressing Escape closes the drawer (bound to the native dialog `cancel` event). */
  readonly closeOnEscape = input(true);
  /** Whether clicking the backdrop closes the drawer. When `false`, backdrop clicks are ignored. */
  readonly backdrop = input(true);
  /** Whether to render a grab handle at the leading edge of the drawer. Also the drag affordance when `handleOnly` is enabled. */
  readonly swipeHandle = input(false);
  /** When `true`, only the swipe handle can initiate a drag-to-dismiss gesture; clicks and drags on the content are ignored. */
  readonly handleOnly = input(false);
  /** When `true`, scales the page behind the drawer down while open (requires styling `body.zen-drawer-open` in the host app). */
  readonly scaleBackground = input(false);

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('drawerDialog');
  private readonly gesture = new DrawerGesture();
  private readonly destroyRef = inject(DestroyRef);

  private backdropMouseDown = false;
  private wasDragging = false;
  private isClosing = false;
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  protected readonly isVertical = computed(() => this.side() === 'top' || this.side() === 'bottom');

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      if (this.scaleBackground()) {
        document.body.classList.remove('zen-drawer-open');
      }
    });

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

  /** Programmatically close the drawer (sets `open` to `false`). */
  close(): void {
    this.open.set(false);
  }

  /** Handles the native `cancel` event (Escape). Always prevents the default close; closes only when `closeOnEscape` is `true`. */
  protected cancel(event: Event): void {
    event.preventDefault();
    if (this.closeOnEscape()) {
      this.close();
    }
  }

  /** Closes on backdrop click unless a drag just ended or `backdrop` is disabled. */
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

  /** Registers a pointer as a potential drag source and records whether the press started on the backdrop. */
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

    this.gesture.pointerDown(event, this.side(), this.gestureCallbacks());
  }

  /** Routes pointer movement to the gesture engine; marks a completed drag so the trailing click is swallowed. */
  protected pointerMove(event: PointerEvent): void {
    this.gesture.pointerMove(event, this.side(), this.gestureCallbacks());
    if (this.gesture.isLocked) {
      this.wasDragging = true;
    }
  }

  /** Ends the drag gesture and lets the engine decide whether to close or snap back. */
  protected pointerUp(event: PointerEvent): void {
    this.gesture.pointerUp(event.pointerId, this.side(), this.gestureCallbacks());
  }

  /** Cancels an in-progress drag gesture (e.g. lost pointer) and resets drag state. */
  protected pointerCancel(event: PointerEvent): void {
    this.wasDragging = false;
    this.backdropMouseDown = false;
    this.gesture.pointerCancel(event.pointerId, this.side(), this.gestureCallbacks());
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
