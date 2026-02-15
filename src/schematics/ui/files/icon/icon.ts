import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import * as icons from '@hugeicons/core-free-icons';

type Icon = keyof typeof icons;
interface Path {
  d: string | number;
  fill: string | number;
  opacity: string | number;
  fillRule: string | number;
  strokeWidth?: number;
}

/**
 * A reusable Angular component for rendering icons from the Hugeicons library.
 *
 * This component renders an SVG icon from the `@hugeicons/core-free-icons` collection by name.
 * The size, stroke width, and color are configurable through inputs. It dynamically generates the SVG
 * and its paths, providing a flexible and efficient way to use Hugeicons in an Angular application.
 *
 * @example
 * <zen-icon icon="Tree02Icon" />
 *
 * @see [Hugeicons](https://hugeicons.com)
 */
@Component({
  selector: 'zen-icon',
  template: `
    <svg
      [attr.color]="color()"
      [attr.height]="size()"
      [attr.viewBox]="'0 0 ' + BASE_SIZE + ' ' + BASE_SIZE"
      [attr.width]="size()"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      @for (path of paths(); track path) {
        <path
          [attr.d]="path.d"
          [attr.fill-rule]="path.fillRule"
          [attr.fill]="path.fill"
          [attr.opacity]="path.opacity"
          [attr.stroke-width]="path.strokeWidth"
          stroke="currentColor"
        />
      }
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenIcon {
  /** Icon file names from HugeIcons */
  readonly icon = input.required({ transform: (icon: Icon) => icons[icon] });
  /** Size of the icon in pixels. */
  readonly size = input<number>(24);
  /** Determines if stroke width scales with icon size. */
  readonly absoluteStrokeWidth = input<boolean, unknown>(false, { transform: booleanAttribute });
  /** Width of the stroke for icon paths. */
  readonly strokeWidth = input<number>(1.5);
  /** Color of the icon. */
  readonly color = input<string>('currentColor');

  protected readonly BASE_SIZE = 24;
  protected readonly paths = computed<Path[]>(() => this.updatePaths());
  private readonly calculatedStrokeWidth = computed(() => this.calculateStrokeWidth());

  private updatePaths(): Path[] {
    return this.icon().map(([, attrs]) => ({
      d: attrs['d'],
      fill: attrs['fill'] ?? 'none',
      opacity: attrs['opacity'],
      fillRule: attrs['fillRule'],
      strokeWidth: this.calculatedStrokeWidth(),
    }));
  }

  private calculateStrokeWidth(): number {
    if (!this.absoluteStrokeWidth()) return this.strokeWidth();

    return (this.strokeWidth() * this.BASE_SIZE) / this.size();
  }
}
