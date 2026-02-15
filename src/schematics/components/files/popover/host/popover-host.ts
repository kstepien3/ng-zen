import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PopoverPlacement } from '../popover-positions.type';

/**
 * ZenPopoverHost is a minimal host component created dynamically by the `ZenPopover` directive.
 * It exists mainly to provide a real DOM element that can act as a native popover (`popover="auto"`),
 * receive styles, and host projected content.
 *
 * The directive is responsible for creating/destroying this component instance, attaching content
 * (text or a TemplateRef), configuring positioning, and calling the Popover API methods to toggle it.
 *
 * ### Notes
 * This component intentionally contains no behavior logic. All lifecycle and interaction logic is handled
 * by the directive that creates it.
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [MDN Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
 */

@Component({
  template: `
    <ng-content />
  `,
  styleUrl: './popover-host.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    popover: 'auto',
    '[attr.id]': 'id()',
    '[attr.data-placement]': 'placement()',
  },
})
export class ZenPopoverHost {
  readonly id = input.required<string>();
  readonly placement = input<PopoverPlacement>('top');
}
