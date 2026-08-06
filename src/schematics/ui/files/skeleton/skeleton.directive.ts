import {
  booleanAttribute,
  ComponentRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

import { ZenSkeleton } from './skeleton';

/**
 * ZenSkeletonDirective replaces the host element with a {@link ZenSkeleton} while loading.
 * It automatically measures the host and applies its width/height to the skeleton,
 * or uses the `zenSkeletonWidth`/`zenSkeletonHeight` inputs when provided.
 *
 * @example
 *
 * ```html
 * <!-- Automatically sized to the avatar's shape -->
 * <zen-avatar [zenSkeleton]="avatarLoading()" />
 *
 * <!-- Explicit size via inputs -->
 * <div [zenSkeleton]="loading()" zenSkeletonWidth="32px" zenSkeletonHeight="32px"></div>
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Directive({
  selector: '[zenSkeleton]',
})
export class ZenSkeletonDirective {
  /** Whether the skeleton should be shown instead of the host element. */
  readonly loading = input(false, { alias: 'zenSkeleton', transform: booleanAttribute });
  /** Optional explicit width. Defaults to the host element's measured width. */
  readonly width = input<number | string | null>(null, { alias: 'zenSkeletonWidth' });
  /** Optional explicit height. Defaults to the host element's measured height. */
  readonly height = input<number | string | null>(null, { alias: 'zenSkeletonHeight' });

  private ref: ComponentRef<ZenSkeleton> | null = null;
  private measuredSize: { width: number; height: number } = { width: 0, height: 0 };
  private hostRadius = '';

  private readonly vcr = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private readonly hostEl = inject(ElementRef).nativeElement as HTMLElement;

  constructor() {
    effect(() => {
      const loading = this.loading();

      if (!loading) {
        this.renderer.setStyle(this.hostEl, 'display', '');
        this.destroySkeleton();
        return;
      }

      if (!this.ref) {
        const rect = typeof window !== 'undefined' ? this.hostEl.getBoundingClientRect() : { width: 0, height: 0 };
        this.measuredSize = { width: rect.width, height: rect.height };
        this.hostRadius = getComputedStyle(this.hostEl).borderRadius;
        this.ref = this.vcr.createComponent(ZenSkeleton);
      }

      const el = this.ref.location.nativeElement as HTMLElement;
      el.style.width = this.resolveSize(this.width(), this.measuredSize.width);
      el.style.height = this.resolveSize(this.height(), this.measuredSize.height);
      el.style.borderRadius = this.hostRadius;
      this.renderer.setStyle(this.hostEl, 'display', 'none');
    });
  }

  private resolveSize(value: number | string | null, fallback: number): string {
    return value === null ? `${fallback}px` : typeof value === 'number' ? `${value}px` : value;
  }

  private destroySkeleton(): void {
    this.ref?.destroy();
    this.ref = null;
    this.vcr.clear();
  }
}
