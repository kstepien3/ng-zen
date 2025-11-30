import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenTextarea } from './textarea';

describe('ZenTextarea', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenTextarea],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenTextarea);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
