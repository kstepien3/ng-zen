import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenSkeleton } from './skeleton';

describe('ZenSkeleton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenSkeleton],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenSkeleton);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
