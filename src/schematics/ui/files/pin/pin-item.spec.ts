import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenButton } from '../button';
import { ZenPin } from './pin';
import type { PinPosition } from './pin.types';
import { ZenPinItem } from './pin-item';

@Component({
  template: `
    <button #trigger id="trigger" type="button" zen-button zenPin>
      Trigger
      <span zenPinItem [zenPinFlush]="flushed()" [zenPinOffset]="offset()" [zenPinPosition]="position()">
        Pinned content
      </span>
    </button>
  `,
  imports: [ZenPin, ZenButton, ZenPinItem],
})
class HostComponent {
  readonly position = signal<PinPosition>('top right');
  readonly offset = signal<string | number>('0');
  readonly flushed = signal<boolean>(false);
}

function getWrapper(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.zen-pin-wrapper') as HTMLElement | null;
}

describe('ZenPinItem', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function createFixture(): ComponentFixture<HostComponent> {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('sets default position-area to top right', () => {
    expect(getWrapper(createFixture())!.style.getPropertyValue('position-area')).toBe('top right');
  });

  it('applies overlap translate by default', () => {
    expect(getWrapper(createFixture())!.style.getPropertyValue('translate')).toBe('-50% 50%');
  });

  it('does not set margin by default', () => {
    expect(getWrapper(createFixture())!.style.getPropertyValue('margin')).toBe('');
  });

  it.each([
    ['top', '0 50%'],
    ['bottom', '0 -50%'],
    ['left', '50% 0'],
    ['right', '-50% 0'],
    ['center', '0 0'],
    ['top left', '50% 50%'],
    ['top right', '-50% 50%'],
    ['bottom left', '50% -50%'],
    ['bottom right', '-50% -50%'],
    ['top center', '0 50%'],
    ['center left', '50% 0'],
    ['center right', '-50% 0'],
    ['bottom center', '0 -50%'],
  ] as const)('computes %s translate as %s', (position, expected) => {
    const fixture = createFixture();
    fixture.componentInstance.position.set(position);
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('translate')).toBe(expected);
  });

  it('removes translate when flush is true', () => {
    const fixture = createFixture();
    fixture.componentInstance.flushed.set(true);
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('translate')).toBe('');
  });

  it('sets margin from string offset', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set('10px');
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('10px');
  });

  it('sets margin from numeric offset', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set(15);
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('15px');
  });

  it('removes margin when offset is zero string', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set('10px');
    fixture.detectChanges();
    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('10px');

    fixture.componentInstance.offset.set('0');
    fixture.detectChanges();
    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('');
  });

  it('removes margin when offset is zero number', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set(15);
    fixture.detectChanges();
    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('15px');

    fixture.componentInstance.offset.set(0);
    fixture.detectChanges();
    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('');
  });

  it('keeps overlap translate when offset is set', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set('10px');
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('translate')).toBe('-50% 50%');
    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('10px');
  });

  it('sets margin without translate when flush and offset', () => {
    const fixture = createFixture();
    fixture.componentInstance.flushed.set(true);
    fixture.componentInstance.offset.set('8px');
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('translate')).toBe('');
    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('8px');
  });

  it('removes wrapper from DOM on destroy', () => {
    const fixture = createFixture();
    expect(getWrapper(fixture)).toBeTruthy();

    fixture.destroy();
    expect(getWrapper(fixture)).toBeNull();
  });
});
