import { Meta, StoryObj } from '@storybook/angular';

import { ZenInputComponent } from './input.component';

export default {
  title: 'Components/Input',
  component: ZenInputComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    id: { control: 'text' },
  },
  args: {
    value: '',
    placeholder: '',
    disabled: false,
    required: false,
    id: '',
  },
} satisfies Meta<ZenInputComponent>;

type Story = StoryObj<ZenInputComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <zen-input
        [disabled]="${args.disabled}"
        [value]="'${args.value}'"
        ${args.id ? 'id="' + args.id + '"' : ''}
        ${args.placeholder ? 'placeholder="' + args.placeholder + '"' : ''}
        ${args.required ? 'required' : ''}
      />`,
  }),
};

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
