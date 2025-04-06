import { ChangeDetectionStrategy, Component, forwardRef, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
