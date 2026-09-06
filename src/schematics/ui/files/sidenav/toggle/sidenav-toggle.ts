import { Component, input, output } from '@angular/core';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from '@hugeicons/core-free-icons';

import { ZenButton } from '../../button';
import { IconSvgObject, ZenIcon } from '../../icon';

/**
 * Accessible toggle button for collapsing/expanding the sidenav.
 *
 * Project as a direct child of `zen-sidenav` — it positions itself
 * straddling the inline-end border and hides itself on mobile.
 *
 * @example
 * ```html
 * <zen-sidenav [collapsed]="collapsed()">
 *   <zen-sidenav-toggle [collapsed]="collapsed()" (collapsedChange)="collapsed.set(!collapsed())" />
 * </zen-sidenav>
 * ```
 */
@Component({
  selector: 'zen-sidenav-toggle',
  template: `
    <button
      size="sm"
      type="button"
      variant="ghost"
      zen-button
      [attr.aria-expanded]="!collapsed()"
      [attr.aria-label]="collapsed() ? expandLabel() : collapseLabel()"
      (click)="collapsedChange.emit()"
    >
      <zen-icon [icon]="collapsed() ? expandIcon() : collapseIcon()" [size]="20" />
    </button>
  `,
  styleUrl: './sidenav-toggle.scss',
  imports: [ZenIcon, ZenButton],
})
export class ZenSidenavToggle {
  /** Current collapsed state of the parent sidenav. Decides icon and label. */
  readonly collapsed = input.required<boolean>();
  /** Emitted when the toggle is clicked. The parent owns the state. */
  readonly collapsedChange = output<void>();

  /** Icon shown when expanded (clicking collapses). */
  readonly collapseIcon = input<IconSvgObject>(PanelLeftOpenIcon);
  /** Icon shown when collapsed (clicking expands). */
  readonly expandIcon = input<IconSvgObject>(PanelLeftCloseIcon);
  /** Accessible label of the collapse action. */
  readonly collapseLabel = input('Collapse sidenav');
  /** Accessible label of the expand action. */
  readonly expandLabel = input('Expand sidenav');
}
