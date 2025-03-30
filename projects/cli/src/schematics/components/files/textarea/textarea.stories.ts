import { Meta, StoryObj } from '@storybook/angular';
import { ZenTextareaComponent } from './textarea.component';

export default {
  title: 'Components/Textarea',
  component: ZenTextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    id: { control: 'text' },
  },
  args: {
    value: '',
    placeholder: '',
    disabled: false,
    required: false,
    id: '',
  },
} satisfies Meta<ZenTextareaComponent>;

type Story = StoryObj<ZenTextareaComponent>;

export const Default: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <zen-textarea
        [disabled]="${args.disabled}"
        [value]="'${args.value}'"
        ${args.id ? 'id="' + args.id + '"' : ''}
        ${args.placeholder ? 'placeholder="' + args.placeholder + '"' : ''}
        ${args.required ? 'required' : ''}
      />`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column">
        <label for="label-example"> With label </label>
        <zen-textarea id="label-example"/>
      </div>
  `,
  }),
};

export const Autoresize: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <zen-textarea
       autoresize
       style="width: 300px"
       value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat suscipit pretium. Etiam egestas ex mauris, at efficitur eros consectetur a. Pellentesque porttitor, lectus vel malesuada efficitur, mi neque euismod dolor, ac efficitur nibh nisi quis risus. Nulla viverra feugiat ex vitae ultrices. Nunc et molestie nulla. Suspendisse dignissim magna nec bibendum volutpat. Phasellus nisi ex, viverra at velit ut, accumsan fringilla libero. Suspendisse potenti. Nunc eu erat a augue egestas pretium in non eros. Suspendisse eget tempus quam. Nulla et sem mollis, tempor eros sed, faucibus arcu. Mauris sit amet ligula aliquam, cursus lorem vitae, lobortis est. Duis non urna sagittis, pretium turpis vel, aliquet sem. Maecenas molestie enim ipsum, sit amet bibendum eros scelerisque sit amet. Mauris aliquet mattis lectus et eleifend."
      />`,
  }),
};
