import { Component, input } from '@angular/core';

/**
 * ZenSidenav is a presentational responsive navigation shell. No business logic —
 * nav items, auth and i18n live in the consumer.
 *
 * Slots:
 * - `[zenSidenavHeader]`  — brand + optional collapse toggle
 * - `[zenSidenavContent]` — nav items (scrollable)
 * - `[zenSidenavFooter]`  — secondary actions (logout, profile)
 * - `zen-sidenav-toggle`  — floating desktop collapse toggle (direct
 *   child, straddles the inline-end border, hidden on mobile)
 *
 * Layout:
 * ```
 * Desktop, expanded (15rem rail):
 * ┌────────────┬─────────────────┐
 * │ Brand      ○                 │
 * ├────────────┤                 │
 * │ ⌂ Home     │  page content   │
 * │ ⚙ Settings │                 │
 * ├────────────┤                 │
 * │ ⎋ Logout   │                 │
 * └────────────┴─────────────────┘
 *
 * Desktop, collapsed (4.5rem icon rail, labels hidden):
 * ┌────┬──────────────────────────┐
 * │ B  ○                          │
 * ├────┤                          │
 * │ ⌂  │      page content        │
 * │ ⚙  │                          │
 * ├────┤                          │
 * │ ⎋  │                          │
 * └────┴──────────────────────────┘
 *
 * Mobile (<= 48rem, in-flow bottom bar, header hidden):
 * ┌───────────────────────────┐
 * │       page content        │
 * │                           │
 * ├───────────────────────────┤
 * │ ⌂ Home │ ⚙ Settin… │ ⎋    │
 * └───────────────────────────┘
 * ```
 *
 * Desktop: 15rem rail, 4.5rem icon-only when `collapsed` (labels hide,
 * `title`/`aria-label` keep tooltips). Mobile (<= 48rem): in-flow bottom
 * bar — horizontal scroll nav + pinned footer, header hidden. The bar is
 * part of the layout, never fixed, so it cannot cover content.
 *
 * @example
 * ```html
 * <zen-sidenav [collapsed]="collapsed()">
 *   <div zenSidenavHeader>…</div>
 *   <nav zenSidenavContent>…</nav>
 *   <div zenSidenavFooter>…</div>
 * </zen-sidenav>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 * ```css
 * :root {
 *   --zen-sidenav-width: 15rem;
 *   --zen-sidenav-collapsed-width: 4.5rem;
 *   --zen-sidenav-padding-inline: 0.875rem;
 *   --zen-sidenav-padding-block: 1rem;
 *   --zen-sidenav-item-height: 2.5rem;
 *   --zen-sidenav-item-radius: 0.5rem;
 *   --zen-sidenav-gap: 0.5rem;
 *   --zen-sidenav-background: #fafafa;
 *   --zen-sidenav-border: #e0e0e0;
 *   --zen-sidenav-hover-background: #eee;
 *   --zen-sidenav-active-background: #e0e0e0;
 *   --zen-sidenav-focus-color: #2563eb;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-sidenav',
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  host: {
    '[attr.data-collapsed]': 'collapsed()',
  },
})
export class ZenSidenav {
  /**
   * Whether the desktop sidenav is collapsed.
   *
   * The component does not manage this state itself.
   * The parent owns the state and may provide its own toggle control.
   */
  readonly collapsed = input(false);
}
