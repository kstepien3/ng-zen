import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenCard } from './card';

describe('ZenCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenCard],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenCard);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
