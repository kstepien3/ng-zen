import { ChangeDetectionStrategy, Component, ElementRef, input, model, viewChild } from '@angular/core';

import { ZenFormControl } from '../form-control';

/**
 * ZenSelect is a dropdown select component backed by Signal Forms.
 *
 * Connect it to a Signal Forms field with `[formField]`:
 *
 * ```html
 * <zen-select [formField]="myForm.device">
 *   <option value="opt1">Option 1</option>
 *   <option value="opt2">Option 2</option>
 * </zen-select>
 * ```
 *
 * The `[formField]` directive automatically synchronises value, disabled
 * state, validation errors, and touched/dirty status.
 *
 * ### CSS Custom Properties
 *
 * ```css
 * :root {
 *   --zen-select-border: 1px solid hsl(0deg 0% 80%);
 *   --zen-select-border-radius: 8px;
 *   --zen-select-padding: 0.5rem 2rem 0.5rem 0.75rem;
 *   --zen-select-bg: hsl(0deg 0% 100%);
 *   --zen-select-color: hsl(0deg 0% 15%);
 *   --zen-select-focus-shadow: 0 1px 4px hsl(0deg 0% 60% / 20%) inset;
 *   --zen-select-arrow-color: hsl(0deg 0% 50%);
 * }
 * ```
 *
 * @extends {ZenFormControl<string>}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-select',
  template: `
    <div class="zen-select-wrapper" [class.is-disabled]="disabled()" [class.is-invalid]="invalid()">
      <select
        #selectRef
        [attr.aria-invalid]="invalid() || null"
        [disabled]="disabled()"
        [id]="id() || null"
        [required]="required()"
        [value]="value()"
        (change)="onInput(selectRef.value)"
      >
        <ng-content />
      </select>
      <span aria-hidden="true" class="zen-select-arrow">
        <svg
          fill="none"
          height="14"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>
  `,
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenSelect extends ZenFormControl<string> {
  /** The current select value with two-way binding support. */
  readonly value = model('');

  /** Unique identifier for the native select element. */
  readonly id = input<string>('');

  private readonly selectRef = viewChild<ElementRef<HTMLSelectElement>>('selectRef');

  override focus(options?: FocusOptions): void {
    this.selectRef()?.nativeElement.focus(options);
  }
}
