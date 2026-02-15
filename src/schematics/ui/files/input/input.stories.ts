import { Meta, StoryObj } from '@storybook/angular';

import { ZenInput } from './input';

type Options = ZenInput;

export default {
  title: 'Ui/Input',
  component: ZenInput,
  argTypes: {
    value: {
      control: 'text',
      table: {
        category: 'models',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    placeholder: { control: 'text', table: { type: { summary: 'string' } } },
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
          summary: '(value: string) => void',
        },
      },
    },
  },
  args: {
    value: '',
    placeholder: '',
    disabled: false,
    required: false,
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column">
        <label for="label-example"> With label </label>
        <zen-input id="label-example"/>
      </div>
  `,
  }),
};
