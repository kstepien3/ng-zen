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
    onKeyDown: {
      control: false as const,
      table: {
        disable: true,
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
  args: {
    label: 'Enable email notifications',
  },
  render: args => ({
    props: args,
    template: '<zen-switch [label]="label" />',
  }),
};

export const WithSignalForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [NgComponentOutlet] },
    props: { component: SwitchSignalFormComponent },
    template: '<ng-container [ngComponentOutlet]="component"></ng-container>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<zen-switch label="Notifications" [formField]="form.notifications" />`,
      },
    },
  },
};

@Component({
  standalone: true,
  template: `
    <zen-switch label="Notifications" [formField]="form.notifications" />
  `,
  imports: [FormField, ZenSwitch],
})
class SwitchSignalFormComponent {
  readonly form = form(signal({ notifications: false }));
}
