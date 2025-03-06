import { Meta, StoryObj } from '@storybook/angular';
import { ZenInputComponent } from './input.component';

export default {
  title: 'Components/Input',
  component: ZenInputComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    value: '',
    disabled: false,
  },
} satisfies Meta<ZenInputComponent>;

type Story = StoryObj<ZenInputComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `<zen-input [disabled]="${args.disabled}" [value]="'${args.value}'"/>`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <label>
        <span>Input Label</span>
        <zen-input />
      </label>
  `,
  }),
};
