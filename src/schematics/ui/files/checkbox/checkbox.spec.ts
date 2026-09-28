import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ValidationError } from '@angular/forms/signals';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenCheckbox } from './checkbox';

@Component({
  imports: [ZenCheckbox],
  template: `
    <zen-checkbox
      [errors]="errors()"
      [hint]="hint()"
      [invalid]="invalid()"
      [label]="label()"
      [required]="required()"
      [touched]="touched()"
      [warn]="warn()"
    />
  `,
})
class TestCheckboxHostComponent {
  readonly label = signal('');
  readonly hint = signal('');
  readonly warn = signal('');
  readonly invalid = signal(false);
  readonly touched = signal(false);
  readonly required = signal(false);
  readonly errors = signal<ValidationError.WithOptionalFieldTree[]>([]);
}

describe('ZenCheckbox', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenCheckbox, TestCheckboxHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenCheckbox);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render label linked to checkbox id and handle required state', () => {
    const fixture = TestBed.createComponent(TestCheckboxHostComponent);
    fixture.componentInstance.label.set('Accept terms');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(labelEl).toBeTruthy();
    expect(labelEl.textContent?.trim()).toBe('Accept terms');
    expect(labelEl.getAttribute('for')).toBe(inputEl.id);

    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('zen-label .required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.textContent).toBe('*');
  });

  it('should handle indeterminate state and display indeterminate symbol', () => {
    const fixture = TestBed.createComponent(ZenCheckbox);
    fixture.componentRef.setInput('value', null);
    fixture.detectChanges();

    const inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(inputEl.indeterminate).toBe(true);

    const symbolEl = fixture.nativeElement.querySelector('.symbol');
    expect(symbolEl?.textContent?.trim()).toBe('─');
  });

  it('should display checkmark symbol when checked', () => {
    const fixture = TestBed.createComponent(ZenCheckbox);
    fixture.componentRef.setInput('value', true);
    fixture.detectChanges();

    const symbolEl = fixture.nativeElement.querySelector('.symbol');
    expect(symbolEl?.textContent?.trim()).toBe('✓');
  });

  it('should render errors when invalid and touched', () => {
    const fixture = TestBed.createComponent(TestCheckboxHostComponent);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(true);
    fixture.componentInstance.errors.set([{ kind: 'required', message: 'Agreement is required' }]);
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('error');
    expect(hintEl.textContent?.trim()).toBe('Agreement is required');
  });
});
