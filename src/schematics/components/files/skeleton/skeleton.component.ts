import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenInputComponent loader component that displays loading states.
 *
 * @example
 *
 * ```html
 * <zen-skeleton rounded />
 * ```
 *
 * ### Properties:
 * - `rounded` - Whether to display rounded corners
 *
 * ### CSS Custom Properties
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-skeleton-background: hsl(0deg 0% 80%);
 *  --zen-skeleton-border-radius: 0.5rem;
 *  --zen-skeleton-animation-duration: 1.6s;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-skeleton, zen-skeleton[rounded]',
  template: ``,
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenSkeletonComponent {}
