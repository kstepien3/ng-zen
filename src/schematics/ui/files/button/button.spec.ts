import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenButton } from './button';

describe('ZenButton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenButton],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenButton);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default size md', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-size')).toBe('md');
  });

  it('should have default color neutral', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-color')).toBe('neutral');
  });

  it('should have default variant solid', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-variant')).toBe('solid');
  });

  it('should apply size sm', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-size')).toBe('sm');
  });

  it('should apply size lg', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-size')).toBe('lg');
  });

  it('should apply color primary', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.componentRef.setInput('color', 'primary');
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-color')).toBe('primary');
  });

  it('should apply variant outline', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-variant')).toBe('outline');
  });

  it('should apply variant ghost', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.componentRef.setInput('variant', 'ghost');
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-variant')).toBe('ghost');
  });

  it('should apply variant link', () => {
    const fixture = TestBed.createComponent(ZenButton);
    fixture.componentRef.setInput('variant', 'link');
    fixture.detectChanges();
    const button = fixture.nativeElement as HTMLButtonElement;
    expect(button.getAttribute('data-variant')).toBe('link');
  });
});
