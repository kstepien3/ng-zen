import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenBadge } from './badge';

describe('ZenBadge', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenBadge],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenBadge);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default color neutral', () => {
    const fixture = TestBed.createComponent(ZenBadge);
    fixture.detectChanges();
    const badge = fixture.nativeElement as HTMLElement;
    expect(badge.getAttribute('data-color')).toBe('neutral');
  });

  it('should have default variant solid', () => {
    const fixture = TestBed.createComponent(ZenBadge);
    fixture.detectChanges();
    const badge = fixture.nativeElement as HTMLElement;
    expect(badge.getAttribute('data-variant')).toBe('solid');
  });

  const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

  for (const color of colors) {
    it(`should apply color ${color}`, () => {
      const fixture = TestBed.createComponent(ZenBadge);
      fixture.componentRef.setInput('color', color);
      fixture.detectChanges();
      const badge = fixture.nativeElement as HTMLElement;
      expect(badge.getAttribute('data-color')).toBe(color);
    });
  }

  const variants = ['solid', 'outline', 'filled', 'ghost'] as const;

  for (const variant of variants) {
    it(`should apply variant ${variant}`, () => {
      const fixture = TestBed.createComponent(ZenBadge);
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      const badge = fixture.nativeElement as HTMLElement;
      expect(badge.getAttribute('data-variant')).toBe(variant);
    });
  }
});
