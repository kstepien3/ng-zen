import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

/**
 * ZenPin is an anchor-positioned overlay directive. It sets up the host element
 * as a CSS anchor. Use `zenPinItem` on child elements to pin them as overlays.
 *
 * @example
 *
 * ```html
 * <!-- Pin a badge to a host element -->
 * <button zen-button zenPin>
 *   Notifications
 *   <zen-badge zenPinItem zenPinPosition="top right" [zenPinOffset]="5px">3</zen-badge>
 * </button>
 *
 * <!-- Multiple pins on the same host -->
 * <button zen-button zenPin>
 *   Notifications
 *   <zen-badge zenPinItem zenPinPosition="top right" zenPinOverlap>3</zen-badge>
 *   <zen-icon zenPinItem zenPinPosition="bottom right" [icon]="bellIcon" [size]="16" />
 * </button>
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
 */
@Directive({
  selector: '[zenPin]',
})
export class ZenPin {
  static pinId = 0;

  readonly hostEl: HTMLElement;
  readonly anchorName: string;

  constructor() {
    const el = inject(ElementRef);
    const renderer = inject(Renderer2);
    this.hostEl = el.nativeElement;
    this.anchorName = `--zen-pin-${ZenPin.pinId++}`;
    renderer.setStyle(this.hostEl, 'anchor-name', this.anchorName);
  }
}
