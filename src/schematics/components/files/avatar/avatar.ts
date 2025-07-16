import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A component to display an avatar image.
 * If a valid image source URL is provided, it will render an image element.
 * Otherwise, it will display projected content.
 *
 * This component utilizes Angular's optimized image directives for enhanced performance.
 *
 * @example
 *
 * ```html
 * <!-- If an image source is provided, it will display the image -->
 * <zen-avatar [src]="'/path/to/image.jpg'" />
 *
 * <!-- If no image source is provided, it will display the projected content -->
 * <zen-avatar> A </zen-avatar>
 * ```
 *
 * ### CSS Custom Properties
 *
 * You can customize the component using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-avatar-size: 2rem;
 *  --zen-avatar-bg-color: hsl(0deg 0% 80%);
 *  --zen-avatar-color: hsl(0deg 0% 20%);
 *  --zen-avatar-font-size: small;
 * }
 * ```
 *
 * @author Konrad Stępień
 * @license {@link https://github.com/kstepien3/ng-zen/blob/master/LICENSE|BSD-2-Clause}
 * @see [GitHub](https://github.com/kstepien3/ng-zen)
 */
@Component({
  selector: 'zen-avatar',
  imports: [NgOptimizedImage],
  template: `
    @if (src()) {
      <img [alt]="alt()" [ngSrc]="src()" fill />
    } @else {
      <ng-content />
    }
  `,
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenAvatar {
  /**
   * Name of the source image. Image name will be processed by the image loader,
   * and the final URL will be applied as the src property of the image.
   */
  readonly src = input<string>('');
  /**
   * Sets or retrieves a text alternative to the graphic.
   */
  readonly alt = input<string>('');
}
