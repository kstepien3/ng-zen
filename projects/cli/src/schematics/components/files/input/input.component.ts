import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * ZenInputComponent is a reusable text input component designed to provide
 * a consistent and customizable input style across the application.
 * It supports Angular forms integration and provides two-way data binding.
 *
 * @example
 * <zen-input value="string" />
 *
 * @implements {ControlValueAccessor}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen?tab=BSD-2-Clause-1-ov-file|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-input',
  standalone: true,
  template: `
    <input
      [attr.id]="id()"
      [attr.placeholder]="placeholder()"
      [attr.required]="required()"
      [disabled]="disabled()"
      [ngModel]="value()"
      [value]="value()"
      (blur)="onTouched()"
      (ngModelChange)="onInputChange($event)"
    />
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZenInputComponent),
      multi: true,
    },
  ],
  imports: [FormsModule],
})
export class ZenInputComponent implements ControlValueAccessor {
  /** Holds the current input value. */
  readonly value = model('');
  /** Determines if the input is disabled. */
  readonly disabled = model(false);
  /** Determines if the input is required.*/
  readonly required = input(false, { transform: booleanAttribute });
  /** Sets the HTML id attribute for the input element.*/
  readonly id = input<string>();
  /** Provides a hint or example text that will be displayed */
  readonly placeholder = input<string>();

  /** @ignore */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  /** @ignore */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  /** @ignore */
  writeValue(value: string): void {
    this.value.set(value);
  }
  /** @ignore */
  registerOnChange(fn: (value: string) => void): void {
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

  /** Handles input change event */
  onInputChange(value: string): void {
    if (this.disabled()) return;

    this.value.set(value);
    this.onChange(value);
  }
}
