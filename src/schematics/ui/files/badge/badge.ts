import { booleanAttribute, Component, input } from '@angular/core';

/**
 * ZenBadge is a reusable badge component for displaying labels,
 * statuses, or counts with customizable colors and variants.
 *
 * @example
 * <zen-badge>Default</zen-badge>
 * <zen-badge color="primary" variant="outline">Primary</zen-badge>
 * <zen-badge variant="filled">Filled</zen-badge>
 * <zen-badge disabled>Disabled</zen-badge>
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-badge-neutral: hsl(30deg 5% 10%);
 *   --zen-badge-primary: hsl(193deg 58% 34%);
 *   --zen-badge-success: hsl(142deg 38% 36%);
 *   --zen-badge-warning: hsl(36deg 72% 46%);
 *   --zen-badge-danger: hsl(348deg 52% 42%);
 *   --zen-badge-info: hsl(214deg 34% 46%);
 *   --zen-disabled-opacity: 0.6;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-badge',
  template: '<ng-content />',
  styleUrl: './badge.scss',
  host: {
    '[attr.data-color]': 'color()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class ZenBadge {
  /** The color theme of the badge. */
  readonly color = input<'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>('neutral');

  /** The visual style variant of the badge. */
  readonly variant = input<'solid' | 'outline' | 'filled' | 'ghost'>('solid');

  /** Whether the badge is disabled. When `true`, reduces opacity and disables pointer events. */
  readonly disabled = input(false, { transform: booleanAttribute });
}
