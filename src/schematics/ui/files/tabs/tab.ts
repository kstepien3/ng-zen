import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { ZenTabs } from './tabs';
import type { ZenTabValue } from './tabs.types';

/**
 * ZenTab is an accessible tab button component designed following W3C WAI-ARIA APG patterns.
 * Can be used on `<button>`, `<a>`, or as `<zen-tab>`.
 *
 * It automatically connects to the parent `<zen-tabs>` container and pairs with matching panels.
 *
 * @example
 * ```html
 * <button zen-tab>Overview</button>
 * <button zen-tab value="billing">Billing</button>
 * <a zen-tab routerLink="/settings">Settings</a>
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'button[zen-tab], button[zen-btn-tab], a[zen-tab], a[zen-btn-tab], zen-tab',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tab',
    '[id]': 'id()',
    '[attr.type]': 'isButton ? "button" : null',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-controls]': 'controlsPanelId()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.tabindex]': 'tabIndex()',
    '[attr.data-state]': 'isSelected() ? "active" : "inactive"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.disabled]': 'isButton && disabled() ? "" : null',
    '(click)': 'onTabClick($event)',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ZenTab {
  private static nextId = 0;

  private readonly tabs = inject(ZenTabs);
  private readonly destroyRef = inject(DestroyRef);
  readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Explicit value identifying this tab. If omitted, automatically derived from registration index. */
  readonly value = input<ZenTabValue>();

  /** HTML id attribute for the tab. Auto-generated if not provided. */
  readonly id = input<string>(`zen-tab-${ZenTab.nextId++}`);

  /** Whether the tab is disabled. */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  protected readonly isButton = this.elementRef.nativeElement.tagName.toLowerCase() === 'button';

  /** Value used for selection matching. */
  readonly tabValue = computed<ZenTabValue>(() => {
    const explicit = this.value();
    if (explicit !== undefined && explicit !== '') {
      return explicit;
    }
    const idx = this.tabs.getTabIndex(this);
    return idx >= 0 ? idx : 0;
  });

  /** Whether this tab is currently selected. */
  readonly isSelected = computed(() => {
    const active = this.tabs.activeValue();
    const myVal = this.tabValue();
    return active !== undefined && active === myVal;
  });

  /** Roving tabindex: 0 if selected and enabled, -1 otherwise. */
  readonly tabIndex = computed(() => {
    if (this.disabled()) {
      return -1;
    }
    return this.isSelected() ? 0 : -1;
  });

  /** ID of the associated tab panel for aria-controls. */
  readonly controlsPanelId = computed(() => {
    const panel = this.tabs.getPanelByValue(this.tabValue());
    if (panel) {
      return panel.id();
    }
    const idx = this.tabs.getTabIndex(this);
    const panelByIndex = this.tabs.getPanelByIndex(idx);
    return panelByIndex?.id() ?? null;
  });

  constructor() {
    this.tabs.registerTab(this);
    this.destroyRef.onDestroy(() => {
      this.tabs.unregisterTab(this);
    });
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
    if (typeof this.elementRef.nativeElement.scrollIntoView === 'function') {
      this.elementRef.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  protected onTabClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.tabs.selectTab(this.tabValue());
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      if (!this.isButton) {
        event.preventDefault();
        this.tabs.selectTab(this.tabValue());
      }
    }
  }
}
