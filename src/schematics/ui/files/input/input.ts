import { Component, input, model } from '@angular/core';

import { ZenFormControl } from '../form-control';

/**
 * ZenInput is a reusable text input component backed by Signal Forms.
 *
 * @example
 * ```html
 * <zen-input [formField]="myForm.name" />
 * ```
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
  template: `
    <input
      [attr.placeholder]="placeholder()"
      [attr.required]="required()"
      [disabled]="disabled()"
      [value]="value()"
      (blur)="touched.set(true)"
      (input)="onInput(inputRef.value)"
      #inputRef
    />
  `,
  styleUrls: ['./input.scss'],
})
export class ZenInput extends ZenFormControl<string> {
  /** The current input value with two-way binding support. */
  readonly value = model('');

  /** The placeholder text for the form control. */
  readonly placeholder = input<string>();
}
