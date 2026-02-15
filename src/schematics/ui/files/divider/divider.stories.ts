import { Meta, StoryObj } from '@storybook/angular';

import { ZenDivider } from './divider';

interface StoryParams {
  content: string;
  vertical: boolean;
}

type Options = ZenDivider & StoryParams;

export default {
  title: 'Components/Divider',
  component: ZenDivider,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    content: {
      control: 'text',
      table: {
        category: 'Story parameters',
        type: {
          summary: 'ng-content',
        },
      },
    },
    vertical: {
      control: 'boolean',
      table: { category: 'attributes', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      table: {
        category: 'inputs',
        defaultValue: { summary: 'center' },
        type: { summary: '"start" | "center" | "end"' },
      },
    },
  },
  args: { content: '', vertical: false, align: 'center' },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

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
