import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ValidationError } from '@angular/forms/signals';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenTextarea } from './textarea';

@Component({
  imports: [ZenTextarea],
  template: `
    <zen-textarea
      [autoresize]="autoresize()"
      [cols]="cols()"
      [disabled]="disabled()"
      [errors]="errors()"
      [hint]="hint()"
      [invalid]="invalid()"
      [label]="label()"
      [placeholder]="placeholder()"
      [readonly]="readonly()"
      [required]="required()"
      [rows]="rows()"
      [touched]="touched()"
      [warn]="warn()"
      [(value)]="value"
    >
      @if (customError()) {
        <ng-template #error let-error>Custom: {{ error.message }}</ng-template>
      }
    </zen-textarea>
  `,
})
class TestTextareaHostComponent {
  readonly label = signal('');
  readonly hint = signal('');
  readonly warn = signal('');
  readonly invalid = signal(false);
  readonly touched = signal(false);
  readonly required = signal(false);
  readonly disabled = signal(false);
  readonly readonly = signal(false);
  readonly autoresize = signal(false);
  readonly rows = signal(3);
  readonly cols = signal<number | undefined>(undefined);
  readonly placeholder = signal('');
  readonly errors = signal<ValidationError.WithOptionalFieldTree[]>([]);
  readonly customError = signal(false);
  readonly value = signal('');
}

describe('ZenTextarea', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenTextarea, TestTextareaHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenTextarea);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render label linked to textarea id and handle required state', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
    fixture.componentInstance.label.set('Description');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const textareaEl = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;

    expect(labelEl).toBeTruthy();
    expect(labelEl.textContent?.trim()).toBe('Description');
    expect(labelEl.getAttribute('for')).toBe(textareaEl.id);
    expect(textareaEl.id).toMatch(/^zen-control-\d+$/);

    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('zen-label .required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.textContent).toBe('*');
  });

  it('should render hint when provided', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
    fixture.componentInstance.hint.set('Informational hint');
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('neutral');
    expect(hintEl.textContent?.trim()).toBe('Informational hint');
  });

  it('should render warn when provided and take precedence over hint', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
    fixture.componentInstance.hint.set('Informational hint');
    fixture.componentInstance.warn.set('Warning message');
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('warning');
    expect(hintEl.textContent?.trim()).toBe('Warning message');
  });

  it('should render error messages when invalid and touched', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(true);
    fixture.componentInstance.errors.set([
      { kind: 'required', message: 'Field required' },
      { kind: 'minLength', message: 'Min length 10' },
    ]);
    fixture.detectChanges();

    const hintEls = fixture.nativeElement.querySelectorAll('zen-hint');
    expect(hintEls.length).toBe(2);
    expect(hintEls[0].getAttribute('data-severity')).toBe('error');
    expect(hintEls[0].textContent?.trim()).toBe('Field required');
    expect(hintEls[1].textContent?.trim()).toBe('Min length 10');
  });

  it('should allow overriding error message via ng-template #error', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
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

  it('should update value on input event', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
    fixture.detectChanges();

    const textareaEl = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textareaEl.value = 'Hello world';
    textareaEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('Hello world');
  });

  it('should bind rows, cols, placeholder, and autoresize attributes', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
    fixture.componentInstance.rows.set(5);
    fixture.componentInstance.cols.set(40);
    fixture.componentInstance.placeholder.set('Type here...');
    fixture.componentInstance.autoresize.set(true);
    fixture.detectChanges();

    const textareaEl = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    expect(textareaEl.rows).toBe(5);
    expect(textareaEl.cols).toBe(40);
    expect(textareaEl.placeholder).toBe('Type here...');
    expect(textareaEl.hasAttribute('autoresize')).toBe(true);
  });

  it('should handle disabled state', () => {
    const fixture = TestBed.createComponent(TestTextareaHostComponent);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const textareaEl = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    expect(textareaEl.disabled).toBe(true);
  });
});
