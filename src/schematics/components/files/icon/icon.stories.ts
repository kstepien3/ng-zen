import { Meta, StoryObj } from '@storybook/angular';

import { ZenIconComponent } from './icon.component';

type Options = ZenIconComponent;

export default {
  title: 'Components/Icon',
  component: ZenIconComponent,
  tags: ['autodocs'],
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {
  render: () => ({
    template: `
        <zen-icon icon="Tree02Icon" [size]="64"/>
    `,
  }),
};
