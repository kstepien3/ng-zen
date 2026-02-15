import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenCheckbox } from '../checkbox';
import { ZenInput } from '../input';
import { ZenSwitch } from '../switch';
import { ZenFormControl } from './form-control';

type Options = ZenFormControl<unknown>;

export default {
  title: 'Ui/FormControl',
  component: ZenFormControl,
  decorators: [
    moduleMetadata({ imports: [ZenCheckbox, ZenInput, ZenSwitch] }),
    componentWrapperDecorator(
      story => `<div style="display: flex; flex-direction: column; gap: 2rem; align-items: center">${story}</div>`
    ),
  ],
  args: {
    value: '',
    disabled: false,
    required: false,
  },
  argTypes: {
    value: {
      control: false,
      table: {
        category: 'models',
        readonly: true,
        type: {
          summary: 'T',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'models',
        type: {
          summary: 'boolean',
        },
        readonly: true,
      },
    },
    required: {
      control: 'boolean',
      table: {
        category: 'inputs',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
        readonly: true,
      },
    },
    onInput: {
      table: {
        readonly: true,
        type: {
          summary: '(value: T) => void',
        },
      },
    },
  },
  parameters: {
    docs: {
      canvas: {
        // This will remove the "show code" button
        // https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
        sourceState: 'none',
      },
    },
  },
  render: ({ ...args }) => ({
    props: args,
    template: `
      <zen-checkbox />
      <zen-input />
      <zen-switch />
    `,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};
