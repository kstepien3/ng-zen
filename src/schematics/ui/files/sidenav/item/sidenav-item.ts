import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { IconSvgObject, ZenIcon } from '../../icon';

/**
 * Individual navigation item with icon, label, active state, and responsive behavior.
 *
 * Desktop (expanded): Shows icon + label horizontally
 * Desktop (collapsed): Shows icon only, label hidden with tooltip/aria-label
 * Mobile: Shows icon stacked above label in column layout
 *
 * @example
 * ```html
 * <zen-sidenav-item [icon]="homeIcon" label="Home" routerLink="/home" />
 * ```
 */
@Component({
  selector: 'zen-sidenav-item',
  templateUrl: './sidenav-item.html',
  styleUrl: './sidenav-item.scss',
  imports: [RouterLink, RouterLinkActive, ZenIcon],
  host: {
    '[attr.data-active]': 'isActive()',
  },
})
export class ZenSidenavItem {
  /** SVG icon definition object (from `@hugeicons/core-free-icons`). */
  readonly icon = input.required<IconSvgObject>();
  /** Visible label text. Hidden when the sidenav is collapsed or on mobile overflow. */
  readonly label = input.required<string>();
  /** Router path the item navigates to. */
  readonly routerLink = input.required<string>();
  /** Accessible label and tooltip. Falls back to `label` when omitted. */
  readonly ariaLabel = input<string>();
  /** Manual active state (in addition to `routerLinkActive`). */
  readonly isActive = input(false);
  /** Icon size in pixels. */
  readonly size = input<number>(24);
}
