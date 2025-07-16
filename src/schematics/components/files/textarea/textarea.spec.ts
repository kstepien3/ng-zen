import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenTextarea } from './textarea';

describe('ZenTextareaComponent', () => {
  let component: ZenTextarea;
  let fixture: ComponentFixture<ZenTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
