import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenAlert } from './alert';

describe('ZenAlert', () => {
  let component: ZenAlert;
  let fixture: ComponentFixture<ZenAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
