import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/** SVG icon data structure from HugeIcons library - an array of [tagName, attributes] tuples. */
export type IconSvgObject = readonly (readonly [string, Record<string, string | number>])[];

/**
 * Reusable Angular component for rendering SVG icons from icon libraries.
 *
 * The component renders an icon by accepting an SVG definition object via the `[icon]` input.
 * Size, stroke width, and color are configurable.
 *
 * Security note: the icon data is converted to HTML and trusted via `DomSanitizer.bypassSecurityTrustHtml`,
 * so the provided icon object must come from a trusted source.
 *
 * @example
 * ```html
 * <zen-icon [icon]="SvgObject" />
 * ```
 *
 * Compatible with libraries that export icons as `[tagName, attributes]` tuples.
 * Tested with `@hugeicons/core-free-icons`.
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-icon',
  template: `
    <svg
      [attr.height]="size()"
      [attr.stroke-width]="calculatedStrokeWidth()"
      [attr.viewBox]="'0 0 ' + BASE_SIZE + ' ' + BASE_SIZE"
      [attr.width]="size()"
      [innerHTML]="safeSvgContent()"
      [style.color]="color()"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  `,
  styles: [':host { display: inline-flex; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenIcon {
  /** SVG object imported from HugeIcons library. */
  readonly icon = input.required<IconSvgObject>();
  /** Size of the icon in pixels. */
  readonly size = input<number>(24);
  /** Determines if stroke width scales with icon size. */
  readonly absoluteStrokeWidth = input<boolean, unknown>(false, { transform: booleanAttribute });
  /** Width of the stroke for icon paths. */
  readonly strokeWidth = input<number>(1.5);
  /** Color of the icon. */
  readonly color = input<string>('currentColor');

  protected readonly BASE_SIZE = 24;

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly calculatedStrokeWidth = computed(() => {
    if (!this.absoluteStrokeWidth()) return this.strokeWidth();
    return (this.strokeWidth() * this.BASE_SIZE) / this.size();
  });

  /** Converts icon data into a sanitized HTML string of SVG elements. */
  protected readonly safeSvgContent = computed<SafeHtml>(() => {
    const htmlString = this.icon()
      .map(([tag, attrs]) => this.buildTag(tag, attrs))
      .join('');

    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  });

  /** Generates a single SVG element string (e.g., <path ...>) with its mapped attributes. */
  private buildTag(tag: string, attrs: Record<string, string | number>): string {
    const attributes = Object.entries(attrs)
      .filter(([key]) => !['strokeWidth', 'stroke-width'].includes(key))
      .map(([key, value]) => `${this.toKebabCase(key)}="${value}"`)
      .join(' ');

    return `<${tag} ${attributes} stroke-width="${this.calculatedStrokeWidth()}"></${tag}>`;
  }

  /** Formats attribute names from camelCase (used in JS library) to a kebab-case for SVG compatibility. */
  private toKebabCase(str: string): string {
    return str.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
