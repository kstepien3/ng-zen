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
  args: {
    label: 'Option 1',
  },
  render: args => ({
    props: args,
    template: '<zen-radio name="label-example" option="option1" [label]="label" />',
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: RadioSignalFormComponent },
    template: '<ng-container [ngComponentOutlet]="component"></ng-container>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-radio [formField]="form.color" option="red" label="Red" />
<zen-radio [formField]="form.color" option="green" label="Green" />
<zen-radio [formField]="form.color" option="blue" label="Blue" />`,
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
        <zen-radio label="Red" option="red" [formField]="form.color" />
        <zen-radio label="Green" option="green" [formField]="form.color" />
        <zen-radio label="Blue" option="blue" [formField]="form.color" />
      </div>
    </div>
  `,
})
class RadioSignalFormComponent {
  readonly form = form(signal({ color: 'blue' }));
}
