import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ZenSkeletonDirective } from './skeleton.directive';

@Component({
  template: `
    <div id="target" [zenSkeleton]="loading()" [zenSkeletonWidth]="width()"></div>
  `,
  imports: [ZenSkeletonDirective],
})
class SkeletonDirectiveComponent {
  readonly loading = signal(false);
  readonly width = signal<number | null>(null);
}

@Component({
  template: `
    <div id="target" zenSkeletonHeight="48px" zenSkeletonWidth="120px" [zenSkeleton]="loading()"></div>
  `,
  imports: [ZenSkeletonDirective],
})
class SkeletonDirectiveSizedComponent {
  readonly loading = signal(true);
}

@Component({
  template: `
    <div id="target" style="border-radius: 9999px" [zenSkeleton]="loading()"></div>
  `,
  imports: [ZenSkeletonDirective],
})
class SkeletonRoundedHostComponent {
  readonly loading = signal(true);
}

function getHostEl(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('#target') as HTMLElement;
}

function getSkeletonEl(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('zen-skeleton') as HTMLElement | null;
}

describe('ZenSkeletonDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonDirectiveComponent, SkeletonDirectiveSizedComponent, SkeletonRoundedHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  describe('auto-sizing', () => {
    let fixture: ComponentFixture<SkeletonDirectiveComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SkeletonDirectiveComponent);
      vi.spyOn(getHostEl(fixture), 'getBoundingClientRect').mockReturnValue({
        width: 100,
        height: 50,
      } as DOMRect);
    });

    it('does not render a skeleton while not loading', () => {
      fixture.detectChanges();

      expect(getSkeletonEl(fixture)).toBeNull();
      expect(getHostEl(fixture).style.display).not.toBe('none');
    });

    it('renders a skeleton sized to the host and hides it while loading', () => {
      fixture.detectChanges();
      fixture.componentInstance.loading.set(true);
      fixture.detectChanges();

      const skeleton = getSkeletonEl(fixture)!;
      expect(skeleton).toBeTruthy();
      expect(getHostEl(fixture).style.display).toBe('none');
      expect(skeleton.style.width).toBe('100px');
      expect(skeleton.style.height).toBe('50px');
    });

    it('removes the skeleton and restores the host when loading ends', () => {
      fixture.detectChanges();
      fixture.componentInstance.loading.set(true);
      fixture.detectChanges();
      fixture.componentInstance.loading.set(false);
      fixture.detectChanges();

      expect(getSkeletonEl(fixture)).toBeNull();
      expect(getHostEl(fixture).style.display).not.toBe('none');
    });

    it('keeps measured dimensions when another input changes while loading', () => {
      fixture.detectChanges();
      fixture.componentInstance.loading.set(true);
      fixture.detectChanges();
      fixture.componentInstance.width.set(80);
      fixture.detectChanges();

      const skeleton = getSkeletonEl(fixture)!;
      expect(skeleton.style.width).toBe('80px');
      expect(skeleton.style.height).toBe('50px');
    });
  });

  it('applies explicit width/height to the skeleton', () => {
    const fixture = TestBed.createComponent(SkeletonDirectiveSizedComponent);
    fixture.detectChanges();

    const skeleton = getSkeletonEl(fixture)!;
    expect(skeleton.style.width).toBe('120px');
    expect(skeleton.style.height).toBe('48px');
  });

  it('copies the host border-radius onto the skeleton', () => {
    const fixture = TestBed.createComponent(SkeletonRoundedHostComponent);
    fixture.detectChanges();

    const skeleton = getSkeletonEl(fixture)!;
    expect(skeleton.style.borderRadius).toBe('9999px');
  });
});
