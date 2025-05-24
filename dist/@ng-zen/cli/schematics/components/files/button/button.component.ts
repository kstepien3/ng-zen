import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenButtonComponent is a reusable button component designed to provide
 * a consistent and customizable button style across the application.
 * It can be used with both `<button>` and `<a>` HTML elements by applying
 * the `zen-button` attribute.
 *
 * @example
 * <button zen-btn> ... </button>
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[zen-button], button[zen-btn], a[zen-button], a[zen-btn]',
  template: `
    <ng-content />
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenButtonComponent {}
