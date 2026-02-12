import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenPopoverHost } from './popover-host';

describe('ZenPopoverHost', () => {
  let component: ZenPopoverHost;
  let fixture: ComponentFixture<ZenPopoverHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenPopoverHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenPopoverHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
