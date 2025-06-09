import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenSkeletonComponent } from './skeleton.component';

describe('ZenSkeletonComponent', () => {
  let component: ZenSkeletonComponent;
  let fixture: ComponentFixture<ZenSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
