import { Meta, StoryObj } from '@storybook/angular';

import { ZenTextarea } from './textarea';

interface StoryParams {
  content: string;
  placeholder: string;
  required: boolean;
  autoresize: boolean;
  disabled: boolean;
}
type Options = ZenTextarea & StoryParams;

export default {
  title: 'Ui/Textarea',
  component: ZenTextarea,
  args: {
    content: '',
    autoresize: false,
    placeholder: 'ZenTextareaComponent',
    required: false,
    disabled: false,
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
    placeholder: {
      control: 'text',
      table: {
        category: 'attributes',
        type: {
          summary: 'string',
        },
      },
    },
    required: {
      control: 'boolean',
      table: {
        category: 'attributes',
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'attributes',
        type: {
          summary: 'boolean',
        },
      },
    },
    autoresize: {
      table: {
        category: 'attributes',
      },
    },
  },
  render: ({ content, ...args }) => ({
    props: args,
    template: `
      <textarea zen-textarea placeholder="${args.placeholder}" ${args.required ? 'required' : ''} ${args.autoresize ? 'autoresize' : ''} ${args.disabled ? 'disabled' : ''}>${content}</textarea>`.replace(
      /\s+/g,
      ' '
    ),
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column">
        <label for="label-example"> With label </label>
        <textarea zen-textarea id="label-example"></textarea>
      </div>
  `,
  }),
};

export const Autoresize: Story = {
  render: args => ({
    props: { ...args },
    template: `
<textarea zen-textarea autoresize style="max-width: 300px">Start typing...</textarea>
`,
  }),
};
