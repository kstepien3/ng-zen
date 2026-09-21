import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenFocus } from './focus';

@Component({
  template: `
    <zen-focus>
      <p>Centered Content</p>
    </zen-focus>
  `,
  imports: [ZenFocus],
})
class FocusTestComponent {}

describe('ZenFocus', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusTestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FocusTestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('zen-focus')).toBeTruthy();
  });

  it('should project content', () => {
    const fixture = TestBed.createComponent(FocusTestComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('zen-focus p')?.textContent).toBe('Centered Content');
  });
});
