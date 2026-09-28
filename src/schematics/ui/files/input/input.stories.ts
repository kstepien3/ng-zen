import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import FormControlStories from '../form-control/form-control.stories';
import { ZenInput } from './input';

type Options = ZenInput;

export default {
  title: 'Ui/Input',
  component: ZenInput,
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
    onInput: {
      table: {
        readonly: true,
        type: { summary: '(value: string) => void' },
      },
    },
  },
  args: {
    ...FormControlStories.args,
    value: '',
    placeholder: '',
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
  render: args => ({
    props: args,
    template: '<zen-input [label]="label" [placeholder]="placeholder" />',
  }),
};

export const WithHintAndWarn: Story = {
  args: {
    label: 'Password',
    hint: 'Must be at least 8 characters',
    placeholder: 'Enter password',
  },
  render: args => ({
    props: args,
    template: '<zen-input [label]="label" [hint]="hint" [placeholder]="placeholder" type="password" />',
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
        code: `<zen-input label="Full Name" [formField]="form.name" />`,
      },
    },
  },
};

export const WithFormRoot: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: InputFormRootComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<form [formRoot]="loginForm">
  <zen-input label="Email" [formField]="loginForm.email" placeholder="Email" />
  <zen-input label="Password" [formField]="loginForm.password" placeholder="Password" type="password" />
  <button type="submit">Sign in</button>
</form>`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <zen-input label="Full Name" placeholder="Type something" [formField]="form.name" />
    </div>
  `,
  imports: [FormField, ZenInput],
})
class InputSignalFormComponent {
  readonly form = form(signal({ name: '' }), s => {
    required(s.name, { message: 'Name is required' });
  });
}

@Component({
  standalone: true,
  template: `
    <form style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;" [formRoot]="loginForm">
      <zen-input placeholder="Email" [formField]="loginForm.email" />
      <zen-input placeholder="Password" type="password" [formField]="loginForm.password" />
      <button type="submit">Sign in</button>
    </form>
  `,
  imports: [FormRoot, FormField, ZenInput],
})
class InputFormRootComponent {
  readonly loginModel = signal({ email: '', password: '' });
  readonly loginForm = form(this.loginModel, s => {
    required(s.email, { message: 'Email is required' });
    required(s.password, { message: 'Password is required' });
  });
}
