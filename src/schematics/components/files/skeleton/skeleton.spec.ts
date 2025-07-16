import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenSkeleton } from './skeleton';

describe('ZenSkeleton', () => {
  let component: ZenSkeleton;
  let fixture: ComponentFixture<ZenSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
