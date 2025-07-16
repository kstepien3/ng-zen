import { Meta, StoryObj } from '@storybook/angular';

import { ZenCheckbox } from './checkbox';

export default {
  title: 'Components/Checkbox',
  component: ZenCheckbox,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    id: { control: 'text' },
  },
  args: {
    value: false,
    disabled: false,
    required: false,
    id: '',
  },
} satisfies Meta<ZenCheckbox>;

type Story = StoryObj<ZenCheckbox>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <zen-checkbox
        [disabled]="${args.disabled}"
        [value]="${args.value}"
        ${args.id ? 'id="' + args.id + '"' : ''}
        ${args.required ? 'required' : ''}
      />`,
  }),
};

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
