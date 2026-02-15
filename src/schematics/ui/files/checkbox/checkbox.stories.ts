import { Meta, StoryObj } from '@storybook/angular';

import { ZenCheckbox } from './checkbox';

type Options = ZenCheckbox;

export default {
  title: 'Ui/Checkbox',
  component: ZenCheckbox,
  argTypes: {
    value: {
      table: {
        category: 'models',
        type: {
          summary: 'boolean | null',
        },
        defaultValue: {
          summary: 'false',
        },
      },
      control: 'radio',
      options: [true, false, null],
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
          summary: '(value: boolean | null) => void',
        },
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

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 0.25rem">
        <zen-checkbox id="label-example"/>
        <label for="label-example"> With label </label>
      </div>
  `,
  }),
};
