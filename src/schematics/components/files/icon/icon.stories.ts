import { Meta, StoryObj } from '@storybook/angular';

import { ZenIcon } from './icon';

type Options = ZenIcon;

export default {
  title: 'Components/Icon',
  component: ZenIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 12, max: 100, step: 1 }, description: 'Size' },
    strokeWidth: { control: { type: 'range', min: 1, max: 5, step: 0.25 }, description: 'strokeWidth' },
    absoluteStrokeWidth: { control: 'boolean' },
  },
  args: {
    size: 64,
    strokeWidth: 1.5,
    absoluteStrokeWidth: false,
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {
  render: args => ({
    template: `
        <zen-icon icon="Tree02Icon" [size]="${args.size}" [strokeWidth]="${args.strokeWidth}" ${args.absoluteStrokeWidth ? 'absoluteStrokeWidth' : ''}>
    `,
  }),
};
