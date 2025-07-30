import { Component, model } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenFormControl, ZenFormControlProvider } from './form-control';

@Component({
  template: '...',
  providers: [ZenFormControlProvider(FormControl)],
})
class FormControl extends ZenFormControl<string> {
  readonly value = model<string>('');
}

describe('FormControl', () => {
  let component: FormControl;
  let fixture: ComponentFixture<FormControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControl],
    }).compileComponents();

    fixture = TestBed.createComponent(FormControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
