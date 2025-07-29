import { booleanAttribute, Directive, forwardRef, input, model, ModelSignal, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ZenFormControlProvider = <T extends ZenFormControl<any>>(component: Type<T>) => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => component),
  multi: true,
});

/**
 * A base class for creating custom Angular form controls that integrate with both
 * template-driven and reactive forms. It simplifies the implementation of the
 * ControlValueAccessor interface by using signals for the control's value and state.
 *
 * Subclasses must provide an implementation for the abstract `value` property.
 *
 * @example
 *
 * ```ts
 * @Component({
 *   template: '...',
 *   providers: [ZenFormControlProvider(ZenInput)]
 * })
 * export class Input extends ZenFormControl<string> {
 *   readonly value = model<string>('')
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Directive({})
export abstract class ZenFormControl<Value> implements ControlValueAccessor {
  /**
   * The underlying value of the control.
   * Subclasses must provide their own implementation, typically using `model()`.
   */
  abstract readonly value: ModelSignal<Value>;

  /** The placeholder text for the form control. */
  readonly placeholder = input<string>();

  /**
   * Whether the form control is disabled.
   */
  readonly disabled = model(false);

  /** Whether the form control is required. */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * @internal For internal use by Angular forms.
   * @ignore
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: Value) => void = () => {};

  /**
   * @internal For internal use by Angular forms.
   * @ignore
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  /**
   * Should be called by the subclass when the control's value changes
   * as a result of user interaction. This method updates the control's value
   * and notifies Angular of the change.
   */
  onInput(value: Value): void {
    if (this.disabled()) return;

    this.value.set(value);
    this.onChange(this.value());
  }

  /**
   * Writes a new value to the element.
   * @internal For internal use by Angular forms.
   * @ignore
   */
  writeValue(value: Value): void {
    this.value.set(value);
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   * @internal For internal use by Angular forms.
   * @ignore
   */
  registerOnChange(fn: (value: Value) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that is called by the forms API on component touch.
   * @internal For internal use by Angular forms.
   * @ignore
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * This function is called by the forms API when the control status changes to or from "DISABLED".
   * @internal For internal use by Angular forms.
   * @ignore
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
