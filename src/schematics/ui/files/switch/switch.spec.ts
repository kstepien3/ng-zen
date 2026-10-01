import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ValidationError } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenSwitch } from './switch';

@Component({
  imports: [ZenSwitch],
  template: `
    <zen-switch
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
class TestSwitchHostComponent {
  readonly label = signal('');
  readonly hint = signal('');
  readonly warn = signal('');
  readonly invalid = signal(false);
  readonly touched = signal(false);
  readonly required = signal(false);
  readonly errors = signal<ValidationError.WithOptionalFieldTree[]>([]);
}

describe('ZenSwitch', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenSwitch, TestSwitchHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenSwitch);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render label linked to switch button id and handle required state', () => {
    const fixture = TestBed.createComponent(TestSwitchHostComponent);
    fixture.componentInstance.label.set('Enable feature');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const buttonEl = fixture.nativeElement.querySelector('button[role="switch"]') as HTMLButtonElement;

    expect(labelEl).toBeTruthy();
    expect(labelEl.textContent?.trim()).toBe('Enable feature');
    expect(labelEl.getAttribute('for')).toBe(buttonEl.id);

    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('zen-label .required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.textContent).toBe('*');
  });

  it('should toggle value on click', () => {
    const fixture = TestBed.createComponent(ZenSwitch);
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(fixture.componentInstance.value()).toBe(false);

    buttonEl.click();
    expect(fixture.componentInstance.value()).toBe(true);

    buttonEl.click();
    expect(fixture.componentInstance.value()).toBe(false);
  });

  it('should handle keyboard interaction', () => {
    const fixture = TestBed.createComponent(ZenSwitch);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    component.onKeyDown(new KeyboardEvent('keydown', { code: 'Space' }));
    expect(component.value()).toBe(true);

    component.onKeyDown(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    expect(component.value()).toBe(false);

    component.onKeyDown(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
    expect(component.value()).toBe(true);

    component.onKeyDown(new KeyboardEvent('keydown', { code: 'Enter' }));
    expect(component.value()).toBe(false);
  });

  it('should render hint, warn, and errors', () => {
    const fixture = TestBed.createComponent(TestSwitchHostComponent);
    fixture.componentInstance.hint.set('Informational hint');
    fixture.detectChanges();

    let hintEl = fixture.debugElement.query(By.css('zen-hint')).nativeElement;
    expect(hintEl.getAttribute('data-severity')).toBe('neutral');

    fixture.componentInstance.warn.set('Warning text');
    fixture.detectChanges();
    hintEl = fixture.debugElement.query(By.css('zen-hint')).nativeElement;
    expect(hintEl.getAttribute('data-severity')).toBe('warning');

    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(true);
    fixture.componentInstance.errors.set([{ kind: 'required', message: 'Switch must be enabled' }]);
    fixture.detectChanges();
    hintEl = fixture.debugElement.query(By.css('zen-hint')).nativeElement;
    expect(hintEl.getAttribute('data-severity')).toBe('error');
    expect(hintEl.textContent?.trim()).toBe('Switch must be enabled');
  });
});
