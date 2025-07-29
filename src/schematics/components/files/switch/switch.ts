import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import { ZenFormControl, ZenFormControlProvider } from '../form-control';

/**
 * ZenInput is a reusable text input component designed to provide
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
  styleUrl: './switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ZenFormControlProvider(ZenSwitch)],
  host: {
    tabindex: '0',
    '[attr.data-disabled]': 'disabled()',
    '[attr.data-checked]': 'value()',
    '(blur)': 'onTouched()',
    '(click)': 'onInput(!this.value())',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ZenSwitch extends ZenFormControl<boolean> {
  /** Holds the current checkbox value. */
  readonly value = model(false);

  /**
   * Handles keyboard events for accessibility.
   */
  onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
      case 'Space': {
        event.preventDefault();
        this.onInput(!this.value());
        break;
      }
      case 'ArrowRight': {
        this.onInput(true);
        break;
      }
      case 'ArrowLeft': {
        this.onInput(false);
        break;
      }
    }
  }
}
