import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import { ZenInput } from './input';

type Options = ZenInput;

export default {
  title: 'Ui/Input',
  component: ZenInput,
  argTypes: {
    value: {
      control: 'text',
      table: {
        category: 'models',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    placeholder: { control: 'text', table: { type: { summary: 'string' } } },
    disabled: {
      control: 'boolean',
      table: {
        category: 'models',
        type: {
          summary: 'boolean',
        },
      },
    },
    required: {
      control: 'boolean',
      table: {
        category: 'inputs',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onInput: {
      table: {
        readonly: true,
        type: {
          summary: '(value: string) => void',
        },
      },
    },
  },
  args: {
    value: '',
    placeholder: '',
    disabled: false,
    required: false,
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column">
        <label for="label-example"> With label </label>
        <zen-input id="label-example"/>
      </div>
  `,
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: InputSignalFormComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-input [formField]="form.name" />`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <zen-input [formField]="form.name" placeholder="Type something" />
      @if (form.name().invalid()) {
        <p style="color: red; margin: 0; font-size: 0.875rem;">
          {{ form.name().errors()![0].message }}
        </p>
      }
    </div>
  `,
  imports: [FormField, ZenInput],
})
class InputSignalFormComponent {
  readonly form = form(signal({ name: '' }), s => {
    required(s.name, { message: 'Name is required' });
  });
}
