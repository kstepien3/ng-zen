import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenPopover } from './popover-host';

describe('ZenPopover', () => {
  let component: ZenPopover;
  let fixture: ComponentFixture<ZenPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(ZenPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
