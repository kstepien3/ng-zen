import { Component, provideZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ZenButton } from '../button';
import { ZenPin } from './pin';
import type { PinPosition } from './pin.types';

@Component({
  template: `
    <button
      #trigger
      id="trigger"
      type="button"
      zen-button
      [zenPin]="content"
      [zenPinOffset]="offset()"
      [zenPinPosition]="position()"
    >
      Trigger
    </button>
    <ng-template #content>Pinned content</ng-template>
  `,
  imports: [ZenPin, ZenButton],
})
class HostComponent {
  readonly content = viewChild.required<TemplateRef<unknown>>('content');
  readonly position = signal<PinPosition>('top right');
  readonly offset = signal('0');
}

function getWrapperEl(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.zen-pin-wrapper') as HTMLElement | null;
}

describe('ZenPin', () => {
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

  it('creates a wrapper element with class zen-pin-wrapper', () => {
    const fixture = createFixture();
    expect(getWrapperEl(fixture)).toBeTruthy();
  });

  it('renders TemplateRef content into wrapper', () => {
    const fixture = createFixture();
    expect(getWrapperEl(fixture)!.textContent).toContain('Pinned content');
  });

  it('sets anchor-name on host and position-anchor on wrapper', () => {
    const fixture = createFixture();
    const trigger = fixture.nativeElement.querySelector('#trigger') as HTMLElement;
    const wrapper = getWrapperEl(fixture)!;

    expect(trigger.style.getPropertyValue('anchor-name')).toMatch(/^--zen-pin-/);
    expect(wrapper.style.getPropertyValue('position-anchor')).toBe(trigger.style.getPropertyValue('anchor-name'));
  });

  it('sets align-self and justify-self to anchor-center', () => {
    const fixture = createFixture();
    const wrapper = getWrapperEl(fixture)!;

    expect(wrapper.style.getPropertyValue('align-self')).toBe('anchor-center');
    expect(wrapper.style.getPropertyValue('justify-self')).toBe('anchor-center');
  });

  it('sets position-area from zenPinPosition input', () => {
    const fixture = createFixture();
    const wrapper = getWrapperEl(fixture)!;

    expect(wrapper.style.getPropertyValue('position-area')).toBe('top right');
  });

  it('updates position-area when position changes', () => {
    const fixture = createFixture();
    fixture.componentInstance.position.set('bottom left');
    fixture.detectChanges();

    expect(getWrapperEl(fixture)!.style.getPropertyValue('position-area')).toBe('bottom left');
  });

  it('sets translate from zenPinOffset input', () => {
    const fixture = createFixture();
    const wrapper = getWrapperEl(fixture)!;

    expect(wrapper.style.getPropertyValue('translate')).toBe('0');
  });

  it('updates translate when offset changes', () => {
    const fixture = createFixture();
    fixture.componentInstance.offset.set('10px -5px');
    fixture.detectChanges();

    expect(getWrapperEl(fixture)!.style.getPropertyValue('translate')).toBe('10px -5px');
  });

  it('removes wrapper on destroy', () => {
    const fixture = createFixture();
    expect(getWrapperEl(fixture)).toBeTruthy();

    fixture.destroy();
    expect(getWrapperEl(fixture)).toBeNull();
  });
});
