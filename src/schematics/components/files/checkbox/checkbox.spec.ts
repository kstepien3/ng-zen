import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenCheckbox } from './checkbox';

describe('ZenCheckbox', () => {
  let component: ZenCheckbox;
  let fixture: ComponentFixture<ZenCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
