import { Meta, StoryObj } from '@storybook/angular';

import { ZenHint } from './hint';

type Options = ZenHint;

export default {
  title: 'Ui/Hint',
  component: ZenHint,
  argTypes: {
    severity: {
      control: 'select',
      options: ['info', 'warning', 'error', 'danger', 'success', 'neutral', 'primary'],
    },
  },
  args: {
    severity: 'neutral',
  },
  render: args => ({
    props: args,
    template: `<zen-hint [severity]="severity">This is a ${args.severity ?? 'neutral'} message.</zen-hint>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const ErrorSeverity: Story = {
  args: {
    severity: 'error',
  },
  render: args => ({
    props: args,
    template: '<zen-hint [severity]="severity">This field is required.</zen-hint>',
  }),
};

export const WarningSeverity: Story = {
  args: {
    severity: 'warning',
  },
  render: args => ({
    props: args,
    template: '<zen-hint [severity]="severity">Password strength is moderate.</zen-hint>',
  }),
};

export const SuccessSeverity: Story = {
  args: {
    severity: 'success',
  },
  render: args => ({
    props: args,
    template: '<zen-hint [severity]="severity">Username is available.</zen-hint>',
  }),
};
