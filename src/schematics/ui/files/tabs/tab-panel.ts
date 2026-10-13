import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { ZenTabs } from './tabs';
import type { ZenTabValue } from './tabs.types';

/**
 * ZenTabPanel represents the accessible content container corresponding to a tab.
 * Follows W3C WAI-ARIA APG patterns. Supports keep-alive DOM preservation by default,
 * and optional deferred rendering via `[lazy]="true"`.
 *
 * @example
 * ```html
 * <zen-tab-panel>General settings content</zen-tab-panel>
 * <zen-tab-panel value="billing" [lazy]="true">Heavy billing charts</zen-tab-panel>
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-tab-panel',
  template: `
    @if (!lazy() || hasBeenActive()) {
      <ng-content />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tabpanel',
    '[id]': 'id()',
    '[attr.aria-labelledby]': 'labelledByTabId()',
    '[attr.tabindex]': 'isActive() ? 0 : -1',
    '[hidden]': '!isActive()',
    '[style.display]': 'isActive() ? null : "none"',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
  },
})
export class ZenTabPanel {
  private static nextId = 0;

  private readonly tabs = inject(ZenTabs);
  private readonly destroyRef = inject(DestroyRef);

  /** Explicit value matching the associated tab. If omitted, automatically matched by index. */
  readonly value = input<ZenTabValue>();

  /** HTML id attribute for the panel. Auto-generated if not provided. */
  readonly id = input<string>(`zen-tabpanel-${ZenTabPanel.nextId++}`);

  /** Whether to defer rendering until the tab is first activated. */
  readonly lazy = input<boolean, unknown>(false, { transform: booleanAttribute });

  /** Tracks whether the panel has ever been activated, for lazy rendering. */
  protected readonly hasBeenActive = signal(false);

  /** Value used for selection matching. */
  readonly panelValue = computed<ZenTabValue>(() => {
    const explicit = this.value();
    if (explicit !== undefined && explicit !== '') {
      return explicit;
    }
    const idx = this.tabs.getPanelIndex(this);
    if (idx >= 0) {
      const matchingTab = this.tabs.getTabByIndex(idx);
      if (matchingTab) {
        return matchingTab.tabValue();
      }
      return idx;
    }
    return 0;
  });

  /** Whether this panel is currently active. */
  readonly isActive = computed(() => {
    const active = this.tabs.activeValue();
    const myVal = this.panelValue();
    return active !== undefined && active === myVal;
  });

  /** ID of the associated tab button for aria-labelledby. */
  readonly labelledByTabId = computed(() => {
    const tab = this.tabs.getTabByValue(this.panelValue());
    if (tab) {
      return tab.id();
    }
    const idx = this.tabs.getPanelIndex(this);
    const tabByIndex = this.tabs.getTabByIndex(idx);
    return tabByIndex?.id() ?? null;
  });

  constructor() {
    this.tabs.registerPanel(this);
    this.destroyRef.onDestroy(() => {
      this.tabs.unregisterPanel(this);
    });

    effect(() => {
      if (this.isActive()) {
        this.hasBeenActive.set(true);
      }
    });
  }
}
