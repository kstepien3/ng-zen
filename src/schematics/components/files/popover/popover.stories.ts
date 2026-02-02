import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenPopover } from './popover';
import { ZenPopoverTarget } from './popover-target';

type Story = StoryObj<ZenPopover>;

export default {
  title: 'Components/Popover',
  component: ZenPopover,
  decorators: [moduleMetadata({ imports: [ZenPopoverTarget, ZenButton] })],
  argTypes: {},
  args: {},
} satisfies Meta<ZenPopover>;

// Default story with external trigger
export const Default: Story = {
  render: args => ({
    props: args,
    template: `
        <zen-popover #popover >Test</zen-popover>
        <button zen-btn [zenPopoverTarget]="popover" >
          Toggle Popover
        </button>
    `,
  }),
};
