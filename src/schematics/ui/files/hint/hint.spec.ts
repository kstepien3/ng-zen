import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenHint } from './hint';

describe('ZenHint', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenHint],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenHint);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set default severity to neutral and role to status', () => {
    const fixture = TestBed.createComponent(ZenHint);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-severity')).toBe('neutral');
    expect(el.getAttribute('role')).toBe('status');
  });

  it('should set role to alert when severity is error or danger', () => {
    const fixture = TestBed.createComponent(ZenHint);
    fixture.componentRef.setInput('severity', 'error');
    fixture.detectChanges();
    let el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-severity')).toBe('error');
    expect(el.getAttribute('role')).toBe('alert');

    fixture.componentRef.setInput('severity', 'danger');
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-severity')).toBe('danger');
    expect(el.getAttribute('role')).toBe('alert');
  });

  it('should set role to status for info, warning, success, and primary', () => {
    const fixture = TestBed.createComponent(ZenHint);
    for (const severity of ['info', 'warning', 'success', 'primary'] as const) {
      fixture.componentRef.setInput('severity', severity);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.getAttribute('data-severity')).toBe(severity);
      expect(el.getAttribute('role')).toBe('status');
    }
  });
});
