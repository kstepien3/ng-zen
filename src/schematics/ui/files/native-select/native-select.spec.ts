import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { ValidationError } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ZenNativeSelect } from './native-select';
import { ZenNativeSelectOption } from './native-select.types';

@Component({
  template: `
    <zen-native-select
      [disabled]="disabled()"
      [errors]="errors()"
      [hint]="hint()"
      [id]="id()"
      [invalid]="invalid()"
      [label]="label()"
      [options]="options()"
      [placeholder]="placeholder()"
      [required]="required()"
      [touched]="touched()"
      [warn]="warn()"
      [(value)]="selectedValue"
    >
      @if (useNgContent()) {
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      }
      @if (customError()) {
        <ng-template #error let-error>Custom: {{ error.message }}</ng-template>
      }
    </zen-native-select>
  `,
  imports: [ZenNativeSelect],
})
class TestHostComponent {
  readonly selectedValue = signal('opt1');
  readonly disabled = signal(false);
  readonly invalid = signal(false);
  readonly required = signal(false);
  readonly label = signal('');
  readonly hint = signal('');
  readonly warn = signal('');
  readonly touched = signal(false);
  readonly id = signal('test-select');
  readonly placeholder = signal('');
  readonly options = signal<ZenNativeSelectOption[]>([]);
  readonly useNgContent = signal(true);
  readonly errors = signal<ValidationError.WithOptionalFieldTree[]>([]);
  readonly customError = signal(false);
}

describe('ZenNativeSelect', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ZenNativeSelect],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const select = fixture.debugElement.query(By.directive(ZenNativeSelect));
    expect(select).toBeTruthy();
  });

  it('should render select with options via ng-content and chevron arrow', () => {
    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(selectEl).toBeTruthy();
    expect(selectEl.id).toBe('test-select');
    expect(selectEl.value).toBe('opt1');

    const arrowEl = fixture.nativeElement.querySelector('.zen-native-select-arrow');
    expect(arrowEl).toBeTruthy();
    expect(arrowEl.querySelector('svg')).toBeTruthy();

    const options = selectEl.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[0].value).toBe('opt1');
    expect(options[1].value).toBe('opt2');
    expect(options[2].value).toBe('opt3');
  });

  it('should render options passed via [options] input', () => {
    host.useNgContent.set(false);
    host.options.set([
      { label: 'Alpha', value: 'a' },
      { label: 'Beta', value: 'b', disabled: true },
      { label: 'Gamma', value: 'c' },
    ]);
    host.selectedValue.set('a');
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const options = selectEl.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[0].textContent?.trim()).toBe('Alpha');
    expect(options[0].value).toBe('a');
    expect(options[1].textContent?.trim()).toBe('Beta');
    expect(options[1].disabled).toBe(true);
    expect(options[2].textContent?.trim()).toBe('Gamma');
  });

  it('should render placeholder option when provided', () => {
    host.placeholder.set('Select an option');
    host.selectedValue.set('');
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const options = selectEl.querySelectorAll('option');
    expect(options[0].textContent?.trim()).toBe('Select an option');
    expect(options[0].value).toBe('');
    expect(options[0].disabled).toBe(true);
    expect(options[0].selected).toBe(true);
  });

  it('should update model value on change event', () => {
    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    selectEl.value = 'opt2';
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(host.selectedValue()).toBe('opt2');
  });

  it('should reflect disabled state', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const wrapperEl = fixture.nativeElement.querySelector('.zen-native-select-wrapper') as HTMLElement;

    expect(selectEl.disabled).toBe(true);
    expect(wrapperEl.classList.contains('is-disabled')).toBe(true);
  });

  it('should not change value when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    const selectComponent = fixture.debugElement.query(By.directive(ZenNativeSelect))
      .componentInstance as ZenNativeSelect;
    selectComponent.onInput('opt3');
    fixture.detectChanges();

    expect(host.selectedValue()).toBe('opt1');
  });

  it('should reflect invalid state', () => {
    host.invalid.set(true);
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const wrapperEl = fixture.nativeElement.querySelector('.zen-native-select-wrapper') as HTMLElement;

    expect(selectEl.getAttribute('aria-invalid')).toBe('true');
    expect(wrapperEl.classList.contains('is-invalid')).toBe(true);
  });

  it('should reflect required attribute', () => {
    host.required.set(true);
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(selectEl.required).toBe(true);
  });

  it('should render label linked to select id and handle required asterisk', () => {
    host.label.set('Country Select');
    host.required.set(true);
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    expect(labelEl).toBeTruthy();
    expect(labelEl.textContent?.trim()).toContain('Country Select');
    expect(labelEl.getAttribute('for')).toBe(selectEl.id);

    const requiredSpan = fixture.nativeElement.querySelector('zen-label .required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.textContent).toBe('*');
  });

  it('should render hint when provided', () => {
    host.hint.set('Helpful dropdown hint');
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('neutral');
    expect(hintEl.textContent?.trim()).toBe('Helpful dropdown hint');
  });

  it('should render warn when provided and take precedence over hint', () => {
    host.hint.set('Informational hint');
    host.warn.set('Warning message');
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.getAttribute('data-severity')).toBe('warning');
    expect(hintEl.textContent?.trim()).toBe('Warning message');
  });

  it('should render error messages when invalid and touched', () => {
    host.invalid.set(true);
    host.touched.set(true);
    host.errors.set([
      { kind: 'required', message: 'Selection is required' },
      { kind: 'custom', message: 'Invalid option' },
    ]);
    fixture.detectChanges();

    const hintEls = fixture.nativeElement.querySelectorAll('zen-hint');
    expect(hintEls.length).toBe(2);
    expect(hintEls[0].getAttribute('data-severity')).toBe('error');
    expect(hintEls[0].textContent?.trim()).toBe('Selection is required');
    expect(hintEls[1].textContent?.trim()).toBe('Invalid option');
  });

  it('should render custom errorTemplate when provided', () => {
    host.invalid.set(true);
    host.touched.set(true);
    host.customError.set(true);
    host.errors.set([{ kind: 'required', message: 'Must pick one' }]);
    fixture.detectChanges();

    const hintEl = fixture.nativeElement.querySelector('zen-hint');
    expect(hintEl).toBeTruthy();
    expect(hintEl.textContent?.trim()).toBe('Custom: Must pick one');
  });

  it('should focus the select element when focus() is called', () => {
    const selectComponent = fixture.debugElement.query(By.directive(ZenNativeSelect))
      .componentInstance as ZenNativeSelect;
    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const focusSpy = vi.spyOn(selectEl, 'focus');

    selectComponent.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should emit touch event on focusout', () => {
    const selectComponent = fixture.debugElement.query(By.directive(ZenNativeSelect))
      .componentInstance as ZenNativeSelect;
    const touchSpy = vi.fn();
    selectComponent.touch.subscribe(touchSpy);

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    selectEl.dispatchEvent(new Event('focusout', { bubbles: true }));

    expect(touchSpy).toHaveBeenCalled();
  });
});
