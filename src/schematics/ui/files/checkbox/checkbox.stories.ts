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
    onInput: {
      table: {
        readonly: true,
        type: { summary: '(value: boolean | null) => void' },
      },
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
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 0.25rem">
        <zen-checkbox id="label-example"/>
        <label for="label-example"> With label </label>
      </div>
  `,
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: CheckboxSignalFormComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.25rem">
        <zen-checkbox id="agree" [formField]="form.agree" />
        <label for="agree">I agree to the terms</label>
      </div>
      @if (form.agree().invalid()) {
        <p style="color: red; margin: 0; font-size: 0.875rem;">
          {{ form.agree().errors()![0].message }}
        </p>
      }
    </div>`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.25rem">
        <zen-checkbox [formField]="form.agree" id="agree" />
        <label for="agree">I agree to the terms</label>
      </div>
      @if (form.agree().invalid()) {
        <p style="color: red; margin: 0; font-size: 0.875rem;">
          {{ form.agree().errors()![0].message }}
        </p>
      }
    </div>
  `,
  imports: [FormField, ZenCheckbox],
})
class CheckboxSignalFormComponent {
  readonly form = form(signal({ agree: false }), s => {
    required(s.agree, { message: 'You must agree to continue' });
  });
}
