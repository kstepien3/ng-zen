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
  argTypes: {
    disabled: {
      control: 'boolean' as const,
      table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean' as const,
      table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    touched: {
      control: false as const,
      table: { category: 'models', type: { summary: 'boolean' }, readonly: true },
    },
    dirty: {
      control: false as const,
      table: { category: 'inputs', type: { summary: 'boolean' }, readonly: true },
    },
    invalid: {
      control: false as const,
      table: { category: 'inputs', type: { summary: 'boolean' }, readonly: true },
    },
    pending: {
      control: false as const,
      table: { category: 'inputs', type: { summary: 'boolean' }, readonly: true },
    },
    hidden: {
      control: 'boolean' as const,
      table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean' as const,
      table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    name: {
      control: 'text' as const,
      table: { category: 'models', type: { summary: 'string' } },
    },
    errors: {
      control: false as const,
      table: { category: 'models', type: { summary: 'ValidationError[]' }, readonly: true },
    },
    disabledReasons: {
      control: false as const,
      table: { category: 'models', type: { summary: 'DisabledReason[]' }, readonly: true },
    },
    value: {
      control: false as const,
      table: {
        category: 'models',
        readonly: true,
        type: { summary: 'T' },
      },
    },
    onInput: {
      table: {
        readonly: true,
        type: { summary: '(value: T) => void' },
      },
    },
  },
  args: {
    disabled: false,
    required: false,
    touched: false,
    dirty: false,
    invalid: false,
    pending: false,
    hidden: false,
    readonly: false,
    name: '',
    value: '',
  },
  parameters: {
    docs: {
      canvas: {
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
