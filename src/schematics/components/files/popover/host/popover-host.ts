import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * ZenPopover is a reusable popover component that leverages the native Popover API.
 * It provides a consistent and customizable popover style with support for anchor positioning,
 * animations, and various trigger modes.
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [MDN Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
 */
@Component({
  selector: 'zen-popover',
  template: `
    <ng-content />
  `,
  styleUrl: './popover-host.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    popover: 'auto',
    '[attr.id]': 'id()',
  },
})
export class ZenPopoverHost {
  readonly id = input.required<string>();
}
