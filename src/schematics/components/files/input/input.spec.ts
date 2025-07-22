import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenInput } from './input';

describe('ZenInput', () => {
  let component: ZenInput;
  let fixture: ComponentFixture<ZenInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
