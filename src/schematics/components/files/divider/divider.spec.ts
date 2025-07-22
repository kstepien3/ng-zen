import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenDivider } from './divider';

describe('ZenDivider', () => {
  let component: ZenDivider;
  let fixture: ComponentFixture<ZenDivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenDivider],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
