import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import * as icons from '@hugeicons/core-free-icons';

type Icon = keyof typeof icons;

/**
 * A reusable Angular component for rendering icons from the Hugeicons library.
 *
 * This component acts as a wrapper around the `<hugeicons-icon>` component, allowing you to display any icon from the
 * `@hugeicons/core-free-icons` collection by specifying its name. The icon, size, and stroke width are fully configurable
 * via inputs.
 *
 * @example
 * <zen-icon icon="Tree02Icon" />
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [Hugeicons](https://hugeicons.com)
 */
@Component({
  selector: 'zen-icon',
  template: `
    <hugeicons-icon [icon]="icon()" [size]="size()" [strokeWidth]="strokeWidth()" color="currentColor" />
  `,
  imports: [HugeiconsIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenIconComponent {
  /** Icon file names from HugeIcons */
  readonly icon = input.required({ transform: (icon: Icon) => icons[icon] });
  readonly size = input<number>(24);
  readonly strokeWidth = input<number>(1.5);
}
