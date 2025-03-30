import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * ZenTextareaComponent is a reusable textarea component designed to provide
 * a consistent and customizable textarea style across the application.
 * It supports Angular forms integration and provides two-way data binding.
 *
 * @example
 * <zen-textarea value="string" />
 *
 * @implements {ControlValueAccessor}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen?tab=BSD-2-Clause-1-ov-file|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 *
 * @TODO Content projectile. Textarea doesn't support `<ng-content/>` it needs workaround.
 */
@Component({
  selector: 'zen-textarea, zen-textarea[autoresize]',
  standalone: true,
  template: `
    <textarea
      [attr.id]="id()"
      [attr.placeholder]="placeholder()"
      [attr.required]="required()"
      [disabled]="disabled()"
      [ngModel]="value()"
      [value]="value()"
      (blur)="onTouched()"
      (ngModelChange)="onInputChange($event)"
    ></textarea>
  `,
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZenTextareaComponent),
      multi: true,
    },
  ],
  imports: [FormsModule],
})
export class ZenTextareaComponent implements ControlValueAccessor {
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
