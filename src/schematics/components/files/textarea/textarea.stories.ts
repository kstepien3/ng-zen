import { Meta, StoryObj } from '@storybook/angular';

import { ZenTextareaComponent } from './textarea.component';

interface StoryParams {
  value: string;
  placeholder: string;
  required: boolean;
  autoresize: boolean;
  disabled: boolean;
}

export default {
  title: 'Components/Textarea',
  component: ZenTextareaComponent,
  tags: ['autodocs'],
  args: {
    value: '',
    autoresize: false,
    placeholder: 'ZenTextareaComponent',
    required: false,
    disabled: false,
  },
  argTypes: {
    value: { control: 'text' },
    autoresize: { control: 'boolean' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<ZenTextareaComponent & StoryParams>;

type Story = StoryObj<ZenTextareaComponent & StoryParams>;

export const Default: Story = {
  render: args => ({
    template: `
      <textarea
      zen-textarea
      placeholder="${args.placeholder}"
      ${args.required ? 'required' : ''}
      ${args.autoresize ? 'autoresize' : ''}
      ${args.disabled ? 'disabled' : ''}
      >${args.value}</textarea>`,
  }),
};

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
