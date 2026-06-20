import { NgComponentOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Meta, StoryObj } from '@storybook/angular';

import FormControlStories from '../form-control/form-control.stories';
import { ZenSwitch } from './switch';

type Options = ZenSwitch;

export default {
  title: 'Ui/Switch',
  component: ZenSwitch,
  argTypes: {
    ...FormControlStories.argTypes,
    value: {
      control: 'boolean' as const,
      table: {
        category: 'models',
        type: { summary: 'boolean' },
      },
    },
    onInput: {
      table: {
        readonly: true,
        type: { summary: '(value: boolean) => void' },
      },
    },
    onKeyDown: {
      table: {
        readonly: true,
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

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: SwitchSignalFormComponent },
    template: '<ng-container *ngComponentOutlet="component" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <zen-switch id="notifications" [formField]="form.notifications" />
      <label for="notifications">
        {{ form.notifications().value() ? 'Notifications on' : 'Notifications off' }}
      </label>
    </div>`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <zen-switch [formField]="form.notifications" id="notifications" />
      <label for="notifications">
        {{ form.notifications().value() ? 'Notifications on' : 'Notifications off' }}
      </label>
    </div>
  `,
  imports: [FormField, ZenSwitch],
})
class SwitchSignalFormComponent {
  readonly form = form(signal({ notifications: false }));
}
