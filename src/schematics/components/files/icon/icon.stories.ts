import { Meta, StoryObj } from '@storybook/angular';

import { ZenIcon } from './icon';

type Options = ZenIcon;

export default {
  title: 'Components/Icon',
  component: ZenIcon,
  tags: ['autodocs'],
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {
  render: () => ({
    template: `
        <zen-icon icon="Tree02Icon" [size]="64"/>
    `,
  }),
};
