import { Component, effect, ElementRef, model, viewChild } from '@angular/core';

import { ZenFormControl } from '../form-control';

/**
 * ZenCheckbox is a checkbox component supporting checked (`true`),
 * unchecked (`false`), and indeterminate (`null`) states.
 *
 * Connect it to a Signal Forms field with `[formField]`:
 *
 * ```html
 * <zen-checkbox [formField]="myForm.agree" />
 * <label for="agree">I agree to the terms</label>
 * ```
 *
 * When `value` is `null` the native checkbox is set to indeterminate via
 * the `indeterminate` DOM property.
 *
 * ### CSS Custom Properties
 *
 *
 * ```css
 * :root {
 *   --zen-checkbox-size: 1rem;
 *   --zen-checkbox-border-radius: 0.375rem;
 *   --zen-checkbox-appearance: hsl(0deg 0% 10%);
 *   --zen-checkbox-disabled-opacity: 0.6;
 *   --zen-checkbox-border: 1px solid hsl(0deg 0% 80%);
 * }
 * ```
 *
 * @extends {ZenFormControl<boolean | null>}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-checkbox',
  template: `
    <input
      [attr.aria-disabled]="disabled()"
      [attr.aria-invalid]="invalid() || null"
      [checked]="value()"
      [disabled]="disabled()"
      (change)="onInput(inputElement.checked)"
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
  styleUrls: ['./checkbox.scss'],
})
export class ZenCheckbox extends ZenFormControl<boolean | null> {
  /**
   * Holds the current checkbox value.
   * Set value to `null` to mark the checkbox as indeterminate
   */
  readonly value = model<boolean | null>(false);
  private readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

  constructor() {
    super();

    effect(() => {
      if (this.value() === null) this.inputElement().nativeElement.indeterminate = true;
    });
  }
}
