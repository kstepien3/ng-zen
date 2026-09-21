import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ZenFocus is a presentational app shell: centered content. No business logic —
 * auth, onboarding and error states live in the consumer.
 *
 * Designed for screens outside the app chrome (no navigation shell) — Login,
 * 401/403, onboarding, and full-screen empty states.
 *
 * Slots:
 * - default — centered content (e.g. `<router-outlet />`, login, onboarding)
 *
 * Layout:
 * ```
 * ┌─────────────────────────────────────────────┐
 * │                                             │
 * │               ┌───────────────┐             │
 * │               │  ⟨default⟩    │             │
 * │               │  centered     │             │
 * │               │  content      │             │
 * │               └───────────────┘             │
 * │                                             │
 * └─────────────────────────────────────────────┘
 * ```
 * Full height is self-contained: the host is a `100dvh` flex with centered
 * alignment, placing projected content dead-center horizontally and vertically
 * without unnecessary wrapper elements.
 *
 * @example
 * ```html
 * <zen-focus>
 *   <zen-card>
 *     <h1 card-title>Sign in</h1>
 *     <p card-subtitle>Welcome back, please enter your details.</p>
 *   </zen-card>
 * </zen-focus>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 * ```css
 * :root {
 *   --zen-focus-padding: 1.5rem;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-focus',
  template: '<ng-content />',
  styleUrl: './focus.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenFocus {}
