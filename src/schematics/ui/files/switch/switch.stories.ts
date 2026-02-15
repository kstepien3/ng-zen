import { Meta, StoryObj } from '@storybook/angular';

import { ZenSwitch } from './switch';

type Options = ZenSwitch;

export default {
  title: 'Ui/Switch',
  component: ZenSwitch,
  argTypes: {
    value: {
      control: 'boolean',
      table: {
        category: 'models',
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'models',
        type: {
          summary: 'boolean',
        },
      },
    },
    required: {
      control: 'boolean',
      table: {
        category: 'inputs',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onInput: {
      table: {
        readonly: true,
        type: {
          summary: '(value: boolean) => void',
        },
      },
    },
    onKeyDown: {
      table: {
        readonly: true,
      },
    },
  },
  args: {
    value: false,
    disabled: false,
    required: false,
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};
