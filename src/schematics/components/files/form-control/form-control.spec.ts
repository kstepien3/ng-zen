import { Component, model, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenFormControl, ZenFormControlProvider } from './form-control';

@Component({
  template: '...',
  providers: [ZenFormControlProvider(FormControl)],
})
class FormControl extends ZenFormControl<string> {
  readonly value = model<string>('');
}

describe('FormControl', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControl],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FormControl);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
