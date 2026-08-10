import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenPopover } from './popover';
import type { PopoverPosition } from './popover-positions.type';

type Story = StoryObj<ZenPopover>;

const meta = {
  title: 'Ui/Popover',
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
        'bottom',
        'center',
        'left',
        'right',
        'top left',
        'top right',
        'top center',
        'bottom left',
        'bottom right',
        'bottom center',
        'center left',
        'center right',
      ] satisfies PopoverPosition[],
      table: {
        category: 'inputs',
        type: {
          summary: 'PopoverPosition',
        },
        defaultValue: {
          summary: 'top' satisfies PopoverPosition,
        },
      },
    },
    id: { control: 'text', table: { defaultValue: { summary: 'zen-popover-*X*' } } },
    content: { name: 'zenPopover', control: 'text', table: { defaultValue: { summary: '' } } },
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

export const WithTemplate: Story = {
  render: ({ placement, content }) => ({
    template: `
      <ng-template #popoverContent>
        <i>${content as string}</i>
      </ng-template>
      <button zen-btn [zenPopover]="popoverContent" [zenPopoverPlacement]="'${placement}'">
        Template
      </button>
    `,
  }),
  args: {
    id: 'zen-popover-template-story',
    placement: 'top',
  },
};
