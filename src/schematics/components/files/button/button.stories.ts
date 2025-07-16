import type { Meta, StoryObj } from '@storybook/angular';

import { ZenButton } from './button';

export default {
  title: 'Components/Button',
  component: ZenButton,
  tags: ['autodocs'],
  render: args => ({ props: { ...args } }),
} satisfies Meta<ZenButton>;

type Story = StoryObj<ZenButton>;

export const Default: Story = {
  render: () => ({
    template: `
        <button zen-btn>Test</button>
    `,
  }),
};
