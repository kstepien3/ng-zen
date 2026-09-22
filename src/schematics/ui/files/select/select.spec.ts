import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ZenSelect } from './select';

@Component({
  template: `
    <zen-select
      id="test-select"
      [disabled]="disabled()"
      [invalid]="invalid()"
      [required]="required()"
      [(value)]="selectedValue"
    >
      <option value="opt1">Option 1</option>
      <option value="opt2">Option 2</option>
      <option value="opt3">Option 3</option>
    </zen-select>
  `,
  imports: [ZenSelect],
})
class TestHostComponent {
  readonly selectedValue = signal('opt1');
  readonly disabled = signal(false);
  readonly invalid = signal(false);
  readonly required = signal(false);
}

describe('ZenSelect', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ZenSelect],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const select = fixture.debugElement.query(By.directive(ZenSelect));
    expect(select).toBeTruthy();
  });

  it('should render select with options and chevron arrow', () => {
    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(selectEl).toBeTruthy();
    expect(selectEl.id).toBe('test-select');
    expect(selectEl.value).toBe('opt1');

    const arrowEl = fixture.nativeElement.querySelector('.zen-select-arrow');
    expect(arrowEl).toBeTruthy();
    expect(arrowEl.querySelector('svg')).toBeTruthy();
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
    const wrapperEl = fixture.nativeElement.querySelector('.zen-select-wrapper') as HTMLElement;

    expect(selectEl.disabled).toBe(true);
    expect(wrapperEl.classList.contains('is-disabled')).toBe(true);
  });

  it('should not change value when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    const selectComponent = fixture.debugElement.query(By.directive(ZenSelect)).componentInstance as ZenSelect;
    selectComponent.onInput('opt3');
    fixture.detectChanges();

    expect(host.selectedValue()).toBe('opt1');
  });

  it('should reflect invalid state', () => {
    host.invalid.set(true);
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const wrapperEl = fixture.nativeElement.querySelector('.zen-select-wrapper') as HTMLElement;

    expect(selectEl.getAttribute('aria-invalid')).toBe('true');
    expect(wrapperEl.classList.contains('is-invalid')).toBe(true);
  });

  it('should reflect required attribute', () => {
    host.required.set(true);
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(selectEl.required).toBe(true);
  });

  it('should focus the select element when focus() is called', () => {
    const selectComponent = fixture.debugElement.query(By.directive(ZenSelect)).componentInstance as ZenSelect;
    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const focusSpy = vi.spyOn(selectEl, 'focus');

    selectComponent.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should emit touch event on focusout', () => {
    const selectComponent = fixture.debugElement.query(By.directive(ZenSelect)).componentInstance as ZenSelect;
    const touchSpy = vi.fn();
    selectComponent.touch.subscribe(touchSpy);

    const selectEl = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    selectEl.dispatchEvent(new Event('focusout', { bubbles: true }));

    expect(touchSpy).toHaveBeenCalled();
  });
});
