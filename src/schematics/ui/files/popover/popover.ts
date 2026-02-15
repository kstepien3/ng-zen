import {
  ComponentRef,
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

import { ZenPopoverHost } from './host/popover-host';
import { PopoverPlacement } from './popover-positions.type';

/**
 * ZenPopover is a reusable popover directive built on the native Popover API.
 * It provides a consistent, themeable popover surface with CSS-based positioning,
 * animations, and multiple trigger modes.
 *
 * ### Limitations (arrow)
 * ZenPopover may use CSS fallback positioning (e.g. via `position-try-fallbacks`) to keep the
 * popover inside the viewport. Today CSS doesn’t provide a stable, cross-browser way to detect
 * which fallback placement was ultimately chosen, so an “arrow” implemented with `::before/::after`
 * can’t be reliably synchronized with the final placement without extra JavaScript.
 * A CSS-only solution becomes possible with Anchored Container Queries (e.g. `container-type: anchored`
 * and `@container anchored(fallback: ...)`) where supported.
 *
 * @see https://developer.chrome.com/blog/anchored-container-queries
 *
 * ### CSS Custom Properties
 * You can customize the popover using CSS custom properties (see component styles/docs).
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 * @see [MDN Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
 */

type HostProperties = keyof ZenPopoverHost;

@Directive({
  selector: '[zenPopover]',
  standalone: true,
  host: {
    '(click)': 'togglePopover()',
  },
})
export class ZenPopover {
  private static uniqueId = 0;

  /** Content to display inside the popover. Can be a `string` or a `TemplateRef`.*/
  readonly content = input.required<TemplateRef<unknown> | string>({ alias: 'zenPopover' });
  /** Placement of the popover relative to the trigger element. Defaults to `top`.*/
  readonly placement = input<PopoverPlacement>('top', { alias: 'zenPopoverPlacement' });
  /** The HTML id attribute is used to specify a unique id for an HTML element.*/
  readonly id = input<string>(`zen-popover-${ZenPopover.uniqueId++}`);

  private hostRef: ComponentRef<ZenPopoverHost> | null = null;
  private viewRef: EmbeddedViewRef<unknown> | null = null;

  private unlistenToggle: (() => void) | null = null;

  private readonly anchorName = `--anchor-${this.id()}`;

  private readonly vcr = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private readonly triggerEl = inject(ElementRef).nativeElement;

  constructor() {
    effect(onCleanup => {
      onCleanup(() => {
        this.destroyPopover();
      });
    });
  }

  protected togglePopover(): void {
    if (this.hostRef) {
      return;
    }

    const popoverEl = this.createHost();
    this.renderContent(popoverEl);
    this.unlistenToggle = this.renderer.listen(popoverEl, 'beforetoggle', (event: ToggleEvent) => {
      if (event.newState === 'closed') {
        this.destroyPopover();
      }
    });

    popoverEl.showPopover();
  }

  private createHost(): HTMLElement {
    this.renderer.setStyle(this.triggerEl, 'anchor-name', this.anchorName);

    this.hostRef = this.vcr.createComponent(ZenPopoverHost);
    this.hostRef.setInput('id' satisfies HostProperties, this.id());
    this.hostRef.setInput('placement' satisfies HostProperties, this.placement());

    const popoverEl = this.hostRef.location.nativeElement as HTMLElement;
    this.renderer.setStyle(popoverEl, 'position-anchor', this.anchorName);

    return popoverEl;
  }

  private renderContent(popoverEl: HTMLElement) {
    const contentValue = this.content();
    if (contentValue instanceof TemplateRef) {
      this.viewRef = contentValue.createEmbeddedView({});
      this.renderer.appendChild(popoverEl, this.viewRef.rootNodes[0]);
    } else {
      this.renderer.appendChild(popoverEl, this.renderer.createText(contentValue));
    }
  }

  private destroyPopover() {
    if (this.unlistenToggle) {
      this.unlistenToggle();
      this.unlistenToggle = null;
    }

    this.viewRef?.destroy();
    this.hostRef?.destroy();
    this.viewRef = null;
    this.hostRef = null;
    this.vcr.clear();
  }
}
