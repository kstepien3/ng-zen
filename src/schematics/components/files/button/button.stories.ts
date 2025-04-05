import type { Meta, StoryObj } from '@storybook/angular';
import { ZenButtonComponent } from './button.component';

export default {
  title: 'Components/Button',
  component: ZenButtonComponent,
  tags: ['autodocs'],
  render: args => ({ props: { ...args } }),
} satisfies Meta<ZenButtonComponent>;

type Story = StoryObj<ZenButtonComponent>;

export const Default: Story = {
  render: () => ({
    template: `
        <button zen-btn>Test</button>
    `,
  }),
};
