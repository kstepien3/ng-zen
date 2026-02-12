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

@Directive({
  selector: '[zenPopover]',
  standalone: true,
  host: {
    '(click)': 'togglePopover()',
  },
})
export class ZenPopover {
  readonly content = input.required<TemplateRef<unknown> | string>({ alias: 'zenPopover' });

  private static uniqueId = 0;
  private readonly id = `zen-popover-${ZenPopover.uniqueId++}`;
  private readonly anchorName = `--anchor-${this.id}`;

  private hostRef: ComponentRef<ZenPopoverHost> | null = null;
  private viewRef: EmbeddedViewRef<unknown> | null = null;

  private unlistenToggle: (() => void) | null = null;

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

  togglePopover() {
    if (this.hostRef) {
      return;
    }

    this.renderer.setStyle(this.triggerEl, 'anchor-name', this.anchorName);
    this.hostRef = this.vcr.createComponent(ZenPopoverHost);
    this.hostRef.setInput('id', this.id);

    const popoverEl = this.hostRef.location.nativeElement as HTMLElement;
    this.renderer.setStyle(popoverEl, 'position-anchor', this.anchorName);

    const contentValue = this.content();
    if (contentValue instanceof TemplateRef) {
      this.viewRef = contentValue.createEmbeddedView({});
      this.renderer.appendChild(popoverEl, this.viewRef.rootNodes[0]);
    } else {
      const textNode = this.renderer.createText(contentValue);
      this.renderer.appendChild(popoverEl, textNode);
    }
    this.unlistenToggle = this.renderer.listen(popoverEl, 'toggle', (event: ToggleEvent) => {
      if (event.newState === 'closed') {
        this.destroyPopover();
      }
    });

    popoverEl.showPopover();
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
