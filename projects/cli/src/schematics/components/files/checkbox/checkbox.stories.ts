import { Meta, StoryObj } from '@storybook/angular';
import { ZenCheckboxComponent } from './checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: ZenCheckboxComponent,
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
} satisfies Meta<ZenCheckboxComponent>;

type Story = StoryObj<ZenCheckboxComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <zen-checkbox
        [disabled]="${args.disabled}"
        [value]="'${args.value}'"
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
