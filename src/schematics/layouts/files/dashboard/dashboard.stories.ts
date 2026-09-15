import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenDashboard } from './dashboard';

type Story = StoryObj<ZenDashboard>;

const meta = {
  title: 'Layouts/Dashboard',
  component: ZenDashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [applicationConfig({ providers: [] }), moduleMetadata({ imports: [ZenDashboard] })],
} satisfies Meta<ZenDashboard>;

export default meta;

const dashboardTemplate = `
  <zen-dashboard>
    <nav zenDashboardNav aria-label="Main navigation" style="display: flex; flex-direction: column; gap: 0.5rem; width: 14rem; height: 100%; box-sizing: border-box; padding: 1rem; background-color: #f5f5f5;">
      <span style="font-weight: 700;">Zen</span>
      <span>Home</span>
      <span>Settings</span>
    </nav>
    <h1 style="font-size: 1.5rem; margin: 0 0 1rem;">Dashboard</h1>
    <p style="margin: 0 0 1rem;">Nav slot hosts the navigation; this content scrolls internally while the nav stays visible.</p>
    <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));">
      <div style="border: 1px solid #e0e0e0; border-radius: 0.75rem; padding: 1rem;">Card one</div>
      <div style="border: 1px solid #e0e0e0; border-radius: 0.75rem; padding: 1rem;">Card two</div>
      <div style="border: 1px solid #e0e0e0; border-radius: 0.75rem; padding: 1rem;">Card three</div>
    </div>
  </zen-dashboard>
`;

export const Default: Story = {
  render: () => ({
    template: dashboardTemplate,
  }),
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  render: () => ({
    template: dashboardTemplate,
  }),
};
