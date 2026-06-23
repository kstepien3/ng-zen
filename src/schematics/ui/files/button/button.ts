import { Component, input } from '@angular/core';

/**
 * ZenButton is a reusable button component designed to provide
 * a consistent and customizable button style across the application.
 * It can be used with both `<button>` and `<a>` HTML elements by applying
 * the `zen-button` or `zen-btn` attribute.
 *
 * @example
 * <button zen-button> ... </button>
 * <button zen-btn> ... </button>
 * <a zen-button href="..."> ... </a>
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-button-radius: 0.625rem;
 *   --zen-button-shadow: 0 2px 4px hsl(0deg 0% 0% / 10%);
 *   --zen-button-neutral: hsl(30deg 5% 10%);
 *   --zen-button-primary: hsl(95deg 15% 50%);
 *   --zen-button-success: hsl(105deg 20% 35%);
 *   --zen-button-warning: hsl(40deg 45% 60%);
 *   --zen-button-danger: hsl(5deg 50% 45%);
 *   --zen-button-info: hsl(205deg 30% 40%);
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: ':is(button, a):is([zen-button], [zen-btn])',
  template: `
    <ng-content />
  `,
  styleUrl: './button.scss',
  host: {
    '[attr.type]': '"button"',
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-color]': 'color()',
  },
})
export class ZenButton {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly color = input<'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>('neutral');
  readonly variant = input<'solid' | 'outline' | 'filled' | 'ghost' | 'link'>('solid');
}
