import type { Meta, StoryObj } from '@storybook/angular';

import { ZenAvatar } from './avatar';

export default {
  title: 'Components/Avatar',
  component: ZenAvatar,
  tags: ['autodocs'],
  render: args => ({ props: { ...args } }),
} satisfies Meta<ZenAvatar>;

type Story = StoryObj<ZenAvatar>;

export const Image: Story = {
  args: {
    src: 'https://picsum.photos/32',
  },
};

export const Default: Story = {
  render: () => ({
    template: `
        <zen-avatar src="https://github.com/kstepien3.png" alt="Author" style="--zen-avatar-size: 64px"/>
    `,
  }),
};

export const Text: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem;">
        <zen-avatar>MI</zen-avatar>
        <zen-avatar>IB</zen-avatar>
        <zen-avatar>WP</zen-avatar>
        <zen-avatar>AI</zen-avatar>
      </div> `,
  }),
};
