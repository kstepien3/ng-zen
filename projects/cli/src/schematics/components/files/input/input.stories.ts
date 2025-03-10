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
  },
  args: {
    value: '',
    placeholder: '',
    disabled: false,
    required: false,
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
        [placeholder]="${args.placeholder}"
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
