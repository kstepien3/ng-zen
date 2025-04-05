import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenCheckboxComponent } from './checkbox.component';

describe('ZenCheckboxComponent', () => {
  let component: ZenCheckboxComponent;
  let fixture: ComponentFixture<ZenCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
