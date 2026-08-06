import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RefreshIcon } from '@hugeicons/core-free-icons';
import { Meta, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenIcon } from '../icon';
import { ZenSkeleton } from './skeleton';
import { ZenSkeletonDirective } from './skeleton.directive';

interface StoryParams {
  rounded: boolean;
  height: number;
  width: number;
}

type Options = ZenSkeleton & StoryParams;

export default {
  title: 'Ui/Skeleton',
  component: ZenSkeleton,
  argTypes: {
    rounded: {
      control: { type: 'boolean' },
      table: {
        category: 'attributes',
      },
    },
    height: {
      control: { type: 'range', min: 1, max: 20, step: 0.25 },
      description: 'Height managed by css',
      table: {
        category: 'story parameters',
        type: {
          summary: undefined,
        },
      },
    },
    width: {
      control: { type: 'range', min: 1, max: 20, step: 0.25 },
      description: 'Width managed by css',
      table: {
        category: 'story parameters',
        type: {
          summary: undefined,
        },
      },
    },
  },
  args: {
    rounded: false,
    height: 3,
    width: 3,
  },
  render: args => ({
    props: { ...args },
    template: `
      <zen-skeleton ${args.rounded ? 'rounded' : ''} style="width: ${args.width}rem; height: ${args.height}rem"/>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

@Component({
  selector: 'zen-skeleton-demo',
  template: `
    <div style="display: flex; align-items: center; gap: 1rem; flex-direction: column">
      <img
        alt="Random user avatar"
        height="64"
        style="border-radius: 9999px"
        width="64"
        [ngSrc]="src()"
        [zenSkeleton]="loading()"
        (load)="onLoad()"
      />

      <button variant="ghost" zen-button (click)="load()">
        <zen-icon [icon]="RefreshIcon" [size]="16" [strokeWidth]="2.5" />
      </button>
    </div>
  `,
  imports: [NgOptimizedImage, ZenSkeletonDirective, ZenButton, ZenIcon],
})
class SkeletonDemoComponent {
  protected readonly RefreshIcon = RefreshIcon;
  readonly loading = signal(false);
  readonly src = signal('https://picsum.photos/64');
  private loaded = false;
  private minElapsed = false;

  load(): void {
    this.src.set(`https://picsum.photos/64?t=${Date.now()}`);
    this.loaded = false;
    this.minElapsed = false;
    this.loading.set(true);
    setTimeout(() => {
      this.minElapsed = true;
      this.reveal();
    }, 3000);
  }

  onLoad(): void {
    this.loaded = true;
    this.reveal();
  }

  private reveal(): void {
    if (!this.loaded || !this.minElapsed) return;
    this.loading.set(false);
  }
}

export const Directive: Story = {
  render: () => ({
    moduleMetadata: { imports: [SkeletonDemoComponent] },
    template: '<zen-skeleton-demo />',
  }),
  parameters: {
    docs: {
      source: {
        code: `
      <img
        alt="Random user avatar"
        height="64"
        style="border-radius: 9999px"
        width="64"
        [ngSrc]="src()"
        [zenSkeleton]="loading()"
        (load)="onLoad()"
      />

      <button variant="ghost" zen-button (click)="load()">
        <zen-icon [icon]="RefreshIcon" [size]="16" [strokeWidth]="2.5" />
      </button>
`,
      },
    },
  },
};
