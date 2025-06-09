import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenInputComponent loader component that displays loading states.
 *
 * @example
 * ```HTML
 * <zen-skeleton rounded/>
 * ```
 * ### Properties:
 * - `rounded` - Whether to display rounded corners
 *
 * ### CSS Custom Properties
 * You can customize the component using CSS custom properties:
 *
 * ```CSS
 * :root {
 *  --zen-skeleton-background: red;
 *  --zen-skeleton-border-radius: 1rem;
 *  --zen-skeleton-animation-duration: 1s;
 * }
 * ```
 */

@Component({
  selector: 'zen-skeleton, zen-skeleton[rounded]',
  template: ``,
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenSkeletonComponent {}
