import * as icons from '@hugeicons/core-free-icons';
import { Meta, StoryObj } from '@storybook/angular';

import { ZenIcon } from './icon';

type Options = ZenIcon;

export default {
  title: 'Components/Icon',
  component: ZenIcon,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons),
      table: {
        type: { summary: 'string' },
        category: 'inputs',
        subcategory: 'required',
        defaultValue: { summary: '' },
      },
    },
    size: {
      control: { type: 'range', min: 12, max: 100, step: 1 },
      table: { category: 'inputs', type: { summary: 'number' } },
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 5, step: 0.25 },
      table: { category: 'inputs', defaultValue: { summary: '1.5' }, type: { summary: 'number' } },
    },
    absoluteStrokeWidth: {
      control: 'boolean',
      table: { category: 'inputs', defaultValue: { summary: 'false' }, type: { summary: 'boolean' } },
    },
    color: {
      control: 'color',
      table: { category: 'inputs', type: { summary: 'string' }, defaultValue: { summary: 'currentColor' } },
    },
  },
  args: {
    size: 24,
    strokeWidth: 1.5,
    absoluteStrokeWidth: false,
    icon: 'Tree02Icon',
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};
