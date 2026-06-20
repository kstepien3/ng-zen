import { booleanAttribute, Directive, input, model, ModelSignal } from '@angular/core';
import type { DisabledReason, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { FormValueControl } from '@angular/forms/signals';

/**
 * Abstract base class for custom Angular form controls that integrate with
 * Signal Forms.
 *
 * Decorated with `@Directive` only to declare the host event binding
 * `(blur) -> touched.set(true)`. Not intended for standalone use.
 *
 * Implements the {@link FormValueControl} contract. The Signal Forms
 * directive auto-binds state (value, disabled, errors, touched, dirty,
 * etc.) to matching inputs declared on the subclass.
 *
 * Subclasses must implement the abstract `value` model signal.
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
    '(blur)': 'touched.set(true)',
  },
})
export abstract class ZenFormControl<Value> implements FormValueControl<Value> {
  /**
   * The underlying value of the control.
   * Subclasses must provide their own implementation using `model()`.
   */
  abstract readonly value: ModelSignal<Value>;

  /** Whether the control is disabled. Auto-bound by the Signal Forms directive. */
  readonly disabled = input(false);
  /** Whether the field is required. Auto-bound by the Signal Forms directive from schema validators*/
  readonly required = input(false, { transform: booleanAttribute });
  /** Whether the user has interacted with the field. Two-way bound with the Signal Forms directive. */
  readonly touched = model<boolean>(false);
  /** Whether the field value has been modified. Auto-bound by the Signal Forms directive. */
  readonly dirty = input(false);
  /** Whether the field has validation errors. Auto-bound by the Signal Forms directive. */
  readonly invalid = input(false);
  /** Whether async validation is in progress. Auto-bound by the Signal Forms directive. */
  readonly pending = input(false);
  /** Whether the field is hidden. Auto-bound by the Signal Forms directive. */
  readonly hidden = input(false);
  /** Whether the field is read-only. Auto-bound by the Signal Forms directive. */
  readonly readonly = input(false);
  /** Field name in the form. Auto-bound by the Signal Forms directive. */
  readonly name = input('');
  /** Validation errors for the field. Auto-bound by the Signal Forms directive. */
  readonly errors = input<readonly ValidationError[]>([]);
  /** Reasons why the field is disabled. Auto-bound by the Signal Forms directive. */
  readonly disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  focus(_options?: FocusOptions): void {
    // overridden by subclasses when host focus is needed
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset(): void {}

  /**
   * Should be called by the subclass when the control's value changes
   * as a result of user interaction.
   */
  onInput(value: Value): void {
    if (this.disabled()) return;

    this.value.set(value);
  }
}
