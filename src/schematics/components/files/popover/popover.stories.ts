import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenPopover } from './popover';

type Story = StoryObj<ZenPopover>;

// TODO: Move to directives
export default {
  title: 'Directive/Popover',
  component: ZenPopover,
  decorators: [moduleMetadata({ imports: [ZenButton] })],
  argTypes: {},
  args: {},
} satisfies Meta<ZenPopover>;

// Default story with external trigger
export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <ng-template #tpl>
        <div>Test</div>
      </ng-template>

      <button zen-btn [zenPopover]="tpl">
        Toggle Popover
      </button>


      <button zen-btn [zenPopover]="'Text'">
        Toggle Popover
      </button>
    `,
  }),
};
