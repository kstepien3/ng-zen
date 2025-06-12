import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenTextareaComponent is a reusable textarea component designed to provide
 * a consistent and customizable textarea style across the application.
 * It supports Angular forms integration and provides two-way data binding.
 *
 * @example
 * <textarea zen-textarea></textarea>
 *
 * ### CSS Custom Properties
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-input-border: 1px solid hsl(0deg 0% 80%);
 *  --zen-input-border-radius: 8px;
 *  --zen-input-padding: 0.5rem 1rem;
 *  --zen-input-focus-shadow: 0 1px 4px hsl(0deg 0% 60% / 20%) inset;
 *  --zen-input-placeholder-color: hsl(0deg 0% 60%);
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'textarea[zen-textarea], textarea[zen-textarea][autoresize]',
  standalone: true,
  template: `
    <ng-content />
  `,
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenTextareaComponent {}
