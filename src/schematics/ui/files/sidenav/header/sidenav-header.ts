import { Component } from '@angular/core';

/**
 * Header slot for the sidenav - contains logo/brand and optional collapse toggle.
 * Usage: `<div zenSidenavHeader>...</div>`
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[zenSidenavHeader]',
  template: '<ng-content />',
  styleUrl: './sidenav-header.scss',
})
export class ZenSidenavHeader {}
