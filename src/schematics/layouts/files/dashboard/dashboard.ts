import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenDashboard is a presentational app shell: navigation + content. No business logic —
 * nav items, auth and i18n live in the consumer (e.g. `zen-sidenav`).
 *
 * Slots:
 * - `[zenDashboardNav]` — navigation (e.g. `<zen-sidenav zenDashboardNav />`)
 * - default            — main content (e.g. `<router-outlet />`, rendered in place)
 *
 * Layout:
 * ```
 * Desktop (row):
 * ┌──────────────┬──────────────────────────────┐
 * │ .dashboard-  │ <main> (flex: 1,             │
 * │  nav         │  internal scroll)            │
 * │  (sized by   │  <router-outlet>             │
 * │   nav itself)│                              │
 * └──────────────┴──────────────────────────────┘
 * Mobile (<= 48rem, column, in-flow — never fixed):
 * ┌─────────────────────────────────────────────┐
 * │ <main> (order: -1, scrolls internally)      │
 * ├─────────────────────────────────────────────┤
 * │ .dashboard-nav bottom bar                   │
 * └─────────────────────────────────────────────┘
 * ```
 * Full height is self-contained: the host is a `100dvh` flex, `main` takes
 * `flex: 1` with `min-block-size: 0` + `overflow-y: auto`, so only content
 * scrolls and the nav is always visible without overlaying anything.
 * Slots sit inside plain wrapper elements (`.dashboard-nav`, `main`), so
 * `order` and sizing stay local — no `display: contents` or cross-component
 * selectors needed.
 *
 * @example
 * ```html
 * <zen-dashboard>
 *   <zen-sidenav zenDashboardNav [collapsed]="collapsed()">
 *     <div zenSidenavHeader>…</div>
 *     <nav zenSidenavContent>…</nav>
 *     <div zenSidenavFooter>…</div>
 *   </zen-sidenav>
 *   <router-outlet />
 * </zen-dashboard>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 * ```css
 * :root {
 *   --zen-dashboard-content-padding: 1.5rem;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenDashboard {}
