import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HomeIcon } from '@hugeicons/core-free-icons';
import { describe, expect, it, vi } from 'vitest';

import { ZenSidenavContent } from './content/sidenav-content';
import { ZenSidenavFooter } from './footer/sidenav-footer';
import { ZenSidenavHeader } from './header/sidenav-header';
import { ZenSidenavItem } from './item/sidenav-item';
import { ZenSidenav } from './sidenav';
import { ZenSidenavToggle } from './toggle/sidenav-toggle';

@Component({
  template: `
    <zen-sidenav [collapsed]="collapsed()">
      <div zenSidenavHeader>Brand</div>
      <nav zenSidenavContent>
        <zen-sidenav-item label="Home" routerLink="/home" [icon]="icon" />
      </nav>
      <div zenSidenavFooter>Footer</div>
      <zen-sidenav-toggle [collapsed]="collapsed()" (collapsedChange)="toggle()" />
    </zen-sidenav>
  `,
  standalone: true,
  imports: [ZenSidenav, ZenSidenavHeader, ZenSidenavContent, ZenSidenavFooter, ZenSidenavItem, ZenSidenavToggle],
})
class SidenavTestComponent {
  readonly collapsed = signal(false);
  readonly icon = HomeIcon;
  readonly toggle = vi.fn(() => this.collapsed.update(v => !v));
}

describe('ZenSidenav', () => {
  async function setup(): Promise<ComponentFixture<SidenavTestComponent>> {
    await TestBed.configureTestingModule({
      imports: [SidenavTestComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(SidenavTestComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should create with header, content, footer and toggle slots', async () => {
    const fixture = await setup();
    expect(fixture.nativeElement.querySelector('zen-sidenav')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[zenSidenavHeader]')?.textContent).toBe('Brand');
    expect(fixture.nativeElement.querySelector('[zenSidenavFooter]')?.textContent).toBe('Footer');
    expect(fixture.nativeElement.querySelector('zen-sidenav-toggle')).toBeTruthy();
  });

  it('should reflect collapsed state on data-collapsed', async () => {
    const fixture = await setup();
    const host = fixture.nativeElement.querySelector('zen-sidenav');

    expect(host.getAttribute('data-collapsed')).toBe('false');

    fixture.componentInstance.collapsed.set(true);
    fixture.detectChanges();

    expect(host.getAttribute('data-collapsed')).toBe('true');
  });

  it('should render item label, icon link and aria fallback', async () => {
    const fixture = await setup();
    const link = fixture.nativeElement.querySelector('zen-sidenav-item a');

    expect(link.textContent).toContain('Home');
    expect(link.getAttribute('aria-label')).toBe('Home');
    expect(link.getAttribute('title')).toBe('Home');
    expect(link.getAttribute('href')).toBe('/home');
    expect(fixture.nativeElement.querySelector('zen-sidenav-item zen-icon')).toBeTruthy();
  });

  it('should emit collapsedChange when toggle is clicked', async () => {
    const fixture = await setup();
    const toggle = fixture.debugElement.query(By.directive(ZenSidenavToggle));

    toggle.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.toggle).toHaveBeenCalled();
    expect(fixture.componentInstance.collapsed()).toBe(true);
  });

  it('should swap toggle label and icon with collapsed state', async () => {
    const fixture = await setup();
    const button = (): HTMLButtonElement => fixture.nativeElement.querySelector('zen-sidenav-toggle button');

    expect(button().getAttribute('aria-label')).toBe('Collapse sidenav');
    expect(button().getAttribute('aria-expanded')).toBe('true');

    fixture.componentInstance.collapsed.set(true);
    fixture.detectChanges();

    expect(button().getAttribute('aria-label')).toBe('Expand sidenav');
    expect(button().getAttribute('aria-expanded')).toBe('false');
  });
});
