import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * ZenButton is a reusable button component designed to provide
 * a consistent and customizable button style across the application.
 * It can be used with both `<button>` and `<a>` HTML elements by applying
 * the `zen-button` attribute.
 *
 * @example
 * <button zen-btn> ... </button>
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-button-bg-color-hover: lightgrey;
 *   --zen-button-bg-color: grey;
 *   --zen-button-color: white;
 *   --zen-button-padding: 0.5rem 2rem;
 *   --zen-button-shadow: 0 2px 4px hsl(0deg 0% 0% / 10%);
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
