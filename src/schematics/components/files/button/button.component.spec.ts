import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ZenButtonComponent;
  let fixture: ComponentFixture<ZenButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
