import { BellIcon, ChatIcon, RotateLeft02Icon } from '@hugeicons/core-free-icons';
import { Args, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenAvatar } from '../avatar';
import { ZenBadge } from '../badge';
import { ZenButton } from '../button';
import { ZenIcon } from '../icon';
import { ZenPin } from './pin';
import type { PinPosition } from './pin.types';
import { ZenPinItem } from './pin-item';

interface WithBadgeArgs extends Args {
  position: PinPosition;
  offsetX: number;
  offsetY: number;
  overlap: boolean;
}

type Story = StoryObj<ZenPin>;

// Formater
const html = String.raw;

const meta: Meta = {
  title: 'Ui/Pin',
  component: ZenPin,
  decorators: [
    moduleMetadata({
      imports: [ZenPin, ZenPinItem, ZenBadge, ZenButton, ZenIcon, ZenAvatar],
    }),
  ],
};

export default meta;

export const WithBadge: StoryObj<WithBadgeArgs> = {
  argTypes: {
    offsetX: {
      name: 'offsetX (px)',
      control: { type: 'range', min: -50, max: 50, step: 1 },
    },
    offsetY: {
      name: 'offsetY (px)',
      control: { type: 'range', min: -50, max: 50, step: 1 },
    },
    overlap: {
      name: 'overlap',
      control: { type: 'boolean' },
    },
    position: {
      name: 'zenPinPosition',
      control: 'select',
      options: [
        'top',
        'bottom',
        'center',
        'left',
        'right',
        'top left',
        'top right',
        'top center',
        'bottom left',
        'bottom right',
        'bottom center',
        'center left',
        'center right',
      ] satisfies PinPosition[],
      table: {
        category: 'inputs',
        type: { summary: 'PinPosition' },
        defaultValue: { summary: 'top right' },
      },
    },
  },
  args: {
    position: 'top right',
    offsetX: 0,
    offsetY: 0,
    overlap: true,
  },
  render: args => {
    return {
      props: {
        position: args.position,
        overlap: args.overlap,
        offsetValue: `${args.offsetY}px ${args.offsetX}px`,
      },
      template: html`
        <div style="margin: 4rem;">
          <button zen-button zenPin>
            Notifications
            <zen-badge
              zenPinItem
              color="danger"
              variant="solid"
              [zenPinPosition]="position"
              [zenPinOffset]="offsetValue"
              [zenPinOverlap]="overlap"
            >
              3
            </zen-badge>
          </button>
        </div>
      `,
    };
  },
};

export const WithImage: Story = {
  render: () => ({
    template: html`
      <div style="margin: 4rem; display: flex; justify-content: center;">
        <div zenPin style="display: inline-block; position: relative;">
          <img src="https://picsum.photos/64/64" alt="avatar" style="border-radius: 0.5rem;" />
          <zen-badge zenPinItem color="danger" variant="solid" zenPinPosition="top right" zenPinOverlap>3</zen-badge>
        </div>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: { BellIcon, ChatIcon, RotateLeft02Icon },
    template: html`
      <div style="margin: 4rem; display: flex; gap: 1rem">
        <zen-avatar zenPin src="https://github.com/kstepien3.png">
          <zen-icon zenPinItem [icon]="ChatIcon" [strokeWidth]="2" [size]="18" zenPinOverlap />
        </zen-avatar>

        <zen-avatar src="https://github.com/kstepien3.png" zenPin>
          <zen-icon
            zenPinItem
            zenPinPosition="bottom right"
            zenPinOffset="5px"
            [icon]="RotateLeft02Icon"
            [strokeWidth]="2"
            [size]="24"
          />
        </zen-avatar>

        <button zen-button zenPin>
          Notifications
          <zen-badge zenPinItem color="danger" variant="solid" zenPinPosition="top right" zenPinOverlap>3</zen-badge>
          <zen-icon
            zenPinItem
            zenPinPosition="bottom right"
            zenPinOverlap
            [icon]="BellIcon"
            [strokeWidth]="2"
            [size]="16"
          />
        </button>
      </div>
    `,
  }),
};
