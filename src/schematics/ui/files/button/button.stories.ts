import { Add01Icon } from '@hugeicons/core-free-icons';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenIcon } from '../icon';
import { ZenButton } from './button';

interface StoryParams {
  disabled: boolean;
}

type Options = ZenButton & StoryParams;

export default {
  title: 'Ui/Button',
  component: ZenButton,
  args: {
    disabled: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'attributes',
        type: {
          summary: 'boolean',
        },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'link', 'ghost'],
    },
  },
  render: ({ ...args }) => ({
    props: args,
    template: `<button zen-btn ${argsToTemplate(args)} >Button</button>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const IconButton: Story = {
  decorators: [moduleMetadata({ imports: [ZenIcon] })],
  render: args => ({
    props: { Add01Icon, ...args },
    template: `<button zen-btn ${argsToTemplate(args)}>
    <zen-icon [icon]="Add01Icon" [size]="16" [strokeWidth]="3" /> Add
  </button>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem">
        <button zen-button variant="primary">Primary</button>
        <button zen-button variant="secondary">Secondary</button>
        <button zen-button variant="link">Link</button>
        <button zen-button variant="ghost">Ghost</button>
      </div>
    `,
  }),
};
