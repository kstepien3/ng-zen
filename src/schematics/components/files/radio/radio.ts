import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZenFormControl, ZenFormControlProvider } from '../form-control';
import { ZenRadioRegistry } from './radio.registry';

/**
 * ZenRadio is a reusable radio button component designed to provide
 * a consistent and customizable radio button style across the application.
 * It supports Angular forms integration and provides two-way data binding
 * for string values.
 *
 * @example
 * <zen-radio name="group" option="option1" [(ngModel)]="selectedValue" /> Option 1
 * <zen-radio name="group" option="option2" [(ngModel)]="selectedValue" /> Option 2
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-radio-size: 1rem;
 *  --zen-radio-border-radius: 50%;
 *  --zen-radio-appearance: hsl(0deg 0% 10%);
 *  --zen-radio-disabled-opacity: 0.6;
 *  --zen-radio-border: 1px solid hsl(0deg 0% 80%);
 * }
 * ```
 *
 * @implements {ZenFormControl<string | null>}
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-radio',
  template: `
    <input
      [attr.aria-checked]="checked()"
      [attr.aria-disabled]="disabled()"
      [checked]="checked()"
      [disabled]="disabled()"
      [name]="name()"
      [value]="option()"
      (change)="onRadioChange()"
      #inputElement
      type="radio"
    />
    @if (checked()) {
      <span class="radio-dot"></span>
    }
  `,
  styleUrls: ['./radio.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  providers: [ZenFormControlProvider(ZenRadio)],
  host: {
    '(blur)': 'onTouched()',
  },
})
export class ZenRadio extends ZenFormControl<string | null> {
  /**
   * The value of the radio button group.
   * This should be bound to the same model for all radio buttons in a group.
   */
  readonly value = model<string | null>(null);

  /**
   * The name attribute for the radio button group.
   * Radio buttons with the same name will be grouped together.
   */
  readonly name = input.required<string>();

  /**
   * The value for this specific radio button.
   */
  readonly option = input.required<string>();

  /**
   * Determines if this radio button is checked based on the group value.
   */
  protected checked = computed<boolean>(() => this.value() === this.option());
  /**
   * Handles radio button selection using native change event.
   */

  private readonly registry = inject(ZenRadioRegistry);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    super();
    afterNextRender(() => {
      this.registry.add(this.name(), this);
    });

    this.destroyRef.onDestroy(() => this.registry.remove(this.name(), this));
  }

  protected onRadioChange(): void {
    if (this.disabled()) return;
    this.registry.select(this.name(), this.option());
  }
}
