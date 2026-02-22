import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  OutputRef,
  OutputRefSubscription,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { ZenDialog } from './dialog';

type SignalValue<T> = T extends (...args: []) => infer V ? V : never;

type ComponentInputs<T> = Partial<{
  [K in keyof T as T[K] extends OutputRef<unknown> ? never : K]: SignalValue<T[K]>;
}>;

type ExtractOutputValue<T> = T extends OutputRef<infer V> ? V : never;

type ComponentOutputs<T> = Partial<{
  [K in keyof T as T[K] extends OutputRef<unknown> ? K : never]: (value: ExtractOutputValue<T[K]>) => void;
}>;

/**
 * Configuration options for opening a dialog via `ZenDialogService.open()`.
 *
 * @typeParam T - The dynamic component type that will be rendered inside the dialog.
 *
 * @example
 * ```typescript
 * interface MyComponent {
 *   readonly message: InputSignal<string>;
 *   readonly confirm: OutputRef<string>;
 * }
 *
 * const config: DialogConfig<MyComponent> = {
 *   header: 'Confirm Action',
 *   size: 'md',
 *   inputs: { message: 'Are you sure?' },
 *   outputs: {
 *     confirm: (value) => console.log(value),
 *   },
 * };
 * ```
 */
interface DialogConfig<T, TInputs = ComponentInputs<T>, TOutputs = ComponentOutputs<T>> {
  /**
   * Header title displayed at the top of the dialog.
   * Also used as the `aria-label` for accessibility.
   */
  header?: string;

  /**
   * Size variant of the dialog.
   * - `sm` - 300px width
   * - `md` - 500px width (default)
   * - `lg` - 800px width
   * - `xl` - 1100px width
   * - `full` - 100% width and height
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Input values to pass to the dynamic component.
   * These are automatically typed based on the component's signal inputs.
   *
   * The type system extracts the value types from `input()` and `input.required()`
   * signals, so you get full type safety.
   *
   * @example
   * ```typescript
   * // If your component has:
   * readonly message = input.required<string>();
   * readonly count = input<number>(0);
   *
   * // Then inputs is typed as:
   * inputs: { message: string; count?: number }
   * ```
   */
  inputs?: TInputs;

  /**
   * Output handlers to subscribe to the dynamic component's outputs.
   * These are automatically typed based on the component's `output()` signals.
   *
   * Subscriptions are automatically cleaned up when the dialog closes.
   *
   * @example
   * ```typescript
   * // If your component has:
   * readonly confirm = output<string>();
   * readonly cancel = output<void>();
   *
   * // Then outputs is typed as:
   * outputs: {
   *   confirm?: (value: string) => void;
   *   cancel?: () => void;
   * }
   * ```
   */
  outputs?: TOutputs;

  /**
   * Whether to show the close button (X) in the header.
   * @default true
   */
  closable?: boolean;

  /**
   * Whether clicking the backdrop closes the dialog.
   * @default true
   */
  backdrop?: boolean;

  /**
   * Whether pressing the Escape key closes the dialog.
   * @default true
   */
  closeOnEscape?: boolean;
}

/**
 * Reference to an opened dialog instance.
 *
 * Provides access to:
 * - `close()` method to programmatically close the dialog
 * - `componentInstance` to access the dynamic component instance
 *
 * The `DialogRef` is also available for injection inside the dynamic component
 * via the `DIALOG_REF` injection token, allowing the component to close itself.
 *
 * @typeParam T - The type of the dynamic component instance.
 *
 * @example
 * ```typescript
 * // Close dialog from outside
 * const ref = dialog.open(MyComponent, config);
 * ref.close();
 *
 * // Access component instance
 * ref.componentInstance.someMethod();
 * ```
 */
class DialogRef<T> {
  constructor(
    private readonly closeFn: () => void,
    public componentInstance: T
  ) {}

  /**
   * Closes the dialog.
   * This will destroy the dynamic component and clean up all subscriptions.
   */
  close(): void {
    this.closeFn();
  }
}

/**
 * Injection token for accessing the `DialogRef` from within a dynamic dialog component.
 *
 * This allows the dynamic component to close itself without relying on output events.
 *
 * @example
 * ```typescript
 * import { DIALOG_REF, DialogRef } from '@ng-zen/dialog';
 *
 * @Component({
 *   template: `
 *     <p>Dialog content</p>
 *     <button (click)="close()">Close</button>
 *   `,
 * })
 * class MyDialogContent {
 *   private readonly dialogRef = inject(DIALOG_REF) as DialogRef<MyDialogContent>;
 *
 *   close() {
 *     this.dialogRef.close();
 *   }
 *
 *   // You can also access the component instance
 *   doSomething() {
 *     this.dialogRef.componentInstance; // This is MyDialogContent
 *   }
 * }
 * ```
 */
const DIALOG_REF = new InjectionToken<DialogRef<unknown>>('DIALOG_REF');

/**
 * Service for dynamically opening dialogs with custom components.
 *
 * The service creates a `ZenDialog` component and renders your custom component
 * inside it. It handles all lifecycle management including:
 * - Creating and destroying the dialog
 * - Passing inputs to the dynamic component
 * - Subscribing to outputs and cleaning up subscriptions
 * - Providing `DIALOG_REF` for programmatic closing
 *
 * ### Basic Usage
 *
 * @example
 * ```typescript
 * @Component({
 *   template: `
 *     <p>{{ message() }}</p>
 *     <button (click)="confirm.emit()">Confirm</button>
 *   `,
 * })
 * class ConfirmDialog {
 *   readonly message = input.required<string>();
 *   readonly confirm = output<void>();
 * }
 *
 * // In a component or service:
 * @Component({ ... })
 * class MyComponent {
 *   private readonly dialog = inject(ZenDialogService);
 *
 *   showConfirm() {
 *     const ref = this.dialog.open(ConfirmDialog, {
 *       header: 'Confirm Action',
 *       inputs: { message: 'Are you sure?' },
 *       outputs: {
 *         confirm: () => {
 *           // Handle confirmation
 *           ref.close();
 *         },
 *       },
 *     });
 *   }
 * }
 * ```
 *
 * ### Closing from Inside the Component
 *
 * Use `DIALOG_REF` injection token to close the dialog from within the dynamic component:
 *
 * @example
 * ```typescript
 * @Component({
 *   template: `
 *     <p>{{ message() }}</p>
 *     <button (click)="close()">Close</button>
 *   `,
 * })
 * class SelfClosingDialog {
 *   readonly message = input.required<string>();
 *   private readonly dialogRef = inject(DIALOG_REF) as DialogRef<SelfClosingDialog>;
 *
 *   close() {
 *     this.dialogRef.close();
 *   }
 * }
 *
 * // Usage - no need for outputs
 * this.dialog.open(SelfClosingDialog, {
 *   header: 'Info',
 *   inputs: { message: 'Some info message' },
 * });
 * ```
 *
 * ### Type Safety
 *
 * The service provides full type safety for inputs and outputs:
 *
 * @example
 * ```typescript
 * @Component({ ... })
 * class TypedDialog {
 *   readonly title = input.required<string>();
 *   readonly count = input<number>(0);
 *   readonly submit = output<{ value: string }>();
 * }
 *
 * // TypeScript will enforce correct types:
 * this.dialog.open(TypedDialog, {
 *   inputs: {
 *     title: 'Required',  // ✅ string
 *     count: 5,          // ✅ number (optional)
 *   },
 *   outputs: {
 *     submit: (data) => {
 *       data.value; // ✅ typed as string
 *     },
 *   },
 * });
 *
 * // ❌ Error: submit is not a valid input
 * inputs: { submit: undefined }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Injectable()
class ZenDialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);

  private dialogRef: ComponentRef<ZenDialog> | null = null;
  private subscriptions: OutputRefSubscription[] = [];
  private contentRef: ComponentRef<unknown> | null = null;

  /**
   * Opens a dialog with the specified component as content.
   *
   * @typeParam T - The type of the dynamic component.
   * @param component - The component class to render inside the dialog.
   * @param config - Configuration options for the dialog.
   * @returns A `DialogRef` with access to the component instance and close method.
   *
   * @example
   * ```typescript
   * const ref = this.dialog.open(MyComponent, {
   *   header: 'My Dialog',
   *   size: 'lg',
   *   inputs: { message: 'Hello' },
   *   outputs: {
   *     confirm: (value) => {
   *       console.log(value);
   *       ref.close();
   *     },
   *   },
   * });
   *
   * // Close later
   * ref.close();
   * ```
   */
  open<T>(component: Type<T>, config?: DialogConfig<T>): DialogRef<T> {
    if (this.dialogRef) {
      this.closeInternal();
    }

    this.dialogRef = createComponent(ZenDialog, {
      environmentInjector: this.injector,
    });

    this.dialogRef.instance.open.set(true);

    const inputMappings: Record<string, string | boolean | undefined> = {
      header: config?.header,
      size: config?.size,
      closable: config?.closable,
      backdrop: config?.backdrop,
      closeOnEscape: config?.closeOnEscape,
    };

    for (const [key, value] of Object.entries(inputMappings)) {
      if (value !== undefined) {
        this.dialogRef.setInput(key, value);
      }
    }

    this.appRef.attachView(this.dialogRef.hostView);

    const dialogElement = this.dialogRef.location.nativeElement as HTMLDialogElement;
    document.body.appendChild(dialogElement);

    const dialogRefInstance = new DialogRef<T>(() => this.closeInternal(), null as T);

    const elementInjector = Injector.create({
      parent: this.dialogRef.injector,
      providers: [{ provide: DIALOG_REF, useValue: dialogRefInstance }],
    });

    this.contentRef = this.dialogRef.injector.get(ViewContainerRef).createComponent(component, {
      environmentInjector: this.injector,
      injector: elementInjector,
    });

    dialogRefInstance.componentInstance = this.contentRef.instance as T;

    const contentElement = this.contentRef.location.nativeElement;
    const contentContainer = dialogElement.querySelector('.zen-dialog-content');
    contentContainer?.appendChild(contentElement);

    if (config?.inputs) {
      const inputs = config.inputs as Record<string, unknown>;
      for (const [key, value] of Object.entries(inputs)) {
        this.contentRef.setInput(key, value);
      }
    }

    if (config?.outputs) {
      const outputs = config.outputs as Record<string, (value: unknown) => void>;
      for (const [key, handler] of Object.entries(outputs)) {
        const output = (this.contentRef.instance as Record<string, unknown>)[key];
        if (this.isOutputRef(output)) {
          const subscription = output.subscribe(handler);
          this.subscriptions.push(subscription);
        }
      }
    }

    dialogElement.addEventListener('close', () => this.closeInternal(), { once: true });

    return dialogRefInstance;
  }

  private isOutputRef(value: unknown): value is OutputRef<unknown> {
    return value !== null && typeof value === 'object' && 'subscribe' in value;
  }

  private closeInternal(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    this.contentRef?.destroy();
    this.contentRef = null;

    if (this.dialogRef) {
      const dialogElement = this.dialogRef.location.nativeElement as HTMLDialogElement;
      if (dialogElement.open) {
        dialogElement.close();
      }

      this.appRef.detachView(this.dialogRef.hostView);
      dialogElement.remove();
      this.dialogRef.destroy();
      this.dialogRef = null;
    }
  }
}

export { DIALOG_REF, ZenDialogService };
export type { DialogConfig, DialogRef };
