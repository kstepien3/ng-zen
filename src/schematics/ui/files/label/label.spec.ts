import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenLabel } from './label';

@Component({
  imports: [ZenLabel],
  template: '<zen-label [for]="targetId" [required]="required">User Label</zen-label>',
})
class TestHostComponent {
  targetId = 'input-1';
  required = false;
}

describe('ZenLabel', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenLabel, TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenLabel);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render label with for attribute matching targetId', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(labelEl).toBeTruthy();
    expect(labelEl.getAttribute('for')).toBe('input-1');
    expect(labelEl.textContent?.trim()).toBe('User Label');
  });

  it('should support id input as fallback for for attribute', () => {
    const fixture = TestBed.createComponent(ZenLabel);
    fixture.componentRef.setInput('id', 'input-fallback');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(labelEl.getAttribute('for')).toBe('input-fallback');
  });

  it('should render asterisk when required is true', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.required = true;
    fixture.detectChanges();

    const requiredEl = fixture.nativeElement.querySelector('.required') as HTMLElement;
    expect(requiredEl).toBeTruthy();
    expect(requiredEl.textContent?.trim()).toBe('*');
  });

  it('should set size attribute', () => {
    const fixture = TestBed.createComponent(ZenLabel);
    for (const size of ['sm', 'md', 'lg'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.getAttribute('data-size')).toBe(size);
    }
  });

  it('should apply data-disabled when disabled is true', () => {
    const fixture = TestBed.createComponent(ZenLabel);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.hasAttribute('data-disabled')).toBe(true);
  });
});
