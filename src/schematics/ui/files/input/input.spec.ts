import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ValidationError } from '@angular/forms/signals';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenInput } from './input';

@Component({
  imports: [ZenInput],
  template: `
    <zen-input
      [errors]="errors()"
      [hint]="hint()"
      [invalid]="invalid()"
      [label]="label()"
      [required]="required()"
      [touched]="touched()"
      [warn]="warn()"
    >
      @if (customError()) {
        <ng-template #error let-error>Custom: {{ error.message }}</ng-template>
      }
    </zen-input>
  `,
})
class TestInputHostComponent {
  readonly label = signal('');
  readonly hint = signal('');
  readonly warn = signal('');
  readonly invalid = signal(false);
  readonly touched = signal(false);
  readonly required = signal(false);
  readonly errors = signal<ValidationError.WithOptionalFieldTree[]>([]);
  readonly customError = signal(false);
}

describe('ZenInput', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenInput, TestInputHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenInput);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render label linked to input id and handle required state', () => {
    const fixture = TestBed.createComponent(TestInputHostComponent);
    fixture.componentInstance.label.set('User Email');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(labelEl).toBeTruthy();
    expect(labelEl.textContent?.trim()).toBe('User Email');
    expect(labelEl.getAttribute('for')).toBe(inputEl.id);
    expect(inputEl.id).toMatch(/^zen-control-\d+$/);

    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('zen-label .required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.textContent).toBe('*');
  });

  it('should render hint when provided', () => {
    const fixture = TestBed.createComponent(TestInputHostComponent);
    fixture.componentInstance.hint.set('Informational hint');
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('info');
    expect(hintEl.textContent?.trim()).toBe('Informational hint');
  });

  it('should render warn when provided and take precedence over hint', () => {
    const fixture = TestBed.createComponent(TestInputHostComponent);
    fixture.componentInstance.hint.set('Informational hint');
    fixture.componentInstance.warn.set('Warning message');
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('warning');
    expect(hintEl.textContent?.trim()).toBe('Warning message');
  });

  it('should render error messages when invalid and touched', () => {
    const fixture = TestBed.createComponent(TestInputHostComponent);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(true);
    fixture.componentInstance.errors.set([
      { kind: 'required', message: 'Field required' },
      { kind: 'minLength', message: 'Min length 5' },
    ]);
    fixture.detectChanges();

    const hintEls = fixture.nativeElement.querySelectorAll('zen-hint');
    expect(hintEls.length).toBe(2);
    expect(hintEls[0].getAttribute('data-severity')).toBe('error');
    expect(hintEls[0].textContent?.trim()).toBe('Field required');
    expect(hintEls[1].textContent?.trim()).toBe('Min length 5');
  });

  it('should allow overriding error message via ng-template #error', () => {
    const fixture = TestBed.createComponent(TestInputHostComponent);
    fixture.componentInstance.customError.set(true);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(true);
    fixture.componentInstance.errors.set([{ kind: 'required', message: 'Field required' }]);
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('error');
    expect(hintEl.textContent?.trim()).toBe('Custom: Field required');
  });
});
