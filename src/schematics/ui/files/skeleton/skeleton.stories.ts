import { Meta, StoryObj } from '@storybook/angular';

import { ZenSkeleton } from './skeleton';

interface StoryParams {
  rounded: boolean;
  height: number;
  width: number;
}

type Options = ZenSkeleton & StoryParams;

export default {
  title: 'Components/Skeleton',
  component: ZenSkeleton,
  argTypes: {
    rounded: {
      control: { type: 'boolean' },
      table: {
        category: 'attributes',
      },
    },
    height: {
      control: { type: 'range', min: 1, max: 20, step: 0.25 },
      description: 'Height managed by css',
      table: {
        category: 'story parameters',
        type: {
          summary: undefined,
        },
      },
    },
    width: {
      control: { type: 'range', min: 1, max: 20, step: 0.25 },
      description: 'Width managed by css',
      table: {
        category: 'story parameters',
        type: {
          summary: undefined,
        },
      },
    },
  },
  args: {
    rounded: false,
    height: 3,
    width: 3,
  },
  render: args => ({
    props: { ...args },
    template: `
      <zen-skeleton ${args.rounded ? 'rounded' : ''} style="width: ${args.width}rem; height: ${args.height}rem"/>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};
