import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import type { ZenTab } from './tab';
import { ZenTabs } from './tabs';

/**
 * ZenTabList serves as the accessible container for tabs (`role="tablist"`).
 * Handles keyboard navigation (arrows, Home, End) and roving tabindex according to W3C WAI-ARIA APG.
 *
 * @example
 * ```html
 * <zen-tab-list>
 *   <button zen-tab>Account</button>
 *   <button zen-tab>Password</button>
 * </zen-tab-list>
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-tab-list',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tablist',
    '[attr.aria-orientation]': 'tabs.orientation()',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ZenTabList {
  protected readonly tabs = inject(ZenTabs);
  private readonly document = inject(DOCUMENT);

  protected onKeyDown(event: KeyboardEvent): void {
    const isHorizontal = this.tabs.orientation() === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    switch (event.key) {
      case nextKey:
        event.preventDefault();
        this.navigate(1);
        break;
      case prevKey:
        event.preventDefault();
        this.navigate(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.navigateToEdge('first');
        break;
      case 'End':
        event.preventDefault();
        this.navigateToEdge('last');
        break;
    }
  }

  private getCurrentFocusedIndex(): number {
    const allTabs = this.tabs.registeredTabs();
    const activeEl = this.document.activeElement;
    const focusedIdx = allTabs.findIndex(t => t.elementRef.nativeElement === activeEl);
    if (focusedIdx >= 0) {
      return focusedIdx;
    }
    const currentActiveVal = this.tabs.activeValue();
    const activeIdx = allTabs.findIndex(t => t.tabValue() === currentActiveVal);
    return activeIdx >= 0 ? activeIdx : 0;
  }

  private navigate(direction: 1 | -1): void {
    const allTabs = this.tabs.registeredTabs();
    if (allTabs.length === 0) return;

    const currentIdx = this.getCurrentFocusedIndex();
    const count = allTabs.length;

    for (let step = 1; step <= count; step++) {
      const candidateIdx = (currentIdx + direction * step + count) % count;
      const candidate = allTabs[candidateIdx];
      if (candidate && !candidate.disabled()) {
        this.activateOrFocus(candidate);
        break;
      }
    }
  }

  private navigateToEdge(edge: 'first' | 'last'): void {
    const allTabs = this.tabs.registeredTabs();
    if (allTabs.length === 0) return;

    const candidate =
      edge === 'first' ? allTabs.find(t => !t.disabled()) : [...allTabs].reverse().find(t => !t.disabled());

    if (candidate) {
      this.activateOrFocus(candidate);
    }
  }

  private activateOrFocus(tab: ZenTab): void {
    tab.focus();
    if (this.tabs.activationMode() === 'auto') {
      this.tabs.selectTab(tab.tabValue());
    }
  }
}
