import { provideZonelessChangeDetection } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenPopover } from './popover';

@Component({
  template: `
    <button [zenPopover]="content" zenPopoverPlacement="bottom">Trigger</button>
    <ng-template #content>Popover content</ng-template>
  `,
  standalone: true,
  imports: [ZenPopover],
})
class TestComponent {
  @ViewChild('content') content!: TemplateRef<unknown>;
}

describe('ZenPopover', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });
});
