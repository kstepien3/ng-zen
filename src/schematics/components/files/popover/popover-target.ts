import { Directive, input } from '@angular/core';

import { ZenPopover } from './popover';

@Directive({
  selector: '[zenPopoverTarget]',
  host: {
    '[attr.popovertarget]': 'popoverRef().id()',
    '[style.anchor-name]': '"--profile-button"',
  },
})
export class ZenPopoverTarget {
  readonly popoverRef = input.required<ZenPopover>({ alias: 'zenPopoverTarget' });
}
