import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenCheckbox } from './checkbox';

describe('ZenCheckbox', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenCheckbox],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenCheckbox);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
