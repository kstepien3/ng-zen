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
  flushed: boolean;
}

type Story = StoryObj<ZenPin>;

const html = String.raw;

const meta: Meta = {
  title: 'Ui/Pin',
  component: ZenPin,
  tags: ['autodocs'],
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
      description: 'Horizontal offset in pixels.',
      control: { type: 'range', min: -50, max: 50, step: 1 },
      table: {
        category: 'story parameters',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    offsetY: {
      name: 'offsetY (px)',
      description: 'Vertical offset in pixels.',
      control: { type: 'range', min: -50, max: 50, step: 1 },
      table: {
        category: 'story parameters',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    flushed: {
      description: 'Whether the pin sits flush at the edge without overlapping the anchor.',
      control: { type: 'boolean' },
      table: {
        category: 'story parameters',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      name: 'zenPinPosition',
      description: 'Position of the pin relative to the anchor element.',
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
    flushed: false,
  },
  render: args => {
    return {
      props: {
        position: args.position,
        flushed: args.flushed,
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
              [zenPinFlush]="flushed"
            >
              3
            </zen-badge>
          </button>
        </div>
      `,
    };
  },
};

export const WithIcons: Story = {
  render: () => ({
    props: { BellIcon, ChatIcon, RotateLeft02Icon },
    template: html`
      <div style="margin: 4rem; display: flex; gap: 1rem">
        <zen-avatar zenPin src="https://github.com/kstepien3.png">
          <zen-icon zenPinItem [icon]="ChatIcon" [strokeWidth]="2" [size]="18" />
        </zen-avatar>

        <zen-avatar src="https://github.com/kstepien3.png" zenPin>
          <zen-icon
            zenPinItem
            zenPinPosition="bottom right"
            zenPinFlush
            zenPinOffset="-5px"
            [icon]="RotateLeft02Icon"
            [strokeWidth]="2"
            [size]="24"
          />
        </zen-avatar>
      </div>
    `,
  }),
};

export const WithImage: Story = {
  render: () => ({
    template: html`
      <div style="margin: 4rem; display: flex; justify-content: center;">
        <div zenPin style="display: flex">
          <zen-badge zenPinItem color="success" zenPinPosition="top right">Random photo</zen-badge>
          <zen-badge zenPinItem color="info" zenPinPosition="bottom right">Multiple pins</zen-badge>
          <img src="https://picsum.photos/536/354" alt="photo" style="border-radius: 0.5rem;" />
        </div>
      </div>
    `,
  }),
};
