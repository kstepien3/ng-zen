import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenDot } from './dot';
import { ZenDotAnimation, ZenDotSeverity, ZenDotSize, ZenDotVariant } from './dot.types';

describe('ZenDot', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenDot],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenDot);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have default severity neutral', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-severity')).toBe('neutral');
  });

  it('should have default size md', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-size')).toBe('md');
  });

  it('should have default variant solid', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-variant')).toBe('solid');
  });

  it('should not have data-animation attribute by default', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.hasAttribute('data-animation')).toBe(false);
  });

  it('should apply all severities', () => {
    const severities: ZenDotSeverity[] = ['neutral', 'primary', 'success', 'warning', 'danger', 'info', 'error'];
    const fixture = TestBed.createComponent(ZenDot);
    for (const severity of severities) {
      fixture.componentRef.setInput('severity', severity);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.getAttribute('data-severity')).toBe(severity);
    }
  });

  it('should support color input as alias for semantic severity', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.componentRef.setInput('color', 'success');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-severity')).toBe('success');
    expect(el.style.getPropertyValue('--zen-dot-custom-color')).toBe('');
  });

  it('should apply custom hex color via color input', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.componentRef.setInput('color', '#059669');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.style.getPropertyValue('--zen-dot-custom-color')).toBe('#059669');
  });

  it('should apply preset sizes', () => {
    const sizes: ZenDotSize[] = ['xs', 'sm', 'md', 'lg'];
    const fixture = TestBed.createComponent(ZenDot);
    for (const size of sizes) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.getAttribute('data-size')).toBe(size);
    }
  });

  it('should handle custom numeric size', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.componentRef.setInput('size', 16);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.hasAttribute('data-size')).toBe(false);
    expect(el.style.getPropertyValue('--zen-dot-custom-size')).toBe('16px');
  });

  it('should handle custom string size', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.componentRef.setInput('size', '1.5rem');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.hasAttribute('data-size')).toBe(false);
    expect(el.style.getPropertyValue('--zen-dot-custom-size')).toBe('1.5rem');
  });

  it('should apply variants including pill and dnd', () => {
    const variants: ZenDotVariant[] = ['solid', 'outline', 'ring', 'dnd', 'pill'];
    const fixture = TestBed.createComponent(ZenDot);
    for (const variant of variants) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.getAttribute('data-variant')).toBe(variant);
    }
  });

  it('should apply animations', () => {
    const animations: ZenDotAnimation[] = ['wave', 'pulse', 'glow'];
    const fixture = TestBed.createComponent(ZenDot);
    for (const animation of animations) {
      fixture.componentRef.setInput('animation', animation);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.getAttribute('data-animation')).toBe(animation);
    }
  });

  it('should apply data-bordered when bordered is true', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.componentRef.setInput('bordered', true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.hasAttribute('data-bordered')).toBe(true);
  });

  it('should apply data-bordered when variant is ring', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.componentRef.setInput('variant', 'ring');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.hasAttribute('data-bordered')).toBe(true);
  });

  it('should apply data-disabled when disabled is true', () => {
    const fixture = TestBed.createComponent(ZenDot);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.hasAttribute('data-disabled')).toBe(true);
  });
});
