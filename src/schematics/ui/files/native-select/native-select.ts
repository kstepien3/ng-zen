import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, model, viewChild } from '@angular/core';

import { ZenFormControl } from '../form-control';
import { ZenHint } from '../hint';
import { ZenLabel } from '../label';
import { ZenNativeSelectOption } from './native-select.types';

/**
 * ZenNativeSelect is a lightweight dropdown select component wrapping the native HTML `<select>`,
 * integrated with Signal Forms via {@link ZenFormControl}.
 *
 * Connect it to a Signal Forms field with `[formField]`:
 *
 * ```html
 * <zen-native-select [formField]="myForm.device" label="Device">
 *   <option value="opt1">Option 1</option>
 *   <option value="opt2">Option 2</option>
 * </zen-native-select>
 * ```
 *
 * It also supports passing options via the `[options]` input:
 *
 * ```html
 * <zen-native-select [formField]="myForm.device" [options]="deviceOptions" label="Device" />
 * ```
 *
 * The `[formField]` directive automatically synchronises value, disabled
 * state, validation errors, and touched/dirty status.
 *
 * ### CSS Custom Properties
 *
 * ```css
 * :root {
 *   --zen-native-select-border: 1px solid hsl(0deg 0% 80%);
 *   --zen-native-select-border-radius: 8px;
 *   --zen-native-select-padding: 0.5rem 2rem 0.5rem 0.75rem;
 *   --zen-native-select-bg: hsl(0deg 0% 100%);
 *   --zen-native-select-color: hsl(0deg 0% 15%);
 *   --zen-native-select-focus-shadow: 0 1px 4px hsl(0deg 0% 60% / 20%) inset;
 *   --zen-native-select-arrow-color: hsl(0deg 0% 50%);
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
  selector: 'zen-native-select',
  imports: [NgTemplateOutlet, ZenHint, ZenLabel],
  templateUrl: './native-select.html',
  styleUrl: './native-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenNativeSelect extends ZenFormControl<string> {
  /** The current select value with two-way binding support. */
  readonly value = model('');

  /** Placeholder option displayed when no value is selected. */
  readonly placeholder = input<string>('');

  /** Predefined options array. If omitted, options can be provided via `<ng-content>`. */
  readonly options = input<ZenNativeSelectOption[]>([]);

  private readonly selectRef = viewChild<ElementRef<HTMLSelectElement>>('selectRef');

  override focus(options?: FocusOptions): void {
    this.selectRef()?.nativeElement.focus(options);
  }
}
