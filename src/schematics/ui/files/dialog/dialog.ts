import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, model, untracked } from '@angular/core';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

import { ZenIcon } from '../icon';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Native dialog component with customizable header and sizes.
 *
 * @example
 * ```html
 * <dialog zen-dialog [(open)]="isOpen" header="Dialog Title" size="md">
 *   <p>Dialog content</p>
 * </dialog>
 * ```
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZenIcon],
  host: {
    '[attr.aria-label]': 'header()',
    '[attr.data-size]': 'size()',
    '(close)': 'onClose()',
    '(click)': 'onDialogClick($event)',
  },
})
export class ZenDialog {
  private static uniqueId = 0;

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
   * Affects the width of the dialog via `data-size` attribute.
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

  /**
   * Unique identifier for the dialog element.
   * Auto-generated if not provided.
   */
  readonly id = input(`zen-dialog-${ZenDialog.uniqueId++}`);

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

  protected onClose(): void {
    this.open.set(false);
  }
}
