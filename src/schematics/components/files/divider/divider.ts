import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core';

/**
 * ZenDivider is a reusable divider component that provides a simple way to
 * separate content sections visually. It supports both horizontal (default) and vertical
 * orientations and can contain optional content.
 *
 * The divider automatically detects if it contains content and applies appropriate styling.
 * Content alignment can be controlled via the `align` input property.
 *
 * @example
 *
 * ```html
 * <zen-divider/>
 * <zen-divider>With content</zen-divider>
 * ```
 *
 * ### CSS Custom Properties
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-divider-appearance: hsl(0deg 0% 10%);
 *  --zen-divider-type: solid;
 *  --zen-divider-align-offset: 25%;
 *  --zen-divider-gap: 0.25rem;
 *  --zen-divider-thickness: 1px;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: `zen-divider, zen-divider[vertical],`,
  template: '<ng-content/>',
  styleUrl: './divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.has-content]': 'hasContent()',
    '[class]': '"zen-align-"+align()',
  },
})
export class ZenDivider {
  /** Controls the alignment of content within the divider. */
  readonly align = input<'start' | 'end' | 'center'>('center');

  /**
   * Computed property that determines if the divider contains any content.
   * Used to apply appropriate styling when content is present.
   */
  protected readonly hasContent = computed(() => {
    return this.elementRef.nativeElement.childNodes.length > 0;
  });

  private readonly elementRef = inject(ElementRef);
}
