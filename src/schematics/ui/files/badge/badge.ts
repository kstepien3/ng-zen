import { Component, input } from '@angular/core';

@Component({
  selector: 'zen-badge',
  template: '<ng-content />',
  styleUrl: './badge.scss',
  host: {
    '[attr.data-color]': 'color()',
    '[attr.data-variant]': 'variant()',
  },
})
export class ZenBadge {
  readonly color = input<'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>('neutral');
  readonly variant = input<'solid' | 'outline' | 'filled' | 'ghost'>('solid');
}
