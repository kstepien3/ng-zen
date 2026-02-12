import {
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

import { ZenPopoverHost } from './popover-host';

@Directive({
  selector: '[zenPopover]',
  standalone: true,
})
export class ZenPopover {
  readonly content = input.required<TemplateRef<unknown> | string>({ alias: 'zenPopover' });

  private vcr = inject(ViewContainerRef);
  private renderer = inject(Renderer2);
  private triggerEl = inject(ElementRef).nativeElement;

  private static uniqueId = 0;
  private readonly id = `zen-popover-${ZenPopover.uniqueId++}`;
  private readonly anchorName = `--anchor-${this.id}`;

  private viewRef: EmbeddedViewRef<unknown> | null = null;

  constructor() {
    effect(onCleanup => {
      const contentValue = this.content();

      // 1. Konfiguracja przycisku (Trigger)
      this.renderer.setStyle(this.triggerEl, 'anchor-name', this.anchorName);
      this.renderer.setAttribute(this.triggerEl, 'popovertarget', this.id);

      // 2. Tworzenie hosta popovera
      const hostRef = this.vcr.createComponent(ZenPopoverHost);
      hostRef.setInput('id', this.id);

      const popoverEl = hostRef.location.nativeElement;
      this.renderer.setStyle(popoverEl, 'position-anchor', this.anchorName);

      // 3. Logika renderowania zawartości
      if (contentValue instanceof TemplateRef) {
        // Renderowanie szablonu
        this.viewRef = contentValue.createEmbeddedView({});
        this.renderer.appendChild(popoverEl, this.viewRef.rootNodes[0]);
      } else {
        // Renderowanie zwykłego tekstu
        const textNode = this.renderer.createText(contentValue);
        this.renderer.appendChild(popoverEl, textNode);
      }

      // Sprzątanie przy niszczeniu lub zmianie inputa
      onCleanup(() => {
        this.viewRef?.destroy();
        this.viewRef = null;
        hostRef.destroy();
        this.vcr.clear();
      });
    });
  }
}
