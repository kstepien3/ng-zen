import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeIcon, Logout01Icon, Setting06Icon } from '@hugeicons/core-free-icons';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenIcon } from '../icon';
import { ZenSidenavContent } from './content/sidenav-content';
import { ZenSidenavFooter } from './footer/sidenav-footer';
import { ZenSidenavHeader } from './header/sidenav-header';
import { ZenSidenavItem } from './item/sidenav-item';
import { ZenSidenav } from './sidenav';
import { ZenSidenavToggle } from './toggle/sidenav-toggle';

type Story = StoryObj<ZenSidenav>;

const meta = {
  title: 'UI/Sidenav',
  component: ZenSidenav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    applicationConfig({ providers: [provideRouter([])] }),
    moduleMetadata({
      imports: [
        ZenButton,
        ZenIcon,
        ZenSidenav,
        ZenSidenavContent,
        ZenSidenavFooter,
        ZenSidenavHeader,
        ZenSidenavItem,
        ZenSidenavToggle,
      ],
    }),
  ],
  argTypes: {
    collapsed: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'false' } } },
  },
  args: {
    collapsed: false,
  },
} satisfies Meta<ZenSidenav>;

export default meta;

const navTemplate = `
  <zen-sidenav [collapsed]="collapsed()">
    <div zenSidenavHeader>
      <span style="font-weight: 700;">Zen</span>
    </div>
    <nav aria-label="Main navigation" zenSidenavContent>
      <zen-sidenav-item [icon]="homeIcon" label="Home" routerLink="/home" />
      <zen-sidenav-item [icon]="settingsIcon" label="Settings" routerLink="/settings" />
    </nav>
    <div zenSidenavFooter>
      <button type="button" variant="ghost" zen-button>
        <zen-icon [icon]="logoutIcon" [size]="22" />
        @if (!collapsed()) {
          <span class="sidenav-label">Logout</span>
        }
      </button>
    </div>
    <zen-sidenav-toggle [collapsed]="collapsed()" (collapsedChange)="collapsed.set(!collapsed())" />
  </zen-sidenav>
`;

function navProps(collapsed: boolean): object {
  return {
    collapsed: signal(collapsed),
    homeIcon: HomeIcon,
    settingsIcon: Setting06Icon,
    logoutIcon: Logout01Icon,
  };
}

export const Default: Story = {
  render: () => ({
    props: navProps(false),
    template: navTemplate,
  }),
};

export const Collapsed: Story = {
  render: () => ({
    props: navProps(true),
    template: navTemplate,
  }),
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  render: () => ({
    props: navProps(false),
    template: `
      <div style="display: flex; flex-direction: column; min-height: 100dvh;">
        <main style="flex: 1; padding: 1rem;">
          <h1 style="font-size: 1.25rem;">Page content</h1>
          <p>The sidenav below is an in-flow bottom bar — part of the layout, never covering content.</p>
        </main>
        ${navTemplate}
      </div>
    `,
  }),
};
