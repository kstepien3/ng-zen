import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenDividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let component: ZenDividerComponent;
  let fixture: ComponentFixture<ZenDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
