import type { Meta, StoryObj } from '@storybook/angular';

import { ZenButton } from './button';

interface StoryParams {
  content: string;
  disabled: boolean;
}

type Options = ZenButton & StoryParams;

export default {
  title: 'Ui/Button',
  component: ZenButton,
  args: {
    content: 'Test',
    disabled: false,
  },
  argTypes: {
    content: {
      control: 'text',
      table: {
        category: 'story parameters',
        type: {
          summary: 'ng-content',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'attributes',
        type: {
          summary: 'boolean',
        },
      },
    },
  },
  render: ({ content, ...args }) => ({
    props: args,
    template: `<button zen-btn ${args.disabled ? 'disabled' : ''}>${content}</button>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};
