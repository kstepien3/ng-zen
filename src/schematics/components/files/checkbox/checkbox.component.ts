import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * ZenCheckboxComponent is a reusable checkbox component designed to provide
 * a consistent and customizable checkbox style across the application.
 * It supports Angular forms integration and provides two-way data binding
 * for boolean values.
 *
 * @example
 * <zen-checkbox value="false" />
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-checkbox-size: 16px;
 *  --zen-checkbox-border-radius: 6px;
 *  --zen-checkbox-focus-shadow: 0 1px 4px hsl(0deg 0% 60% / 20%) inset;
 *  --zen-checkbox-appearance: hsl(0deg 0% 10%);
 *  --zen-checkbox-disabled-opacity: 0.6;
 *  --zen-checkbox-border: 1px solid hsl(0deg 0% 80%);
 * }
 * ```
 *
 * @implements {ControlValueAccessor}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-checkbox',
  standalone: true,
  template: `
    <input
      [attr.aria-disabled]="disabled()"
      [attr.id]="id()"
      [disabled]="disabled()"
      [ngModel]="value()"
      (ngModelChange)="onInputChange($event)"
      #inputElement
      type="checkbox"
    />
    @if (inputElement.indeterminate) {
      ─
    } @else if (inputElement.checked) {
      ✓
    }
    <!-- @else { ✕ } -->
  `,
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZenCheckboxComponent),
      multi: true,
    },
  ],
  host: {
    '(blur)': 'onTouched()',
  },
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
  onInputChange(value: boolean): void {
    if (this.disabled()) return;

    this.value.set(value);
    this.onChange(value);
  }
}
