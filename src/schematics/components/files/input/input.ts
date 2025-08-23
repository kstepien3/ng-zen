import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZenFormControl, ZenFormControlProvider } from '../form-control';

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
 * @implements {ZenFormControl<string>}
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
      [attr.placeholder]="placeholder()"
      [attr.required]="required()"
      [disabled]="disabled()"
      [ngModel]="value()"
      [value]="value()"
      (blur)="onTouched()"
      (ngModelChange)="onInput($event)"
    />
  `,
  styleUrls: ['./input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ZenFormControlProvider(ZenInput)],
  imports: [FormsModule],
})
export class ZenInput extends ZenFormControl<string> {
  readonly value = model('');

  /** The placeholder text for the form control. */
  readonly placeholder = input<string>();
}
