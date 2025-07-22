import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * ZenInput is a reusable text input component designed to provide
 * a consistent and customizable input style across the application.
 * It supports Angular forms integration and provides two-way data binding.
 *
 * @example
 * <zen-input value="string" />
 *
 * ### CSS Custom Properties
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-input-border: 1px solid hsl(0deg 0% 80%);
 *  --zen-input-border-radius: 8px;
 *  --zen-input-padding: 0.5rem 1rem;
 *  --zen-input-focus-shadow: 0 1px 4px hsl(0deg 0% 60% / 20%) inset;
 *  --zen-input-placeholder-color: hsl(0deg 0% 60%);
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
  styleUrls: ['./input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZenInput),
      multi: true,
    },
  ],
  imports: [FormsModule],
})
export class ZenInput implements ControlValueAccessor {
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
