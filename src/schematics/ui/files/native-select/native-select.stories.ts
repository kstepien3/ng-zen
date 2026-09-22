import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import FormControlStories from '../form-control/form-control.stories';
import { ZenNativeSelect } from './native-select';

type Options = ZenNativeSelect;

export default {
  title: 'Ui/NativeSelect',
  component: ZenNativeSelect,
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
    options: {
      control: 'object' as const,
      table: { type: { summary: 'ZenNativeSelectOption[]' } },
    },
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
    options: [],
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {
  render: () => ({
    template: `
      <zen-native-select style="max-width: 300px;">
        <option value="" disabled selected>Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </zen-native-select>
    `,
  }),
};

export const WithOptionsArray: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'United States', value: 'us' },
        { label: 'Germany', value: 'de' },
        { label: 'Poland', value: 'pl' },
        { label: 'France', value: 'fr', disabled: true },
      ],
    },
    template: `
      <zen-native-select
        label="Country"
        placeholder="Choose country"
        [options]="items"
        style="max-width: 300px;"
      />
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <zen-native-select label="Country" style="max-width: 300px;">
        <option value="" disabled selected>Select a country</option>
        <option value="us">United States</option>
        <option value="de">Germany</option>
        <option value="pl">Poland</option>
        <option value="fr">France</option>
      </zen-native-select>
    `,
  }),
};

export const WithHintAndWarn: Story = {
  render: () => ({
    template: `
      <zen-native-select
        label="Environment"
        hint="Select deployment target"
        style="max-width: 300px;"
      >
        <option value="dev">Development</option>
        <option value="stage">Staging</option>
        <option value="prod">Production</option>
      </zen-native-select>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <zen-native-select [disabled]="true" label="Locked Selection" style="max-width: 300px;">
        <option value="locked">Disabled select</option>
      </zen-native-select>
    `,
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: NativeSelectSignalFormComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-native-select label="Role" [formField]="form.role">
  <option value="">Choose a role</option>
  <option value="admin">Administrator</option>
  <option value="user">User</option>
</zen-native-select>`,
      },
    },
  },
};

export const WithFormRoot: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: NativeSelectFormRootComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<form [formRoot]="userForm">
  <zen-native-select label="Role" [formField]="userForm.role">
    <option value="admin">Administrator</option>
    <option value="editor">Editor</option>
    <option value="viewer">Viewer</option>
  </zen-native-select>
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
      <zen-native-select label="Role" [formField]="form.role">
        <option value="">Choose a role</option>
        <option value="admin">Administrator</option>
        <option value="user">User</option>
        <option value="guest">Guest</option>
      </zen-native-select>
    </div>
  `,
  imports: [FormField, ZenNativeSelect],
})
class NativeSelectSignalFormComponent {
  readonly form = form(signal({ role: '' }), s => {
    required(s.role, { message: 'Role is required' });
  });
}

@Component({
  standalone: true,
  template: `
    <form style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;" [formRoot]="userForm">
      <zen-native-select label="Role" [formField]="userForm.role">
        <option value="">Choose a role</option>
        <option value="admin">Administrator</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </zen-native-select>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [FormRoot, FormField, ZenNativeSelect],
})
class NativeSelectFormRootComponent {
  readonly userModel = signal({ role: '' });
  readonly userForm = form(this.userModel, s => {
    required(s.role, { message: 'Role is required' });
  });
}
