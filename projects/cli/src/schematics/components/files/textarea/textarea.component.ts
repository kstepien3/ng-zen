import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenTextareaComponent is a reusable textarea component designed to provide
 * a consistent and customizable textarea style across the application.
 * It supports Angular forms integration and provides two-way data binding.
 *
 * @example
 * <textarea zen-textarea></textarea>
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen?tab=BSD-2-Clause-1-ov-file|BSD-2-Clause}
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
