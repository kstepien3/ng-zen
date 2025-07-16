import { Meta, StoryObj } from '@storybook/angular';

import { ZenSkeleton } from './skeleton';

interface StoryParams {
  rounded: boolean;
  height: number;
  width: number;
}

type StoryType = ZenSkeleton & StoryParams;

export default {
  title: 'Components/Skeleton',
  component: ZenSkeleton,
  tags: ['autodocs'],
  argTypes: {
    rounded: { control: { type: 'boolean' } },
    height: { control: { type: 'range', min: 1, max: 20, step: 0.25 }, description: 'Height managed by css' },
    width: { control: { type: 'range', min: 1, max: 20, step: 0.25 }, description: 'Width managed by css' },
  },
  args: {
    rounded: false,
    height: 3,
    width: 3,
  },
} satisfies Meta<StoryType>;

type Story = StoryObj<StoryType>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <zen-skeleton ${args.rounded ? 'rounded' : ''} style="width: ${args.width}rem; height: ${args.height}rem"/>`,
  }),
};
