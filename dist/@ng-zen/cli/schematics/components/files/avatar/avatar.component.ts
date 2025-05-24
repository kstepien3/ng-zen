import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A component to display an avatar image.
 * If a valid image source URL is provided, it will render an image element.
 * Otherwise, it will display projected content.
 *
 * This component utilizes Angular's optimized image directives for enhanced performance.
 *
 * ### Usage
 *
 * To use the component, you can provide an image source or project content:
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
 * You can customize the avatar using CSS custom properties:
 *
 * ```css
 * :root {
 *  --zen-avatar-size: 16px;
 *  --zen-avatar-bg-color: black;
 *  --zen-avatar-color: white;
 *  --zen-avatar-font-size: small;
 * }
 * ```
 *
 * @example
 * <zen-avatar src="https://picsum.photos/32" />
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
      <img [alt]="alt()" [ngSrc]="src()" fill onerror="console.log('test')" />
    } @else {
      <ng-content />
    }
  `,
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenAvatarComponent {
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
