import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenAlert } from './alert';

describe('ZenAlert', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenAlert],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenAlert);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
