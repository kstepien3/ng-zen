import { Meta, StoryObj } from '@storybook/angular';

import { ZenDivider } from './divider';

interface StoryParams {
  content: string;
  vertical: boolean;
}

export default {
  title: 'Components/Divider',
  component: ZenDivider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    content: { control: 'text' },
    vertical: { control: 'boolean' },
    align: { control: 'select', options: ['start', 'center', 'end'] },
  },
  args: { content: '', vertical: false, align: 'center' },
} satisfies Meta<ZenDivider & StoryParams>;

type Story = StoryObj<ZenDivider & StoryParams>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `
    <div style="height: 200px">
        <zen-divider [align]="'${args.align}'" [attr.vertical]="${args.vertical}">
          ${args.content ?? ''}
        </zen-divider>
    </div>`,
  }),
};

export const Vertical: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="height: 200px; display: flex; justify-content: space-between">
        <zen-divider vertical align="start">
          START
        </zen-divider>
        <zen-divider vertical>
          CENTER
        </zen-divider>
        <zen-divider vertical align="end">
          END
        </zen-divider>
      </div>`,
  }),
};

export const Customization: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <zen-divider style="--zen-divider-appearance: red;">appearance</zen-divider>
        <zen-divider style="--zen-divider-type: dotted;">type</zen-divider>
        <zen-divider style="--zen-divider-align-offset: 10%;" align="start">offset</zen-divider>
        <zen-divider style="--zen-divider-gap: 50px">gap</zen-divider>
        <zen-divider style="--zen-divider-thickness: 8px">offset</zen-divider>
      </div>
    `,
  }),
};
