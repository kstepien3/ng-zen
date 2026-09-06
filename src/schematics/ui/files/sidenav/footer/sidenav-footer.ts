import { Component } from '@angular/core';

/**
 * Footer slot for the sidenav - contains secondary actions (settings, logout, profile).
 * Usage: `<div zenSidenavFooter>...</div>`
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[zenSidenavFooter]',
  template: '<ng-content />',
  styleUrl: './sidenav-footer.scss',
})
export class ZenSidenavFooter {}
