import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenSwitch } from './switch';

describe('ZenSwitch', () => {
  let component: ZenSwitch;
  let fixture: ComponentFixture<ZenSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
