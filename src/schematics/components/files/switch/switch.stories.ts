import { Meta, StoryObj } from '@storybook/angular';

import { ZenSwitchComponent } from './switch.component';

export default {
  title: 'Components/Switch',
  component: ZenSwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    value: false,
    disabled: false,
  },
} satisfies Meta<ZenSwitchComponent>;

type Story = StoryObj<ZenSwitchComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <zen-switch
        [disabled]="${args.disabled}"
        [value]="${args.value}"
      />`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 0.25rem">
        <zen-switch id="label-example"/>
        <label for="label-example"> With label </label>
      </div>
  `,
  }),
};
