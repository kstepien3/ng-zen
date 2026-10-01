import { Component, model, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenFormControl } from './form-control';

@Component({
  template: '...',
})
class TestFormControl extends ZenFormControl<string> {
  readonly value = model<string>('');
}

describe('FormControl', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormControl],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestFormControl);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have FormUiControl properties', () => {
    const fixture = TestBed.createComponent(TestFormControl);
    const component = fixture.componentInstance;
    expect(component.disabled()).toBe(false);
    expect(component.required()).toBe(false);
    expect(component.touched()).toBe(false);
    expect(component.dirty()).toBe(false);
    expect(component.invalid()).toBe(false);
    expect(component.pending()).toBe(false);
    expect(component.hidden()).toBe(false);
    expect(component.readonly()).toBe(false);
    expect(component.name()).toBe('');
    expect(component.errors()).toEqual([]);
    expect(component.label()).toBe('');
    expect(component.hint()).toBe('');
    expect(component.warn()).toBe('');
    expect(component.id()).toMatch(/^zen-control-\d+$/);
  });

  it('should compute shouldShowError based on invalid, touched/dirty, and errors', () => {
    const fixture = TestBed.createComponent(TestFormControl);
    const component = fixture.componentInstance;
    expect(component.shouldShowError()).toBe(false);

    fixture.componentRef.setInput('invalid', true);
    fixture.componentRef.setInput('touched', true);
    fixture.componentRef.setInput('errors', [{ message: 'Required' }]);
    expect(component.shouldShowError()).toBe(true);

    fixture.componentRef.setInput('errors', []);
    expect(component.shouldShowError()).toBe(false);
  });
});
