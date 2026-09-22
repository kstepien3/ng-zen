import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import FormControlStories from '../form-control/form-control.stories';
import { ZenSelect } from './select';

type Options = ZenSelect;

export default {
  title: 'Ui/Select',
  component: ZenSelect,
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
    id: { control: 'text' as const, table: { type: { summary: 'string' } } },
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
    id: '',
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {
  render: () => ({
    template: `
      <zen-select style="max-width: 300px;">
        <option value="" disabled selected>Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </zen-select>
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.25rem; max-width: 300px;">
        <label for="country-select">Country</label>
        <zen-select id="country-select">
          <option value="us">United States</option>
          <option value="de">Germany</option>
          <option value="pl">Poland</option>
          <option value="fr">France</option>
        </zen-select>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <zen-select [disabled]="true" style="max-width: 300px;">
        <option value="locked">Disabled select</option>
      </zen-select>
    `,
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: SelectSignalFormComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-select [formField]="form.role">
  <option value="">Choose a role</option>
  <option value="admin">Administrator</option>
  <option value="user">User</option>
</zen-select>`,
      },
    },
  },
};

export const WithFormRoot: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: SelectFormRootComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<form [formRoot]="userForm">
  <zen-select [formField]="userForm.role">
    <option value="admin">Administrator</option>
    <option value="editor">Editor</option>
    <option value="viewer">Viewer</option>
  </zen-select>
  <button type="submit">Submit</button>
</form>`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <zen-select [formField]="form.role">
        <option value="">Choose a role</option>
        <option value="admin">Administrator</option>
        <option value="user">User</option>
        <option value="guest">Guest</option>
      </zen-select>
      @if (form.role().invalid()) {
        <p style="color: red; margin: 0; font-size: 0.875rem;">
          {{ form.role().errors()![0].message }}
        </p>
      }
    </div>
  `,
  imports: [FormField, ZenSelect],
})
class SelectSignalFormComponent {
  readonly form = form(signal({ role: '' }), s => {
    required(s.role, { message: 'Role is required' });
  });
}

@Component({
  standalone: true,
  template: `
    <form style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;" [formRoot]="userForm">
      <zen-select [formField]="userForm.role">
        <option value="">Choose a role</option>
        <option value="admin">Administrator</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </zen-select>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [FormRoot, FormField, ZenSelect],
})
class SelectFormRootComponent {
  readonly userModel = signal({ role: '' });
  readonly userForm = form(this.userModel, s => {
    required(s.role, { message: 'Role is required' });
  });
}
