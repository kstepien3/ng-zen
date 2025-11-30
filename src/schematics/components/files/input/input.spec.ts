import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenInput } from './input';

describe('ZenInput', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenInput],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenInput);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
