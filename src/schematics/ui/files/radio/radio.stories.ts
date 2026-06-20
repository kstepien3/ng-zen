import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import FormControlStories from '../form-control/form-control.stories';
import { ZenRadio } from './radio';

type Options = ZenRadio;

export default {
  title: 'Ui/Radio',
  component: ZenRadio,
  argTypes: {
    ...FormControlStories.argTypes,
    value: {
      table: {
        category: 'models',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
      control: 'text' as const,
    },
    name: {
      table: {
        category: 'models',
        type: { summary: 'string' },
        defaultValue: { summary: 'radio' },
      },
      control: 'text' as const,
    },
    option: {
      table: {
        category: 'inputs',
        type: { summary: 'string' },
      },
      control: 'text' as const,
    },
    onInput: {
      table: {
        readonly: true,
        type: { summary: '(value: string | null) => void' },
      },
    },
  },
  args: {
    ...FormControlStories.args,
    value: null,
    name: 'radio-group',
    option: 'option1',
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 0.25rem">
        <zen-radio name="label-example" option="option1" />
        <label for="label-example"> With label </label>
      </div>
  `,
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: RadioSignalFormComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-radio [formField]="form.color" option="red" />
<zen-radio [formField]="form.color" option="green" />
<zen-radio [formField]="form.color" option="blue" />`,
      },
    },
  },
};

@Component({
  standalone: true,
  imports: [FormField, ZenRadio],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div>
        <strong>Selected:</strong>
        {{ form.color().value() }}
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label style="display: flex; align-items: center; gap: 0.25rem">
          <zen-radio [formField]="form.color" option="red" />
          Red
        </label>
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label style="display: flex; align-items: center; gap: 0.25rem">
          <zen-radio [formField]="form.color" option="green" />
          Green
        </label>
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label style="display: flex; align-items: center; gap: 0.25rem">
          <zen-radio [formField]="form.color" option="blue" />
          Blue
        </label>
      </div>
    </div>
  `,
})
class RadioSignalFormComponent {
  readonly form = form(signal({ color: 'blue' }));
}
