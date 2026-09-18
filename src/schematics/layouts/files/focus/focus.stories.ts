import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenFocus } from './focus';

type Story = StoryObj<ZenFocus>;

const meta = {
  title: 'Layouts/Focus',
  component: ZenFocus,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [applicationConfig({ providers: [] }), moduleMetadata({ imports: [ZenFocus] })],
} satisfies Meta<ZenFocus>;

export default meta;

const focusTemplate = `
  <zen-focus style="height: 32rem;">
    <div style="border: 1px solid #e0e0e0; border-radius: 0.75rem; padding: 2rem; text-align: center;">
      <h2 style="margin: 0 0 0.5rem; font-size: 1.25rem;">Centered Content</h2>
      <p style="margin: 0; color: #666; font-size: 0.875rem;">This content is centered both horizontally and vertically.</p>
    </div>
  </zen-focus>
`;

export const Default: Story = {
  render: () => ({
    template: focusTemplate,
  }),
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  render: () => ({
    template: focusTemplate,
  }),
};
