import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenAvatar } from './avatar';

describe('ZenAvatar', () => {
  let component: ZenAvatar;
  let fixture: ComponentFixture<ZenAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
