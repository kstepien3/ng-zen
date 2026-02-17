import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  isDevMode,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as icons from '@hugeicons/core-free-icons';

export type IconName = keyof typeof icons;

@Component({
  selector: 'zen-icon',
  standalone: true,
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
  /** Icon file names from HugeIcons */
  readonly icon = input.required({ transform: this.resolveIconData });
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
    const iconData = this.icon();
    if (!Array.isArray(iconData)) {
      if (isDevMode()) {
        throw new Error(`[ZenIcon] Icon data not found. Check if the icon name is correct.`);
      }
      return '';
    }

    const htmlString = iconData.map(([tag, attrs]) => this.buildTag(tag, attrs)).join('');

    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  });

  /** Validates the existence of the icon and returns its data, throwing in dev mode if missing. */
  private resolveIconData(name: IconName) {
    const data = icons[name];
    if (!data && isDevMode()) {
      throw new Error(`[ZenIcon] Icon "${name}" not found in @hugeicons/core-free-icons.`);
    }
    return data;
  }

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
