import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, model, untracked } from '@angular/core';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

import { ZenIcon } from '../icon';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * ZenDialog is a reusable dialog component built on the native HTML `<dialog>` element.
 * It provides a modal dialog with customizable header, size, and content.
 *
 * The dialog supports two usage patterns:
 * 1. **Declarative** - Using the component directly in templates with two-way binding
 * 2. **Dynamic** - Using `ZenDialogService` to open dialogs with custom components
 *
 * ### Declarative Usage
 * Use the dialog directly in your template with two-way binding on the `open` signal:
 *
 * @example
 * ```html
 * <dialog zen-dialog [(open)]="isOpen" header="Dialog Title" size="md">
 *   <p>Dialog content goes here</p>
 *   <button zen-btn (click)="isOpen.set(false)">Close</button>
 * </dialog>
 * ```
 *
 * ### Dynamic Usage
 * Use `ZenDialogService.open()` to dynamically render a component inside the dialog:
 *
 * @example
 * ```typescript
 * // Your dialog content component
 * @Component({
 *   template: `
 *     <p>{{ message() }}</p>
 *     <button (click)="confirm.emit('confirmed')">Confirm</button>
 *   `,
 * })
 * class MyDialogContent {
 *   readonly message = input.required<string>();
 *   readonly confirm = output<string>();
 * }
 *
 * // Open dialog from a component
 * const ref = this.dialog.open(MyDialogContent, {
 *   header: 'My Dialog',
 *   size: 'lg',
 *   inputs: { message: 'Hello!' },
 *   outputs: {
 *     confirm: (value) => {
 *       console.log(value);
 *       ref.close();
 *     },
 *   },
 * });
 * ```
 *
 * ### Closing from Inside the Component
 * Inject `DIALOG_REF` to close the dialog from within the dynamic component:
 *
 * @example
 * ```typescript
 * import { DIALOG_REF, DialogRef } from '@ng-zen/dialog';
 *
 * @Component({ ... })
 * class MyDialogContent {
 *   private readonly dialogRef = inject(DIALOG_REF) as DialogRef<MyDialogContent>;
 *
 *   close() {
 *     this.dialogRef.close();
 *   }
 * }
 * ```
 *
 * ### Native Dialog Features
 * The component leverages the native `<dialog>` element features:
 * - `showModal()` - Opens as a modal with backdrop
 * - ESC key closes the dialog (configurable via `closeOnEscape`)
 * - Backdrop click closes the dialog (configurable via `backdrop`)
 * - Focus trap is handled automatically
 * - Top layer positioning (above all other elements)
 *
 * ### Size Variants
 * - `sm` - 300px width
 * - `md` - 500px width (default)
 * - `lg` - 800px width
 * - `xl` - 1100px width
 * - `full` - 100% width and height
 *
 * ### CSS Custom Properties
 * Customize the dialog appearance using CSS custom properties:
 *
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZenIcon],
  host: {
    '[attr.aria-label]': 'header()',
    '[attr.data-size]': 'size()',
    '(close)': 'onDialogClose()',
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
   * @default 'md'
   */
  readonly size = input<DialogSize>('md');

  /**
   * Whether to show the close button (X) in the header.
   * @default true
   */
  readonly closable = input(true);

  /**
   * Whether clicking the backdrop closes the dialog.
   * This is a native dialog feature.
   * @default true
   */
  readonly backdrop = input(true);

  /**
   * Whether pressing the Escape key closes the dialog.
   * This is a native dialog feature.
   * @default true
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

  protected onClose(): void {
    this.open.set(false);
  }

  protected onDialogClose(): void {
    this.open.set(false);
  }
}
