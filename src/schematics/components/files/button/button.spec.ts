import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenButton } from './button';

describe('ZenButton', () => {
  let component: ZenButton;
  let fixture: ComponentFixture<ZenButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
