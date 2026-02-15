import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenAvatar } from './avatar';

describe('ZenAvatar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenAvatar],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenAvatar);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
