import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';

import type { ZenTab } from './tab';
import type { ZenTabPanel } from './tab-panel';
import { ZenTabsActivationMode, ZenTabsOrientation, ZenTabsSize, ZenTabsVariant, ZenTabValue } from './tabs.types';

/**
 * ZenTabs is a compound tabs component designed following W3C WAI-ARIA APG patterns.
 * It manages tab state (automatically or controlled via `model()`) and provides keyboard navigation
 * and accessible tablist/tab/tabpanel semantics.
 *
 * @example
 *
 * ```html
 * <!-- Zero boilerplate / automatic mode -->
 * <zen-tabs>
 *   <zen-tab-list>
 *     <button zen-tab>Account</button>
 *     <button zen-tab>Password</button>
 *   </zen-tab-list>
 *   <zen-tab-panel>Account settings...</zen-tab-panel>
 *   <zen-tab-panel>Password settings...</zen-tab-panel>
 * </zen-tabs>
 *
 * <!-- Controlled mode with explicit values and custom variant -->
 * <zen-tabs [(value)]="activeTab" variant="pills">
 *   <zen-tab-list>
 *     <button zen-tab value="profile">Profile</button>
 *     <button zen-tab value="billing">Billing</button>
 *   </zen-tab-list>
 *   <zen-tab-panel value="profile">Profile content...</zen-tab-panel>
 *   <zen-tab-panel value="billing" [lazy]="true">Billing content...</zen-tab-panel>
 * </zen-tabs>
 * ```
 *
 * ### CSS Custom Properties
 *
 * ```css
 * :root {
 *   --zen-tabs-bg: hsl(0deg 0% 95%);
 *   --zen-tabs-radius: 0.5rem;
 *   --zen-tab-padding: 0.375rem 0.75rem;
 *   --zen-tab-gap: 0.25rem;
 *   --zen-tab-color: hsl(0deg 0% 45%);
 *   --zen-tab-active-bg: hsl(0deg 0% 100%);
 *   --zen-tab-active-color: hsl(0deg 0% 10%);
 *   --zen-tab-active-shadow: 0 1px 3px hsl(0deg 0% 0% / 0.1);
 *   --zen-tab-hover-color: hsl(0deg 0% 20%);
 *   --zen-tab-line-color: hsl(200deg 100% 50%);
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-tabs',
  template: '<ng-content />',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
  },
})
export class ZenTabs {
  /** The currently selected tab value. Supports two-way binding. */
  readonly value = model<ZenTabValue>();

  /** Initial tab value used when `value` is not explicitly set. */
  readonly defaultValue = input<ZenTabValue>();

  /** Visual variant: 'pills' (default container style) or 'line' (classic underline style). */
  readonly variant = input<ZenTabsVariant>('pills');

  /** Orientation of the tabs: 'horizontal' or 'vertical'. */
  readonly orientation = input<ZenTabsOrientation>('horizontal');

  /** Keyboard activation mode: 'auto' (immediate activation on focus) or 'manual' (requires Enter/Space). */
  readonly activationMode = input<ZenTabsActivationMode>('auto');

  /** Size variant of the tabs. */
  readonly size = input<ZenTabsSize>('md');

  /** Internal registry of child tabs. */
  readonly registeredTabs = signal<ZenTab[]>([]);

  /** Internal registry of child tab panels. */
  readonly registeredPanels = signal<ZenTabPanel[]>([]);

  /** Computed active value resolving explicit model, defaultValue, or first non-disabled tab. */
  readonly activeValue = computed<ZenTabValue | undefined>(() => {
    const explicit = this.value();
    if (explicit !== undefined && explicit !== '') {
      return explicit;
    }

    const defaultVal = this.defaultValue();
    if (defaultVal !== undefined && defaultVal !== '') {
      return defaultVal;
    }

    const tabsList = this.registeredTabs();
    if (tabsList.length === 0) {
      return undefined;
    }

    const firstActive = tabsList.find(t => !t.disabled());
    return firstActive?.tabValue() ?? tabsList[0]?.tabValue();
  });

  registerTab(tab: ZenTab): void {
    this.registeredTabs.update(tabs => [...tabs, tab]);
  }

  unregisterTab(tab: ZenTab): void {
    this.registeredTabs.update(tabs => tabs.filter(t => t !== tab));
  }

  registerPanel(panel: ZenTabPanel): void {
    this.registeredPanels.update(panels => [...panels, panel]);
  }

  unregisterPanel(panel: ZenTabPanel): void {
    this.registeredPanels.update(panels => panels.filter(p => p !== panel));
  }

  selectTab(val: ZenTabValue): void {
    this.value.set(val);
  }

  getTabIndex(tab: ZenTab): number {
    return this.registeredTabs().indexOf(tab);
  }

  getPanelIndex(panel: ZenTabPanel): number {
    return this.registeredPanels().indexOf(panel);
  }

  getTabByIndex(index: number): ZenTab | undefined {
    return this.registeredTabs()[index];
  }

  getPanelByIndex(index: number): ZenTabPanel | undefined {
    return this.registeredPanels()[index];
  }

  getPanelByValue(val: ZenTabValue): ZenTabPanel | undefined {
    return this.registeredPanels().find(p => p.panelValue() === val);
  }

  getTabByValue(val: ZenTabValue): ZenTab | undefined {
    return this.registeredTabs().find(t => t.tabValue() === val);
  }
}
