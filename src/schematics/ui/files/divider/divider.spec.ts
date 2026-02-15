import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenDivider } from './divider';

describe('ZenDivider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenDivider],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenDivider);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
