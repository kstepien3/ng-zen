import type { Meta, StoryObj } from '@storybook/angular';

import { ZenAvatar } from './avatar';

type Options = ZenAvatar;

export default {
  title: 'Ui/Avatar',
  component: ZenAvatar,
  argTypes: {
    src: {
      table: {
        category: 'inputs',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
      control: 'text',
    },
    alt: {
      table: {
        category: 'inputs',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
      control: 'text',
    },
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {
  args: {
    src: 'https://github.com/kstepien3.png',
    alt: 'Author',
  },
};

export const Image: Story = {
  args: {
    src: 'https://picsum.photos/32',
    alt: 'Random User',
  },
};

export const Text: Story = {
  render: () => ({
    template: `<zen-avatar>KS</zen-avatar>`,
  }),
};
