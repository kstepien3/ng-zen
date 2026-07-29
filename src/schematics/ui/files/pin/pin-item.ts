import { booleanAttribute, DestroyRef, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

import { ZenPin } from './pin';
import type { PinPosition } from './pin.types';

/**
 * ZenPinItem is a directive that pins an element as an overlay relative to a
 * `[zenPin]` anchor. Each pinned element gets its own absolutely-positioned
 * wrapper using CSS Anchor Positioning.
 *
 * @example
 *
 * ```html
 * <button zen-button zenPin>
 *   Notifications
 *   <zen-badge zenPinItem zenPinPosition="top right" [zenPinOffset]="5px">3</zen-badge>
 *   <zen-icon zenPinItem zenPinPosition="bottom right" />
 * </button>
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
 */
@Directive({
  selector: '[zenPinItem]',
})
export class ZenPinItem {
  /** Position of the pin relative to the anchor element. */
  readonly zenPinPosition = input<PinPosition>('top right');

  /** Fine-tune the margin to offset the pin from the position-area edge. Accepts CSS value or number (px). */
  readonly zenPinOffset = input<string | number>('0');

  /** Whether the pin sits flush at the edge without overlapping the anchor. */
  readonly zenPinFlush = input<boolean, unknown>(false, { transform: booleanAttribute });

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly zenPin = inject(ZenPin);
  private readonly destroyRef = inject(DestroyRef);

  private wrapper: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (!this.wrapper) {
        this.createWrapper();
      }
      this.updatePosition();
    });

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  private createWrapper(): void {
    const wrapper = this.renderer.createElement('div');
    this.renderer.addClass(wrapper, 'zen-pin-wrapper');
    this.renderer.setStyle(wrapper, 'position', 'absolute');
    this.renderer.setStyle(wrapper, 'position-anchor', this.zenPin.anchorName);
    this.renderer.setStyle(wrapper, 'align-self', 'anchor-center');
    this.renderer.setStyle(wrapper, 'justify-self', 'anchor-center');

    const itemEl = this.el.nativeElement;
    const parent = this.renderer.parentNode(itemEl);
    this.renderer.removeChild(parent, itemEl);
    this.renderer.appendChild(wrapper, itemEl);

    const hostParent = this.renderer.parentNode(this.zenPin.hostEl);
    this.renderer.appendChild(hostParent, wrapper);

    this.wrapper = wrapper;
  }

  private updatePosition(): void {
    if (!this.wrapper) return;

    this.renderer.setStyle(this.wrapper, 'position-area', this.zenPinPosition());

    if (this.zenPinFlush()) {
      this.renderer.removeStyle(this.wrapper, 'translate');
    } else {
      this.renderer.setStyle(this.wrapper, 'translate', this.computeCenterOffset(this.zenPinPosition(), 50));
    }

    const o = this.zenPinOffset();
    if (o !== '0' && o !== 0) {
      this.renderer.setStyle(this.wrapper, 'margin', typeof o === 'number' ? `${o}px` : o);
    } else {
      this.renderer.removeStyle(this.wrapper, 'margin');
    }
  }

  private cleanup(): void {
    if (!this.wrapper) return;
    const parent = this.renderer.parentNode(this.wrapper);
    if (parent) {
      this.renderer.removeChild(parent, this.wrapper);
    }
    this.wrapper = null;
  }

  private computeCenterOffset(position: PinPosition, pct: number): string {
    const parts = position.split(' ') as [string] | [string, string];
    const verticals = new Set(['top', 'bottom', 'center']);
    const [v, h] = parts.length === 2 ? parts : verticals.has(parts[0]) ? [parts[0], 'center'] : ['center', parts[0]];

    const hFactor = h === 'right' ? -1 : h === 'left' ? 1 : 0;
    const vFactor = v === 'top' ? 1 : v === 'bottom' ? -1 : 0;
    const x = hFactor * pct;
    const y = vFactor * pct;
    return `${x ? x + '%' : '0'} ${y ? y + '%' : '0'}`;
  }
}
