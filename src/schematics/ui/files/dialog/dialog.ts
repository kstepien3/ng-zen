import { Component, effect, ElementRef, inject, input, model, untracked } from '@angular/core';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

import { ZenIcon } from '../icon';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * ZenDialog is a reusable dialog component built on the native HTML `<dialog>` element.
 * It provides a modal dialog with customizable header, size, and content.
 *
 * @example
 * ```html
 * <dialog zen-dialog [(open)]="isOpen" header="Dialog Title" size="md">
 *   <p>Dialog content</p>
 * </dialog>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 * ```css
 * :root {
 *   --zen-dialog-padding: 1rem;
 *   --zen-dialog-bg: white;
 *   --zen-dialog-border-radius: 8px;
 *   --zen-dialog-shadow: 0 4px 24px rgb(0 0 0 / 20%);
 *   --zen-dialog-max-height: 90vh;
 *   --zen-dialog-max-width: 90vw;
 *   --zen-dialog-backdrop-bg: rgba(0, 0, 0, 0.5);
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [MDN Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dialog[zen-dialog]',
  template: `
    @if (header()) {
      <header class="zen-dialog-header">
        <h2>{{ header() }}</h2>
        @if (closable()) {
          <button (click)="onClose()" aria-label="Close dialog" class="zen-dialog-close" type="button">
            <zen-icon [icon]="closeIcon" [size]="20" />
          </button>
        }
      </header>
    }
    <div class="zen-dialog-content">
      <ng-content />
    </div>
  `,
  styleUrl: './dialog.scss',
  imports: [ZenIcon],
  host: {
    '[attr.aria-label]': 'header()',
    '[attr.data-size]': 'size()',
    '(close)': 'onClose()',
    '(cancel)': 'onCancel($event)',
    '(click)': 'onDialogClick($event)',
  },
})
export class ZenDialog {
  /**
   * Controls the open state of the dialog.
   * Supports two-way binding via `[(open)]` syntax.
   * When set to `true`, calls `showModal()` on the native dialog element.
   * When set to `false`, calls `close()` on the native dialog element.
   */
  readonly open = model<boolean>(false);

  /**
   * Header title displayed at the top of the dialog.
   * Also used as the `aria-label` for accessibility.
   */
  readonly header = input<string>('');

  /**
   * Size variant of the dialog.
   * Affects the width of the dialog via the `data-size` attribute.
   */
  readonly size = input<DialogSize>('md');

  /**
   * Whether to show the close button (X) in the header.
   */
  readonly closable = input(true);

  /**
   * Whether clicking the backdrop closes the dialog.
   * This is a native dialog feature.
   */
  readonly backdrop = input(true);

  /**
   * Whether pressing the Escape key closes the dialog.
   * This is a native dialog feature.
   */
  readonly closeOnEscape = input(true);

  protected readonly closeIcon = Cancel01Icon;

  private readonly elementRef = inject(ElementRef<HTMLDialogElement>);

  constructor() {
    effect(() => {
      const isOpen = this.open();
      const element = this.elementRef.nativeElement;

      untracked(() => {
        if (isOpen) {
          element.showModal();
        } else if (element.open) {
          element.close();
        }
      });
    });
  }

  /** Close on backdrop click */
  protected onDialogClick(event: MouseEvent): void {
    if (!this.backdrop()) return;

    if ((event.target as HTMLElement).tagName === 'DIALOG') {
      this.onClose();
    }
  }

  protected onCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
    }
  }

  protected onClose(): void {
    this.open.set(false);
  }
}
