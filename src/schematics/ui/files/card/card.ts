import { Component } from '@angular/core';

/**
 * ZenCard is a reusable card component that provides a consistent container
 * for grouping related content. It supports multi-slot content projection
 * through attribute selectors.
 *
 * @example
 *
 * ```html
 * <zen-card>
 *   <div card-header>
 *     <app-badge variant="secondary">Featured</app-badge>
 *   </div>
 *   <h3 card-title>Design systems meetup</h3>
 *   <p card-subtitle>
 *     A practical talk on component APIs, accessibility, and shipping faster.
 *   </p>
 *   <img src="..." alt="Event cover" />
 *   <div card-footer>
 *     <app-button>View Event</app-button>
 *   </div>
 * </zen-card>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-card-border-radius: 0.75rem;
 *   --zen-card-ring: 0 0 0 1px hsl(0deg 0% 0% / 0.1);
 *   --zen-card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
 *   --zen-card-bg: hsl(0deg 0% 100%);
 *   --zen-card-color: hsl(0deg 0% 10%);
 *   --zen-card-padding: 1.5rem;
 *   --zen-card-gap: 1rem;
 *   --zen-card-title-font-size: 1.125rem;
 *   --zen-card-subtitle-font-size: 0.875rem;
 *   --zen-card-footer-bg: hsl(0deg 0% 95%);
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-card',
  template: `
    <ng-content select="[card-header]" />
    <div class="zen-card-body">
      <ng-content select="[card-title]" />
      <ng-content select="[card-subtitle]" />
      <ng-content />
    </div>
    <div class="zen-card-footer">
      <ng-content select="[card-footer]" />
    </div>
  `,
  styleUrl: './card.scss',
})
export class ZenCard {}
