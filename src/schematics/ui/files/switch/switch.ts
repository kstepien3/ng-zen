import { Component, model } from '@angular/core';

import { ZenFormControl } from '../form-control';

/**
 * ZenSwitch is a toggle switch component for boolean values backed by
 * Signal Forms.
 *
 * Connect it to a Signal Forms field with `[formField]`:
 *
 * ```html
 * <zen-switch [formField]="myForm.notifications" />
 * ```
 *
 * Supports keyboard interaction: `Enter`, `Space`, `ArrowRight`, and
 * `ArrowLeft` keys toggle or set the value.
 *
 * ### CSS Custom Properties
 *
 *
 * ```css
 * :root {
 *   --zen-switch-thumb-size: 1rem;
 *   --zen-switch-height: 1.25rem;
 *   --zen-switch-width: 2rem;
 *   --zen-switch-apperance: hsl(0deg 0% 10%);
 *   --zen-switch-background: hsl(0deg 0% 80%);
 * }
 * ```
 *
 * @extends {ZenFormControl<boolean>}
 *
 * @author Konrad Stepień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-switch',
  template: `
    <span class="thumb">
      <!-- @if (value()) { ✓ } -->
      <!-- @if (!value()) { ─ } -->
    </span>
  `,
  styleUrl: './switch.scss',

  host: {
    tabindex: '0',
    role: 'switch',
    '[attr.data-disabled]': 'disabled()',
    '[attr.data-checked]': 'value()',
    '(click)': 'onInput(!this.value())',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ZenSwitch extends ZenFormControl<boolean> {
  /** Holds the current switch value. */
  readonly value = model(false);

  /**
   * Handles keyboard events for accessibility.
   * Supports `Enter`, `Space`, `ArrowRight`, and `ArrowLeft` keys.
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
