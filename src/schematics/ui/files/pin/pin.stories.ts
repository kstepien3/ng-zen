import { ChatIcon, RotateLeft02Icon } from '@hugeicons/core-free-icons';
import { Args, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenAvatar } from '../avatar';
import { ZenBadge } from '../badge';
import { ZenButton } from '../button';
import { ZenIcon } from '../icon';
import { ZenPin } from './pin';
import type { PinPosition } from './pin.types';

interface WithBadgeArgs extends Args {
  position: PinPosition;
  offsetX: number;
  offsetY: number;
}

type Story = StoryObj<ZenPin>;

const meta = {
  title: 'Ui/Pin',
  component: ZenPin,
  decorators: [
    moduleMetadata({
      imports: [ZenPin, ZenBadge, ZenButton, ZenIcon, ZenAvatar],
    }),
  ],
  argTypes: {
    template: {
      name: 'zenPin',
      table: { disable: true },
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
    offset: {
      name: 'zenPinOffset',
      table: { disable: true },
    },
  },
  args: {
    position: 'top right',
  },
} satisfies Meta<ZenPin>;

export default meta;

export const WithBadge: StoryObj<WithBadgeArgs> = {
  argTypes: {
    offsetX: {
      name: 'offsetX',
      control: { type: 'range', min: -100, max: 100, step: 1 },
    },
    offsetY: {
      name: 'offsetY',
      control: { type: 'range', min: -100, max: 100, step: 1 },
    },
  },
  args: {
    position: 'top right',
    offsetX: -50,
    offsetY: -50,
  },
  render: args => {
    const parts = args.position.split(' ') as [string] | [string, string];
    const verticals = new Set(['top', 'bottom', 'center']);
    const [v, h] = parts.length === 2 ? parts : verticals.has(parts[0]) ? [parts[0], 'center'] : ['center', parts[0]];

    const hFactor = h === 'right' ? -1 : h === 'left' ? 1 : 0;
    const vFactor = v === 'top' ? 1 : v === 'bottom' ? -1 : 0;
    const tx = -hFactor * args.offsetX;
    const ty = -vFactor * args.offsetY;

    return {
      props: {
        position: args.position,
        offsetValue: `${tx ? tx + '%' : '0'} ${ty ? ty + '%' : '0'}`,
      },
      template: `
        <div style="margin: 4rem;">
          <button
            zen-button
            [zenPin]="pin"
            [zenPinPosition]="position"
            [zenPinOffset]="offsetValue"
          >
            Notifications
          </button>
          <ng-template #pin>
            <zen-badge color="danger" variant="solid">3</zen-badge>
          </ng-template>
        </div>
      `,
    };
  },
};

export const WithIcon: Story = {
  render: () => ({
    props: { RotateLeft02Icon, ChatIcon },
    template: `
      <div style="margin: 4rem; display: flex; gap: 1rem">
        <zen-avatar
          src="https://github.com/kstepien3.png"
          [zenPin]="icon"
        />
        <ng-template #icon>
          <zen-icon [icon]="ChatIcon" [strokeWidth]="2" [size]="18" />
        </ng-template>

        <zen-avatar
          src="https://github.com/kstepien3.png"
          [zenPin]="iconTemplate"
          zenPinPosition="bottom right"
          zenPinOffset="-5px -10px"
        />
        <ng-template #iconTemplate>
          <zen-icon [icon]="RotateLeft02Icon" [strokeWidth]="2" [size]="24" />
        </ng-template>
      </div>
    `,
  }),
  args: {
    position: 'bottom center',
  },
};
