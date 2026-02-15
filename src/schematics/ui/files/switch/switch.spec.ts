import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenSwitch } from './switch';

describe('ZenSwitch', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenSwitch],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenSwitch);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
