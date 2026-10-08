import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, input, model } from '@angular/core';

import { ZenFormControl } from '../form-control';
import { ZenHint } from '../hint';
import { ZenLabel } from '../label';

/**
 * ZenTextarea is a multi-line text input component backed by Signal Forms.
 *
 * Connect it to a Signal Forms field with `[formField]`:
 *
 * ```html
 * <zen-textarea [formField]="myForm.bio" placeholder="Enter bio" label="Bio" />
 * ```
 *
 * The `[formField]` directive automatically synchronises value, disabled
 * state, validation errors, and touched/dirty status.
 *
 * ### CSS Custom Properties
 *
 * ```css
 * :root {
 *   --zen-textarea-border: var(--zen-input-border, 1px solid hsl(0deg 0% 80%));
 *   --zen-textarea-border-radius: var(--zen-input-border-radius, 8px);
 *   --zen-textarea-padding: var(--zen-input-padding, 0.5rem 1rem);
 *   --zen-textarea-focus-shadow: var(--zen-input-focus-shadow, 0 1px 4px hsl(0deg 0% 60% / 20%) inset);
 *   --zen-textarea-placeholder-color: var(--zen-input-placeholder-color, hsl(0deg 0% 60%));
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
  selector: 'zen-textarea',
  imports: [NgTemplateOutlet, ZenHint, ZenLabel],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class ZenTextarea extends ZenFormControl<string> {
  /** The current textarea value with two-way binding support. */
  readonly value = model('');

  /** The placeholder text for the form control. */
  readonly placeholder = input<string>('');

  /** Number of visible text lines. */
  readonly rows = input<number>(3);

  /** Visible width of the text area in average character widths. */
  readonly cols = input<number | undefined>(undefined);

  /** Whether the textarea should automatically resize to fit its content. */
  readonly autoresize = input(false, { transform: booleanAttribute });
}
