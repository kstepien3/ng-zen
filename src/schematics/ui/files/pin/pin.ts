import {
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  EmbeddedViewRef,
  inject,
  input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { PinPosition } from './pin.types';

/**
 * ZenPin is an anchor-positioned overlay directive. It renders a `TemplateRef`
 * into a wrapper div pinned to the host element using CSS Anchor Positioning.
 *
 * @example
 *
 * ```html
 * <!-- Pin a badge to a host element -->
 * <button [zenPin]="badge" zenPinPosition="top right">
 *   Notifications
 * </button>
 * <ng-template #badge>
 *   <zen-badge color="danger" variant="solid">3</zen-badge>
 * </ng-template>
 *
 * <!-- Pin an icon, shifted slightly to the right and down -->
 * <div [zenPin]="info" zenPinPosition="bottom center" zenPinOffset="0.25rem 0.5rem">
 *   Details
 * </div>
 * <ng-template #info>
 *   <zen-icon [icon]="infoIcon" [size]="20" color="currentColor" />
 * </ng-template>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 * ```css
 * :root {
 *   --zen-pin-wrapper-bg: white;
 *   --zen-pin-wrapper-border-radius: 8px;
 * }
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
  private static nextId = 0;

  /** Template content to render inside the pinned overlay. */
  readonly template = input.required<TemplateRef<unknown>>({ alias: 'zenPin' });

  /** Position of the pin relative to the host element. Defaults to `'top right'`. */
  readonly position = input<PinPosition>('top right', { alias: 'zenPinPosition' });

  /**
   * Optional CSS `translate` offset to shift the pin from its anchor-centered position
   * (e.g. `'0.5rem'`, `'10px -5px'`). Defaults to no offset.
   */
  readonly offset = input<string>('0', { alias: 'zenPinOffset' });

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  private readonly anchorName = `--zen-pin-${ZenPin.nextId++}`;

  private wrapper: HTMLElement | null = null;
  private viewRef: EmbeddedViewRef<unknown> | null = null;

  constructor() {
    effect(() => {
      // ponytail: template() read here to track it, but setup only runs once
      this.template();
      if (!this.wrapper) {
        this.setupPin();
      }
      this.updatePosition();
    });

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  private setupPin(): void {
    this.setupAnchor();
    this.wrapper = this.createWrapper();
    this.attachTemplate();
    this.insertWrapper();
  }

  private setupAnchor(): void {
    this.renderer.setStyle(this.el.nativeElement, 'anchor-name', this.anchorName);
  }

  private createWrapper(): HTMLElement {
    const el = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(el, 'zen-pin-wrapper');
    this.renderer.setStyle(el, 'position', 'absolute');
    this.renderer.setStyle(el, 'position-anchor', this.anchorName);
    this.renderer.setStyle(el, 'align-self', 'anchor-center');
    this.renderer.setStyle(el, 'justify-self', 'anchor-center');
    this.renderer.setStyle(el, 'z-index', '10');
    return el;
  }

  private attachTemplate(): void {
    this.viewRef = this.vcr.createEmbeddedView(this.template());
    for (const node of this.viewRef.rootNodes) {
      this.renderer.appendChild(this.wrapper, node);
    }
  }

  private insertWrapper(): void {
    const parent = this.renderer.parentNode(this.el.nativeElement);
    const next = this.renderer.nextSibling(this.el.nativeElement);
    this.renderer.insertBefore(parent, this.wrapper, next);
  }

  private updatePosition(): void {
    if (!this.wrapper) return;
    this.renderer.setStyle(this.wrapper, 'position-area', this.position());

    const o = this.offset();
    if (o) {
      this.renderer.setStyle(this.wrapper, 'translate', o);
    } else {
      this.renderer.removeStyle(this.wrapper, 'translate');
    }
  }

  private cleanup(): void {
    this.viewRef?.destroy();
    this.viewRef = null;
    if (!this.wrapper) return;
    const parent = this.renderer.parentNode(this.wrapper);
    if (parent) {
      this.renderer.removeChild(parent, this.wrapper);
    }
    this.wrapper = null;
  }
}
