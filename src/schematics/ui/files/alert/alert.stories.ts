import { Notification02Icon } from '@hugeicons/core-free-icons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenIcon } from '../icon';
import { ZenAlert } from './alert';

interface StoryParams {
  content: string;
  title: string;
}

type Options = ZenAlert & StoryParams;

export default {
  title: 'Ui/Alert',
  component: ZenAlert,
  decorators: [moduleMetadata({ imports: [ZenIcon] })],
  args: {
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
  render: ({ content, title }) => {
    return {
      props: { Notification02Icon },
      template: `
        <zen-alert>
          <zen-icon alert-icon [icon]="Notification02Icon" />
          <h3 alert-title>${title}</h3>
          ${content}
        </zen-alert>`,
    };
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};
