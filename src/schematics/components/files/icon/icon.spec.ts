import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenIcon } from './icon';

describe('ZenIcon', () => {
  let component: ZenIcon;
  let fixture: ComponentFixture<ZenIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenIcon);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'Tree02Icon');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
