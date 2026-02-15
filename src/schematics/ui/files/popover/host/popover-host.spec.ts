import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenPopoverHost } from './popover-host';

describe('ZenPopoverHost', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenPopoverHost],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenPopoverHost);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
