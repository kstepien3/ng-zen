import { FavouriteIcon } from '@hugeicons/core-free-icons';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenIcon } from '../icon';
import { ZenBadge } from './badge';

interface StoryParams {
  color: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  variant: 'solid' | 'filled' | 'outline' | 'ghost';
  disabled: boolean;
  label: string;
}

type Options = ZenBadge & StoryParams;

export default {
  title: 'Ui/Badge',
  component: ZenBadge,
  args: {
    label: 'Badge',
    color: 'neutral',
    variant: 'solid',
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      table: {
        category: 'story parameters',
        type: {
          summary: 'ng-content',
        },
      },
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'filled', 'outline', 'ghost'],
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
  render: ({ label, ...args }) => ({
    props: args,
    template: `<zen-badge ${argsToTemplate(args)}>${label}</zen-badge>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithIcon: Story = {
  decorators: [moduleMetadata({ imports: [ZenIcon] })],
  render: () => ({
    props: { FavouriteIcon },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
        <zen-badge color="primary">
          <zen-icon [icon]="FavouriteIcon" [size]="12" [strokeWidth]="3" />
          With Icon
        </zen-badge>
        <zen-badge variant="outline" color="primary">
          <zen-icon [icon]="FavouriteIcon" [size]="12" [strokeWidth]="3" />
          Outline
        </zen-badge>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem">
        <zen-badge variant="solid">Solid</zen-badge>
        <zen-badge variant="filled">Filled</zen-badge>
        <zen-badge variant="outline">Outline</zen-badge>
        <zen-badge variant="ghost">Ghost</zen-badge>
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
          <zen-badge variant="solid">Solid</zen-badge>
          <zen-badge variant="filled">Filled</zen-badge>
          <zen-badge variant="outline">Outline</zen-badge>
          <zen-badge variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Primary -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge color="primary" variant="solid">Solid</zen-badge>
          <zen-badge color="primary" variant="filled">Filled</zen-badge>
          <zen-badge color="primary" variant="outline">Outline</zen-badge>
          <zen-badge color="primary" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Success -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge color="success" variant="solid">Solid</zen-badge>
          <zen-badge color="success" variant="filled">Filled</zen-badge>
          <zen-badge color="success" variant="outline">Outline</zen-badge>
          <zen-badge color="success" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Warning -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge color="warning" variant="solid">Solid</zen-badge>
          <zen-badge color="warning" variant="filled">Filled</zen-badge>
          <zen-badge color="warning" variant="outline">Outline</zen-badge>
          <zen-badge color="warning" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Danger -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge color="danger" variant="solid">Solid</zen-badge>
          <zen-badge color="danger" variant="filled">Filled</zen-badge>
          <zen-badge color="danger" variant="outline">Outline</zen-badge>
          <zen-badge color="danger" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Info -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge color="info" variant="solid">Solid</zen-badge>
          <zen-badge color="info" variant="filled">Filled</zen-badge>
          <zen-badge color="info" variant="outline">Outline</zen-badge>
          <zen-badge color="info" variant="ghost">Ghost</zen-badge>
        </div>
      </div>
    `,
  }),
};

export const DisabledVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Default (No color attribute) -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge disabled variant="solid">Solid</zen-badge>
          <zen-badge disabled variant="filled">Filled</zen-badge>
          <zen-badge disabled variant="outline">Outline</zen-badge>
          <zen-badge disabled variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Primary -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge disabled color="primary" variant="solid">Solid</zen-badge>
          <zen-badge disabled color="primary" variant="filled">Filled</zen-badge>
          <zen-badge disabled color="primary" variant="outline">Outline</zen-badge>
          <zen-badge disabled color="primary" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Success -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge disabled color="success" variant="solid">Solid</zen-badge>
          <zen-badge disabled color="success" variant="filled">Filled</zen-badge>
          <zen-badge disabled color="success" variant="outline">Outline</zen-badge>
          <zen-badge disabled color="success" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Warning -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge disabled color="warning" variant="solid">Solid</zen-badge>
          <zen-badge disabled color="warning" variant="filled">Filled</zen-badge>
          <zen-badge disabled color="warning" variant="outline">Outline</zen-badge>
          <zen-badge disabled color="warning" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Danger -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge disabled color="danger" variant="solid">Solid</zen-badge>
          <zen-badge disabled color="danger" variant="filled">Filled</zen-badge>
          <zen-badge disabled color="danger" variant="outline">Outline</zen-badge>
          <zen-badge disabled color="danger" variant="ghost">Ghost</zen-badge>
        </div>

        <!-- Info -->
        <div style="display: flex; gap: 0.5rem;">
          <zen-badge disabled color="info" variant="solid">Solid</zen-badge>
          <zen-badge disabled color="info" variant="filled">Filled</zen-badge>
          <zen-badge disabled color="info" variant="outline">Outline</zen-badge>
          <zen-badge disabled color="info" variant="ghost">Ghost</zen-badge>
        </div>
      </div>
    `,
  }),
};
