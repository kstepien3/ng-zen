import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  ZenTab,
  ZenTabList,
  ZenTabPanel,
  ZenTabs,
  ZenTabsActivationMode,
  ZenTabsOrientation,
  ZenTabValue,
} from './index';

@Component({
  imports: [ZenTabs, ZenTabList, ZenTab, ZenTabPanel],
  template: `
    <zen-tabs>
      <zen-tab-list>
        <button type="button" zen-tab>Tab 1</button>
        <button type="button" zen-tab>Tab 2</button>
        <button type="button" zen-tab>Tab 3</button>
      </zen-tab-list>
      <zen-tab-panel>Content 1</zen-tab-panel>
      <zen-tab-panel>Content 2</zen-tab-panel>
      <zen-tab-panel>Content 3</zen-tab-panel>
    </zen-tabs>
  `,
})
class AutomaticTabsTestComponent {}

@Component({
  imports: [ZenTabs, ZenTabList, ZenTab, ZenTabPanel],
  template: `
    <zen-tabs [(value)]="activeTab">
      <zen-tab-list>
        <button type="button" value="account" zen-tab>Account</button>
        <button type="button" value="password" zen-tab>Password</button>
      </zen-tab-list>
      <zen-tab-panel value="account">Account Content</zen-tab-panel>
      <zen-tab-panel value="password">Password Content</zen-tab-panel>
    </zen-tabs>
  `,
})
class ControlledTabsTestComponent {
  readonly activeTab = signal<ZenTabValue>('account');
}

@Component({
  imports: [ZenTabs, ZenTabList, ZenTab, ZenTabPanel],
  template: `
    <zen-tabs [activationMode]="activationMode()" [orientation]="orientation()">
      <zen-tab-list>
        <button id="tab-a" type="button" zen-tab>Tab A</button>
        <button id="tab-b" type="button" zen-tab [disabled]="tabBDisabled()">Tab B</button>
        <button id="tab-c" type="button" zen-tab>Tab C</button>
      </zen-tab-list>
      <zen-tab-panel>Panel A</zen-tab-panel>
      <zen-tab-panel>Panel B</zen-tab-panel>
      <zen-tab-panel>Panel C</zen-tab-panel>
    </zen-tabs>
  `,
})
class KeyboardNavTestComponent {
  readonly orientation = signal<ZenTabsOrientation>('horizontal');
  readonly activationMode = signal<ZenTabsActivationMode>('auto');
  readonly tabBDisabled = signal(false);
}

@Component({
  imports: [ZenTabs, ZenTabList, ZenTab, ZenTabPanel],
  template: `
    <zen-tabs>
      <zen-tab-list>
        <button type="button" zen-tab>First</button>
        <button type="button" zen-tab>Lazy Tab</button>
      </zen-tab-list>
      <zen-tab-panel>First Content</zen-tab-panel>
      <zen-tab-panel [lazy]="true">
        <span class="lazy-marker">Deferred Content</span>
      </zen-tab-panel>
    </zen-tabs>
  `,
})
class LazyTabsTestComponent {}

describe('ZenTabs', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  describe('Automatic Uncontrolled Mode', () => {
    let fixture: ComponentFixture<AutomaticTabsTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(AutomaticTabsTestComponent);
      fixture.detectChanges();
    });

    it('should select first tab and panel by default', () => {
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));
      const panels = fixture.debugElement.queryAll(By.directive(ZenTabPanel));

      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(tabs[0].nativeElement.getAttribute('tabindex')).toBe('0');
      expect(tabs[0].nativeElement.getAttribute('data-state')).toBe('active');

      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('false');
      expect(tabs[1].nativeElement.getAttribute('tabindex')).toBe('-1');

      expect(panels[0].nativeElement.hasAttribute('hidden')).toBe(false);
      expect(panels[0].nativeElement.getAttribute('data-state')).toBe('active');
      expect(panels[1].nativeElement.hasAttribute('hidden')).toBe(true);
    });

    it('should switch tabs on click', () => {
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));
      const panels = fixture.debugElement.queryAll(By.directive(ZenTabPanel));

      tabs[1].nativeElement.click();
      fixture.detectChanges();

      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('false');
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(panels[0].nativeElement.hasAttribute('hidden')).toBe(true);
      expect(panels[1].nativeElement.hasAttribute('hidden')).toBe(false);
    });

    it('should set ARIA controls and labelledby between tabs and panels', () => {
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));
      const panels = fixture.debugElement.queryAll(By.directive(ZenTabPanel));

      const tab0Id = tabs[0].nativeElement.id;
      const tab0Controls = tabs[0].nativeElement.getAttribute('aria-controls');
      const panel0Id = panels[0].nativeElement.id;
      const panel0LabelledBy = panels[0].nativeElement.getAttribute('aria-labelledby');

      expect(tab0Controls).toBe(panel0Id);
      expect(panel0LabelledBy).toBe(tab0Id);
    });
  });

  describe('Controlled Mode', () => {
    let fixture: ComponentFixture<ControlledTabsTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ControlledTabsTestComponent);
      fixture.detectChanges();
    });

    it('should select tab matching the bound model value', () => {
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));
      const panels = fixture.debugElement.queryAll(By.directive(ZenTabPanel));

      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(panels[0].nativeElement.hasAttribute('hidden')).toBe(false);
      expect(panels[1].nativeElement.hasAttribute('hidden')).toBe(true);
    });

    it('should update model when a tab is clicked', () => {
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));

      tabs[1].nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.activeTab()).toBe('password');
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should update active tab when model changes externally', () => {
      fixture.componentInstance.activeTab.set('password');
      fixture.detectChanges();

      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));
      const panels = fixture.debugElement.queryAll(By.directive(ZenTabPanel));

      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(panels[1].nativeElement.hasAttribute('hidden')).toBe(false);
      expect(panels[0].nativeElement.hasAttribute('hidden')).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    let fixture: ComponentFixture<KeyboardNavTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(KeyboardNavTestComponent);
      fixture.detectChanges();
    });

    it('should navigate with ArrowRight and ArrowLeft in horizontal orientation', () => {
      const tabList = fixture.debugElement.query(By.directive(ZenTabList));
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));

      // Focus first tab
      tabs[0].nativeElement.focus();

      // Press ArrowRight
      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();

      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');

      // Press ArrowRight again to reach tab C
      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();

      expect(tabs[2].nativeElement.getAttribute('aria-selected')).toBe('true');

      // Press ArrowRight again to wrap around to tab A
      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();

      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');

      // Press ArrowLeft to wrap around to tab C
      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      fixture.detectChanges();

      expect(tabs[2].nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should navigate to first/last tab on Home and End keys', () => {
      const tabList = fixture.debugElement.query(By.directive(ZenTabList));
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));

      tabs[0].nativeElement.focus();

      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      fixture.detectChanges();
      expect(tabs[2].nativeElement.getAttribute('aria-selected')).toBe('true');

      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      fixture.detectChanges();
      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should navigate with ArrowDown and ArrowUp in vertical orientation', () => {
      fixture.componentInstance.orientation.set('vertical');
      fixture.detectChanges();

      const tabList = fixture.debugElement.query(By.directive(ZenTabList));
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));

      tabs[0].nativeElement.focus();

      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');

      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should skip disabled tabs during keyboard navigation', () => {
      fixture.componentInstance.tabBDisabled.set(true);
      fixture.detectChanges();

      const tabList = fixture.debugElement.query(By.directive(ZenTabList));
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));

      tabs[0].nativeElement.focus();

      // ArrowRight from tab A should skip disabled tab B directly to tab C
      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();

      expect(tabs[2].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('false');
    });

    it('should not activate tab immediately in manual mode until Space/Enter', () => {
      fixture.componentInstance.activationMode.set('manual');
      fixture.detectChanges();

      const tabList = fixture.debugElement.query(By.directive(ZenTabList));
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));

      tabs[0].nativeElement.focus();

      // Navigate to next tab
      tabList.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();

      // Tab A should still be selected in manual mode
      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('false');

      // Now click / trigger Enter on tab B
      tabs[1].nativeElement.click();
      fixture.detectChanges();

      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should not select disabled tab when clicked', () => {
      fixture.componentInstance.tabBDisabled.set(true);
      fixture.detectChanges();

      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));
      tabs[1].nativeElement.click();
      fixture.detectChanges();

      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('Lazy Rendering', () => {
    let fixture: ComponentFixture<LazyTabsTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(LazyTabsTestComponent);
      fixture.detectChanges();
    });

    it('should defer rendering lazy panel until activated, then preserve it in DOM', () => {
      const tabs = fixture.debugElement.queryAll(By.directive(ZenTab));

      // Initially lazy panel content is not rendered
      let lazyMarker = fixture.debugElement.query(By.css('.lazy-marker'));
      expect(lazyMarker).toBeNull();

      // Activate lazy tab
      tabs[1].nativeElement.click();
      fixture.detectChanges();

      lazyMarker = fixture.debugElement.query(By.css('.lazy-marker'));
      expect(lazyMarker).toBeTruthy();

      // Switch back to first tab
      tabs[0].nativeElement.click();
      fixture.detectChanges();

      // Content should still exist in DOM (keep-alive cached), but panel has hidden
      lazyMarker = fixture.debugElement.query(By.css('.lazy-marker'));
      expect(lazyMarker).toBeTruthy();

      const panels = fixture.debugElement.queryAll(By.directive(ZenTabPanel));
      expect(panels[1].nativeElement.hasAttribute('hidden')).toBe(true);
    });
  });
});
