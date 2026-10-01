import {
  booleanAttribute,
  computed,
  contentChild,
  Directive,
  input,
  ModelSignal,
  output,
  TemplateRef,
} from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';
import { FormValueControl } from '@angular/forms/signals';

/**
 * Abstract base class for form controls that integrate with Signal Forms
 * via the {@link FormValueControl} interface.
 *
 * Provides all {@link FormUiControl} state inputs (`disabled`, `required`,
 * `touched`, `errors`, etc.) and the `touch` output used by the
 * `[formField]` directive.
 *
 * Subclasses must provide an implementation of the `value` model signal
 * with the appropriate value type.
 *
 * Decorated with `@Directive` only to declare the host event binding
 * `(blur) -> touch.emit()`.
 *
 * @example
 *
 * ```ts
 * @Component({
 *   selector: 'my-input',
 *   template: `<input [value]="value()" (input)="onInput($event.target.value)" />`,
 * })
 * export class MyInput extends ZenFormControl<string> {
 *   readonly value = model<string>('');
 * }
 * ```
 *
 * @implements {FormValueControl}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Directive({
  host: {
    '(focusout)': 'touch.emit()',
  },
})
export abstract class ZenFormControl<Value> implements FormValueControl<Value> {
  private static uniqueId = 0;

  /** HTML id attribute for the control and its label. Defaults to an auto-generated unique id. */
  readonly id = input<string>(`zen-control-${ZenFormControl.uniqueId++}`);
  /** Label text displayed for the form control. */
  readonly label = input<string>('');
  /** Informational hint message displayed when there are no errors. */
  readonly hint = input<string>('');
  /** Warning message displayed when there are no errors. */
  readonly warn = input<string>('');

  /** Custom template to render validation errors: `<ng-template #error let-error>` */
  readonly errorTemplate = contentChild<TemplateRef<{ $implicit: ValidationError.WithOptionalFieldTree }>>('error');

  /** Whether validation errors should be displayed (invalid + touched/dirty). */
  readonly shouldShowError = computed(() => {
    return this.invalid() && (this.touched() || this.dirty()) && this.errors().length > 0;
  });

  /** Validation errors for the field. Auto-bound by the Signal Forms directive. */
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  /** Whether the control is disabled. Auto-bound by the Signal Forms directive. */
  readonly disabled = input(false);
  /** Whether the field is read-only. Auto-bound by the Signal Forms directive. */
  readonly readonly = input<boolean>(false);
  /** Whether the field is hidden from view. Auto-bound by the Signal Forms directive. */
  readonly hidden = input<boolean>(false);
  /** Whether the field has validation errors. Auto-bound by the Signal Forms directive. */
  readonly invalid = input<boolean>(false);
  /** Whether async validation is in progress. Auto-bound by the Signal Forms directive. */
  readonly pending = input<boolean>(false);
  /** Whether the user has focused and then blurred the field. */
  readonly touched = input<boolean>(false);
  /** Whether the field value has been modified. Auto-bound by the Signal Forms directive. */
  readonly dirty = input(false);
  /** Field name in the form. Auto-bound by the Signal Forms directive. */
  readonly name = input('');
  /** Whether the field is required. Auto-bound by the Signal Forms directive from schema validators. */
  readonly required = input(false, { transform: booleanAttribute });
  /** Emitted when the field is blurred. The {@link FormField} directive listens to this output to mark the field as touched. */
  readonly touch = output<void>();

  /** The underlying value of the control. Subclasses must provide their own implementation using `model()`. */
  abstract readonly value: ModelSignal<Value>;

  // @ignore

  focus(_options?: FocusOptions): void {}

  // @ignore

  reset(): void {}

  /** Should be called by the subclass when the control's value changes as a result of user interaction. */
  onInput(value: Value): void {
    if (this.disabled()) return;

    this.value.set(value);
  }
}
