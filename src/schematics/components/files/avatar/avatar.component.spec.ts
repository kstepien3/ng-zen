import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenAvatarComponent } from './avatar.component';

describe('ZenAvatarComponent', () => {
  let component: ZenAvatarComponent;
  let fixture: ComponentFixture<ZenAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
