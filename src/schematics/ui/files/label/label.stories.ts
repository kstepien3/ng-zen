import { Meta, StoryObj } from '@storybook/angular';

import { ZenLabel } from './label';

type Options = ZenLabel;

export default {
  title: 'Ui/Label',
  component: ZenLabel,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    for: {
      control: 'text',
    },
  },
  args: {
    size: 'md',
    required: false,
    disabled: false,
    for: 'example-control',
  },
  render: args => ({
    props: args,
    template: `
      <zen-label [disabled]="disabled" [for]="for" [required]="required" [size]="size">
        Label text
      </zen-label>
    `,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
