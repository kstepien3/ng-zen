import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenRadio } from './radio';

describe('ZenRadio', () => {
  let component: ZenRadio;
  let fixture: ComponentFixture<ZenRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenRadio],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenRadio);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('option', 'test-value');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
