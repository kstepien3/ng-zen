import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenAlert is a reusable alert component designed to provide
 * a consistent and customizable alert style across the application.
 * It can be used to display messages with different severity levels.
 *
 * @example
 *
 * ```html
 * <zen-alert>
 *   <zen-icon alert-icon icon="Notification02Icon" />
 *   <h3 alert-title>Title</h3>
 *   content
 * </zen-alert>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-alert-padding: 1rem;
 *   --zen-alert-bg-color: hsl(0deg 0% 100%);
 *   --zen-alert-color: hsl(0deg 0% 0%);
 *   --zen-alert-border: 1px solid hsl(0deg 0% 80%);
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-alert',
  template: `
    <ng-content select="[alert-icon]" />
    <div class="content">
      <ng-content select="[alert-title]" />
      <ng-content />
    </div>
  `,
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenAlert {}
