import { ChangeDetectionStrategy, Component, effect, ElementRef, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZenFormControl, ZenFormControlProvider } from '../form-control';

/**
 * ZenCheckbox is a reusable checkbox component designed to provide
 * a consistent and customizable checkbox style across the application.
 * It supports Angular forms integration and provides two-way data binding
 * for boolean values.
 *
 * @example
 * <zen-checkbox [value]="true" /> Checked
 * <zen-checkbox [value]="false" /> Unchecked
 * <zen-checkbox [value]="null" /> Indeterminate
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
 * @implements {ZenFormControl<boolean>}
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
      [disabled]="disabled()"
      [ngModel]="value()"
      (ngModelChange)="onInput($event)"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  providers: [ZenFormControlProvider(ZenCheckbox)],
  host: {
    '(blur)': 'onTouched()',
  },
})
export class ZenCheckbox extends ZenFormControl<boolean | null> {
  /**
   * Holds the current checkbox value.
   * Set value to `null` to mark the checkbox as indeterminate
   */
  readonly value = model<boolean | null>(false);
  /** @ignore */
  private readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

  constructor() {
    super();

    effect(() => {
      if (this.value() === null) this.inputElement().nativeElement.indeterminate = true;
    });
  }
}
