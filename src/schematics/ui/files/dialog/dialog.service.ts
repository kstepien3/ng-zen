import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  DestroyRef,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  OutputRef,
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

type ZenDialogInputs = Partial<ComponentInputs<Omit<ZenDialog, 'open'>>>;

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

interface DialogConfig<T, TInputs = ComponentInputs<T>, TOutputs = ComponentOutputs<T>> extends ZenDialogInputs {
  /** Input values for the dynamic component. */
  inputs?: TInputs;

  /** Output handlers for the dynamic component's outputs. */
  outputs?: TOutputs;
}

/** Reference to an opened dialog. Provides `close()` and `componentInstance`. */
class DialogRef<T> {
  public componentInstance!: T;

  constructor(private readonly closeFn: () => void) {}

  close(): void {
    this.closeFn();
  }
}

/** Injection token to access DialogRef from within the dynamic component. */
const DIALOG_REF = new InjectionToken<DialogRef<unknown>>('DIALOG_REF');

/**
 * ZenDialogService provides methods to dynamically open dialogs with custom components.
 *
 * @example
 * ```typescript
 * const ref = this.dialogService.open(MyComponent, {
 *   header: 'My Dialog',
 *   size: 'md',
 *   inputs: { message: 'Hello!' },
 *   outputs: { confirm: () => ref.close() },
 * });
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [MDN Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 */
@Injectable()
class ZenDialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);

  private dialogRef: ComponentRef<ZenDialog> | null = null;
  private contentRef: ComponentRef<unknown> | null = null;

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => this.closeInternal());
  }

  /**
   * Opens a dialog with the specified component as content.
   *
   * @example
   * ```typescript
   * const ref = this.dialog.open(MyComponent, {
   *   header: 'My Dialog',
   *   size: 'md',
   *   inputs: { message: 'Hello!' },
   *   outputs: { confirm: () => ref.close() },
   * });
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

    const { inputs, outputs, ...inputMappings } = config || {};

    for (const [key, value] of Object.entries(inputMappings)) {
      if (value !== undefined) {
        this.dialogRef.setInput(key, value);
      }
    }

    this.appRef.attachView(this.dialogRef.hostView);

    const dialogElement = this.dialogRef.location.nativeElement as HTMLDialogElement;
    document.body.appendChild(dialogElement);

    const dialogRefInstance = new DialogRef<T>(() => this.closeInternal());

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

    if (inputs) {
      for (const [key, value] of Object.entries(inputs)) {
        this.contentRef.setInput(key, value);
      }
    }

    if (outputs) {
      const destroyRef = this.contentRef.injector.get(DestroyRef);

      for (const [key, handler] of Object.entries(outputs as Record<string, (value: unknown) => void>)) {
        const output = (this.contentRef.instance as Record<string, unknown>)[key];
        if (this.isOutputRef(output)) {
          const subscription = output.subscribe(handler);

          destroyRef.onDestroy(() => subscription.unsubscribe());
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
    if (!this.dialogRef) return;

    const dialogElement = this.dialogRef.location.nativeElement as HTMLDialogElement;
    if (dialogElement.open) {
      dialogElement.close();
    }

    this.contentRef?.destroy();
    this.contentRef = null;

    dialogElement.remove();

    this.dialogRef.destroy();
    this.dialogRef = null;
  }
}

export { DIALOG_REF, ZenDialogService };
export type { DialogConfig, DialogRef };
