import type { Meta, StoryObj } from '@storybook/angular';

import { ZenAvatarComponent } from './avatar.component';

export default {
  title: 'Components/Avatar',
  component: ZenAvatarComponent,
  tags: ['autodocs'],
  render: args => ({ props: { ...args } }),
} satisfies Meta<ZenAvatarComponent>;

type Story = StoryObj<ZenAvatarComponent>;

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
