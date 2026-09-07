import { Component } from '@angular/core';

/**
 * Scrollable vertical navigation container.
 * Usage: `<nav zenSidenavContent>...</nav>`
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[zenSidenavContent]',
  template: '<ng-content />',
  styleUrl: './sidenav-content.scss',
})
export class ZenSidenavContent {}
