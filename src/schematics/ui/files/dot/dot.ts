import { booleanAttribute, Component, computed, input } from '@angular/core';

import { PRESET_SIZES, SEVERITIES, ZenDotAnimation, ZenDotSeverity, ZenDotSize, ZenDotVariant } from './dot.types';

/**
 * ZenDot is a versatile status indicator and pagination dot component.
 * It can be used standalone, inside badges, next to text labels, in carousel pagination bars,
 * or pinned onto avatars to indicate status (online, busy, away, offline, DND, etc.).
 *
 * @example
 *
 * ```html
 * <zen-dot severity="success" />
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *   --zen-dot-neutral: hsl(30deg 5% 10%);
 *   --zen-dot-primary: hsl(193deg 58% 34%);
 *   --zen-dot-success: hsl(142deg 38% 36%);
 *   --zen-dot-warning: hsl(36deg 72% 46%);
 *   --zen-dot-danger: hsl(348deg 52% 42%);
 *   --zen-dot-info: hsl(214deg 34% 46%);
 *   --zen-dot-size: 0.625rem;
 *   --zen-dot-active-size: 1.5625rem;
 *   --zen-dot-border-width: 2px;
 *   --zen-dot-border-color: #fff;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-dot',
  template: '<ng-content />',
  styleUrl: './dot.scss',
  host: {
    '[attr.data-severity]': 'activeSeverity()',
    '[attr.data-size]': 'presetSize()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-animation]': 'activeAnimation()',
    '[attr.data-bordered]': 'isBordered() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[style.--zen-dot-custom-size]': 'customSize()',
    '[style.--zen-dot-custom-color]': 'customColor()',
  },
})
export class ZenDot {
  /** The semantic severity/color theme of the dot. */
  readonly severity = input<ZenDotSeverity>('neutral');

  /** Custom CSS color value (hex, rgb, hsl) or semantic severity alias. */
  readonly color = input<ZenDotSeverity | (string & {})>();

  /** The size of the dot. Supports presets ('xs', 'sm', 'md', 'lg') or custom values (number in px or CSS string). */
  readonly size = input<ZenDotSize>('md');

  /** Visual variant of the dot: solid circle, outline ring, ring with depth border, Do Not Disturb (dnd), or pill. */
  readonly variant = input<ZenDotVariant>('solid');

  /** Animation mode: 'none', 'wave' (sonar ripple for live status), 'pulse' (breathing), or 'glow'. */
  readonly animation = input<ZenDotAnimation>('none');

  /** Whether the dot has a separation ring / border around it, useful when overlaid on avatars or backgrounds. */
  readonly bordered = input(false, { transform: booleanAttribute });

  /** Whether the dot is disabled. When true, reduces opacity and applies grayscale. */
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly customColor = computed(() =>
    this.color() && !SEVERITIES.has(this.color()!) ? this.color() : null
  );

  protected readonly activeSeverity = computed(() =>
    SEVERITIES.has(this.color() ?? '') ? (this.color() as ZenDotSeverity) : this.severity()
  );

  protected readonly presetSize = computed(() =>
    PRESET_SIZES.has(this.size() as string) ? (this.size() as string) : null
  );

  protected readonly customSize = computed(() => {
    const size = this.size();

    if (typeof size === 'number') return `${size}px`;
    if (PRESET_SIZES.has(size)) return null;
    if (!Number.isNaN(Number(size))) return `${size}px`;
    return size;
  });

  protected readonly activeAnimation = computed(() => (this.animation() !== 'none' ? this.animation() : null));
  protected readonly isBordered = computed(() => this.bordered() || this.variant() === 'ring');
}
