import { afterNextRender, Component, computed, DestroyRef, inject, input, model } from '@angular/core';

import { ZenFormControl } from '../form-control';
import { ZenRadioRegistry } from './radio.registry';

/**
 * ZenRadio is a radio button component backed by Signal Forms.
 *
 * Radio buttons with the same `name` form a group. The `value` is shared
 * across the group — when one radio is selected, `onInput(value)` is called
 * on every radio in the group via {@link ZenRadioRegistry}.
 *
 * Use together with a shared `[formField]` binding:
 *
 * ```html
 * <zen-radio [formField]="form.color" name="color" option="red" />
 * <zen-radio [formField]="form.color" name="color" option="green" />
 * ```
 *
 * ### CSS Custom Properties
 *
 * {@schema
 *   --zen-radio-size: 1rem;
 *   --zen-radio-border-radius: 50%;
 *   --zen-radio-appearance: hsl(0deg 0% 10%);
 *   --zen-radio-disabled-opacity: 0.6;
 *   --zen-radio-border: 1px solid hsl(0deg 0% 80%);
 * }
 *
 * @extends {ZenFormControl<string | null>}
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
      [attr.aria-invalid]="invalid() || null"
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
  override readonly name = input.required<string>();

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
