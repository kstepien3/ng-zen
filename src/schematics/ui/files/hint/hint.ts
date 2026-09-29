import { Component, input } from '@angular/core';

export type ZenHintSeverity = 'info' | 'warning' | 'error' | 'danger' | 'success' | 'neutral' | 'primary';

/**
 * ZenHint is a reusable component for displaying hints, helper text, warnings,
 * and error messages for form controls.
 *
 * @example
 * ```html
 * <zen-hint>This is an info hint</zen-hint>
 * <zen-hint severity="error">This field is required</zen-hint>
 * <zen-hint severity="warning">Password strength is low</zen-hint>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-hint-neutral: var(--zen-neutral, hsl(30deg 5% 10%));
 *   --zen-hint-primary: var(--zen-primary, hsl(193deg 58% 34%));
 *   --zen-hint-success: var(--zen-success, hsl(142deg 38% 36%));
 *   --zen-hint-warning: var(--zen-warning, hsl(36deg 72% 46%));
 *   --zen-hint-danger: var(--zen-danger, hsl(348deg 52% 42%));
 *   --zen-hint-info: var(--zen-info, hsl(214deg 34% 46%));
 *   --zen-hint-font-size: 0.8125rem;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-hint',
  template: '<ng-content />',
  styleUrl: './hint.scss',
  host: {
    '[attr.data-severity]': 'severity()',
    '[attr.role]': 'severity() === "error" || severity() === "danger" ? "alert" : "status"',
  },
})
export class ZenHint {
  /** The severity level of the hint message. */
  readonly severity = input<ZenHintSeverity>('neutral');
}
