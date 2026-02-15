import * as icons from '@hugeicons/core-free-icons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenIcon } from '../icon';
import { ZenAlert } from './alert';

interface StoryParams {
  content: string;
  icon: string;
  title: string;
}

type Options = ZenAlert & StoryParams;

export default {
  title: 'Ui/Alert',
  component: ZenAlert,
  decorators: [moduleMetadata({ imports: [ZenIcon] })],
  args: {
    icon: 'Notification02Icon',
    title: 'Alert Title',
    content: 'This is an alert message',
  },
  argTypes: {
    content: {
      control: 'text',
      table: {
        category: 'story parameters',
        type: {
          summary: 'ng-content',
        },
      },
    },
    icon: {
      control: 'select',
      options: Object.keys(icons),
      table: {
        category: 'story parameters',
        type: {
          summary: 'string',
        },
      },
    },
    title: {
      control: 'text',
      table: {
        category: 'story parameters',
        type: {
          summary: 'string',
        },
      },
    },
  },
  render: ({ content, icon, title }) => ({
    props: {},
    template: `
      <zen-alert>
        ${icon ? '<zen-icon alert-icon icon="' + icon + '" />' : ''}
        <h3 alert-title>${title}</h3>
        ${content}
      </zen-alert>`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};
