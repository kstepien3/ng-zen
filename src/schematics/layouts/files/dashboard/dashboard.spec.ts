import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenDashboard } from './dashboard';

@Component({
  template: `
    <zen-dashboard>
      <nav zenDashboardNav>Nav</nav>
      <p>Content</p>
    </zen-dashboard>
  `,
  imports: [ZenDashboard],
})
class DashboardTestComponent {}

describe('ZenDashboard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardTestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('zen-dashboard')).toBeTruthy();
  });

  it('should project nav and content slots', () => {
    const fixture = TestBed.createComponent(DashboardTestComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.dashboard-nav [zenDashboardNav]')?.textContent).toBe('Nav');
    expect(fixture.nativeElement.querySelector('.dashboard-main p')?.textContent).toBe('Content');
  });
});
