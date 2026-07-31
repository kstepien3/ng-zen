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

@Component({
  template: `
    <button zen-button zenPin>
      Trigger
      <span zenPinItem>First pin</span>
      <span zenPinItem>Second pin</span>
    </button>
  `,
  imports: [ZenPin, ZenButton, ZenPinItem],
})
class MultiHostComponent {}

function getWrappers(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('.zen-pin-wrapper') as NodeListOf<HTMLElement>);
}

function getWrapper(fixture: ComponentFixture<unknown>, index = 0): HTMLElement | null {
  return getWrappers(fixture)[index] ?? null;
}

describe('ZenPin', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, MultiHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function createFixture(): ComponentFixture<HostComponent> {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('creates a wrapper element with class zen-pin-wrapper', () => {
    const fixture = createFixture();
    expect(getWrapper(fixture)).toBeTruthy();
  });

  it('moves element content into wrapper', () => {
    const fixture = createFixture();
    expect(getWrapper(fixture)!.textContent).toContain('Pinned content');
  });

  it('sets anchor-name on host and position-anchor on wrapper', () => {
    const fixture = createFixture();
    const trigger = fixture.nativeElement.querySelector('#trigger') as HTMLElement;
    const wrapper = getWrapper(fixture)!;

    expect(trigger.style.getPropertyValue('anchor-name')).toMatch(/^--zen-pin-/);
    expect(wrapper.style.getPropertyValue('position-anchor')).toBe(trigger.style.getPropertyValue('anchor-name'));
  });

  it('sets align-self and justify-self to anchor-center', () => {
    const fixture = createFixture();
    const wrapper = getWrapper(fixture)!;

    expect(wrapper.style.getPropertyValue('align-self')).toBe('anchor-center');
    expect(wrapper.style.getPropertyValue('justify-self')).toBe('anchor-center');
  });

  it('sets position-area from zenPinPosition input', () => {
    const fixture = createFixture();
    const wrapper = getWrapper(fixture)!;

    expect(wrapper.style.getPropertyValue('position-area')).toBe('top right');
  });

  it('updates position-area when position changes', () => {
    const fixture = createFixture();
    fixture.componentInstance.position.set('bottom left');
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('position-area')).toBe('bottom left');
  });

  it('sets margin from zenPinOffset string input', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set('10px');
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('10px');
  });

  it('sets margin from zenPinOffset number input', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set(15);
    fixture.detectChanges();

    expect(getWrapper(fixture)!.style.getPropertyValue('margin')).toBe('15px');
  });

  it.each([
    ['top right', '-50% 50%'],
    ['top left', '50% 50%'],
    ['bottom right', '-50% -50%'],
  ] as const)('computes center-directed translate for position %s when not flush', (position, expected) => {
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

  it('creates a wrapper per zen-pin-item', () => {
    const fixture = TestBed.createComponent(MultiHostComponent);
    fixture.detectChanges();

    expect(getWrappers(fixture)).toHaveLength(2);
  });

  it('removes wrapper on host destroy', () => {
    const fixture = createFixture();
    expect(getWrapper(fixture)).toBeTruthy();

    fixture.destroy();
    expect(getWrapper(fixture)).toBeNull();
  });
});
