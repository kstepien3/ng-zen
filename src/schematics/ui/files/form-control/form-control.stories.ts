import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenCheckbox } from '../checkbox';
import { ZenInput } from '../input';
import { ZenSwitch } from '../switch';
import { ZenFormControl } from './form-control';

type Options = ZenFormControl<unknown>;

export const formControlArgTypes = {
  disabled: {
    control: 'boolean' as const,
    table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  required: {
    control: 'boolean' as const,
    table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  label: {
    control: 'text' as const,
    table: { category: 'inputs', type: { summary: 'string' } },
  },
  hint: {
    control: 'text' as const,
    table: { category: 'inputs', type: { summary: 'string' } },
  },
  warn: {
    control: 'text' as const,
    table: { category: 'inputs', type: { summary: 'string' } },
  },
  id: {
    control: false as const,
    table: { disable: true },
  },
  name: {
    control: false as const,
    table: { disable: true },
  },
  readonly: {
    control: false as const,
    table: { disable: true },
  },
  hidden: {
    control: false as const,
    table: { disable: true },
  },
  dirty: {
    control: false as const,
    table: { disable: true },
  },
  invalid: {
    control: false as const,
    table: { disable: true },
  },
  pending: {
    control: false as const,
    table: { disable: true },
  },
  touched: {
    control: false as const,
    table: { disable: true },
  },
  errors: {
    control: false as const,
    table: { disable: true },
  },
  errorTemplate: {
    control: false as const,
    table: { disable: true },
  },
  shouldShowError: {
    control: false as const,
    table: { disable: true },
  },
  touch: {
    control: false as const,
    table: { disable: true },
  },
  onInput: {
    control: false as const,
    table: { disable: true },
  },
  focus: {
    control: false as const,
    table: { disable: true },
  },
  reset: {
    control: false as const,
    table: { disable: true },
  },
};

export const formControlArgs = {
  disabled: false,
  required: false,
  label: '',
  hint: '',
  warn: '',
};

const meta: Meta<Options> = {
  title: 'Ui/FormControl',
  component: ZenFormControl,
  decorators: [
    moduleMetadata({ imports: [ZenCheckbox, ZenInput, ZenSwitch] }),
    componentWrapperDecorator(
      story => `<div style="display: flex; flex-direction: column; gap: 2rem; align-items: center">${story}</div>`
    ),
  ],
  argTypes: {
    ...formControlArgTypes,
    value: {
      control: false as const,
      table: {
        category: 'models',
        readonly: true,
        type: { summary: 'T' },
      },
    },
  },
  args: {
    ...formControlArgs,
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
};

export default meta;

type Story = StoryObj<Options>;

export const Default: Story = {};
