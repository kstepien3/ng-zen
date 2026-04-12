import { FavouriteIcon } from '@hugeicons/core-free-icons';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenIcon } from '../icon';
import { ZenButton } from './button';

interface StoryParams {
  color: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  variant: 'solid' | 'filled' | 'outline' | 'ghost' | 'link';
  disabled: boolean;
}

type Options = ZenButton & StoryParams;

export default {
  title: 'Ui/Button',
  component: ZenButton,
  args: {
    disabled: false,
    size: 'md',
    color: 'neutral',
    variant: 'solid',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'filled', 'outline', 'ghost', 'link'],
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
  },
  render: ({ ...args }) => ({
    props: args,
    template: `<button zen-btn ${argsToTemplate(args)}>Button</button>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const IconButton: Story = {
  decorators: [moduleMetadata({ imports: [ZenIcon] })],
  render: args => ({
    props: { FavouriteIcon, ...args },
    template: `<button zen-btn variant="ghost" ${argsToTemplate(args, { exclude: ['variant'] })}>
    <zen-icon [icon]="FavouriteIcon" [size]="16" [strokeWidth]="3" />
  </button>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem">
        <button zen-button variant="solid">Solid</button>
        <button zen-button variant="filled">Filled</button>
        <button zen-button variant="outline">Outline</button>
        <button zen-button variant="ghost">Ghost</button>
        <button zen-button variant="link">Link</button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 0.5rem">
        <button zen-button size="sm">Small</button>
        <button zen-button size="md">Medium</button>
        <button zen-button size="lg">Large</button>
      </div>
    `,
  }),
};

export const AllColorVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Default (No color attribute) -->
        <div style="display: flex; gap: 0.5rem;">
          <button zen-button variant="solid">Solid</button>
          <button zen-button variant="filled">Filled</button>
          <button zen-button variant="outline">Outline</button>
          <button zen-button variant="ghost">Ghost</button>
          <button zen-button variant="link">Link</button>
        </div>

        <!-- Primary -->
        <div style="display: flex; gap: 0.5rem;">
          <button zen-button color="primary" variant="solid">Solid</button>
          <button zen-button color="primary" variant="filled">Filled</button>
          <button zen-button color="primary" variant="outline">Outline</button>
          <button zen-button color="primary" variant="ghost">Ghost</button>
          <button zen-button color="primary" variant="link">Link</button>
        </div>

        <!-- Success -->
        <div style="display: flex; gap: 0.5rem;">
          <button zen-button color="success" variant="solid">Solid</button>
          <button zen-button color="success" variant="filled">Filled</button>
          <button zen-button color="success" variant="outline">Outline</button>
          <button zen-button color="success" variant="ghost">Ghost</button>
          <button zen-button color="success" variant="link">Link</button>
        </div>

        <!-- Warning -->
        <div style="display: flex; gap: 0.5rem;">
          <button zen-button color="warning" variant="solid">Solid</button>
          <button zen-button color="warning" variant="filled">Filled</button>
          <button zen-button color="warning" variant="outline">Outline</button>
          <button zen-button color="warning" variant="ghost">Ghost</button>
          <button zen-button color="warning" variant="link">Link</button>
        </div>

        <!-- Danger -->
        <div style="display: flex; gap: 0.5rem;">
          <button zen-button color="danger" variant="solid">Solid</button>
          <button zen-button color="danger" variant="filled">Filled</button>
          <button zen-button color="danger" variant="outline">Outline</button>
          <button zen-button color="danger" variant="ghost">Ghost</button>
          <button zen-button color="danger" variant="link">Link</button>
        </div>

        <!-- Info -->
        <div style="display: flex; gap: 0.5rem;">
          <button zen-button color="info" variant="solid">Solid</button>
          <button zen-button color="info" variant="filled">Filled</button>
          <button zen-button color="info" variant="outline">Outline</button>
          <button zen-button color="info" variant="ghost">Ghost</button>
          <button zen-button color="info" variant="link">Link</button>
        </div>
      </div>
    `,
  }),
};
