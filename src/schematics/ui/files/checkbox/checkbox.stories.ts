import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import FormControlStories from '../form-control/form-control.stories';
import { ZenCheckbox } from './checkbox';

type Options = ZenCheckbox;

export default {
  title: 'Ui/Checkbox',
  component: ZenCheckbox,
  argTypes: {
    ...FormControlStories.argTypes,
    value: {
      table: {
        category: 'models',
        type: { summary: 'boolean | null' },
        defaultValue: { summary: 'false' },
      },
      control: 'radio' as const,
      options: [true, false, null],
    },
  },
  args: {
    ...FormControlStories.args,
    value: false,
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
  render: args => ({
    props: args,
    template: '<zen-checkbox [label]="label" />',
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: CheckboxSignalFormComponent },
    template: '<ng-container [ngComponentOutlet]="component"></ng-container>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-checkbox label="I agree to the terms" [formField]="form.agree" />`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <zen-checkbox label="I agree to the terms" [formField]="form.agree" />
    </div>
  `,
  imports: [FormField, ZenCheckbox],
})
class CheckboxSignalFormComponent {
  readonly form = form(signal({ agree: false }), s => {
    required(s.agree, { message: 'You must agree to continue' });
  });
}
