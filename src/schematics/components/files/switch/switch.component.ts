import { ChangeDetectionStrategy, Component, forwardRef, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * ZenInputComponent is a reusable text input component designed to provide
 * a consistent and customizable input style across the application.
 * It supports Angular forms integration and provides two-way data binding.
 *
 * @example
 *
 * ```html
 * <zen-switch [disabled]="false" [value]="true" />
 *```
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
  selector: 'zen-switch',
  template: `
    <span class="switch-handle">
      <!-- @if (value()) { ✓ } -->
      <!-- @if (!value()) { ─ } -->
    </span>
  `,
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZenSwitchComponent),
      multi: true,
    },
  ],
  host: {
    tabindex: '0',
    '[attr.data-disabled]': 'disabled()',
    '[attr.data-checked]': 'value()',
    '(blur)': 'onTouched()',
    '(click)': 'onInputChange(!this.value())',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ZenSwitchComponent implements ControlValueAccessor {
  /** Holds the current checkbox value. */
  readonly value = model(false);
  /** Determines if the checkbox is disabled. */
  readonly disabled = model(false);

  /** @ignore */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  /** @ignore */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};
  /**
   * Writes a new value to the component.
   * @ignore
   */
  writeValue(value: boolean): void {
    this.value.set(value);
  }

  /**
   * Registers a function to be called when the value changes.
   * @ignore
   */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a function to be called when the component is touched.
   * @ignore
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the component.
   * @ignore
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /**
   * Toggles the switch value and notifies the change.
   */
  onInputChange(value: boolean): void {
    if (this.disabled()) return;

    this.writeValue(value);
    this.onChange(value);
  }

  /**
   * Handles keyboard events for accessibility.
   */
  onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
      case 'Space': {
        event.preventDefault();
        this.onInputChange(!this.value());
        break;
      }
      case 'ArrowRight': {
        this.onInputChange(true);
        break;
      }
      case 'ArrowLeft': {
        this.onInputChange(false);
        break;
      }
    }
  }
}
