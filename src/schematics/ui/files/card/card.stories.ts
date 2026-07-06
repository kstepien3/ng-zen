import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenCard } from './card';

interface StoryParams {
  content: string;
  title: string;
  subtitle: string;
}

type Options = ZenCard & StoryParams;

export default {
  title: 'Ui/Card',
  component: ZenCard,
  decorators: [moduleMetadata({ imports: [ZenButton] })],
  args: {
    content: 'This is the card content.',
    title: 'Card Title',
    subtitle: 'Card subtitle',
  },
  argTypes: {
    content: {
      control: 'text',
      table: { category: 'story parameters', type: { summary: 'ng-content' } },
    },
    title: {
      control: 'text',
      table: { category: 'story parameters', type: { summary: 'string' } },
    },
    subtitle: {
      control: 'text',
      table: { category: 'story parameters', type: { summary: 'string' } },
    },
  },
  render: ({ content, title, subtitle }) => ({
    props: {},
    template: `
      <zen-card>
        <h3 card-title>${title}</h3>
        <p card-subtitle>${subtitle}</p>
        ${content}
      </zen-card>
    `,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const Basic: Story = {
  args: {
    content: 'This is a simple card with only default content.',
  },
  render: ({ content }) => ({
    props: {},
    template: `
      <zen-card>
        ${content}
      </zen-card>
    `,
  }),
};

export const WithFooter: Story = {
  args: {
    content: 'Card content with a footer action.',
  },
  render: ({ content, title, subtitle }) => ({
    props: {},
    template: `
      <zen-card>
        <h3 card-title>${title}</h3>
        <p card-subtitle>${subtitle}</p>
        ${content}
        <div card-footer>
          <button zen-button>Save changes</button>
        </div>
      </zen-card>
    `,
  }),
};

export const Size: Story = {
  args: {
    content: '',
    title: '',
    subtitle: '',
  },
  render: () => ({
    props: {},
    template: `
      <zen-card style="--zen-card-padding: 1rem; --zen-card-gap: 0.75rem; --zen-card-header-gap: 0.125rem;">
        <h3 card-title>Scheduled reports</h3>
        <p card-subtitle>Weekly snapshots. No more manual exports.</p>
        <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem;">
          <li>Choose a schedule (daily, or weekly).</li>
          <li>Send to channels or specific teammates.</li>
          <li>Include charts, tables, and key metrics.</li>
        </ul>
        <div card-footer style="display: flex; gap: 0.5rem;">
          <button zen-button>Set up scheduled reports</button>
          <button zen-button variant="outline">See what's new</button>
        </div>
      </zen-card>
    `,
  }),
};

export const LoginForm: Story = {
  args: {
    content: '',
    title: '',
    subtitle: '',
  },
  render: () => ({
    props: {},
    template: `
      <zen-card>
        <h3 card-title>Login to your account</h3>
        <p card-subtitle>Enter your email below to login to your account</p>
        <div style="display: grid; gap: 0.75rem;">
          <input type="email" placeholder="Email" style="border: 1px solid hsl(0deg 0% 80%); border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.875rem;">
          <input type="password" placeholder="Password" style="border: 1px solid hsl(0deg 0% 80%); border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.875rem;">
          <a href="#" style="font-size: 0.75rem; color: hsl(0deg 0% 40%); text-align: right;">Forgot your password?</a>
        </div>
        <div card-footer style="display: flex; flex-direction: column; gap: 0.5rem;">
          <button zen-button>Login</button>
          <button zen-button variant="filled">Login with Google</button>
        </div>
      </zen-card>
    `,
  }),
};

export const ImageCard: Story = {
  args: {
    content: '',
    title: '',
    subtitle: '',
  },
  render: () => ({
    props: {},
    template: `
      <zen-card>
        <img card-header src="https://picsum.photos/seed/ng-zen/600/400" alt="Event cover" style="display: block; width: 100%; height: 300px; object-fit: cover;">

        <h3 card-title style="margin: 0;">Design systems meetup</h3>
        <p style="margin: 0;">A practical talk on component APIs, accessibility, and shipping faster.</p>

        <button card-footer zen-button variant="ghost" style="width: 100%;">View Event</button>
      </zen-card>
    `,
  }),
};
