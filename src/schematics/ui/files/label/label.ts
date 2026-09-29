import { booleanAttribute, Component, computed, input } from '@angular/core';

export type ZenLabelSize = 'sm' | 'md' | 'lg';

/**
 * ZenLabel is an accessible label component that links to form controls,
 * supports required indicators (*), multiple sizes, and disabled states.
 *
 * @example
 * ```html
 * <zen-label [for]="id()" required>Email</zen-label>
 * <zen-label for="terms" size="sm">I accept the terms</zen-label>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-label-font-size: 0.875rem;
 *   --zen-label-font-weight: 500;
 *   --zen-label-color: hsl(0deg 0% 15%);
 *   --zen-label-required-color: var(--zen-danger, hsl(348deg 52% 42%));
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-label',
  templateUrl: './label.html',
  styleUrl: './label.scss',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class ZenLabel {
  /** The id of the form control this label is linked to. Supports both [for] and [id]. */
  readonly for = input<string>('');
  readonly id = input<string>('');

  /** Resolved target control id (prioritizes `for`, falls back to `id`). */
  protected readonly targetId = computed(() => this.for() || this.id());

  /** Whether the associated control is required. Renders a red asterisk (*) when true. */
  readonly required = input(false, { transform: booleanAttribute });

  /** Visual size variant: 'sm' | 'md' | 'lg'. Defaults to 'md'. */
  readonly size = input<ZenLabelSize>('md');

  /** Whether the label is in a disabled state. */
  readonly disabled = input(false, { transform: booleanAttribute });
}
