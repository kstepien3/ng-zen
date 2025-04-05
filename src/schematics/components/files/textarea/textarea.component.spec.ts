import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenTextareaComponent } from './textarea.component';

describe('ZenTextareaComponent', () => {
  let component: ZenTextareaComponent;
  let fixture: ComponentFixture<ZenTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
