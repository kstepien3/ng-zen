import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenInputComponent } from './input.component';

describe('InputComponent', () => {
  let component: ZenInputComponent;
  let fixture: ComponentFixture<ZenInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
