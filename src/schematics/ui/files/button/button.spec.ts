import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenButton } from './button';

describe('ZenButton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenButton],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenButton);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
