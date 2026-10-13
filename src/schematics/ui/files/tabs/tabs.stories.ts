import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenTab, ZenTabList, ZenTabPanel, ZenTabs } from './index';

type Options = ZenTabs;

export default {
  title: 'Ui/Tabs',
  component: ZenTabs,
  decorators: [moduleMetadata({ imports: [ZenTabs, ZenTabList, ZenTab, ZenTabPanel] })],
  args: {
    variant: 'pills',
    orientation: 'horizontal',
    activationMode: 'auto',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['pills', 'line'],
      table: { category: 'inputs', type: { summary: 'ZenTabsVariant' } },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: { category: 'inputs', type: { summary: 'ZenTabsOrientation' } },
    },
    activationMode: {
      control: 'select',
      options: ['auto', 'manual'],
      table: { category: 'inputs', type: { summary: 'ZenTabsActivationMode' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'inputs', type: { summary: 'ZenTabsSize' } },
    },
  },
  render: args => ({
    props: args,
    template: `
      <zen-tabs
        [variant]="variant"
        [orientation]="orientation"
        [activationMode]="activationMode"
        [size]="size"
      >
        <zen-tab-list>
          <button zen-tab value="account">Account</button>
          <button zen-tab value="password">Password</button>
          <button zen-tab value="notifications">Notifications</button>
        </zen-tab-list>
        <zen-tab-panel value="account">
          <div style="padding: 1rem; border: 1px dashed hsl(0deg 0% 80%); border-radius: 0.5rem;">
            <h4 style="margin: 0 0 0.5rem;">Account Settings</h4>
            <p style="margin: 0; color: hsl(0deg 0% 40%); font-size: 0.875rem;">
              Make changes to your account profile, email address, and username.
            </p>
          </div>
        </zen-tab-panel>
        <zen-tab-panel value="password">
          <div style="padding: 1rem; border: 1px dashed hsl(0deg 0% 80%); border-radius: 0.5rem;">
            <h4 style="margin: 0 0 0.5rem;">Password & Security</h4>
            <p style="margin: 0; color: hsl(0deg 0% 40%); font-size: 0.875rem;">
              Manage two-factor authentication and update your secure password.
            </p>
          </div>
        </zen-tab-panel>
        <zen-tab-panel value="notifications">
          <div style="padding: 1rem; border: 1px dashed hsl(0deg 0% 80%); border-radius: 0.5rem;">
            <h4 style="margin: 0 0 0.5rem;">Notification Preferences</h4>
            <p style="margin: 0; color: hsl(0deg 0% 40%); font-size: 0.875rem;">
              Select what alerts and notifications you wish to receive by email or push.
            </p>
          </div>
        </zen-tab-panel>
      </zen-tabs>
    `,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const LineVariant: Story = {
  args: {
    variant: 'line',
  },
};

export const AutomaticMode: Story = {
  render: () => ({
    props: {},
    template: `
      <zen-tabs>
        <zen-tab-list>
          <button zen-tab>Overview</button>
          <button zen-tab>Analytics</button>
          <button zen-tab>Reports</button>
        </zen-tab-list>
        <zen-tab-panel>
          <p style="margin: 1rem 0; font-size: 0.875rem;">Overview tab content paired automatically by index 0.</p>
        </zen-tab-panel>
        <zen-tab-panel>
          <p style="margin: 1rem 0; font-size: 0.875rem;">Analytics tab content paired automatically by index 1.</p>
        </zen-tab-panel>
        <zen-tab-panel>
          <p style="margin: 1rem 0; font-size: 0.875rem;">Reports tab content paired automatically by index 2.</p>
        </zen-tab-panel>
      </zen-tabs>
    `,
  }),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'line',
  },
  render: args => ({
    props: args,
    template: `
      <zen-tabs [orientation]="orientation" [variant]="variant" style="min-height: 200px;">
        <zen-tab-list>
          <button zen-tab value="profile">Profile</button>
          <button zen-tab value="billing">Billing</button>
          <button zen-tab value="team">Team Members</button>
        </zen-tab-list>
        <zen-tab-panel value="profile">
          <h4 style="margin: 0 0 0.5rem;">Profile</h4>
          <p style="margin: 0; color: hsl(0deg 0% 40%); font-size: 0.875rem;">Vertical layout with side navigation rail.</p>
        </zen-tab-panel>
        <zen-tab-panel value="billing">
          <h4 style="margin: 0 0 0.5rem;">Billing</h4>
          <p style="margin: 0; color: hsl(0deg 0% 40%); font-size: 0.875rem;">Invoice history and active subscription tier.</p>
        </zen-tab-panel>
        <zen-tab-panel value="team">
          <h4 style="margin: 0 0 0.5rem;">Team</h4>
          <p style="margin: 0; color: hsl(0deg 0% 40%); font-size: 0.875rem;">Collaborators with access to this project.</p>
        </zen-tab-panel>
      </zen-tabs>
    `,
  }),
};

export const WithDisabledTab: Story = {
  render: () => ({
    props: {},
    template: `
      <zen-tabs>
        <zen-tab-list>
          <button zen-tab value="active1">Active Tab</button>
          <button zen-tab value="disabled" [disabled]="true">Disabled Tab</button>
          <button zen-tab value="active2">Another Tab</button>
        </zen-tab-list>
        <zen-tab-panel value="active1">
          <p style="margin: 1rem 0; font-size: 0.875rem;">First tab is accessible.</p>
        </zen-tab-panel>
        <zen-tab-panel value="disabled">
          <p style="margin: 1rem 0; font-size: 0.875rem;">Disabled content.</p>
        </zen-tab-panel>
        <zen-tab-panel value="active2">
          <p style="margin: 1rem 0; font-size: 0.875rem;">Keyboard arrow navigation automatically skips the disabled tab.</p>
        </zen-tab-panel>
      </zen-tabs>
    `,
  }),
};

export const LazyLoaded: Story = {
  render: () => ({
    props: {},
    template: `
      <zen-tabs>
        <zen-tab-list>
          <button zen-tab value="immediate">Immediate</button>
          <button zen-tab value="heavy">Heavy Analytics (Lazy)</button>
        </zen-tab-list>
        <zen-tab-panel value="immediate">
          <p style="margin: 1rem 0; font-size: 0.875rem;">Standard panel rendered immediately on initialization.</p>
        </zen-tab-panel>
        <zen-tab-panel value="heavy" [lazy]="true">
          <div style="padding: 1rem; background: hsl(140deg 50% 95%); border-radius: 0.5rem;">
            <p style="margin: 0; font-size: 0.875rem; color: hsl(140deg 50% 20%);">
              This content was only initialized in the DOM when the tab was clicked for the first time!
            </p>
          </div>
        </zen-tab-panel>
      </zen-tabs>
    `,
  }),
};
