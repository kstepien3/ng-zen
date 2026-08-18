import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ZenDrawer } from './drawer';

@Component({
  template: `
    <zen-drawer
      [closeOnEscape]="closeOnEscape()"
      [handleOnly]="handleOnly()"
      [initialSnap]="initialSnap()"
      [scaleBackground]="scaleBackground()"
      [side]="side()"
      [size]="size()"
      [snapPoints]="snapPoints()"
      [swipeHandle]="swipeHandle()"
      [(open)]="isOpen"
    >
      <div drawer-header>Test Drawer</div>
      <p>Drawer content</p>
      <div drawer-footer>Footer text</div>
    </zen-drawer>
  `,
  standalone: true,
  imports: [ZenDrawer],
})
class DrawerTestComponent {
  readonly isOpen = signal(false);
  readonly side = signal<'left' | 'right' | 'top' | 'bottom'>('right');
  readonly size = signal<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  readonly closeOnEscape = signal(true);
  readonly swipeHandle = signal(true);
  readonly handleOnly = signal(false);
  readonly scaleBackground = signal(false);
  readonly snapPoints = signal<(number | string)[]>([]);
  readonly initialSnap = signal<number | string | undefined>(undefined);
}

function getDrawerEl(fixture: ComponentFixture<unknown>): HTMLDialogElement | null {
  return fixture.nativeElement.querySelector('zen-drawer dialog.zen-drawer') as HTMLDialogElement | null;
}

describe('ZenDrawer', () => {
  beforeEach(async () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  describe('Component usage', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DrawerTestComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
    });

    it('should create', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.detectChanges();
      expect(getDrawerEl(fixture)).toBeTruthy();
    });

    it('should call showModal when open is set to true', async () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.detectChanges();

      const drawerEl = getDrawerEl(fixture)!;
      expect(drawerEl.showModal).not.toHaveBeenCalled();

      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(drawerEl.showModal).toHaveBeenCalledTimes(1);
    });

    it('should call close when open is set to false', async () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const drawerEl = getDrawerEl(fixture)!;
      Object.defineProperty(drawerEl, 'open', { value: true, writable: true });

      fixture.componentInstance.isOpen.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(drawerEl.close).toHaveBeenCalled();
    });

    it('should project header content via drawer-header slot', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('[drawer-header]');
      expect(header?.textContent).toBe('Test Drawer');
    });

    it('should project footer content via drawer-footer slot', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.detectChanges();

      const footer = fixture.nativeElement.querySelector('[drawer-footer]');
      expect(footer?.textContent?.trim()).toBe('Footer text');
    });

    it('should apply side attribute', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.side.set('left');
      fixture.detectChanges();

      const drawerEl = getDrawerEl(fixture)!;
      expect(drawerEl.getAttribute('data-side')).toBe('left');
    });

    it('should apply size attribute', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();

      const drawerEl = getDrawerEl(fixture)!;
      expect(drawerEl.getAttribute('data-size')).toBe('lg');
    });

    it('should apply data-swipe-direction', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.side.set('bottom');
      fixture.detectChanges();

      const drawerEl = getDrawerEl(fixture)!;
      expect(drawerEl.getAttribute('data-swipe-direction')).toBe('bottom');
    });

    it('should apply data-swipe-axis for side drawer', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.side.set('right');
      fixture.detectChanges();

      const drawerEl = getDrawerEl(fixture)!;
      expect(drawerEl.getAttribute('data-swipe-axis')).toBe('x');
    });

    it('should apply data-swipe-axis for vertical drawer', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.side.set('top');
      fixture.detectChanges();

      const drawerEl = getDrawerEl(fixture)!;
      expect(drawerEl.getAttribute('data-swipe-axis')).toBe('y');
    });

    it('should apply data-snap-points when snapPoints provided', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.snapPoints.set([0.5, 1]);
      fixture.detectChanges();

      const drawerEl = getDrawerEl(fixture)!;
      expect(drawerEl.getAttribute('data-snap-points')).toBe('true');
    });

    it('should close when close is called', async () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const drawer = fixture.debugElement.query(By.directive(ZenDrawer)).componentInstance;
      drawer.close();
      fixture.detectChanges();

      expect(fixture.componentInstance.isOpen()).toBe(false);
    });

    it('should not close on escape when closeOnEscape is false', async () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.isOpen.set(true);
      fixture.componentInstance.closeOnEscape.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      const drawerEl = getDrawerEl(fixture)!;
      const cancelEvent = new Event('cancel', { bubbles: true, cancelable: true });
      drawerEl.dispatchEvent(cancelEvent);
      fixture.detectChanges();

      expect(fixture.componentInstance.isOpen()).toBe(true);
    });

    it('should render swipe handle when swipeHandle is true', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.detectChanges();

      const handle = fixture.nativeElement.querySelector('.zen-drawer-swipe-handle');
      expect(handle).toBeTruthy();
    });

    it('should not render swipe handle when swipeHandle is false', () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.swipeHandle.set(false);
      fixture.detectChanges();

      const handle = fixture.nativeElement.querySelector('.zen-drawer-swipe-handle');
      expect(handle).toBeNull();
    });

    it('should toggle zen-drawer-open class on body when scaleBackground is true', async () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.scaleBackground.set(true);
      fixture.detectChanges();

      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(document.body.classList.contains('zen-drawer-open')).toBe(true);

      fixture.componentInstance.isOpen.set(false);
      fixture.detectChanges();

      expect(document.body.classList.contains('zen-drawer-open')).toBe(false);
    });

    it('should not toggle zen-drawer-open class on body when scaleBackground is false', async () => {
      const fixture = TestBed.createComponent(DrawerTestComponent);
      fixture.componentInstance.scaleBackground.set(false);
      fixture.detectChanges();

      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(document.body.classList.contains('zen-drawer-open')).toBe(false);
    });
  });
});
