import { booleanAttribute, Directive, input, model, ModelSignal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

/**
 * A base class for creating custom Angular form controls that integrate with
 * Signal Forms (via `[formField]`) and are backward compatible with
 * reactive and template-driven forms (via `[formControl]` / `[(ngModel)]`).
 *
 * Subclasses must provide an implementation for the abstract `value` property.
 *
 * Auto-generated helper — do not modify if you intend to regenerate later.
 *
 * @example
 *
 * ```ts
 * @Component({
 *   template: '...',
 * })
 * export class Input extends ZenFormControl<string> {
 *   readonly value = model<string>('')
 * }
 * ```
 *
 * @implements {FormValueControl}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Directive({})
export abstract class ZenFormControl<Value> implements FormValueControl<Value> {
  /**
   * The underlying value of the control.
   * Subclasses must provide their own implementation using `model()`.
   */
  abstract readonly value: ModelSignal<Value>;

  readonly disabled = input(false);
  readonly required = input(false, { transform: booleanAttribute });
  readonly touched = model(false);

  /**
   * Should be called by the subclass when the control's value changes
   * as a result of user interaction.
   */
  onInput(value: Value): void {
    if (this.disabled()) return;

    this.value.set(value);
    this.touched.set(true);
  }
}
