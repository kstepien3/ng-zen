import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';

/**
 * ZenCheckboxComponent is a reusable checkbox component designed to provide
 * a consistent and customizable checkbox style across the application.
 * It supports Angular forms integration and provides two-way data binding
 * for boolean values.
 *
 * @example
 * <zen-checkbox checked="boolean" />
 *
 * @implements {ControlValueAccessor}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/Kordrad/ng-zen?tab=BSD-2-Clause-1-ov-file|BSD-2-Clause}
 * @see [GitHub](https://github.com/Kordrad/ng-zen)
 */
@Component({
  selector: 'zen-checkbox',
  standalone: true,
  template: `
    <input
      [attr.id]="id()"
      [disabled]="disabled()"
      [value]="value()"
      (blur)="onTouched()"
      (change)="onInputChange($event)"
      type="checkbox"
    />
  `,
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZenCheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenCheckboxComponent implements ControlValueAccessor {
  /** Holds the current checkbox value. */
  readonly value = model(false);
  /** Determines if the checkbox is disabled. */
  readonly disabled = model(false);
  /** Determines if the input is required.*/
  readonly required = input(false, { transform: booleanAttribute });
  /** Sets the HTML id attribute for the checkbox element. */
  readonly id = input<string>();

  /** @ignore */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  /** @ignore */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  /** @ignore */
  writeValue(value: boolean): void {
    this.value.set(value);
  }

  /** @ignore */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /** @ignore */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** @ignore */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /** Handles checkbox change event */
  onInputChange(event: Event): void {
    if (this.disabled()) return;

    const newValue = (event.target as HTMLInputElement).checked;
    this.value.set(newValue);
    this.onChange(newValue);
  }
}
