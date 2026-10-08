import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import FormControlStories from '../form-control/form-control.stories';
import { ZenTextarea } from './textarea';

type Options = ZenTextarea;

export default {
  title: 'Ui/Textarea',
  component: ZenTextarea,
  argTypes: {
    ...FormControlStories.argTypes,
    value: {
      control: 'text' as const,
      table: {
        category: 'models',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    placeholder: { control: 'text' as const, table: { type: { summary: 'string' } } },
    rows: { control: 'number' as const, table: { type: { summary: 'number' } } },
    cols: { control: 'number' as const, table: { type: { summary: 'number' } } },
    autoresize: { control: 'boolean' as const, table: { type: { summary: 'boolean' } } },
  },
  args: {
    ...FormControlStories.args,
    value: '',
    placeholder: '',
    rows: 3,
    autoresize: false,
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
  },
  render: args => ({
    props: args,
    template: '<zen-textarea [label]="label" [placeholder]="placeholder" />',
  }),
};

export const WithHintAndWarn: Story = {
  args: {
    label: 'Feedback',
    hint: 'Maximum 500 characters',
    placeholder: 'Your feedback...',
  },
  render: args => ({
    props: args,
    template: '<zen-textarea [label]="label" [hint]="hint" [placeholder]="placeholder" />',
  }),
};

export const Autoresize: Story = {
  args: {
    label: 'Auto-resizing note',
    autoresize: true,
    placeholder: 'Start typing...',
  },
  render: args => ({
    props: args,
    template:
      '<zen-textarea [label]="label" [autoresize]="autoresize" [placeholder]="placeholder" style="max-width: 400px;" />',
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: TextareaSignalFormComponent },
    template: '<ng-container [ngComponentOutlet]="component"></ng-container>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-textarea label="Description" [formField]="form.description" />`,
      },
    },
  },
};

export const WithFormRoot: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: TextareaFormRootComponent },
    template: '<ng-container [ngComponentOutlet]="component"></ng-container>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<form [formRoot]="feedbackForm">
  <zen-textarea label="Comments" [formField]="feedbackForm.comments" placeholder="Leave a comment" />
  <button type="submit">Submit</button>
</form>`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
      <zen-textarea label="Description" placeholder="Type something" [formField]="form.description" />
    </div>
  `,
  imports: [FormField, ZenTextarea],
})
class TextareaSignalFormComponent {
  readonly form = form(signal({ description: '' }), s => {
    required(s.description, { message: 'Description is required' });
  });
}

@Component({
  standalone: true,
  template: `
    <form style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;" [formRoot]="feedbackForm">
      <zen-textarea label="Comments" placeholder="Leave a comment" [formField]="feedbackForm.comments" />
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [FormRoot, FormField, ZenTextarea],
})
class TextareaFormRootComponent {
  readonly feedbackModel = signal({ comments: '' });
  readonly feedbackForm = form(this.feedbackModel, s => {
    required(s.comments, { message: 'Comments are required' });
  });
}
