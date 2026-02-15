import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenPopover } from './popover';
import type { PopoverPlacement } from './popover-positions.type';

type Story = StoryObj<ZenPopover>;

const meta = {
  title: 'Directive/Popover',
  component: ZenPopover,
  decorators: [
    moduleMetadata({
      imports: [ZenButton, ZenPopover],
    }),
  ],
  argTypes: {
    placement: {
      name: 'zenPopoverPlacement',
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ] satisfies PopoverPlacement[],
      table: {
        category: 'inputs',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'top' satisfies PopoverPlacement,
        },
      },
    },
    id: { control: 'text', table: { defaultValue: { summary: 'zen-popover-*X*' } } },
    content: { name: 'zenPopover', control: 'text' },
  },
  args: {
    placement: 'top',
    id: 'zen-popover-story',
    content: 'This is a popover',
  },
} satisfies Meta<ZenPopover>;

export default meta;

export const Default: Story = {
  render: ({ content, placement, ...args }) => ({
    props: args,
    template: `
      <button zen-btn [zenPopover]="'${content as string}'" [zenPopoverPlacement]="'${placement}'" ${argsToTemplate(args)}>
        Toggle
      </button>
    `,
  }),
};
