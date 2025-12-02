import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenIcon } from './icon';

describe('ZenIcon', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenIcon],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ZenIcon);
    const component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'Tree02Icon');
    expect(component).toBeTruthy();
  });
});
