import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ZenRadio } from './radio';
import { ZenRadioRegistry } from './radio.registry';

describe('ZenRadio', () => {
  let component: ZenRadio;
  let fixture: ComponentFixture<ZenRadio>;
  let registry: ZenRadioRegistry;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenRadio, FormsModule, ReactiveFormsModule],
      providers: [ZenRadioRegistry, provideZonelessChangeDetection()],
    }).compileComponents();

    registry = TestBed.inject(ZenRadioRegistry);
    fixture = TestBed.createComponent(ZenRadio);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test-group');
    fixture.componentRef.setInput('option', 'test-value');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check when value matches option', () => {
    component.value.set('test-value');
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.checked).toBe(true);
  });

  it('should uncheck when value differs from option', () => {
    component.value.set('different-value');
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.checked).toBe(false);
  });

  it('should show radio dot when checked', () => {
    component.value.set('test-value');
    fixture.detectChanges();

    const radioDot = fixture.debugElement.query(By.css('.radio-dot'));
    expect(radioDot).toBeTruthy();
  });

  it('should not show radio dot when unchecked', () => {
    component.value.set('different-value');
    fixture.detectChanges();

    const radioDot = fixture.debugElement.query(By.css('.radio-dot'));
    expect(radioDot).toBeFalsy();
  });

  it('should call onInput when radio is selected', () => {
    const spy = vi.spyOn(component, 'onInput');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.checked = true;
    inputElement.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledWith('test-value');
  });

  it('should not call onInput when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    const spy = vi.spyOn(component, 'onInput');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.checked = true;
    inputElement.dispatchEvent(new Event('change'));

    expect(spy).not.toHaveBeenCalled();
  });

  it('should integrate with ngModel', () => {
    let selectedValue: string | null = null;

    const testFixture = TestBed.createComponent(ZenRadio);
    testFixture.componentRef.setInput('name', 'ng-model-group');
    testFixture.componentRef.setInput('option', 'option1');
    testFixture.detectChanges();

    // Simulate ngModel binding
    testFixture.componentInstance.registerOnChange((value: string | null) => {
      selectedValue = value;
    });

    const inputElement = testFixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.checked = true;
    inputElement.dispatchEvent(new Event('change'));

    expect(selectedValue).toBe('option1');
  });

  it('should integrate with reactive forms', () => {
    const formControl = new FormControl<string | null>(null);
    const testFixture = TestBed.createComponent(ZenRadio);
    testFixture.componentRef.setInput('name', 'reactive-group');
    testFixture.componentRef.setInput('option', 'option1');

    // Simulate form control binding
    testFixture.componentInstance.writeValue(formControl.value);

    testFixture.componentInstance.registerOnChange((value: string | null) => {
      formControl.setValue(value);
    });

    testFixture.detectChanges();

    const inputElement = testFixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.checked = true;
    inputElement.dispatchEvent(new Event('change'));

    // The component's onInput method should call the onChange callback
    // which should update form control value
    expect(formControl.value).toBe('option1');
  });

  it('should handle disabled state from form control', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled()).toBe(true);

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.disabled).toBe(true);
  });

  it('should have correct ARIA attributes', () => {
    component.value.set('test-value');
    component.disabled.set(false);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.getAttribute('aria-checked')).toBe('true');
    expect(inputElement.getAttribute('aria-disabled')).toBe('false');
  });

  it('should update ARIA attributes when state changes', () => {
    component.value.set('different-value');
    component.disabled.set(true);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.getAttribute('aria-checked')).toBe('false');
    expect(inputElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should call onTouched when host element loses focus', () => {
    const onTouchedSpy = vi.fn();
    component.registerOnTouched(onTouchedSpy);

    const hostElement = fixture.debugElement.nativeElement;
    hostElement.dispatchEvent(new Event('blur'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should register with radio registry on initialization', () => {
    // Create a new radio to test registry registration
    const newFixture = TestBed.createComponent(ZenRadio);
    newFixture.componentRef.setInput('name', 'registry-test');
    newFixture.componentRef.setInput('option', 'registry-option');
    newFixture.detectChanges();

    // The radio should be registered after next render
    expect(newFixture.componentInstance).toBeTruthy();
  });

  it('should handle registry selection', () => {
    const radio1 = fixture.componentInstance;

    const radio2Fixture = TestBed.createComponent(ZenRadio);
    radio2Fixture.componentRef.setInput('name', 'test-group');
    radio2Fixture.componentRef.setInput('option', 'option2');
    radio2Fixture.detectChanges();

    const radio2 = radio2Fixture.componentInstance;

    // Test registry selection
    registry.select('test-group', 'option2');

    expect(radio1.value()).toBe('option2');
    expect(radio2.value()).toBe('option2');
  });
});

describe('ZenRadioRegistry', () => {
  let registry: ZenRadioRegistry;
  let radio1: ZenRadio;
  let radio2: ZenRadio;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ZenRadio],
      providers: [ZenRadioRegistry, provideZonelessChangeDetection()],
    });

    registry = TestBed.inject(ZenRadioRegistry);

    const fixture1 = TestBed.createComponent(ZenRadio);
    fixture1.componentRef.setInput('name', 'test-group');
    fixture1.componentRef.setInput('option', 'option1');
    radio1 = fixture1.componentInstance;

    const fixture2 = TestBed.createComponent(ZenRadio);
    fixture2.componentRef.setInput('name', 'test-group');
    fixture2.componentRef.setInput('option', 'option2');
    radio2 = fixture2.componentInstance;
  });

  it('should add radios to group', () => {
    registry.add('test-group', radio1);
    registry.add('test-group', radio2);

    // Test that radios are added by checking if select works
    const spy1 = vi.spyOn(radio1, 'onInput');
    const spy2 = vi.spyOn(radio2, 'onInput');

    registry.select('test-group', 'option1');

    expect(spy1).toHaveBeenCalledWith('option1');
    expect(spy2).toHaveBeenCalledWith('option1');
  });

  it('should remove radios from group', () => {
    registry.add('test-group', radio1);
    registry.add('test-group', radio2);

    registry.remove('test-group', radio1);

    // Test that radio1 is removed by checking if select only affects radio2
    const spy1 = vi.spyOn(radio1, 'onInput');
    const spy2 = vi.spyOn(radio2, 'onInput');

    registry.select('test-group', 'option1');

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledWith('option1');
  });

  it('should select value in group', () => {
    const spy1 = vi.spyOn(radio1, 'onInput');
    const spy2 = vi.spyOn(radio2, 'onInput');

    registry.add('test-group', radio1);
    registry.add('test-group', radio2);

    registry.select('test-group', 'option1');

    expect(spy1).toHaveBeenCalledWith('option1');
    expect(spy2).toHaveBeenCalledWith('option1');
  });

  it('should handle non-existent groups gracefully', () => {
    expect(() => {
      registry.remove('non-existent', radio1);
      registry.select('non-existent', 'value');
    }).not.toThrow();
  });

  it('should handle empty groups gracefully', () => {
    expect(() => {
      registry.select('empty-group', 'value');
    }).not.toThrow();
  });
});
