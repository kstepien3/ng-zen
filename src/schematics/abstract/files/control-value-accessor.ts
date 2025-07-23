import { booleanAttribute, Directive, forwardRef, input, model, ModelSignal, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ControlValueAccessorProvider = <T extends ZenControlValueAccessor<any>>(component: Type<T>) => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => component),
  multi: true,
});

@Directive({})
export abstract class ZenControlValueAccessor<Value> implements ControlValueAccessor {
  abstract readonly value: ModelSignal<Value>;

  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly disabled = model(false);
  readonly required = input(false, { transform: booleanAttribute });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: Value) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  onInput(value: Value): void {
    if (this.disabled()) return;

    this.value.set(value);
    this.onChange(this.value());
  }

  /** @ignore */
  writeValue(value: Value): void {
    this.value.set(value);
  }

  /** @ignore */
  registerOnChange(fn: (value: Value) => void): void {
    this.onChange = fn;
  }

  /** @ignore */
  registerOnTouched(fn: () => Value): void {
    this.onTouched = fn;
  }

  /** @ignore */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
