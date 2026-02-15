import { Component, provideZonelessChangeDetection, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ZenPopover } from './popover';

@Component({
  template: `
    <button [zenPopover]="content" id="trigger-btn" zenPopoverPlacement="bottom">Trigger</button>

    <ng-template #content>Popover content</ng-template>
  `,
  standalone: true,
  imports: [ZenPopover],
})
class TemplateBottomComponent {
  @ViewChild('content', { static: true }) content!: TemplateRef<unknown>;
}

@Component({
  template: `
    <button [zenPopover]="content" id="trigger-btn" zenPopoverPlacement="left">Trigger</button>

    <ng-template #content>Popover content</ng-template>
  `,
  standalone: true,
  imports: [ZenPopover],
})
class TemplateLeftComponent {
  @ViewChild('content', { static: true }) content!: TemplateRef<unknown>;
}

@Component({
  template: `
    <button [zenPopover]="'String content'" id="trigger-btn">Trigger</button>
  `,
  standalone: true,
  imports: [ZenPopover],
})
class StringContentComponent {}

function getPopoverHostEl(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('[popover="auto"]') as HTMLElement | null;
}

describe('ZenPopover', () => {
  beforeEach(() => {
    HTMLElement.prototype.showPopover = vi.fn();
  });

  describe('TemplateRef content', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TemplateBottomComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
    });

    it('does not create another host on second click while open', () => {
      const fixture = TestBed.createComponent(TemplateBottomComponent);
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('#trigger-btn') as HTMLButtonElement;

      trigger.click();
      fixture.detectChanges();

      const host1 = getPopoverHostEl(fixture)!;
      expect(host1).toBeTruthy();

      trigger.click();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('[popover="auto"]').length).toBe(1);
      expect(getPopoverHostEl(fixture)).toBe(host1);
    });

    it('creates host on click and calls showPopover()', () => {
      const fixture = TestBed.createComponent(TemplateBottomComponent);
      fixture.detectChanges();

      fixture.nativeElement.querySelector('#trigger-btn').click();
      fixture.detectChanges();

      const host = getPopoverHostEl(fixture)!;
      expect(host.showPopover).toHaveBeenCalledTimes(1);
    });

    it('renders TemplateRef content into host', () => {
      const fixture = TestBed.createComponent(TemplateBottomComponent);
      fixture.detectChanges();

      fixture.nativeElement.querySelector('#trigger-btn').click();
      fixture.detectChanges();

      expect(getPopoverHostEl(fixture)!.textContent).toContain('Popover content');
    });

    it('passes placement to host as data-placement (bottom)', () => {
      const fixture = TestBed.createComponent(TemplateBottomComponent);
      fixture.detectChanges();

      fixture.nativeElement.querySelector('#trigger-btn').click();
      fixture.detectChanges();

      expect(getPopoverHostEl(fixture)!.getAttribute('data-placement')).toBe('bottom');
    });

    it('sets anchor styles on trigger and host', () => {
      const fixture = TestBed.createComponent(TemplateBottomComponent);
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('#trigger-btn') as HTMLButtonElement;
      trigger.click();
      fixture.detectChanges();

      const host = getPopoverHostEl(fixture)!;

      expect(trigger.style.getPropertyValue('anchor-name')).toMatch(/^--anchor-/);
      expect(host.style.getPropertyValue('position-anchor')).toBe(trigger.style.getPropertyValue('anchor-name'));
    });

    it('destroys host when beforetoggle closes', () => {
      const fixture = TestBed.createComponent(TemplateBottomComponent);
      fixture.detectChanges();

      fixture.nativeElement.querySelector('#trigger-btn').click();
      fixture.detectChanges();

      const host = getPopoverHostEl(fixture)!;

      const ev = new Event('beforetoggle');
      Object.defineProperty(ev, 'newState', { value: 'closed' });

      host.dispatchEvent(ev);
      fixture.detectChanges();

      expect(getPopoverHostEl(fixture)).toBeNull();
    });
  });

  it('reflects placement as data-placement (left)', async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateLeftComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture = TestBed.createComponent(TemplateLeftComponent);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('#trigger-btn').click();
    fixture.detectChanges();

    expect(getPopoverHostEl(fixture)!.getAttribute('data-placement')).toBe('left');
  });

  it('renders string content as text node in host', async () => {
    await TestBed.configureTestingModule({
      imports: [StringContentComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture = TestBed.createComponent(StringContentComponent);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('#trigger-btn').click();
    fixture.detectChanges();

    expect(getPopoverHostEl(fixture)!.textContent).toContain('String content');
  });
});
